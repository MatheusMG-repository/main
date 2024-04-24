import { sbcUtils } from "../sbcUtils.js"
import { sbcData, sbcError } from "../sbcData.js"
import { sbcConfig } from "../sbcConfig.js"
import { sbcContent } from "../sbcContent.js"
import { parserMapping } from "../Parsers/parser-mapping.js";

/* ------------------------------------ */
/* Parser for description data          */
/* ------------------------------------ */
export async function parseDescription(data, startLine) {
    sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | " + sbcData.parsedCategories + "/" + sbcData.foundCategories + " >> PARSING DESCRIPTION DATA")

    let parsedSubCategories = []
    sbcData.notes["description"] = {}
    
    let description = ""

    // Loop through the lines
    for (let line = 0; line < data.length; line++) {

        try {
            let lineContent = data[line]
            switch (lineContent.toLowerCase()) {
                case "description":
                    break
                case "":
                    description = description.concat("\n")
                    break
                default:
                    description = description.concat(lineContent + "\n")
                    break
            }

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = `Parsing the description data failed at line ${line+startLine}`
            let error = new sbcError(2, "Parse/Description", errorMessage, line+startLine)
            sbcData.errors.push(error)
            sbcData.parsedInput.success = false
            return false
        }

    }

    sbcData.notes.description.long = description

    let parserDescription = parserMapping.map.description
    parsedSubCategories["description"] = await parserDescription.parse(description, startLine)

    sbcConfig.options.debug && sbcUtils.log("RESULT OF PARSING DESCRIPTION DATA (TRUE = PARSED SUCCESSFULLY)")
    sbcConfig.options.debug && console.log(parsedSubCategories)
    sbcConfig.options.debug && console.groupEnd()

    return true
    
}