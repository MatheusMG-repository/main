import { sbcUtils } from "../sbcUtils.js"
import { sbcData, sbcError } from "../sbcData.js"
import { sbcConfig } from "../sbcConfig.js"
import { parserMapping } from "../Parsers/parser-mapping.js";

/* ------------------------------------ */
/* Parser for ecology data              */
/* ------------------------------------ */
export async function parseEcology(data, startLine) {
    sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | " + sbcData.parsedCategories + "/" + sbcData.foundCategories + " >> PARSING ECOLOGY DATA")
    
    let parsedSubCategories = []
    sbcData.notes["ecology"] = {
        hasEcology: true
    }

    // Loop through the lines
    for (let line = 0; line < data.length; line++) {

        try {
            let lineContent = data[line]

            let parserEcology = parserMapping.map.ecology

            // Parse Environment
            if (!parsedSubCategories["environment"]) {
                if (/(Environment)/i.test(lineContent)) {
                    let environment = {
                        name: "Environment",
                        entry: lineContent.match(/^(?:Environment)([\s\S]*?)(?=$|Organization|Treasure)/i)[1]                       
                    }
                    sbcData.notes.ecology.environment = environment.entry
                    parsedSubCategories["environment"] = await parserEcology.parse(environment, startLine + line)
                }
            }

            // Parse Organization
            if (!parsedSubCategories["organization"]) {
                if (/(Organization)/i.test(lineContent)) {
                    let organization = {
                        name: "Organization",
                        entry: lineContent.match(/(?:Organization)([\s\S]*?)(?=$|Treasure)/i)[1]                    
                    }
                    sbcData.notes.ecology.organization = organization.entry
                    parsedSubCategories["organization"] = await parserEcology.parse(organization, startLine + line)
                }
            }

            // Parse Treasure
            if (!parsedSubCategories["treasure"]) {
                if (/(Treasure)/i.test(lineContent)) {
                    let treasure = {
                        name: "Treasure",
                        entry: lineContent.match(/(?:Treasure)([\s\S]*?)$/i)[1]                     
                    }

                    // Check for npc gear
                    let hasNPCgear = lineContent.match(/(NPC Gear)/i);

                    if (hasNPCgear)
                    {
                        let npcGear = lineContent.match(/(?:NPC Gear\s*\()([^)]*)/gi)[0].replace(/NPC Gear\s*\(/i,"");
                        sbcData.treasureParsing.treasureToParse = npcGear
                        sbcData.treasureParsing.lineToRemove = startLine + line

                        let errorMessage = `
                        This is treasure and will not be included as items in the actor. If you want to parse these as real items, press here:<br/>
                        <input type="button" id="parseTreasureAsGearButton" value="Parse Treasure as Gear"></input>`                        

                        let error = new sbcError(2, "Parse/Ecology", errorMessage, startLine + line)
                        sbcData.errors.push(error)
                    }

                    sbcData.notes.ecology.treasure = treasure.entry
                    parsedSubCategories["treasure"] = await parserEcology.parse(treasure, startLine + line)
                }
            }

        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = `Parsing the ecology data failed at line ${line+startLine} (non-critical)`
            let error = new sbcError(2, "Parse/Ecology", errorMessage, line+startLine)
            sbcData.errors.push(error)
            // This is non-critical, so parse the rest
            throw err
        }
    }
    
    sbcUtils.log("RESULT OF PARSING ECOLOGY DATA (TRUE = PARSED SUCCESSFULLY)")
    sbcConfig.options.debug && console.log(parsedSubCategories)
    sbcConfig.options.debug && console.groupEnd()

    return true
}