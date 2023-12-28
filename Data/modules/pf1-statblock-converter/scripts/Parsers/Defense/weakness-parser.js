import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse Weaknesses / Vulnerabilities
export class WeaknessParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as Weaknesses")

        try {

            let rawInput = value.replace(/(^[,;\s]*|[,;\s]*$)/g, "")
            let input = sbcUtils.sbcSplit(rawInput)

            sbcData.notes.defense["weakness"] = rawInput

            let systemSupportedDamageTypes = Object.values(CONFIG["PF1"].damageTypes).map(x => x.toLowerCase())

            let patternDamageTypes = new RegExp("(" + systemSupportedDamageTypes.join("\\b|\\b") + ")", "gi")

            for (let i=0; i<input.length; i++) {
                let weakness = input[i]
                    .replace(/Effects/gi, "")
                    .trim()

                if (weakness.search(patternDamageTypes) !== -1) {
                    let matchedWeakness = weakness.match(patternDamageTypes)[0]
                    // its a damage weakness / vulnerability
                    let existingWeakness = sbcData.characterData.actorData.system.traits.dv.value;
                    existingWeakness.push(sbcUtils.camelize(matchedWeakness));
                    sbcData.characterData.actorData.update({"system.traits.dv.value": existingWeakness});
                } else {
                    // Its a custom weakness / vulnerability
                    let existingCustomWeakness = sbcData.characterData.actorData.system.traits.dv.custom
                    sbcData.characterData.actorData.update({ "system.traits.dv.custom": existingCustomWeakness + sbcUtils.capitalize(weakness) + ";" })
                }
            }

            // Remove any semicolons at the end of the custom vulnerabilities
            sbcData.characterData.actorData.update({ "system.traits.dv.custom": sbcData.characterData.actorData.system.traits.dv.custom.replace(/(;)$/, "") })

            return true

        } catch (err) {

            let errorMessage = "Failed to parse " + value + " as Weaknesses."
            let error = new sbcError(1, "Parse/Defense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
