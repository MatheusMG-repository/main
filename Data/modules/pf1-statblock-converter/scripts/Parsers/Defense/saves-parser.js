import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse Saves and Save Context Notes
export class SavesParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as Saves")

        try {

            let input = value;
            let saveContext = "";

            // Unparenthesized semicolon
            if (/;(?![^(]*\))/.test(input)) {
                [input, saveContext] = input.split(/;(?![^(]*\))/);
            }

            let saves = sbcUtils.sbcSplit(input).map(sbcUtils.parseSubtext);

            for (let k = 0; k < saves.length; k++) {
                let save = 0, saveType;
                if (/(?:Fort\s*[\+]?)(\-?\d+)/i.test(saves[k][0])) {
                    save = saves[k][0].match(/(?:Fort\s*[\+]?)(\-?\d+)/i)[1];
                    saveType = "fort";
                }
                else if (/(?:Ref\s*[\+]?)(\-?\d+)/i.test(saves[k][0])) {
                    save = saves[k][0].match(/(?:Ref\s*[\+]?)(\-?\d+)/i)[1];
                    saveType = "ref";
                }
                else if (/(?:Will\s*[\+]?)(\-?\d+)/i.test(saves[k][0])) {
                    save = saves[k][0].match(/(?:Will\s*[\+]?)(\-?\d+)/i)[1];
                    saveType = "will";
                }
                if (!saveType) {
                    let errorMessage = "Failed to parse " + saves[k].join("") + " as Saves.";
                    let error = new sbcError(2, "Parse/Defense", errorMessage, line);
                    sbcData.errors.push(error);
                }
                else {
                    sbcData.characterData.conversionValidation.attributes[saveType] = save;
                    sbcData.notes.defense[saveType + "Save"] = save;
                    if (saves[k][1]) {
                        saveContext += (saveContext ? "\n" : "") + saveType.substring(0,1).toUpperCase() + saveType.substring(1) + ": " + saves[k][1];
                    }
                }
            }

            // Check if there are context notes for the saves
          if (saveContext) {
            sbcData.characterData.actorData.update({ "system.attributes.saveNotes": saveContext.trim() });
          }

            return true

        } catch (err) {

            let errorMessage = "Failed to parse " + value + " as Saves."
            let error = new sbcError(1, "Parse/Defense", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

}
