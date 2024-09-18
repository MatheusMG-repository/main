import { sbcUtils } from "./sbcUtils.js";
import { sbcConfig } from "./sbcConfig.js";

export class sbcSettings {
  // Toggle Debug Mode, which will post log data to the console
  static toggleDebugMode() {
    sbcUtils.log("Toggling debug mode");
    sbcConfig.options.debug = game.settings.get(sbcConfig.modData.mod, "debug");
  }

  // Updates the array of custom compendia, which is used to find items, feats, etc. with a higher priority then the pf1.compendia
  static async updateCustomCompendiums(isInitializing = false) {
    sbcUtils.log("Updating custom compendiums");

    let customCompendiums = game.settings.get(sbcConfig.modData.mod, "customCompendiums");
    let validCompendiums = [];
    let invalidCompendiums = [];

    if (customCompendiums !== "") {
      // Replace semi-colons with commas
      customCompendiums = customCompendiums.replace(/;/g, ",").split(",");

      // Get the names of all available compendiums
      let packKeys = Array.from(game.packs.keys());

      // Loop through the custom compendiums ...
      for (let i = 0; i < customCompendiums.length; i++) {
        let customCompendium = customCompendiums[i].trim();

        // ... and check if its available
        if (!packKeys.includes(customCompendium)) {
          // save invalid compendiums for the error message
          invalidCompendiums.push(customCompendium);
        } else {
          // save valid compendiums to overwrite the settings
          validCompendiums.push(customCompendium);
        }
      }

      if (!isInitializing) {
        // If there are invalid compendiums, let the user know
        if (invalidCompendiums.length > 0) {
          let error =
            "sbc-pf1 | Failed to find the following compendiums (please check for typos):\n" +
            invalidCompendiums.toString() +
            ".";
          ui.notifications.error(error);
          sbcUtils.log(error);
        }

        if (validCompendiums.length > 0) {
          let info = "sbc-pf1 | Added the following compendiums:\n" + validCompendiums.toString() + ".";
          sbcUtils.log(info);
          customCompendiums = validCompendiums;
        }
      }

      await sbcUtils.processCompendiums(validCompendiums);

      // Create an index for each (custom) compendium
      /*
            if (customCompendiums.length > 0) {
                for (let i=0; i<customCompendiums.length; i++) {
                    let customCompendium = customCompendiums[i].trim()
                    let customPack = await game.packs.get(customCompendium)
                    if (!customPack.indexed) await customPack.getIndex();
                }
            }
            */
    } else {
      customCompendiums = validCompendiums;
    }
  }

  // Update the default folder into which statblocks get imported
  static async updateImportFolder() {
    sbcUtils.log("Updating custom import folder");

    // Get the custom folder name from the settings
    let customFolderName = game.settings.get(sbcConfig.modData.mod, "importFolder");

    if (customFolderName !== "") {
      let searchForExistingFolder = null;

      try {
        searchForExistingFolder = await game.folders.find(
          (entry) => entry.data.name === customFolderName && entry.data.type === "Actor"
        );
      } catch (err) {
        let info = "sbc-pf1 | Something went wrong while searching for an existing import folder.";
        ui.notifications.info(info);
        sbcUtils.log(info);
      }

      if (searchForExistingFolder === null) {
        // No existing folder found
        let newFolder = await Folder.create({ name: customFolderName, type: "Actor", color: "#e76f51", parent: null });

        let info = "Created a custom folder for imported statblocks.";
        ui.notifications.info(info);
        sbcUtils.log(info);
        return newFolder.id;
      } else {
        // Existing folder found
        return searchForExistingFolder.id;
      }
    } else {
      // No custom import folder defined
    }
  }

  // Updates the default actor type
  static updateDefaultActorType() {
    sbcConfig.options.defaultActorType = game.settings.get(sbcConfig.modData.mod, "defaultActorType");
  }

  // Updates the input delay before updating the preview
  static updateInputDelay() {
    sbcConfig.options.inputDelay = game.settings.get(sbcConfig.modData.mod, "inputDelay");
  }

  // called by the module settings to set the prototype token defaults
  static updatePrototypeTokenSettings(tokenSetting, attributeKeys = []) {
    switch (tokenSetting) {
      case "disposition": {
        sbcConfig.options.tokenSettings.disposition = +game.settings.get(sbcConfig.modData.mod, "disposition");
        break;
      }
      case "pcsight": {
        sbcConfig.options.tokenSettings.pcsight.enabled = game.settings.get(sbcConfig.modData.mod, "pcsight");
        break;
      }
      case "npcsight": {
        sbcConfig.options.tokenSettings.npcsight.enabled = game.settings.get(sbcConfig.modData.mod, "npcsight");
        break;
      }
      case "displayName": {
        sbcConfig.options.tokenSettings.displayName = +game.settings.get(sbcConfig.modData.mod, "displayName");
        break;
      }
      case "displayBars": {
        sbcConfig.options.tokenSettings.displayBars = +game.settings.get(sbcConfig.modData.mod, "displayBars");
        break;
      }
      case "attributeBar1": {
        let attributeBar1Key = +game.settings.get(sbcConfig.modData.mod, "bar1");
        if (attributeBar1Key !== 0) {
          let attributeBar1 = attributeKeys[attributeBar1Key];
          sbcConfig.options.tokenSettings.bar1.attribute = attributeBar1;
        } else {
          sbcConfig.options.tokenSettings.bar1 = {};
        }
        break;
      }
      case "attributeBar2": {
        let attributeBar2Key = +game.settings.get(sbcConfig.modData.mod, "bar2");
        if (attributeBar2Key !== 0) {
          let attributeBar2 = attributeKeys[attributeBar2Key];
          sbcConfig.options.tokenSettings.bar2.attribute = attributeBar2;
        } else {
          sbcConfig.options.tokenSettings.bar2 = {};
        }
        break;
      }
      default: {
        let error = "sbc-pf1 | Default Token Settings: Could not set " + tokenSetting;
        sbcUtils.log(error);
        break;
      }
    }
  }

  // Updates the creation of the Conversion Buff
  static updateConversionBuffCreation() {
    sbcConfig.options.createBuff = game.settings.get(sbcConfig.modData.mod, "createBuff");
  }

  // Updates the creation of known weapon attacks
  static updateKnownAttackCreation() {
    sbcConfig.options.createAttacks = game.settings.get(sbcConfig.modData.mod, "createAttacks");
  }

  // Updates the integration of David's "Roll Bonuses PF1" module
  static updateRollBonusesIntegration() {
    sbcConfig.options.rollBonusesIntegration = game.settings.get(sbcConfig.modData.mod, "rollBonusesIntegration");
  }
}

export const registerSettings = function () {
  // setup array for tokenBar attributes
  let attributeKeys = sbcConfig.const.tokenBarAttributes;

  game.settings.register(sbcConfig.modData.mod, "debug", {
    name: "Enable Debug Mode",
    hint: "Enable the Debug Mode to get additional information in the console of your browser (F12). Default: False",
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: () => sbcSettings.toggleDebugMode(),
  });

  game.settings.register(sbcConfig.modData.mod, "defaultActorType", {
    name: "Default Actor Type",
    hint: "Set the default actor type used by sbc. Default: NPC",
    default: 0,
    scope: "world",
    type: String,
    choices: { 0: "NPC", 1: "PC" },
    config: true,
    onChange: () => sbcSettings.updateDefaultActorType(),
  });

  game.settings.register(sbcConfig.modData.mod, "inputDelay", {
    name: "Input Delay",
    hint: "Set the delay in ms before changes in the input field trigger an update of the preview. Default: 750",
    default: 750,
    scope: "world",
    type: Number,
    range: { min: 250, max: 2000, step: 10 },
    config: true,
    onChange: () => sbcSettings.updateInputDelay(),
  });

  game.settings.register(sbcConfig.modData.mod, "importFolder", {
    name: "Import Folder",
    hint: "You can save imported actors to a separate folder in the actor directory. If no folder with this name is available, a new one will be created. Default: 'sbc | Imported Statblocks'.",
    default: "sbc | Imported Statblocks",
    scope: "world",
    type: String,
    config: true,
    onChange: () => sbcSettings.updateImportFolder(),
  });

  game.settings.register(sbcConfig.modData.mod, "customCompendiums", {
    name: "Custom Compendiums",
    hint: `
            Select custom compendiums to be included in the conversion process, separated by comma or semicolon. Default: NONE
            You can check available compendiums by entering 'game.packs' into the console (F12)
            The following system-specific compendiums are hardcoded: pf1.races, pf1.racialhd, pf1.classes, pf1.feats, pf1.weapons-and-ammo, pf1.armors-and-shields, pf1.items, pf1.class-abilities, pf1.spells`,
    default: "",
    scope: "world",
    type: String,
    config: true,
    onChange: () => sbcSettings.updateCustomCompendiums(),
  });

  game.settings.register(sbcConfig.modData.mod, "createBuff", {
    name: "Create Conversion Buff",
    hint: "Decide whether a conversion buff is created to correct the actor's numbers to match the statblock's. Default: True",
    default: true,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: () => sbcSettings.updateConversionBuffCreation(),
  });

  game.settings.register(sbcConfig.modData.mod, "createAttacks", {
    name: "Create attacks for known weapons",
    hint: "Decide whether to create attacks in the combat tab if they'd be identical to the inventory weapon. Default: False",
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: () => sbcSettings.updateKnownAttackCreation(),
  });

  game.settings.register(sbcConfig.modData.mod, "rollBonusesIntegration", {
    name: "Roll Bonuses Integration",
    hint: "Decide whether to integrate the Roll Bonuses PF1 module. (Currently, this determines whether SBC handles Weapon Focus, Weapon Specialization, and Weapon Training, or leaves them absent for Roll Bonuses setup.) Default: False",
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: () => sbcSettings.updateRollBonusesIntegration(),
  });

  game.settings.register(sbcConfig.modData.mod, "pcsight", {
    name: "PC Sight",
    hint: "Define if PC tokens have Sight activated. Default: True",
    default: true,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: () => sbcSettings.updatePrototypeTokenSettings("pcsight"),
  });

  game.settings.register(sbcConfig.modData.mod, "npcsight", {
    name: "NPC Sight",
    hint: "Define if NPC tokens have Sight activated. Default: True",
    default: true,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: () => sbcSettings.updatePrototypeTokenSettings("npcsight"),
  });

  game.settings.register(sbcConfig.modData.mod, "disposition", {
    name: "Disposition",
    hint: "Define the disposition of created tokens (which results in differently colored token borders). Default: Hostile",
    default: -1,
    scope: "world",
    type: String,
    choices: { "-1": "Hostile", 0: "Neutral", 1: "Friendly" },
    config: true,
    onChange: () => sbcSettings.updatePrototypeTokenSettings("disposition"),
  });

  game.settings.register(sbcConfig.modData.mod, "displayName", {
    name: "Name Visibility",
    hint: "Define the visibility of the token name. Default: Owner Hover",
    default: 20,
    scope: "world",
    type: String,
    choices: { 0: "None", 10: "Control", 20: "Owner Hover", 30: "Hover", 40: "Owner", 50: "Always" },
    config: true,
    onChange: () => sbcSettings.updatePrototypeTokenSettings("displayName"),
  });

  game.settings.register(sbcConfig.modData.mod, "displayBars", {
    name: "Bar Visibility",
    hint: "Define the visibility of the token bars. Default: Owner Hover",
    default: 20,
    scope: "world",
    type: String,
    choices: { 0: "None", 10: "Control", 20: "Owner Hover", 30: "Hover", 40: "Owner", 50: "Always" },
    config: true,
    onChange: () => sbcSettings.updatePrototypeTokenSettings("displayBars"),
  });

  game.settings.register(sbcConfig.modData.mod, "bar1", {
    name: "Attribute Bar 1",
    hint: "Define the attribute of the first bar. Default: hp",
    default: "24",
    scope: "world",
    type: String,
    choices: attributeKeys,
    config: true,
    onChange: () => sbcSettings.updatePrototypeTokenSettings("attributeBar1", attributeKeys),
  });

  game.settings.register(sbcConfig.modData.mod, "bar2", {
    name: "Attribute Bar 2",
    hint: "Define the attribute of the second bar. Default: NONE",
    default: "0",
    scope: "world",
    type: String,
    choices: attributeKeys,
    config: true,
    onChange: () => sbcSettings.updatePrototypeTokenSettings("attributeBar2", attributeKeys),
  });
};

export const initializeSettings = async function () {
  // setup array for tokenBar attributes
  //let attributeKeys = Object.keys(game.system.model.Actor.npc.attributes)

  let attributeKeys = sbcConfig.const.tokenBarAttributes;

  sbcConfig.options.actorReady = false;
  sbcConfig.options.debug = game.settings.get(sbcConfig.modData.mod, "debug");
  sbcConfig.options.defaultActorType = game.settings.get(sbcConfig.modData.mod, "defaultActorType");
  sbcConfig.options.inputDelay = game.settings.get(sbcConfig.modData.mod, "inputDelay");
  sbcConfig.options.tokenSettings.disposition = +game.settings.get(sbcConfig.modData.mod, "disposition");
  sbcConfig.options.tokenSettings.pcsight.enabled = game.settings.get(sbcConfig.modData.mod, "pcsight");
  sbcConfig.options.tokenSettings.npcsight.enabled = game.settings.get(sbcConfig.modData.mod, "npcsight");
  sbcConfig.options.tokenSettings.displayName = +game.settings.get(sbcConfig.modData.mod, "displayName");
  sbcConfig.options.tokenSettings.displayBars = +game.settings.get(sbcConfig.modData.mod, "displayBars");
  sbcConfig.options.customFolder = game.settings.get(sbcConfig.modData.mod, "importFolder");
  sbcConfig.options.createBuff = game.settings.get(sbcConfig.modData.mod, "createBuff");
  sbcConfig.options.createAttacks = game.settings.get(sbcConfig.modData.mod, "createAttacks");

  sbcSettings.updatePrototypeTokenSettings("attributeBar1", attributeKeys);
  sbcSettings.updatePrototypeTokenSettings("attributeBar2", attributeKeys);
  sbcSettings.updateCustomCompendiums(true);

  sbcUtils.log("Initialized Settings:");
  sbcConfig.options.debug && console.log(sbcConfig.options);
};
