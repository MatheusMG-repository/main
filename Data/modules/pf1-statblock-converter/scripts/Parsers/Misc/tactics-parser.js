import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Tactics
export class TacticsParser extends ParserBase {

    async parse(value, line) {
        sbcUtils.log(`Trying to parse "${value}" ` + " as tactics")

        try {

            let tacticsDesc = `<div><strong>${value.name}</strong>: ${value.entry}</div>`

            // Check, if there already is a tactics document
            let currentItems = sbcData.characterData.actorData.items.contents
            let alreadyHasTacticsDocument = false
            let tacticsItemIndex = null
            for (let i=0; i<currentItems.length; i++) {
                if (currentItems[i].name === "Tactics") {

                    // When a race was found, do not create a custom one to hold the creatureType and SubType
                    alreadyHasTacticsDocument = true
                    tacticsItemIndex = i
                }
            }


            if (alreadyHasTacticsDocument) {

                let tempDesc = sbcData.characterData.actorData.items.contents[tacticsItemIndex].system.description.value

                sbcData.characterData.actorData.items.contents[tacticsItemIndex].update({ "system.description.value": tempDesc + tacticsDesc })

            } else {

                let tacticsEntry = {
                    name: "Tactics",
                    type: "misc",
                    desc: tacticsDesc,
                    img: "icons/skills/targeting/crosshair-pointed-orange.webp"
                }

                let placeholder = await sbcUtils.generatePlaceholderEntity(tacticsEntry, line)
                
                await createItem(placeholder);

            }

            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as tactics."
            let error = new sbcError(2, "Parse/Ecology", errorMessage, line)
            sbcData.errors.push(error)
            return false
        }
    }

}
