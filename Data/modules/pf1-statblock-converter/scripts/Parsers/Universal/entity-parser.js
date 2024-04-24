import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Entities of a given type, mainly used for feats
export class EntityParser extends ParserBase {

    async parse(value, line, pack, type = null, processClusters = true) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as " + pack + ".")

        try {

            let compendium = []
            if(typeof pack === "string") compendium.push("pf1." + pack)
            else {
              pack.forEach(element => {
                compendium.push("pf1." + element)
              });
            }

            //let patternSupportedEntities = new RegExp("(" + sbcConfig[pack].join("\\b|\\b") + ")", "gi")

            // let array = value.split(/\b,/);
            let array = sbcUtils.sbcSplit(value, processClusters);
            array = sbcUtils.fixSplitGroup(array);


            for (let i=0; i<array.length; i++) {
                let input = array[i].trim()
                // Catch instances of a stray ')' at the end of the input
                if(/(?!\()\)$/.test(input)) input = input.replace(/\)$/, "");
                // Catch instances of a stray '(' in the input
                if(/\((?!\))/.test(input)) input += ")";
                input = input.replace(/\[/g, "(").replace(/\]/g, ")");
                let inputSeparated = input.split(/\s/);
                if(/\+?\d+(d\d+)?/.test(inputSeparated[inputSeparated.length-1]))
                  inputSeparated.splice(inputSeparated.length-1, 1);

                let searchEntity = {
                    name: sbcUtils.parseSubtext(`${input.replace(/\+*\d+$/g, "").trim()}`)[0],
                    // altName: `${input.replace(/\+*\d+$/g, "").trim()}`,
                    altName: `${inputSeparated.join(" ").trim()}`,
                    altName2: `${input.match(/(?:\()(.*)(?:\))/) ? input.match(/(?:\()(.*)(?:\))/)[1] : ""}`,
                    type: pack
                }

                if(type == "feat") {
                  input.replace(/B$/, "");
                }

                // If the input is found in one of the compendiums, generate an entity from that
                let entity = await sbcUtils.findEntityInCompendium(compendium, searchEntity, type)
                let name = (entity ? entity.name : searchEntity.name).capitalize();
                let escapedName = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                if (entity !== null) {
                    // await entity.updateSource({"name": sbcUtils.capitalize(input.replace(/\+*\d+$/g, "").trim())});
                    let subName = sbcUtils.parseSubtext(input)[1];

                    if(subName && entity.name !== subName.split(/\s/).map((s) => s.capitalize()).join(" "))
                      await entity.updateSource({"name": sbcUtils.capitalize(input.trim())});
                    if(/\*$/g.test(input))
                      await entity.updateSource({"name": entity.name + "*"});
                } else {
                  if(typeof pack === "object") {
                    if(pack[0] === "monster-abilities") {
                      searchEntity.name = "Special Quality: " + input;
                      searchEntity.type = "misc";
                      searchEntity.desc = "sbc | Placeholder for Special Qualities, which in most statblocks are listed under SQ in the statistics block, but described in the Special Abilities. Remove duplicates as needed!";
                    } else if(pack[0] === "special-attacks") {
                      searchEntity.name = "Special Attack: " + input;
                      searchEntity.type = "attack";
                      searchEntity.desc = "sbc | Placeholder for Special Attacks, which in most statblocks are listed under 'Special Attacks' in the statistics block, but are described in the 'Special Abilities' block. Remove duplicates as needed!";
                    }
                  }

                  //console.log("Generating placeholder with ", searchEntity);
                  entity = await sbcUtils.generatePlaceholderEntity(searchEntity, line)
                }

                // Check if the entity is already in the actor
                // If so, update the name
                // If not, create it
                if(typeof pack === "string" && (pack === "class-abilities" || pack === "monster-abilities") ||
                (typeof pack === "object" && pack.length > 0)) {
                  let currentItems = sbcData.characterData.actorData.items.contents;
                  let duplicateTest = new RegExp(`(${name}|${escapedName})`, "i");
                  let foundItem = currentItems.find((i) => i.system.subType === "classFeat" && duplicateTest.test(i.name));

                  if(foundItem)
                    await foundItem.update({"name": input.split(/\s/).map((s) => s.capitalize()).join(" ")});
                  else
                    await createItem(entity);
                }
                else
                  await createItem(entity);

                // Check for Weapon Finesse and set a flag accordingly
                if (input.toLowerCase() == "weapon finesse" && pack == "feats")
                    sbcConfig.options.flags.hasWeaponFinesse = true
                }

            // entities were created successfully
            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as " + type + "."
            let error = new sbcError(1, "Parse/" + type.toUpperCase(), errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }
}
