import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { sbcParser, parseInteger, parseSubtext, parseValueToDocPath, parseValueToPath } from "../../sbcParser.js";
import { ParserBase } from "../base-parser.js";

// parses values into a child of sbcData.notes, which gets read when creating the styled preview statblock
export class NotesParser extends ParserBase {
    constructor(targetFields) {
        super()
        this.targetFields = targetFields
    }
    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " into " + this.targetFields)
        sbcData.notes[value] = value
        try {
            for (const field of this.targetFields) {
                await parseValueToPath(sbcData.notes, field, value)
            }
            return true
        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = `Failed to parse ${value} into notes.${this.targetFields}`
            let error = new sbcError(2, "Parse", errorMessage, line)
            sbcData.errors.push(error)
            return false
        }
    }
}