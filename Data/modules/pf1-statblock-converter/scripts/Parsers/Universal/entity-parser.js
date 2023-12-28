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


            for (let i=0; i<array.length; i++) {
                let input = array[i].trim()

                let searchEntity = {
                    name: sbcUtils.parseSubtext(`${input.replace(/\+*\d+$/g, "").trim()}`)[0],
                    altName: `${input.replace(/\+*\d+$/g, "").trim()}`,
                    type: pack
                }

                if(type == "feat") {
                  input.replace(/B$/, "");
                }

                // If the input is found in one of the compendiums, generate an entity from that
                let entity = await sbcUtils.findEntityInCompendium(compendium, searchEntity, type)

                if (entity !== null) {
                    // await entity.updateSource({"name": sbcUtils.capitalize(input.replace(/\+*\d+$/g, "").trim())});
                    let name = sbcUtils.capitalize(entity.name);

                    await entity.updateSource({"name": sbcUtils.capitalize(input.trim())});

                    if(typeof pack === "string" && (pack === "class-abilities" || pack === "monster-abilities") ||
                      (typeof pack === "object" && pack.length > 0)) {
                      let currentItems = sbcData.characterData.actorData.items.contents;
                      let duplicateTest = new RegExp(`(${name}|${entity.name})`);
                      let foundItem = currentItems.find((i) => i.system.subType === "classFeat" && duplicateTest.test(i.name));
                      console.log(`Checking for ${name} and ${entity.name}: ${foundItem}`)
                      if(!(foundItem)) {
                        await createItem(entity);
                        //sbcData.characterData.items.push(entity.name);
                      }
                      else await foundItem.update({"name": entity.name});
                    }
                    else
                    {
                      await createItem(entity);
                      //sbcData.characterData.items.push(entity.name);
                    }
                } else {
                  if(typeof pack === "object") {
                    if(pack[0] === "monster-abilities") {
                      searchEntity.name = "Special Quality: " + searchEntity.name;
                      searchEntity.type = "misc";
                      searchEntity.desc = "sbc | Placeholder for Special Qualities, which in most statblocks are listed under SQ in the statistics block, but described in the Special Abilities. Remove duplicates as needed!";
                    } else if(pack[0] === "special-attacks") {
                      searchEntity.name = "Special Attack: " + searchEntity.name;
                      searchEntity.type = "attack";
                      searchEntity.desc = "sbc | Placeholder for Special Attacks, which in most statblocks are listed under 'Special Attacks' in the statistics block, but are described in the 'Special Abilities' block. Remove duplicates as needed!";
                    }
                  }

                  //console.log("Generating placeholder with ", searchEntity);
                  let placeholder = await sbcUtils.generatePlaceholderEntity(searchEntity, line)
                  // sbcData.characterData.items.push(placeholder)
                  await createItem(placeholder);
                }

                // Check for Weapon Finesse and set a flag accordingly
                if (input.toLowerCase() == "weapon finesse" && pack == "feats")
                    sbcConfig.options.flags.hasWeaponFinesse = true
                }

            // entities were created successfully
            return true

        } catch (err) {
            console.error(err);
            let errorMessage = "Failed to parse " + value + " as " + type + "."
            let error = new sbcError(1, "Parse/" + type.toUpperCase(), errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }
}
