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

            console.log("Parsing Special Attack: " + value)
            let specialAttacks = sbcUtils.sbcSplit(value, false);
            specialAttacks = sbcUtils.fixSplitGroup(specialAttacks);
            console.log(specialAttacks)
            let type = "attack"

            for (let i=0; i<specialAttacks.length; i++) {
                console.log("Parsing Special Attack: " + specialAttacks[i])
                let specialAttack = {
                    name: "Special Attack: " + specialAttacks[i],
                    type: type,
                    desc: "sbc | Placeholder for Special Attacks, which in most statblocks are listed under 'Special Attacks' in the statistics block, but are described in the 'Special Abilities' block. Remove duplicates as needed!"
                }
                let placeholder = await sbcUtils.generatePlaceholderEntity(specialAttack, line)
                console.log(placeholder)
                
                await createItem(placeholder);
            }

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as a Special Attack."
            let error = new sbcError(1, "Parse/Offense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }
    }
}
