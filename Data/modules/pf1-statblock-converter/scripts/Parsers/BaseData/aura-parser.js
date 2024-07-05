import { sbcConfig } from "../../sbcConfig.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { createItem, parseValueToDocPath } from "../../sbcParser.js";
import { sbcUtils } from "../../sbcUtils.js";
import { ParserBase } from "../base-parser.js";


// Parse Aura
export class AuraParser extends ParserBase {
  async parse(value, line) {
    sbcUtils.log(`Trying to parse "${value}" ` + " as aura")

    try {
      sbcData.notes.aura = value

      await parseValueToDocPath(
        sbcData.characterData.actorData,
        "system.traits.aura.custom",
        value
      );

      let auras = sbcUtils.sbcSplit(value, false)
      console.log("Auras: ", auras);

      for (let i = 0; i < auras.length; i++) {
        let auraInput = auras[i]

        if (auraInput !== "" && auraInput !== ",") {
          let auraName = ""
          let auraRange = 0
          let auraSaveType = ""
          let auraDC = ""
          let auraDCNotes = ""
          let actionType = null
          let auraEffect = ""

          // Name = Everything before the opening parenthesis or first number
          auraName = auraInput.replace(/(\(.*\)|\d.*)/, "").trim();

          // Range = Numbers before ".ft"
          if (/([^(,;a-zA-Z]+)(?:ft.)/i.test(auraInput)) {
            auraRange = auraInput.match(/([^(,;a-zA-Z]+)(?:ft.)/)[1].trim();
          }
          // DC = Number after "DC"
          if (/\bDC\b/.test(auraInput)) {
            //auraDC = auraInput.match(/(?:DC\s*)([^)(,;]+)/)[1].trim()
            auraDC = auraInput.match(/(?:DC\s*)(\d+)/)[1]
            actionType = "save"

            // auraDCNotes, e.g. negates, halfs
            if (/(?:DC\s*\d+\s*)([^)(,;0-9]+)/.test(auraInput)) {
              auraDCNotes = auraInput.match(/(?:DC\s*\d+\s*)([^)(,;0-9]+)/)[1]
            }

            if (/([^)(,;]+)(?:DC\s*\d+)/.test(auraInput)) {
              auraSaveType = auraInput.match(/([^)(,;]+)(?:DC\s*\d+)/)[1].trim().toLowerCase()
            }
          }

          let auraEffectPatternString = "(" + "\\b" + auraName + "\\b|\\b" + auraRange + "\\b|\\b" + auraSaveType + "\\b|\\b" + auraDC + "\\b|\\b" + auraDCNotes + "\\b|" + "\\bDC\\b|\\bft\\.|[(),])"
          auraEffectPatternString = auraEffectPatternString.replace(/(\|\\b\\b)/g, "")

          let auraEffectPattern = new RegExp(auraEffectPatternString, "gi")

          auraEffect = sbcUtils.makeValueRollable(auraInput.replace(auraEffectPattern, "").trim())

          let aura = new Item.implementation({
            name: "Aura: " + sbcUtils.capitalize(auraName),
            type: "feat",
            system: {
              abilityType: "none",
              actionType: actionType,
              activation: {
                cost: null,
                type: "passive"
              },
              duration: {
                units: "perm"
              },
              effectNotes: auraEffect,
              featType: "racial",
              measureTemplate: {
                type: "circle",
                size: auraRange
              },
              range: {
                value: auraRange,
                units: "ft"
              },
              save: {
                dc: auraDC,
                type: auraSaveType,
                description: auraDCNotes
              },
              tag: "aura",
              target: {
                value: "centered on self"
              }
            },
            img: "systems/pf1/icons/spells/runes-blue-3.jpg"
          })

          await createItem(aura);
        }
      }
    } catch (err) {
      sbcConfig.options.debug && console.error(err);
      let errorMessage = "Failed to parse " + value + " as aura."
      let error = new sbcError(1, "Parse/Base", errorMessage, line)
      sbcData.errors.push(error)
      return false
    }
  }
}
