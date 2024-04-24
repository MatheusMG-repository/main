import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Race
export class RaceParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as race")

        try {

            let race = {
                name: value.toLowerCase()
            }
            sbcData.notes.base.race = sbcUtils.capitalize(race.name)

            let compendium = "pf1.races"
            let raceItem = await sbcUtils.findEntityInCompendium(compendium, race, "race", line)

            if (raceItem) {
                // sbcData.characterData.items.push(raceItem)
                await createItem(raceItem);
            } else {
                // Generate a placeholder for not supported race
                let raceItem = {
                    name: value,
                    type: "race"
                }

                let placeholder = await sbcUtils.generatePlaceholderEntity(raceItem, line)
                
                await createItem(placeholder);
            }

            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as race."
            let error = new sbcError(1, "Parse/Base", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }
}
