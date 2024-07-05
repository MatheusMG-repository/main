import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { parseSubtext, createItem } from "../../sbcParser.js";
import { ParserBase } from "../base-parser.js";

// Parse Creature Type and Subtype
export class CreatureParser extends ParserBase {

    async parse(value, line) {
        sbcUtils.log(`Trying to parse "${value}" ` + " as creatureType")

        try {

            let tempCreatureType = await parseSubtext(value)

            // Localization
            let creatureTypeKey = sbcUtils.getKeyByValue(sbcConfig.const.creatureTypes, tempCreatureType[0])
            let localizedCreatureType = CONFIG.PF1.creatureTypes[creatureTypeKey]

            let creatureType = {
                name: tempCreatureType[0],
                type: "racial",
                subTypes: ""
            }

            if (tempCreatureType.length > 1) {
                creatureType.subTypes = tempCreatureType[1]
            }

            let compendium = "pf1.racialhd"
            // Always search the english compendia for entries, so use the english creatureType instead of the localized one
            let creatureTypeItem = await sbcUtils.findEntityInCompendium(compendium, creatureType, "class", null, line)

            await creatureTypeItem.updateSource({
                system: {
                    tag: globalThis.pf1.utils.createTag(creatureType.name),
                    useCustomTag: true,
                    level: 0
                }
            })

            // Set flags for the conversion
            switch (creatureType.name.toLowerCase()) {
                case "undead":
                    sbcConfig.options.flags.isUndead = true
                    break
                default:
                    break
            }


            if (creatureType.subTypes !== "") {
                await creatureTypeItem.updateSource({ name: sbcUtils.capitalize(localizedCreatureType) + " (" + sbcUtils.capitalize(creatureType.subTypes) + ")" })
            }



            sbcData.notes.creatureType = creatureTypeItem.name
            //sbcData.characterData.items.push(creatureTypeItem)
            await createItem(creatureTypeItem);

            /*

            // Check, if there already is a race item for this creatureType
            let currentItems = sbcData.characterData.items
            let raceFound = false

            for (let i=0; i<currentItems.length; i++) {
                if (currentItems[i].type === "race") {
                    // When a race was found, do not create a custom one to hold the creatureType and SubType
                    raceFound = true
                }
            }

            // When no existing race item was found, create a placeholder to save creature type and subtype
            if (!raceFound) {

                let subTypesArray = []
                creatureType.subTypes.split(/\s*,\s*/

                /*).map(function (elem) {
                    if (elem) {
                        let elemContainer = []
                        elemContainer.push(elem)
                        subTypesArray.push(elemContainer)
                    }

                })

                let camelizedCreatureType = sbcUtils.camelize(creatureType.name)

                let race = {
                    name: sbcUtils.capitalize(localizedCreatureType),
                    type: "race",
                    creatureType: camelizedCreatureType,
                    subTypes: subTypesArray,
                    img: creatureTypeItem.data.img
                }

                let placeholder = await sbcUtils.generatePlaceholderEntity(race, line)
                sbcData.characterData.items.push(placeholder)

            }

            */

            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as creatureType."
            let error = new sbcError(1, "Parse/Base", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }
    }
}
