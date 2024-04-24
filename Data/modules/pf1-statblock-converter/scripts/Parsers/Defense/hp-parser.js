import { sbcUtils } from "../../sbcUtils.js";
import { sbcData, sbcError } from "../../sbcData.js";
import { sbcConfig } from "../../sbcConfig.js";
import { parserMapping } from "../parser-mapping.js";
import { ParserBase } from "../base-parser.js";
import { createItem } from "../../sbcParser.js";

// Parse HP, HD and special HD/HP Abilities (like Regeneration or Fast Healing)
export class HPParser extends ParserBase {
  async parse(value, line) {
    sbcConfig.options.debug && sbcUtils.log(`Trying to parse "${value}" ` + " as HP/HD")

    try {
      // Check the current Items for classes and racialHD
      // let currentItems = sbcData.characterData.items
      let currentItems = sbcData.characterData.actorData.items.contents
      let classItems = []
      let hasOnlyRacialHd = true
      let classesLeftToParse = 0
      let parsedClasses = 0
      let parsedNonRacialClasses = 0;
      let isRacial = false
      let hasClassAndRacialHd = false
      let classLevels = 0;

      for (let i=0; i<currentItems.length; i++) {
        if (currentItems[i].type === "class") {
          let classItem = currentItems[i]

          // Reset the HP for all classItems
          await classItem.update({ "system.hp": 0 });

          if (classItem.system.subType !== "racial") {
            hasOnlyRacialHd = false
            classLevels += classItem.system.level;
            classesLeftToParse++
          } else {
            // Reset Level of RacialHD
            classItem.update({ "system.level": 0 })
            isRacial = true
          }

          // Save the classItems for later use
          let classWithHd = {
            name: classItem.name,
            hd: classItem.system.hd,
            level: classItem.system.level,
            type: classItem.system.subType,
            isParsed: false,
            isRacial
          }

          if(isRacial) classItems.push(classWithHd);
          else classItems.unshift(classWithHd)
        }
      }

      let input = sbcUtils.sbcSplit(value)

      // Get the HitDice and the bonus HP
      let splitHpAndHd = sbcUtils.parseSubtext(input[0])

      // Get the total hp (only numbers!)
      let hpTotalInStatblock = splitHpAndHd[0].match(/(\d+)/)[1]

      sbcData.characterData.conversionValidation.attributes["hpTotal"] = hpTotalInStatblock

      let calculatedHpTotal = 0
      let calculatedHdTotal = 0

      let hdInput = splitHpAndHd[1]
      let hdPool = hdInput.match(/(\d+d\d+)/g)
      let hdPoolsToParse = hdPool.length

      // If there are more hdPool Items (e.g. ["3d6",2d10"]) than classes
      // then the creature has class and racial hit dice
      if (hdPoolsToParse > classesLeftToParse && classesLeftToParse !== 0) hasClassAndRacialHd = true
      if(hdPoolsToParse === 1 && hdPool[0].split("d")[0] > classLevels) hasClassAndRacialHd = true

      // HP Bonus Pool
      let hpBonus = 0
      // Check, if there are Bonus HP
      if (hdInput.search(/(\b[^d+\s]*\d+[^\sd+]*\b)(?!\s*HD)/i) !== -1) {
        let hpBonusPool = hdInput.match(/(\b[^d+\s]*\d+[^\sd+]*\b)(?!\s*HD)/gi)

        for (let i=0; i<hpBonusPool.length; i++) {
          hpBonus += +hpBonusPool[i]
        }
      }

      calculatedHpTotal += +hpBonus

      // Calculate HP from Hit Dice and distribute that to Class and RacialHD items
      let totalHitDice = 0;
      let lastHitDiceSize = 0;
      // Loop through the pools
      for (let i=0; i<hdPool.length; i++) {
        let currentHitDice = hdPool[i]
        let numberOfHitDice = currentHitDice.split("d")[0]
        let sizeOfHitDice = currentHitDice.split("d")[1]
        totalHitDice += numberOfHitDice;

        let tempHp = +sizeOfHitDice + +Math.floor(+sbcUtils.getDiceAverage(+sizeOfHitDice) * (+numberOfHitDice-1))

        calculatedHpTotal += +tempHp
        calculatedHdTotal += +numberOfHitDice

        //console.log(`Current HD is ${currentHitDice}. Number: ${numberOfHitDice} and Size: ${sizeOfHitDice}.`);

        // Loop through the classItems
        for (let j=0; j<classItems.length; j++) {
          if (numberOfHitDice > 0) {
            let classItem = classItems[j]
            // Check, if the sizeOfHitDice matches
            if (+sizeOfHitDice === +classItem.hd && !classItem.isParsed) {
              // Find the classItem with a matching name
              let foundClassItem = sbcData.characterData.actorData.items.contents.find(o => o.name === classItem.name)
              //console.log(`Found class item ${foundClassItem.name}`);
              let calcHp = 0;
              let calcFcHp = 0;

              if (hasOnlyRacialHd) {
                //console.log(`Only racial classes. Setting level to ${numberOfHitDice}.`);
                // Calculate the HP for Entries with just Racial Hit Dice
                // These use the numberOfHitDice instead of the classItem.level
                calcHp = +Math.floor(+sbcUtils.getDiceAverage(+sizeOfHitDice) * +numberOfHitDice)
                // Set the HD for the racialHd as well
                await foundClassItem.update({"system.level": +numberOfHitDice})

                numberOfHitDice -= +numberOfHitDice
                totalHitDice -= numberOfHitDice
              } else if (hasClassAndRacialHd) {
                //console.log(`Racial and Class HD.`);
                // Calculate the HP for Entries with Class and Racial Hit Dice
                if (parsedClasses < classesLeftToParse && !classItem.isRacial && (numberOfHitDice == classItem.level || hdPool.length === 1)) {
                  //console.log(`Class is ${foundClassItem.name}, and is level ${classItem.level}`);
                  // Calculate the HP for Classes of type Class as long as there are classes left to parse
                  if(parsedNonRacialClasses < 1 && classItem.type !== 'npc') {
                    calcHp = +sizeOfHitDice + +Math.floor(+sbcUtils.getDiceAverage(+sizeOfHitDice) * (+classItem.level-1))
                    calcFcHp = +classItem.level;
                    parsedNonRacialClasses++
                  }
                  else { // Only maximize the first HD of the first non-racial hd class
                    calcHp = +Math.floor(+sbcUtils.getDiceAverage(+sizeOfHitDice) * +classItem.level)
                  }
                  numberOfHitDice -= +classItem.level
                  totalHitDice -= classItem.level
                  classItems[j].isParsed = true
                  parsedClasses++
                } else if (classItem.isRacial) {
                  //console.log(`Class is ${foundClassItem.name}, and is racial ${numberOfHitDice}.`);
                  // Calculate the HP for Classes of type Class as long as there are classes left to parse
                  calcHp = +Math.floor(+sbcUtils.getDiceAverage(+sizeOfHitDice) * +numberOfHitDice)
                  classItem.level = +numberOfHitDice
                  await foundClassItem.update({"system.level": classItem.level})
                  numberOfHitDice -= +classItem.level
                  totalHitDice -= classItem.level

                  classItems[j].isParsed = true
                } else {
                  // THIS SHOULD NOT HAPPEN AT ALL
                  sbcConfig.options.debug && sbcUtils.log("This should not happen while parsing hit dice and hit points. Please let me know it this happens on my github.")
                }
              } else {
                //console.log(`Only class HD. Setting level to ${classItem.level}.`);
                // Calculate the HP for Entries with just Class Hit Dice
                if (parsedClasses < classesLeftToParse) {
                  // Calculate the HP for Classes of type Class as long as there are classes left to parse
                  if(parsedNonRacialClasses < 1 && classItem.type !== 'npc') {
                    calcHp = +sizeOfHitDice + +Math.floor(+sbcUtils.getDiceAverage(+sizeOfHitDice) * (+classItem.level-1))
                    calcFcHp = +classItem.level;
                    parsedNonRacialClasses++
                  }
                  else { // Only maximize the first HD of the first non-racial hd class
                    calcHp = +Math.floor(+sbcUtils.getDiceAverage(+sizeOfHitDice) * +classItem.level)
                  }
                  numberOfHitDice -= +classItem.level
                  totalHitDice -= classItem.level
                  classItems[j].isParsed = true
                  parsedClasses++
                }
              }

              await foundClassItem.update({"system.hp": +calcHp, "system.fc.hp.value": +calcFcHp})
            }
          }
        }

        if(numberOfHitDice > 0) lastHitDiceSize = sizeOfHitDice;

        // Save Total HP and HD for the preview
        sbcData.notes.defense["hpTotal"] = hpTotalInStatblock
        sbcData.notes.defense["hdTotal"] = calculatedHdTotal
        sbcData.notes.defense["hdPool"] = hdInput
      }

      //console.log(`Processed all but ${totalHitDice}HD.`);
      // If we still have leftover HD, add them to the racial hd class
      if(totalHitDice < 0) {
        // Find the classItem with a matching name
        let foundClassItem = sbcData.characterData.actorData.items.contents.find(o => o.isRacial === true)
        //console.log(`Found class item ${foundClassItem.name}`);
        let calcHp = 0

        // Calculate the HP for Entries with just Racial Hit Dice
        // These use the numberOfHitDice instead of the classItem.level
        calcHp = +Math.floor(+sbcUtils.getDiceAverage(+lastHitDiceSize) * +totalHitDice)
        // Set the HD for the racialHd as well
        await foundClassItem.update({"system.level": +totalHitDice, "system.hp": +calcHp});
      }

      // If our racial HD are 0, turn off the saves
      sbcData.characterData.actorData.items.contents.forEach((classItem) => {
        if(classItem.type === "class") {
          if(classItem.system.level === 0) {
            classItem.update({"system.savingThrows": {
              fort: {value: '', base: 0, good: classItem.system.savingThrows.fort.good },
              ref: {value: '', base: 0, good: classItem.system.savingThrows.ref.good },
              will: {value: '', base: 0, good: classItem.system.savingThrows.will.good },
            }});
          }
        }
      });

      // Set the current value of the actor hp
      //sbcData.characterData.actorData.update({ "system.attributes.hp.value": +hpTotalInStatblock })

      // If there is data after the hd in brackets, add it as a special hdAbility
      if (input.length > 1) {
          let hdAbilities = []

          let hdAbilitiesPattern = new RegExp("(\\bregeneration\\b|\\bfast[ -]healing\\b)", "gi")

          for (let i=1; i<input.length; i++) {
            let tempInput = input[i].trim()

            if (tempInput.length !== 0) {
              // Check, if the input matches "regeneration" or "fast healing"
              if (tempInput.search(hdAbilitiesPattern) !== -1) {
                // Input the hdAbility into the correct places in the sheet

                let hpAbilityType = tempInput.match(hdAbilitiesPattern)[0].toLowerCase()

                switch (hpAbilityType) {
                  case "regeneration":
                    let parserRegeneration = parserMapping.map.defense.regeneration;
                    await parserRegeneration.parse(tempInput, line)
                    break
                  case "fast healing":
                  case "fast-healing":
                    let parserFastHealing = parserMapping.map.defense.fastHealing;
                    await parserFastHealing.parse(tempInput, line)
                    break
                  default:
                    break
                }
                hdAbilities.push(tempInput)
              } else {
                // Generate a placeholder for every hdAbility that is not accounted for in the character sheet
                let hdAbility = {
                  name: tempInput,
                  type: "misc"
                }

                hdAbilities.push(hdAbility.name)

                let placeholder = await sbcUtils.generatePlaceholderEntity(hdAbility, line)
                
                await createItem(placeholder);
            }
          }
        }

        sbcData.notes.defense["hdAbilities"] = hdAbilities.join(", ")
      }

      return true
    } catch (err) {
      sbcConfig.options.debug && console.error(err);
      let errorMessage = "Failed to parse " + value + " as HP/HD."
      let error = new sbcError(1, "Parse/Defense", errorMessage, line)
      sbcData.errors.push(error)
      return false
    }
  }
}
