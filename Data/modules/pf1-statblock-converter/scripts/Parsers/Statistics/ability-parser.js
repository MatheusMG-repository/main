import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { parseValueToDocPath } from "../../sbcParser.js";
import { ParserBase } from "../base-parser.js";

// Parse Ability Values and Mods
export class AbilityParser extends ParserBase {
    constructor(targetValueFields, targetModFields, supportedTypes) {
        super()
        this.targetValueFields = targetValueFields
        this.targetModFields = targetModFields
        this.supportedTypes = supportedTypes
    }

    async parse(value, line) {
        sbcUtils.log(`Trying to parse "${value}" ` + " into " + this.targetValueFields)
        // Check if the given value is one of the supported ones
        if (typeof (value) === this.supportedTypes) {
            try {
                for (const valueField of this.targetValueFields) {
                    await parseValueToDocPath(sbcData.characterData.actorData, valueField, value)
                }
                // for (const modField of this.targetModFields) {
                //     await parseValueToDocPath(sbcData.characterData.actorData, modField, sbcUtils.getModifier(value))
                // }
                return true
            } catch (err) {
                let errorMessage = `Failed to parse ${value} into ${this.targetValueFields} (and ${sbcUtils.getModifier(value)} into ${this.targetModFields})`
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
