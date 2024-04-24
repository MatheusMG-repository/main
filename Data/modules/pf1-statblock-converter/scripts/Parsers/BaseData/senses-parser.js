import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { sbcContent } from "../../sbcContent.js";
import { ParserBase } from "../base-parser.js";

// Parse Senses
export class SensesParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as senses")

        try {
            let systemSupportedSenses = Object.values(CONFIG["PF1"].senses).map(x => x.toLowerCase())

            let availableSenses = systemSupportedSenses.concat(sbcContent.additionalSenses)

            let customSenses = ""

            // Search for matches
            for (let i=0; i<availableSenses.length; i++) {
                let searchSense = availableSenses[i]

                if (value.search(searchSense) !== -1) {

                    if (sbcData.notes.base.senses === undefined) {
                        sbcData.notes.base.senses = searchSense
                    } else {
                        sbcData.notes.base.senses += "; " + searchSense
                    }

                    let range = -1
                    let rangeRegEx = new RegExp ("(?:" + searchSense + ")\\s(\\d+)", "")

                    switch (searchSense) {
                        // Custom Senses
                        case "all-around vision":
                        case "carrion sense":
                        case "deathwatch":
                        case "deepsight":
                        case "dragon senses":
                        case "greensight":
                        case "lifesense":
                        case "minesight":
                        case "water sense":
                            if (customSenses === "") {
                                customSenses = searchSense
                            } else {
                                customSenses = customSenses.concat(";" + searchSense)
                            }
                            break

                        // Range
                        case "blindsight":
                            range = value.match(rangeRegEx)[1]
                            range ? sbcData.characterData.actorData.update({"system.traits.senses.bs": +range}) : null
                            break
                        case "blindsense":
                            range = value.match(rangeRegEx)[1]
                            range ? sbcData.characterData.actorData.update({"system.traits.senses.bse": +range}) : null
                            break
                        case "darkvision":
                            range = value.match(rangeRegEx)[1]
                            range ? sbcData.characterData.actorData.update({"system.traits.senses.dv": +range}) : null
                            break
                        case "tremorsense":
                            range = value.match(rangeRegEx)[1]
                            range ? sbcData.characterData.actorData.update({"system.traits.senses.ts": +range}) : null
                            break

                        // Yes/No Toggle
                        case "scent":
                            sbcData.characterData.actorData.update({"system.traits.senses.sc": true})
                            break
                        case "see in darkness":
                            sbcData.characterData.actorData.update({"system.traits.senses.sid": true})
                            break
                        case "truesight":
                        case "true seeing":
                            sbcData.characterData.actorData.update({"system.traits.senses.tr": true})
                            break
                        case "see invisibility":
                            sbcData.characterData.actorData.update({"system.traits.senses.si": true})
                            break
                        // For whatever reason lowlight is handled differently from the other toggles
                        case "low-light":
                            sbcData.characterData.actorData.update({"system.traits.senses.ll.enabled": true})
                            break

                        default:
                            let errorMessage = "No match found for " + value + ". This definitily should not have happened. Sorry!"
                            let error = new sbcError(1, "Parse/Base", errorMessage, line)
                            sbcData.errors.push(error)
                            break
                    }

                }

            }

            // Set customSenses
            if (customSenses !== "") {
                sbcData.characterData.actorData.update({"traits.senses.custom": customSenses})
            }

            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as senses."
            let error = new sbcError(1, "Parse/Base", errorMessage, line)
            sbcData.errors.push(error)

            return false

        }

    }

}
