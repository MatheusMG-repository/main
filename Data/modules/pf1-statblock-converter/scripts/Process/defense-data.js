import { sbcUtils } from "../sbcUtils.js"
import { sbcData, sbcError } from "../sbcData.js"
import { sbcConfig } from "../sbcConfig.js"
import { parserMapping } from "../Parsers/parser-mapping.js";

/* ------------------------------------ */
/* Parser for defense data              */
/* ------------------------------------ */
export async function parseDefense(data, startLine) {
    sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | " + sbcData.parsedCategories + "/" + sbcData.foundCategories + " >> PARSING DEFENSE DATA")

    let parsedSubCategories = []
    sbcData.notes["defense"] = {}

    // Loop through the lines
    for (let line = 0; line < data.length; line++) {

        try {
            let lineContent = data[line]

            // Parse Normal AC
            if (!parsedSubCategories["acNormal"]) {
                if (/^AC\s*(\d+)/.test(lineContent)) {
                    let parserAcNormal = parserMapping.map.defense.acNormal
                    let acNormal = lineContent.match(/^AC\s*(\d+)/i)[1].trim()

                    sbcData.notes.defense["acNormal"] = acNormal
                    sbcData.characterData.conversionValidation.attributes["acNormal"] = +acNormal

                    parsedSubCategories["acNormal"] = await parserAcNormal.parse(+acNormal, line+startLine)
                }
            }

            // Parse Touch AC
            if (!parsedSubCategories["acTouch"]) {
                if (/Touch\s*(\d+)/i.test(lineContent)) {
                    let parserAcTouch = parserMapping.map.defense.acTouch
                    let acTouch = lineContent.match(/Touch\s*(\d+)/i)[1].trim()

                    sbcData.notes.defense["acTouch"] = acTouch
                    sbcData.characterData.conversionValidation.attributes["acTouch"] = +acTouch

                    parsedSubCategories["acTouch"] = await parserAcTouch.parse(+acTouch, line+startLine)
                }
            }

            // Parse Flat-footed AC
            if (!parsedSubCategories["acFlatFooted"]) {
                if (/flat-footed\s*(\d+)/i.test(lineContent)) {
                    let parserAcFlatFooted = parserMapping.map.defense.acFlatFooted
                    let acFlatFooted = lineContent.match(/flat-footed\s*(\d+)/i)[1].trim()
                    sbcData.notes.defense["acFlatFooted"] = acFlatFooted
                    sbcData.characterData.conversionValidation.attributes["acFlatFooted"] = +acFlatFooted

                    parsedSubCategories["acFlatFooted"] = await parserAcFlatFooted.parse(+acFlatFooted, line+startLine)
                }
            }

            // Parse AC Types
            if (!parsedSubCategories["acTypes"]) {
                if (/^(?:AC[^(]*[(])([^)]*)/i.test(lineContent)) {
                    let parserAcTypes = parserMapping.map.defense.acTypes
                    let acTypes = lineContent.match(/^(?:AC[^(]*[(])([^)]*)/i)[1].trim()

                    sbcData.characterData.conversionValidation.attributes["acTypes"] = acTypes

                    parsedSubCategories["acTypes"] = await parserAcTypes.parse(acTypes, line+startLine)
                }
            }

            // Parse HP and HD
            if (!parsedSubCategories["hp"]) {
                if (/^(?:HP)(.*)/i.test(lineContent)) {
                    let parserHp = parserMapping.map.defense.hp
                    let hp = lineContent.match(/^(?:HP)(.*)/i)[1].trim()

                    parsedSubCategories["hp"] = await parserHp.parse(hp, line+startLine)
                }
            }

            // Parse Saves
            if (!parsedSubCategories["saves"]) {
                if (/^(Fort\b.*)/i.test(lineContent)) {
                    let parserSaves = parserMapping.map.defense.saves
                    let saves = lineContent.match(/^(Fort.*)/i)[1].trim()
                    parsedSubCategories["saves"] = await parserSaves.parse(saves, line+startLine)
                }
            }

            // Parse Damage Reduction
            if (!parsedSubCategories["dr"]) {
                if (/(\bDR\b)/i.test(lineContent)) {
                    let parserDr = parserMapping.map.defense.dr
                    let dr = lineContent.match(/(?:\bDR\b\s*)([^;,]*)/i)[1].trim()
                    parsedSubCategories["dr"] = await parserDr.parse(dr, line+startLine)
                }
            }

            // Parse Immunities
            if (!parsedSubCategories["immune"]) {
                if (/(Immune\b.*)/i.test(lineContent)) {
                    let parserImmune = parserMapping.map.defense.immune
                    let immunities = lineContent.match(/(?:Immune)([\s\S]*?)(?=$|Resist|SR|Weakness)/i)[1].trim()
                    parsedSubCategories["immune"] = await parserImmune.parse(immunities, line+startLine)
                }
            }

            // Parse Resistances
            if (!parsedSubCategories["resist"]) {
                if (/(\bResist\b.*)/i.test(lineContent)) {
                    let parserResist = parserMapping.map.defense.resist
                    let resistances = lineContent.match(/(?:\bResist\b)([\s\S]*?)(?=$|SR|Immune|Weakness)/i)[1].trim()
                    parsedSubCategories["resist"] = await parserResist.parse(resistances, line+startLine)
                }
            }

            // Parse Weaknesses / Vulnerabilities
            if (!parsedSubCategories["weakness"]) {
                if (/(Weakness.*)/i.test(lineContent)) {
                    let parserWeakness = parserMapping.map.defense.weakness
                    let weaknesses = lineContent.match(/(?:Weaknesses|Weakness)([\s\S]*?)(?=$|Resist|Immune|SR)/i)[1].trim()
                    parsedSubCategories["weakness"] = await parserWeakness.parse(weaknesses, line+startLine)
                }
            }

            // Parse Spell Resistance
            if (!parsedSubCategories["sr"]) {
                if (/(\bSR\b.*)/i.test(lineContent)) {
                    let parserSr = parserMapping.map.defense.sr
                    let sr = lineContent.match(/(?:\bSR\b\s*)([^;,]*)/i)[1].trim()
                    parsedSubCategories["sr"] = await parserSr.parse(sr, line+startLine)
                }
            }


            // Parse Defensive Abilities
            if (!parsedSubCategories["defensiveAbilities"]) {
                if (/Defensive Abilities\b/i.test(lineContent)) {
                    let parserDefensiveAbilities = parserMapping.map.defense.defensiveAbilities
                    let defensiveAbilities = lineContent.match(/(?:Defensive Abilities\b\s*)([\s\S]*?)(?=$|\bDR\b|\bImmune\b|\bResist\b(?!\s\blife\b)|\bSR\b|\bWeakness\b)/i)[1].replace(/\s*[,;]+/g,",").replace(/(,\s*$)/, "").trim()
                    sbcData.notes.defense.defensiveAbilities = defensiveAbilities
                    parsedSubCategories["defensiveAbilities"] = await parserDefensiveAbilities.parse(defensiveAbilities, line+startLine, "class-abilities", ["classFeat", "buff", "consumable", "equipment", "feat", "loot", "weapon"])
                }
            }


        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = `Parsing the defense data failed at line ${line+startLine}`
            let error = new sbcError(1, "Parse/Defense", errorMessage, line+startLine)
            sbcData.errors.push(error)
            //throw err
            return false
        }

    }

    sbcUtils.log("RESULT OF PARSING DEFENSE DATA (TRUE = PARSED SUCCESSFULLY)")
    sbcConfig.options.debug && console.log(parsedSubCategories, sbcData.characterData.actorData.system)
    sbcConfig.options.debug && console.groupEnd()

    return true
}
