export class sbcData {
  /**
   * @typedef CharacterData
   * @prop {Actor} [actorData]
   * @prop {Array} [items]
   * @prop {Array} [spells]
   * @prop {Array} [abilityDescriptions]
   * @prop {Array} [characterDescriptions]
   * @prop {{context: any, attributes: any, skills: any, spellBooks: any}} [conversionValidation]
   * @prop {Array} [weaponFocus]
   * @prop {Array} [weaponSpecialization]
   * @prop {Array} [weaponFocusGreater]
   * @prop {Array} [weaponSpecializationGreater]
   * @prop {any} [weaponGroups]
   */

  /** @type {Array.<{keyword: string, level: number, line: number, message: string}>} */
  static errors = [];
  static foundCategories = 0;
  static parsedCategories = 1;
  static actorType = 0;
  static input = "";
  /** @type {{data: Array.<String>, success: Boolean}} */
  static preparedInput = {};
  /** @type {{success: Boolean}} */
  static parsedInput = {};
  /** @type {CharacterData} */
  static characterData = {};
  /** @type {{base: {cr: string, xp: string, alignment: string, size: string}}} */
  static notes = {};
  static customFolderId = "";
  static customWIPFolderId = "";
  static treasureParsing = {
    treasureToParse: "",
    lineToRemove: 0,
    statisticsStartLine: 0,
  };
  static imported = false;
  static changes = {};
}

export class sbcError {
    constructor(level = 0, keyword = "Default Error Keyword", message = "Default Error Message", line = -1) {
        this.level = level
        this.keyword = keyword
        this.message = message
        this.line = line
    }
}

export const sbcErrorLevels = {
    0: "FATAL",
    1: "ERROR",
    2: "WARNING",
    3: "INFO"
}
