import { sbcUtils } from "../sbcUtils.js"
import { sbcData, sbcError } from "../sbcData.js"
import { sbcConfig } from "../sbcConfig.js"
import { sbcContent } from "../sbcContent.js"
import { parserMapping } from "../Parsers/parser-mapping.js";

/* ------------------------------------ */
/* Parser for special ability data      */
/* ------------------------------------ */
export async function parseSpecialAbilities(data, startLine) {
    sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | " + sbcData.parsedCategories + "/" + sbcData.foundCategories + " >> PARSING SPECIAL ABILITY DATA")

    let parsedSubCategories = []
    let parsedSubCategoriesCounter = 0
    sbcData.notes["specialAbilities"] = {
        "hasSpecialAbilities": true
    }

    // Loop through the lines
    for (let line = 0; line < data.length; line++) {
        try {
            let lineContent = data[line]

            // Parse Special Ability
            if (!parsedSubCategories["specialAbility-" + parsedSubCategoriesCounter]) {
                if (lineContent && lineContent.search(/^Special Abilities/i) === -1) {
                    let parserSpecialAbility = parserMapping.map["special abilities"]
                    parsedSubCategories["specialAbility-" + parsedSubCategoriesCounter] = await parserSpecialAbility.parse(lineContent, startLine + line)
                    if (parsedSubCategories["specialAbility-" + parsedSubCategoriesCounter]) parsedSubCategoriesCounter++
                }
            }

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = `Parsing the special abilities failed at line ${line+startLine} (non-critical)`
            let error = new sbcError(2, "Parse/Special Abilities", errorMessage, line+startLine)
            sbcData.errors.push(error)
            // This is non-critical, so parse the rest
            return false
        }

    }

    sbcData.notes["specialAbilities"].parsedSpecialAbilities = []

    let parsedSubCategoriesKeys = Object.keys(parsedSubCategories)

    for (let i=0; i<parsedSubCategoriesKeys.length; i++) {
        let subCategoryKey = parsedSubCategoriesKeys[i]
        let specialAbilityNote = parsedSubCategories[subCategoryKey][1].trim()
        sbcData.notes["specialAbilities"].parsedSpecialAbilities.push(specialAbilityNote)
    }
    
    sbcData.notes["specialAbilities"].parsedSpecialAbilities = sbcData.notes["specialAbilities"].parsedSpecialAbilities.join(`

`)

    sbcConfig.options.debug && sbcUtils.log("RESULT OF PARSING SPECIAL ABILITY DATA (TRUE = PARSED SUCCESSFULLY)")
    sbcConfig.options.debug && console.log(parsedSubCategories)
    sbcConfig.options.debug && console.groupEnd()

    return true
}