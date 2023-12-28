import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Ecology
export class EcologyParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value.name}" and "${value.entry}" ` + " as ecology")

        try {

            let ecologyDesc = `<div><strong>${value.name}</strong>: ${value.entry}</div>`

            // Check, if there already is a tactics document
            let currentItems = sbcData.characterData.actorData.items.contents
            let alreadyHasEcologyDocument = false
            let ecologyItemIndex = null
            for (let i=0; i<currentItems.length; i++) {
                if (currentItems[i].name === "Ecology") {
                    // When a race was found, do not create a custom one to hold the creatureType and SubType
                    alreadyHasEcologyDocument = true
                    ecologyItemIndex = i
                }
            }

            if (alreadyHasEcologyDocument) {

                let tempDesc = sbcData.characterData.actorData.items.contents[ecologyItemIndex].system.description.value
                await sbcData.characterData.actorData.items.contents[ecologyItemIndex].update({ "system.description.value": tempDesc + ecologyDesc })

            } else {

                let ecologyEntry = {
                    name: "Ecology",
                    type: "misc",
                    desc: ecologyDesc,
                    img: "icons/environment/wilderness/tree-oak.webp"
                }

                let placeholder = await sbcUtils.generatePlaceholderEntity(ecologyEntry, line)
                // sbcData.characterData.items.push(placeholder)
                await createItem(placeholder);

            }

            return true

        } catch (err) {
            let errorMessage = "Failed to parse " + value + " as ecology."
            let error = new sbcError(2, "Parse/Ecology", errorMessage, line)
            sbcData.errors.push(error)
            return false
        }
    }

}
