import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { parseValueToDocPath } from "../../sbcParser.js";
import { ParserBase } from "../base-parser.js";

export class SimpleParser extends ParserBase {
  /**
   * Writes a given value into all fields defined in parserMapping
   *
   * @param {Array.<string>} targetFields Foundry Actor's field where this is pointing to.
   * @param {"number"|"string"} supportedType The type of data this value is.
   */
  constructor(targetFields, supportedType) {
    super();

    if (!targetFields || !supportedType) {
      throw new Error(
        "The 'targetFields'  and 'supportedType' arguments are mandatory."
      );
    }
    if (!["number", "string"].includes(supportedType)) {
      throw new Error("Only 'string' or 'number' are valid values.");
    }

    this.targetFields = targetFields;
    this.supportedType = supportedType;
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
    if (value === "") {
      return false;
    }

    sbcUtils.log(`Trying to parse "${value}" into `, this.targetFields);
    // Check if the given value is one of the supported ones
    if (typeof value === this.supportedType || value === "NaN") {
      try {
        for (const field of this.targetFields) {
          await parseValueToDocPath(
            sbcData.characterData.actorData,
            field,
            value === "NaN" ? null : value
          );
        }
        return true;
      } catch (err) {
        sbcUtils.log(err, undefined, "error");
        let errorMessage = `Failed to parse ${value} into ${this.targetFields}`;
        let error = new sbcError(0, "Parse", errorMessage, line);
        sbcData.errors.push(error);
        return false;
      }
    } else {
      let errorMessage = `The input ${value} is not of the supported type ${this.supportedType}`;
      let error = new sbcError(1, "Parse", errorMessage, line);
      sbcData.errors.push(error);
      return false;
    }
  }
}
