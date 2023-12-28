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

    let specialAbility = "";
    let patternSpecialAbilityTypes = new RegExp("((\\-\\-)|(\\((\\bSU\\b|\\bSP\\b|\\bEX\\b)\\)))", "i")

    // Loop through the lines
    for (let line = 0; line < data.length; line++) {
        try {
            let lineContent = data[line]
            if (lineContent.length == 0) { lineContent = "\n"; }

            // Parse Special Ability
            if (!parsedSubCategories["specialAbility-" + parsedSubCategoriesCounter]) {
                if (lineContent && lineContent.search(/Special Abilities/i) === -1) {
                    if (lineContent.search(patternSpecialAbilityTypes) === -1) {
                        specialAbility += lineContent
                        if (lineContent === "\n") specialAbility += lineContent
                    } else {
                        if (specialAbility !== "" && specialAbility !== "\n\n") {
                            specialAbility = specialAbility.trim()
                            
                            let parserSpecialAbility = parserMapping.map["special abilities"]
                            parsedSubCategories["specialAbility-" + parsedSubCategoriesCounter] = await parserSpecialAbility.parse(specialAbility, startLine + line)
                            if (parsedSubCategories["specialAbility-" + parsedSubCategoriesCounter]) parsedSubCategoriesCounter++
                        }

                        specialAbility = lineContent
                    }
                }
            }

        } catch (err) {
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