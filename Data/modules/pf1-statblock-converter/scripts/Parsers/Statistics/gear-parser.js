import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Gear
export class GearParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as gear")

        try {

            const weaponCompendium = "pf1.weapons-and-ammo"
            const armorCompendium = "pf1.armors-and-shields"
            const itemCompendium = "pf1.items"
            const spellCompendium = "pf1.spells";

            // let patternSupportedWeapons = new RegExp("(" + sbcConfig.weapons.join("\\b|\\b") + ")", "gi")
            // let patternSupportedArmors = new RegExp("(" + sbcConfig.armors.join("\\b|\\b") + ")", "gi")
            // let patternSupportedItems = new RegExp("(" + sbcConfig.items.join("\\b|\\b") + ")", "gi")
            let patternSupportedSpells = /(potion|wand|scroll)s?\s+of\s+(.+)/i;
            let patternGold = new RegExp("^(\\d+[\\.,]*\\d*\\s+)(?:PP|GP|SP|CP)$", "i")
            let patternTechColor = new RegExp("(" + sbcConfig.techColors.join("\\b|\\b") + ")", "gi");
            let patternTechTier = new RegExp("(" + sbcConfig.techTiers.join("\\b|\\b") + ")", "gi");
            let patternAbilities = new RegExp("(" + sbcConfig.magicalAbilities.join("\\b|\\b") + ")", "gi");

            let gears = sbcUtils.sbcSplit(value, false)
            let placeholdersGenerated = []

            let gearItemTypes = ["consumable", "equipment", "loot", "weapon"];

            for (let i=0; i<gears.length; i++) {

                let input = gears[i].trim()
                let splitInput = sbcUtils.parseSubtext(input)
                let gearText = splitInput[0]
                let gearSubtext = splitInput[1]
                let altName = gearText.replace(/^([\d+]+|masterwork|mwk)/g, "").trim();
                let quantity = 1;

                // Handle plurals
                altName = altName.replace(/ies$/gi, "y");
                altName = altName.replace(/(?!Charges)s$/gi, "");

                // Preserve text inside ( ) for a backup search
                if(gearSubtext && gearSubtext.length > 0) {
                  if(gearSubtext.search(/\d+$/) !== -1 && !patternSupportedSpells.test(gearText)) {
                    quantity = +gearSubtext;

                  }
                  else altName = altName + ` (${gearSubtext})`;
                }

                // Handle tech items being color-coded
                if(altName.search(patternTechColor) !== -1) {
                  let color = altName.match(patternTechColor)[0];
                  altName = altName.replace(patternTechColor, "") + `(${color})`;
                }

                // Handle the different tiers of tech items
                if(altName.search(patternTechTier) !== -1) {
                  let tier = altName.match(patternTechTier)[0];
                  altName = altName.replace(patternTechTier, "") + `(${tier})`;
                }

                // Handle the magical abilities
                if(altName.search(patternAbilities) !== -1) {
                  altName = altName.replace(patternAbilities, "");
                }

                // Handle misc modifier terms
                altName = altName.replace(/\W?(Integrated|Implanted|Timeworn|with 20 arrow)\W?/gi, "");

                // Special case for grenades
                if(altName.search(/grenade$/gi) !== -1) {
                  altName = `Grenade (${altName})`;
                }

                let gear = {
                    type: "loot",
                    name: gearText.replace(/^([\d+]+|masterwork|mwk)/g, "").trim(),
                    altName: altName,
                    rawName: input.replace(/(\(\d+\)|\swith 20 arrows)/gi, "").trim(),
                    subtext: gearSubtext,
                    value: 0,
                    enhancementValue: 0,
                    enhancementTypes: [],
                    mwk: false,
                    quantity: quantity,
                    timeworn: false,
                    broken: false
                }

                let gearKeys = Object.keys(gear)

                if (/^\+/.test(gearText)) {
                  gear.enhancementValue = +gearText.match(/(\d+)/)[1].trim()
                }

                if (/(masterwork|mwk)/.test(gearText)) {
                  gear.mwk = true
                }

                if (/timeworn/i.test(gearText)) {
                  gear.timeworn = true
                }
                
                if (/broken/i.test(gearText)) {
                  gear.broken = true
                }

                let entity = {}

                // Disabled by Fair Strides - 07/30/2023 - Inhibited customized FindInCompendia
                // if (patternSupportedWeapons.test(gearText)) {
                //     patternSupportedWeapons.lastIndex = 0
                //     // If the input is a weapon in one of the compendiums
                //     gear.type = "weapon"
                //     entity = await sbcUtils.findEntityInCompendium(weaponCompendium, gear, gear.type)

                // } else if (patternSupportedArmors.test(gearText)) {
                //     patternSupportedArmors.lastIndex = 0
                //     // If the input is a armor in one of the compendiums
                //     gear.type = "equipment"
                //     entity = await sbcUtils.findEntityInCompendium(armorCompendium, gear, gear.type)

                // } else if (patternSupportedItems.test(gearText)) {
                //     patternSupportedItems.lastIndex = 0
                //     // If the input is a item in one of the compendiums
                //     gear.type = "loot"
                //     entity = await sbcUtils.findEntityInCompendium(itemCompendium, gear, gear.type)

                // } else if (patternGold.test(gearText)) {
                if (patternGold.test(gearText)) {
                    patternGold.lastIndex = 0
                    // If the input is Money
                    gear.name = "Money Pouch"
                    gear.type = "container"
                    gear.currency = {
                        pp: splitInput[0].search(/\bPP\b/i) !== -1 ? +splitInput[0].match(/(\d+)(?:\s*PP)/i)[1] : 0,
                        gp: splitInput[0].search(/\bGP\b/i) !== -1 ? +splitInput[0].match(/(\d+)(?:\s*GP)/i)[1] : 0,
                        sp: splitInput[0].search(/\bSP\b/i) !== -1 ? +splitInput[0].match(/(\d+)(?:\s*SP)/i)[1] : 0,
                        cp: splitInput[0].search(/\bCP\b/i) !== -1 ? +splitInput[0].match(/(\d+)(?:\s*CP)/i)[1] : 0
                    }

                } else if (patternSupportedSpells.test(gearText)) {
                    patternSupportedSpells.lastIndex = 0
                    gear.type = "consumable";

                    let namePattern = gearText.match(patternSupportedSpells);
                    let consumableType = namePattern[1]?.toLowerCase();
                    let spellName = namePattern[2];
                    let charges = gearSubtext?.match(/\d+/)?.[0] ?? (/wand/i.test(consumableType) ? 50 : 1);

                    entity = await sbcUtils.findEntityInCompendium(spellCompendium, {name: spellName}, "spell");
                    if (entity) {
                        const consumable = await CONFIG.Item.documentClasses.spell.toConsumable(entity.toObject(), consumableType);

                        if (consumableType == "wand")
                            consumable.system.uses.value = parseInt(charges);
                        else
                            consumable.system.quantity = parseInt(charges);
                        gear.rawName = consumable.name;
                        // Following is somewhat redundant re-creation
                        entity = new Item.implementation(consumable);
                    }
                } else {
                  entity = await sbcUtils.findEntityInCompendium(itemCompendium, gear, gearItemTypes);

                  if (!entity) {
                    entity = await sbcUtils.findEntityInCompendium(armorCompendium, gear, gearItemTypes);
                  }
                  if (!entity) {
                    entity = await sbcUtils.findEntityInCompendium(weaponCompendium, gear, gearItemTypes);
                  }
                }

                if (entity && Object.keys(entity).length !== 0) {
                    entity.updateSource({
                        name: sbcUtils.capitalize(gear.rawName),
                        system: {
                            identifiedName: sbcUtils.capitalize(gear.rawName)
                        }
                    })

                    for (let i=0; i<gearKeys.length; i++) {
                      let key = gearKeys[i]
                      let change = gear[key]

                      if (change) {
                          switch (key) {
                              case "enhancementValue":
                                if (entity.type === "weapon") {
                                  entity.updateSource({
                                      system: {
                                          enh: +change,
                                          masterwork: true,
                                      }
                                  })
                                } else if (entity.type === "equipment") {
                                  entity.updateSource({
                                      system: {
                                          masterwork: true,
                                          armor: {
                                              enh: +change,
                                          }
                                      }
                                  })
                                } else {
                                  break
                                }
                                break
                              case "mwk":
                                entity.updateSource({ "masterwork": change })
                                break
                              case "value":
                                entity.updateSource({ "price": +change })
                                break
                              case "quantity":
                                entity.updateSource({ "system.quantity": +change });
                                break
                              case "timeworn":
                                entity.updateSource({ "system.timeworn": change });
                                break
                              case "broken":
                                entity.updateSource({ "system.broken": change });
                                break
                              default:
                                break
                          }
                      }
                    }

                    // sbcData.characterData.items.push(entity)
                    await createItem(entity);
                } else {
                    gear.name = input
                    let placeholder = await sbcUtils.generatePlaceholderEntity(gear, line)
                    // sbcData.characterData.items.push(placeholder)
                    await createItem(placeholder);
                    placeholdersGenerated.push(sbcUtils.capitalize(gear.name))
                }

            }

            if (placeholdersGenerated.length > 0) {
                let infoMessage = "Generated Placeholders for the following Entities: " + placeholdersGenerated.join(", ")
                let info = new sbcError(3, "Entity/Placeholder", infoMessage, line)
                sbcData.errors.push(info)
            }

            // classItems were created successfully
            return true

        } catch (err) {

            let errorMessage = "Failed to parse " + value + " as gear."
            let error = new sbcError(2, "Parse/Statistics", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
