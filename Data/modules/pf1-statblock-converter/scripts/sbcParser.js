import { sbcConfig } from "./sbcConfig.js";
import { sbcUtils } from "./sbcUtils.js";
import { sbcData, sbcError } from "./sbcData.js";
import { parserMapping } from "./Parsers/parser-mapping.js";
import { sbcRenderer } from "./sbcRenderer.js";

import { parseBase } from "./Process/base-data.js";
import { parseDefense } from "./Process/defense-data.js";
import { parseDescription } from "./Process/description-data.js";
import { parseEcology } from "./Process/ecology-data.js";
import { parseOffense, pruneSpellbooks } from "./Process/offense-data.js";
import { parseSpecialAbilities } from "./Process/special-ability-data.js";
import { parseStatistics } from "./Process/statistics-data.js";
import { parseTactics } from "./Process/tactics-data.js";
import { SimpleParser } from "./Parsers/Universal/simple-parser.js";

/* ------------------------------------ */
/* sbcParser    						*/
/* ------------------------------------ */

export class sbcParser {

    /* ------------------------------------ */
    /* Prepare the input                    */
    /* ------------------------------------ */

    /**
     * Modifies the Statblock input in order to have it as an array per line break.
     */
    static async prepareInput(inputElement = null) {
        sbcConfig.options.debug && console.group("sbc-pf1 | PREPARING INPUT")
        if (sbcData.input === "") {
            let errorMessage = "Given input is empty.";
            sbcData.errors.push(new sbcError(0, "Prepare", errorMessage));
            throw errorMessage;
        }

        try {
            // Check if David's "Roll Bonuses PF1" module is installed and active
            if (game.modules.get("roll-bonuses-pf1")?.active) {
                sbcUtils.log("Roll Bonuses PF1 module is active")
                sbcConfig.options.flags["rollBonusesPF1"] = true
            }

            // Initial Clean-up of input
            $( "#sbcProgressBar" ).css("width", "5%")

            const sourceScrubbing = new RegExp("(" + sbcConfig.sources.join("\\b|") + ")", "gm");
            // Replace different dash-glyphs with the minus-glyph
            sbcData.preparedInput.data = sbcData.input.replace(/[–—−]/gm,"-")
            // Remove weird multiplication signs
            .replace(/×/gm, "x")
            // Remove double commas
            .replace(/[,,]/gm, ",")
            // Replace real fractions with readable characters (½ ⅓ ¼ ⅕ ⅙ ⅛)
            .replace(/½/gm, "1/2")
            .replace(/⅓/gm, "1/3")
            .replace(/¼/gm, "1/4")
            .replace(/⅕/gm, "1/5")
            .replace(/⅙/gm, "1/6")
            .replace(/⅛/gm, "1/8")
            // Remove Source Superscript (e.g. ^APG, ^UE)
            .replace(sourceScrubbing, "")
            // Remove Bestiary Source Superscript (e.g. ^B)
            .replace(/([a-z])B\b/gm, "$1")

            // Replace ligatures
            .replace(/ﬂ/igm, "fl")
            .replace(/ﬁ/igm, "fi")
            .replace(/ﬀ/igm, "ff")
            .replace(/ﬃ/igm, "ffi")
            .replace(/ﬄ/igm, "ffl")
            .replace(/ﬆ/igm, "st")

            // Remove lines that only consist of 20 dashes (Hero Lab Online)
            .replace(/^-{20}$/gm, "")

            // Separate the input into separate lines and put them into an array,
            // so that we can place highlights on specific lines when for
            // example an error occurs

            .split(/\n/g)

            // Process each line for a line starter.
            // If a line starter isn't found, then it's a continuation of the previous line.
            // If a line starter is found, then it's a new line.
            sbcConfig.options.debug && console.log("Before: ", sbcData.preparedInput.data)
            let result = [];
            const lineCategoryPattern = new RegExp("^(" + sbcConfig.lineCategories.join("|") + ")","i");
            const lineStarterPattern = new RegExp("^(" + sbcConfig.lineStarts.join("|") + ")(?!\\))","i");

            sbcData.preparedInput.data.forEach((line, index) => {
                // Capitalize the line if it's a category
                if(lineCategoryPattern.test(line.toLowerCase().capitalize()))
                    line = line.toLowerCase().capitalize();

                // let caseNum = 0;
                if (line && sbcConfig.lineStarts.some((starter) => line.startsWith(starter))) {
                    // The line starts with a string from the other array, push it as a new line
                    // caseNum = 1;
                    result.push(line);
                } else if (index > 0 && lineStarterPattern.test(result[result.length - 1]) &&
                    !lineStarterPattern.test(line) && !/^Description/i.test(result[result.length - 1])) {
                    // The line doesn't start with a string from the other array, append it to the last line
                    // caseNum = 2;
                    result[result.length - 1] += " " + line;
                } else {
                    // The first line doesn't start with a string from the other array, push it as a new line
                    // caseNum = 3;
                    result.push(line);
                }
            });

            sbcData.preparedInput.data = result;
            sbcConfig.options.debug && console.log("After: ", sbcData.preparedInput.data)

            //sbcUtils.parseCategories()
            sbcRenderer.resetErrorLog()
            sbcRenderer.resetHighlights()

            sbcData.preparedInput.success = true
            if(inputElement) inputElement.val(sbcData.preparedInput.data.join("\n"));

            await this.parseInput()

        } catch (errorMessage) {
            let error = new sbcError(0, "Prepare", errorMessage)
            sbcData.errors.push(error)
            sbcData.preparedInput.success = false
            throw errorMessage
        }

        sbcConfig.options.debug && console.groupEnd()
    }

    /* ------------------------------------ */
    /* Parse the input                      */
    /* ------------------------------------ */

    static async parseInput() {
        sbcConfig.options.debug && console.group("sbc-pf1 | PARSING INPUT")

        // Check if there is stuff to parse and a temporary actor to hold the data
        if (sbcData.characterData == null || !sbcData.input) {
            sbcData.characterData == null && sbcData.errors.push(new sbcError(0, "Input", "No valid characterData found"))
            !sbcData.input && sbcData.errors.push(new sbcError(0, "Parse", "Not enough input found to parse"))
            sbcData.parsedInput.success = false
        }

        if (sbcData.preparedInput.success) {

            // DO STUFF WITH THE PARSED INPUT
            // parse the different blocks of content

            try {


                sbcRenderer.updateProgressBar("Preparation", "Clean-up", 1, 1)

                let availableCategories = Object.keys(parserMapping.map);

                /* ------------------------------------ */
                /* The input was prepared and is        */
                /* currently in the form of an array    */
                /* which consists of one entry per line */
                /* ------------------------------------ */

                // Split the input data via the category names of our mapping
                // base (no keyword, so use everything up to the defense keyword)
                // defense
                // offense
                // tactics
                // statistics
                // ecology
                // special abilities
                // description

                // Get the index position of our keywords/categories
                // Bonus, filter for the categories found in the statblock
                let categoryIndexPositions = {}
                for (let i=1; i<availableCategories.length; i++) {

                    let categoryPattern = new RegExp("^\\b" + availableCategories[i] + "\\b\\s*(?:\\r?\\n|$)","i")
                    sbcData.preparedInput.data.filter(function(item, index){

                        if (categoryPattern.test(item) && categoryIndexPositions[availableCategories[i]] == null) {
                            categoryIndexPositions[availableCategories[i]] = index
                        }

                    })

                }

                // Check, if any categories could be found
                let foundCategories = Object.keys(categoryIndexPositions)
                let foundCategoriesString = sbcUtils.capitalize(foundCategories.join(", "))
                foundCategories.unshift("base")
                let parsedCategories = {}

                sbcData.foundCategories = foundCategories.length

                if (foundCategories.length !== 0) {

                    // Check, if the needed categories are there
                    let neededCategories = ["defense","offense","statistics"]
                    let foundAllNeededCategories = neededCategories.every(i => foundCategories.includes(i));

                    if (foundAllNeededCategories) {

                        // Split the input into chunks for the found categories
                        // via the index positions found earlier
                        // and send these chunks off to the correct parser in sbcParsers.js

                        /** @type {Object.<string, Array.<string>} */
                        let dataChunks = {
                            "base": [],
                            "defense": [],
                            "offense": [],
                            "statistics": [],
                            "tactics": [],
                            "ecology": [],
                            "special abilities": [],
                            "description": [],
                        }

                        /** @type {Object.<string, number>} */
                        let startLines = {
                            "base": 0,
                            "defense": 0,
                            "offense": 0,
                            "statistics": 0,
                            "tactics": 0,
                            "ecology": 0,
                            "special abilities": 0,
                            "description": 0,
                        }

                        let lastLine = 0

                        // put the found data in the dataChunks and parse them after rearranging them
                        // so that needed statistical data gets parsed first
                        // even though its written after defense and offense data
                        for (let i=0; i<foundCategories.length; i++) {

                            let category = foundCategories[i]

                            let startLine = lastLine
                            startLines[category] = startLine
                            let stopLine = categoryIndexPositions[foundCategories[i+1]]

                            if (i === foundCategories.length-1) {
                                dataChunks[category] = sbcData.preparedInput.data.slice(startLine)
                            } else {
                                dataChunks[category] = sbcData.preparedInput.data.slice(startLine, stopLine)
                            }

                            //parsedCategories[category] = await parseCategories(category, dataChunks[category], startLine)

                            lastLine = stopLine

                        }

                        // Rearrange the foundCategories so that statistics gets parsed before defense and offense
                        let orderedFoundCategories = foundCategories
                        orderedFoundCategories.splice(foundCategories.indexOf("statistics"),1)[0]
                        orderedFoundCategories.splice(1,0,"statistics")
                        // Rearrange the foundCategories so that Special Abilities get parsed before statistics
                        if(foundCategories.includes("special abilities")) {
                            orderedFoundCategories.splice(foundCategories.indexOf("special abilities"),1)[0]
                            orderedFoundCategories.splice(1,0,"special abilities")
                        }

                        for (let i=0; i<orderedFoundCategories.length; i++) {
                            let category = orderedFoundCategories[i]
                            sbcRenderer.updateProgressBar("Parsing", category, orderedFoundCategories.length, i+1)
                            parsedCategories[category] = await sbcParser.parseCategories(category, dataChunks[category], startLines[category])
                        }

                        // Remove any semicolons at the end of the custom immunities
                        //sbcData.characterData.actorData.update({ "system.traits.ci.custom": sbcData.characterData.actorData.system.traits.ci.custom.replace(/;$/, "") })
                        //sbcData.characterData.actorData.update({ "system.traits.di.custom": sbcData.characterData.actorData.system.traits.di.custom.replace(/;$/, "") })
                        //sbcData.characterData.actorData.update({ "system.traits.dv.custom": sbcData.characterData.actorData.system.traits.dv.custom.replace(/;$/, "") })

                        // Attempt to prune unused spellbooks
                        await pruneSpellbooks();

                        // After parsing all available subCategories, create embedded entities
                        sbcRenderer.updateProgressBar("Entities", "Creating Embedded Entities", 1, 1)
                        await createBuffs()

                        // After parsing all available subCategories, check the flags set on the way
                        sbcRenderer.updateProgressBar("Flags", "Checking if Special Flags were set", 1, 1)
                        await checkFlags()

                        await sbcUtils.conversionValidation(sbcData.characterData.actorData)

                        // Create the notes section composed of the statblock and the raw input
                        sbcRenderer.updateProgressBar("Preview", "Generating Preview", 1, 1)
                        await generateNotesSection()


                        // If parsing and character generation is success
                        // close the inputDialog and resetSBC

                        // SET THIS TO TRUE WHEN ALL CATEGORIES ARE PARSED SUCCESSFULLY (MORE OR LESS)
                        sbcRenderer.updateProgressBar("Actor", "Actor is ready", 1, 1)
                        sbcData.parsedInput.success = true

                    } else {
                        let errorMessage = `Failed to find enough keywords to parse the input.<br>
                                        Found Keywords: ${foundCategoriesString}<br>
                                        Needed Keywords: Defense, Offense, Statistics<br>
                                        Optional Keywords: Special Abilities, Ecology, Tactics, Description`
                        let error = new sbcError(0, "Parse", errorMessage)
                        sbcData.errors.push(error)
                        sbcData.parsedInput.success = false

                    }
                } else {
                    let errorMessage = `Failed to find any keywords to parse the input.<br>
                                        Needed Keywords: Defense, Offense, Statistics<br>
                                        Optional Keywords: Special Abilities, Ecology, Tactics, Description`
                    let error = new sbcError(0, "Parse", errorMessage)
                    sbcData.errors.push(error)
                    sbcData.parsedInput.success = false

                }
            } catch (e) {

                let errorMessage = "parseInput() failed with an unspecified error. Sorry!"
                let error = new sbcError(0, "Parse", errorMessage)
                sbcData.errors.push(error)
                sbcData.parsedInput.success = false
                throw e

            }
        } else {
            let errorMessage = "parseInput() failed as the input could not be prepared successfully"
            let error = new sbcError(0, "Parse", errorMessage)
            sbcData.errors.push(error)
            sbcData.parsedInput.success = false
        }

        sbcConfig.options.debug && console.groupEnd()

    }

    /**
     * Try to find a matching parser for a given category
     *
     * @param {"base"|"defense"|"offense"|"statistics"|"ecology"|"special abilities"|"description"} category The part of the statblock we are parsing.
     * @param {Array.<string>} data Array of separated data contained.
     * @param {number} startLine Index from where this part of the statblock starts.
     */
    static async parseCategories(category, data, startLine) {
        let errorMessage = ""
        let error = null

        switch (category) {
            case "base":
                await parseBase(data, startLine)
                sbcData.parsedCategories++
                break
            case "defense":
                await parseDefense(data, startLine)
                sbcData.parsedCategories++
                break
            case "offense":
                await parseOffense(data, startLine)
                sbcData.parsedCategories++
                break
            case "statistics":
                await parseStatistics(data, startLine)
                sbcData.parsedCategories++
                break
            case "tactics":
                await parseTactics(data, startLine)
                sbcData.parsedCategories++
                break
            case "ecology":
                await parseEcology(data, startLine)
                sbcData.parsedCategories++
                break
            case "special abilities":
                await parseSpecialAbilities(data, startLine)
                sbcData.parsedCategories++
                break
            case "description":
                await parseDescription(data, startLine)
                sbcData.parsedCategories++
                break
            default:
                errorMessage = `No Parser found for category: ${category}`
                error = new sbcError(1, "Parse/Categories", errorMessage)
                sbcData.errors.push(error)
                sbcData.parsedInput.success = false
                break
        }
    }
}

/** Convenience helper, tries to parse the number to integer, if it is NaN, will return 0 instead. */
export const parseInteger = (value) => { let p = parseInt(value); return isNaN(p) ? 0 : p; };

/** Convenience helper, returns an array with the base text and the sub text if found. Format: base text (sub text) */
export const parseSubtext = (value) => { return sbcUtils.parseSubtext(value); }

export const parseValueToPath = async (obj, path, value) => {
    var parts = path.split(".");
    var curr = obj;
    for (var i = 0; i < parts.length - 1; i++)
        curr = curr[parts[i]] || {};
    curr[parts[parts.length - 1]] = value;
}

/**
 * Wrapper for {@link Actor#update}.
 *
 * @param {Actor} obj The actor to be updated.
 * @param {string} path Where to perform the update.
 * @param {any} value Value to substitute.
 * @returns {Promise.<Actor>} The update document instance.
 */
export const parseValueToDocPath = async (obj, path, value) => {
    return obj.update({ [path]: value });
}

/* ------------------------------------ */
/* Check for flags and parse            */
/* ------------------------------------ */

// Check if some special flags were set during parsing
export async function checkFlags() {

    sbcUtils.log("Flags set during the conversion process")
    sbcConfig.options.debug && console.log(sbcConfig.options.flags)

    let parsedFlags = []

    for (const flag in sbcConfig.options.flags) {
        // Fix for set abilities persisting even when flags are reset
        if (sbcConfig.options.flags[flag]) {

            let fields = []
            let value = null
            let supportedTypes = "string"
            let flagNeedsAdditionalParsing = false

            switch(flag) {
                case "isUndead":
                  // When its an undead, use Cha for HP and Save Calculation
                  fields = ["system.attributes.hpAbility", "system.attributes.savingThrows.fort.ability"]
                  if (sbcConfig.options.flags[flag] === true) {
                      value = "cha"
                  } else {
                      value = "con"
                  }
                  flagNeedsAdditionalParsing = true
                  break
                case "noStr":
                  fields = ["system.abilities.str.base", "system.abilities.str.value", "system.abilities.str.total"];
                  flagNeedsAdditionalParsing = true
                  value = "NaN";
                  break;
                case "noDex":
                  fields = ["system.abilities.dex.base", "system.abilities.dex.value", "system.abilities.dex.total"];
                  flagNeedsAdditionalParsing = true
                  value = "NaN";
                  break;
                case "noCon":
                  fields = ["system.abilities.con.base", "system.abilities.con.value", "system.abilities.con.total"];
                  flagNeedsAdditionalParsing = true
                  value = "NaN";
                  break;
                case "noInt":
                  fields = ["system.abilities.int.base", "system.abilities.int.value", "system.abilities.int.total"];
                  flagNeedsAdditionalParsing = true
                  value = "NaN";
                  break;
                case "noWis":
                  fields = ["system.abilities.wis.base", "system.abilities.wis.value", "system.abilities.wis.total"];
                  flagNeedsAdditionalParsing = true
                  value = "NaN";
                  break;
                case "noCha":
                  fields = ["system.abilities.cha.base", "system.abilities.cha.value", "system.abilities.cha.total"];
                  flagNeedsAdditionalParsing = true
                  value = "NaN";
                  break;
                default:
                    break
            }

            if (flagNeedsAdditionalParsing) {
              let parser = new SimpleParser(fields, supportedTypes)
              parsedFlags[flag] = await parser.parse(value, -1)
            }


        }

    }

}

export async function createItem(itemData) {
  try {
    const updateData = pf1.migrations.migrateItemData(itemData.toObject());
    if (!foundry.utils.isEmpty(updateData)) {
        await itemData.updateSource(updateData);
    }

    let item = await sbcData.characterData.actorData.createEmbeddedDocuments("Item", [itemData.toObject()]);
    return [true, item];
  } catch (err) {
    sbcConfig.options.debug && console.error(err);
    let errorMessage = `Failed to create embedded item ${itemData.name}.`
    let error = new sbcError(1, "Parse", errorMessage)
    sbcData.errors.push(error)
    sbcData.parsedInput.success = false
    return false
  }
}

export async function createBuffs() {
    try {
        sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | Finding Buffs")
        let items = sbcData.characterData.actorData.itemTypes.feat.concat(sbcData.characterData.actorData.itemTypes.spell);

        for(let buffableItem of items) {
            let name = buffableItem.name;
            console.log(`Checking ${name}`, buffableItem)

            let searchEntity = {
                name: name,
                altName: `${name.replace(/(constant|weekly|monthly|yearly):/gi, "").trim()}`,
                type: "buff"
            }

            let entity = await sbcUtils.findEntityInCompendium(["pf1.commonbuffs"], searchEntity, "buff", null, sbcData.characterData.classes)
            if(!entity) entity = game.items.getName(searchEntity.name)
            if(!entity) entity = game.items.getName(searchEntity.altName)

            if (entity) {
                console.log(`Found ${name}.`, entity)
                if (buffableItem.type === "spell") {
                    let spellBookKey = buffableItem.system.spellbook;
                    console.log(`Spellbook key for ${name}: ${spellBookKey}`);
                    let spellBook = deepClone(buffableItem.spellbook);
                    console.log(`Spellbook data for ${name}: `, spellBook, spellBook?.cl);
                    let casterLevel = sbcData.characterData.actorData.system.attributes.spells.spellbooks[spellBookKey]?.cl.total ?? -1;
                    // let casterLevel = buffableItem.casterLevel ?? -1;
                    // let casterLevel = buffableItem.getRollData().cl ?? -1;
                    console.log(`Caster level for ${buffableItem.name}: ${casterLevel}`);

                    if (casterLevel > 0) entity.updateSource({"system.level": casterLevel});
                }

                console.log(`Creating buff for ${name}.`);
                await createItem(entity)
                let buff = sbcData.characterData.actorData.itemTypes.buff.find((i) => i.name === entity.name);
                console.log(buff)
                if (/^Constant:/i.test(name)) { await buff.update({"system.duration.value": ""}); await buff.setActive(true); }

            }
        }
        sbcConfig.options.debug && console.groupEnd()
    } catch(err)
    {
        sbcConfig.options.debug && console.error(err);
    }
}

// Create the whole batch of items in one go
// export async function createEmbeddedDocuments() {

//     try {
//         sbcData.characterData.actorData.prepareData()
//         for(let i = 0; i < sbcData.characterData.items.length; i++) {
//             let item = sbcData.characterData.items[i];
//             const updateData = pf1.migrations.migrateItemData(item.toObject());
//             if (!foundry.utils.isEmpty(updateData)) {
//                 await sbcData.characterData.items[i].update(updateData);
//             }
//         }
//         return sbcData.characterData.actorData.update({ items: sbcData.characterData.items.map(i => i.toObject()) })

//     } catch (err) {

//         let errorMessage = `Failed to create embedded entities (items, feats, etc.)`
//         let error = new sbcError(1, "Parse", errorMessage)
//         sbcData.errors.push(error)
//         sbcData.parsedInput.success = false
//         return false

//     }

// }

export async function generateNotesSection() {
  let preview = await renderTemplate(
    "modules/pf1-statblock-converter/templates/sbcPreview.hbs",
    {
      actor: sbcData.characterData.actorData || {},
      notes: sbcData.notes,
      flags: sbcConfig.options.flags,
    }
  );

  let d = new Date();

  let sbcInfo = `
    <div
      class="sbcInfo"
      style="margin-top: 15px;
      margin-bottom: 5px;
      text-align: center;
      font-size: 1em;
      font-weight: 900;"
    >
      <p>
        sbc | Generated with version ${sbcConfig.modData.version} on
        ${d.toLocaleString(game.settings?.get("core", "language") || "en", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  `;

  let styledNotes = `
    <hr>
    <div class="statblockContainer" style="margin-top: 15px">
      <p>${preview}</p>
    </div>
  `;
  let rawNotes = `
    <br>
    <hr>
    <div class="rawInputContainer" style="margin-top: 15px;">
      <h2 style="text-align:middle; border: none; text-transform: uppercase; color: #000;">
        RAW INPUT
      </h2>
      <hr>
      <pre style="white-space: pre-wrap; font-size: 10px;">
        ${sbcData.input}
      </pre>
    </div>
  `;

  // WRITE EVERYTHING TO THE NOTES
  await sbcData.characterData.actorData?.update({
    "system.details.notes.value": sbcInfo + styledNotes + rawNotes,
  });
}
