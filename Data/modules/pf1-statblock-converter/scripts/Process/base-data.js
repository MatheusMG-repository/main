import { sbcUtils } from "../sbcUtils.js"
import { sbcData, sbcError } from "../sbcData.js"
import { sbcConfig } from "../sbcConfig.js"
import { sbcContent } from "../sbcContent.js"
import { parserMapping } from "../Parsers/parser-mapping.js";

/* ------------------------------------ */
/* Parser for base data                 */
/* ------------------------------------ */
async function cleanLine(content, line) {
    return line.replace(content, "");
}

/**
 *
 * @param {Array.<string>} data Array of separated data.
 * @param {number} startLine Index from where base part starts.
 * @returns {Promise.<Boolean>} `false` if any error is catch.
 */
export async function parseBase(data, startLine) {
  sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | " + sbcData.parsedCategories + "/" + sbcData.foundCategories + " >> PARSING BASE DATA")

  //  let parsingBreaks = new RegExp("^(" + sbcConfig.lineStarts.join("\\b|\\b") + ")", "gi");
  let parsedSubCategories = []
  sbcData.notes["base"] = {}

  //if(lineContent.search(parsingBreaks) !== -1) {
  //  console.log(`Buffer is ${parsingBuffer}`);
    //parsedSubCategories = await parseInput(parsingBuffer, line, startLine, parsedSubCategories);
    //parsingBuffer = lineContent;
  //}
  //else parsingBuffer += lineContent + " ";

  // Loop through the lines
  for (let line = 0; line < data.length; line++) {
    try {
      let lineContent = data[line]

      if(lineContent.length === 0) continue;

      if (!parsedSubCategories["name"]) {
        // Parse the name
        let parserName = parserMapping.map.base.name
        let name = lineContent.replace(/\(?\s*CR\s*(\d+\/*\d*|-)\)?.*/, "").trim()
        parsedSubCategories["name"] = await parserName.parse(sbcUtils.capitalize(name), line)

        if(parsedSubCategories["name"] === true)
        {
          lineContent = await cleanLine(name, lineContent);
          if(lineContent.length === 0) continue;
        }
      }

      // Parse Challenge Rating
      if (/\s*CR\s*/.test(lineContent)) {
        if (!parsedSubCategories["cr"]) {
          let parserCR = parserMapping.map.base.cr
          let cr = lineContent.match(/\s*CR\s*(\d+\/*\d*|-)/)[1].trim()

          sbcData.notes.base["cr"] = cr
          if (sbcConfig.const.crFractions[cr] != null) {
            cr = sbcConfig.const.crFractions[cr];
          }
          parsedSubCategories["cr"] = await parserCR.parse(+cr, line)

          if(parsedSubCategories["cr"] === true)
          {
            lineContent = await cleanLine(lineContent.match(/(\s*CR\s*\d+\/*\d*|-)/)[1], lineContent);
            if(lineContent.length === 0) continue;
          }
        }
      }

      // Parse Mythic Rank (uses NotesParser, as mr currently is not supported by FVTT PF1)
      if (!parsedSubCategories["mr"]) {
        if (/\s*MR\s*/.test(lineContent)) {
          let parserMR = parserMapping.map.base.mr
          let mr = lineContent.match(/\s*MR\s*(\d+)/)[1].trim()
          parsedSubCategories["mr"] = await parserMR.parse(mr, line)
        }

        if(parsedSubCategories["mr"] === true)
        {
          lineContent = await cleanLine(lineContent.match(/(\s*MR\s*\d+\/*\d*|-)/)[1], lineContent);
          if(lineContent.length === 0) continue;
        }
      }

      if (line !== 0) {
        // Parse Source (uses NotesParser, the source has no separate field in FVTT PF1)
        if (!parsedSubCategories["source"]) {
          if (/^Source/.test(lineContent)) {
            let parserSource = parserMapping.map.base.source
            let source = lineContent.match(/^Source\s+(.*)/)[1].trim()
            parsedSubCategories["source"] = await parserSource.parse(source, line)
          }

          if(parsedSubCategories["source"] === true)
          {
            lineContent = await cleanLine(lineContent.match(/^(Source\s+.*)/)[1], lineContent);
            if(lineContent.length === 0) continue;
          }
        }

        // Parse XP
        if (!parsedSubCategories["xp"]) {
          if (/^XP/.test(lineContent)) {
            let parserXP = parserMapping.map.base.xp;
            let xp = lineContent.match(/^XP\s+([\d,.]*)/)?.[1].replace(/\.,/g,"").trim() ?? "0";
            sbcData.notes.base.xp = xp;
            // We just save the xp into our notes, as foundry calculates them automatically
            parsedSubCategories["xp"] = await parserXP.parse(xp, line);

            if(parsedSubCategories["xp"] === true)
            {
              lineContent = await cleanLine(lineContent.match(/^(XP\s+[\d,.]*)/)[1], lineContent);
              if(lineContent.length === 0) continue;
            }
          }
        }

        // Parse Gender
        if (!parsedSubCategories["gender"]) {
          let patternGender = new RegExp("(\\bmale\\b|\\bfemale\\b)", "i")

          if (patternGender.test(lineContent)) {
            let gender = lineContent.match(patternGender)[1]
            let parserGender = parserMapping.map.base.gender
            parsedSubCategories["gender"] = await parserGender.parse(gender, line)

            if(parsedSubCategories["gender"] === true)
            {
              lineContent = await cleanLine(gender, lineContent);
              if(lineContent.length === 0) continue;
            }
          }
        }

        // Parse Race
        if (!parsedSubCategories["race"]) {
          let patternRace = new RegExp("(" + sbcConfig.races.join("\\b|\\b") + ")", "i")
          let patternOtherRaces = new RegExp("(" + sbcContent.otherRaces.join("\\b|\\b") + ")", "i")

          // Check, if it's one of the supported or any other known races
          let race = "";
          if (patternRace.test(lineContent)) {
            race = lineContent.match(patternRace)[1]
            let parserRace = parserMapping.map.base.race
            parsedSubCategories["race"] = await parserRace.parse(race, line)
          } else if (patternOtherRaces.test(lineContent)) {
            race = lineContent.match(patternOtherRaces)[1]
            let parserRace = parserMapping.map.base.race
            parsedSubCategories["race"] = await parserRace.parse(race, line)
          }

          if (race !== "") { lineContent = lineContent.replace(race, "") }
        }

        let patternAlignment = new RegExp("^(Any Alignment|\\*A|\\bLG\\b|\\bLN\\b|\\bLE\\b|\\bNG\\b|\\bN\\b|\\bTN\\b|\\bNE\\b|\\bCG\\b|\\bCN\\b|\\bCE\\b)\\s+", "i")

        // Parse Classes
        if (!parsedSubCategories["classes"]) {
          // Check for classes only in lines that do not start with an alignment
          // So as not to match the class "MEDIUM" when it's a Medium Humanoid for example
          let isAlignmentLine = lineContent.match(patternAlignment)

          // Check for classes only in lines that do not start with "Source"
          // So as not to match the class "Witch" when it's included in "Source Pathfinder #72: The Witch Queen's Revenge pg. 86"
          let isSourceLine = lineContent.match(/^(Source)\s*/)

          let isAgeLine = lineContent.match(/(Old|Middle Age|Middle-aged|Venerable)/i);
          if(isAgeLine && !parsedSubCategories["age"]) {
            let age = isAgeLine[1];
            let parserAge = parserMapping.map.base.age
            parsedSubCategories["age"] = await parserAge.parse(age, line);

            if(parsedSubCategories["age"] === true) lineContent = await cleanLine(age, lineContent);
          }


          if (!isAlignmentLine && !isSourceLine) {
            let patternClasses = new RegExp("(" + sbcConfig.classes.join("\\b|\\b") + "\\b|\\b" + `${sbcConfig.prestigeClassNames.length ? sbcConfig.prestigeClassNames.join("\\b|\\b") : "_"}` + "\\b|\\b" + sbcContent.wizardSchoolClasses.join("\\b|\\b") + ")(?![^(]*\\))(.*)", "gi")
            if (patternClasses.test(lineContent)) {
              // Take everything from the first class found up until the end of line
              let classes = lineContent.match(patternClasses)[0]
              let parserClasses = parserMapping.map.base.classes
              parsedSubCategories["classes"] = await parserClasses.parse(classes, line)
            }
          }
        }


        // Parse Alignment
        if (!parsedSubCategories["alignment"]) {
          if (patternAlignment.test(lineContent)) {
            let parserAlignment = parserMapping.map.base.alignment
            let alignment = lineContent.match(patternAlignment)[1].trim()
            sbcData.notes.base.alignment = alignment
            parsedSubCategories["alignment"] = await parserAlignment.parse(alignment.replace(/\bN\b/, "TN").toLowerCase(), line)

            if(parsedSubCategories["alignment"] === true) { parsedSubCategories["classes"] = true; }
          }
        }

        // Parse Size and Space / Token Size
        if (!parsedSubCategories["size"]) {
          let patternSize = new RegExp("(" + Object.values(sbcConfig.const.actorSizes).join("\\b|\\b") + ")", "i")
          if (patternSize.test(lineContent) && patternAlignment.test(lineContent)) {
            let parserSize = parserMapping.map.base.size
            let size = lineContent.match(patternSize)[1].trim()
            sbcData.notes.base.size = size
            let actorSize = sbcUtils.getKeyByValue(sbcConfig.const.actorSizes, size)

            // Values derived from Size
            let parserSpace = parserMapping.map.base.space;
            let parserScale = parserMapping.map.base.scale;

            let space = CONFIG.PF1.tokenSizes[actorSize].w;
            let scale = CONFIG.PF1.tokenSizes[actorSize].scale;

            parsedSubCategories["size"] = {
              size: await parserSize.parse(actorSize, line),
              space: await parserSpace.parse(space, line),
              scale: await parserScale.parse(scale, line)
            }
          }
        }

        // Parse Creature Type and Subtype, but only when they are found after a size declaration
        if (!parsedSubCategories["creatureType"]) {
          let patternCreatureType = new RegExp("(?:" + Object.values(sbcConfig.const.actorSizes).join("\\b|\\b") + ")\\s*(" + Object.values(sbcConfig.const.creatureTypes).join("\\b.*|\\b") + ")", "i")
          //
          if (patternCreatureType.test(lineContent)) {
            let creatureType = lineContent.match(patternCreatureType)[1]
            let parserCreatureType = parserMapping.map.base.creatureType

            parsedSubCategories["creatureType"] = await parserCreatureType.parse(creatureType, line)
          }
        }

        // Parse Initiative
        if (!parsedSubCategories["init"]) {
          if (/^Init\b/i.test(lineContent)) {
            let parserInit = parserMapping.map.base.init
            let init = lineContent.match(/(?:Init\s*)(\+\d+|-\d+|\d+)/)[1].trim()
            sbcData.characterData.conversionValidation.attributes["init"] = +init
            parsedSubCategories["init"] = await parserInit.parse(+init, line)
          }
        }

        // Parse Senses
        if (!parsedSubCategories["senses"]) {
          if (/\bSenses\b/i.test(lineContent)) {
            let parserSenses = parserMapping.map.base.senses
            let senses = lineContent.match(/(?:\bSenses\b\s*)(.*?)(?:\n|$|\s*Aura)/igm)[0].replace(/\bSenses\b\s*|\s*Aura\b/g,"")
            parsedSubCategories["senses"] = await parserSenses.parse(senses, line)
          }
        }

        // Parse Aura
        if (!parsedSubCategories["aura"]) {
          if (/^Aura\b/i.test(lineContent)) {
            let parserAura = parserMapping.map.base.aura
            let aura = lineContent.match(/(?:\bAura\b\s*)(.*)/igm)[0].replace(/\s*Aura\b/g,"")
            parsedSubCategories["aura"] = await parserAura.parse(aura, line)
          }
        }
      }
    } catch (err) {
      sbcConfig.options.debug && console.error(err);
      let errorMessage = "Parsing the base data failed at the highlighted line"
      let error = new sbcError(1, "Parse/Base", errorMessage, (startLine+line) )
      sbcData.errors.push(error)
      sbcData.parsedInput.success = false

      return false
    }
  }

  // Parse errors and warnings
  if (!parsedSubCategories["cr"] && sbcData.actorType === 0) {
      let errorMessage = "No CR for this NPC detected, please check the highlighted line"
      let error = new sbcError(2, "Parse/Base", errorMessage, 0)
      sbcData.errors.push(error)
  }

  if (!parsedSubCategories["creatureType"]) {
      let errorMessage = "No creature type found!"
      let error = new sbcError(1, "Parse/Base", errorMessage)
      sbcData.errors.push(error)
  }

  sbcUtils.log("RESULT OF PARSING BASE DATA (TRUE = PARSED SUCCESSFULLY)")
  sbcConfig.options.debug && console.log(parsedSubCategories)
  sbcConfig.options.debug && console.groupEnd()

  return true
}
