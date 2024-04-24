import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse AC Types
export class ACParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as Armor Class")

        try {

            sbcData.notes.defense.acTypes = "(" + value + ")"

            // Separate Context Notes from ACTypes

            let rawAcTypes = value.split(";")
            let acContextNotes = ""

            // If there are context notes, set them in the actor
            if (rawAcTypes.length > 1) {
                acContextNotes = rawAcTypes[1].trim()
                sbcData.characterData.actorData.update({ "system.attributes.acNotes": acContextNotes })
            }

            let foundAcTypes = rawAcTypes[0].split(",")
            // Get supported AC Types
            let patternAcTypes = new RegExp("(" + sbcConfig.armorBonusTypes.join("\\b|\\b") + ")", "gi")

            for (let i=0; i<foundAcTypes.length; i++) {
                let foundAc = foundAcTypes[i].trim();
                let foundAcType = foundAc.match(patternAcTypes)?.[0].toLowerCase();
                let foundAcTypeValue = foundAc.match(/[+-]\d+/)?.[0] ?? 0;

                switch (foundAcType) {
                    case "natural":
                        sbcData.characterData.actorData.update({"system.attributes.naturalAC": foundAcTypeValue})
                        break
                    case "size":
                    case "dex":
                        // Ignore these cases, as they are handled by foundry
                        break
                    // Armor and Shield need to be validated against the ac changes in equipment
                    case "armor":
                    case "shield":
                    case "base":
                    case "enhancement":
                    case "dodge":
                    case "inherent":
                    case "deflection":
                    case "morale":
                    case "luck":
                    case "sacred":
                    case "insight":
                    case "resistance":
                    case "profane":
                    case "trait":
                    case "racial":
                    case "competence":
                    case "circumstance":
                    case "alchemical":
                    case "penalty":
                    case "rage":
                    case "monk":
                    case "wis":
                    case "untyped":
                    case "untypedPerm":
                        /* Try to put these in the front of the conversion,
                         * so that acNormal etc get handled after handling
                         * acTypes */
                        sbcData.characterData.conversionValidation.attributes[foundAcType] = foundAcTypeValue
                        break
                    default:
                        break
                }

            }

            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as Armor Class Types."
            let error = new sbcError(1, "Parse/Defense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
