import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse Damage Reductions
export class DRParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as Damage Reductions")

        try {
            let rawInput = value.replace(/(^[,;\s]*|[,;\s]*$)/g, "")
            let input = sbcUtils.sbcSplit(rawInput)

            sbcData.notes.defense["dr"] = rawInput

            let systemSupportedDamageTypes = Object.values(pf1.registry.damageTypes.getLabels()).map(x => x.toLowerCase())
            let patternDamageTypes = new RegExp("(" + systemSupportedDamageTypes.join("\\b|\\b") + ")", "gi")

            for (let i=0; i<input.length; i++) {
                let reduction = input[i]
                    .replace(/Effects/gi, "")
                    .trim()

                if (reduction.match(/\s(or|and)\s/)) {
                    const re = /^(?<amount>\d*?)\s?(?:\/\s?(?<type1>\S+)\s?(?<operator>(or|and))\s?(?<type2>\S+))?$/g.exec(reduction);
                    let {amount, type1, operator, type2} = re.groups;
                    operator = operator === "or" ? true : false;

                    // Check that both types are supported
                    if(type1.search(patternDamageTypes) !== -1 &&
                    type2.search(patternDamageTypes) !== -1) {
                        let existingImmunities = sbcData.characterData.actorData.system.traits.dr.value;
                        existingImmunities.push({amount: amount, types: [type1, type2], operator: operator});
                        await sbcData.characterData.actorData.update({ "system.traits.dr.value": existingImmunities})
                    } else {
                        // Its a custom resistance, as there is no place for that, just put it into energy resistances
                        let existingReductions = sbcData.characterData.actorData.system.traits.dr.custom;
                        sbcData.characterData.actorData.update({"system.traits.dr.custom": existingReductions + `${sbcUtils.capitalize(reduction)};`});
                    }
                } else if (reduction.search(patternDamageTypes) !== -1) {
                    // its a damage resistance
                    const [value, type] = reduction.split(/\s*\/\s*/);
                    let existingImmunities = sbcData.characterData.actorData.system.traits.dr.value;
                    existingImmunities.push({amount: value, types: [type], operator: false});
                    await sbcData.characterData.actorData.update({ "system.traits.dr.value": existingImmunities})
                }
                else {
                    // Its a custom resistance, as there is no place for that, just put it into energy resistances
                    let existingReductions = sbcData.characterData.actorData.system.traits.dr.custom;
                    sbcData.characterData.actorData.update({"system.traits.dr.custom": existingReductions + `${sbcUtils.capitalize(reduction)};`});
                }
            }
            sbcData.characterData.actorData.update({"system.traits.dr.custom": sbcData.characterData.actorData.system.traits.dr.custom.replace(/(;)$/, "") })
            return true

        } catch (err) {
            console.error(err);
            let errorMessage = "Failed to parse " + value + " as Reductions."
            let error = new sbcError(1, "Parse/Defense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
