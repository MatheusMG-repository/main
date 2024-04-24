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

        // Set the spellBook data
        let altNameSuffix = spellCastingType == "prepared" ? "Prepared" : "Known"
        if (spellCastingType == "points") altNameSuffix = "Psychic"

        // WIP: Check for special cases Arcanist and Red Mantis Assassin
        /*
            Arcanist: spellPreparationMode = "hybrid"
            Red Mantis Assassin: spellPreparationMode = "prestige"
        */

        let spellsOrExtracts = isAlchemist ? "Extracts" : "Spells"
        let classItem = null;
        let hasCantrips = true;
        let domainSlots = 0;
        let isPsychic = false;

        // General spellbook update defaults
        let spellBookUpdates = {
            domainSlotValue: domainSlots,
            psychic: isPsychic,
            spontaneous: spellCastingType !== "prepared",
            spellPreparationMode: spellCastingType === "prepared" ? "prepared" : "spontaneous",
        }

        // Now customize the spellbook updates based on type of casting
        if (spellBookType == "spelllike") {                 // Spell-Like Abilities
            spellBookUpdates = mergeObject(spellBookUpdates, {
                ability: "cha",
                arcaneSpellFailure: false,
                name: "Spell-like Abilities",
                hasCantrips: hasCantrips,
            });
        } else if (spellCastingType == "points") {          // Psychic Magic
            spellBookUpdates = mergeObject(spellBookUpdates, {
                arcaneSpellFailure: false,
                name: "Psychic Magic",
                hasCantrips: true,
                isPsychic: true,
                spontaneous: false,
                spellPreparationMode: "spontaneous",
                spellPoints: {
                    useSystem: true,
                    maxFormula: "0",
                    max: 0,
                },
                ability: sbcData.characterData.actorData.system.data.abilities.int.total >= sbcData.characterData.actorData.system.data.abilities.cha.total ? "int" : "cha",
            });
        } else {                                            // Spell Books
            spellBookUpdates = mergeObject(spellBookUpdates, {
                class: spellCastingClass.toLowerCase(),
                name: sbcUtils.capitalize(spellCastingClass) + " " + spellsOrExtracts + " " + altNameSuffix,
            });
        }

        // If the class isn't based on hit dice, try to use the class
        if(["hd", "_hd"].includes(spellCastingClass) === false) {
            let patternWizardClasses = new RegExp("(" + sbcContent.wizardSchoolClasses.join("\\b|\\b") + ")", "gi")
            if(spellCastingClass.match(patternWizardClasses)) spellCastingClass = "Wizard"

            // Try to find the spellcasting class
            classItem = sbcData.characterData.actorData.items.filter(i => i.type === "class" && i.system.tag === spellCastingClass.toLowerCase())[0] ?? null;
            
            // If the class is found, update the spellbook updates
            if(classItem) {
                casterLevel = Math.min(casterLevel, classItem.system.level);

                for(const [type, book] of Object.entries(sbcData.characterData.actorData.system.attributes.spells.spellbooks)) {
                    if(book.class === spellCastingClass.toLowerCase()) {
                        spellBookType = type;
                        break;
                    }
                }

                delete spellBookUpdates["name"];
                spellBookUpdates = mergeObject(spellBookUpdates, {
                    class: classItem.system.tag,
                    ability: classItem.system.casting.ability,
                    arcaneSpellFailure: classItem.system.casting.spells === "arcane",
                    domainSlotValue: classItem.system.casting.domainSlots,
                    casterType: classItem.system.casting.progression,
                    hasCantrips: classItem.system.casting.cantrips,
                    autoSpellLevelCalculation: true,
                    psychic: classItem.system.casting.spells === "psychic",
                    spontaneous: classItem.system.casting.type,
                    spellPreparationMode: classItem.system.casting.type === "prepared" ? "prepared" : "spontaneous",
                });
            }
        } else if (spellCastingClass === "hd") {
            spellBookUpdates = mergeObject(spellBookUpdates, {
                class: "_hd",
                ability: "cha",
                inUse: true,
            });
        }


        // Save Data needed for validation
        // and put it into the notes sections as well
        sbcData.characterData.conversionValidation.spellBooks[spellBookType] = {
            casterLevel: +casterLevel,
            concentrationBonus: +concentrationBonus
        }

        // Run all the updates at once
        await sbcData.characterData.actorData.update({
            [`system.attributes.spells.spellbooks.${spellBookType}`]: spellBookUpdates
        })

        try {
            /* Parse the spell rows
             * line by line
             */
            for (let i=0; i<spellRows.length; i++) {
                if (spellRows[i] === "") continue
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
                            // console.log(`Hit Case #1: ${spellRow}.`);
                            spellLevel = spellRow.match(/^(\d+)(?!\/(?:day|week|month|year))/)[1];
                            isSpellRow = true;
                        }
                        else if (/(\d+)(?:\/(?:day|week|month|year))/.test(spellRow)) {
                            // console.log(`Hit Case #2: ${spellRow}.`);
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

                            // Update psychic spell points
                            sbcData.characterData.actorData.update({
                                [`system.attributes.spells.spellbooks.${spellBookType}.spellPoints`]: {
                                    maxFormula: PE,
                                    value: +PE,
                                }
                            });
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

                // Check for use frequencies
                if (/(Constant)/i.test(spellRow)) {
                    isConstant = true;
                    isSpellRow = true;
                }
                else if (/(\d+)\/week/i.test(spellRow))  isWeekly = true;
                else if (/(\d+)\/month/i.test(spellRow)) isMonthly = true;
                else if (/(\d+)\/year/i.test(spellRow))  isYearly = true;
                else if (/(At will|At-will)/i.test(spellRow)) {
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
                        
                        await createItem(placeholder);
                    }

                    if (spellRow.match(/(?:(Opposition|Prohibited) Schools\s)(.*$)/i) !== null) {
                        let [_, oppositionTag, oppositionSchools] = spellRow.match(/(?:(Opposition|Prohibited) Schools\s)(.*$)/i)

                        // Create Class Feature for the Domain
                        let oppositions = {
                            name: `${oppositionTag} Schools: ${oppositionSchools}`,
                            type: "oppositions",
                        }

                        let placeholder = await sbcUtils.generatePlaceholderEntity(oppositions, line)
                        
                        await createItem(placeholder);
                    }
                }
            }

            // Return true for the try, and the spellBookType for further processing.
            return [true, spellBookType]

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse the following Spell Book."
            sbcConfig.options.debug && console.log(value)
            let error = new sbcError(1, "Parse/Offense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }
    }
}
