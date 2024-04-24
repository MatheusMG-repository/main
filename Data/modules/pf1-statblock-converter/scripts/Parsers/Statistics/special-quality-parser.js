import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Special Qualities Parser
export class SpecialQualityParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as SQ")

        try {

            let specialQualities = sbcUtils.sbcSplit(value)
            specialQualities = sbcUtils.fixSplitGroup(specialQualities);
            let type = "misc"

            for (let i=0; i<specialQualities.length; i++) {
                let specialQuality = {
                    name: "Special Quality: " + specialQualities[i],
                    type: type,
                    desc: "sbc | Placeholder for Special Qualities, which in most statblocks are listed under SQ in the statistics block, but described in the Special Abilities. Remove duplicates as needed!"
                }
                let placeholder = await sbcUtils.generatePlaceholderEntity(specialQuality, line)
                
                await createItem(placeholder);
            }

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as SQ."
            let error = new sbcError(1, "Parse/Statistics", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
