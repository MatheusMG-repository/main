import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse Resistances
export class ResistanceParser extends ParserBase {

    async parse(value, line) {
        sbcUtils.log(`Trying to parse "${value}" ` + " as Resistances")

        try {

            let rawInput = value.replace(/(^[,;\s]*|[,;\s]*$)/g, "")
            let input = sbcUtils.sbcSplit(rawInput)

            sbcData.notes.defense["resist"] = rawInput

            let systemSupportedConditionTypes = Object.values(CONFIG["PF1"].conditionTypes).map(x => x.toLowerCase())
            let patternConditionTypes = new RegExp("(" + systemSupportedConditionTypes.join("\\b|\\b") + ")", "gi")

            let systemSupportedDamageTypes = Object.values(pf1.registry.damageTypes.getLabels()).map(x => x.toLowerCase())
            let patternDamageTypes = new RegExp("(" + systemSupportedDamageTypes.join("\\b|\\b") + ")", "gi")

            for (let i=0; i<input.length; i++) {
              let resistance = input[i]
                  .replace(/Effects/gi, "")
                  .trim()

              if (resistance.search(patternConditionTypes) !== -1) {
                // its a condition resistance
                let existingResistances = sbcData.characterData.actorData.system.traits.cres;
                sbcData.characterData.actorData.update({"system.traits.cres": existingResistances + `${sbcUtils.capitalize(resistance)};`});
              } else if (resistance.match(/\s(or|and)\s/)) {
                const re = /^(?:(?<type1>\S+)\s?(?<operator>(or|and))?\s?(?<type2>\S+))?\s?(?<amount>\d*?)$/g.exec(resistance);
                let {amount, type1, operator, type2} = re.groups;
                operator = operator === "or" ? true : false;

                // Check that both types are supported
                if(type1.search(patternDamageTypes) !== -1 &&
                  type2.search(patternDamageTypes) !== -1) {
                    let existingImmunities = sbcData.characterData.actorData.system.traits.eres.value;
                    existingImmunities.push({amount: amount, types: [type1, type2], operator: operator});
                    await sbcData.characterData.actorData.update({ "system.traits.eres.value": existingImmunities})
                } else {
                    // Its a custom resistance, as there is no place for that, just put it into energy resistances
                    let existingImmunities = sbcData.characterData.actorData.system.traits.eres.custom;
                    await sbcData.characterData.actorData.update({"system.traits.eres.custom": existingImmunities + `${sbcUtils.capitalize(resistance)};`});
                }
              } else if (resistance.search(patternDamageTypes) !== -1) {
                  // its a damage resistance
                  const [type, value] = resistance.split(/\s/);
                  let existingImmunities = sbcData.characterData.actorData.system.traits.eres.value;
                  existingImmunities.push({amount: value, types: [type], operator: false});
                  await sbcData.characterData.actorData.update({ "system.traits.eres.value": existingImmunities})
              }
              else {
                  // Its a custom resistance, as there is no place for that, just put it into energy resistances
                  let existingImmunities = sbcData.characterData.actorData.system.traits.eres.custom;
                  await sbcData.characterData.actorData.update({"system.traits.eres.custom": existingImmunities + `${sbcUtils.capitalize(resistance)};`});
              }
            }

            await sbcData.characterData.actorData.update({"system.traits.eres.custom": sbcData.characterData.actorData.system.traits.eres.custom.replace(/;$/, "") })
            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as Resistances."
            let error = new sbcError(1, "Parse/Defense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
