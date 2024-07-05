import { sbcConfig } from "./sbcConfig.js";
import { sbcData, sbcError } from "./sbcData.js";

export class sbcUtils {
    static openingBrackets = ["(", "[", "{"];
    static closingBrackers = [")", "]", "}"];
    static matchingClosingBrackets = { "(": ")", "[": "]", "{": "}" };
    static uncapitals = ["a", "an", "the", "for", "and", "nor", "but", "or", "yet", "so", "at", "around", "by", "after", "for", "from", "of", "on", "to", "with", "without"];
    static packLookup = {};
    static packData = {};
    static packProcessing = false;

    static async createActor() {
        let tempActor = await Actor.create({
            name: "sbc | Actor Template",
            type: sbcConfig.const.actorType[sbcData.actorType],
            folder: sbcData.customWIPFolderId
        }, { temporary: false })
        return tempActor
    }

    /* ------------------------------------ */
    /* Resetting and Updating               */
    /* ------------------------------------ */

    static resetData() {
        sbcData.errors = []
        sbcData.input = ""
        sbcData.preparedInput = {}
        sbcData.parsedInput = {}
        sbcData.characterData = {}
        sbcData.notes = {}
        sbcData.imported = false;
        sbcData.changes = {}
        this.resetCategoryCounter()
    }

    static resetCategoryCounter() {
        sbcData.foundCategories = 0
        sbcData.parsedCategories = 1
    }

    static async reinitActor() {
        if (sbcData.characterData.actorData) {
            sbcUtils.log(
              `Deleting actor ${sbcData.characterData.actorData.name} with ID ${sbcData.characterData.actorData.id}.`,
              undefined,
              "info"
            );
            sbcData.characterData.actorData.delete();
        }
        while (game.actors.getName("sbc | Actor Template")) {
            await game.actors.getName("sbc | Actor Template").delete();
        }

        sbcData.characterData = {
            actorData: await sbcUtils.createActor(),
            items: [],
            spells: [],
            abilityDescriptions: [],
            characterDescriptions: [],
            conversionValidation: {
                "context": {},
                "attributes": {},
                "skills": {},
                "spellBooks": {}
            },
            classes: [],
            race: "",
            weaponFocus: [],
            weaponSpecialization: [],
            weaponFocusGreater: [],
            weaponSpecializationGreater: [],
            weaponGroups: {},
        }
    }

    static async resetCharacterData() {
        await this.reinitActor();

        this.resetCategoryCounter()
        await this.resetTokenData()

    }

    static async resetTokenData() {
        let label = sbcData.characterData.actorData.type === "character" ? "pc" : "npc";
        return sbcData.characterData.actorData.update({
            prototypeToken: {
                displayName: sbcConfig.options.tokenSettings.displayName,
                sight: {
                    enabled: sbcConfig.options.tokenSettings[`${label}sight`].enabled
                },
                disposition: sbcConfig.options.tokenSettings.disposition,
                displayBars: sbcConfig.options.tokenSettings.displayBars,
                bar1: sbcConfig.options.tokenSettings.bar1,
                bar2: sbcConfig.options.tokenSettings.bar2,
                brightSight: 0
            }
        })
    }

    static resetFlags() {
        sbcConfig.options.flags = {
            hasNoCMB: false,
            hasNoCMD: false,
            noStr: false,
            noDex: false,
            noCon: false,
            noInt: false,
            noWis: false,
            noCha: false,
            isUndead: false,
            hasWeaponFinesse: false
        }
    }

    /**
     * Log to the console and errorArea
     *
     * @param {any} message Output to the console.
     * @param {any[]} [data=null] See {@link https://developer.mozilla.org/en-US/docs/Web/API/console/debug_static#parameters console.debug}
     * @param {"debug"|"error"|"info"|"log"|"warn"} [outputFunc="debug"] The log level by log func call (default "debug").
     *
     * @todo The params should be an object in order to be able to destructure and avoid 'undefined' placeholder.
     */
    static log(message, data = null, outputFunc = "debug") {
        const logFunc = console[outputFunc];

        // Skipping debug log when debug is off
        if (logFunc === "debug" && !sbcConfig.options.debug) {
          return;
        }

        if(data)
            logFunc("sbc-pf1 | " + message, data);
        else
            logFunc("sbc-pf1 | " + message);
    }

    /* ------------------------------------ */
    /* Compendiums and Entities             */
    /* ------------------------------------ */

    static processCompendiums = async function (packs = [], reset = false) {
        if(sbcUtils.packProcessing) return;

        sbcUtils.packProcessing = true;
        if(sbcUtils.packData && reset) {
            sbcUtils.packData = {};
            sbcUtils.packLookup = {};
        }

        for(const pack of packs) {
            let compendium = await game.packs.get(pack);

            if (compendium) {
                await compendium.getIndex();
                compendium.fuzzyIndex = await globalThis.pf1.utils.sortArrayByName([...compendium.index]);

                // Cache the compendium for later use
                sbcUtils.packData[pack] = compendium;

                // Create a lookup for the compendium's contents by item (and subtype if available)
                // Each entry will be the item's name as the key and the UUID as the value
                for(const entity of compendium.fuzzyIndex) {
                    let type = entity.type;
                    let subtype = entity.system?.subType ?? null;

                    // Special exception, as the fuzzyIndex seems to not add the subtype for feat feats.
                    // I assume it's because that's the default in template.json.
                    if(type === "feat" && !subtype) subtype = "feat";

                    if (!sbcUtils.packLookup[type]) sbcUtils.packLookup[type] = {items: []};
                    sbcUtils.packLookup[type]["items"].push({name: entity.name, uuid: entity.uuid});
                    
                    if(subtype) {
                        if (subtype in sbcUtils.packLookup[type] === false) sbcUtils.packLookup[type][subtype] = [];
                        sbcUtils.packLookup[type][subtype].push({name: entity.name, uuid: entity.uuid});
                    }
                }
            }
        }

        sbcUtils.packProcessing = false;
    }

    /**
     * Generate permutations of an array. Complexity is O(n!).
     * Should be safe up to 7, though you should probably consider something else if you're reaching that high often.
     *
     * @template T
     * @param {T[]} perm - The Array to be generated upon
     * @returns {Array.<T[]>|false} An Array containing all Array permutations or false if failed.
     */
    static uniquePermutations = function (perm) {
        const total = new Set();
        if (perm.length > 7) {
            console.warn("Array too large. Not attempting.", perm);
            return false;
        }

        for (let i = 0; i < perm.length; i = i + 1) {
            const rest = sbcUtils.uniquePermutations(perm.slice(0, i).concat(perm.slice(i + 1)));

            if (!rest.length) {
                total.add([perm[i]]);
            } else {
                for (let j = 0; j < rest.length; j = j + 1) {
                    total.add([perm[i]].concat(rest[j]));
                }
            }
        }
        return [...total];
    }

    /**
     * Searches through compendia quickly using the system generated index caches.
     * Exact matches excluding punctuation and case are prioritized before searching word order permutations.
     *
     * @param {string} searchTerm - The name of the Document being searched for
     * @param {object} [options] - Provides a filter to limit search to specific packs or Document types
     * @param {string[]} [options.packs] - An array of packs to search in
     * @param {"Actor"|"Item"|"Scene"|"JournalEntry"|"Macro"|"RollTable"|"Playlist"} [options.type] - A Document type to limit which packs are searched in
     * @param {"Actor"|"Item"|"Scene"|"JournalEntry"|"Macro"|"RollTable"|"Playlist"} [options.itemType] - An Item type to limit which form is acceptable
     * @param {string} [options.itemSubtype] - An Item subtype to limit which form is acceptable
     * @returns {{pack: CompendiumCollection, index: object}|undefined} The index and pack containing it or undefined if no match is found
     */
    static findInCompendia = async function (searchTerm, options = { packs: [], type: undefined, itemType: null, itemSubtype: null, classes: [] }) {
        let packs;
        if (options?.packs && options.packs.length) packs = options.packs.flatMap((o) => game.packs.get(o) ?? []);
        else packs = game.packs.filter((o) => !options?.type || o.metadata.type == options.type);
        searchTerm = searchTerm.toLocaleLowerCase();
        let found, uuid;

        let itemTypes = [];
        if (typeof options.itemType === "string") itemTypes.push(options.itemType);
        else itemTypes = options.itemType;

        for (const pack of packs) {
            // sbcUtils.log(`Pack Name: ${pack.metadata.id}`)
            let packdata = sbcUtils.packData[pack.metadata.id];
            
            if (!packdata) {
                sbcUtils.log(`Pack ${pack.metadata.id} not found in cache. Processing...`)
                sbcUtils.processCompendiums([pack.metadata.id], false);
                packdata = sbcUtils.packData[pack.metadata.id];
            }
        }

        let searchArray = [];
        for(const type of itemTypes) {
            if(options?.itemSubtype && sbcUtils.packLookup[type][options.itemSubtype]) {
                searchArray = searchArray.concat(sbcUtils.packLookup[type][options.itemSubtype]);
            } else if(!options?.itemSubtype) {
                searchArray = searchArray.concat(sbcUtils.packLookup[type]["items"]);
            }
        }

        searchArray = await globalThis.pf1.utils.sortArrayByName(searchArray);

        if (searchArray.length > 0) {
            found = globalThis.pf1.utils.binarySearch(searchArray, searchTerm, (sp, it) => 
                sp.localeCompare(it.name, undefined, { ignorePunctuation: true })
            );
            if (found > -1) {
                uuid = searchArray[found].uuid;
            }
        }

        if (uuid) return uuid;

        let searchMutations = sbcUtils.uniquePermutations(searchTerm.split(/[ _-]/));
        if (searchMutations) searchMutations = searchMutations.map((o) => o.join(" "));
        else {
            // If array is too long, search for just a reversed version and one that pivots around commas/ semicolons
            searchMutations = [null];
            searchMutations.push(searchTerm.split(/[ _-]/).reverse().join(" "));
            searchMutations.push(
                searchTerm
                    .split(/[,;] ?/)
                    .reverse()
                    .flatMap((o) => o.split(" "))
                    .join(" ")
            );
        }

        for (let mut = 1; mut < searchMutations.length; mut++) {
            found = globalThis.pf1.utils.binarySearch(searchArray, searchMutations[mut], (sp, it) => 
              sp.localeCompare(it.name, undefined, { ignorePunctuation: true })
            );
            if (found > -1) {
                uuid = searchArray[found].uuid;
            }
        }

        if (uuid) return uuid;
        return false;
    };

    static async findEntityInCompendium(compendium, input, itemType = null, itemSubtype = null, _line = -1, classes = []) {
        // Create an array for all compendiums to search through
        let searchableCompendiums = []

        // Push the default compendium given when calling findEntityInCompendium
        if (compendium !== null) {
            if (typeof compendium === "string") searchableCompendiums.push(compendium)
            else searchableCompendiums = compendium;

            // sbcUtils.log("COMPENDIUMS 1", searchableCompendiums);
        }

        // If there are customCompendiums, given as a string in the module settings,
        // split them and add them to the searchableCompendiums
        let customCompendiums = []
        let customCompendiumSettings = game.settings.get(sbcConfig.modData.mod, "customCompendiums")

        if (customCompendiumSettings !== "") {
            customCompendiumSettings = customCompendiumSettings.replace(/\s/g, "");
            customCompendiums = customCompendiumSettings.split(/[,;]/g)
            searchableCompendiums = customCompendiums.concat(searchableCompendiums)
            // searchableCompendiums = searchableCompendiums.concat(customCompendiums)
            // sbcUtils.log("COMPENDIUMS 2", searchableCompendiums);
        }

        let searchResult = false
        let foundEntity = {}

        let searchOptions = {
            "packs": searchableCompendiums,
            "type": "Item",
            "itemType": itemType,
            "itemSubtype": itemSubtype,
            "classes": classes
        }

        sbcUtils.log(`Checking "${input.name}".`)
        searchResult = await sbcUtils.findInCompendia(input.name, searchOptions);

        if (searchResult === false && input.shortName) {
            sbcUtils.log(`Checking short version "${input.shortName}".`)
            searchResult = await sbcUtils.findInCompendia(input.shortName, searchOptions);
        }

        if (searchResult === false && input.altName) {
            sbcUtils.log(`Checking Alt "${input.altName}".`)
            searchResult = await sbcUtils.findInCompendia(input.altName, searchOptions);
        }
        if (searchResult === false && input.altName2) {
            sbcUtils.log(`Checking Alt2 "${input.altName2}".`)
            searchResult = await sbcUtils.findInCompendia(input.altName2, searchOptions);
        }

        sbcUtils.log("Search Result: ", searchResult);

        // Return the searchResult, which either is a clone of the found entity or null
        if (searchResult !== false) {
            foundEntity = await fromUuid(searchResult);

            return new Item.implementation(foundEntity.toObject());
        } else {
            return null
        }
    }

    static async generatePlaceholderEntity(input, _line = -1) {
        // If the input is NOT found in any of the given compendiums, create a placeholder

        let entityData = {
            name: input.name ? input.name : "undefined",
            type: input.type ? input.type : null,

            // Creature-related
            creatureType: input.creatureType ? input.creatureType : null,
            subTypes: input.subTypes ? input.subTypes : null,
            img: input.img ? input.img : "systems/pf1/icons/skills/yellow_36.jpg",

            // Gear-related
            subtext: input.subtext ? input.subtext : null,
            currency: input.currency ? input.currency : null,
            enhancement: input.enhancement ? input.enhancement : null,
            mwk: input.mwk ? input.mwk : null,

            // Class-related
            wizardClass: input.wizardClass ? input.wizardClass : null,
            suffix: input.suffix ? input.suffix : null,
            archetype: input.archetype ? input.archetype : null,
            level: input.level ? input.level : null,

            // Ability-related
            specialAbilityType: input.specialAbilityType ? input.specialAbilityType : null,
            desc: input.desc ? input.desc : "sbc | Placeholder"

            // Spell-related
            // WIP

        }

        let entity = null

        switch (input.type) {
            case "container":
                entity = new Item.implementation({
                    name: "Money Pouch: " + sbcUtils.capitalize(entityData.name),
                    type: "container",
                    system: {
                        description: {
                            value: "sbc | All currency carried was put into this container."
                        },
                        currency: {
                            pp: entityData.currency.pp,
                            gp: entityData.currency.gp,
                            sp: entityData.currency.sp,
                            cp: entityData.currency.cp
                        },
                        weightReduction: 100
                    },
                    img: "systems/pf1/icons/items/inventory/pouch-sealed.jpg"
                });
                break
            case "feats":
                entity = new Item.implementation({
                    name: sbcUtils.capitalize(entityData.name),
                    type: "feat",
                    system: {
                        description: {
                            value: "sbc | As " + entityData.name + " could not be found in any compendium, a placeholder was generated."
                        },
                    },
                    img: entityData.img
                })
                break
            case "race":
                entity = new Item.implementation({
                    name: sbcUtils.capitalize(entityData.name),
                    type: "race",
                    system: {
                        description: {
                            value: "sbc | As no playable race was found a placeholder was generated."
                        },
                        creatureType: entityData.creatureType,
                        subTypes: entityData.subTypes
                    },
                    img: entityData.img
                })
                break
            case "misc":
                entity = new Item.implementation({
                    name: sbcUtils.capitalize(entityData.name),
                    type: "feat",
                    system: {
                        description: {
                            value: entityData.desc
                        },
                        subType: "misc"
                    },
                    img: entityData.img
                })
                break
            case "attack":
                entity = new Item.implementation({
                    name: sbcUtils.capitalize(entityData.name),
                    type: "attack",
                    system: {
                        description: {
                            value: entityData.desc
                        },
                        subType: "misc"
                    },
                    img: entityData.img
                })
                break
            case "classFeat":
            case "class-abilities":
                if (entityData.specialAbilityType !== null) {
                    entity = new Item.implementation({
                        name: sbcUtils.capitalize(entityData.name),
                        type: "feat",
                        system: {
                            abilityType: entityData.specialAbilityType,
                            description: {
                                value: entityData.desc
                            },
                            subType: "classFeat"
                        },
                        img: entityData.img
                    })
                } else {
                    entity = new Item.implementation({
                        name: sbcUtils.capitalize(entityData.name),
                        type: "feat",
                        system: {
                            abilityType: "",
                            description: {
                                value: entityData.desc
                            },
                            subType: "classFeat"
                        },
                        img: entityData.img
                    })
                }
                break
            case "domains":
            case "mysteries":
            case "oppositions":
                entity = new Item.implementation({
                    name: sbcUtils.capitalize(entityData.name),
                    type: "feat",
                    system: {
                        description: {
                            value: "sbc | As there is no dedicated field for " + entityData.type + ", this placeholder was created."
                        },
                        subType: "classFeat"
                    },
                    img: entityData.img
                })
                break
            default:
                entity = new Item.implementation({
                    name: sbcUtils.capitalize(entityData.name),
                    type: entityData.type,
                    system: {
                        description: {
                            value: "sbc | As " + entityData.name + " could not be found in any compendium, a placeholder was generated."
                        }
                    },
                    img: entityData.img
                })
                break
        }

        return entity
    }

    /* ------------------------------------ */
    /* Conversion Validation                */
    /* ------------------------------------ */
    static async buildChanges(actor, itemID = null) {
        let item = null;
        let items = [];
        if (itemID !== null) {
            item = actor.items.get(itemID);
            items = [item];
        }
        if (item === null) items = actor.items;

        items.forEach(currentItem => {
            let itemChanges = currentItem.changes;

            // Check, if the currentItem has changes to be considered
            if (!isEmpty(itemChanges)) {
                itemChanges.map(async (element) => {
                    if (sbcData.changes[element.target] == null) sbcData.changes[element.target] = {}
                    let processedFormula = await Roll.fromTerms(Roll.parse(element.formula, sbcData.characterData.actorData.getRollData())).evaluate();
                    //await new Roll(element.formula).evaluate();
                    processedFormula = processedFormula?.total ?? +element.formula;// element.value;

                    if (sbcData.changes[element.target][element.type] == null) {
                        sbcData.changes[element.target][element.type] = processedFormula//element.value;
                    }
                    else {
                        sbcData.changes[element.target][element.type] += processedFormula//element.value;
                    }
                })
            }
        });
    }

    static async getValueFromChanges(target = null, type = null) {
        let total = 0;
        if (target == null && type == null) return total;
        else if (target !== "all") {
            if (sbcData.changes[target] == null) return 0;

            for (const key in Object.keys(sbcData.changes[target])) {
                if ((type && key === type) || type == null)
                    total += sbcData.changes[target][key]
            }

            return total;
        } else {
            Object.keys(sbcData.changes).map(subtarget => {
                sbcUtils.log(`Checking subtarget ${subtarget}:`)
                Object.keys(sbcData.changes[subtarget]).map(k => {
                    sbcUtils.log(`type k is ${k} = ${sbcData.changes[subtarget][k]}`)
                    if ((type && k === type) || type == null)
                        total += +sbcData.changes[subtarget][k]
                });
            });
            return total;
        }
    }

    static async conversionValidation(actor) {
        if (!sbcConfig.options.createBuff) return;
        sbcConfig.options.debug && console.groupCollapsed("sbc-pf1 | Conversion Validation")

        try {
            const conversionValidation = sbcData.characterData.conversionValidation
            await this.buildChanges(actor);

            const stage1changes = [], stage2changes = []
            let contextNotes = []

            let valueInAcTypes = 0

            // Validate the spellBooks
            let spellBooksToValidate = Object.keys(conversionValidation.spellBooks)
            const bookUpdates = {};
            for (let i = 0; i < spellBooksToValidate.length; i++) {
                let spellBookToValidate = spellBooksToValidate[i]
                let casterLevelToValidate = conversionValidation.spellBooks[spellBookToValidate].casterLevel
                let concentrationBonusToValidate = conversionValidation.spellBooks[spellBookToValidate].concentrationBonus
                let casterLevelInActor = actor.system.attributes.spells.spellbooks[spellBookToValidate].cl.total

                // let spellCastingAbility = actor.system.attributes.spells.spellbooks[spellBookToValidate].ability
                // let spellCastingAbilityModifier = actor.system.abilities[spellCastingAbility].mod

                const concentrationBonusOnActor = actor.system.attributes.spells.spellbooks[spellBookToValidate].concentration.total;

                let differenceInCasterLevel = +casterLevelToValidate - +casterLevelInActor
                let differenceInConcentrationBonus = +concentrationBonusToValidate - concentrationBonusOnActor - differenceInCasterLevel

                if (differenceInCasterLevel !== 0) {
                    bookUpdates[`data.attributes.spells.spellbooks.${spellBookToValidate}`] = {
                        cl: {
                            formula: differenceInCasterLevel.toString()
                        },
                        clNotes: "sbc | Total in statblock was CL " + casterLevelToValidate + ", adjust as needed."
                    }
                }
                if (differenceInConcentrationBonus !== 0) {
                    bookUpdates[`data.attributes.spells.spellbooks.${spellBookToValidate}.concentrationFormula`] = differenceInConcentrationBonus.toString();
                    bookUpdates[`data.attributes.spells.spellbooks.${spellBookToValidate}.concentrationNotes`] = "sbc | Total in statblock was +" + concentrationBonusToValidate + ", adjust as needed.";
                }
            }

            if (!isEmpty(bookUpdates)) {
                await actor.update(bookUpdates);
            }

            // Validate ability scores first as they can have cascading effects
            const abilityScoreKeys = ["str", "dex", "con", "int", "wis", "cha"];
            for (let abl of abilityScoreKeys) {
                const totalInActor = actor.system.abilities[abl].total
                let totalInStatblock = conversionValidation.attributes[abl.capitalize()]
                const difference = +totalInStatblock - +totalInActor
                if (difference === 0) continue;

                if (difference !== 0) {
                    let attributeChange = Object.assign({}, pf1.components.ItemChange.defaultData, {
                        formula: difference.toString(),
                        type: "untypedPerm",
                        target: abl,
                        value: +difference,
                    });

                    stage1changes.push(attributeChange)
                }
            }

            // Stage 1 conversion buff to allow ability score cascading effects to not interfere with other corrections
            // This might be better off as direct modification to the actor, however.
            if (stage1changes.length) {
                let conversionBuffItem1 = {
                    name: "sbc | Conversion Buff (Ability Scores)",
                    type: "buff",
                    system: {
                        description: {
                            value: `<h2>sbc | Conversion Buff (Ability Scores)</h2>
                            This Buff was created by <strong>sbc</strong> to compensate for differences between the statblock input and FoundryVTTs automatically calculated values.
                            <br><br>
                            As differences in ability scores can have cascading effects, these get handled first and in a separate conversion buff.`
                        },
                        active: true,
                        subType: "perm",
                        changes: stage1changes,
                        hideFromToken: true,
                        level: 0,
                        tag: "sbcConversionBuff1",
                        useCustomTag: true,
                    },
                    img: "systems/pf1/icons/skills/yellow_36.jpg"
                };

                await actor.createEmbeddedDocuments("Item", [conversionBuffItem1]);
            }

            // Get an array of all attributes that need to be validated
            let attributesToValidate = Object.keys(conversionValidation.attributes);
            // And push "acNormal", "acTouch" and "acFlatFooted" to the end of that array so it gets validated after the acTypes
            attributesToValidate.splice(attributesToValidate.indexOf("acNormal"), 1)
            attributesToValidate.splice(attributesToValidate.indexOf("acTouch"), 1)
            attributesToValidate.splice(attributesToValidate.indexOf("acFlatFooted"), 1)
            attributesToValidate.push("acNormal", "acTouch", "acFlatFooted")

            // Get an array of all items the actor currently owns
            // let currentItems = await actor.items

            // Loop through the attributes ...
            for (let i = 0; i < attributesToValidate.length; i++) {
                let attribute = attributesToValidate[i]
                let type = ""
                let target = ""
                let totalInStatblock = conversionValidation.attributes[attribute]
                let totalInActor = 0
                let valueInItems = 0
                let difference = 0

                // Skip if it's not a number (such as CMB being a dash)
                if(isNaN(totalInStatblock)) continue;

                // (1) ... and loop through the current items looking for relevant changes
                // currentItems.forEach(currentItem => {
                //     let currentItemChanges = currentItem.changes

                //     // Check, if the currentItem has changes to be considered
                //     if (!isEmpty(currentItemChanges)) {
                //         currentItemChanges.map( function (element) {
                //             if(element.subTarget === attribute.toLowerCase() || element.type === attribute.toLowerCase()) {
                //                 valueInItems += element.value;
                //             }
                //         })
                //     }
                // });
                // console.log(`Value1: ${valueInItems}`)
                // valueInItems = await this.getValueFromChanges(attribute.toLowerCase());
                // console.log(`Value2: ${valueInItems}`)

                // Generate Changes for the conversionBuff
                switch (attribute.toLowerCase()) {
                    case "str":
                    case "dex":
                    case "con":
                    case "int":
                    case "wis":
                    case "cha":
                        // Ignore here
                        break
                    case "cmd":
                    case "cmb":
                    case "init":
                        totalInActor = actor.system.attributes[attribute].total
                        type = "untypedPerm"
                        target = attribute
                        sbcUtils.log(`Attribute: ${attribute} | Total in Actor: ${totalInActor} | Total in Statblock: ${totalInStatblock}`)
                        if (totalInActor !== totalInStatblock) {
                            difference = +totalInStatblock - +totalInActor
                        }
                        break
                    case "hpbonus":
                        type = "untypedPerm"
                        target = "mhp"
                        difference = +totalInStatblock
                        break
                    case "hptotal":
                        totalInActor = actor.system.attributes.hp.max
                        type = "untypedPerm"
                        target = "mhp"
                        difference = +totalInStatblock - +totalInActor
                        break
                    case "acnormal":
                        totalInActor = actor.system.attributes.ac.normal.total
                        type = "untypedPerm"
                        target = "aac"
                        difference = +totalInStatblock - +totalInActor - +valueInAcTypes
                        break
                    case "base":
                    case "enhancement":
                    case "dodge":
                    case "inherent":
                    case "deflection":
                    case "morale":
                    case "luck":
                    case "sacred":
                    case "insight":
                    case "resistance":
                    case "profane":
                    case "trait":
                    case "racial":
                    case "competence":
                    case "circumstance":
                    case "alchemical":
                    case "penalty":
                        valueInItems = await this.getValueFromChanges("all", attribute.toLowerCase());

                        type = attribute
                        target = "aac"
                        difference = +totalInStatblock - +valueInItems
                        valueInAcTypes += +difference
                        break
                    case "rage":
                        type = "untypedPerm"
                        target = "ac"
                        difference = +totalInStatblock
                        break
                    case "fort":
                    case "ref":
                    case "will":
                        type = "untypedPerm"
                        target = attribute
                        totalInActor = actor.system.attributes.savingThrows[attribute].total ?? 0
                        difference = +totalInStatblock - +totalInActor
                        break
                    default:
                        break
                }

                // If the total in the statblock differs from the total in foundry, add a change to the conversion buff
                if (difference !== 0) {
                    let attributeChange = await new pf1.components.ItemChange({
                        formula: difference.toString(),
                        type: type,
                        target: target,
                        value: +difference,
                    });

                    stage2changes.push(attributeChange.toObject())
                }

            }

            // Add context notes to the buff
            let contextNotesToAdd = Object.keys(conversionValidation.context)

            for (let i = 0; i < contextNotesToAdd.length; i++) {
                let contextNoteType = contextNotesToAdd[i]
                let contextNoteToAdd = conversionValidation.context[contextNoteType]

                if (contextNoteToAdd !== "") {
                    let contextNote = {
                        subTarget: contextNoteType,
                        target: "misc",
                        text: contextNoteToAdd
                    }
                    contextNotes.push(contextNote)
                }
            }

            // Handle Skill Information in the conversionValidation
            // (1) Create skillContext Objects to add to the Buff
            // (2) Adjust for differences between calculated skillTotals and statblockTotals
            let skillKeys = Object.keys(conversionValidation.skills)

            for (let i = 0; i < skillKeys.length; i++) {
                let skillKey = skillKeys[i]
                let parentSkillKey = skillKey.replace(/(\d+)/, "")
                let skillToValidate = conversionValidation.skills[skillKey]
                let skillModInActor = 0

                let skillSubKeys = Object.keys(actor.system.skills[parentSkillKey])

                // For Skills with subskill --> target: "skill.prf.subSkills.prf1"
                let target = ""

                if (!skillSubKeys.includes("subSkills")) {
                    const skInfo = actor.getSkillInfo(skillKey);
                    skillModInActor = skInfo.mod ?? 0
                    target = "skill." + skillKey
                } else {
                    const subSkillInfo = actor.getSkillInfo(`${parentSkillKey}.subSkills.${skillKey}`);
                    skillModInActor = subSkillInfo.mod ?? 0
                    target = "skill." + parentSkillKey + ".subSkills." + skillKey
                }

                // (1) Create skillContext Objects to add to the Buff
                if (skillToValidate.context !== "") {
                    let contextNote = skillToValidate.context
                    let skillContext = {
                        target: target,
                        text: contextNote
                    }
                    contextNotes.push(skillContext)
                }

                // (2) Adjust for differences between calculated skillTotals and statblockTotals
                if (+skillToValidate.total !== +skillModInActor) {
                    let difference = +skillToValidate.total - +skillModInActor

                    if (difference !== 0) {
                        let skillChange = await new pf1.components.ItemChange({
                            formula: difference.toString(),
                            type: "untypedPerm",
                            target: target,
                            value: +difference,
                        });
                        // let skillChange = {
                        //     formula: difference.toString(),
                        //     type: "untypedPerm",
                        //     operator: "add",
                        //     priority: 0,
                        //     target: target,
                        //     value: +difference,
                        //     id: randomID(8)
                        // }
                        stage2changes.push(skillChange.toObject())
                    }
                }
            }

            let conversionBuffItem2 = {
                name: "sbc | Conversion Buff",
                type: "buff",
                system: {
                    description: {
                        value: `<h2>sbc | Conversion Buff</h2>
                        This Buff was created by <strong>sbc</strong> to compensate for differences between the input and the values FoundryVTT calculates automatically.
                        <br><br>
                        Especially when the pathfinder system gets upgraded, entries in compendiums get updated or foundry changes in some way, this buff may become outdated.
                        <br><br>
                        For most mooks the conversion should more or less work, but for important NPCs or creatures it is adviced to double check the conversion manually.`
                    },
                    active: true,
                    subType: "perm",
                    changes: stage2changes,
                    contextNotes: contextNotes,
                    hideFromToken: true,
                    level: 0,
                    tag: "sbcConversionBuff2",
                    useCustomTag: true,
                },
                img: "systems/pf1/icons/skills/yellow_36.jpg"
            };

            await actor.createEmbeddedDocuments("Item", [conversionBuffItem2]);

            Hooks.callAll("sbc.validated", actor);
        } catch (err) {
            sbcConfig.options.debug && console.error(err);
            let errorMessage = "Failed to validate the conversion and create a conversion buff"
            let error = new sbcError(1, "Validation", errorMessage)
            sbcData.errors.push(error)
            throw err
        }
        sbcConfig.options.debug && console.groupEnd()
    }


    /* ------------------------------------ */
    /* Workers                              */
    /* ------------------------------------ */

    static sbcSplit(input, separateClusters = true) {
        // Split the input string at commas, excluding commas in parenthesis, and return an array of the items

        let items = []

        // Remove Commas in large Numbers, e.g. 3,000 GP --> 3000 GP
        let tempInput = input.replace(/(\d{1})(,)(\d{1})/g, "$1$3").trim()

        // Check if there are commas or semicolons
        if (tempInput.search(/,|;/g) !== -1) {

            // Check if there are parenthesis including commas in the input
            if (tempInput.match(/([^,;]+\([^(]+?(?:,|;)[^(]+?\))+?/gi) !== null) {
                // Get the input with parenthesis and commas inside the parenthesis
                let itemsWithCommasInParenthesis = tempInput.match(/([^,;]+\([^(]+?(?:,|;)[^(]+?\)[^,]*)+?/gi)
                let itemsWithCommasInParenthesisKeys = Object.keys(itemsWithCommasInParenthesis)

                for (let i = 0; i < itemsWithCommasInParenthesisKeys.length; i++) {

                    let tempKey = itemsWithCommasInParenthesisKeys[i]
                    let tempItem = itemsWithCommasInParenthesis[tempKey].trim()

                    if (separateClusters) {
                        const re = /^(?<name>.*?)(?:\s\((?<parens>.*)\)(?<bonus>.*))?$/g.exec(tempItem);
                        const { name, parens, bonus } = re.groups;
                        parens.split(",").forEach((subItem) => {

                            subItem = subItem.trim();

                            subItem = `${name} (${subItem})${bonus}`;

                            items.push(subItem);
                        });
                    }
                    else {
                        items.push(tempItem)
                    }
                    let patternTempItem = new RegExp(tempItem.replace(/\(/g, "\\(").replace(/\*/g, "\\*").replace(/\)/g, "\\)").replace(/\+/g, "\\+"), "i")

                    tempInput = tempInput.replace(patternTempItem, "").replace(/,\s*,/, ",").replace(/^,/, "").trim()

                }

                // Add any items without parenthesis back into the "items"-array
                let itemsWithoutParenthesis = []

                if (tempInput !== "") {
                    itemsWithoutParenthesis = tempInput.replace(/,\s*,/, ",").replace(/[;,]\s*$/, "").split(/[,;]/g)
                }

                if (itemsWithoutParenthesis.length > 0) {
                    //items = items.concat(...itemsWithoutParenthesis)
                    for (let i = 0; i < itemsWithoutParenthesis.length; i++) {
                        itemsWithoutParenthesis[i] = itemsWithoutParenthesis[i].trim();
                    }

                    items = itemsWithoutParenthesis.concat(...items)
                }

            } else {

                // If there are no parenthesis with commas, just split at commas/semi-colons
                items = tempInput.split(/[,;]/g)

            }

        } else {

            // When there is only one item, split at the first closing bracket and put it into the array
            items = tempInput.replace(/\)\s/, ");").split(/;/)

        }

        return items

    }

    //
    static parseSubtext(value) {

        // Remove punctuation at the end of the input
        let input = value.replace(/(^[,;.: ]*|[,;.: ]+$)/g, "")

        let startSubtextIndex = input.indexOf("(")
        let endSubtextIndex = input.indexOf(")")

        if(endSubtextIndex === -1) {
            input += ")";
            endSubtextIndex = input.indexOf(")");
        }

        if (startSubtextIndex > -1 && endSubtextIndex > startSubtextIndex) {
            let baseValue = input.substring(0, startSubtextIndex).trim()
            let subValue = input.substring(startSubtextIndex + 1, endSubtextIndex).trim()
            let restValues = []

            // Check, if there is something left and parse that again
            if (endSubtextIndex + 1 < input.length) {
                let rest = input.substring(endSubtextIndex + 1).replace(/(^[,;.: ]*|[,;.: ]+$)/g, "").trim()
                restValues = this.parseSubtext(rest)
            }

            if (!Array.isArray(restValues) || !restValues.length) {
                return [baseValue, subValue]
            } else {
                return [baseValue, subValue, restValues]
            }

        } else {
            return [value]
        }
    }

    static fixSplitGroup(input) {
        const reversedInput = input.reverse();
        return reversedInput.map((element, index) => {
            if(index > 0 && reversedInput[index - 1].startsWith("+"))
                return `${element} ${reversedInput[index - 1]}`;
            if(!element.startsWith("+"))
                return element;
        }).filter(element => !!element).reverse();
    }

    static getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key].toLowerCase() === value.toLowerCase());
    }

    static getModifier(attribute) {
        return Math.floor(((attribute - 10) / 2));
    }

    static getSumOfChangeModifiers(changePool) {
        let sumOfChanges = 0;
        let changeKeys = Object.keys(changePool)
        for (let i = 0; i < changeKeys.length; i++) {
            sumOfChanges += changePool[changeKeys[i]];
        }
        return sumOfChanges;
    }

    static getEncumbrance(strength) {
        // If(Str <= 10) MaxCarryingCapacity = 10*Str
        // If(Str > 10) MaxCarryingCapacity = 5/4 * 2^Floor(Str/5)* Round[20 * 2^(Mod(Str,5)/5)]

        if (strength <= 10) {
            return strength * 10;
        } else {
            return 5 / 4 * (2 ** Math.floor(strength / 5)) * Math.round(20 * (2 ** ((strength % 5) / 5)));
        }
    }

    static getDiceAverage(diceSize) {
        let sum = 0;
        for (let i = 1; i <= diceSize; i++) {
            sum += i;
        }

        return sum / diceSize;
    }

    static makeValueRollable(string) {

        var output = string.replace(/(\d+d\d+)/g, "[[$1]]");

        return output;
    }

    static capitalize(string) {
        if (!string) return "";
        let words = string.split(/ +/).map((el, idx, arr) => {
            if (idx == 0 || idx == arr.length - 1)
                return el.substring(0, 1).toUpperCase() + el.substring(1);
            if (this.uncapitals.includes(el))
                return el;
            return el.substring(0, 1).toUpperCase() + el.substring(1);
        });
        return words.join(" ");
    }

    static camelize(text) {
        if (!text) {
            return text
        }

        return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (_match, p1, p2, _offset) {
            if (p2) return p2.toUpperCase();
            return p1.toLowerCase();
        });
    }

    static stringContains(string, subString, bCaseSensitive = true) {
        if (bCaseSensitive) {
            return string.includes(subString);
        }
        return string.toLowerCase().includes(subString.toLowerCase());
    }

    static stringStartsWith(string, searchString, bCaseSensitive = true) {
        if (!string) return false;
        if (!searchString) return false;

        try {
            if (searchString.length > string.length) {
                return false;
            }

            if (bCaseSensitive) {
                return string.startsWith(searchString);
            } else {
                let startPart = string.substring(0, searchString.length);
                return startPart.toLowerCase() === searchString.toLowerCase();
            }
        } catch (err) {
            sbcUtils.log(`stringStartsWith('${string}', '${searchString}', ${bCaseSensitive}) threw an error: ${err}`);
            throw err
        }
    }

    static switchValue(obj) {
        const ret = {};
        Object.keys(obj).forEach(key => {
            ret[obj[key]] = key;
        });
        return ret;
    }
}