import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { sbcParser, parseInteger, parseSubtext, parseValueToDocPath, parseValueToPath } from "../../sbcParser.js";
import { ParserBase } from "../base-parser.js";

// Writes a given value into all fields defined in parserMapping
export class SimpleParser extends ParserBase {
    constructor(targetFields, supportedTypes) {
        super()
        this.targetFields = targetFields
        this.supportedTypes = supportedTypes
    }

    async parse(value, line) {
        if(value === "") { return false }

        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " into " + this.targetFields)
        // Check if the given value is one of the supported ones
        if (typeof (value) === this.supportedTypes || value === null) {
            try {
                for (const field of this.targetFields) {
                    await parseValueToDocPath(sbcData.characterData.actorData, field, value)
                }
                return true
            } catch (err) {
                let errorMessage = `Failed to parse ${value} into ${this.targetFields}`
                let error = new sbcError(0, "Parse", errorMessage, line)
                sbcData.errors.push(error)
                return false
            }
        } else {
            let errorMessage = `The input ${value} is not of the supported type ${this.supportedTypes}`
            let error = new sbcError(1, "Parse", errorMessage, line)
            sbcData.errors.push(error)
            return false
        }
    }
}
