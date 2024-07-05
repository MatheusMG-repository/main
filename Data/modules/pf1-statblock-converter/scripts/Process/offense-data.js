import { SimpleParser } from "../Parsers/Universal/simple-parser.js"
import { parserMapping } from "../Parsers/parser-mapping.js"
import { sbcConfig } from "../sbcConfig.js"
import { sbcContent } from "../sbcContent.js"
import { sbcData, sbcError } from "../sbcData.js"
import { sbcUtils } from "../sbcUtils.js"

/* ------------------------------------ */
/* Parser for offense data              */
/* ------------------------------------ */
let usedSpellbooks = []
export async function parseOffense(data, startLine) {
    sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | " + sbcData.parsedCategories + "/" + sbcData.foundCategories + " >> PARSING OFFENSE DATA")

    let parsedSubCategories = []
    sbcData.notes["offense"] = {}
    sbcData.notes.offense.spellBooks = {}

    // Setup indices, booleans and arrays for spell-parsing
    let rawSpellBooks = {}
    let spellBooksFound = 0
    let currentSpellBook = 0
    let currentSpellBookType = {
        0: "primary",
        1: "secondary",
        2: "tertiary",
    }
    let startIndexOfSpellLikeAbilities = 0
    let startIndexOfSpellBooks = []
    let spellLikeAbilitiesFound = false
    usedSpellbooks = []

    let meleeData = { text: "", line: 0}
    let rangedData = { text: "", line: 0}
    let specialAttacksExist = data.some(line => /^Special\s+Attacks\b\s*/i.test(line));

    // Loop through the lines
    for (let line = 0; line < data.length; line++) {
        try {
            let lineContent = data[line]

            if (/^(Speed|Spd)\s*/i.test(lineContent)) {
                if (!parsedSubCategories["landSpeed"]) {
                    let parserLandSpeed = parserMapping.map.offense.speed
                    let landSpeed = lineContent.match(/^(?:Speed|Spd)\s*($|[^,]*)/i)[1].trim()

                    parsedSubCategories["landSpeed"] = await parserLandSpeed.parse(landSpeed, "land", line + startLine)
                }

                // Parse Swim Speed
                if (!parsedSubCategories["swimSpeed"]) {
                    if (/\bSwim\s*/i.test(lineContent)) {
                        let parserSwimSpeed = parserMapping.map.offense.speed
                        let swimSpeed = lineContent.match(/\bSwim\s*($|[^,]*)/i)[1].trim()

                        parsedSubCategories["swimSpeed"] = await parserSwimSpeed.parse(swimSpeed, "swim", line + startLine)
                    }
                }

                // Parse Climb Speed
                if (!parsedSubCategories["climbSpeed"]) {
                    if (/\bClimb\s*/i.test(lineContent)) {
                        let parserClimbSpeed = parserMapping.map.offense.speed
                        let climbSpeed = lineContent.match(/\bClimb\s*($|[^,]*)/i)[1].trim()

                        parsedSubCategories["climbSpeed"] = await parserClimbSpeed.parse(climbSpeed, "climb", line + startLine)
                    }
                }

                // Parse Burrow Speed
                if (!parsedSubCategories["burrowSpeed"]) {
                    if (/\bBurrow\s*/i.test(lineContent)) {
                        let parserBurrowSpeed = parserMapping.map.offense.speed
                        let burrowSpeed = lineContent.match(/\bBurrow\s*($|[^,]*)/i)[1].trim()

                        parsedSubCategories["burrowSpeed"] = await parserBurrowSpeed.parse(burrowSpeed, "burrow", line + startLine)
                    }
                }

                // Parse Fly Speed
                if (!parsedSubCategories["flySpeed"]) {
                    if (/\bFly\s*/i.test(lineContent)) {
                        let parserFlySpeed = parserMapping.map.offense.speed
                        let flySpeed = lineContent.match(/\bFly\s*($|[^,]*)/i)[1].trim()

                        parsedSubCategories["flySpeed"] = await parserFlySpeed.parse(flySpeed, "fly", line + startLine)
                    }
                }
            }

            // Parse Speed Abilities
            // WIP

            // Parse Melee Attacks
            if (!parsedSubCategories["melee"]) {
                if (/^Melee\s*/i.test(lineContent)) {
                    meleeData.text = lineContent.match(/^Melee\s*(.*)/i)[1].trim()
                    if(meleeData.text.match(/(or|and)$/i)) meleeData.text += " " + data[line+1].trim();

                    meleeData.line = line + startLine;
                    sbcData.notes.offense.melee = meleeData.text

                    // Process later after Special Attacks
                    if(!specialAttacksExist) {
                        let parserMelee = parserMapping.map.offense.attacks
                        parsedSubCategories["melee"] = await parserMelee.parse(meleeData.text, "mwak", meleeData.line)
                    }
                }
            }

            // Parse Ranged Attacks
            if (!parsedSubCategories["ranged"]) {
                if (/^Ranged\s*/i.test(lineContent)) {
                    rangedData.text = lineContent.match(/^Ranged\s*(.*)/i)[1].trim()
                    if(rangedData.text.match(/(or|and)$/i)) rangedData.text += " " + data[line+1].trim();


                    rangedData.line = line + startLine;
                    sbcData.notes.offense.ranged = rangedData.text;

                    // Process later after Special Attacks
                    if(!specialAttacksExist) {
                        let parserRanged = parserMapping.map.offense.attacks
                        parsedSubCategories["ranged"] = await parserRanged.parse(rangedData.text, "rwak", rangedData.line)
                    }
                }
            }

            // Parse Special Attacks
            if (!parsedSubCategories["specialAttacks"]) {
                if (/^Special\s+Attacks?\b\s*/i.test(lineContent)) {
                    let parserSpecialAttacks = parserMapping.map.offense.specialAttacks
                    let parserMelee = parserMapping.map.offense.attacks
                    let parserRanged = parserMapping.map.offense.attacks

                    let specialAttacks = lineContent.match(/^Special\s+Attacks?\s*(.*)/i)[1].trim()

                    sbcData.notes.offense.specialAttacks = specialAttacks

                    // parsedSubCategories["specialAttacks"] = await parserSpecialAttacks.parse(specialAttacks, line+startLine)
                    parsedSubCategories["specialAttacks"] = await parserSpecialAttacks.parse(specialAttacks, line + startLine, ["special-attacks", "class-abilities"], ["equipment", "feat", "weapon"], false)

                    // Process Weapon Groups before attacks
                    await processWeaponGroups();

                    parsedSubCategories["melee"] = await parserMelee.parse(meleeData.text, "mwak", meleeData.line)
                    parsedSubCategories["ranged"] = await parserRanged.parse(rangedData.text, "rwak", rangedData.line)                }
            }

            // Parse Space, Reach and StatureparserStature
            if (!parsedSubCategories["spaceStature"]) {
                if (/^Space\b.*\bReach\b/i.test(lineContent)) {
                    // This may overwrite space and reach that was automatically derived by creature size,
                    // which in theory should be fine, i guess
                    let parserSpace = new SimpleParser(["prototypeToken.height", "prototypeToken.width"], "number")
                    let parserStature = new SimpleParser(["system.traits.stature"], "string")

                    // 10-28-23 Change:
                    // Check for space without checking for number.
                    // This used to check for a number, but failed to catch creatures that took up less space.
                    // For example, an Imp has a space of "2-1/2 ft."
                    let space = lineContent.match(/^Space\s*(\S+)\s+/i)[1]
                    space = space.replace(/(.)-(.)/g, "$1.$2");
                    let spaceMatch = space.match(/(\d*)\.+(\d*)\/+(\d*)/);
                    if (spaceMatch?.length > 0)
                        space = +spaceMatch[1] + (spaceMatch[2] / spaceMatch[3]);

                    let spaceInSquares = (Math.round(space / 0.5) * 0.5) / 5;
                    let reachInput = sbcUtils.parseSubtext(lineContent.match(/Reach(.*)/i)[1])

                    let reach = ""
                    let reachContext = ""

                    if (reachInput[0]) {
                        reach = reachInput[0];
                        // reach = reachInput[0].replace(/(\d+)(.*)/g, "$1").trim()
                        reach = reach.replace(/(.)-(.)/g, "$1.$2");
                        let reachMatch = reach.match(/(\d*)\.+(\d*)\/+(\d*)/);
                        if (reachMatch?.length > 1)
                            reach = +reachMatch[1] + (reachMatch[2] / reachMatch[3]);

                        reach = reach.replace(/(\d+\.?\d*)(.*)/g, "$1");
                    }

                    if (reachInput[1])
                        reachContext = reachInput[1].replace(/[()]/g, "").trim()

                    sbcData.notes.offense.space = space
                    sbcData.notes.offense.reach = reach
                    sbcData.notes.offense.reachContext = reachContext

                    // Foundry PF1 actor has no field for "reach", so try to derive the "stature" from reach
                    // In 90% of all cases this should be "tall"
                    let stature = "tall"

                    if (+reach < +space)
                        stature = "long"

                    parsedSubCategories["spaceReach"] = {
                        space: await parserSpace.parse(spaceInSquares, line + startLine),
                        stature: await parserStature.parse(stature, line + startLine)
                    }
                }
            }

            // Spellcasting support functions
            const getCasterLevel = (line) => line.match(/\bCL\b\s*(?<cl>\d+)/i)?.groups.cl;
            const getConcentrationBonus = (line) => line.match(/\b(Concentration\b|Conc\.)\s*\+(?<bonus>\d+)/i)?.groups.bonus;

            // Parse Spell-Like Abilities
            if (!parsedSubCategories["spellLikeAbilities"]) {
                /* Collate all lines that are part of the Spell-Like Abilities,
                 * by putting all lines found after the keyword ...
                 * ... up until the end of the section or
                 * ... up until the next keyword
                 * into an array
                 */

                // Start with the line containing the keyword, CL and other base info
                if (/^Spell-Like\s+Abilities\b\s*/i.test(lineContent)) {
                    spellLikeAbilitiesFound = true

                    sbcData.notes.offense.hasSpellcasting = true

                    // Set the startIndexOfSpellLikeAbilities to the line in the current offense section
                    startIndexOfSpellLikeAbilities = line

                    // Set casterLevel and concentrationBonus
                    let casterLevel = getCasterLevel(lineContent) ?? 0;
                    let concentrationBonus = getConcentrationBonus(lineContent) ?? casterLevel;

                    // Push the line into the array holding the raw data for Spell-Like Abilities
                    rawSpellBooks[spellBooksFound] = {
                        firstLine: lineContent,
                        spells: [],
                        spellCastingType: "prepared",
                        spellCastingClass: "_hd",
                        casterLevel: casterLevel,
                        concentrationBonus: concentrationBonus,
                        spellBookType: "spelllike"
                    }

                    currentSpellBook = spellBooksFound
                    spellBooksFound += 1
                    console.log(`Current Spellbook: ${currentSpellBook}, Spellbooks found: ${spellBooksFound}`)

                }

                /* If there are Spell-Like Abilities
                 * and the current line comes after the start of this section
                 */
                if (spellLikeAbilitiesFound && +line > +startIndexOfSpellLikeAbilities && rawSpellBooks[currentSpellBook].spellBookType === "spelllike") {
                    /* If the line contains any of the keyswords that denote a new spell section
                     * like "spells prepared" or "spells known"
                     * set endOfSpellLikeAbilitiesFound to true
                     */
                    if (/Spells|Extracts (?:Prepared|Known)|Psychic Magic/gi.test(lineContent) === false) {
                        // endOfSpellLikeAbilitiesFound = true
                        // Push the line into the array holding the raw data for Spell-Like Abilities
                        console.log("Spellbook", currentSpellBook, lineContent);
                        rawSpellBooks[currentSpellBook].spells.push(lineContent)
                    }

                    // If the end of the section containing these was not found
                    // if (!endOfSpellLikeAbilitiesFound) {
                    //     // Push the line into the array holding the raw data for Spell-Like Abilities
                    //     //rawSpellLikeAbilities.push(lineContent)
                    //     rawSpellBooks[currentSpellBook].spells.push(lineContent)
                    // }
                }
            }

            // Parse Psychic Magic
            if (!parsedSubCategories["psychicMagic"]) {
                // Psychic Magic contains a header and a single line after about its pool
                if (/^Psychic\s+Magic\b\s*/i.test(lineContent)) {

                    currentSpellBook = spellBooksFound
                    startIndexOfSpellBooks[currentSpellBook] = line
                    spellBooksFound += 1

                    sbcData.notes.offense.hasSpellcasting = true

                    const casterLevel = getCasterLevel(lineContent) ?? 0;
                    const concentrationBonus = getConcentrationBonus(lineContent) ?? casterLevel;

                    // Push the line into the array holding the raw data for Spell-Like Abilities
                    rawSpellBooks[spellBooksFound] = {
                        firstLine: lineContent,
                        spells: [],
                        spellCastingType: "points",
                        spellCastingClass: "_hd",
                        casterLevel: casterLevel,
                        concentrationBonus: concentrationBonus,
                        spellBookType: "tertiary"
                    }

                    rawSpellBooks[spellBooksFound].spells.push(data[line + 1]);
                    line++;
                }
            }

            // Parse Spells Prepared
            if (!parsedSubCategories["spellBooks"]) {
                /* Collate all lines that are part of the prepared spells,
                 * by putting all lines found after the keyword ...
                 * ... up until the end of the section or
                 * ... up until the next keyword
                 * into an array
                 */

                // Start with the line containing the keyword, CL and other base info
                if (/Spells|Extracts (?:Prepared|Known)\b\s*/i.test(lineContent)) {
                    currentSpellBook = spellBooksFound
                    startIndexOfSpellBooks[currentSpellBook] = line
                    spellBooksFound += 1
                    sbcUtils.log(`Current Spellbook: ${currentSpellBook}, Spellbooks found: ${spellBooksFound}`)

                    sbcData.notes.offense.hasSpellcasting = true

                    // Check for the spellCastingType (Spontaneous is default)
                    // Set casterLevel and concentrationBonus
                    // Set spellCastingClass (hd is default)
                    let spellCastingType = "spontaneous"
                    let casterLevel = getCasterLevel(lineContent) ?? 0;
                    let concentrationBonus = getConcentrationBonus(lineContent) ?? casterLevel;
                    let spellCastingClass = "hd"
                    let isAlchemist = /Extracts/i.test(lineContent);

                    if (/prepared/i.test(lineContent)) {
                        spellCastingType = "prepared"
                    }

                    let patternSupportedClasses = new RegExp("(" + sbcConfig.classes.join("\\b|\\b") + ")", "gi")
                    //let patternPrestigeClasses = new RegExp("(" + sbcConfig.prestigeClassNames.join("\\b|\\b") + ")(.*)", "gi")
                    //let patternWizardClasses = new RegExp("(" + sbcContent.wizardSchoolClasses.join("\\b|\\b") + ")(.*)", "gi")
                    let patternPrestigeClasses = new RegExp(`(${sbcConfig.prestigeClassNames.length ? sbcConfig.prestigeClassNames.join("\\b|\\b") : "_"} + )\\s*(Spells|Extracts)`, "gi")
                    let patternWizardClasses = new RegExp("(" + sbcContent.wizardSchoolClasses.join("\\b|\\b") + ")\\s*(Spells|Extracts)", "gi")

                    let castingClass = lineContent.match(patternSupportedClasses) ??
                                        lineContent.match(patternPrestigeClasses) ??
                                        lineContent.match(patternWizardClasses);
                    if (castingClass !== null) {
                        spellCastingClass = castingClass[0].split(/\s/)[0]
                    } else {
                        let classItem = sbcData.characterData.actorData.itemTypes.class.find(c => c.system.casting);
                        spellCastingClass = classItem ? classItem.name : "hd";
                    }

                    // Push the line into the array holding the raw data for spellBook
                    rawSpellBooks[currentSpellBook] = {
                        firstLine: lineContent,
                        spells: [],
                        spellCastingClass: spellCastingClass,
                        spellCastingType: spellCastingType,
                        casterLevel: casterLevel,
                        concentrationBonus: concentrationBonus,
                        spellBookType: currentSpellBookType[currentSpellBook],
                        isAlchemist: isAlchemist
                    }

                    //rawSpellBooks[spellBooksFound].data.push(lineContent)
                }

                /* If there are Spells prepared
                 * and the current line comes after the start of this section
                 */
                if (spellBooksFound !== 0 && currentSpellBook == spellBooksFound - 1 && +line > +startIndexOfSpellBooks[currentSpellBook]) {
                    /* If the line contains any of the keyswords that denote a new spell section
                     * like "spells prepared" or "spells known"
                     * set endOfSpellBookFound to true
                     */

                    if (/Spells|Extracts (?:Prepared|Known)|Psychic Magic/gi.test(lineContent) === false) {
                        // endOfSpellBookFound[spellBooksFound] = true
                        // Push the line into the array holding the raw data for Spell-Like Abilities
                        rawSpellBooks[currentSpellBook].spells.push(lineContent)
                    }

                    // If the end of the section containing these was not found
                    // if (!endOfSpellBookFound[spellBooksFound]) {
                        // Push the line into the array holding the raw data for Spell-Like Abilities
                        // rawSpellBooks[spellBooksFound].spells.push(lineContent)
                    // }
                }
            }

            /* If this is the last line of the offense block
             * send spellBooks (if available) to the SpellBooksParser
             * and the notes section
             */
            if (line == data.length - 1) {
                //await sbcData.characterData.actorData.prepareData();
                let keysRawSpellBooks = Object.keys(rawSpellBooks)

                if (keysRawSpellBooks.length > 0) {
                    let parserSpellBooks = parserMapping.map.offense.spellBooks

                    for (let i = 0; i < keysRawSpellBooks.length; i++) {
                        let keyRawSpellBook = keysRawSpellBooks[i]
                        let rawSpellBook = rawSpellBooks[keyRawSpellBook]

                        let spellBookNote = [
                            rawSpellBook.firstLine
                        ]
                        spellBookNote = spellBookNote.concat(rawSpellBook.spells)

                        sbcData.notes.offense["spellBooks"][i] = spellBookNote

                        sbcUtils.log(`Spellbook ${i}: ${rawSpellBook.spellBookType}`, rawSpellBook);
                        let [blank, type] = await parserSpellBooks.parse(rawSpellBook, startIndexOfSpellBooks[i])
                        sbcUtils.log(`Spellbook ${i}: ${type}`, blank);
                        usedSpellbooks.push(type);
                    }
                }
            }
        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = `Parsing the offense data failed at line ${line + startLine}`
            let error = new sbcError(1, "Parse/Offense", errorMessage, line + startLine)
            sbcData.errors.push(error)
            return false
        }
    }

    sbcUtils.log("RESULT OF PARSING OFFENSE DATA (TRUE = PARSED SUCCESSFULLY)")
    sbcConfig.options.debug && console.log(parsedSubCategories)
    sbcConfig.options.debug && console.groupEnd()

    return true
}

export async function pruneSpellbooks() {
    for(let book of Object.keys(sbcData.characterData.actorData.system.attributes.spells.spellbooks)) {
        if(!usedSpellbooks.includes(book)) {

            await sbcData.characterData.actorData.update({
                [`system.attributes.spells.spellbooks.${book}`]: {
                    inUse: false,
                    label: "",
                    class: ""
                }
            });
        }
    }
}

async function processWeaponGroups() {
    let features = sbcData.characterData.actorData.itemTypes.feat.filter(feat => feat.system.subType === "classFeat");
    let weaponGroups = Object.values(sbcConfig.weaponGroups);

    for (let feature of features) {
        let subText = sbcUtils.parseSubtext(feature.name.toLowerCase());
        subText.shift();
        for (let group of subText) {
            let foundGroup = weaponGroups.find(wg => group.includes(wg));
            if(foundGroup) {
                let foundBonus = parseInt(group.match(/\+(\d+)/)[1]);
                sbcConfig.options.debug && console.log("Found Group", foundGroup, "Found Bonus", foundBonus);
                let groupKey = Object.keys(sbcConfig.weaponGroups)[weaponGroups.indexOf(foundGroup)]

                if(foundGroup && foundBonus && !Object.keys(sbcData.characterData.weaponGroups).includes(groupKey))
                    sbcData.characterData.weaponGroups[groupKey] = foundBonus;
            }
        }
    }

    sbcConfig.options.debug && console.log("Weapon Groups", sbcData.characterData.weaponGroups);
}