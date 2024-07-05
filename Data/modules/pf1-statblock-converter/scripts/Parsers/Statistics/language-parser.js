import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse Languages
export class LanguageParser extends ParserBase {

  async parse(value, line) {
    sbcUtils.log(`Trying to parse "${value}" ` + " as languages")

    try {
      let systemSupportedLanguages = Object.values(CONFIG["PF1"].languages).map(x => x.toLowerCase())
      let patternLanguages = new RegExp("(" + systemSupportedLanguages.join("\\b|\\b") + ")", "gi")

      let languages = value.split(/[,;]/g)
      let specialLanguages = []
      let realLanguages = []
      let languageContext = ""

      for (let i=0; i<languages.length; i++) {
        let language = languages[i].trim()
        let checkForLanguageContext = sbcUtils.parseSubtext(language)

        // Check for language context information and add this to the custom language field if available
        if (checkForLanguageContext.length > 1)
        {
          language = checkForLanguageContext[0]
          languageContext = checkForLanguageContext[1]

          let customLanguages = sbcData.characterData.actorData.system.traits.languages.custom;
          customLanguages.push(`${language} (${languageContext})`);

          sbcData.characterData.actorData.update({ "system.traits.languages.custom": customLanguages})
        }

        if (language.search(patternLanguages) !== -1) {
          let languageKey = sbcUtils.getKeyByValue(CONFIG["PF1"].languages, language)
          realLanguages.push(languageKey);
        } else {
          specialLanguages.push(language)
        }
      }

      if (realLanguages.length > 0) {
        await sbcData.characterData.actorData.update({ "system.traits.languages.value": realLanguages});
      }
      if (specialLanguages.length > 0) {
        let customLanguages = sbcData.characterData.actorData.system.traits.languages.custom;
        customLanguages = customLanguages.concat(specialLanguages);
        await sbcData.characterData.actorData.update({ "system.traits.languages.custom": customLanguages })
      }

      return true
    } catch (err) {
      sbcConfig.options.debug && console.error(err);
      let errorMessage = "Failed to parse " + value + " as languages."
      let error = new sbcError(1, "Parse/Statistics", errorMessage, line)
      sbcData.errors.push(error)
      return false
    }
  }

}
