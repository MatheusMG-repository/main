import { SimpleParser } from "./Universal/simple-parser.js";
import { EntityParser } from "./Universal/entity-parser.js";
import { NotesParser } from "./Universal/notes-parser.js";

import { AuraParser } from "./BaseData/aura-parser.js";
import { ClassParser } from "./BaseData/class-parser.js";
import { CreatureParser } from "./BaseData/creature-parser.js";
import { RaceParser } from "./BaseData/race-parser.js";
import { SensesParser } from "./BaseData/senses-parser.js";

import { WeaknessParser } from "./Defense/weakness-parser.js";
import { SRParser } from "./Defense/sr-parser.js";
import { SavesParser } from "./Defense/saves-parser.js";
import { ResistanceParser } from "./Defense/resistance-parser.js";
import { ImmunityParser } from "./Defense/immunity-parser.js";
import { HPParser } from "./Defense/hp-parser.js";
import { DRParser } from "./Defense/dr-parser.js";
import { ACParser } from "./Defense/ac-parser.js";

import { TacticsParser } from "./Misc/tactics-parser.js";
import { SpecialAbilityParser } from "./Misc/special-ability-parser.js";
import { EcologyParser } from "./Misc/ecology-parser.js";

import { AttackParser } from "./Offense/attack-parser.js";
import { SpeedParser } from "./Offense/speed-parser.js";
import { SpellBooksParser } from "./Offense/spellbook-parser.js";

import { AbilityParser } from "./Statistics/ability-parser.js";
import { GearParser } from "./Statistics/gear-parser.js";
import { LanguageParser } from "./Statistics/language-parser.js";
import { SkillParser } from "./Statistics/skill-parser.js";

export class parserMapping {
  /**
   * @typedef parserMap
   * @prop {Object} base
   * @prop {SimpleParser} base.name
   * @prop {SimpleParser} base.cr
   * @prop {NotesParser} base.mr
   * @prop {NotesParser} base.level
   * @prop {NotesParser} base.xp
   * @prop {SimpleParser} base.gender
   * @prop {RaceParser} base.race
   * @prop {ClassParser} base.classes
   * @prop {NotesParser} base.source
   * @prop {SimpleParser} base.alignment
   * @prop {SimpleParser} base.size
   * @prop {SimpleParser} base.space
   * @prop {SimpleParser} base.scale
   * @prop {CreatureParser} base.creatureType
   * @prop {SimpleParser} base.init
   * @prop {SensesParser} base.senses
   * @prop {AuraParser} base.aura
  */


    /** @type {parserMap} */
    static map = {};

    /* ------------------------------------ */
    /* Initialize Parser Mapping            */
    /* ------------------------------------ */
    static initMapping = function() {
        if(Object.keys(parserMapping.map).length) { return }

        parserMapping.map = {
            base: {
                name: new SimpleParser(["name", "prototypeToken.name"], "string"),
                cr: new SimpleParser(["system.details.cr.base", "system.details.cr.total"], "number"),
                mr: new NotesParser(["base.mr"]),                                                 // currently not supported by the game system
                level: new NotesParser(["system.details.level.value"]),                             // gets calculated by foundry
                xp: new NotesParser(["system.details.xp.value"]),                                   // gets calculated by foundry
                gender: new SimpleParser(["system.details.gender"], "string"),
                age: new SimpleParser(["system.details.age"], "string"),
                race: new RaceParser(),
                classes: new ClassParser(),
                source: new NotesParser(["base.source"]),                                         // used in the notes section
                alignment: new SimpleParser(["system.details.alignment"], "string"),
                size: new SimpleParser(["system.traits.size"], "string"),
                space: new SimpleParser(["prototypeToken.height", "prototypeToken.width"], "number"),
                scale: new SimpleParser(["prototypeToken.texture.scaleX", "prototypeToken.texture.scaleY"], "number"),
                creatureType: new CreatureParser(),
                init: new SimpleParser(["system.attributes.init.total"], "number"),
                senses: new SensesParser(),
                aura: new AuraParser()
            },
            defense: {
                acNormal: new SimpleParser(["system.attributes.ac.normal.total"], "number"),
                acFlatFooted: new SimpleParser(["system.attributes.ac.flatFooted.total"], "number"),
                acTouch: new SimpleParser(["system.attributes.ac.touch.total"], "number"),
                //"acContext": new SimpleParser(["system.attributes.acNotes"], "string"),
                acTypes: new ACParser(),

                hp: new HPParser(),
                regeneration: new SimpleParser(["system.traits.regen"], "string"),
                fastHealing: new SimpleParser(["system.traits.fastHealing"], "string"),
                saves: new SavesParser(),
                immune: new ImmunityParser(),
                resist: new ResistanceParser(),
                weakness: new WeaknessParser(),
                defensiveAbilities: new EntityParser(),
                dr: new DRParser(),
                sr: new SRParser(),
            },
            offense: {
                speed: new SpeedParser(),
                attacks: new AttackParser(),
                specialAttacks: new EntityParser(),
                // specialAttacks: new SpecialAttackParser(),
                spellBooks: new SpellBooksParser()

            },
            tactics: new TacticsParser(),
            statistics: {
                str: new AbilityParser(["system.abilities.str.value"], ["system.abilities.str.mod"], "number"),
                dex: new AbilityParser(["system.abilities.dex.value"], ["system.abilities.dex.mod"], "number"),
                con: new AbilityParser(["system.abilities.con.value"], ["system.abilities.con.mod"], "number"),
                int: new AbilityParser(["system.abilities.int.value"], ["system.abilities.int.mod"], "number"),
                wis: new AbilityParser(["system.abilities.wis.value"], ["system.abilities.wis.mod"], "number"),
                cha: new AbilityParser(["system.abilities.cha.value"], ["system.abilities.cha.mod"], "number"),
                bab: new SimpleParser(["system.attributes.bab.total"], "number"),
                cmb: new SimpleParser(["system.attributes.cmb.total"], "number"),
                cmd: new SimpleParser(["system.attributes.cmd.total"], "number"),
                feats: new EntityParser(),
                skills: new SkillParser(),
                languages: new LanguageParser(),
                // sq: new SpecialQualityParser(),
                sq: new EntityParser(),
                gear: new GearParser(),

            },
            ecology: new EcologyParser(),
            "special abilities": new SpecialAbilityParser(),
            description: new NotesParser(["description.long"], "string")
        }
    }
 }
