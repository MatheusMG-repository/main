import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse Spell Resistance
export class SRParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as Spell Resistance")

        try {
            let rawInput = value.replace(/(^[,;\s]*|[,;\s]*$)/g, "");
            let input = sbcUtils.parseSubtext(rawInput);

            let srTotal = input[0];
            let srContext = "";
            let srNotes = "";


            if (input[1]) {
                srContext = input[1];
                srNotes = srContext;
            }
            else if (/\s*([-+]?\d+)\s+(.*)/.test(srTotal)) {
                [srTotal, srContext] = srTotal.split(/\s*([-+]?\d+)\s+(.*)/).slice(1);
                srNotes = srContext;
            }

            sbcData.characterData.actorData.update({"system.attributes.sr.formula": srTotal.toString(), "system.attributes.srNotes": srNotes});
            //     attributes: {
            //       sr: {
            //         formula: srTotal.toString(),
            //     },
            //     srNotes,
            //     }
            // });

            return true;

        } catch (err) {

            let errorMessage = "Failed to parse " + value + " as Spell Resistance."
            let error = new sbcError(1, "Parse/Defense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
