import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { sbcContent } from "../../sbcContent.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Spell Books and Spell-Like Abilities
export class SpellBooksParser extends ParserBase {
    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log("Trying to parse the following Spell Book.")
        sbcConfig.options.debug && console.log(value)

        let spellCastingType = value.spellCastingType
        let spellCastingClass = value.spellCastingClass
        let casterLevel = +value.casterLevel
        let concentrationBonus = +value.concentrationBonus
        let spellRows = value.spells
        let spellBookType = value.spellBookType
        let isAlchemist = value.isAlchemist

        // Save Data needed for validation
        // and put it into the notes sections as well
        //sbcData.characterData.conversionValidation.spellBooks[spellBookType] = {
        //    casterLevel: +casterLevel,
        //    concentrationBonus: +concentrationBonus
        //}

        // Set the spellBook data
        let altNameSuffix = spellCastingType == "prepared" ? "Prepared" : "Known"
        if (spellCastingType == "points") altNameSuffix = "Psychic"

            // WIP: Check for special cases Arcanist and Red Mantis Assassin
            /*
             Arcanist: spellPreparationMode = "hybrid"
             Red Mantis Assassin: spellPreparationMode = "prestige"
            */

        let spellsOrExtracts = isAlchemist ? "Extracts" : "Spells"
        let arcaneSpellFailure = true
        let castingClass = spellCastingClass
        let castingAbility = "int";
        let classItem = null;
        let altName = ""
        let hasCantrips = false;
        let domainSlots = 0;
        let castingProgression = "high";
        let autoSpellCalc = false;
        let isPsychic = false;

        if (spellBookType == "spelllike") {
            altName = "Spell-like Abilities";
            arcaneSpellFailure = false;
            castingAbility = "cha";
        } else if (spellCastingType == "points") {
           altName = "Psychic Magic";
            arcaneSpellFailure = false;
            spellCastingType = "spontaneous";
            isPsychic = true;
        } else {
            castingClass = spellCastingClass.toLowerCase();
            altName = sbcUtils.capitalize(spellCastingClass) + " " + spellsOrExtracts + " " + altNameSuffix;
        }

        if(spellCastingClass !== "hd") {
                console.log(`Checking for class ${spellCastingClass}.`)
                let patternWizardClasses = new RegExp("(" + sbcContent.wizardSchoolClasses.join("\\b|\\b") + ")", "gi")
                if(spellCastingClass.match(patternWizardClasses)) spellCastingClass = "Wizard"
            classItem = sbcData.characterData.actorData.items.filter(i => i.type === "class" && i.system.tag === spellCastingClass.toLowerCase())[0] ?? null;
            if(classItem !== null) {
                    console.log(`Casting class: ${castingClass}.`)
                    console.log("Class item: ", classItem);
                casterLevel = classItem.system.level;
                castingClass = classItem.system.tag;
                castingAbility = classItem.system.casting.ability;
                spellCastingType = classItem.system.casting.type;
                hasCantrips = classItem.system.casting.cantrips;
                domainSlots = classItem.system.casting.domainSlots;
                castingProgression = classItem.system.casting.progression;
                autoSpellCalc = true;
                isPsychic = classItem.system.casting.spells === "psychic";
                arcaneSpellFailure = classItem.system.casting.spells === "arcane";

                for(const [type, book] of Object.entries(sbcData.characterData.actorData.system.attributes.spells.spellbooks)) {
                    if(book.class === spellCastingClass) {
                        spellBookType = type;
                        break;
                    }
                }
            }
        }

        concentrationBonus += +(sbcData.characterData.actorData.system.abilities[castingAbility].mod)
        // Save Data needed for validation
        // and put it into the notes sections as well
        sbcData.characterData.conversionValidation.spellBooks[spellBookType] = {
            casterLevel: +casterLevel,
            concentrationBonus: +concentrationBonus
        }
        await sbcData.characterData.actorData.update({
            "system.attributes": {
                spells: {
                    spellbooks: {
                        [spellBookType]: {
                            inUse: true,
                            altName,
                            class: castingClass,
                            ability: castingAbility,
                            // clNotes: "sbc | Total in statblock was CL " + casterLevel + ", adjust as needed.",
                            // concentrationNotes: "sbc | Total in statblock was +" + concentrationBonus + ", adjust as needed.",
                            arcaneSpellFailure: arcaneSpellFailure,
                            domainSlotValue: domainSlots,
                            casterType: castingProgression,
                            hasCantrips: hasCantrips,
                            autoSpellLevelCalculation: autoSpellCalc,
                            autoSpellLevels: false,
                            psychic: isPsychic,
                            spontaneous: spellCastingType !== "prepared",
                            spellPreparationMode: spellCastingType === "prepared" ? "prepared" : "spontaneous"
                        }
                    }
                }
            }
        })

        try {
            // Psychic
            if (spellCastingType == "points") {
                sbcData.characterData.actorData.update({
                    "system.attributes": {
                        spells: {
                            spellbooks: {
                                [spellBookType]: {
                                    spontaneous: false,
                                    spellPreparationMode: "spontaneous",
                                    spellPoints: {
                                        useSystem: true,
                                        maxFormula: "0",
                                        max: 0,
                                    },
                                    ability: sbcData.characterData.actorData.system.data.abilities.int.total >= sbcData.characterData.actorData.system.data.abilities.cha.total ? "int" : "cha",
                                }
                            }
                        }
                    }
                })
            }

            /* Parse the spell rows
             * line by line
             */
            for (let i=0; i<spellRows.length; i++) {
                let spellRow = spellRows[i]

                let spellLevel = -1
                let spellsPerX = ""
                let spellsPerXTotal = -1
                let isAtWill = false
                let isConstant = false
                let isWeekly = false
                let isMonthly = false
                let isYearly = false
                let isCantrip = false
                let isSpellRow = false

                // Get spellLevel, spellsPerX and spellsPerXTotal
                switch (spellCastingType) {
                    case "prepared":
                        if (/^(\d+)(?!\/(?:day|week|month|year))/.test(spellRow)) {
                            console.log(`Hit Case #1: ${spellRow}.`);
                            spellLevel = spellRow.match(/^(\d+)(?!\/(?:day|week|month|year))/)[1];
                            //spellsPerXTotal = spellRow.match(/(\d+)(?:\/(?:day|week|month|year))/)[1];
                            isSpellRow = true;
                        }
                        else if (/(\d+)(?:\/(?:day|week|month|year))/.test(spellRow)) {
                            console.log(`Hit Case #2: ${spellRow}.`);
                            spellsPerXTotal = spellRow.match(/(\d+)(?:\/(?:day|week|month|year))/)[1];
                            isSpellRow = true;
                        }
                        else if (spellRow.match(/(^\d)/) !== null) {
                            spellLevel = spellRow.match(/(^\d)/)[1];
                            isSpellRow = true;
                        }
                        break
                    case "spontaneous":
                        if (/^(\d+)\s*\bPE\b/.test(spellRow)) {
                            let PE = spellRow.match(/^(\d+)\s*\bPE\b/)[1];
                            sbcData.characterData.actorData.update({
                                "system.attributes": {
                                    spells: {
                                        spellbooks: {
                                            [spellBookType]: {
                                                spellPoints: {
                                                    maxFormula: PE,
                                                    value: +PE,
                                                }
                                            }
                                         }
                                     }
                                }
                            })
                            isSpellRow = true;
                        }
                        else if (/^(\d+)(?!\/(?:day|week|month|year))/.test(spellRow)) {
                            spellLevel = spellRow.match(/^(\d+)(?!\/(?:day|week|month|year))/)[1];
                            isSpellRow = true;
                        }
                        else if (/(\d+)(?:\/(?:day|week|month|year))/.test(spellRow)) {
                            spellsPerXTotal = spellRow.match(/(\d+)(?:\/(?:day|week|month|year))/)[1];
                            isSpellRow = true;
                        }
                        else if (/\/([a-zA-Z]*)\)*\-/.test(spellRow)) {
                            spellsPerX = spellRow.match(/(?:\d+)\/([a-zA-Z]*)\)*\-/)[1];
                        }
                        break;
                    default:
                        break;
                }

                // Check for "at will" and "constant"
                if (/(Constant)/i.test(spellRow)) {
                    isConstant = true;
                    isSpellRow = true;
                }

                if (/(\d+)\/week/i.test(spellRow)) {
                    isWeekly = true;
                }
                if (/(\d+)\/month/i.test(spellRow)) {
                    isMonthly = true;
                }
                if (/(\d+)\/year/i.test(spellRow)) {
                    isYearly = true;
                }

                if (/(At will|At-will)/i.test(spellRow)) {
                    isAtWill = true;
                    isSpellRow = true;
                }

                if (isSpellRow) {
                    let spells = sbcUtils.sbcSplit(spellRow.replace(/(^[^\-]*\-)/, ""), false)

                    let spellRowIsInitialized = false

                    // Loop through the spells
                    for (let j=0; j<spells.length; j++) {
                        let spell = spells[j].trim()
                        let spellMultiple = 1;
                        if(spell.match(/\(\d+\)$/) !== null) spellMultiple = parseInt(spell.match(/\(\d+\)$/)[0]?.replace(/\(|\)/, "") ?? 1);
                        let spellName = sbcUtils.parseSubtext(spell)[0].trim()
                        let isDomainSpell = false

                        // Check, if the spell is a domain spell
                        if (spellName.match(/[D]$/) !== null) {

                            isDomainSpell = true
                            // Remove Domain Notation at the end of spellNames
                            spellName = spellName.replace(/[D]$/, "")
                        }

                        let spellDC = -1

                        if (spell.search(/\bDC\b/) !== -1) {
                            spellDC = spell.match(/(?:DC\s*)(\d+)/)[1]
                        }

                        let spellPE = -1;
                        if (/\bPE\b/.test(spell)) {
                            spellPE = spell.match(/(\d+)\s*(?:PE)/)[1];
                        }

                        if (spellName !== "") {
                            let searchEntity = {
                                name: spellName,
                                type: "spell"
                            }

                            let compendium = "pf1.spells"

                            // If the input is found in one of the compendiums, generate an entity from that
                            let entity = await sbcUtils.findEntityInCompendium(compendium, searchEntity, "spell")
                            console.log("Entity is ", entity);
                            // otherwise overwrite "entity" with a placeholder
                            if (entity === null) {
                                entity = await sbcUtils.generatePlaceholderEntity(searchEntity, line)
                            }

                            // Edit the entity to match the data given in the statblock
                            entity.updateSource({"system.spellbook": spellBookType})

                            // Set the spellLevel
                            if (spellLevel !== -1) {
                                entity.updateSource({"system.level": +spellLevel})
                            }

                            // Set the spellDC
                            // This is the offset for the dc, not the total!
                            let spellDCOffset = 0

                            // Calculate the DC in the Actor
                            let spellCastingAbility = sbcData.characterData.actorData.system.attributes.spells.spellbooks[spellBookType].ability
                            let spellCastingAbilityModifier = sbcData.characterData.actorData.system.abilities[spellCastingAbility].mod
                            let spellDCInActor = 10 + +entity.system.level + +spellCastingAbilityModifier

                            spellDCOffset =  +spellDC - +spellDCInActor

                            // WIP, Save DC is now found in the action, not in the spell
                            if (spellDC !== -1) {

                                // Try yo get the action
                                let spellAction = entity.firstAction

                                // TODO: This may still be broken, check after v4.0.0

                                //spellAction.update({"data.save.dc": spellDCOffset.toString()})
                                entity.updateSource({
                                    firstAction: {
                                        "save.dc": 99
                                    }
                                })
                                //entity.updateSource({"firstAction.data.save.dc": "" + spellDCOffset.toString()});
                            }

                            // Set the spellPE
                            if (spellPE !== -1) {
                                entity.updateSource({"spellPoints.cost": "" + spellPE});
                            }

                            // Set the spells uses / preparation
                            // where SLAs can be cast a number of times per X per sla
                            // and spontaneous spells of a given spellLevel can be cast a total of X times per day
                            //

                            // Initialize some values for the row
                            if (!spellRowIsInitialized) {
                                sbcData.characterData.actorData.update({
                                    [`system.attributes.spells.spellbooks.${spellBookType}.spells.spell${entity.system.level}.base`]: 0
                                })
                                spellRowIsInitialized = true
                            }

                            // Do not count Constant and At Will spells towards spell slot totals
                            if (!isAtWill && !isConstant && !isCantrip) {
                                let spellsBase = sbcData.characterData.actorData.system.attributes.spells.spellbooks[spellBookType].spells["spell" + entity.system.level].base
                                let spellsMax = sbcData.characterData.actorData.system.attributes.spells.spellbooks[spellBookType].spells["spell" + entity.system.level].max

                                // Spell-Like Abilities can be cast a number of times per day each
                                if (spellsPerXTotal !== -1 && spellBookType === "spelllike") {
                                    entity.updateSource({
                                        system: {
                                            uses: {
                                                max: +spellsPerXTotal,
                                                value: +spellsPerXTotal,
                                                per: spellsPerX
                                            },
                                            preparation: {
                                                maxAmount: +spellsPerXTotal,
                                                preparedAmount: +spellsPerXTotal
                                            }
                                        }
                                    })

                                    // Change the spellbook for SLAs to prepared as long as the sheet does not support them correctly
                                    sbcData.characterData.actorData.update({ [`system.attributes.spells.spellbooks.${spellBookType}.spontaneous`]: false})

                                    spellsBase = +spellsPerXTotal
                                    spellsMax = +spellsPerXTotal
                                }

                                // Spells Known can be cast a number of times per day in total for the given spellRow
                                if (spellsPerXTotal !== -1 && spellCastingType === "spontaneous" && spellBookType !== "spelllike") {
                                    spellsBase = +spellsPerXTotal
                                    spellsMax = +spellsPerXTotal
                                }

                                // Spells Prepared can be cast a according to how often they are prepared
                                if (spellCastingType === "prepared") {
                                    // WIP: BUILD A CHECK FOR MULTIPLE PREPARATIONS OF THE SAME SPELL
                                    entity.updateSource({
                                        system: {
                                            preparation: {
                                                maxAmount: spellMultiple,
                                                preparedAmount: spellMultiple
                                            }
                                        }
                                    })

                                    spellsBase += spellMultiple;
                                    spellsMax += spellMultiple;
                                }

                                if (spellsBase !== undefined) sbcData.characterData.actorData.update({ [`system.attributes.spells.spellbooks.${spellBookType}.spells.spell${entity.system.level}.base`]: spellsBase})
                                if (spellsMax !== undefined) sbcData.characterData.actorData.update({ [`system.attributes.spells.spellbooks.${spellBookType}.spells.spell${entity.system.level}.max`]: spellsMax})
                            }

                            // Set At Will for spells marked as "at will" and for cantrips
                            if (isAtWill || entity.system.level === 0) {
                                entity.updateSource({ "system.atWill": true })
                            }

                            // Change SpellName to reflect constant spells
                            if (isConstant) {
                                entity.updateSource({
                                    name: "Constant: " + entity.name,
                                    system: {
                                        atWill: true
                                    }
                                })
                            } else if(isWeekly) {
                                entity.updateSource({
                                    name: "Weekly: " + entity.name
                                })
                            } else if(isMonthly) {
                                entity.updateSource({
                                    name: "Monthly: " + entity.name
                                })
                            } else if(isYearly) {
                                entity.updateSource({
                                    name: "Yearly: " + entity.name
                                })
                            }

                            // Set data for domain spells
                            if (isDomainSpell) {
                                entity.updateSource({
                                    system: {
                                        domain: true,
                                        slotClost: 1,
                                    }
                                })

                                let old = sbcData.characterData.actorData.system.attributes.spells.spellbooks[spellBookType].spells["spell" + spellLevel]
                                sbcData.characterData.actorData.update({
                                    [`system.attributes.spells.spellbooks.${spellBookType}.spells.spell${spellLevel}`]: {
                                        base: old.base - 1,
                                        max: old.max - 1,
                                    }
                                })
                            }

                            // sbcData.characterData.items.push(entity)
                            await createItem(entity);
                        }
                    }
                } else {
                    // Search for Domains, Mysteries, etc
                    if (spellRow.match(/(?:Domains\s)(.*$)/i) !== null) {
                        sbcData.characterData.actorData.update({ [`system.attributes.spells.spellbooks.${spellBookType}.domainSlotValue`]: 1 })

                        let domainNames = spellRow.match(/(?:Domains\s)(.*$)/i)[1]

                        // Create Class Feature for the Domain
                        let domains = {
                            name: "Domains: " + domainNames,
                            type: "domains",
                        }
                        let placeholder = await sbcUtils.generatePlaceholderEntity(domains, line)
                        // sbcData.characterData.items.push(placeholder)
                        await createItem(placeholder);
                    }

                    if (spellRow.match(/(?:Mystery\s)(.*$)/i) !== null) {
                        let domainNames = spellRow.match(/(?:Mystery\s)(.*$)/i)[1]

                        // Create Class Feature for the Domain
                        let mysteries = {
                            name: "Mysteries: " + domainNames,
                            type: "mysteries",
                        }

                        let placeholder = await sbcUtils.generatePlaceholderEntity(mysteries, line)
                        // sbcData.characterData.items.push(placeholder)
                        await createItem(placeholder);
                    }

                    if (spellRow.match(/(?:Opposition Schools\s)(.*$)/i) !== null) {
                        let oppositionSchools = spellRow.match(/(?:Opposition Schools\s)(.*$)/i)[1]

                        // Create Class Feature for the Domain
                        let oppositions = {
                            name: "Opposition Schools: " + oppositionSchools,
                            type: "oppositions",
                        }

                        let placeholder = await sbcUtils.generatePlaceholderEntity(oppositions, line)
                        // sbcData.characterData.items.push(placeholder)
                        await createItem(placeholder);
                    }
                }
            }

            return true

        } catch (err) {
            console.error(err);
            let errorMessage = "Failed to parse the following Spell Book."
            sbcConfig.options.debug && console.log(value)
            let error = new sbcError(1, "Parse/Offense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }
    }
}
