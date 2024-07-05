import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { parseValueToPath } from "../../sbcParser.js";
import { ParserBase } from "../base-parser.js";

export class NotesParser extends ParserBase {
    /**
     * Parses values into a child of sbcData.notes, which gets read when creating the styled preview statblock
     *
     * @param {Array.<string>} targetFields Foundry Actor's field where this is pointing to.
     */
    constructor(targetFields) {
        super();
        if (!targetFields) {
          throw new Error(
            "The 'targetFields' argument is mandatory."
          );
        }
        this.targetFields = targetFields;
    }

    /**
     *
     * @param {string|number} value The value to parse.
     * @param {number} line The line where the parsing is occurring.
     * @returns {Promise.<Boolean>} `true` if correctly parsed.
     */
    async parse(value, line) {
      if (value === undefined || line === undefined) {
        throw Error("The arguments 'value' and 'line' are mandatory.");
      }

        sbcUtils.log(`Trying to parse "${value}" into ${this.targetFields}`);
        sbcData.notes[value] = value;
        try {
            for (const field of this.targetFields) {
                await parseValueToPath(sbcData.notes, field, value);
            }
            return true;
        } catch (err) {
            sbcUtils.log(err, undefined, "error");
            let errorMessage = `Failed to parse ${value} into notes.${this.targetFields}`;
            let error = new sbcError(2, "Parse", errorMessage, line);
            sbcData.errors.push(error);
            return false;
        }
    }
}
