import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { sbcContent } from "../../sbcContent.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse Classes
export class ClassParser extends ParserBase {

    async parse(value, line) {
        sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as class(es)")

        try {

            let compendium = "pf1.classes"

            let patternSupportedClasses = new RegExp("(" + sbcConfig.classes.join("\\b|\\b") + ")", "gi")
            let patternPrestigeClasses = new RegExp("(" + sbcConfig.prestigeClassNames.join("\\b|\\b") + ")(.*)", "gi")
            let patternWizardClasses = new RegExp("(" + sbcContent.wizardSchoolClasses.join("\\b|\\b") + ")(.*)", "gi")

            // Put the raw class info into the notes, to be used in the preview
            sbcData.notes.base.classes = sbcUtils.capitalize(value)

            // split the classes and handle each class separatly
            let classes = value.split(/\//)

            for (let i=0; i<classes.length; i++) {
                console.log(classes[i])
                let classInput = classes[i]

                let isSupportedClass = false
                let isPrestigeClass = false
                let isWizardClass = false

                sbcUtils.log("Pattern", [patternPrestigeClasses, "Result", classInput.search(patternPrestigeClasses)])
                sbcUtils.log("Pattern", [patternSupportedClasses, "Result", classInput.search(patternSupportedClasses)])
                sbcUtils.log("Pattern", [patternWizardClasses, "Result", classInput.search(patternWizardClasses)])
                if (classInput.search(patternPrestigeClasses) !== -1 && sbcConfig.prestigeClassNames.length > 0) {
                    isPrestigeClass = true
                }
                if (classInput.search(patternSupportedClasses) !== -1) {
                    isSupportedClass = true
                }
                if (classInput.search(patternWizardClasses) !== -1) {
                    isWizardClass = true
                }

                sbcUtils.log(`${isPrestigeClass}, ${isSupportedClass}, ${isWizardClass}`)
                // Supported Class, Prestige Class or Wizard Class found
                if (isPrestigeClass || isSupportedClass || isWizardClass) {
                    let tempClassName = sbcUtils.parseSubtext(classInput.replace(/\d+/g, "").trim())

                    let classArchetype = ""
                    if (tempClassName[1]) {
                        classArchetype = tempClassName[1]
                    }

                    let classLevel = 0
                    if (classInput.match(/(\d+)/)?.[0]) {
                        classLevel = classInput.match(/(\d+)/)[0]
                    }

                    let classData = {
                        name: "",
                        wizardClass: "",
                        suffix: "",
                        archetype: classArchetype,
                        level: classLevel
                    }

                    if (isSupportedClass) {
                        classData.name = tempClassName[0].match(patternSupportedClasses)[0]
                        classData.suffix = tempClassName[0].replace(classData.name, "").trim()
                    } else if (isPrestigeClass) {
                        classData.name = tempClassName[0].match(patternPrestigeClasses)[0]
                        classData.suffix = tempClassName[0].replace(classData.name, "").trim()
                    } else if (isWizardClass) {
                        classData.name = "wizard"
                        classData.wizardClass = tempClassName[0]
                        classData.suffix = tempClassName[0].replace(classData.wizardClass, "").trim()
                    } else {
                        return false
                    }

                    let classItem = await sbcUtils.findEntityInCompendium(compendium, classData, "class", line)

                    /*
                     * If the input is a prestige class AND this prestige class could not be found,
                     * create a new placeholder
                     * otherwise
                     * enter stuff as normal
                     */

                    if (isPrestigeClass && !classItem) {
                        // If the input is a prestige class that could not be found in any compendium, create a placeholder item
                        // as these are currently not supported in the pf1 system

                        let className = sbcUtils.parseSubtext(classInput.replace(/\d+/g, "").trim())[0]
                        let classLevel = classInput.match(/(\d+)/)[1]

                        let classKey = Object.keys(sbcContent.prestigeClasses).find(key => key.toLowerCase() === className.toLowerCase())
                        let classTemplate = sbcContent.prestigeClasses[classKey]

                        let classSkills = {}
                        let skillKeys = Object.keys(CONFIG.PF1.skills)

                        for (let i=0; i<skillKeys.length; i++) {

                            let searchSkill = skillKeys[i]
                            if (classTemplate.classSkills.includes(searchSkill)) {
                                classSkills[searchSkill] = true
                            } else {
                                classSkills[searchSkill] = false
                            }

                        }

                        let classItem = new Item.implementation({
                            name: sbcUtils.capitalize(className),
                            type: "class",
                            system: {
                                description: {
                                    value: "sbc | As the PF1-System currently does not include prestige classes, a placeholder was generated."
                                },
                                bab: classTemplate.bab,
                                subType: "prestige",
                                classSkills: classSkills,
                                level: +classLevel,
                                hd: +classTemplate.hd,
                                hp: +classTemplate.hd + +Math.floor(sbcUtils.getDiceAverage(+classTemplate.hd) * (+classLevel-1)),
                                savingThrows: {
                                    fort: { value: classTemplate.fort },
                                    ref:  { value: classTemplate.ref  },
                                    will: { value: classTemplate.will }
                                },
                                skillsPerLevel: +classTemplate.skillsPerLevel,

                            },
                            img: classTemplate.img
                        })



                        let infoMessage = "As the PF1-System currently does not include prestige classes, a placeholder will be generated for the class " + className + "."
                        let info = new sbcError(3, "Parse/Base/Class", infoMessage, line)
                        sbcData.errors.push(info)

                        // sbcData.characterData.items.push(classItem)
                        await createItem(classItem);

                    } else {

                        let className = classData.name;
                        let deity;
                        // If the suffix contains an "of" the probability it names a deity is high. So, set that and hope for the best
                        if (classData.suffix.search(/^(of\b)/i) !== -1 && classData.archetype !== "") {
                            deity = classData.suffix.replace(/^(of\b)/i, "").trim()
                            className = sbcUtils.capitalize(classData.name) + " " + classData.suffix + " (" + sbcUtils.capitalize(classData.archetype) + ")"
                        } else if (classData.suffix.search(/^(of\b)/i) !== -1) {
                            deity = classData.suffix.replace(/^(of\b)/i, "").trim()
                            className = sbcUtils.capitalize(classData.name) + " " + classData.suffix
                        } else if (classData.archetype !== "") {
                            className = sbcUtils.capitalize(classData.name) + " (" + sbcUtils.capitalize(classData.archetype) + ")"
                        } else if (classData.wizardClass !== "") {
                            className = sbcUtils.capitalize(classData.wizardClass)
                            classItem.update({
                                system: {
                                    tag: "wizard",
                                    useCustomTag: true,
                                }
                            })
                        } else {
                            className = sbcUtils.capitalize(classData.name)
                        }

                        if (deity) sbcData.characterData.actorData.update({ "system.details.deity": deity })

                        classItem.updateSource({
                            name: className,
                            system: {
                                level: +classData.level,
                                hp: +classItem.system.hd + +Math.floor(sbcUtils.getDiceAverage(+classItem.system.hd) * (+classData.level-1)),
                            }
                        })

                        //sbcData.characterData.items.push(classItem)
                        let [type, book] = await createItem(classItem);

                        // Add a spellbook if the class has one.
                        // Calling this manually right away so that we know the spellbook exists later.
                        // Clean up any extra spellbooks later on.
                        await sbcData.characterData.actorData.createSpellbook(book[0].system.casting)
                    }



                }  else {
                    let errorMessage = "Failed to create an item for the class " + value + "."
                    let error = new sbcError(1, "Parse/Base/Class", errorMessage, line)
                    sbcData.errors.push(error)
                    return false
                }
            }

            // classItems were created successfully
            return true

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to parse " + value + " as classes."
            let error = new sbcError(1, "Parse/Base", errorMessage, line)
            sbcData.errors.push(error)
            return false

        }

    }
}
