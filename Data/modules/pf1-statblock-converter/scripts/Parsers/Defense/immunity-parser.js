import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse Immunities
export class ImmunityParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as Immunities")

        try {

            let rawInput = value.replace(/(^[,;\s]*|[,;\s]*$)/g, "")
            let input = sbcUtils.sbcSplit(rawInput)

            sbcData.notes.defense["immune"] = rawInput

            let systemSupportedConditionTypes = Object.values(CONFIG["PF1"].conditionTypes).map(x => x.toLowerCase())
            let patternConditionTypes = new RegExp("(" + systemSupportedConditionTypes.join("\\b|\\b") + ")", "gi")

            let systemSupportedDamageTypes = Object.values(pf1.registry.damageTypes.getLabels()).map(x => x.toLowerCase())
            let patternDamageTypes = new RegExp("(" + systemSupportedDamageTypes.join("\\b|\\b") + ")", "gi")

            for (let i=0; i<input.length; i++) {
                let immunity = input[i]
                    .replace(/Effects/gi, "")
                    .trim()

                if (immunity.search(patternConditionTypes) !== -1) {
                    // its a condition immunity
                    let immunityKey = sbcUtils.getKeyByValue(CONFIG["PF1"].conditionTypes, immunity)
                    let existingImmunities = sbcData.characterData.actorData.system.traits.ci.value;
                    existingImmunities.push(sbcUtils.camelize(immunityKey));
                    sbcData.characterData.actorData.update({ "system.traits.ci.value": existingImmunities})
                } else if (immunity.search(patternDamageTypes) !== -1) {
                    // its a damage immunity
                    let immunityKey = sbcUtils.getKeyByValue(pf1.registry.damageTypes.getLabels(), immunity)
                    let existingImmunities = sbcData.characterData.actorData.system.traits.di.value;
                    existingImmunities.push(sbcUtils.camelize(immunityKey));
                    sbcData.characterData.actorData.update({ "system.traits.di.value": existingImmunities})
                } else {
                    // Its a custom immunity
                    let existingCustomImmunities = sbcData.characterData.actorData.system.traits.ci.custom
                    sbcData.characterData.actorData.update({ "system.traits.ci.custom": existingCustomImmunities + sbcUtils.capitalize(immunity) + ";" })
                }


            }

            // Remove any semicolons at the end of the custom immunities
            sbcData.characterData.actorData.update({ "system.traits.ci.custom": sbcData.characterData.actorData.system.traits.ci.custom.replace(/(;)$/, "") })

            return true

        } catch (err) {

            let errorMessage = "Failed to parse " + value + " as Immunities."
            let error = new sbcError(1, "Parse/Defense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
