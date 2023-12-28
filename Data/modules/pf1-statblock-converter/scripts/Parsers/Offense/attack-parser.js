import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { sbcContent } from "../../sbcContent.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Attacks
export class AttackParser extends ParserBase {

    async parse(value, type, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as " + type + "-Attack.")

        try {

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

            for (var i = 0; i < attackGroupKeys.length; i++) {

                // [3] Split the attacks found in the attackGroup
                //     and loop over each attack separately
                //     Goal: For version 0.81.0 of the pf1e foundry system
                //           Create an attack document with embedded subActions
                let m_InputAttackGroup = sbcUtils.sbcSplit(m_InputAttackGroups[i])
                let attackKeys = Object.keys(m_InputAttackGroup)

                let m_FullAttackActions = []

                // Loop over all attacks in the attackGroup
                for (let j = 0; j < attackKeys.length; j++) {

                    let m_InputAttack = m_InputAttackGroup[j].trim()

                    // [4] Parse the attack and save the found data in two temporary constructs
                    // <param name="m_AttackData">Saves all parsed data related to the parent attack document.</param>
                    // <param name="m_ActionData">Saves all parsed data related to the child action document(s).</param>

                    let m_AttackData = {
                        attackName: "",
                        formattedAttackName: "",
                        actions: [],
                        img: "",
                        subType: "weapon",
                        attackNotes: "",
                        effectNotes: [],
                        isMasterwork: false,
                        enhancementBonus: null,
                        isPrimaryAttack: true,
                        held: "normal",
                        isTouch: false,
                        isNonlethal: false
                    }

                    let m_ActionData = {
                        numberOfAttacks: 1,
                        numberOfIterativeAttacks: 0,

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
                    if (m_InputAttack.search(/(?:\d+\s*)(ranged\s*touch|melee\s*touch|touch)(?:\s*\()/i) !== -1) {
                        let specialAttackType = m_InputAttack.match(/(ranged\s*touch|melee\s*touch|touch)/i)[1];
                        //m_AttackData.attackNotes += specialAttackType + "\n";
                        m_AttackData.isTouch = true;

                        // Remove the found data from the current input
                        m_InputAttack = m_InputAttack.replace(/(ranged\s*touch|melee\s*touch|touch)/i, "");

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

                    // attackName
                    if (/((?:[a-zA-Z’']| (?=[a-zA-Z’'])|\*)+)(?:[ +0-9(/]+\(*)/.test(m_InputAttack) && !m_AttackData.attackName) {
                        m_AttackData.attackName = m_InputAttack.match(/((?:[a-zA-Z’']| (?=[a-zA-Z’'])|\*)+)(?:[ +0-9(/]+\(*)/)[1].replace(/^ | $/g, "").replace(/\bmwk\b /i, "").replace(/\*/, "").trim()
                        m_AttackData.attackNotes += m_AttackData.attackName + " "
                    }

                    // Handle melee attacks
                    if (type === "mwak") {

                        m_AttackData.img = "systems/pf1/icons/items/weapons/elven-curve-blade.PNG"

                        // check for noStr-Flag
                        if (!sbcConfig.options.flags.noStr) {

                            m_ActionData.attackAbilityModifier = +sbcUtils.getModifier(sbcData.notes.statistics.str)

                            // set abilityTypes
                            m_ActionData.attackAbilityType = "str"
                            m_ActionData.damageAbilityType = "str"
                            m_ActionData.attackRangeUnits = "melee"
                        }

                        // Check for WeaponFinesse-Flag
                        if (sbcConfig.options.flags.hasWeaponFinesse) {

                            m_ActionData.attackAbilityModifier = +sbcUtils.getModifier(sbcData.notes.statistics.dex)

                            // set abilityTypes
                            m_ActionData.attackAbilityType = "dex"
                            m_ActionData.damageAbilityType = "str"
                            m_ActionData.attackRangeUnits = "melee"

                        }
                    }

                    // Handle ranged attacks
                    if (type === "rwak") {

                        m_AttackData.img = "systems/pf1/icons/items/weapons/thorn-bow.PNG"

                        // check for noDex-Flag
                        if (!sbcConfig.options.flags.noDex) {

                            m_ActionData.attackAbilityModifier = +sbcUtils.getModifier(sbcData.notes.statistics.dex)

                            // set abilityTypes
                            m_ActionData.attackAbilityType = "dex"
                            m_ActionData.damageAbilityType = "str"

                            // Check if its a normal bow or a crossbow, because these don't use "str" as the damage ability type
                            if (m_InputAttack.search(/(bow\b)/i) !== -1 && m_InputAttack.search(/(\bcomposite\b)/i) === -1) {
                                m_ActionData.damageAbilityType = ""
                            }

                            m_ActionData.attackRangeUnits = "ft"
                            m_ActionData.attackRangeIncrement = "5" // WIP: Should this really be 5?
                        }

                    }

                    // Handle natural attacks
                    let naturalAttacksKeys = Object.keys(sbcContent.naturalAttacks)
                    let naturalAttacksPattern = new RegExp("(" + naturalAttacksKeys.join("s*\\b|\\b") + ")", "i")

                    if (naturalAttacksPattern.test(m_AttackData.attackName)) {

                        let tempNaturalAttackName = m_AttackData.attackName.match(naturalAttacksPattern)[1];
                        let tempNaturalAttack = sbcContent.naturalAttacks[tempNaturalAttackName.replace(/s$/,"").toLowerCase()];

                        m_AttackData.subType = "natural"
                        m_AttackData.isPrimaryAttack = tempNaturalAttack.isPrimaryAttack
                        m_AttackData.img = tempNaturalAttack.img
                    }

                    // Handle swarm attacks, as these are neither melee nor ranged
                    if (m_AttackData.attackName.search(/\bSwarm\b/i) !== -1) {
                        type = "other"
                    }

                    // Handle multiple attacks of the same type
                    // Note: These are not iterative attacks!
                    if (m_InputAttack.match(/(^\d+)/) !== null) {
                        m_ActionData.numberOfAttacks = m_InputAttack.match(/(^\d+)/)[1];
                        m_AttackData.attackNotes = m_ActionData.numberOfAttacks + " " + m_AttackData.attackNotes
                    }

                    // enhancementBonus
                    if (m_InputAttack.match(/(?:[^\w]\+|^\+)(\d+)(?:\s\w)/) !== null) {
                        m_AttackData.enhancementBonus = m_InputAttack.match(/(?:[^\w]\+|^\+)(\d+)(?:\s\w)/)[1];
                        m_AttackData.attackNotes = "+" + m_AttackData.enhancementBonus + " " + m_AttackData.attackNotes
                    }

                    // Masterwork
                    if (m_InputAttack.match(/\bmwk\b/i) !== null) {
                        m_AttackData.isMasterwork = true
                        m_AttackData.attackNotes = "mwk " + m_AttackData.attackNotes
                    }

                    // Set the formattedAttackName to use later
                    m_AttackData.formattedAttackName = m_AttackData.attackNotes.trim()

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

                        m_AttackData.attackNotes += m_ActionData.inputAttackModifier
                    }

                    // numberOfIterativeAttacks, when given in the statblock in the form of
                    if (m_InputAttack.match(/(\/\+\d+)/) !== null) {
                        m_ActionData.numberOfIterativeAttacks = m_InputAttack.match(/(\/\+\d+)/g).length

                        for (let i = m_ActionData.numberOfIterativeAttacks; i>=1; i--) {
                            let counter = +m_ActionData.numberOfIterativeAttacks+1-i
                            m_AttackData.attackNotes += "/+" + (+m_ActionData.inputAttackModifier-(5*counter))
                        }
                    }

                    // [4.B] Parse damage and effect related data, e.g. number and type of damage dice
                    //       This is mainly everything in parenthesis in any given attack

                    // If the attack has damage dice
                    console.log("Attack: ", m_InputAttack);
                    if (m_InputAttack.match(/\d+d\d+/) !== null) {

                        // NumberOfDamageDice and DamageDie
                        if (m_InputAttack.match(/\d+d\d+/) !== null) {
                            m_ActionData.numberOfDamageDice = m_InputAttack.match(/(\d+)d(\d+)/)[1]
                            m_ActionData.damageDie = m_InputAttack.match(/(\d+)d(\d+)/)[2]
                            m_AttackData.attackNotes += " (" + m_ActionData.numberOfDamageDice + "d" + m_ActionData.damageDie
                        }
                        // damageBonus
                        if (m_InputAttack.match(/(?:d\d+)(\+\d+|\-\d+)/) !== null) {
                            m_ActionData.damageBonus = m_InputAttack.match(/(?:d\d+)(\+\d+|\-\d+)/)[1]
                            m_AttackData.attackNotes += m_ActionData.damageBonus
                        }
                        else
                            m_ActionData.damageAbilityType = ""

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
                        if (m_InputAttack.match(/(?:\(\d+d\d+[\+\d\/\-x\s]*)([^\)\n]*)(?:$|\))/) !== null) {
                            let specialEffects = m_InputAttack.match(/(?:\(\d+d\d+[\+\d\/\-x\s]*)([^\)\n]*)(?:$|\))/)[1]
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

                    } else if (m_InputAttack.match(/\(([^)]*)\)/) !== null){
                        // If there is just a specialEffect in parenthesis
                        let specialEffect = m_InputAttack.replace(/\s+/g, " ").match(/\(([^)]*)\)/)[1]
                        m_AttackData.attackNotes += " (" + specialEffect + ")"
                        m_AttackData.effectNotes.push(specialEffect)
                    } else {
                        // If there are neither damage dice nor special effects in parenthesis
                        sbcConfig.options.debug && sbcUtils.log("Kind of embarrasing, but this should never happen.")
                    }

                    // Calculate Attack and, if needed, compensate for differences between input attackModifier and system-derived attackModifier
                    let calculatedAttackModifier =
                          +sbcData.characterData.conversionValidation.attributes.bab
                        + +CONFIG["PF1"].sizeMods[sbcData.characterData.actorData.system.traits.size]
                        + +m_ActionData.attackAbilityModifier

                    if (m_AttackData.isMasterwork || m_AttackData.enhancementBonus == 1)
                        calculatedAttackModifier += 1

                    if (m_AttackData.enhancementBonus > 1)
                        calculatedAttackModifier += +m_AttackData.enhancementBonus

                    if (!m_AttackData.isPrimaryAttack)
                        calculatedAttackModifier -= 5

                    if (+calculatedAttackModifier !== +m_ActionData.inputAttackModifier) {
                        m_ActionData.calculatedAttackBonus = +m_ActionData.inputAttackModifier - +calculatedAttackModifier
                    }

                    // Calculate Damage and, if needed, compensate for differences between input damageModifier and system-derived damageModifier
                    let strDamageBonus = 0
                    if (m_ActionData.damageAbilityType === "str") {
                        // Use the value given in the statblock instead of the one currently in the actor
                        strDamageBonus = +sbcUtils.getModifier(sbcData.notes.statistics.str)
                    }

                    let calculatedDamageBonus = (m_AttackData.isPrimaryAttack) ? +strDamageBonus + +m_AttackData.enhancementBonus : +strDamageBonus + +m_AttackData.enhancementBonus - 5
                    if((+m_ActionData.damageBonus - +calculatedDamageBonus === Math.floor(strDamageBonus / 2)) && strDamageBonus > 0) {
                        calculatedDamageBonus += Math.floor(strDamageBonus / 2);
                        m_ActionData.damageMult = 1.5;
                        m_AttackData.held = "2h";
                    }
                    m_ActionData.damageModifier = +m_ActionData.damageBonus - +calculatedDamageBonus

                    // Create the string needed for the damagePart
                    let damageDiceString =
                            m_ActionData.numberOfDamageDice
                        +   "d"
                        +   m_ActionData.damageDie

                    // ... and if there is a difference between the statblock and the calculation, add an adjustment modifier
                    if (m_ActionData.damageModifier !== 0)
                        if(m_ActionData.damageModifier > 0)
                            damageDiceString += "+" + m_ActionData.damageModifier + "[adjusted by sbc]";
                        else
                            damageDiceString += +m_ActionData.damageModifier + "[adjusted by sbc]";

                    // Try to find the defaultDamageType by checking if the attackName can be found in sbcContent.attackDamageTypes
                    // This is done to find common damage types of attacks and weapons
                    // e.g. bite is piercing, bludgeoning and slashing
                    let attackDamageTypeKeys = Object.keys(sbcContent.attackDamageTypes)
                    if (m_AttackData.attackName !== "") {
                        let damageTypePattern = new RegExp("(^\\b" + m_AttackData.attackName.replace(/(\bmwk\b|s$)/ig,"").trim() + "\\b$)", "ig");
                        let damageTypeFound = false

                        for (let x=0; x < attackDamageTypeKeys.length; x++) {
                            let attackDamageTypeKey = attackDamageTypeKeys[x]
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
                        }

                        if(m_AttackData.isNonlethal)
                            m_ActionData.damageTypes.push("nonlethal")

                        if (!damageTypeFound)
                            m_ActionData.damageTypes.push("untyped")
                    }

                    // Check for specialDamageTypes
                    // Check, if the attackEffect denotes a valid damageType for the base damage,
                    // and use this to override the default damage type

                    for (let k = 0; k<m_AttackData.effectNotes.length; k++) {
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
                    for (let i=1; i<m_ActionData.numberOfAttacks; i++) {
                        let prefixAttackName = i+1 + sbcConfig.const.suffixMultiples[Math.min(3, i)]
                        m_ActionData.attackParts.push(
                            [
                                "",
                                prefixAttackName + " " + sbcUtils.capitalize(m_AttackData.attackName.replace(/(s|es)$/, ""))
                            ]
                        )
                    }

                    // Push extra attacks from numberOfIterativeAttacks
                    // WIP: This does not register or handle statblocks with errors in the iterations
                    if (m_ActionData.numberOfIterativeAttacks > 0 || m_ActionData.numberOfAttacks === 0) {
                        m_ActionData.formulaicAttacksCountFormula = "ceil(@attributes.bab.total/5)-1"
                    }

                    // [5] Create an attack from m_AttackData

                    let m_NewAttack = new Item.implementation({
                        name: sbcUtils.capitalize(m_AttackData.formattedAttackName) || "undefined",
                        type: "attack",
                        img: m_AttackData.img,
                        system: {
                            attackNotes: sbcUtils.sbcSplit(m_AttackData.attackNotes),
                            effectNotes: m_AttackData.effectNotes,
                            masterwork: (m_AttackData.isMasterwork || (m_AttackData.enhancementBonus ?? 0) !== 0) ? true : false,
                            enh: m_AttackData.enhancementBonus,
                            proficient: true,
                            held: m_AttackData.held,
                            showInQuickbar: true,
                            subType: m_AttackData.subType,
                            identifiedName: sbcUtils.capitalize(m_AttackData.formattedAttackName) || "undefined"
                        },
                    });

                    m_NewAttack.prepareData()


                    // [6] Create an action from m_ActionData
                    //     which in turn needs to be pushed to the in [5] created attack

                    let m_NewAction = {
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
                        attackBonus: m_ActionData.calculatedAttackBonus > 0 ? m_ActionData.calculatedAttackBonus.toString() + "[adjusted by sbc]" : null,
                        critConfirmBonus: "",
                        damage: {
                            critParts: [],
                            nonCritParts: m_ActionData.nonCritParts,
                            parts: m_ActionData.damageParts
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
                        attackParts: m_ActionData.attackParts,
                        touch: m_AttackData.isTouch
                    }

                    // [7] Create the final document
                    //     and push it onto the stack of embeddedDocuments (e.g. items)
                    //     that get created in batch later

                    // Push the action into the array of FullAttackActions
                    m_FullAttackActions.push(m_NewAction)

                    // Push it into this attack as well
                    m_NewAttack.updateSource({"system.actions": [ m_NewAction ] })
                    m_NewAttack.prepareData()

                    // And lastly add the attack to the item stack
                    // sbcData.characterData.items.push(m_NewAttack)
                    await createItem(m_NewAttack);

                }

                // WIP: Maybe create a "FullAttack Action"
                //console.log("m_FullAttackActions")
                //console.log(m_FullAttackActions)

            }



            return true

        } catch (err) {

            let errorMessage = "Failed to parse " + value + " as " + type + "-Attack." + err
            let error = new sbcError(1, "Parse/Offense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
