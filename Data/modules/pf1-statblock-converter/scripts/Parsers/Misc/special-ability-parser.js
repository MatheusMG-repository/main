import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Special Abilities
export class SpecialAbilityParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as Special Abilities")

        try {
            // Try to find the name of the special ability
            // (1) Hopefully, the statblock includes the abilityType, e.g. Su, Ex, or Sp
            //     Because we can separate the name from that
            // (2) If no abilityType is found, things start to get fuzzy,
            //     Sometimes the name will be anything up to the first word which first letter is lowercase
            //     Other times the name will include an "of" or "the" with a lower letter, which will break the name finding
            //     So, try to find the first word starting with a lowercase letter, check if its one of the keywords [of, the, etc.]
            //     And put that into the name

            let specialAbilityType = null
            let specialAbilityName = null
            let specialAbilityDesc = null

            let patternSpecialAbilityTypes = new RegExp("(\\((\\bSU\\b|\\bSP\\b|\\bEX\\b)\\))", "i")

            if (value.search(patternSpecialAbilityTypes) !== -1) {

                // (1) Hopefully, the statblock includes the abilityType, e.g. Su, Ex, or Sp
                //     Because we can separate the name from that

                specialAbilityType = value.match(patternSpecialAbilityTypes)[1].toLowerCase().replace(/[()]*/g, "").trim()
                specialAbilityName = value.split(patternSpecialAbilityTypes)[0].trim()
                specialAbilityDesc = value.split(patternSpecialAbilityTypes)[3].trim()
            } else {

                // (2) If no abilityType is found, things aren't solvable.
                //     Sometimes the name will be anything up to the first word which first letter is lowercase
                //     Other times the name will include an "of" or "the" with a lower letter, which will break the name finding
                //     Sometimes, the name isn't present because this line is actually part of the previous ability.
                //     Removing this code until WIP: split abilities by titles instead of by line

                //let patternFindStartOfDescription = new RegExp("(^\\w*)(?:\\s)(?!is|the|of)(\\b[a-z]+\\b)", "")
                //let patternFindStartOfDescription = new RegExp("(?:^[a-zA-Z]+?\\s+)([a-z]?)", "")
                /* let patternFindStartOfDescription = new RegExp("((?:[A-Z][a-z]*)*\\s*(?:of|the|is)*\\s*(?:[A-Z][a-z]*)[a-z])", "")
                let indexOfStartOfDescription = 0

                if (value.match(patternFindStartOfDescription) !== null) {
                    indexOfStartOfDescription = value.match(patternFindStartOfDescription)[0].length
                }


                specialAbilityName = value.slice(0,indexOfStartOfDescription).trim()
                specialAbilityDesc = value.slice(indexOfStartOfDescription).trim()
                */
                specialAbilityName = `Special Ability (${line})`;
                specialAbilityDesc = value.trim();

                let errorMessage = `There may be some issues here. Please check the preview!`
                let error = new sbcError(3, "Parse/Special Abilties", errorMessage, line)
                sbcData.errors.push(error)
            }

            // Create a placeholder for the special ability using the data found
            let specialAbility = {
                name: specialAbilityName || "Special Ability",
                specialAbilityType: specialAbilityType,
                type: "classFeat",
                desc: specialAbilityDesc
            }

            let specialAbilityNote = ""

            if (specialAbilityType !== null) {
                specialAbilityNote = specialAbilityName + " (" + specialAbilityType + "): " + specialAbilityDesc
            } else {
                specialAbilityNote = specialAbilityName + ": " + specialAbilityDesc
            }

            specialAbility.desc = `<p>${specialAbilityDesc.replace(/\n\n/g, "</p><p>")}</p>`;

            let placeholder = await sbcUtils.generatePlaceholderEntity(specialAbility, line)
                console.log("Placeholder", placeholder)
            // sbcData.characterData.items.push(placeholder)
            await createItem(placeholder);

            return [true, specialAbilityNote]
        } catch (err) {

            let errorMessage = "Failed to parse [" + value + "] as Special Ability."
            let error = new sbcError(1, "Parse/Special Abilties", errorMessage, line)
            sbcData.errors.push(error)
            return false
        }
    }
}
