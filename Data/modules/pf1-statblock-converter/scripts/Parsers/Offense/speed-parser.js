import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { parserMapping } from "../parser-mapping.js";
import { ParserBase } from "../base-parser.js";

// Parse Speed
export class SpeedParser extends ParserBase {

    async parse(value, type, line) {
        sbcUtils.log(`Trying to parse "${value}" ` + " as Speed of type " + type + ".")

        try {
            if (value.length > 0) {
                let rawInput = value.replace(/(^[,;\s]*|[,;\s]*$)/g, "")
                let input = sbcUtils.parseSubtext(rawInput)

                if(!sbcData.notes.offense.speed) sbcData.notes.offense.speed = "";
                sbcData.notes.offense.speed += `, ${sbcUtils.capitalize(type)} ${rawInput}`;
                sbcData.notes.offense.speed = sbcData.notes.offense.speed.replace(/^, /, "");

                let speed = input[0].match(/(\d+)/)?.[1];
                let speedContext = "";

                if (speed == null) {
                    let errorMessage = "Failed to parse " + value + " as Speed of type " + type + ".";
                    let error = new sbcError(2, "Parse/Offense", errorMessage, line);
                    sbcData.errors.push(error);
                }

                sbcData.characterData.conversionValidation.attributes[type] = +speed
                sbcData.characterData.actorData.update({ [`system.attributes.speed.${type}.base`]: +speed })

                // Reparse skills if a given speed exists (Climb, Swim, or Fly)
                let parserSkills = parserMapping.map.statistics.skills
                switch(type) {
                    case "climb":
                    case "swim":
                        await parserSkills.reparseSkill(sbcUtils.capitalize(type));
                        break;
                    default:
                        break;
                }

                // TODO: Allow abbreviations
                let flyManeuverabilitiesPattern = new RegExp("(" + Object.values(CONFIG["PF1"].flyManeuverabilities).join("\\b|\\b") + ")", "i")

                if (input.length > 1) {
                    if (type === "fly") {
                        let flyManeuverability = input[1].match(flyManeuverabilitiesPattern)?.[1];
                        if (flyManeuverability) {
                            sbcData.characterData.actorData.update({ "system.attributes.speed.fly.maneuverability": flyManeuverability });
                            await parserSkills.reparseSkill("Fly", flyManeuverability);
                        }
                        if (input[2]) {
                            speedContext = input[2]
                        }
                    } else {
                        speedContext = input[1]
                    }
                }

                if (speedContext !== "") {
                    // WIP DO STUFF WITH SPEED CONTEXT NOTES
                    // CURRENTLY THE SHEET DOES NOT SUPPORT THEM
                }

                return true
            }
        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as Speed of type " + type + "."
            let error = new sbcError(1, "Parse/Offense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }
    }
}
