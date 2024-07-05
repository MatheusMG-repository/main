import { sbcUtils } from "../sbcUtils.js"
import { sbcData, sbcError } from "../sbcData.js"
import { sbcConfig } from "../sbcConfig.js"
import { parserMapping } from "../Parsers/parser-mapping.js";

/* ------------------------------------ */
/* Parser for statistics data           */
/* ------------------------------------ */

let gearParsed = false;
let hasGear = false;

function gearIsParsed(line, dataLength) {
    if (!hasGear) return true;
    return gearParsed || line === (dataLength - 1)
}

export async function parseStatistics(data, startLine) {
    sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | " + sbcData.parsedCategories + "/" + sbcData.foundCategories + " >> PARSING STATISTICS DATA")

    let parsedSubCategories = []
    sbcData.notes["statistics"] = {}
    sbcData.treasureParsing.statisticsStartLine = startLine
    let abilities = [];
    let skills = "";
    let abilitiesLine = 0;
    let skillsLine = 0;
    gearParsed = false;
    hasGear = data.some(line => /(Combat Gear|Other Gear|Gear)\b/i.test(line));

    // Loop through the lines
    for (let line = 0; line < data.length; line++) {

        try {
            let lineContent = data[line]

            // Parse Base Attack
            if (!parsedSubCategories["bab"]) {
                if (/^Base Atk\b/i.test(lineContent)) {
                    // let parserBab = parserMapping.map.statistics.bab
                    let bab = lineContent.match(/(?:Base Atk\b\s*)([+-]?\d+)/ig)[0].replace(/Base Atk\b\s*/i,"")

                    sbcData.characterData.conversionValidation.attributes["bab"] = +bab

                    //sbcData.characterData.conversionValidation.attributes["bab"] = +bab
                    // parsedSubCategories["bab"] = await parserBab.parse(+bab, startLine + line)
                }
            }

            // Parse CMB
            if (!parsedSubCategories["cmb"]) {
                if (/\bCMB\b/i.test(lineContent)) {
                    let parserCmb = parserMapping.map.statistics.cmb
                    let cmbRaw = lineContent.match(/CMB\s+([+-]?(\d+)?\s*(\(.*\))?;?)/i)[1].trim().replace(";", "");

                    let cmb = cmbRaw.match(/^([+-](\d+)?)/)?.[0] ?? null;
                    sbcConfig.options.flags.hasNoCMB = !cmb;
                    cmb = cmb ?? 0;

                    let cmbContext = sbcUtils.parseSubtext(cmbRaw)[1]

                    if(!sbcConfig.options.flags.hasNoCMB)
                        sbcData.characterData.conversionValidation.attributes["cmb"] = +cmb
                    if (cmbContext) {
                        sbcData.characterData.conversionValidation.context["cmb"] = cmbContext
                        sbcData.notes.statistics.cmbContext = " (" + cmbContext + ")"
                    }

                    parsedSubCategories["cmb"] = await parserCmb.parse(+cmb, startLine + line)
                }
            }

            // Parse CMD
            if (!parsedSubCategories["cmd"]) {
                if (/\bCMD\b/i.test(lineContent)) {
                    let parserCmd = parserMapping.map.statistics.cmd
                    let cmdRaw = lineContent.match(/CMD\s+([+-]?(\d+)?\s*(\(.*\))?;?)/i)[1].trim().replace(";", "");

                    // Check if CMD is "-"
                    let cmd = cmdRaw.match(/^[+-]?(\d+)?/)?.[0] ?? null;
                    sbcConfig.options.flags.hasNoCMD = !cmd;
                    cmd = cmd ?? 0;

                    let cmdContext = sbcUtils.parseSubtext(cmdRaw)[1]

                    sbcData.characterData.actorData.update({"system.attributes.cmdNotes": cmdContext})
                    if (cmdContext) sbcData.notes.statistics.cmdContext = " (" + cmdContext + ")"

                    if(!sbcConfig.options.flags.hasNoCMD)
                        sbcData.characterData.conversionValidation.attributes["cmd"] = +cmd
                    parsedSubCategories["cmd"] = await parserCmd.parse(+cmd, startLine + line)
                }
            }

            // Parse Feats
            if (!parsedSubCategories["feats"]) {
                if (/^Feats\b/i.test(lineContent)) {
                    // sbcData.characterData.actorData.prepareData();
                    let parserFeats = parserMapping.map.statistics.feats
                    let feats = lineContent.match(/(?:Feats\b\s*)(.*)/i)[1].replace(/\s*[,;]+/g,",").trim()
                    sbcData.notes.statistics.feats = feats
                    parsedSubCategories["feats"] = await parserFeats.parse(feats, startLine + line, "feats", "feat", "feat")

                    await processFeats();
                }
            }

            // Parse Languages
            if (!parsedSubCategories["languages"]) {
                if (/^Languages\b/i.test(lineContent)) {
                    // sbcData.characterData.actorData.prepareData();
                    let parserLanguages = parserMapping.map.statistics.languages
                    let languages = lineContent.match(/(?:Languages\b\s*)(.*)/i)[1].replace(/\s*[,;]+/g,",").trim()
                    sbcData.notes.statistics.languages = languages
                    parsedSubCategories["languages"] = await parserLanguages.parse(languages, startLine + line)
                }
            }

            // Parse SQ
            if (!parsedSubCategories["sq"]) {
              if (/^SQ\b/i.test(lineContent)) {
                let parserSQ = parserMapping.map.statistics.sq
                let sqs = lineContent.match(/(?:SQ\b\s*)(.*)/i)[1].replace(/\s*[,;]+\s*/g,",").trim()
                // parsedSubCategories["sq"] = await parserSQ.parse(sqs, startLine + line)
                parsedSubCategories["sq"] = await parserSQ.parse(sqs, line+startLine, ["monster-abilities", "class-abilities"], ["equipment", "feat", "weapon"], false)
              }
            }

            // Parse Gear
            //if (!parsedSubCategories["gear"]) {
                if (/(Combat Gear|Other Gear|Gear)\b/i.test(lineContent)) {
                    let parserGear = parserMapping.map.statistics.gear
                    // Combat Gear, Other Gear, Gear
                    let gear = lineContent.replace(/(Combat Gear|Other Gear|Gear)/g, "").replace(/[,;]+/g,",").replace(/[,;]$/, "").trim()

                    if (!sbcData.notes.statistics.gear) {
                        sbcData.notes.statistics.gear = gear
                    } else {
                        sbcData.notes.statistics.gear += gear
                    }

                    parsedSubCategories["gear"] = await parserGear.parse(gear, startLine + line)
                    gearParsed = true;
                }
            //}

            // Parse Abilities
            if (!parsedSubCategories["abilities"]) {
                if (/(?:(Str|Dex|Con|Int|Wis|Cha)\s*(\d+|-))/i.test(lineContent) && !abilities.length) {
                    // Cache the abilities so that we can process them after the gear is parsed.
                    abilities = lineContent.match(/((Str|Dex|Con|Int|Wis|Cha)\s*(\d+|-))/gi);
                    abilitiesLine = line;
                    console.log("Abilities 1", abilities)
                }

                if (gearIsParsed( line, data.length) && abilities.length > 0) {
                    console.log("Abilities 2", abilities)
                    for (let i=0; i<abilities.length; i++) {
                        let ability = abilities[i].match(/(\w+)/)[1]
                        let valueInStatblock = abilities[i].match(/(\d+|-)/)[1]

                        // FLAGS NEED TO BE WORKED ON AFTER PARSING IS FINISHED
                        if (valueInStatblock === "-" || valueInStatblock === 0 || valueInStatblock === "0") {
                            valueInStatblock = 0
                            let flagKey = "no" + sbcUtils.capitalize(ability)
                            sbcConfig.options.flags[flagKey] = true
                        }

                        // CHECK CURRENT ITEMS FOR CHANGES IN ABILITIES (MAINLY RACES)
                        // Check the current Items for changes to ablities
                        // let currentItems = sbcData.characterData.items
                        let currentItems = sbcData.characterData.actorData.items.contents;
                                                
                        let currentItemsKeys = Object.keys(currentItems)

                        let abilityChangesInItems = 0

                        for (let i=0; i<currentItemsKeys.length; i++) {
                            
                            let currentItem = currentItems[currentItemsKeys[i]]

                            // Check if the item has Changes
                            if (currentItem.system.changes) {
                                let currentItemChanges = currentItem.system.changes

                                let currentItemWithAbilityChanges = currentItemChanges.find( function (element) {
                                    if(element.target === ability.toLowerCase()) {
                                        return element
                                    }
                                })

                                if (currentItemWithAbilityChanges !== undefined) {
                                    let processedFormula = await Roll.fromTerms(Roll.parse(currentItemWithAbilityChanges.formula, sbcData.characterData.actorData.getRollData())).evaluate();
                                    // await new Roll(currentItemWithAbilityChanges.formula).evaluate();
                                    abilityChangesInItems += processedFormula?.total ?? +currentItemWithAbilityChanges.formula
                                }
                            }

                        }

                        let correctedValue = +valueInStatblock - +abilityChangesInItems

                        sbcData.characterData.conversionValidation.attributes[ability] = +valueInStatblock
                        sbcData.notes.statistics[ability.toLowerCase()] = +valueInStatblock

                        let parser = parserMapping.map.statistics[ability.toLowerCase()]
                        await parser.parse(+correctedValue, abilitiesLine)
                    }

                    parsedSubCategories["abilities"] = true
                }
            }

            // Parse Skills
            if (!parsedSubCategories["skills"]) {
                if (/^Skills\b/i.test(lineContent)) {
                    skills = lineContent.match(/(?:Skills\b\s*)(.*)/i)[1].replace(/\s*[,;]+/g,",").trim()
                    skillsLine = line;
                }

                if (parsedSubCategories["abilities"] && skills) {
                    // sbcData.characterData.actorData.prepareData();
                    let parserSkills = parserMapping.map.statistics.skills
                    
                    sbcData.notes.statistics.skills = skills
                    parsedSubCategories["skills"] = await parserSkills.parse(skills, startLine + skillsLine)
                }
            }

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Parsing the statistics data failed at the highlighted line"
            let error = new sbcError(1, "Parse/Statistics", errorMessage, (startLine+line) )
            sbcData.errors.push(error)
            sbcData.parsedInput.success = false
            return false

        }
    }

    sbcUtils.log("RESULT OF PARSING STATISTICS DATA (TRUE = PARSED SUCCESSFULLY)")
    sbcConfig.options.debug && console.log(parsedSubCategories)
    sbcConfig.options.debug && console.groupEnd()

    return true

}

async function processFeats() {
    let feats = sbcData.characterData.actorData.itemTypes.feat.filter(feat => feat.system.subType === "feat");

    for (let feat of feats) {
        let featName = feat.name.toLowerCase();
        let featSubtext = sbcUtils.parseSubtext(featName)[1];
        if(!featSubtext) continue;

        if (/greater weapon focus/.test(featName)) {
            sbcData.characterData.weaponFocusGreater.push(featSubtext);
        }
        else if(/weapon focus/.test(featName)) {
            sbcData.characterData.weaponFocus.push(featSubtext);
        }
        else if(/greater weapon specialization/.test(featName)) {
            sbcData.characterData.weaponSpecializationGreater.push(featSubtext);
        }
        else if(/weapon specialization/.test(featName)) {
            sbcData.characterData.weaponSpecialization.push(featSubtext);
        }
    }

    sbcConfig.options.debug && console.log("Weapon Focus", sbcData.characterData.weaponFocus);
    sbcConfig.options.debug && console.log("Weapon Focus Greater", sbcData.characterData.weaponFocusGreater);
    sbcConfig.options.debug && console.log("Weapon Specialization", sbcData.characterData.weaponSpecialization);
    sbcConfig.options.debug && console.log("Weapon Specialization Greater", sbcData.characterData.weaponSpecializationGreater);
}