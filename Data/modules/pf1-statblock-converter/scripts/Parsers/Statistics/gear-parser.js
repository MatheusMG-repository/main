import { sbcConfig } from "../../sbcConfig.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { createItem } from "../../sbcParser.js";
import { sbcUtils } from "../../sbcUtils.js";
import { ParserBase } from "../base-parser.js";

// Parse Gear
export class GearParser extends ParserBase {

  async parse(value, line) {
    sbcUtils.log(`Trying to parse "${value}" ` + " as gear")
    let input = "";

    try {
      const weaponCompendium = "pf1.weapons-and-ammo";
      const armorCompendium = "pf1.armors-and-shields";
      const itemCompendium = "pf1.items";
      const spellCompendium = "pf1.spells";
      const techCompendium = "pf1.technology";

      let patternSupportedSpells = /(potion|wand|scroll|oil)s?\s+of\s+(.+)/i;
      let patternGold = new RegExp("^(\\d+[\\.,]*\\d*\\s+)(?:PP|GP|SP|CP)$", "i")
      let patternTechColor = new RegExp("(" + sbcConfig.techColors.join("\\b|\\b") + ")", "gi");
      let patternTechTier = new RegExp("(" + sbcConfig.techTiers.join("\\b|\\b") + ")", "gi");
      let patternAbilities = new RegExp("(" + sbcConfig.magicalAbilities.join("\\b|\\b") + ")", "gi");
      let patternMaterials = new RegExp("(" + pf1.registry.materialTypes.contents.filter(mt => mt.addon === false).map(mt => mt.name).join("\\b|\\b") + ")", "gi");
      let patternMaterialsNonBasics = new RegExp("(" + pf1.registry.materialTypes.contents.filter(mt => mt.addon === false && mt.basic === false).map(mt => mt.name).join("\\b|\\b") + ")", "gi");
      let patternAddons = new RegExp("(" + pf1.registry.materialTypes.contents.filter(mt => mt.addon === true).map(mt => mt.name).join("\\b|\\b") + ")", "gi");

      // Split the bows from the arrows
      value = value.replace(/with (\d+) arrows/gi, ", arrows ($1)");
      
      let gears = sbcUtils.sbcSplit(value, false)
      let placeholdersGenerated = []

      let gearItemTypes = ["consumable", "equipment", "loot", "weapon"];

      for (let i = 0; i < gears.length; i++) {
        input = gears[i].trim()
                  .replace(/\[/g, "(")
                  .replace(/\]/g, ")")
                  .replace(/\*$/, "")
                  .replace(/^And\s/i, "");
        
        // If we're left with a number at the start and it's *not* a currency string,
        // assume it's a quantity and move it to the end of the string
        if(/^(\d+)\s/.test(input) && patternGold.test(input) === false) {
          input = input.replace(/^(\d+)(.*)/, "$2 ($1)").trim();
        }

        let splitInput = sbcUtils.parseSubtext(input)
        let gearText = splitInput[0]
        let gearSubtext = splitInput[1]
        let altName = gearText.replace(/^([\d+]+|masterwork|mwk)/g, "").trim();
        let quantity = 1;
        let material = "";
        let addons = [];

        // Handle plurals
        altName = altName.replace(/ies$/gi, "y");
        altName = altName.replace(/(?!Charges)s$/gi, "");

        // Preserve text inside ( ) for a backup search
        if (gearSubtext && gearSubtext.length > 0) {
          if (gearSubtext.search(/\d+$/) !== -1) {// && !patternSupportedSpells.test(gearText)) {
            quantity = +gearSubtext;

          }
          else altName = altName + ` (${gearSubtext})`;
        }

        // Handle tech items being color-coded
        if (altName.search(patternTechColor) !== -1) {
          let color = altName.match(patternTechColor)[0];
          altName = altName.replace(patternTechColor, "") + `(${color})`;
        }

        // Handle the different tiers of tech items
        if (altName.search(patternTechTier) !== -1) {
          let tier = altName.match(patternTechTier)[0];
          altName = altName.replace(patternTechTier, "") + `(${tier})`;
        }

        // Handle the magical abilities
        if (altName.search(patternAbilities) !== -1) {
          altName = altName.replace(patternAbilities, "");
        }

        // Handle misc modifier terms
        altName = altName.replace(/\W?(Integrated|Implanted|Timeworn|with 20 arrow)\W?/gi, "");

        // Special case for grenades
        if (altName.search(/grenade$/gi) !== -1) {
          altName = `Grenade (${altName})`;
        }

        // Special case for Studded Leather armor
        if(gearText.search(/studded leather(?!\s*armor)/i) !== -1) {
          altName = altName.replace(/studded leather/i, "Studded Leather Armor");
        }

        // Handle materials
        if (gearText.search(patternMaterials) !== -1) {
          let nonBasicMaterials = gearText.match(patternMaterialsNonBasics);
          material = nonBasicMaterials ? nonBasicMaterials[0] : material;
          material = pf1.registry.materialTypes.contents.find(mt => mt.name === sbcUtils.capitalize(material) || mt.id === material)?.id ?? null;
          altName = altName.replace(patternMaterialsNonBasics, "").trim();
        }

        // Handle addons
        if (gearText.search(patternAddons) !== -1) {
          let addonMatches = gearText.match(patternAddons);
          addonMatches.forEach((element, index) => {
            addonMatches[index] = pf1.registry.materialTypes.contents.find(mt => mt.name === sbcUtils.capitalize(element) || mt.id === element.toLowerCase().replace(/\s/, ""))?.id ?? null;
          });
          addonMatches = addonMatches.filter(x => !!x);
          addons = {};
          addonMatches.forEach((element) => {
            element = element.toLowerCase().replace(/\s/, "");
            addons[element] = element;
          });
          altName = altName.replace(patternAddons, "");
        }


        let gear = {
          type: "loot",
          name: gearText.replace(/^([\d+]+|masterwork|mwk|broken)/gi, "").trim(),
          altName: altName,
          rawName: input.replace(/(\(\d+\)|\swith 20 arrows)/gi, "").trim(),
          subtext: gearSubtext,
          value: 0,
          enhancementValue: 0,
          enhancementTypes: [],
          mwk: false,
          quantity: quantity,
          timeworn: false,
          broken: false,
          material: material,
          addons: addons
        }

        let gearKeys = Object.keys(gear)

        if (/^\+/.test(gearText)) {
          gear.enhancementValue = +gearText.match(/(\d+)/)[1].trim()
        }

        if (/(masterwork|mwk)/i.test(gearText)) {
          gear.mwk = true
        }

        if (/timeworn/i.test(gearText)) {
          gear.timeworn = true
        }

        if (/broken/i.test(gearText)) {
          gear.broken = true
        }

        let entity = {}

        if (patternGold.test(gearText)) {
          patternGold.lastIndex = 0
          // If the input is Money
          gear.name = "Money Pouch"
          gear.type = "container"
          gear.currency = {
            pp: splitInput[0].search(/\bPP\b/i) !== -1 ? +splitInput[0].match(/(\d+)(?:\s*PP)/i)[1] : 0,
            gp: splitInput[0].search(/\bGP\b/i) !== -1 ? +splitInput[0].match(/(\d+)(?:\s*GP)/i)[1] : 0,
            sp: splitInput[0].search(/\bSP\b/i) !== -1 ? +splitInput[0].match(/(\d+)(?:\s*SP)/i)[1] : 0,
            cp: splitInput[0].search(/\bCP\b/i) !== -1 ? +splitInput[0].match(/(\d+)(?:\s*CP)/i)[1] : 0
          }
        } else if (patternSupportedSpells.test(gearText)) {
          patternSupportedSpells.lastIndex = 0
          gear.type = "consumable";

          let namePattern = gearText.match(patternSupportedSpells);
          let consumableType = this.getConsumableType(namePattern[1]?.toLowerCase());
          let spellName = namePattern[2];
          // let charges = gearSubtext?.match(/\d+/)?.[0] ?? (/wand/i.test(consumableType) ? 50 : 1);
          let charges = gearSubtext?.match(/(\d+) charges/i)?.[1] ?? (/wand/i.test(consumableType) ? 50 : 1);
          let casterLevel = gearSubtext?.match(/CL\s*(\d+)/i)?.[1] ?? -1;

          let consumable = null;
          entity = await sbcUtils.findEntityInCompendium("", { name: `${consumableType} of ${spellName}` }, "consumable");
          if (!entity) {
            entity = await sbcUtils.findEntityInCompendium(spellCompendium, { name: spellName }, "spell");
            if (entity) {
              consumable = await CONFIG.Item.documentClasses.spell.toConsumable(entity.toObject(), consumableType === "oil" ? "potion" : consumableType);
            }
          } else {
            consumable = entity;
          }

          if (consumable) {
            if (consumableType == "wand") consumable.system.uses.value = parseInt(charges);
            else consumable.system.quantity = parseInt(charges);

            if (casterLevel > 0) consumable.system.cl = parseInt(casterLevel);

            if(consumableType == "oil") {
              consumable.name = consumable.name.replace("Potion", "Oil");
              consumable.system.unidentified.name = consumable.system.unidentified.name.replace("Potion", "Oil");
            }

            gear.rawName = consumable.name;

            entity = new Item.implementation(consumable);
          }
        } else {
          // Check normal items
          entity = await sbcUtils.findEntityInCompendium(itemCompendium, gear, gearItemTypes);

          if (!entity) { // Check armors
            entity = await sbcUtils.findEntityInCompendium(armorCompendium, gear, gearItemTypes);
          }
          if (!entity) { // Check weapons
            entity = await sbcUtils.findEntityInCompendium(weaponCompendium, gear, gearItemTypes);
          }
          if (!entity) { // Check tech
            entity = await sbcUtils.findEntityInCompendium(techCompendium, gear, gearItemTypes);
          }
        }

        if (entity && Object.keys(entity).length !== 0) {
          entity.updateSource({
            name: sbcUtils.capitalize(gear.rawName),
            system: {
              identifiedName: sbcUtils.capitalize(gear.rawName)
            }
          })

          let updates = {};
          for (let i = 0; i < gearKeys.length; i++) {
            let key = gearKeys[i]
            let change = gear[key]

            if (change) {
              switch (key) {
                case "material":
                  if (change && entity.type === "weapon") {
                    updates["system.material.normal.value"] = change;
                  } else if(change && entity.type === "equipment" && ["armor", "shield"].includes(entity.system.subType)) {
                    updates["system.system.armor.material.normal.value"] = change;
                  }
                  break;
                case "addons":
                  if (change && entity.type === "weapon") {
                    updates["system.material.addon"] = Object.keys(change);
                  } else if(change && entity.type === "equipment" && ["armor", "shield"].includes(entity.system.subType)) {
                    updates["system.armor.material.addon"] = change;//Object.keys(change);
                  }
                  break;
                case "enhancementValue":
                  if (entity.type === "weapon") {
                    updates["system.enh"] = +change;
                    updates["system.masterwork"] = true;
                  } else if (entity.type === "equipment") {
                    updates["system.armor.enh"] = +change;
                    updates["system.masterwork"] = true;
                  } else {
                    break
                  }
                  break
                case "mwk":
                  updates["system.masterwork"] = change;
                  break
                case "value":
                  updates["system.price"] = +change;
                  break
                case "quantity":
                  updates["system.quantity"] = +change;
                  break
                case "timeworn":
                  updates["system.timeworn"] = change;
                  break
                case "broken":
                  updates["system.broken"] = change;
                  break
                default:
                  break
              }
            }
          }

          if (Object.keys(updates).length) {
            console.log("Updates: ", updates);
            await entity.updateSource(updates);
          }

          await createItem(entity);
        } else {
          gear.name = input
          let placeholder = await sbcUtils.generatePlaceholderEntity(gear, line)

          await createItem(placeholder);
          if (placeholder.name.search(/Money Pouch/) === -1)
            placeholdersGenerated.push(sbcUtils.capitalize(gear.name))
        }
      }

      if (placeholdersGenerated.length > 0) {
        let infoMessage = "Generated Placeholders for the following Entities: " + placeholdersGenerated.join(", ")
        let info = new sbcError(3, "Entity/Placeholder", infoMessage, line)
        sbcData.errors.push(info)
      }

      // classItems were created successfully
      return true

    } catch (err) {
      sbcConfig.options.debug && console.error(err);
      let errorMessage = "Failed to parse " + input + " as gear."
      let error = new sbcError(2, "Parse/Statistics", errorMessage, line)
      sbcData.errors.push(error)
      return false
    }
  }

  getConsumableType(name) {
    let potionString1 = "potion";
    let wandString1 = "wand";
    let scrollString1 = "scroll";
    let potionString2 = "potions";
    let wandString2 = "wands";
    let scrollString2 = "scrolls";
    let oilString1 = "oil";
    let oilString2 = "oils";

    if (name.search(new RegExp(`^${potionString1}`, "i")) !== -1 || name.search(new RegExp(`^${potionString2}`, "i")) !== -1)
      return "potion";
    else if (name.search(new RegExp(`^${wandString1}`, "i")) !== -1 || name.search(new RegExp(`^${wandString2}`, "i")) !== -1)
      return "wand";
    else if (name.search(new RegExp(`^${scrollString1}`, "i")) !== -1 || name.search(new RegExp(`^${scrollString2}`, "i")) !== -1)
      return "scroll";
    else if (name.search(new RegExp(`^${oilString1}`, "i")) !== -1 || name.search(new RegExp(`^${oilString2}`, "i")) !== -1)
      return "oil";
    else
      return "potion";
  }
}
