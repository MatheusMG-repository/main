import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { ParserBase } from "../base-parser.js";

// Parse Skills
export class SkillParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as skills")

        try {
            let patternSkills = new RegExp("(?:" + Object.values(CONFIG["PF1"].skills).join("\\b|\\b") + ")", "i")
            let patternRacialModifier = new RegExp(`racial (?:modifiers|modifier|bonus)\\s*(?<sign>\\-|\\+)?(?<number>\\d*)\\s*(?<name>${Object.values(CONFIG["PF1"].skills).join("\\b|\\b")})(?<context>.*)`, "i");

            let skills = sbcUtils.sbcSplit(value)
            skills = skills.reverse(); // Reverse the skills so that we can handle Racial Modifiers first.
            let classSkills = []
            let racialModifiers = {};
            let skillChanges = {};

            // Check the current Items for classes and save, if a skill is a classSkill
            let currentItems = sbcData.characterData.actorData.items.contents

            for (let i=0; i<currentItems.length; i++) {
                if (currentItems[i].type === "class") {
                    let classItem = currentItems[i]
                    let skillKeys = Object.keys(classItem.system.classSkills)

                    // Loop through the skills
                    for (let j=0; j<skillKeys.length; j++) {
                        let currentSkill = skillKeys[j]
                        if (classItem.system.classSkills[currentSkill] === true) {
                            if (!classSkills.includes(currentSkill)) {
                                classSkills.push(currentSkill)
                            }
                        }
                    }
                }

                // Loop through the item's changes, if any
                currentItems[i].changes.map(change => {
                    let skillKey = "";
                    if(/skill\.(...)\.subSkills/i.test(change.subTarget)) { // We are a subskill, and custom
                        skillKey = change.subTarget.match(/skill\....\.subSkills\.(.*)/i)[1];
                    }
                    else if(/skill\./i.test(change.subTarget)) { // We are a normal skill
                        skillKey = change.subTarget.match(/skill\.(.*)/i)[1];
                    }

                    if(skillKey !== "") {
                        if(skillChanges[skillKey] !== null && skillChanges[skillKey] !== undefined)
                            skillChanges[skillKey] += change.value;
                        else skillChanges[skillKey] = change.value;
                    }
                });
            }

            // Setup Counters
            let countOfCustomSkills = 0
            let countOfSubSkills = {
                art: 1,
                crf: 1,
                lor: 1,
                prf: 1,
                pro: 1,
            }

            let alreadyHasSubskills = []

            for (let i=0; i<skills.length; i++) {
                // Replace common Skill shorthands and misswordings
                let rawSkill = skills[i]
                    .replace(/\bEnter Choice\b/igm, "any one")
                    .replace(/Arcane/igm, "Arcana")
                    .replace(/\bPer\./igm, "Perception")
                    .replace(/S\. Motive/igm, "Sense Motive")
                    .replace(/\bLing\./igm, "Linguistics");

                if (rawSkill.match(/[+-]?\s*\d+(?![^(]*\))/g)?.length > 1) {
                    let missedCommas = rawSkill.split(/(?<=[-+]\d+) /);
                    rawSkill = missedCommas.splice(0, 1)[0];
                    skills.push(...missedCommas);
                }

                // Check, if the rawSkill contains "racial modifiers"
                // And skip to the end of the array as we do not need these
                if (rawSkill.search(/racial (?:modifiers|modifier|bonus)/i) !== -1) {
                    let racialSkill = rawSkill.match(patternRacialModifier);

                    racialModifiers[racialSkill.groups.name.toLowerCase()] = {
                        number: (racialSkill.groups.sign ?? "") + +racialSkill.groups.number,
                        context: racialSkill.groups.context ?? ""
                    };
                    continue;
                }

                let skill = null

                let knowledgeSubSkills = [
                    "Arcana",
                    "Dungeoneering",
                    "Engineering",
                    "Geography",
                    "History",
                    "Local",
                    "Nature",
                    "Nobility",
                    "Planes",
                    "Religion",
                ]

                // Check if there are multiple subskills for knowledge
                if (rawSkill.search(/knowledge|perform/i) !== -1 && rawSkill.search(/,|\band\b|&/g) !== -1) {
                    // If there are, generate new skills and push them to the array of skills

                    let tempSkill = sbcUtils.parseSubtext(rawSkill)

                    let skillName = tempSkill[0]
                    let skillModifier = tempSkill[2][0]
                    let skillContext = null
                    if (tempSkill[2][1]) {
                        skillContext = tempSkill[2][1]
                    }

                    let subSkills = tempSkill[1].split(/,|\band\b|&/g)

                    for (let j=0; j<subSkills.length; j++) {
                        let subSkill = subSkills[j].trim()
                        let newSkill = skillName + " (" + subSkill + ") " + skillModifier
                        skills.push(newSkill)
                    }

                    continue

                } else if (rawSkill.search(/knowledge/i) !== -1 && rawSkill.search(/any/g) !== -1) {
                    // If its a knowledge skill with "any" as subskill
                    // Find out how many, as most of the time its denoted as "any two"/"any three"

                    let tempSkill = sbcUtils.parseSubtext(rawSkill)

                    let skillName = tempSkill[0]
                    let skillModifier = tempSkill[2][0]
                    let skillContext = null
                    if (tempSkill[2][1]) {
                        skillContext = tempSkill[2][1]
                    }

                    let stringOfKnowledgeSubskills = tempSkill[1].match(/(?:\bany\b )(.*)/i)[1]
                    let numberOfKnowledgeSubskills = 0

                    switch (stringOfKnowledgeSubskills) {
                        case "one":
                            numberOfKnowledgeSubskills = 1
                            break
                        case "two":
                            numberOfKnowledgeSubskills = 2
                            break
                        case "three":
                            numberOfKnowledgeSubskills = 3
                            break
                        case "four":
                            numberOfKnowledgeSubskills = 4
                            break
                        case "five":
                            numberOfKnowledgeSubskills = 5
                            break
                        case "six":
                            numberOfKnowledgeSubskills = 6
                            break
                        case "seven":
                            numberOfKnowledgeSubskills = 7
                            break
                        case "eight":
                            numberOfKnowledgeSubskills = 8
                            break
                        case "nine":
                            numberOfKnowledgeSubskills = 9
                            break
                        default:
                            break
                    }

                    // Pick Subskills at random
                    let alreadyPickedSubskills = ""

                    for (let i=0; i < numberOfKnowledgeSubskills; i++) {

                        let randomSubSkill = Math.floor(Math.random() * 10)
                        let searchString = new RegExp(knowledgeSubSkills[randomSubSkill], "i")

                        if (alreadyPickedSubskills.search(searchString) === -1 && !skills.includes(searchString)) {
                            let subSkill = knowledgeSubSkills[randomSubSkill]
                            let newSkill = skillName + " (" + subSkill + ") " + skillModifier
                            skills.push(newSkill)
                            alreadyPickedSubskills += newSkill
                        } else {
                            i--
                        }

                    }

                    continue

                } else if (rawSkill.search(/knowledge/i) !== -1 && rawSkill.search(/all/g) !== -1) {
                    // If its a knowledge skill with "all" as subskill

                    let tempSkill = sbcUtils.parseSubtext(rawSkill)
                    let skillName = tempSkill[0]
                    let skillModifier = tempSkill[2][0]
                    if (tempSkill[2][1]) {
                        skillContext = tempSkill[2][1]
                    }

                    for (let j=0; j<knowledgeSubSkills.length; j++) {
                        let knowledgeSubSkill = knowledgeSubSkills[j].trim()
                        let newSkill = skillName + " (" + knowledgeSubSkill + ") " + skillModifier
                        skills.push(newSkill)
                    }

                    continue

                } else {
                    skill = sbcUtils.parseSubtext(rawSkill)
                }

                try {
                    let skillName = skill[0].replace(/[+-]?\s*\d+/g, "").trim();
                    let skillTotal = skill[0].replace(skillName, "").replace(/\s/g,"");
                    let subSkill = "";
                    let skillContext = "";

                    // Check, if there is a subskill
                    if (skill[1]) {
                        subSkill = skill[1]
                    }

                    // Check, if there are restValues after separating subtext
                    if (skill[2]) {
                        // If the rest includes two values, the first one is the skillTotal and the second the context note
                        if (skillTotal === "" && skill[2][1]) {
                            skillTotal = skill[2][0]
                            skillContext = skill[2][1]
                        } else {
                            // Else, the rest includes just the value, e.g. "Craft (Penmanship)"
                            skillTotal = skill[2][0]
                        }
                    }

                    // Check if its one of the supported skills, otherwise try to parse it as a custom skill
                    let searchSkillWithSubSkill = skillName + " " + subSkill + ""

                    let skillKey = ""

                    if (skillName.search(patternSkills) !== -1) {
                        // Supported Skills without Subskills
                        skillKey = sbcUtils.getKeyByValue(CONFIG["PF1"].skills, skillName)
                    } else if (searchSkillWithSubSkill.search(patternSkills) !== -1) {
                        // Supported Skills with Subskills
                        let skillWithSubskillAndParenthesis = skillName + " (" + subSkill + ")"
                        skillKey = sbcUtils.getKeyByValue(CONFIG["PF1"].skills, skillWithSubskillAndParenthesis)
                    } else {
                        // Custom Skills not included in the system
                        skillKey = "skill"
                    }

                    let size = sbcData.characterData.actorData.system.traits.size
                    let sizeMod = 0

                    // As long as its not a custom skill ...
                    if (skillKey !== "skill") {
                        // Seems the temporary actors does not calculate the mod or if its a classSkill beforehand, so we need to do that manually
                        let skillAbility = sbcData.characterData.actorData.system.skills[skillKey].ability
                        let skillAbilityMod = sbcData.characterData.actorData.system.abilities[skillAbility].mod
                        let classSkillMod = classSkills.includes(skillKey) ? 3 : 0

                        switch (skillKey) {
                            case "fly":
                                sizeMod = CONFIG["PF1"].sizeFlyMods[size]
                                break
                            case "ste":
                                sizeMod = CONFIG["PF1"].sizeStealthMods[size]
                                break
                            default:
                                break
                        }

                        let skillRanks = +skillTotal - +skillAbilityMod - +classSkillMod - +sizeMod
                        if(racialModifiers[skillName.toLowerCase()] && (racialModifiers[skillName.toLowerCase()].context).length === 0) skillRanks -= racialModifiers[skillName.toLowerCase()].number;
                        if (skillChanges[skillKey] !== null && skillChanges[skillKey] !== undefined)
                            skillRanks -= skillChanges[skillKey];
                        
                        if (skillKey.search(/(art|crf|lor|prf|pro)/) === -1) {
                            // IF ITS NOT A SKILL WITH SUBSKILLS
                            await sbcData.characterData.actorData.update({ [`system.skills.${skillKey}.rank`]: skillRanks })

                            // Add Data to conversionValidation
                            sbcData.characterData.conversionValidation["skills"][skillKey] = {
                                total: +skillTotal,
                                context: skillContext
                            }
                        } else {
                            // IF ITS A SKILL WITH SUBSKILLS (e.g. Art, Craft, etc.)
                            let subSkillKey = skillKey + (+countOfSubSkills[skillKey])

                            // WIP FIND A WAY TO APPEND INSTEAD OF OVERWRITE THE SUBSKILLS
                            sbcData.characterData.actorData.update(
                                {
                                    [`system.skills.${skillKey}.subSkills.${subSkillKey}`]: {
                                        ability: sbcData.characterData.actorData.system.skills[skillKey].ability,
                                        acp: sbcData.characterData.actorData.system.skills[skillKey].acp,
                                        cs: sbcData.characterData.actorData.system.skills[skillKey].cs,
                                        name: sbcUtils.capitalize(subSkill),
                                        rank: skillRanks,
                                        rt: sbcData.characterData.actorData.system.skills[skillKey].rt
                                    }
                                }
                            )

                            // Add Data to conversionValidation
                            sbcData.characterData.conversionValidation["skills"][subSkillKey] = {
                                name: sbcUtils.capitalize(subSkill),
                                total: +skillTotal,
                                context: skillContext
                            }

                            countOfSubSkills[skillKey]++
                        }
                    } else {
                        // if its a custom skill ...
                        let customSkillKey = "skill"

                        if (countOfCustomSkills > 0) {
                            customSkillKey = "skill" + (+countOfCustomSkills+1)
                        }

                        let defaultAbilityMod = sbcData.characterData.actorData.abilities["int"].mod

                        let skillRanks = +skillTotal - +defaultAbilityMod
                        if (skillChanges[customSkillKey] !== null && skillChanges[customSkillKey] !== undefined)
                            skillRanks -= skillChanges[customSkillKey];
                        sbcData.characterData.actorData.update({
                            [`system.skills.${customSkillKey}`]: {
                                ability: "int",
                                acp: false,
                                background: false,
                                cs: false,
                                custom: true,
                                name: skillName,
                                rank: skillRanks,
                                rt: false
                            }
                        })

                        // Add Data to conversionValidation
                        sbcData.characterData.conversionValidation["skills"][customSkillKey] = {
                            name: skillName,
                            total: +skillTotal,
                            context: skillContext
                        }

                        countOfCustomSkills++
                    }

                } catch (err) {

                    let errorMessage = "Failed to parse " + skill + "."
                    let error = new sbcError(1, "Parse/Statistics", errorMessage, line)
                    sbcData.errors.push(error)
                    return false

                }

            }

            // If all skills were parsed correctly, return true
            return true

        } catch (err) {

            let errorMessage = "Failed to parse " + value + " as skills."
            let error = new sbcError(1, "Parse/Statistics", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }

    async reparseSkill(skill, maneuverability = null) {
        const skillKey = sbcUtils.getKeyByValue(CONFIG["PF1"].skills, skill);
        const skillRanks = sbcData.characterData.actorData.system.skills[skillKey].rank;

        switch(skill) {
            case "Climb":
            case "Swim":
                await sbcData.characterData.actorData.update({ [`system.skills.${skillKey}.rank`]: skillRanks - 8});
                break;
            case "Fly":
                let maneuverabilityAdjust = CONFIG["PF1"].flyManeuverabilityValues[maneuverability] || 0;
                await sbcData.characterData.actorData.update({ ['system.skills.fly.rank']: skillRanks - maneuverabilityAdjust });
                break;
            default:
                break;
        }
    }
}