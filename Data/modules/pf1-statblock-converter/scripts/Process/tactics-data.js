import { sbcUtils } from "../sbcUtils.js"
import { sbcData, sbcError } from "../sbcData.js"
import { sbcConfig } from "../sbcConfig.js"
import { parserMapping } from "../Parsers/parser-mapping.js";

/* ------------------------------------ */
/* Parser for tactics data              */
/* ------------------------------------ */
export async function parseTactics(data, startLine) {
    sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | " + sbcData.parsedCategories + "/" + sbcData.foundCategories + " >> PARSING TACTICS DATA")

    let parsedSubCategories = []
    sbcData.notes["tactics"] = {
        hasTactics: true
    }

    let parserTactics = parserMapping.map.tactics

    // Loop through the lines
    for (let line = 0; line < data.length; line++) {

        try {
            let lineContent = data[line]

            // Parse Before Combat
            if (!parsedSubCategories["beforeCombat"]) {
                if (/(Before Combat)/i.test(lineContent)) {
                    let beforeCombat = {
                        name: "Before Combat",
                        entry: lineContent.match(/^(?:Before Combat)([\s\S]*?)(?=$|During Combat|Morale|Base Statistics)/i)[1]                       
                    }
                    sbcData.notes.tactics.beforeCombat = beforeCombat.entry
                    parsedSubCategories["beforeCombat"] = await parserTactics.parse(beforeCombat, startLine + line)
                }
            }

            // Parse During Combat
            if (!parsedSubCategories["duringCombat"]) {
                if (/(During Combat)/i.test(lineContent)) {
                    let duringCombat = {
                        name: "During Combat",
                        entry: lineContent.match(/^(?:During Combat)([\s\S]*?)(?=$|Morale|Base Statistics)/i)[1]                       
                    }
                    sbcData.notes.tactics.duringCombat = duringCombat.entry
                    parsedSubCategories["duringCombat"] = await parserTactics.parse(duringCombat, startLine + line)
                }
            }

            // Parse Morale
            if (!parsedSubCategories["morale"]) {
                if (/(Morale)/i.test(lineContent)) {
                    let morale = {
                        name: "Morale",
                        entry: lineContent.match(/^(?:Morale)([\s\S]*?)(?=$|Base Statistics)/i)[1]                       
                    }
                    sbcData.notes.tactics.morale = morale.entry
                    parsedSubCategories["morale"] = await parserTactics.parse(morale, startLine + line)
                }
            }

            // Parse Base Statistics
            if (!parsedSubCategories["baseStatistics"]) {
                if (/(Base Statistics)/i.test(lineContent)) {
                    let baseStatistics = {
                        name: "Base Statistics",
                        entry: lineContent.match(/^(?:Base Statistics)([\s\S]*?)$/i)[1]                       
                    }
                    sbcData.notes.tactics.baseStatistics = baseStatistics.entry
                    parsedSubCategories["baseStatistics"] = await parserTactics.parse(baseStatistics, startLine + line)
                }
            }


        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = `Parsing the tactics data failed at line ${line+startLine} (non-critical)`
            let error = new sbcError(2, "Parse/Tactics", errorMessage, line+startLine)
            sbcData.errors.push(error)
            return false
        }

    }
    
    sbcUtils.log("RESULT OF PARSING TACTICS DATA (TRUE = PARSED SUCCESSFULLY)")
    sbcConfig.options.debug && console.log(parsedSubCategories)
    sbcConfig.options.debug && console.groupEnd()

    return true
}