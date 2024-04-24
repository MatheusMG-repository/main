import { sbcContent } from "./sbcContent.js"

export const sbcConfig = {};

/* ------------------------------------ */
/* sbc configuration               		*/
/* ------------------------------------ */

sbcConfig.modData = {
    "version": "4.5.3",
    "mod": "pf1-statblock-converter",
    "modName": "sbc | PF1 Statblock Converter"
}

sbcConfig.const = {
    "lineheight": 20,
    "crFractions": { "1/8" : 0.125, "1/6" : 0.1625, "1/4": 0.25, "1/3": 0.3375, "1/2": 0.5 },
    "actorType": { 0 : "npc", 1 : "character" },
    "actorSizes": {
        "col": "Colossal",
        "dim": "Diminutive",
        "fine": "Fine",
        "grg": "Gargantuan",
        "huge": "Huge",
        "lg": "Large",
        "med": "Medium",
        "sm": "Small",
        "tiny": "Tiny"
    },
    "creatureTypes": {
        "aberratio": "Aberration",
        "animal": "Animal",
        "construct": "Construct",
        "dragon": "Dragon",
        "fey": "Fey",
        "humanoid": "Humanoid",
        "magicalBeast": "Magical Beast",
        "monstrousHumanoid": "Monstrous Humanoid",
        "ooze": "Ooze",
        "outsider": "Outsider",
        "plant": "Plant",
        "undead": "Undead",
        "vermin": "Vermin"
    },
    "tokenBarAttributes": [
        "NONE",
        "attributes.hp",
        "spells.spellbooks.primary.spellPoints",
        "spells.spellbooks.secondary.spellPoints",
        "spells.spellbooks.tertiary.spellPoints",
        "spells.spellbooks.spelllike.spellPoints",
        "details.xp",
        "attributes.ac.normal.total",
        "attributes.ac.flatFooted.total",
        "attributes.ac.touch.total",
        "attributes.cmd.total",
        "attributes.speed.land.total",
        "attributes.speed.land.fly.total",
        "attributes.speed.land.swim.total",
        "attributes.speed.land.climb.total",
        "attributes.speed.land.burrow.total",
        "attributes.sr.total"
    ],
    "suffixMultiples": [
        "st",
        "nd",
        "rd",
        "th"
    ]
}

sbcConfig.options = {
    "actorReady": false,
    "debug": false,
    "inputDelay": 1500,
    "defaultActorType": 0,
    "createBuff": true,
    "createAttacks": false,
    "tokenSettings": {
        "displayName": 20,
        "pcsight": {
            "enabled": false
        },
        "npcsight": {
            "enabled": false
        },
        "disposition": -1,
        "displayBars": 20,
        "bar1": {},
        "bar2": {}
    },
    "flags": {
        "noStr": false,
        "noDex": false,
        "noCon": false,
        "noInt": false,
        "noWis": false,
        "noCha": false,
        "isUndead": false,
        "isConstruct": false,
        "hasWeaponFinesse": false

    }
}

sbcConfig.sources = ["APG","ACG","U[CEM]","HA","OA","ISWG","TG","CRB","GMG","BotD[123]","(!STATISTICS)CS","CoG","CoS","CHR","CTR","DEG",
                    "DuoG","FG","GaM","GttRK","HotJ","ISM","LotLK","LCoG","MMR","NPCG","RG","RoF","SoS","UR","AA","ASoL","CEoD",
                    "DoG","EoG","FoB","FoC","FoP","GnoG","GoG","HoG","HuoG","ISP","OoG","OLoP","QGttE","StLC","SD","TEoG","AP:?CC",
                    "AP:?CoT","AP:?CotCT","AP:?JR","AP:?K","AP:?LoF","AP:?RotR","AP:?SD","AP:?SS","M:?AoS","M:?CH","M:?CoGD","M:?CotE",
                    "M:?CotED","M:?CotRS","M:?FoR","M:?FStS","M:?GH","M:?GoD","M:?H","M:?MotLG","M:?MotFF","M:?MM","M:?RotFQ","M:?RPT",
                    "M:?TotIM","M:?WBG","M:?WL"];

sbcConfig.lineCategories = ["Defense", "Offense", "Statistics", "Special Abilities", "Description", "Tactics", "Ecology", "^Spells", "^(.*) Spells", "^Spell-Like", "^(.*) Spell-Like"];
sbcConfig.lineStarts = ["CR", "XP", "LG", "LN", "LE", "NG", "N", "NE", "CG", "CN", "CE", "Init", "Aura", "Senses", "Defense", "AC", "HP", "Fort", "Immune", "Immunities", "Weaknesses", "DR", "Offense", "Speed", "Spd", "Melee", "Ranged", "Space", "Special", "^Spell-Like", "^(.*) Spell-Like", "^Spells", "^(.*) Spells", "At-will", "At will", "9th", "8th", "7th", "6th", "5th", "4th", "3rd", "2nd", "1st", "Cantrips", "Orisons", "0", "Statistics", "Str", "Base", "Feats", "Skills", "Languages", "Ecology", "Environment", "Organization", "Treasure", "SQ", "Gear", "Combat Gear", "Male", "Female", "Tactics", "Before Combat", "During Combat", "Morale", "Opposition School", "Prohibited School", "Defensive Abilities", "Immune", "SR", "Weaknesses", "Description", "\\d+\\/day", ".*\\((SU|EX|SP|\\-\\-)\\)"];

sbcConfig.techColors = ["Black", "Blue", "Brown", "Gray", "Green", "Orange", "Prismatic", "Red", "White"];
sbcConfig.techTiers = ["Mark I", "Mark II", "Mark III", "Mark IV", "Mark V", "Grade I", "Grade II", "Grade III", "Grade IV", "Grade V"];

sbcConfig.magicalAbilities = ["Shrinking","Agile","Allying","Answering","Bane","([A-Za-z]*) Bane", "Bane \([A-Za-z]*\)","Benevolent",
                              "Bewildering","Blood-Hunting","Bloodsong","Brawling","Breaking","Called","Catalytic","Compassionate",
                              "Conductive","Confounding","Corrosive","Countering","Courageous","Cruel","Cunning","Dazzling Radiance",
                              "Deadly","Debilitating","Deceptive","Defending","Disjoining","Dispelling","Distracting","Drowscourge","Dueling",
                              "Fate-Stealing","Fervent","Flamboyant","Flaming","Fortuitous","Frost","Furious","Ghost Touch","Grayflame","Grounding",
                              "Growing","Guardian","Guided","Heartseeker","Huntsman","Injecting","Inspired","Jurist","Keen","Ki Focus","Kinslayer",
                              "Leveraging","Limning","Menacing","Merciful","Mighty Cleaving","Mimetic","Miserable","Mythic Bane","Neutralizing",
                              "Ominous","Patriotic","Pitfall","Planar","Quenching","Rusting","Sacred","Sapping","Seaborne","Shock","Skewering",
                              "Slithering","Smashing","Spell Storing","Spirit-Hunting","Sticky","Summon Bane","Thawing","(?!Throwing Axe)Throwing","Thundering",
                              "Training","Unaligned","Underwater","Valiant","Vampiric","Vicious","Virulent","Prehensile","Concealed, Lesser",
                              "Lesser Concealed","Impervious","Exclusionary","Glamered","Resizing","Sacrosanct","Sneaky","Liberating","Concealed",
                              "Advancing","Anarchic","Anchoring","Axiomatic","Burning","Corrosive Burst","Culling","Defiant","Dispelling Burst",
                              "Disruption","Distracting, Greater","Greater Distracting","Flaming Burst","Furyborn","Fury-Born","Glorious",
                              "Harvesting","Heretical","Holy","Icy Burst","Igniting","Impact","Invigorating","Ki Intensifying","Legbreaker",
                              "Liberating","Lifesurge","Negating","Obliviating","Peaceful","Phase Locking","Planestriking","Potent","Quaking",
                              "Runeforged","Sharding","Shattering","Shocking Burst","Silencing","Stalking","Toxic","Treasonous","Truthful",
                              "Unholy","Unseen","Vampiric, Greater","Greater Vampiric","Wounding","Transformative","Dueling","Transformative, Greater",
                              "Greater Transformative","Exhausting","Flamboyant, Greater","Greater Flamboyant","Gory","Nullifying","Redeemed",
                              "Repositioning","Speed","Spellstealing","Umbral","Brilliant Energy","Dancing","Flying","Spell Siphon","Vorpal",
                              "Adaptive","Dry Load","Sniping","Allying","Ambushing","Beaming","Bewildering","Blood-Hunting","Breaking",
                              "Called","Catalytic","Clustershot","Compassionate","Conductive","Conserving","Corrosive","Cruel","Cunning","Deceptive",
                              "Distance","Driving","Drowscourge","Fervent","Flaming","Frost","Ghost Touch","Healer's Sorrow","Huntsman","Inspired",
                              "Jurist","Kinslayer","Limning","Lucky","Merciful","Miserable","Mythic Bane","Patriotic","Planar","Plummeting","Reliable",
                              "Returning","Rusting","Sacred","Sapping","Seeking","Shadowshooting","Shock","Sparkfly Crystal Arrow","Spell Hurling",
                              "Spirit-Hunting","Summon Bane","Thundering","Training","Unaligned","Veering","Virulent","Phantom Ammunition",
                              "Impervious","Exclusionary","Glamered","Resizing","Sacrosanct","Liberating","Sniping (improved)","Improved Sniping",
                              "Anarchic","Anchoring","Axiomatic","Burning","Corrosive Burst","Cyclonic","Dazzling","Designating (lesser)",
                              "Lesser Designating","Endless Ammunition","Flaming Burst","Glitterwake","Heretical","Holy","Icy Burst","Igniting",
                              "Peaceful","Penetrating","Phase Locking","Planestriking","Potent","Runeforged","Sharding","Shattering","Shocking Burst",
                              "Silencing","Sniping","Stalking","Toxic","Treasonous","Unholy","Sniping (greater)","Greater Sniping","Gory","Lucky, Greater",
                              "Greater Lucky","Redeemed","Reliable (greater)","Greater Reliable","Sonic Boom","Speed","Tailwind","Brilliant Energy",
                              "Designating (greater)","Greater Designating","Nimble Shot","Second Chance","Heart-Piercing","Interfering"];

sbcConfig.weaponGroups = {};

sbcConfig.initializeConfig = async function () {

    // Create an index for each pf1 system compendium
    // Get the names of all available compendiums

    /*
    let packKeys = Array.from(game.packs.keys())
    for (let i=0; i<packKeys.length; i++) {

        let packKey = packKeys[i]

        if (packKey.includes("pf1")) {

            let systemPack = await game.packs.get(packKeys[i])
            if (!systemPack.indexed) await systemPack.getIndex()

        }
    }
    */

    let raceIndex = await game.packs.get("pf1.races").index
    for (let entry of raceIndex) { if (entry.name !== "") { sbcConfig.races.push(entry.name) } }

    let featsIndex = await game.packs.get("pf1.feats").index
    for (let entry of featsIndex) { if (entry.name !== "") { sbcConfig.feats.push(entry.name) } }

    let weaponIndex = await game.packs.get("pf1.weapons-and-ammo").index

    for (let entry of weaponIndex) { if (entry.name !== "") {
        let item = await fromUuid(entry.uuid);
        for (let group of item.system.weaponGroups?.value ?? []) {
            let groupName = pf1.config.weaponGroups[group].toLowerCase();
            let groupNameFixed = groupName.replace(/(.*), (.*)/, "$2 $1");
            if (!Object.values(sbcConfig.weaponGroups).includes(groupNameFixed)) sbcConfig.weaponGroups[group] = groupNameFixed;
        }
        sbcConfig.weapons.push(entry.name)
    } }

    let armorsIndex = await game.packs.get("pf1.armors-and-shields").index
    for (let entry of armorsIndex) { if (entry.name !== "") { sbcConfig.armors.push(entry.name) } }

    // Escaping "+", as some items include that in the name (e.g. "Headband of Alluring Charisma +2")
    let itemIndex = await game.packs.get("pf1.items").index
    for (let entry of itemIndex) { if (entry.name !== "") { sbcConfig.items.push(entry.name.replace(/(\+)/g, "\\+")) } }

    let classAbilitiesIndex = await game.packs.get("pf1.class-abilities").index
    for (let entry of classAbilitiesIndex) { if (entry.name !== "") { sbcConfig["class-abilities"].push(entry.name) } }

    let monsterAbilitiesIndex = await game.packs.get("pf1.monster-abilities").index;
    for (let entry of monsterAbilitiesIndex) { if (entry.name !== "") { sbcConfig["monster-abilities"].push(entry.name) }}

    // If there are customCompendiums, given as a string in the module settings,
    // split them and add them to the searchableCompendiums
    let searchableCompendiums = ["pf1.classes"];
    let customCompendiumSettings = game.settings.get(sbcConfig.modData.mod, "customCompendiums")

    // Gather and add all the custom compendiums
    if (customCompendiumSettings !== "") {
        customCompendiumSettings = customCompendiumSettings.replace(/\s/g, "");
        searchableCompendiums = searchableCompendiums.concat(customCompendiumSettings.split(/[,;]/g));
    }

    // Search through all the compendiums to process the class items
    searchableCompendiums.map(async compendium => {
        for (let entry of game.packs.get(compendium)?.index ?? []) {
            if (entry.type === "class" && entry.name !== "") {

                // Grab the entry data
                if(!entry.system) {
                    entry = await fromUuid(entry.uuid)
                }
                
                if(entry.system.subType !== "prestige") sbcConfig.classes.push(entry.name)
                else sbcConfig.prestigeClassNames.push(entry.name)
            }
        }
    });
    // let classIndex = await game.packs.get("pf1.classes").index
    // for (let entry of classIndex) { if (entry.name !== "") { sbcConfig.classes.push(entry.name.replace(/[()]*/g,"")) } }

    // let prestigeClassIndex = Object.keys(sbcContent.prestigeClasses)
    // for (let entry of prestigeClassIndex) { if (entry.name !== "") { sbcConfig.prestigeClassNames.push(entry) } }

    // Grab the natural attacks introduced in the system.
    let naturalAttacksIndex = await game.packs.get("pf1.monster-abilities").index
    for (let entry of naturalAttacksIndex) {
        if (entry.name !== "") {
            sbcConfig.naturalAttacks.push(entry.name)
        }
    }
}


/* ------------------------------------ */
/* Compendium-Related              		*/
/* ------------------------------------ */

sbcConfig.races = []
sbcConfig.classes = []
sbcConfig.mythicClasses = []
sbcConfig.racialClasses = []
sbcConfig.prestigeClassNames = []
sbcConfig.feats = []
sbcConfig.weapons = []
sbcConfig.armors = []
sbcConfig.items = []
sbcConfig.skills = []
sbcConfig["class-abilities"] = []
sbcConfig["monster-abilities"] = []
sbcConfig.naturalAttacks = []

sbcConfig.compendiumsToBeIndexed = [
    "pf1.classes",
    "pf1.mythicpaths",
    "pf1.commonbuffs",
    "pf1.spells",
    "pf1.feats",
    "pf1.items",
    "pf1.armors-and-shields",
    "pf1.weapons-and-ammo",
    "pf1.racialhd",
    "pf1.races",
    "pf1.class-abilities",
    "pf1.monster-templates",
    "pf1.monster-abilities",
    "pf1.conditions",
    "pf1.skills",

]

/* ------------------------------------ */
/* Weapons, Attacks and Armor     		*/
/* ------------------------------------ */

sbcConfig.weaponAttacks = {
    "Claw": {"type": "B and S", "special": "-"},
    "Talon": {"type": "S", "special": "-"},
    "Sting": {"type": "P", "special": "-"},
    "Slam": {"type": "B", "special": "-"},
    "Tail": {"type": "B", "special": "-"},
    "Pincer": {"type": "B", "special": "-"},
    "Wing": {"type": "B", "special": "-"},
    "Tentacle": {"type": "B", "special": "-"},
    "Hoof": {"type": "B", "special": "-"},
    "Gore": {"type": "P", "special": "-"},
    "Bite": {"type": "B, P and S", "special": "-"},
    "Aklys": {"type": "B", "special": "performance, trip" },
    "Ammentum": { "type": "P", "special": "performance" },
    "Ankus": { "type": "P", "special": "disarm, trip" },
    "Boarding Axe": { "type": "P or S", "special": "-" },
    "Butchering Axe": { "type": "S", "special": "see text" },
    "Hooked Axe": { "type": "S", "special": "disarm, performance, trip" },
    "Knuckle Axe": { "type": "S", "special": "monk, performance" },
    "Orc Double Axe": { "type": "S", "special": "double" },
    "Throwing Axe": { "type": "S", "special": "-" },
    "Dwarven Heavy Axe-Gauntlet": { "type": "S", "special": "blocking, disarm" },
    "Dwarven Light Axe-Gauntlet": { "type": "S", "special": "blocking, disarm" },
    "Barbazu beard": { "type": "S", "special": "see text" },
    "Bardiche": { "type": "S", "special": "brace, reach, see text" },
    "Battle aspergillum": { "type": "B", "special": "see text" },
    "Gnome Battle Ladder": { "type": "B", "special": "trip" },
    "Battle poi": { "type": "fire", "special": "-" },
    "Battleaxe": { "type": "S", "special": "-" },
    "Bayonet": { "type": "P", "special": "-" },
    "Bec de corbin": { "type": "B or P", "special": "brace, reach, see text" },
    "Bill": { "type": "S", "special": "brace, disarm, reach, see text" },
    "Blade boot": { "type": "P", "special": "see text" },
    "Blowgun": { "type": "P", "special": "-" },
    "Boarding gaff": { "type": "S", "special": "double, reach, trip" },
    "Boarding pike": { "type": "P", "special": "brace, reach" },
    "Bola": { "type": "B", "special": "nonlethal, trip" },
    "Brutal Bola": { "type": "B and P", "special": "trip" },
    "Boomerang": { "type": "B", "special": "-" },
    "Thorn Bow": { "type": "P", "special": "-" },
    "Brass knife": { "type": "P or S", "special": "fragile" },
    "Brass knuckles": { "type": "B", "special": "monk" },
    "Broken-back seax": { "type": "P & S", "special": "see text" },
    "Cat-o’-nine-tails": { "type": "S", "special": "disarm, nonlethal" },
    "Cestus": { "type": "B or P", "special": "monk" },
    "Spiked Chain": { "type": "P", "special": "disarm, trip" },
    "Chain-hammer": { "type": "B", "special": "double, see text" },
    "Chakram": { "type": "S", "special": "-" },
    "Claw blades": { "type": "B or S", "special": "see text" },
    "Club": { "type": "B", "special": "-" },
    "Mere Club": { "type": "B or P", "special": "fragile" },
    "Combat scabbard": { "type": "B", "special": "improvised, see text" },
    "Crook": { "type": "B", "special": "reach, trip" },
    "Heavy Crank Crossbow": { "type": "P", "special": "-" },
    "Light Crank Crossbow": { "type": "P", "special": "-" },
    "Double Crossbow": { "type": "P", "special": "-" },
    "Hand Crossbow": { "type": "P", "special": "-" },
    "Heavy Crossbow": { "type": "P", "special": "-" },
    "Launching Crossbow": { "type": "-", "special": "see text" },
    "Light Crossbow": { "type": "P", "special": "-" },
    "Repeating Heavy Crossbow": { "type": "P", "special": "-" },
    "Repeating Light Crossbow": { "type": "P", "special": "-" },
    "Elven Curve blade": { "type": "S", "special": "-" },
    "Cutlass": { "type": "S", "special": "-" },
    "Dagger": { "type": "P or S", "special": "-" },
    "Dueling Dagger": { "type": "P or S", "special": "see text" },
    "Punching Dagger": { "type": "P", "special": "-" },
    "Swordbreaker Dagger": { "type": "S", "special": "disarm, sunder" },
    "Dart": { "type": "P", "special": "-" },
    "Jolting Dart": { "type": "P", "special": "see text" },
    "Dogslicer": { "type": "S", "special": "fragile" },
    "Dwarven Dorn-Dergar": { "type": "B", "special": "reach, see text" },
    "Double spear": { "type": "P", "special": "double" },
    "Earth breaker": { "type": "B", "special": "-" },
    "Elven branched spear": { "type": "P", "special": "brace, reach" },
    "Estoc": { "type": "P", "special": "-" },
    "Falcata": { "type": "S", "special": "-" },
    "Falchion": { "type": "S", "special": "-" },
    "Fauchard": { "type": "S", "special": "reach, trip" },
    "Dire Flail": { "type": "B", "special": "disarm, double, trip" },
    "Heavy Flail": { "type": "B", "special": "disarm, trip" },
    "Light Flail": { "type": "B", "special": "disarm, trip" },
    "Flailpole": { "type": "B", "special": "disarm, reach, trip" },
    "Flambard": { "type": "S", "special": "sunder" },
    "Flask Thrower": { "type": "-", "special": "see text" },
    "Flickmace": { "type": "B", "special": "reach, trip" },
    "Flindbar": { "type": "B and P", "special": "disarm, trip" },
    "Flying blade": { "type": "S", "special": "performance, reach" },
    "Flying Talon": { "type": "P", "special": "disarm, trip" },
    "Gandasa": { "type": "S", "special": "-" },
    "Garrote": { "type": "S", "special": "grapple, see text" },
    "Gauntlet": { "type": "B", "special": "-" },
    "Spiked Gauntlet": { "type": "P", "special": "attached" },
    "Dwarven Giant-Sticker": { "type": "P or S", "special": "brace, reach" },
    "Gladius": { "type": "P or S", "special": "performance" },
    "Glaive": { "type": "S", "special": "reach" },
    "Glaive-guisarme": { "type": "S", "special": "brace, reach, see text" },
    "Gnome pincher": { "type": "B", "special": "disarm, see text" },
    "Grappling hook": { "type": "P", "special": "grapple" },
    "Greataxe": { "type": "S", "special": "-" },
    "Greatclub": { "type": "B", "special": "-" },
    "Greatsword": { "type": "S", "special": "-" },
    "Guisarme": { "type": "S", "special": "reach, trip" },
    "Halberd": { "type": "P or S", "special": "brace, trip" },
    "Halfling rope-shot": { "type": "B", "special": "disarm" },
    "Gnome hooked Hammer": { "type": "B or P", "special": "double, trip" },
    "Light Hammer": { "type": "B", "special": "-" },
    "Lucerne Hammer": { "type": "B or P", "special": "brace, reach, see text" },
    "Handaxe": { "type": "S", "special": "-" },
    "Handwraps": { "type": "-", "special": "See text" },
    "Harpoon": { "type": "P", "special": "grapple" },
    "Dwarven boulder Helmet": { "type": "B", "special": "see text" },
    "Hook hand": { "type": "S", "special": "disarm, attached, see text" },
    "Orc Hornbow": { "type": "P", "special": "-" },
    "Horsechopper": { "type": "P or S", "special": "reach, trip" },
    "Hunga munga": { "type": "P", "special": "-" },
    "Hurlbat": { "type": "P and S", "special": "-" },
    "Javelin": { "type": "P", "special": "-" },
    "Stormshaft Javelin": { "type": "P", "special": "see text" },
    "Kama": { "type": "S", "special": "monk, trip" },
    "Tri-Bladed Katar": { "type": "P", "special": "-" },
    "Khopesh": { "type": "S", "special": "trip" },
    "Klar": { "type": "S", "special": "-" },
    "Butterfly Knife": { "type": "P or S", "special": "-" },
    "Deer Horn Knife": { "type": "P", "special": "blocking, monk" },
    "Switchblade Knife": { "type": "P", "special": "-" },
    "Knobkerrie": { "type": "B", "special": "see text" },
    "Pounder Kobold tail attachment": { "type": "B", "special": "-" },
    "Razored Kobold tail attachment": { "type": "S", "special": "-" },
    "Spiked Kobold tail attachment": { "type": "P", "special": "-" },
    "Sweeper Kobold tail attachment": { "type": "B", "special": "trip" },
    "Long Lash Kobold tail attachment": { "type": "S", "special": "reach" },
    "Kukri": { "type": "S", "special": "-" },
    "Kumade": { "type": "P", "special": "grapple" },
    "Collapsible Kumade": { "type": "P", "special": "grapple" },
    "Kunai": { "type": "B or P", "special": "tool" },
    "Lance": { "type": "P", "special": "reach" },
    "Lantern staff": { "type": "B", "special": "see text" },
    "Lasso": { "type": "-", "special": "see text" },
    "Dwarven Longaxe": { "type": "S", "special": "reach" },
    "Longbow": { "type": "P", "special": "-" },
    "Long bow": { "type": "P", "special": "-" },
    "Composite Longbow": { "type": "P", "special": "Strength (0-5)" },
    "Dwarven Longhammer": { "type": "B", "special": "reach" },
    "Longspear": { "type": "P", "special": "brace, reach" },
    "Long spear": { "type": "P", "special": "brace, reach" },
    "Longsword": { "type": "S", "special": "-" },
    "Long sword": { "type": "S", "special": "-" },
    "Heavy Mace": { "type": "B", "special": "-" },
    "Light Mace": { "type": "B", "special": "-" },
    "Machete": { "type": "S", "special": "-" },
    "Mancatcher": { "type": "P", "special": "grapple, reach, see text" },
    "Manople": { "type": "P or S", "special": "blocking, disarm" },
    "Dwarven Maulaxe": { "type": "B or S", "special": "-" },
    "Morningstar": { "type": "B and P", "special": "-" },
    "Net": { "type": "-", "special": "-" },
    "Snag Net": { "type": "P", "special": "trip, see text" },
    "Nunchaku": { "type": "B", "special": "disarm, monk" },
    "Ogre hook": { "type": "P", "special": "trip" },
    "Orc skull ram": { "type": "B", "special": "reach" },
    "Dwarven Heavy Pelletbow": { "type": "B", "special": "-" },
    "Dwarven Light Pelletbow": { "type": "B", "special": "-" },
    "Heavy Pick": { "type": "P", "special": "-" },
    "Light Pick": { "type": "P", "special": "-" },
    "Pickaxe": { "type": "P", "special": "-" },
    "Pilum": { "type": "P", "special": "see text" },
    "Gnome Piston maul": { "type": "B", "special": "see text" },
    "Planson": { "type": "B or P", "special": "brace" },
    "Quadrens": { "type": "P", "special": "performance" },
    "Quarterstaff": { "type": "B", "special": "double, monk" },
    "Dwarven Ram Hammer": { "type": "B", "special": "-" },
    "Ranseur": { "type": "P", "special": "disarm, reach" },
    "Rapier": { "type": "P", "special": "finesse" },
    "Spiral Rapier": { "type": "P", "special": "blocking, disarm, see text" },
    "Ratfolk tailblade": { "type": "S", "special": "-" },
    "Drow Razor": { "type": "S", "special": "see text" },
    "Rhoka": { "type": "S", "special": "-" },
    "Gnome Ripsaw glaive": { "type": "S", "special": "reach, see text" },
    "Rope gauntlet": { "type": "B (or S)", "special": "-" },
    "Sawtooth Sabre": { "type": "S", "special": "-" },
    "Sai": { "type": "B", "special": "disarm, monk" },
    "Sanpkhang": { "type": "P or S", "special": "monk, see text" },
    "Sap": { "type": "B", "special": "nonlethal" },
    "Combat Scabbard": { "type": "S", "special": "see text" },
    "Bladed Scarf": { "type": "S", "special": "disarm, trip" },
    "Scimitar": { "type": "S", "special": "-" },
    "Scizore": { "type": "P", "special": "-" },
    "Scythe": { "type": "P or S", "special": "trip" },
    "Sea-knife": { "type": "S", "special": "-" },
    "Heavy Shield": { "type": "B", "special": "-" },
    "Light Shield": { "type": "B", "special": "-" },
    "Throwing Shield": { "type": "B", "special": "performance, trip" },
    "Shortbow": { "type": "P", "special": "-" },
    "Short bow": { "type": "P", "special": "-" },
    "Composite Shortbow": { "type": "P", "special": "-" },
    "Shortspear": { "type": "P", "special": "-" },
    "Shotel": { "type": "P", "special": "performance" },
    "Shrillshaft javelin": { "type": "P", "special": "see text" },
    "Shuriken": { "type": "P", "special": "monk" },
    "Siangham": { "type": "P", "special": "monk" },
    "Sica": { "type": "S", "special": "performance" },
    "Sickle": { "type": "S", "special": "trip" },
    "Sickle-sword": { "type": "S", "special": "distracting, see text" },
    "Sling": { "type": "B", "special": "-" },
    "Sling glove": { "type": "B", "special": "-" },
    "Halfling Sling staff": { "type": "B", "special": "-" },
    "Double Sling": { "type": "B", "special": "double, see text" },
    "Stitched Sling": { "type": "B", "special": "disarm, trip" },
    "Spear": { "type": "P", "special": "brace" },
    "Boar Spear": { "type": "P", "special": "brace, see text" },
    "Syringe Spear": { "type": "P", "special": "brace, see text" },
    "Totem Spear": { "type": "P or S", "special": "see text" },
    "Weighted Spear": { "type": "B or P", "special": "brace, double" },
    "Spear-sling": { "type": "P", "special": "see text" },
    "Dwarven Sphinx Hammer": { "type": "B", "special": "-" },
    "Spiked armor": { "type": "P", "special": "-" },
    "Heavy Spiked shield": { "type": "P", "special": "-" },
    "Light Spiked shield": { "type": "P", "special": "-" },
    "Split-blade sword": { "type": "S", "special": "disarm, trip, see text" },
    "Spring blade": { "type": "P or S", "special": "see text" },
    "Starknife": { "type": "P", "special": "-" },
    "Stingchuck": { "type": "B", "special": "see text" },
    "Stonebow": { "type": "B", "special": "-" },
    "Switchscythe": { "type": "P or S", "special": "trip" },
    "Sword cane": { "type": "P", "special": "see text" },
    "Bastard Sword": { "type": "S", "special": "-" },
    "Dueling Sword": { "type": "S", "special": "-" },
    "Short Sword": { "type": "P", "special": "-" },
    "Two-Bladed Sword": { "type": "S", "special": "double" },
    "Terbutje": { "type": "S", "special": "fragile" },
    "Dteel Terbutje": { "type": "S", "special": "-" },
    "Thorn bracer": { "type": "P", "special": "-" },
    "Throwing arrow cord": { "type": "P", "special": "-" },
    "Tongi": { "type": "P", "special": "-" },
    "Traveling kettle": { "type": "B", "special": "monk, see text" },
    "Trident": { "type": "P", "special": "brace" },
    "Unarmed strike": { "type": "B", "special": "nonlethal" },
    "Dwarven Urgrosh": { "type": "P or S", "special": "brace, double" },
    "War razor": { "type": "S", "special": "-" },
    "Dwarven Waraxe": { "type": "S", "special": "-" },
    "Dwarven Double Waraxe": { "type": "S", "special": "see text" },
    "Warhammer": { "type": "B", "special": "-" },
    "Dwarven War-shield": { "type": "P or S", "special": "see text" },
    "Waveblade": { "type": "P or S", "special": "monk, see text" },
    "Whip": { "type": "S", "special": "disarm, nonlethal, reach, trip" },
    "Scorpion Whip": { "type": "S", "special": "disarm, performance, reach, trip" },
    "Wooden stake": { "type": "P", "special": "-" },
    "Wrist launcher": { "type": "P", "special": "-" },
    "Heavy Wrist launcher": { "type": "P", "special": "-" }
}

sbcConfig.damageTypes = {
    "b": "bludgeoning",
    "p": "piercing",
    "s": "slashing",
    "c": "cold",
    "f": "fire",
    "e": "electricity",
    "so": "sonic",
    "a": "acid",
    "force": "force",
    "negative": "negative",
    "positive": "positive",
    "untyped": "untyped"
}

sbcConfig.armorBonusTypes = [
    "dex",
    "armor",
    "shield",
    "natural",
    "base",
    "enhancement",
    "dodge",
    "inherent",
    "deflection",
    "morale",
    "luck",
    "sacred",
    "insight",
    "resistance",
    "profane",
    "trait",
    "racial",
    "size",
    "competence",
    "circumstance",
    "alchemical",
    "penalty",
    "rage",
    "monk",
    "wis"
]

/* ------------------------------------ */
/* Skills and Features             		*/
/* ------------------------------------ */

sbcConfig.skills = {
    "acrobatics": "acr",
    "artistry": "art",
    "appraise": "apr",
    "bluff": "blf",
    "climb": "clm",
    "craft": "crf",
    "diplomacy": "dip",
    "disable device": "dev",
    "disguise": "dis",
    "escape artist": "esc",
    "fly": "fly",
    "handle animal": "han",
    "heal": "hea",
    "intimidate": "int",
    "knowledge": {
        "arcana": "kar",
        "dungeoneering": "kdu",
        "engineering": "ken",
        "geography": "kge",
        "history": "khi",
        "local": "klo",
        "nature": "kna",
        "nobility": "kno",
        "planes": "kpl",
        "religion": "kre"
    },
    "linguistics": "lin",
    "lore": "lor",
    "perception": "per",
    "perform": "prf",
    "profession": "pro",
    "ride": "rid",
    "sense motive": "sen",
    "sleight of hand": "slt",
    "spellcraft": "spl",
    "stealth": "ste",
    "survival": "sur",
    "swim": "swm",
    "use magic device": "umd"
}

sbcConfig.specialAbilityTypes = {
    "ex": "Extraordinary",
    "su": "Supernatural",
    "sp": "Special"
}

sbcConfig.classFeatures = [
    "arcane bond",
    "bloodline",
    "sneak attack",
    "trapfinding",
    "evasion",
    "rogue talents",
    "rogue talent",
    "trap sense",
    "favored enemy",
    "track",
    "wild empathy",
    "endurance",
    "smite evil",
    "divine grace",
    "lay on hands",
    "divine bond",
    "mercy",
    "favored terrain",
    "hunter's bond",
    "quarry",
    "flurry of blows",
    "stunning fist",
    "ki",
    "bravery",
    "weapon training",
    "armor training",
    "wild shape",
    "bardic performance",
    "bardic knowledge",
    "inspire courage",
    "inspire competence",
    "lore master",
    "versatile performance",
    "countersong",
    "distraction",
    "fascinate",
    "dirge of doom",
    "inspire heroics",
    "rage power",
    "rage",
    "damage reduction",
    "dual identity",
    "vigilante talent",
    "social talent",
    "hex",
    "eidolon",
    "defensive instinct",
    "shifter",
    "chimeric",
    "mystery",
    "relevation",
    "divine might",
    "commune",
    "arcane pool",
    "spellstrike",
    "magus arcana",
    "spell combat",
    "knowledge pool",
    "domain",
    "judgement",
    "solo tactics",
    "bane",
    "exploit weakness",
    "panache",
    "grit",
    "nimble",
    "gun training",
    "deeds",
    "phrenic",
    "channel",
    "challenge",
    "bomb",
    "poison resistance",
    "discovery",
    "mutagen",
    "fervor",
    "blessings",
    "sacred weapon",
    "charmed life",
    "swashbuckler weapon training",
    "studied target",
    "slayer talent",
    "inspired rage",
    "raging song",
    "spell kenning",
    "alchemy",
    "investigator talent",
    "studied strike",
    "animal companion",
    "animal focus",
    "brawler's flurry",
    "maneuver training",
    "martial flexibility",
    "knockout",
    "brawler's strike",
    "arcane reservoir",
    "arcanist exploit",
    "ninja trick",
    "uncanny dodge",
    "no trace",
    "smite good",
    "calm spirit",
    "phantom recall",
    "bonded manifestation",
    "discipline",
    "psychic",
    "focus power",
    "implements",
    "shift focus",
    "outside contact",
    "mesmerist",
    "touch treatment",
    "manifold tricks",
    "spirit bonus",
    "spirit power",
    "spirit surge",
    "burn",
    "elemental overflow",
    "infusion",
    "internal buffer",
    "utility wild talent",
    "metakinesis",
    "metakinetic"
]

sbcConfig.spellCastingClasses = [
    "adept",
    "alchemist",
    "antipaladin",
    "arcanist",
    "bard",
    "bloodrager",
    "cleric",
    "druid",
    "hunter",
    "inquisitor",
    "investigator",
    "magus",
    "medium",
    "mesmerist",
    "occultist",
    "oracle",
    "paladin",
    "psychic",
    "ranger",
    "red mantis assassin",
    "sahir-afiyun",
    "shaman",
    "skald",
    "sorcerer",
    "spiritualist",
    "summoner",
    "warpriest",
    "witch",
    "wizard"
]

sbcConfig.metamagic = [
    "Apocalyptic",
    "Aquatic",
    "Ascendant",
    "Authoritative",
    "Benthic",
    "Blissful",
    "Bouncing",
    "Brackish",
    "Brisk",
    "Burning",
    "Centered",
    "Cherry Blossom",
    "Coaxing",
    "Concussive",
    "Conditional",
    "Consecrate",
    "Contagious",
    "Contingent",
    "Crypt",
    "Dazing",
    "Delayed",
    "Disruptive",
    "Echoing",
    "Eclipsed",
    "Ectoplasmic",
    "Elemental",
    "Empower",
    "Empowered",
    "Encouraging",
    "Enlarge",
    "Enlarged",
    "Extend",
    "Extended",
    "Familiar",
    "Fearsome",
    "Flaring",
    "Fleeting",
    "Focused",
    "Furious",
    "Heighten",
    "Heightened",
    "Intensified",
    "Intuitive",
    "Jinxed",
    "Latent Curse",
    "Lingering",
    "Logical",
    "Maximize",
    "Maximized",
    "Merciful",
    "Murky",
    "Persistent",
    "Piercing",
    "Quicken",
    "Quickened",
    "Reach",
    "Rime",
    "Scarring",
    "Scouting Summons",
    "Seeking",
    "Selective",
    "Shadow Grasp",
    "Sickening",
    "Silent",
    "Snuffing",
    "Solar",
    "Solid Shadows",
    "Stable",
    "Steam",
    "Still",
    "Stilled",
    "Studied",
    "Stygian",
    "Stylized",
    "Tenacious",
    "Tenebrous",
    "Thanatopic",
    "Threatening Illusion",
    "Threnodic",
    "Thundering",
    "Toppling",
    "Toxic",
    "Traumatic",
    "Trick",
    "Tumultuous",
    "Umbral",
    "Ursurping",
    "Vast",
    "Verdant",
    "Widen",
    "Widened",
    "Yai-Mimic"
]
