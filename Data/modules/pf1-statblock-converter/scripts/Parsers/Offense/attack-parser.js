import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { sbcContent } from "../../sbcContent.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Attacks
export class AttackParser extends ParserBase {

    async parse(value, type, line) {
        if(!value) return;
        sbcUtils.log(`Trying to parse "${value}" ` + " as " + type + "-Attack.")

        try {
            // The next task is to re-organize the code below to accomplish the following in order:
            // 1. Get the raw attack name without any "nonlethal", "melee", "range", or "touch"
            // 2. Check if there exists a weapon with the given name.
            // 3. If there is a weapon, check the attack bonus it uses to compare with statblock
            // 4. If there is a weapon, check the enhancement bonus to compare with statblock
            // 5. If there is a weapon, check the damage formula to compare with statblock
            // 6. If there is a weapon, check the damage bonus to compare with statblock
            // 7. If 3-6 are all matching, then check the system setting for whether to make the attack.
            // 8. If any of 3-6 are not matching, then create the attack and modify it to match the statblock
            // 9. If 2-8 don't happen, then proceed with creating the attack manually as normal.
            
            // [1] Sanitize the input
            let rawInput = value
                .replace(/(, or)/g, " or")
                .replace(/, \band\b /g, " and ")
                .replace(/\band\b (?![^(]*\)|\()/g,",")

            // [2] Split it into attackGroups denoted by an "or"
            //     All attacks in an attackGroup can be part of a full attack action
            //     Loop over these attackGroups to handle each separately
            let m_InputAttackGroups = rawInput.split(/\bor\b/g)
            let attackGroupKeys = Object.keys(m_InputAttackGroups)

            // Natural Attack Pattern for finding attacks
            let naturalAttacksPattern = new RegExp("(" + sbcConfig.naturalAttacks.concat(Object.keys(sbcContent.naturalAttacks)).join("s*\\b|\\b") + ")", "i")

            for (var i = 0; i < attackGroupKeys.length; i++) {
                // [3] Split the attacks found in the attackGroup
                //     and loop over each attack separately
                let m_InputAttackGroup = sbcUtils.sbcSplit(m_InputAttackGroups[i])
                let attackKeys = Object.keys(m_InputAttackGroup)

                // Loop over all attacks in the attackGroup
                for (let j = 0; j < attackKeys.length; j++) {
                    let m_InputAttack = m_InputAttackGroup[j].trim()

                    // [4] Parse the attack and save the found data in two temporary constructs
                    // <param name="m_AttackData">Saves all parsed data related to the parent attack document.</param>
                    // <param name="m_ActionData">Saves all parsed data related to the child action document(s).</param>
                    let foundAddonTerms = [];
                    let foundMaterialTerm = "";

                    let m_AttackData = {
                        attackName: "",
                        formattedAttackName: "",
                        actions: [],
                        img: "",
                        subType: "weapon",
                        attackNotes: "",
                        effectNotes: [],
                        specialEffects: "",
                        isMasterwork: false,
                        enhancementBonus: null,
                        isPrimaryAttack: true,
                        held: "normal",
                        isTouch: false,
                        isNonlethal: false,
                        isNatural: false,
                        isBroken: false,
                        baseTypes: [],
                        weaponGroups: {
                            "value": [],
                            "custom": ""
                        },
                        material: null,
                        addons: {}
                    }

                    let m_ActionData = {
                        numberOfAttacks: 1,
                        numberOfIterativeAttacks: 0,
                        iterativeFormula: "",

                        attackParts: [],
                        formulaicAttacksCountFormula: "",
                        formulaicAttacksBonusFormula: "",

                        inputAttackModifier: 0,
                        calculatedAttackBonus: 0,

                        attackAbilityType: "",
                        attackAbilityModifier: 0,

                        damage: "",
                        damageAbilityType: "",
                        numberOfDamageDice: 0,
                        damageDie: 0,
                        damageBonus: 0,
                        damageModifier: 0,

                        damageParts: [],
                        nonCritParts: [],

                        defaultDamageType: "",
                        damageTypes: [],
                        customDamageTypes: "",
                        specialDamageType: "",
                        hasSpecialDamageType: false,
                        weaponSpecial: "-",
                        critRange: 20,
                        critMult: 2,
                        damageMult: 1,

                        attackRangeUnits: "",
                        attackRangeIncrement: "",
                        useOriginalDamage: false,
                        featAttackBonus: 0,
                        featDamageBonus: 0,
                        featAttackBonusString: "",
                        featDamageBonusString: "",
                    }

                    let weaponAttackDetails = {
                        attackName: "",
                        weaponGroups: {
                            "value": [],
                            "custom": ""
                        },
                        isMasterwork: false,
                        attackAbilityType: "",
                        attackAbilityModifier: 0,
                        damageAbilityType: "",
                        damageBonus: 0,
                        damageMult: 1,
                        critRange: 20,
                        critMult: 2,
                        iterativeFormula: "",
                        damageFormula: "",
                        originalDamageFormula: "",
                        featAttackBonus: 0,
                        featDamageBonus: 0,
                        featAttackBonusString: "",
                        featDamageBonusString: "",
                        material: null,
                        addons: [],
                    };

                    let attackComparison = {
                        statblockIterativeFormula: "",
                        statblockDamageFormula: "",
                        statblockDamageBonus: 0,
                        statblockFullFormula: "",
                        statblockEnhancementBonus: 0,

                        itemExists: false,
                        itemIterativeFormula: "",
                        itemDamageFormula: "",
                        itemDamageBonus: 0,
                        itemFullFormula: "",
                        itemEnhancementBonus: 0,
                    }

                    //       This is spaghetti, as we depend on the sequence of parsing events
                    //       to get data, which is stupid and does not adhere to the differentiation
                    //       of attacks and actions the pf1e system introduced in v0.81.0
                    //
                    //       WIP: This whole section could (and probably should) be refactored sometime
                    //       As should sbc in general ...

                    // [4.A] Parse attack related data, e.g. name, number, iterations and modifiers
                    //       This is mainly everything not in parenthesis in any given attack

                    // Search for Touch or Ranged Touch
                    if (m_InputAttack.search(/(?:\d+\s*.*)(ranged\s*\btouch\b|melee\s*\btouch\b|\+\d+\s*\btouch\b)(?:\s*\()/i) !== -1) {
                        m_AttackData.isTouch = true;

                        // Remove the found data from the current input
                        m_InputAttack = m_InputAttack.replace(/(ranged\s*\btouch\b|melee\s*\btouch\b|(\+\d+)\s*\btouch\b)/i, "$2");

                        //No valid name remaining
                        if (!/[a-z](?![^(]*\))/i.test(m_InputAttack))
                            m_AttackData.attackName = "Attack " + (j + 1);
                    }

                    // Search for Nonlethal flag
                    if (m_InputAttack.search(/(?:\d+\s*)(ranged\s*nonlethal|melee\s*nonlethal|nonlethal)/i) !== -1) {
                        m_AttackData.isNonlethal = true;

                        // Remove the found data from the current input
                        m_InputAttack = m_InputAttack.replace(/(ranged\s*nonlethal|melee\s*nonlethal|nonlethal)/i, "");

                        //No valid name remaining
                        if (!/[a-z](?![^(]*\))/i.test(m_InputAttack))
                            m_AttackData.attackName = "Attack " + (j + 1);
                    }

                    // Search for Broken flag
                    if (m_InputAttack.search(/\bbroken\b/i) !== -1) {
                        m_AttackData.isBroken = true;

                        // Remove the found data from the current input
                        //m_InputAttack = m_InputAttack.replace(/(\bbroken\b)/i, "");

                        //No valid name remaining
                        if (!/[a-z](?![^(]*\))/i.test(m_InputAttack))
                            m_AttackData.attackName = "Attack " + (j + 1);
                    }

                    // enhancementBonus
                    if (m_InputAttack.match(/(?:[^\w]\+|^\+)(\d+)(?:\s\w)/) !== null) {
                        m_AttackData.enhancementBonus = m_InputAttack.match(/(?:[^\w]\+|^\+)(\d+)(?:\s\w)/)[1];
                        m_AttackData.attackNotes = "+" + m_AttackData.enhancementBonus + " " + m_AttackData.attackNotes

                        attackComparison.statblockEnhancementBonus = +m_AttackData.enhancementBonus;
                    }

                    // Masterwork
                    if (m_InputAttack.match(/\bmwk\b/i) !== null) {
                        m_AttackData.isMasterwork = true
                        m_AttackData.attackNotes = "mwk " + m_AttackData.attackNotes
                    }

                    // Handle materials
                    let patternMaterials = new RegExp("(" + pf1.registry.materialTypes.contents.filter(mt => mt.addon === false).map(mt => mt.name).join("\\b|\\b") + ")", "gi");
                    let patternMaterialsNonBasics = new RegExp("(" + pf1.registry.materialTypes.contents.filter(mt => mt.addon === false && mt.basic === false).map(mt => mt.name).join("\\b|\\b") + ")", "gi");
                    let patternAddons = new RegExp("(" + pf1.registry.materialTypes.contents.filter(mt => mt.addon === true).map(mt => mt.name).join("\\b|\\b") + ")", "gi");

                    if (m_InputAttack.search(patternMaterials) !== -1) {
                        m_AttackData.material = m_InputAttack.match(patternMaterialsNonBasics)[0];
                        foundMaterialTerm = m_AttackData.material;
                        m_AttackData.material = pf1.registry.materialTypes.contents.find(mt => mt.name === sbcUtils.capitalize(m_AttackData.material) || mt.id === m_AttackData.material)?.id ?? null;
                        //altName = altName.replace(patternMaterialsNonBasics, "").trim();
                    }
            
                    // Handle addons
                    if (m_InputAttack.search(patternAddons) !== -1) {
                        foundAddonTerms = m_InputAttack.match(patternAddons);
                        foundAddonTerms.forEach((element, index) => {
                            foundAddonTerms[index] = pf1.registry.materialTypes.contents.find(mt => mt.name === sbcUtils.capitalize(element) || mt.id === element.toLowerCase().replace(/\s/, ""))?.id ?? null;
                        });
                        foundAddonTerms = foundAddonTerms.filter(x => !!x);
                        m_AttackData.addons = {};
                        foundAddonTerms.forEach((element) => {
                            element = element.toLowerCase().replace(/\s/, "");
                            m_AttackData.addons[element] = element;
                        });
                        //altName = altName.replace(patternAddons, "");
                    }

                    // attackName
                    if (/((?:[+1-5a-zA-Z’']| (?=[+1-5a-zA-Z’'])|\*)+)(?:[ +0-9(/]+\(*)/.test(m_InputAttack) && !m_AttackData.attackName) {
                        m_AttackData.attackName = m_InputAttack.match(/((?:[+1-5a-zA-Z’']| (?=[+1-5a-zA-Z’'])|\*)+)(?:[ +0-9(/]+\(*)/)[1]
                                                                .replace(/^ | $|\bmwk\b |\*|\+$/gi, "")
                                                                .replace(/\+[1-5]$/, "")
                                                                .replace(/^\d+/, "")
                                                                .trim()
                                                                .replace(/(^\+[1-5])|(\+[1-5]+$)/g, "")
                                                                .trim()
                                                                .replace(foundMaterialTerm, "")
                                                                .replace(new RegExp(`(${foundAddonTerms.join("\\b|\\b")})`), "");
                        m_AttackData.attackNotes += m_AttackData.attackName + " "
                    }

                    m_AttackData.attackName = m_AttackData.attackName.trim()
                    // Set the formattedAttackName to use later
                    m_AttackData.formattedAttackName = m_AttackData.attackNotes.trim()

                    // Try to find an existing weapon from the Inventory tab for this attack
                    let weapon = sbcData.characterData.actorData.itemTypes.weapon.find(w =>{
                        let weaponLowerCase = w.name.toLowerCase();
                        // Basic check
                        let result = new RegExp(`${m_AttackData.attackName}`, "i").test(weaponLowerCase);

                        if(result) {
                            // Mastework check
                            if(m_AttackData.isMasterwork && !(/(\bmw\b|\bmwk\b|\bmasterwork\b)/i.test(weaponLowerCase)))
                                result = false;

                            // Broken check
                            if(m_AttackData.isBroken && !(/(\bbroken\b)/i.test(weaponLowerCase)))
                                result = false;

                            // Enhancement check
                            if(m_AttackData.enhancementBonus && !new RegExp("^\\+" + m_AttackData.enhancementBonus + "\\b").test(weaponLowerCase))
                                result = false;

                            // Material check
                            if(m_AttackData.material !== w.system.material.normal.value)
                                result = false; 

                            // Addon check
                            if(foundAddonTerms.length > 0) {
                                let weaponAddons = w.system.material.addon;
                                for(let addon of foundAddonTerms) {
                                    if(!weaponAddons.includes(addon))
                                        result = false;
                                }
                            }

                            // Composite *bow check
                            // if(!result && /Composite/i.test(m_AttackData.attackName))
                            //     result = new RegExp(m_AttackData.attackName, 'i').test(weaponLowerCase)
                        }

                        return result;
                    });
                    if(!weapon) { // Weapon wasn't found in the inventory, so let's see if the attack is a natural attack
                        // Handle natural attacks
                        if (naturalAttacksPattern.test(m_AttackData.attackName)) {
                            m_AttackData.isNatural = true;

                            // Clean up the plural name
                            let tempNaturalAttackName = "";
                            if (m_AttackData.attackName.search(/Pincers/i) === -1)
                                tempNaturalAttackName = m_AttackData.attackName.replace(/s$/, "").match(naturalAttacksPattern)[1].capitalize();
                            else
                                tempNaturalAttackName = m_AttackData.attackName.match(naturalAttacksPattern)[1].capitalize();

                            // If the natural attack is from the system compendium, use that
                            if(Object.values(sbcConfig.naturalAttacks).find(na => na === tempNaturalAttackName))
                                weapon = await sbcUtils.findEntityInCompendium("pf1.monster-abilities", {name: tempNaturalAttackName}, "attack");
                        }
                    }

                    // If we found a weapon or natural attack, get the attack data from it
                    // In the case of weapons, we have to create an attack item, even if the setting says not to
                    let newAttack = null;
                    if (weapon) {
                        if(!m_AttackData.isNatural)
                        {
                            let newAttackData = await pf1.documents.item.ItemAttackPF.fromItem(weapon);
                            newAttack = (await sbcData.characterData.actorData.createEmbeddedDocuments("Item", [newAttackData]))[0];
                        }
                        else newAttack = (await createItem(weapon))[1][0];
                    }
                    
                    let weaponEqualsAttack = false;
                    // If we have the attack data, we need to process it for later comparisons.
                    if (newAttack) {
                        attackComparison.itemExists = true;
                        weaponAttackDetails.attackName = newAttack.name;

                        if(!m_AttackData.isBroken && weapon.system.broken) weaponAttackDetails.isBroken = true;
                        weaponAttackDetails.weaponGroups = weapon.system.weaponGroups;

                        if(weapon.system.material) {
                            weaponAttackDetails.material = weapon.system.material.normal.value;
                            weaponAttackDetails.addons = weapon.system.material.addon;
                        }

                        // Process weapon groups vs feature bonuses
                        for(let group of weaponAttackDetails.weaponGroups.value) {
                            if(sbcData.characterData.weaponGroups[group]) {
                                weaponAttackDetails.featAttackBonus = sbcData.characterData.weaponGroups[group];
                                weaponAttackDetails.featDamageBonus = sbcData.characterData.weaponGroups[group];

                                weaponAttackDetails.featAttackBonusString = `${weaponAttackDetails.featAttackBonus}[Weapon Training]`
                                weaponAttackDetails.featDamageBonusString = `${weaponAttackDetails.featDamageBonus}[Weapon Training]`
                            }
                        }

                        // Process weapon base type vs feat bonuses
                        for(let baseType of weapon.system.baseTypes ?? []) {
                            baseType = baseType.toLowerCase();
                            const result1 = await AttackParser.parseWeaponBonuses("attack", baseType);
                            const result2 = await AttackParser.parseWeaponBonuses("damage", baseType);

                            if(result1[0]) {
                                weaponAttackDetails.featAttackBonus += +result1[0];
                                weaponAttackDetails.featAttackBonusString += weaponAttackDetails.featAttackBonusString.length === 0 ? result1[1] : ` + ${result1[1]}`;
                            }
                            if(result2[0]) {
                                weaponAttackDetails.featDamageBonus += +result2[0];
                                weaponAttackDetails.featDamageBonusString += weaponAttackDetails.featDamageBonusString.length === 0 ? result2[1] : ` + ${result2[1]}`;
                            }
                        }
                        
                        let newAttackAction = newAttack.actions.contents[0];
                        
                        // Default data
                        weaponAttackDetails.attackAbilityType = newAttackAction.data.ability.attack;
                        weaponAttackDetails.attackAbilityModifier = +sbcUtils.getModifier(sbcData.notes.statistics[weaponAttackDetails.attackAbilityType]);
                        weaponAttackDetails.damageAbilityType = newAttackAction.data.ability.damage;
                        weaponAttackDetails.damageBonus = +sbcUtils.getModifier(sbcData.notes.statistics[weaponAttackDetails.damageAbilityType]);
                        weaponAttackDetails.damageMult = newAttackAction.data.ability.damageMult;
                        weaponAttackDetails.critMult = newAttackAction.data.ability?.critMult;
                        weaponAttackDetails.critRange = newAttackAction.data.ability?.critRange;

                        // Build an iterative formula in the format of +X/+Y/+Z
                        // let iterativeFormulaArray = newAttack.getAttackArray(newAttackAction.id);
                        let iterativeFormulaArray = newAttackAction.getAttacks();
                        let iterativeFormula = "";
                        iterativeFormulaArray.forEach((formula, index) => {
                            // formula += +weaponAttackDetails.featAttackBonus;
                            if(weapon.system.masterwork) formula += 1;
                            if(weapon.system.masterwork && weapon.system.enh) formula -= 1;
                            if(formula > -1) iterativeFormula += "+";
                            iterativeFormula += formula;
                            if(index !== iterativeFormulaArray.length - 1) iterativeFormula += "/";
                        });
                        weaponAttackDetails.iterativeFormula = iterativeFormula;
                        attackComparison.itemIterativeFormula = iterativeFormula;

                        // Build a damage formula (like 1d8 + 4/19-20/x4 plus 1d6 fire)
                        let damageFormulaArray = newAttack.getAllDamageSources(newAttackAction.id);
                        let damageBonus = Math.floor(weaponAttackDetails.damageBonus * weaponAttackDetails.damageMult)// + weaponAttackDetails.featDamageBonus;
                        let damageFormula = "";
                        if(weaponAttackDetails.critRange !== 20)
                            damageFormula += `/${weaponAttackDetails.critRange}-20`;
                        if(weaponAttackDetails.critMult !== 2)
                            damageFormula += `/x${weaponAttackDetails.critMult}`;
                        
                        damageFormulaArray.forEach(source => {
                            if(source.modifier === "enh") {
                                damageBonus += source.value;
                                attackComparison.itemEnhancementBonus = source.value;
                            }
                            else if(source.flavor === "Broken") damageBonus += source.value;
                            else damageFormula += ` plus ${source.formula}`;
                        });
                        attackComparison.itemDamageBonus = +damageBonus;

                        // Process the damage formula for a simpler die formula
                        // Rather than "sizeRoll(1, 6, @size)", process it for 1d8 as a Large for example
                        let realFormula = newAttackAction.data.damage.parts[0]?.formula;
                        let realDiceNum = null;
                        let realDiceSize = null;
                        let size = sbcData.characterData.actorData.system.traits.size;

                        if(realFormula) {
                            let results = realFormula.match(/sizeRoll\((?<num>\d+),\s?(?<size>\d+),?.*\)/);
                            if(results) {
                                realDiceNum = results.groups.num;
                                realDiceSize = results.groups.size;
                                size = Object.keys(pf1.config.sizeChart).indexOf(size);

                                let processedRoll = pf1.utils.roll.sizeRoll(+realDiceNum, +realDiceSize, +size);
                                let formula = Roll.fromTerms(processedRoll).formula;

                                attackComparison.itemDamageFormula = formula;
                                if(damageBonus > -1) damageFormula = `${formula} +${damageBonus}${damageFormula}`;
                                else damageFormula = `${formula} ${damageBonus}${damageFormula}`;
                                attackComparison.itemFullFormula = damageFormula;
                                weaponAttackDetails.originalDamageFormula = realFormula;
                            }
                        }

                        delete m_InputAttack.img
                        delete m_InputAttack.subType
                        delete m_InputAttack.held
                    }

                    // attackModifier
                    if (m_InputAttack.match(/(\+\d+|-\d+)(?:[+0-9/ ]*\(*)/) !== null) {
                        // Prefer matches that are not at the start and are followed by a parenthesis
                        if (m_InputAttack.match(/(?!^)(\+\d+|-\d+)(?:[+0-9/ ]*\(+)/) !== null) {
                            m_ActionData.inputAttackModifier = m_InputAttack.match(/(?!^)(\+\d+|-\d+)(?:[+0-9/ ]*\(+)/)[1]
                        } else if (m_InputAttack.match(/(?!^)(\+\d+|-\d+)(?:[+0-9/ ]*)/) !== null) {
                            // Otherwise try to get just an attackModifier, e.g. for attacks without damage
                            m_ActionData.inputAttackModifier = m_InputAttack.match(/(?!^)(\+\d+|-\d+)(?:[+0-9/ ]*)/)[1]
                        } else {
                            // If nothing is found, fail gracefully
                            let errorMessage = "Failed to find a useable attack modifier"
                            let error = new sbcError(1, "Parse/Offense", errorMessage, line)
                            sbcData.errors.push(error)
                        }

                        m_ActionData.iterativeFormula = m_ActionData.inputAttackModifier;
                        m_AttackData.attackNotes += m_ActionData.inputAttackModifier
                    }

                    // numberOfIterativeAttacks, when given in the statblock in the form of +X/+Y/+Z
                    if (m_InputAttack.match(/(\/\+\d+)/) !== null) {
                        m_ActionData.numberOfIterativeAttacks = m_InputAttack.match(/(\/\+\d+)/g).length

                        for (let i = m_ActionData.numberOfIterativeAttacks; i>=1; i--) {
                            let counter = +m_ActionData.numberOfIterativeAttacks+1-i
                            let iterativeModifier = +m_ActionData.inputAttackModifier-(5*counter) > -1 ? `/+${+m_ActionData.inputAttackModifier-(5*counter)}` : `/${+m_ActionData.inputAttackModifier-(5*counter)}`;
                            m_ActionData.iterativeFormula += iterativeModifier;
                            m_AttackData.attackNotes += iterativeModifier;
                        }
                    }
                    attackComparison.statblockIterativeFormula = m_ActionData.iterativeFormula;

                    // m_AttackData.attackName = m_AttackData.attackName.replace(/(^\+[1-5])|(\+[1-5]$)/g, "").trim();

                    // [4.B] Parse damage and effect related data, e.g. number and type of damage dice
                    //       This is mainly everything in parenthesis in any given attack
                    // If the attack has damage dice
                    if (m_InputAttack.match(/\d+d\d+/) !== null) {
                        // NumberOfDamageDice and DamageDie
                        if (m_InputAttack.match(/\d+d\d+/) !== null) {
                            m_ActionData.numberOfDamageDice = m_InputAttack.match(/(\d+)d(\d+)/)[1]
                            m_ActionData.damageDie = m_InputAttack.match(/(\d+)d(\d+)/)[2]
                            m_AttackData.attackNotes += " (" + m_ActionData.numberOfDamageDice + "d" + m_ActionData.damageDie
                            attackComparison.statblockDamageFormula = `${m_ActionData.numberOfDamageDice}d${m_ActionData.damageDie}`;

                            // if(weaponAttackDetails.originalDamageFormula === `${m_ActionData.numberOfDamageDice}d${m_ActionData.damageDie}`) {
                            //     m_ActionData.useOriginalDamage = true;
                            // }
                            // if(newAttack) {
                            //     let realFormula = newAttack.actions.contents[0]?.data.damage.parts[0]?.formula;
                            //     let realDiceNum = null;
                            //     let realDiceSize = null;
                            //     let size = sbcData.characterData.actorData.system.traits.size;
                            //     if(realFormula) {
                            //         let results = realFormula.match(/sizeRoll\((?<num>\d+),\s?(?<size>\d+),?.*\)/);
                            //         if(results) {
                            //             realDiceNum = results.groups.num;
                            //             realDiceSize = results.groups.size;
                            //             size = Object.keys(pf1.config.sizeChart).indexOf(size);

                            //             let formula = Roll.fromTerms(pf1.utils.rollPreProcess.sizeRoll(realDiceNum, realDiceSize, size)).formula;
                            //             if(m_ActionData.originalDamageFormula === `${m_ActionData.numberOfDamageDice}d${m_ActionData.damageDie}`) {
                            //                 m_ActionData.useOriginalDamage = true;
                            //             }
                            //         }
                            //     }
                            // }
                        }
                        // damageBonus
                        if (m_InputAttack.match(/(?:d\d+)(\+\d+|-\d+)/) !== null) {
                            m_ActionData.damageBonus = m_InputAttack.match(/(?:d\d+)(\+\d+|-\d+)/)[1]
                            m_AttackData.attackNotes += m_ActionData.damageBonus
                            attackComparison.statblockDamageBonus = +m_ActionData.damageBonus;
                        }
                        else m_ActionData.damageAbilityType = ""

                        // critRange
                        if (m_InputAttack.match(/(?:\/)(\d+)(?:-\d+)/) !== null) {
                            m_ActionData.critRange = m_InputAttack.match(/(?:\/)(\d+)(?:-\d+)/)[1]
                            m_AttackData.attackNotes += "/" + m_ActionData.critRange + "-20"
                        }
                        // critMult
                        if (m_InputAttack.match(/(?:\/x)(\d+)/) !== null) {
                            m_ActionData.critMult = +(m_InputAttack.match(/(?:\/x)(\d+)/)[1])
                            m_AttackData.attackNotes += "/x" + m_ActionData.critMult
                        }

                        // effectNotes
                        if (m_InputAttack.match(/(?:\(\d+d\d+[+\d/\-x\s]*)([^)\n]*)(?:$|\))/) !== null) {
                            let specialEffects = m_InputAttack.match(/(?:\(\d+d\d+[+\d/\-x\s]*)([^)\n]*)(?:$|\))/)[1];
                            m_AttackData.specialEffects = specialEffects;
                            specialEffects = specialEffects
                                            .replace(/(\s+\band\b\s+|\s*\bplus\b\s+)/gi, ",")
                                            .replace(/(^,|,$)/g,"")
                                            .split(",");

                            if (specialEffects.length > 0) {
                                for (let e=0; e<specialEffects.length; e++) {
                                    let specialEffect = specialEffects[e]
                                    if (specialEffect !== "")
                                        m_AttackData.effectNotes.push(specialEffect)
                                }

                                if(m_AttackData.effectNotes.length > 0)
                                m_AttackData.attackNotes += " plus " + m_AttackData.effectNotes.join(", ")
                            }

                        }

                        // add the closing parenthesis to the attack notes
                        m_AttackData.attackNotes += ")"

                        let damageFormula = "";
                        if(m_ActionData.critRange !== 20)
                            damageFormula += `/${m_ActionData.critRange}-20`;
                        if(m_ActionData.critMult !== 2)
                            damageFormula += `/x${m_ActionData.critMult}`;
                        if(m_AttackData.specialEffects)
                            damageFormula += ` ${m_AttackData.specialEffects}`;

                        if(attackComparison.statblockDamageBonus > -1)
                            attackComparison.statblockFullFormula = `${attackComparison.statblockDamageFormula} +${attackComparison.statblockDamageBonus}${damageFormula}`;
                        else
                            attackComparison.statblockFullFormula = `${attackComparison.statblockDamageFormula} ${attackComparison.statblockDamageBonus}${damageFormula}`;

                    } else if (m_InputAttack.match(/\(([^)]*)\)/) !== null) {
                        // If there is just a specialEffect in parenthesis
                        let specialEffect = m_InputAttack.replace(/\s+/g, " ").match(/\(([^)]*)\)/)[1]
                        m_AttackData.attackNotes += " (" + specialEffect + ")"
                        m_AttackData.effectNotes.push(specialEffect)
                    } else {
                        // If there are neither damage dice nor special effects in parenthesis
                        sbcUtils.log("Kind of embarrasing, but this should never happen.")
                    }

                    // [4.C] Compare the item data to the statblock data if it exists, then decide if we need to create a new attack
                    if(attackComparison.itemExists) {
                        // sbcUtils.log(`Comparing statblock data to attack item:\n` +
                        //     `Iterative Formula: ${attackComparison.statblockIterativeFormula} vs ${attackComparison.itemIterativeFormula}\n` +
                        //     `Damage Formula: ${attackComparison.statblockDamageFormula} vs ${attackComparison.itemDamageFormula}\n` +
                        //     `Damage Bonus: ${attackComparison.statblockDamageBonus} vs ${attackComparison.itemDamageBonus}\n` +
                        //     `Enhancement Bonus: ${attackComparison.statblockEnhancementBonus} vs ${attackComparison.itemEnhancementBonus}\n` +
                        //     `Full Formula: ${attackComparison.statblockFullFormula} vs ${attackComparison.itemFullFormula}\n`
                        //     );
                        
                        // If the attack is identical to the statblock, we may not need to make a new attack
                        if((attackComparison.statblockIterativeFormula === attackComparison.itemIterativeFormula) &&
                            (attackComparison.statblockDamageFormula === attackComparison.itemDamageFormula) &&
                            (attackComparison.statblockDamageBonus === attackComparison.itemDamageBonus) &&
                            (attackComparison.statblockEnhancementBonus === attackComparison.itemEnhancementBonus) &&
                            (attackComparison.statblockFullFormula === attackComparison.itemFullFormula))
                            weaponEqualsAttack = true;
                    }

                    // Exit this attack early if the attack already exists and is identical to the statblock
                    if(attackComparison.itemExists && weaponEqualsAttack && !m_AttackData.isNatural) {
                        if(!sbcConfig.options.createAttacks) // Clean up the attack if it was created and shouldn't be.
                            await sbcData.characterData.actorData.deleteEmbeddedDocuments("Item", [newAttack.id]);
                    } else {
                        // Bring in our data from earlier
                        if(attackComparison.itemExists) {
                            m_ActionData.attackAbilityType = weaponAttackDetails.attackAbilityType;
                            m_ActionData.attackAbilityModifier = weaponAttackDetails.attackAbilityModifier;
                            m_ActionData.damageAbilityType = weaponAttackDetails.damageAbilityType;
                            m_ActionData.featAttackBonus = weaponAttackDetails.featAttackBonus;
                            m_ActionData.featDamageBonus = weaponAttackDetails.featDamageBonus;
                            m_ActionData.featAttackBonusString = weaponAttackDetails.featAttackBonusString;
                            m_ActionData.featDamageBonusString = weaponAttackDetails.featDamageBonusString;
                            m_ActionData.useOriginalDamage = (attackComparison.statblockDamageFormula === attackComparison.itemDamageFormula);

                            // sbcUtils.log("1", m_ActionData);
                        }

                        // [4.D] Continue to parse the attack and action data and calculations
                        // Handle melee attacks
                        if (type === "mwak") {
                            if(!newAttack) {
                                m_AttackData.img = "systems/pf1/icons/items/weapons/elven-curve-blade.PNG"

                                // set abilityTypes
                                m_ActionData.damageAbilityType = "str"
                                m_ActionData.attackRangeUnits = "melee"
                            }

                            // check for noStr-Flag
                            if (!sbcConfig.options.flags.noStr) {
                                m_ActionData.attackAbilityModifier = +sbcUtils.getModifier(sbcData.notes.statistics.str)

                                // set Str to hit
                                if(!newAttack) m_ActionData.attackAbilityType = "str"
                            } else if(!newAttack) {
                                m_ActionData.attackAbilityType = "dex"
                                m_ActionData.attackAbilityModifier = +sbcUtils.getModifier(sbcData.notes.statistics.dex)
                            }


                            // Check for WeaponFinesse-Flag
                            if (sbcConfig.options.flags.hasWeaponFinesse) {
                                m_ActionData.attackAbilityModifier = +sbcUtils.getModifier(sbcData.notes.statistics.dex)

                                // set Dex to hit
                                m_ActionData.attackAbilityType = "dex"
                            }
                        }

                        // Handle ranged attacks
                        if (type === "rwak") {
                            if(!newAttack) m_AttackData.img = "systems/pf1/icons/items/weapons/thorn-bow.PNG"

                            // check for noDex-Flag
                            if (!sbcConfig.options.flags.noDex) {
                                m_ActionData.attackAbilityModifier = +sbcUtils.getModifier(sbcData.notes.statistics.dex)

                                if(!newAttack) {
                                    // set abilityTypes
                                    m_ActionData.attackAbilityType = "dex"

                                    // Check if its a normal bow or a crossbow, because these don't use "str" as the damage ability type
                                    if (m_InputAttack.search(/(bow\b)/i) !== -1 && m_InputAttack.search(/(\bcomposite\b)/i) === -1) {
                                        m_ActionData.damageAbilityType = ""
                                    } else m_ActionData.damageAbilityType = "str"

                                    m_ActionData.attackRangeUnits = "ft"
                                    m_ActionData.attackRangeIncrement = "5" // WIP: Should this really be 5?\
                                }
                            }
                        }

                        // Handle natural attacks
                        // if (naturalAttacksPattern.test(m_AttackData.attackName)) {
                        if(m_AttackData.isNatural) {
                            // m_AttackData.isNatural = true;

                            let tempNaturalAttackName = m_AttackData.attackName.match(naturalAttacksPattern)[1];
                            let tempNaturalAttack = null;
                            
                            if(Object.keys(sbcContent.naturalAttacks).find(na => na === tempNaturalAttackName)) {
                                tempNaturalAttack = sbcContent.naturalAttacks[tempNaturalAttackName.replace(/s$/,"").toLowerCase()];

                                m_AttackData.subType = "natural"
                                m_AttackData.isPrimaryAttack = tempNaturalAttack.isPrimaryAttack
                                m_AttackData.img = tempNaturalAttack.img
                            }
                            // else {
                            //     newAttack = await sbcUtils.findEntityInCompendium("pf1.monster-abilities", {name: tempNaturalAttackName.replace(/s$/,"").toLowerCase()}, "attack");
                            //     if(newAttack) {
                            //         let blank = null;
                            //         [blank, blank] = await createItem(newAttack);
                            //         newAttack = blank[0];
                            //     }
                            //     m_ActionData.damageAbilityType = newAttack.actions.contents[0].data.ability.damage;
                            // }
                        }

                        // Handle swarm attacks, as these are neither melee nor ranged
                        if (m_AttackData.attackName.search(/\bSwarm\b/i) !== -1)    type = "other"

                        // Handle multiple attacks of the same type
                        // Note: These are not iterative attacks!
                        if (m_InputAttack.match(/(^\d+)/) !== null) {
                            m_ActionData.numberOfAttacks = m_InputAttack.match(/(^\d+)/)[1];
                            m_AttackData.attackNotes = m_ActionData.numberOfAttacks + " " + m_AttackData.attackNotes
                        }

                        // Handle baseTypes
                        if (newAttack && newAttack.type !== "attack") { m_AttackData.baseTypes = newAttack.system.baseTypes; }
                        else m_AttackData.baseTypes = [m_AttackData.formattedAttackName.replace(/(^\+[1-5])|(\+[1-5]$)/g, "").trim()];
                        if(m_AttackData.isNatural) m_AttackData.baseTypes.push("natural");

                        // Handle feat/feature bonuses
                        if(!attackComparison.itemExists) {
                            for(let baseType of m_AttackData.baseTypes ?? []) {
                                baseType = baseType.toLowerCase();
                                const result1 = await AttackParser.parseWeaponBonuses("attack", baseType);
                                const result2 = await AttackParser.parseWeaponBonuses("damage", baseType);

                                if(result1[0]) {
                                    m_ActionData.featAttackBonus += m_ActionData.featAttackBonus, result1[0];
                                    m_ActionData.featAttackBonusString += result1[1];
                                }
                                if(result2[0]) {
                                    m_ActionData.featDamageBonus += m_ActionData.featDamageBonus, result2[0];
                                    m_ActionData.featDamageBonusString += result2[1];
                                }

                                // sbcUtils.log("2", m_ActionData);
                            }
                        }
                        // m_ActionData.featAttackBonus = this.parseWeaponBonuses("attack", "natural");
                        // m_ActionData.featDamageBonus = this.parseWeaponBonuses("damage", m_AttackData.attackName.toLowerCase());

                        // Calculate Attack and, if needed, compensate for differences between input attackModifier and system-derived attackModifier
                        let calculatedAttackModifier =
                            +sbcData.characterData.conversionValidation.attributes.bab
                            + +CONFIG["PF1"].sizeMods[sbcData.characterData.actorData.system.traits.size]
                            + +m_ActionData.attackAbilityModifier
                            + +m_ActionData.featAttackBonus
                            + (m_AttackData.isBroken ? -2 : 0);
                        
                        // sbcUtils.log(`Calculated Attack Modifier: ${calculatedAttackModifier} =\n` +
                        //     `Bab: ${sbcData.characterData.conversionValidation.attributes.bab}\n` +
                        //     `Size Mod: ${CONFIG["PF1"].sizeMods[sbcData.characterData.actorData.system.traits.size]}\n` +
                        //     `Attack Ability Modifier: ${m_ActionData.attackAbilityModifier}\n` +
                        //     `Feat Attack Bonus: ${m_ActionData.featAttackBonus}\n` +
                        //     `Broken: ${m_AttackData.isBroken ? -2 : 0}\n`);

                        // account for Masterwork status
                        if (m_AttackData.isMasterwork)
                            calculatedAttackModifier += 1

                        // account for enhancement bonus otherwise
                        else if (m_AttackData.enhancementBonus > 0)
                            calculatedAttackModifier += +m_AttackData.enhancementBonus

                        // verify attack's "primary attack" status
                        if (m_AttackData.isNatural && ((calculatedAttackModifier - m_ActionData.inputAttackModifier) === 5))
                            m_AttackData.isPrimaryAttack = false

                        // account for secondary attack penalty
                        if (!m_AttackData.isPrimaryAttack)
                            calculatedAttackModifier -= 5

                        // Now compare our value with the statblock's
                        // sbcUtils.log(`Calculated Attack Modifier: ${calculatedAttackModifier}\n` +
                        //     `Input Attack Modifier: ${m_ActionData.inputAttackModifier}\n` +
                        //     `Calculated Attack Bonus: ${+m_ActionData.inputAttackModifier - +calculatedAttackModifier}\n`);
                        
                        if (+calculatedAttackModifier !== +m_ActionData.inputAttackModifier)
                            m_ActionData.calculatedAttackBonus = +m_ActionData.inputAttackModifier - +calculatedAttackModifier

                        // Calculate Damage and, if needed, compensate for differences between
                        // input damageModifier and system-derived damageModifier
                        let strDamageBonus = 0
                        if (m_ActionData.damageAbilityType === "str") {
                            // Use the value given in the statblock instead of the one currently in the actor
                            strDamageBonus = +sbcUtils.getModifier(sbcData.notes.statistics.str)
                        }

                        // let calculatedDamageBonus = (m_AttackData.isPrimaryAttack) ? +strDamageBonus + +m_AttackData.enhancementBonus : strDamageBonus + +m_AttackData.enhancementBonus - 5
                        let calculatedDamageBonus = +strDamageBonus + +m_AttackData.enhancementBonus + +m_ActionData.featDamageBonus + (m_AttackData.isBroken ? -2 : 0);
                        let damageOffset = +m_ActionData.damageBonus - +calculatedDamageBonus;
                        // sbcUtils.log(`Damage Offset: ${damageOffset}\n` +
                        //     `Damage Bonus: ${m_ActionData.damageBonus}\n` +
                        //     `Calculated Damage Bonus: ${calculatedDamageBonus}\n` +
                        //     `Str Damage Bonus: ${strDamageBonus}\n` +
                        //     `Enhancement Bonus: ${m_AttackData.enhancementBonus}\n` +
                        //     `Broken: ${m_AttackData.isBroken ? -2 : 0}\n`);
                        if((damageOffset === Math.floor(strDamageBonus / 2)) && strDamageBonus > 0) {
                            calculatedDamageBonus += Math.floor(strDamageBonus / 2);
                            m_ActionData.damageMult = 1.5;
                            m_AttackData.held = "2h";
                        }
                        else if((+m_ActionData.damageBonus - +calculatedDamageBonus === -Math.ceil(strDamageBonus / 2)) && strDamageBonus > 0) {
                            calculatedDamageBonus -= Math.ceil(strDamageBonus / 2);
                            m_ActionData.damageMult = 0.5;
                            m_AttackData.held = "oh";
                        }
                        m_ActionData.damageModifier = +m_ActionData.damageBonus - +calculatedDamageBonus

                        // Create the string needed for the damagePart
                        let damageDiceString = "";
                        if(!m_ActionData.useOriginalDamage) {
                            damageDiceString = m_ActionData.numberOfDamageDice
                            +   "d"
                            +   m_ActionData.damageDie;
                            if(m_ActionData.featDamageBonusString && !sbcConfig.options.rollBonusesIntegration)
                                damageDiceString += " + " + m_ActionData.featDamageBonusString
                        } else {
                            // damageDiceString = newAttack.actions.contents[0]?.data.damage.parts[0]?.formula + " + " + weaponAttackDetails.featDamageBonusString;
                            damageDiceString = weaponAttackDetails.originalDamageFormula;
                            if(weaponAttackDetails.featDamageBonus)
                                damageDiceString += " + " + weaponAttackDetails.featDamageBonusString;
                        }

                        // ... and if there is a difference between the statblock and the calculation, add an adjustment modifier
                        if (m_ActionData.damageModifier !== 0) {
                            if(m_ActionData.damageModifier > 0)
                                damageDiceString += " + " + m_ActionData.damageModifier + "[adjusted by sbc]";
                            else
                                damageDiceString += +m_ActionData.damageModifier + "[adjusted by sbc]";
                        }
                        damageDiceString = damageDiceString.replace(/\+ \+/g, "+ ").replace(/\s\s/, " ");

                        // 12/11/23 --  I am overall ignoring this entire section, as I greatly dislike hard-set data
                        //              in sbcContent for every attack...
                        /*
                            // Try to find the defaultDamageType by checking if the attackName can be found in sbcContent.attackDamageTypes
                            // This is done to find common damage types of attacks and weapons
                            // e.g. bite is piercing, bludgeoning and slashing
                            let attackDamageTypeKeys = Object.keys(sbcContent.attackDamageTypes)
                            if (m_AttackData.attackName !== "") {
                                let damageTypePattern = new RegExp("(^\\b" + m_AttackData.attackName.replace(/(\bmwk\b|s$)/ig,"").trim() + "\\b$)", "ig");
                                let damageTypeFound = false
                            
                                attackDamageTypeKeys.forEach(attackDamageTypeKey => {
                                    let attackDamageType = sbcContent.attackDamageTypes[attackDamageTypeKey]
                                    if (attackDamageTypeKey.toLowerCase().search(damageTypePattern) !== -1) {
                                        damageTypeFound = true
                            
                                        // Split the found damage types
                                        // If they are separated via "," or "and" they are valid for the whole action
                                        // If they are separated via "or" we need a separate action
                                        let m_TempDamageTypeGroups = attackDamageType.type.split("or")

                                        for (let y=0; y<m_TempDamageTypeGroups.length; y++) {
                                            let m_TempDamageTypeGroup = m_TempDamageTypeGroups[y].trim()
                                            let m_TempDamageTypes = m_TempDamageTypeGroup.split(/,|and/g)

                                            for (let z=0; z<m_TempDamageTypes.length; z++) {
                                                let m_TempDamageType = m_TempDamageTypes[z].trim()
                                                let m_DamageType = sbcConfig.damageTypes[m_TempDamageType.toLowerCase()]
                                                m_ActionData.damageTypes.push(m_DamageType)
                                            }
                                        }

                                        // If the Weapon has Range Increment and it is used for a ranged attack
                                        // Set the range increment accordingly
                                        if (attackDamageType.rangeIncrement && type === "rwak") {
                                            m_ActionData.attackRangeIncrement = attackDamageType.rangeIncrement
                                        }

                                        // If the weapon has special properties, add that to the attackNotes
                                        m_ActionData.weaponSpecial = attackDamageType.special

                                        if (m_ActionData.weaponSpecial !== "-") {
                                            m_AttackData.attackNotes += "," + m_ActionData.weaponSpecial
                                        }
                                    }
                                })

                                if(m_AttackData.isNonlethal)
                                    m_ActionData.damageTypes.push("nonlethal")

                                if (!damageTypeFound)
                                    m_ActionData.damageTypes.push("untyped")
                            }
                        */

                        // If we have attack data from before, we can get damage types from it.
                        // Otherwise, it's an unknown, so we default ot untyped.
                        if(newAttack) {
                            let damageType = newAttack.actions.contents[0]?.data.damage.parts[0]?.type?.values[0];
                            if(damageType) {
                                m_ActionData.damageTypes.push(damageType);
                            }
                            let properties = Object.keys(weapon?.system.properties ?? {});
                            properties.forEach(property => {
                                if(weapon?.system.properties[property])
                                    m_AttackData.attackNotes += `, ${CONFIG.PF1.weaponProperties[property]}`;
                                });
                        } else {
                            if(m_AttackData.isNonlethal)
                                m_ActionData.damageTypes.push("nonlethal")
                            m_ActionData.damageTypes.push("untyped");
                        }

                        // Check for specialDamageTypes
                        // Check, if the attackEffect denotes a valid damageType for the base damage,
                        // and use this to override the default damage type
                        for (let k = 0; k < m_AttackData.effectNotes.length; k++) {
                            let attackEffect = m_AttackData.effectNotes[k]

                            let systemSupportedDamageTypes = Object.values(pf1.registry.damageTypes.getLabels()).map(x => x.toLowerCase())
                            let patternDamageTypes = new RegExp("(" + systemSupportedDamageTypes.join("\\b|\\b") + ")", "gi")

                            // If the attackEffect has no additional damagePools XdY ...
                            if (attackEffect.match(/\d+d\d+/) === null) {
                                // ... and it matches any of the supported damageTypes ...
                                if (attackEffect.search(patternDamageTypes) !== -1) {
                                    let specialDamageType = attackEffect.match(patternDamageTypes)[0].trim()

                                    // Remove the found attackEffect from the effectNotes array
                                    m_AttackData.effectNotes.splice(k,1)

                                    m_ActionData.damageTypes = [specialDamageType];
                                }
                            } else {
                                // ... if the attackEffect has damagePools, create a new damageEntry for the attack
                                let attackEffectDamage = attackEffect.match(/(\d+d\d+\+*\d*)/)[0]

                                // Check if there is something left after removing the damage
                                let attackEffectDamageType = attackEffect.replace(attackEffectDamage, "").trim()
                                let attackEffectCustomDamageType = ""

                                if (attackEffectDamageType !== "") {
                                    if (attackEffect.search(patternDamageTypes) !== -1) {
                                        attackEffectDamageType = attackEffect.match(patternDamageTypes)[0].trim()
                                    } else {
                                        attackEffectCustomDamageType = attackEffectDamageType
                                    }
                                } else {
                                    attackEffectDamageType = "untyped"
                                }

                                // Push the damage values to the action
                                m_ActionData.nonCritParts.push({
                                    formula: attackEffectDamage,
                                    type: {
                                        "values": [attackEffectDamageType],
                                        "custom": attackEffectCustomDamageType
                                    }
                                })

                                // Remove the found attackEffect from the effectNotes array
                                m_AttackData.effectNotes.splice(k,1)
                            }
                        }

                        // ... then push the damagePart
                        m_ActionData.damageParts.push({
                            formula: damageDiceString,
                            type: {
                                "values": m_ActionData.damageTypes,
                                "custom": m_ActionData.customDamageTypes
                            }
                        })

                        // Push extra attacks from numberOfAttacks
                        for (let i=1; i < m_ActionData.numberOfAttacks; i++) {
                            let prefixAttackName = i+1 + sbcConfig.const.suffixMultiples[Math.min(3, i)]
                            m_ActionData.attackParts.push(
                                {
                                    formula: "",
                                    name: prefixAttackName + " " + sbcUtils.capitalize(m_AttackData.attackName.replace(/(s|es)$/, ""))
                                }
                            )
                        }

                        // Push extra attacks from numberOfIterativeAttacks
                        // WIP: This does not register or handle statblocks with errors in the iterations
                        // if (m_ActionData.numberOfIterativeAttacks > 0 || m_ActionData.numberOfAttacks === 0) {
                        //     m_ActionData.formulaicAttacksCountFormula = "ceil(@attributes.bab.total/5)-1"
                        // }

                        // [5] Create an attack from m_AttackData
                        // If the attack already exists, update it instead
                        let m_NewAttack = null;
                        let attackUpdates = null;
                        if(!newAttack) {
                            m_NewAttack = new Item.implementation({
                                name: sbcUtils.capitalize(m_AttackData.formattedAttackName) || "undefined",
                                type: "attack",
                                img: m_AttackData.img,
                                system: {
                                    attackNotes: sbcUtils.sbcSplit(m_AttackData.attackNotes),
                                    effectNotes: m_AttackData.effectNotes,
                                    masterwork: (m_AttackData.isMasterwork || (m_AttackData.enhancementBonus ?? 0) !== 0) ? true : false,
                                    broken: m_AttackData.isBroken,
                                    enh: +m_AttackData.enhancementBonus,
                                    proficient: true,
                                    held: m_AttackData.held,
                                    showInQuickbar: true,
                                    subType: m_AttackData.subType,
                                    identifiedName: sbcUtils.capitalize(m_AttackData.formattedAttackName) || "undefined",
                                    baseTypes: m_AttackData.baseTypes,
                                    material: {
                                        normal: {
                                            value: m_AttackData.material
                                        },
                                        addon: Object.keys(m_AttackData.addons)
                                    }
                                },
                            });

                            m_NewAttack.prepareData();
                        } else {
                            attackUpdates = {
                                "_id": newAttack.id,
                                "system.enh": +m_AttackData.enhancementBonus,
                                "system.masterwork": (m_AttackData.isMasterwork || (m_AttackData.enhancementBonus ?? 0) !== 0) ? true : false,
                                "system.held": m_AttackData.held,
                                "system.attackNotes": sbcUtils.sbcSplit(m_AttackData.attackNotes),
                                "system.effectNotes": m_AttackData.effectNotes,
                                "system.broken": m_AttackData.isBroken,
                                "name": sbcUtils.capitalize(m_AttackData.formattedAttackName) || "undefined",
                                "system.material.normal.value": m_AttackData.material,
                                "system.material.addon": Object.keys(m_AttackData.addons)
                            }
                            m_NewAttack = newAttack;
                        }

                        // [6] Create an action from m_ActionData
                        //     which in turn needs to be pushed to the in [5] created attack
                        let m_NewAction = null;

                        // Process attack and damage numbers for additions to the Attack Bonus and Damage Formula fields
                        let attackBonusString = (m_ActionData.calculatedAttackBonus !== 0 ? m_ActionData.calculatedAttackBonus.toString() + "[adjusted by sbc]" : null);
                        if(m_ActionData.featAttackBonusString && !sbcConfig.options.rollBonusesIntegration) {
                            attackBonusString = attackBonusString ? `${attackBonusString} + ${m_ActionData.featAttackBonusString}` : m_ActionData.featAttackBonusString;
                        }
                        if(attackBonusString)
                            attackBonusString = attackBonusString.replace(/\+ \+/g, "+ ").replace(/\s\s/g, " ").replace(/^\+ /, "").replace(/ \+$/, "");

                        // Update the extra attack types setting from PF1E v10.0
                        let extraAttacksType = m_ActionData.attackParts.length > 0 && m_ActionData.numberOfIterativeAttacks > 0
                        ? "advanced"
                        : m_ActionData.numberOfIterativeAttacks > 0 && m_ActionData.attackParts.length === 0
                        ? "standard"
                        : "custom";

                        if(!newAttack) {
                            m_NewAction = 
                            {
                                ...pf1.components.ItemAction.defaultData,
                                name: sbcUtils.capitalize(m_AttackData.attackName),
                                img: m_AttackData.img,
                                activation: {
                                    cost: 1,
                                    type: "attack"
                                },
                                unchainedAction: {
                                    activation: {
                                        cost: 1,
                                        type: "attack"
                                    }
                                },
                                range: {
                                    value: m_ActionData.attackRangeIncrement,
                                    units: m_ActionData.attackRangeUnits,
                                    maxIncrements: 1,
                                },
                                attackName: sbcUtils.capitalize(m_AttackData.attackName.replace(/(s|es)$/, "")),
                                actionType: type,
                                attackBonus: attackBonusString,
                                critConfirmBonus: "",
                                damage: {
                                    critParts: [],
                                    nonCritParts: m_ActionData.nonCritParts,
                                    parts: m_ActionData.damageParts
                                },
                                extraAttacks: {
                                    type: extraAttacksType,
                                    manual: m_ActionData.attackParts
                                },
                                formulaicAttacks: {
                                    count: {
                                        formula: m_ActionData.formulaicAttacksCountFormula,
                                    },
                                    bonus: {
                                        formula: "@formulaicAttack * -5"
                                    },
                                },
                                ability: {
                                    attack: m_ActionData.attackAbilityType,
                                    damage: m_ActionData.damageAbilityType,
                                    damageMult: m_ActionData.damageMult,
                                    critRange: m_ActionData.critRange,
                                    critMult: m_ActionData.critMult
                                },
                                naturalAttack: {
                                    primaryAttack: m_AttackData.isPrimaryAttack
                                },
                                nonlethal: m_AttackData.isNonlethal,
                                // attackParts: m_ActionData.attackParts,
                                touch: m_AttackData.isTouch
                            };
                        } else {
                            let action = newAttack.actions.get(newAttack.actions.contents[0].id);
                            let updates = {
                                "attackBonus": attackBonusString,
                                "damage": {
                                    critParts: [],
                                    nonCritParts: m_ActionData.nonCritParts,
                                    parts: m_ActionData.damageParts
                                },
                                "attackParts": m_ActionData.attackParts,
                                ["ability.attack"]: m_ActionData.attackAbilityType,
                                ["ability.critRange"]: m_ActionData.critRange,
                                ["ability.critMult"]: m_ActionData.critMult,
                                ["ability.damageMult"]: m_ActionData.damageMult,
                                "nonlethal": m_AttackData.isNonlethal,
                                "touch": m_AttackData.isTouch,
                            }

                            if(newAttack.system.subType === "natural") {
                                updates["naturalAttack.primaryAttack"] = m_AttackData.isPrimaryAttack
                            }

                            await action.update(updates);
                        }
                    
                        // [7] Create the final document
                        let existingName = newAttack ? newAttack.name : m_NewAttack.name;
                        let existingId = newAttack ? newAttack.id : m_NewAttack.id;

                        // Check if an attack with the same name already exists
                        let existingAttack = sbcData.characterData.actorData.itemTypes.attack.
                                            find(ita => ita.name === existingName && ita.id !== existingId);

                        if(existingAttack) {
                            let comparisonData = {
                                "enh": newAttack ? newAttack.system.enh : m_AttackData.enhancementBonus,
                                "masterwork": newAttack ? newAttack.system.masterwork : m_AttackData.isMasterwork,
                                "broken": newAttack ? newAttack.system.broken : m_AttackData.isBroken,
                            };
                            if(!comparisonData.enh) comparisonData.enh = 0;

                            if(existingAttack.system.enh === comparisonData.enh &&
                                existingAttack.system.masterwork === comparisonData.masterwork &&
                                existingAttack.system.broken === comparisonData.broken) {
                                // Import the current attack item's attack and effect notes over to the existing attack
                                let newAttackNotes = existingAttack.system.attackNotes.concat(sbcUtils.sbcSplit(m_AttackData.attackNotes));
                                let newEffectNotes = existingAttack.system.effectNotes.concat(m_AttackData.effectNotes);
                                await sbcData.characterData.actorData.updateEmbeddedDocuments("Item", [{
                                    "_id": existingAttack.id,
                                    "system.attackNotes": newAttackNotes,
                                    "system.effectNotes": newEffectNotes
                                }]);

                                let actionData = newAttack ? newAttack.actions.contents[0] : m_NewAction;
                                // Clone the action to make it unique, remove the id, and if necessary update the name
                                let newAction = deepClone(actionData);
                                if(newAction.data) {
                                    if(!m_AttackData.isPrimaryAttack && m_AttackData.isNatural) newAction.data.name += " (Secondary)";
                                    delete newAction.data._id;
                                } else {
                                    if(!m_AttackData.isPrimaryAttack && m_AttackData.isNatural) newAction.name += " (Secondary)";
                                    delete newAction._id;
                                }

                                
                                // Add it to the existing attack, and erase the current attack
                                await pf1.components.ItemAction.create([newAction.data], {parent: existingAttack});
                                if(newAttack)
                                    await sbcData.characterData.actorData.deleteEmbeddedDocuments("Item", [newAttack.id]);
                            }
                        } else {
                            // Push it into this attack as well
                            if(!newAttack) {
                                m_NewAttack.updateSource({"system.actions": [ m_NewAction ] })
                                m_NewAttack.prepareData()

                                // And lastly add the attack to the item stack
                                await createItem(m_NewAttack);
                            } else {
                                // Update the current attack
                                await sbcData.characterData.actorData.updateEmbeddedDocuments("Item", [attackUpdates]);
                                m_NewAttack.prepareData();
                            }
                        }
                    }
                }
            }

            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as " + type + "-Attack." + err
            let error = new sbcError(1, "Parse/Offense", errorMessage, line)
            sbcData.errors.push(error)
            return false
        }
    }

    static async parseWeaponBonuses(type, value) {
        let result = 0;
        let resultString = "";

        if(type === "attack") {
            if(sbcData.characterData.weaponFocus.includes(value)) {
                result += 1;
                resultString += "+ 1[Weapon Focus]";
            }
            if(sbcData.characterData.weaponFocusGreater.includes(value)) {
                result += 1;
                resultString += "+ 1[Greater Weapon Focus]";
            }
        } else if(type === "damage") {
            if(sbcData.characterData.weaponSpecialization.includes(value)) {
                result += 2;
                resultString += "+ 2[Weapon Specialization]";
            }
            if(sbcData.characterData.weaponSpecializationGreater.includes(value)) {
                result += 2;
                resultString += "+ 2[Greater Weapon Specialization]";
            }
        }

        // sbcUtils.log(`Weapon ${type} bonus for ${value}: ${result}, ${resultString}`);
        return [result, resultString];
    }
}