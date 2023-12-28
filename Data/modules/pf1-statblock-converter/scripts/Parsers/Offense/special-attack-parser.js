import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Special Attacks
export class SpecialAttackParser extends ParserBase {
    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as a Special Attack.")

        try {

            let specialAttacks = sbcUtils.sbcSplit(value, false);
            let type = "attack"

            for (let i=0; i<specialAttacks.length; i++) {
                let specialAttack = {
                    name: "Special Attack: " + specialAttacks[i],
                    type: type,
                    desc: "sbc | Placeholder for Special Attacks, which in most statblocks are listed under 'Special Attacks' in the statistics block, but are described in the 'Special Abilities' block. Remove duplicates as needed!"
                }
                let placeholder = await sbcUtils.generatePlaceholderEntity(specialAttack, line)
                // sbcData.characterData.items.push(placeholder)
                await createItem(placeholder);
            }

        } catch (err) {

            let errorMessage = "Failed to parse " + value + " as a Special Attack."
            let error = new sbcError(1, "Parse/Offense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }
    }
}
