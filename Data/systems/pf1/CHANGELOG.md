# Changelog

## 10.8 - 2024-10-3

### Bug Fixes

- Range card note is now more specifically labeled max range. ([3534](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3534))
- Remove child links from items when given to other actors ([3610](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3610))
- Chat card targets would render in single column in some browsers. ([3651](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3651))
- Importing actor from JSON could behave unexpectedly in some aspects compared to Foundry default behaviour.
- Combat tab generic melee and ranged attacks did not display all context notes correctly. ([3650](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3650))
- Identifiers and other tag-like entities now allow underscores.
- Skill IDs no longer allow number prefixes.
- Special range was incorrectly treated the same as feet.
- Actions no longer show deaf condition tag and spells no longer show doubled deaf tag, leaving it only being shown once for spells.
- Currency fields are no longer faded when you have no currencies. ([1118](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/1118))
- Nonlethal, temporary HP and AC were inconsistently available in token resource bar options. ([3339](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3339))
- Level-up dialog now displays total for ability scores directly and base in tooltip instead of vice versa. ([3487](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3487))
- Large number of conditions were not disabled on sheet when the character was immune to them. ([3529](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3529))
- Text enrichers did not find items with their Babele translated name. ([3542](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3542))
- Character sheets had little layout jitter when certain inputs were focused. ([3544](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3544))
- Quick actions now can be any item type that qualifies instead of specific subset. ([3628](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3628))
- Trap actors would error constantly. ([3654](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3654))
- Special activation type did not correctly allow arbitrary string. ([3658](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3658))
- Open in browser button in changelog dialog was nonfunctional.
- Warning sign on context notes displayed wrong.
- Dead condition did not render as overlay since addition of the new conditions (in v10.5).
- Skill enricher set to provide info link created two icons.
- Infinite duration buffs unexpectedly ended on turn start.
- Armor and shields had their slot column empty.
- Voidglass, Liquid Glass and Throneglass incorrectly required glass as base material. Cryptstone similarly incorrectly required stone as base material.
- Missing deeply embedded traits would not be rendered correctly or at all.
- Roll initiative could sometimes spit out error that made no sense.
- Clearing item filter list with the browser clear button would not correctly reset the filter.
- Editing built-in skill via skill edit dialog would cause them to become corrupt.
- Level-up prompt no longer is based on HD but rather actual level, allowing animal companions and eidolons for example to level-up correctly.
- Racial HD and Mythic Paths no longer display their level-up buttons only when you have XP for regular levels. Instead the buttons are always displayed.
- Experience Distributor not preselecting defeated NPCs when using Wounds & Vigor for NPCs.
- Sheet d20 spin animation was nonfunctional.
- Right-clicking conditions in token HUD did not turn them to overlays.
- Token tooltip hidden replacement name is no longer allowed to be empty.
- Fixed trying to fetch actor for actorless script calls. ([3579](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3579))
- Give Item dialog target selection choices did not match visible actors.

### Changelog

- Spell Browser now attempts to display proper class name instead of identifier for the class filter choices. ([2540](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/2540))
- Added Weapon and Spell attack change targets. ([3567](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3567))
- Epic and Magic material traits are now available as choices even if no base material is chosen.
- Token HUD and API now also block conditions the actor is immune to.
- Text enricher `as` option now allows `sheet` and `auto` option too to increase versatility.
- Added missing movement racial trait category.
- Initiative macro created from drag&drop to hotbar now by default creates combatants.
- Spellbooks now have Ignore Ability Limit option for spell-like books.
- Improved input feedback consistency on actor, item and action sheets.
- Removed enforced borders from all sheet and chat card images. ([3549](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3549))
- Class skill selection in item sheets are now alphabetically sorted and in columns with greater visibility for custom skills.

### Compendium

- Updated Pestilence Bloodline and it's bloodline powers. ([3559](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3559))
- Added missing actions to Hissing Rage and Lesser Hurling rage powers. ([3560](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3560))
- Organized spells compendium content into school folders.
- Organized weapons and ammunition compendium content into folders.
- Added touch flag to all class feature actions that were missing it. ([3166](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3166))
- Wyrwood is now correctly sized as small. ([3537](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3537))
- Fixed typos in being of ib and syrinx race. ([3573](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3573), [3566](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3566))
- Whips now more correctly have 15 ft range instead of reach. Monowhip no longer adds stregnth to damage.
- Added missing minor bag of holding.

### API

- `convertDistance` HBS helper now passes second parameter to underlying function. ([3540](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3540))
- `pf1.config.buffTargets` and `pf1.config.buffTargetCategories` now support actor and item type filters with actor filters adding warnings and item filters hiding the change options. ([3553](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3553))
- Skill rank, and certain character speeds when relevant, are now included in skill roll chat message metadata.
- Added universally available `@step` variable to roll data to allow system of units agnostic measurement formula creation (e.g. `6 * @step` instead of `30` to represent both `30 ft` and `9 m`).
- Second parameter of `pf1PostActionUse` is now what it is documented to be. ([3554](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3554))
- `CONFIG.statusEffects` once again includes `name` for full core Foundry data parity.
- Module introduced actors and items can now define their default icon in `pf1.config.defaultIcons`.
- Actor sheet item lists once again include type and subtype info in the lists.
- Material registry now includes additional data such as health per inch, primitive flag, and others. ([3413](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3413))
- ⚠️ `@details.level.value` no longer is synonym for HD, but rather actual levels (such as without racial HD and mythic paths).
- `TooltipPF` altered to accommodate actors that don't conform to system expectations.

## 10.7 - 2024-8-21

### Bug Fixes

- Actor sheet search inputs were not usable on uneditable sheets. ([3525](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3525))

### Changelog

- Misfire and Capacity are no longer displayed if item has no ammo type set.

## 10.6 - 2024-8-21

### Bug Fixes

- Editable and uneditable item sheets were not very distinguishable from each other.
- Scene loading hanging at ~62% in Firefox.

## 10.5 - 2024-8-20

### Bug Fixes

- Long creatures smaller than medium had their reach calculated as shorter than it should've been. ([3411](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3411))
- Change formulas that were allowed to have random elements were incorrectly reported as not supporting them. ([3415](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3415))
- Various Change targets (mixture of skill and damage targets) that were supposed to support dice did not do so. ([3415](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3415))
- Buffs with duration of 1 turn failed to end at end of the turn.
- Round cycling could randomly cause buffs to end 1 round too early.
- DC & CL school context notes were not displayed in spell cards.
- Enricher produced content could render strangely. ([3439](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3439))
- Equipping in containers was not correctly blocked, causing odd behaviour.
- Quickbar toggle no longer requires item to have actions. ([3369](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3369))
- Caster level check found in spell details tab did not function. ([3402](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3402))
- Actor sheet tooltips did not show for uneditable actors. ([3419](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3419))
- `@Use` enricher incorrectly used default action if no action was defined. ([3442](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3442))
- Size modifier to AC was missing under certain circumstances from AC breakdown. ([3445](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3445))
- Quantity change script call was nonfunctional. ([3448](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3448))
- Re-rolling initiative for actor with no token no longer endlessly re-adds duplicates of them to combat. ([3451](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3451))
- Re-rolling initiative for actors with no token now have some additional constraints to avoid rerolling such for multiple combatants if the combatant has been duplicated. ([3451](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3451))
- Level-up dialog and card could display granted HP wrong for mythic path if the actor had no actual classes or racial HD yet. ([3484](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3484))
- Wounds from Wounds&Vigor optional rule were not affected by ability score modifications correctly due to the ability score's undrained value not keeping up with changes. ([3488](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3488))
- Alchemist's Labs had invalid change targets for boosting Craft (Alchemy) skill. ([3504](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3504))
- Non-deterministic damage in conditional modifiers displayed as constantly rolled result in combat tab. ([3507](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3507))
- AC max dex tooltips did not account for armor training. ([3519](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3519))
- Action self charges were not charging correctly on rest.
- Action selection in `@Use` and `@Action` enrichers did not work correctly.
- Apply half was nonfunctional in `/heal` and `/damage` cards.
- Chained flurry generated extra attack penalties incorrectly.
- Per hour charges did not show on actor sheet.
- Haunt, trap, and vehicle sheets did not display charges correctly in all cases.
- Some chat card targets were not properly unhidden on world load, causing an error instead. ([3367](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3367))
- `@Condition` text enricher label did not work correctly.
- Drag & dropping macro to script calls would display its icon and name incorrectly until refresh.
- Dropping content-linkable data in item sheet notes did not create a content link.
- FCB health choice was doubled up with automatic health.
- Resetting health settings did not work correctly.
- Hotbar macro creation from drag&drop could in some circumstances link a macro that user has no access to.
- `@attributes.hp.value` did not work in changes.
- Item sheet changes tab did not display invalid change targets correctly.
- Inactive items (e.g. unequipped magical items, disabled buffs, etc.) still granted weapon, armor and language proficiencies.
- Item create dialog could display invalid folder selection (e.g. in compendiums).
- Some drag&drop operations failed for actor-owned items in compendiums. ([3390](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3390))
- Max charges were not set for items in containers.
- Nexavaran Steel was misspelled in UI and its internal ID.
- Race could not be dragged off a sheet.
- Skipping action use dialog skipped default conditional modifiers, too.
- Caster Level Offset in class spellbook setup was incorrectly applied to Class Level Modification, causing Ranger, Paladin and Antipaladin have their spellbooks set up incorrectly.
- Unchained flurry generated its number of attacks incorrectly.
- Wound thresholds did not apply to attacks.
- Automatic tag/identifier creation is now friendlier with diacritics.
- Buffs set to end on initiative ended far too early.
- Item identifier no longer allows invalid characters. ([3409](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3409))
- Certain conditional modifier options were not passed through localization correctly.
- Rounding and continuity options were not displayed correctly in Health settings.
- Negative levels now show as negative levels in breakdowns instead of as energy drain.
- Non-physical items incorrectly displayed unidentified description editor.
- Vehicle CMB did not roll what was configured.
- Source labeling was invalid for weapons. ([3461](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3461))

### Changelog

- Added `@Weight` and `@Distance` enrichers for easy dynamic conversion of weights and distances. ([2923](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/2923))
- Changelog is now split into latest, major and legacy tabs for easier navigation. ([3172](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3172))
- Changelog no longer displays legacy versions when it is automatically presented after version change.
- ⚠️ `@Damage` and `@Heal` enrichers now take roll data from speaker by default instead of target. Including valueless `subject` option reverts to previous behaviour of using subject's roll data. ([3385](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3385))
- Text enrichers now have common `as` and `vars` options for defining constraint on activator and for roll data source respectively. ([3389](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3389))
- Haunt actor now provides `@cl` alias in roll data. ([3388](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3388))
- Increasing mythic tier now prompts for ability score increases as appropriate. ([3396](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3396))
- _Help_ browser renamed to _Documentation_. ([3433](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3433))
- Added search filter to trait selectors (language, weapon group, etc. selectors) ([3513](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3513))
- Added hardness field to actors attributes tab. ([3503](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3503))
- Added pharmaceutical subtype for consumables.
- Automatic attack numbering improved when the base attack is labeled with conflicting name (e.g. Scorching Ray).
- Weapon attacks can now define their category (e.g. simple), allowing automatic proficiency matching to function with them.
- Weapon attacks can now define weapon type (e.g. one-handed)
- Several dialogs now autofocus the most commonly relevant input field automatically.
- Right-clicking a change entry in item sheet opens its editor much like opening items and actions elsewhere. ([3335](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3335))
- Spell headers now display proper class names instead of IDs where possible.
- Custom search input clear button removed in favor of HTML built-in clear functionality.
- Actor sheet buffs tab now displays conditions the character is immune to differently and prevents enabling them.
- Swapped condition images from pngs to svgs ([3468](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3468))
- Consumable creation now copies sources from the spell to the created item. ([3462](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3462))
- Saving throws and concentration checks now support deferred changes.
- Offset values are now displayed in health tooltips.
- Add `@Draw` enricher for roll tables ([3405](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3405))
- `@Apply` text enricher now can find items by name and re-activate existing buffs instead of always adding new.
- Post-use script calls now make items activatable like on-use script calls.
- Clarified max dex display on actor sheet attributes tab.
- Actor sheet tooltips now display forced base values (as usually set by lite sheet) if present.
- Attacks created from scratch are now by default marked with forced proficiency.
- Added several additional tooltips to haunt, trap and vehicle sheets.
- Movement speeds now support context notes. ([3491](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3491))
- Loot items can now be timeworn.
- Added missing conditions: dead, disabled, dying, flat-footed, petrified, stable, and unconscious ([511](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/511), [1026](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/1026))

### Compendium

- Added shield bash action to shields and removed redundant shield-weapons. ([3427](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3427))
- Added tags to magus arcana. ([3485](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3485))
- Added amulet of mighty fists.
- Added bracers of armor.
- Added missing exchange spell class abiltity to inquisitor.
- Added greater ability score enhancement belts and headbands.
- Added various wondrous items that grant competence bonuses.
- Replaced invalid NULL damage formulas from weapons and natural attacks. ([3472](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3472))
- Split lantern into individual items. ([3459](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3459))
- Updated action and icon of hydraulic push spell and added usage note.
- Added buffs for several tech items and linked them as supplements.
- Added various items used in the iron gods AP.
- Added actions and supplements to various memory facets.
- Updated arcanist exploits which requiered touch flag. ([3509](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3509))
- Bullet recovery chance has been corrected to 0% from default 50%.
- Added Basic Monsters compendium with several complete NPC actors as examples and as quickstart monsters. ([2800](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/2800))
- Inquisitors no longer have Track class feature twice. ([3428](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3428))
- Corrected all armor & shield base materials. ([3141](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3141))
- Construct racial HD no longer gives incorrect amount of bonus HP based on size.
- Removed STR-damage bonus on laser torch.
- Fixed typo in magus class association for reduce person mass and shadowfade spells.
- Corrected several weapon base materials. ([3141](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3141))
- Removed incorrect compendium links to pf-content items.
- Split net item into individual instances. ([3458](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3458))
- Added sources and several missing feature class associations for shifter.
- Updated context notes of critical feats to use new on critical target.
- Renamed trail rations and added missing single use action.

### API

- Added `pf1.config.currency` for configuring how currency works. ([1423](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/1423))
- Haunt, trap and vehicle actors now correctly call `pf1GetRollData` hook.
- Ability score increases from level and mythic tiers are now more configurable. ([3396](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3396))
- `ItemPF.use()` fills in `shared.token` more eagerly. ([3416](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3416))
- Add more data to pf1PreAttackRoll and add pf1PreDamageRoll
- Added ActorPF.addTempHP() function for easy adjustment of temporary hit points regardless what health rule is in play. ([2204](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/2204))
- Added `pf1PreD20Roll` hook
- ItemConditional.create() and ItemConditionalModifier.create() now accept non-array for create data for creating single entry.
- ⚠️ Material registry IDs changed to be consistent. ([3452](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3452))
- Actor sheet now trusts `ActorPF.getFeatCount()` instead of recalculating itself how many feats you're supposed to have. ([3482](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3482))
- `ActorPF.getFeatCount()`'s excess and missing values are now calculated via getters on demand, allowing easier overriding.
- ItemPF.use() no longer retrieves relevant token document in invalid manner. ([3510](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3510))
- ItemPF.isCharged and ItemAction.isSelfCharged now correctly returns true when charges are configured in all cases.
- ItemPF.normalMaterial and ItemAction.normalMaterial no longer return incomplete information in certain cases.
- `ChatMessagePF.targets` no longer fails to provide correct return value for new messages.
- ⚠️ `pf1.utils.createTag()` no longer returns "tag" when given nothing.
- `pf1.utils.createTag()` now accepts additional options to control created tag.
- Cold Iron, Nexsteel and Mithral had incomplete pricing info in material registry. ([3412](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3412))
- Added `actionSource` getter to `ChatMessagePF`.

## 10.4 - 2024-7-7

### Bug Fixes

- External links in the Help Browser could not be opened ([3349](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3349))
- Actor sheet combat tab attacks column did not account for BAB override.
- Clearing XP at level 1 would set to XP to 1 instead of 0. ([3333](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3333))
- Modifying natural reach with a change caused reach weapon range highlight to display incorrectly. ([3347](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3347))
- Items could not be created from scratch within containers. ([3357](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3357))
- Action BAB override did not work if your base BAB was zero. ([3329](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3329))
- Migration for removal of `penalty` bonus type did not function correctly.
- Combat updates, such as cycling encounters, did not correctly trigger followup events such as refreshing the encounter.
- Critical multiplier conditional modifier did not function.
- Browse items button was nonfunctional in containers.
- Container sheets displayed items in disabled state under unexpected circumstances.
- Container dropped into itself would delete itself.
- Hovering over CR containing box did not include it in the tooltip.
- Actor types that do not have HD were displaying it in the xp-cr-level box tooltip.
- Non-buff condiditons and token overlay effects (such as defeated overlay) was hidden with hide token buffs setting enabled.
- Price per Charge configuration was missing entirely for all items.
- Conditions are now alphabetically sorted in all supported languages. ([3309](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3309))
- Mythic tiers were incorrectly affected by negative levels.
- Blindsight, blindsense and tremorsense had excessive ranges with metric distances in use. ([3318](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3318))
- Changing health configuration did not request reload.

### Changelog

- Added "Per Hour" limited use period. This is not automatically restored except with rest. ([3326](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3326))
- Simplified the list of applicable DR types in the Damage Resistance dialog ([3328](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3328))
- Nexavarian Steel was missing from list of material types. ([3328](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3328))
- You can now drag & drop sources to item sheets to copy them. This also opens the source editor on the target sheet for farther editing unless shift is held. ([3342](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3342))
- Aszite and Druchite were not marked as addon materials, and Blight Quartz was missing. ([3353](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3353))
- Added exhausted option to condition immunities. ([3321](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3321))
- Added race points, racial trait type and category selection to racial trait feat type. ([3314](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3314), [3315](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3315))
- Added info blurb in experience config about how custom track functions. ([3317](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3317))
- Hide from token toggle on buffs now takes immediate effect. Old hidden active buffs are unaffected. ([3358](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3358))
- Health sources no longer state bonus type.

### Compendium

- Added missing weapon proficiency to outsider racial hd. ([3325](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3325))
- Fixed incorrect change formulas in powerful stance buff.
- Added missing improved unarmed strike supplement and source to monk monster templates.
- Removed obsolete passive actions from class features.
- Added insanity roll table. ([3327](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3327))
- Fixed change formulas of familiar class not working when class is renamed.
- Added missing class association to Witch for Patron Spells and added missing information to Witch's Familiar feature about learning new spells. ([3352](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3352))

### API

- Applying nonlethal healing via ActorPF.applyDamage() now actually heals nonlethal instead of normal health. ([3320](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3320))
- ActorPF.applyDamage() now accepts `dualHeal` boolean option to indicate the healing also affects nonlethal damage. ([3320](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3320))
- `pf1.registry.materialTypes` registry entries now support `dr` to determine if they show up in the Damage Resistance Selector. In addition, `shortName` can hold a short-hand form of a material name, and `treatedAs` can be given a material id to be considered the same as the given material (for DR purposes only).` ([3328](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3328))
- ItemPF.getAttackSources() now accounts for BAB override.
- ItemAction.getRange({type:"min"}) no longer returns incorrect value for reach with natural reach buffs. ([3347](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3347))
- ItemPF.charges no longer returns 0 just because the item is not on actor.

## 10.3 - 2024-6-26

### Bug Fixes

- Compendium links and compendium browser buttons were nonfunctional on uneditable sheets (such as when viewing with observer permissions or in locked compendiums).
- Generic CMB, melee, and ranged attacks did not display related context notes fully or at all. ([3249](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3249))
- Change and Context Note target selection now sorts targets the same way. ([3251](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3251))
- Throneglass was incorrectly add-on material instead of normal construction material. ([3291](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3291))
- Combat tab attack tooltip no longer displayed attack bonuses for each attack (such as iterative progression). ([3292](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3292))
- Changes targeting subskills were not included in actual rolls. ([3293](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3293))
- Various conditions (notably paralyzed, helpless, and sleeping) did not apply their effects correctly. ([3294](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3294))
- Action sheet could not be opened in uneditable sheet via the dedicated button for it.
- Buff duration label (e.g. in acror sheet buffs tab) failed to resolve durations correctly.
- Combat tab damage column did not respect maximum ability score limitation nor restrictions on multipliers when modifier is below zero.
- Container contents weight could become excessively precise.
- Source registry was having 3 largely harmless errors at world launch.
- XP distributor's split evenly option still didn't work correctly. ([3234](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3234))
- Actors with negative levels but no classes would error.

### Changelog

- Bonus type selection is now sorted everywhere. ([3262](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3262))
- Non-weapon attacks and spells now have access to materials. ([3304](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3304))
- Right clicking a condition on buffs tab allows configuring its duration or enabling one with duration.
- ⚠️ `@Heal` and `@Damage` enrichers now replace formula display with provided label instead of using it as prefix.
- Empty item stacks now have strikethrough again, broken items are slightly discolored red, and some other small item presentation changes to allow custom CSS tweaking better.
- Owned item migration failures are now more descriptive.
- Attempting to cast unprepared/unknown spell now causes more accurate error.
- Modifiers for quantity adjust can now be combined.
- `@Save` enricher now attempts to resolve the DC parameter as formula if it's not a simple number.
- Trait types are now alphasorted.

### Compendium

- Add source information to classes ([3300](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3300))
- Removed Vampire Hunter D and Niobe content, such as the Esufey race, Vampire Hunter and Omdura classes and their related content.
- Fixed typo in Being of Ib name. ([3307](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3307))

### API

- New categories can be added to DamageTypes.CATEGORIES
- ActorPF.setCondition() and its kin now accept object in addition to boolean as state parameter for merging into the created active effect.

## 10.2 - 2024-6-23

### Bug Fixes

- Lore and Artistry compendium links did not open journals ([3239](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3239))
- CMB could not be rolled from summary tabs ([3243](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3243))
- Skill ranks can no longer be set to negative values.
- Damage types could not be registered with images
- Adjusting equipment (armor, wondrous items, etc.) material addons could cause the item sheet to become unopenable.
- Features tab footer sources tooltip did not include levels or mythic tiers for feats. ([3197](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3197))
- Wounds were not handling ability drain, penalty and damage correctly. ([3206](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3206))
- Excess vigor damage was not corretly applied to wounds. ([3221](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3221))
- Spellbook configuration could not be viewed for actors in locked compendiums. ([3231](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3231))
- Actions using ammo could falsely claim you're out of ammo and refuse attacks even with everything configured correctly. ([3233](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3233))
- Experience distributor's split evenly option gave maximum possible to everyone. ([3234](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3234))
- Action sheet notes section moved from bottom of action tab to usage tab. ([3237](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3237))
- Wound Thresholds optional rule is now disabled if Wounds & Vigor is also enabled to prevent unpredictable and unexpected behaviour. ([3242](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3242))
- AC tooltip did not display related context notes. ([3247](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3247))
- Subskill tooltips did not display context notes correctly. ([3250](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3250))
- Removed None as spellcasting ability option. ([3253](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3253))
- Buffs with the icon hidden either through the buff's own setting or the global condition hiding setting would never expire. ([3260](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3260))
- Buffs with random durations caused invalid warnings. ([3261](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3261))
- Combat tab damage column had some instances display raw ID rather than human readable name for types in the tooltip. ([3266](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3266))
- Damage type selector behaved unexpectedly upon re-opening when custom damage type field was used. ([3275](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3275))
- Duplicating an item sharing charges would duplicate the charge sharing, leading to invalid state of items inheriting charges from more than one source. ([3279](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3279))
- Splitting stack of 2 items would error. ([3281](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3281))
- Splitting item stack could cause various problems if the source item had any links. ([3285](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3285))
- Charge inheritance caused potentially wrong inherited charges due to re-evaluation of max charges. ([3288](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3288))
- Recharge formula was incorrectly left editable in items inheriting charges. ([3290](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3290))
- Adding classes to actors raw (holding shift) still caused their level to be forced to 1 as if adding class normally.
- Give item dialog had far larger selection of characters available than intended, including the character giving the item. ([3282](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3282))
- Level-up dialog failed to increase chosen favored class bonus (FCB).
- Roll mode selection in level-up dialog had no effect.
- Actor sheet damage column could sometimes display invalid shothands (e.g. 4+0d6 becoming 4d6)
- Using level-up dialog for NPC classes could cause it to error.
- Level-up dialog failed to auto-select default health option for NPC classes.
- Level-up dialog would not allow finishing gaining mythic path at a time level progression could grant ability score increase.
- NPC lite sheet initiative, BAB, AC, CMD and saves inputs had no effect.
- Non-GM users could get migration errors from scene migration.
- Class set to provide zero skills per level would prevent gaining Intelligence bonus to skills for those levels.
- Class spellcasting config could be initialized wrong and result in class level modification formula to have invalid "null" formula.
- Spell slot preparation migration caused all preparation to be zeroed.
- Loot items with multiple actions didn't display the action type correctly in chat cards.
- Combat tab entries with invalid damage formula would not display any info about it in damage tooltip.
- Initiative rolls ignored the rollMode set in the dialog
- Skill rank input could enter uneditable state until something else was edited.

### Changelog

- FCB to health is now shown in health breakdown. ([3200](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3200))
- Wounds now have their wound threshold displayed in their tooltip. ([3206](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3206))
- Reorganize actor attribute trait list to more meaningful order. ([2704](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/2704))

### Compendium

- Updated saves, actions, icons and sources of fungal blisters and molten orb spells. ([3267](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3267))
- Add source info to compendium spells
- Add missing touch flag to spell attacks ([3268](https://gitlab.com/foundryvtt_pathfinder1e/foundryvtt-pathfinder1/-/issues/3268))

### API

- pf1.applications.SplitStack.wait() no longer gives invalid return value for stacks of 2.

## 10.1 - 2024-6-17

### Bug Fixes

- Wounds & Vigor were not healed when resting. ([3214](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3214))
- Per round limited uses did not have recharge formula.
- Attack context notes were included with every type of action. ([3199](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3199))
- Loot items were missing use and post-use script calls options. ([3203](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3203))
- Implants were missing all script call options.
- Equip-toggle script call option for physical items could fire needlessly when item was deleted.
- Some base translation keys were missing for item subtypes. ([3208](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3208))
- Implants inventory section was still displayed even with cybertech global setting was disabled. ([3209](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3209))
- Actor sheet could not be opened if a buff had invalid duration formula.
- Dropping items to item sheet links tab sometimes did not work.
- Using level-up dialog for mythic path would error.
- Spells with no actions could not be opened, such as when creating new one from scratch.
- Could not create race from scratch directly on actor sheet. ([3207](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3207))
- Resting would incorrectly recharge items with finite charges with no timed recharge.
- Prepared casters would have their spell uses reset on start of their combat turn.
- Buffs targeting melee weapon damage had no effect.
- Ability drain incorrectly affected maximum wounds. ([3206](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3206))
- Invalid damage formulas could make the actor sheet unopenable.

### Changelog

- Resting for 24 hours or more now increases healing as per full day of rest. ([702](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/702))
- Migration now cleans up invalid values in Changes.

### Compendium

- Monk was missing their Wholeness of Body ability from 7th level progression. ([3212](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3212))

## 10.0 - 2024-6-15

### Bug Fixes

- Buffs with 1 turn duration now correctly end at the end of turn. ([1126](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1126))
- Altering health, experience, system of units, fractional bouses, and coin weight divisor system settings now require refresh to take effect properly. ([2245](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2245))
- Actor spells tab incorrectly displayed `M/DF` and `F/DF` as `M` and `F`.
- Some Prosemirror buttons were rendered wrong. ([2386](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2386))
- Price per charge is no longer shown for items that don't use it for their cost (items that restore charges on their own). ([2455](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2455))
- DR and Energy Resistance were no longer shown in the Defenses card ([2745](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2745))
- Minimum range selection appeared for range types that it didn't apply to. ([2756](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2756))
- Applying damage with Wounds & Vigor behaved unexpectedly. ([2786](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2786))
- Some change and action update and creation operations could create them with excess or invalid data.
- Spell description range formula was not resolved. ([2895](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2895))
- Truesight renamed to true seeing and boolean toggle converted to explicit distance. ([2912](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2912))
- True seeing now grants basic sight within its range. ([2912](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2912))
- True seeing no longer grants see invisibility past its operational range. ([2912](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2912))
- Container sheet price input field behaved inconsistently with other items. ([2948](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2948))
- Single use for non-physical items is no longer valid and is migrated to one non-replenishing charge. ([2965](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2965))
- Consumables are now generated with full spell description. ([647](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/647))
- Non-GM may now link journal entries to custom skills.
- Players could not see previously visible chat card targets after refresh.
- Negatively sized ability templates are no longer allowed.
- Zero sized ability templates cancel usage instead of erroring.
- Toggling off use custom tag left the old tag lingering. ([2318](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2318))
- Re-organizing items in containers was not working. ([2676](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2676))
- Range tooltips for attacks will now default to "ft" as a sensible unit. ([2764](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2764))
- Level up button became stuck once max level was reached.
- LLV was not disabled with custom vision. ([2640](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2640))
- Physical items are now unidentified by default where appropriate when added to NPCs. ([2855](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2855))
- Chat card save button silently fails with no token selected but user having configured character. ([1148](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1148))
- Health configuration did not allow sane handling of maximized hit dice. Manual re-adjusting of health configuration may be necessary.
- Allowed circumstance bonuses to stack by default. ([1287](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1287))
- Chat card targets now display CMD for combat manoeuvres. ([1447](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1447))
- Multiple editors could be opened for the same script call. ([1582](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1582))
- CL option was missing in conditional modifiers, now located under effects. ([1585](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1585))
- Extra ACP penalty from broken armor/shield no longer affects non-skill rolls. ([1796](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1796))
- Power Attack Critical Multiplier in actions was ignored. ([1809](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1809))
- Players no longer see empty targets list in chat cards when no targets are visible. ([1842](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1842))
- Child link chains behaved strangely. ([2073](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2073))
- Opening another entry selector would close the old, scrapping ongoing edits. ([2200](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2200))
- Multiple sources granting same custom proficiency would duplicate it on actor attributes tab. ([2284](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2284))
- Non-system actors could not toggle conditions. ([2378](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2378))
- Mythic tiers were incorrectly accounted for feat counts. ([2392](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2392))
- Actor sheet combat tab damage formulas could display wildly wrong values. ([2438](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2438))
- Condition names could (still) be untranslated after refresh until actor was refreshed again. ([2443](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2443))
- Large tokens did not count as being within a template if their center wasn't. ([2499](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2499))
- Fixed multiple issues with consumable creation. ([2536](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2536))
- sizeRoll() would not convert certain dice correctly or at all. ([2579](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2579))
- Action Selector dialog would scrap ItemPF.use() options. ([2602](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2602))
- Using Action Selector dialog would cause chat cards to lose range highlight. ([2601](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2601))
- Size deficient Constructs received incorrect bonus health. ([2651](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2651))
- Action sheets were not closed for user if another user deleted the viewed action. ([2728](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2728))
- Deleting a viewed action could cause errors about missing action.
- ⚠️ `@classes.X.level` now is affected by negative levels to allow negative level rules to work correctly. Undrained level is accessible as `@classes.X.unlevel`. ([2750](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2750))
- Minimum range highlight was incorrect for reach weapons. ([2755](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2755))
- Power Attack multiplier override in actions was nonfunctional. ([2761](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2761))
- Coin values were randomly stored as strings instead of numbers, causing various issues. ([2763](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2763))
- Players can now view script calls even if they lack edit rights for them. ([2779](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2779))
- Actions no longer allow empty unspecified choice for their type, defaulting to other if not present. ([2787](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2787))
- Legacy operators were not migrated and could cause Changes to misbehave. ([2790](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2790))
- Item sheet Changes tab failed to keep scroll position. ([2798](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2798))
- Max uses was displayed incorrectly on actor sheet for non-physical items with limited usage set to single. ([2804](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2804))
- Adjusting health would sometimes fail. ([2812](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2812))
- Toggling primary attack in attack dialog did not adjust damage multiplier to pre-configured default in action. ([2851](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2851))
- Secondary natural attack damage preview was using ability multiplier for primary attack in combat tab. ([2852](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2852))
- Per Charge cost was calculated incorrectly for wands with costly material components. ([2860](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2860))
- Physical items were being added to `@resources`. ([2861](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2861))
- Context notes targeting All Skills would print the note twice for subskills. ([2874](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2874))
- Cone templates behaved strangely with unusual angles. ([2907](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2907))
- Mindless creatures no longer incorrectly receive skill ranks from HD. ([2928](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2928))
- Classes with skills per level set to 0 incorrectly gave 1 instead due to conflict with minimum ranks rule. ([2928](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2928))
- Mindless creatures no longer incorrectly receive feats from hit dice. ([2928](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2928))
- Specific skill change target list is now always alphabetically sorted in all languages. ([2929](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2929))
- Stack of charged items with partially charged item on top evaluated its own value as if all items in the stack had partial charges. ([2940](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2940))
- Item summaries shown in actor sheet could sometimes fail to display correct data. ([2947](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2947))
- Quick actions could display Infinite/Infinite, 0/0, NaN/NaN or other very inaccurate statements in certain circumstances. ([2950](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2950))
- Cowering did not apply Dex Denied to AC penalty. ([2979](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2979))
- Critical confirmation bonus is no longer pre-evaluated, preserving any dice rolls present. ([3065](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3065))
- Concentration bonus is no longer pre-evaluated, preserving any dice rolls present. ([3066](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3066))
- Token tooltip configuration in actors had little effect for what was shown on the tooltips. ([3104](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3104))
- Clearing some numeric values would cause odd behaviour. ([965](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/965))
- Added Ability Scores feature from leveling had invalid description.
- Ability damage was incorrectly displayed as ability score modification in source breakdown.
- Actionless item with charges could be activated with no charges remaining.
- Tokens with no actor errored on attempting to assign conditions to them.
- Stunned condition did not deny Dex to AC ([2981](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2981))
- Dex denied to AC did not correctly deny dodge bonuses to AC also. ([2980](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2980))
- Dice rolls in most change formulas are now maximized with exception of deferred rolls (damage and skill checks).
- CMD incorrectly listed wound threshold source twice.
- Fixed parsing of custom energy resistances
- FCB health bonus was not correctly added to max health for non-base classes with manual health configuration in use.
- Nonlethal damage and temporary hit points have been restored to token and combatant tracked attributes.
- Actor pre-update would sometimes error.
- Level-up card could display incorrect number of new feats. ([2127](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2127))
- Quick actions did not display remaining ammunition in actor sheet.
- NPC classes can now have favored class bonuses (FCB).
- Deleting a race could cause harmless errors to appear for other users.
- refreshActors() was too intense, making some setting toggles lag Foundry heavily. ([2611](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2611))
- Token secret disposition was not respected by token tooltip.
- sizeRoll() behaved poorly with 1d1
- Various sheet inputs could cause the layout to twitch. ([831](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/831))
- Measured template targeting could sometimes fail to get correct targets.
- Wound Thresholds did not correctly affect caster level.
- Loot sheet did not display the value of items inside containers.
- Added mitigation to change ID conflicts by increasing their uniqueness across items, reducing chances of nonfunctional changes.
- Held option was renamed to power attack mode in attack dialog to reflect its actual function. ([1117](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1117))
- Held option is hidden in attack dialog for attacks for which it has no function for. ([2955](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2955))
- Charge sharing was not properly cleared when master item was deleted.
- Token.toggleEffect() ignored the active parameter in number of cases.
- ⚠️ ScriptCall.execute() extraParams option was incorrectly passed to the scripts.
- Broken condition was ignored for Attack items. ([2820](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2820))
- Dragging actors from sidebar did not reflect correct token size. ([1935](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1935))
- Template targeting could sometimes arbitrarily fail with no targets. ([2537](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2537))
- Vision sharing controls were nonfunctional. ([3078](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3078))

### Changelog

- Users can now adjust quantities by 5 (hold shift key) or 10 (hold control key) ([1042](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1042))
- Added Spell and Feature as additional in-built buff types. ([1077](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1077))
- Buff durations now can be configured more precisely when they end, at turn start (default), on initiative, or turn end. ([1126](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1126))
- Added limited uses per round option, which recharges at start of your turn. ([2732](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2732))
- Added Natural Reach to Change targets. ([1139](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1139))
- Links sub-tab defaults to class associations or charges instead of children where possible. ([1240](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1240))
- Dwarf-like encumbrance split into unaffected by medium/heavy encumbrance. ([1268](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1268))
- Added quadruped toggle to race that actors inherit. Actor sheet allows overriding this separately. ([1279](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1279))
- Boolean flags are now available in roll data via `@bFlags.FLAGNAME`. ([1487](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1487))
- Action measure template color and texture usage no longer require extra toggle to be enabled. ([1559](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1559))
- Actions can now define per-attack ammo cost. ([1597](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1597))
- Added performance configuration dialog.
- Hide Reach Measurements setting has been removed in favor of max reach highlight setting. ([1604](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1604))
- Holding ALT while drag&dropping item to actor sheet creates that item as unidentified regardless of its original state. ([1708](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1708))
- Added module integration options. ([1813](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1813))
- Use prototype token scale as multiplier on character size scale. ([1824](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1824))
- Actions may override item's held option. ([1837](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1837))
- Action use now automatically selects cheapest appropriate ammo as default ammo if no default ammo has been chosen. ([1861](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1861))
- ⚠️ Limited uses now defaults to unlimited instead of undefined. ([2022](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2022))
- Armor & shields separated from equipment in actor sheet inventory. ([2037](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2037))
- Spells and abilities can be marked as harmless. ([207](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/207))
- ActorPF.getSkillInfo() and ActorPF.rollSkill() now take simpler subskill IDs without the superfluous `.subSkills` part. ([2093](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2093))
- Incorporeal condition now correctly grants deflection bonus to AC. ([2098](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2098))
- Use relative UUIDs for AEs to remove secondary updates on unlinked tokens. ([2124](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2124))
- Items are automatically recharged when reducing stack quantity and charges were fully depleted to simulate stack of charged items. ([2191](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2191))
- Record spell types in spellbooks. ([2262](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2262))
- Display M/F/DF components as M/F or DF according to spellbooks spell type. ([2262](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2262))
- Rest dialog can be skipped by holding the skip dialog button. ([2263](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2263))
- Items can now be used without an actor. ([2269](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2269))
- Buff start time is now included in toggle script calls as `startTime` and in CRUD context as `context.pf1.startTime` allowing elapsed duration to be determined. ([2327](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2327))
- Added details and changes tabs to containers. ([2373](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2373), [1160](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1160))
- Scrolls and some other consumables now distinguish arcane, divine, etc. types. ([2394](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2394))
- Class casting configuration now includes domain slot info. ([2503](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2503))
- Physical items with hit points equal or less than half will automatically behave as if broken. ([2517](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2517))
- Class hit die size selection now is constrained to actual die sizes. ([2527](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2527))
- Overland speed is displayed in movement speed tooltips. ([2535](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2535))
- Split stack dialog redesigned. Multiple inputs for stack control and better feedback on results. ([2591](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2591))
- Automatically open item sheet when such is created from scratch on actor sheet. ([2592](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2592))
- Action power attack multiplier override now displays inherited multiplier when undefined. ([2616](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2616))
- Distinguish disabled feats. ([2626](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2626))
- Token effect icon handling improved, especially when toggling visibility of all conditions. ([2636](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2636), [2637](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2637))
- Caster Level and Concentration checks are now accessible via spell chat card context menu. ([2642](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2642))
- Relevant condition are now shown when printing an actor's defenses. ([2658](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2658))
- Relevant conditions are now shown in action card footers. ([2657](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2657))
- Migration dialog automatically opens for on-login migration. ([2659](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2659))
- ACP is now also shown on skills tab. ([2678](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2678))
- Physical items dropped onto actor sheet from compendium or items directory will have their size automatically adjusted to match the actor. ([2698](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2698))
- Added tooltips to item sheet price and weight to clarify the values. ([2715](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2715))
- Background skills now show separate list of sources from adventuring skills. ([2716](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2716))
- Added materials and alignments to chat card info displays for attacks and weapons ([2733](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2733))
- Spell points, buff levels, item charges (not in containers), skill ranks, feat charges, and attack charges now accept relative values. ([2769](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2769))
- Default selection in feature type is now Natural instead of empty. ([2770](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2770))
- Changes can now be drag & dropped between items. ([2827](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2827))
- Added duplicate button for changes.
- Added critical multiplier conditional target. ([288](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/288))
- Add class dialog and level-up dialog were merged into new redesigned level-up dialog. ([2882](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2882))
- GM leveling a character with no player owner now defaults to private message. ([3018](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3018))
- Spells now use same duration configuration as everything else. ([2892](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2892))
- Added action usage to gear item type. ([2925](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2925))
- Condition source is displayed with conditions if other than actor. ([2933](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2933))
- Magic and Epic added as new material type addons ([2954](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2954))
- Ability damage multiplier now has Held option to inherit multiplier based on held setting. ([2964](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2964))
- Inline rolls in actor and item sheet descriptions are no longer rolled when displayed on sheet. ([2989](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2989))
- Actor sheet inventory columns made uniform. ([2995](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2995))
- Formula fields now give better feedback when they're invalid. ([3058](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3058))
- Actions can now define maximum ability modifier to damage. ([3071](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3071))
- Simple warning for missing or excess feats is now displayed at bottom of feat listing. ([3072](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3072))
- Check only modifiers are now displayed in ability score tooltip. ([3103](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3103))
- Max Dex effect of armor and encumbrance is now displayed with AC breakdown. ([2435](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2435), [3145](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3145))
- Containers now have flat weight reduction possibility. ([318](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/318))
- Prestige classes can now define favored class bonuses. ([482](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/482))
- Weapon proficiencies are now automatically matched. ([484](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/484))
- Added misfire input field to items and actions. ([628](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/628))
- Added optional cost parameter to ItemPF.use() to override charge/slot cost. ([703](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/703))
- Weapon, armor and shield weight is now automatically adjusted based on item size. ([707](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/707))
- Identified toggle moved to sidebar with equipped and carried toggles in item sheets. ([748](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/748))
- Added Critical Hits context note target. ([916](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/916))
- Added slow-firing and semi-automatic weapon properties.
- Added splash action property ([3013](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3013))
- Added material types to weapons, attacks, and actions; expands DR support for actors
- Added Actions help browser page.
- Script calls now include `action` parameter directly in script scope when appropriate.
- Added capacity field to item ammo configuration. Has no in-built function yet. ([2342](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2342))
- Duration in spells, abilities and such now has concentration and dismissable toggles. These for now have no notable function.
- Added many additional subtypes to loot items to cover mundane items. ([2337](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2337))
- Added circle reach highlights for non-square grids
- Trait selectors are now openable on uneditable item sheets.
- Content links on actors are now generated as relative links where possible. ([2210](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2210))
- Players can now see unidentified description for identified items. ([2844](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2844))
- Alter item.size in roll data to match actor size if the item is resizing. ([2180](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2180))
- Added BAB override option to actions. ([2530](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2530))
- Action targeting now ignores tokens with secret disposition. ([2975](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2975))
- Removed custom toggle from item identifier.
- Change editing is now done via separate dialog.
- Changes can now be sorted.
- Chat card header now changes pointer to signal that it is interactable.
- Added starting wealth and alignment fields to class details. ([2156](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2156))
- Containers now allow expanding items to view their summary like the actor sheet.
- Added cursed, timeworn and artifact quality toggles to items. ([834](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/834), [1937](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1937), [2395](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2395))
- Added custom item creation dialog for improved clarity on item type choice and immediate selection of subtype. ([2052](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2052))
- Added implant item type with cybertech subtype. ([489](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/489))
- Activation type defaults to nonaction and empty selection removed. ([2024](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2024))
- PC and NPC default disposition can be overridden.
- Added Alignments to weapons and attacks
- Item links can now be dragged off like normal items.
- Drag interactions from compendium browser now turn the browser transparent and allow dropping the items through the browser into underlying sheets.
- All source detail tooltips replaced with dynamic Foundry tooltips. ([2310](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2310))
- Enhanced available information via label tags in actor sheet item summaries. ([2961](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2961))
- ItemPF.use() accepts additional use options to toggle power attack and other options available in the use dialog. ([703](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/703))
- Features without actions have usage displayed as Passive on actor sheet. ([2880](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2880))
- Integrated system styling with Foundry's font scaling. ([1188](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1188))
- Single/Full attack option is displayed for all items with attacks instead of being limited to attacks and weapons. ([1259](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1259))
- Incorporeal condition now sets natural armor to 0. ([206](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/206))
- Entry selectors improved in terms of labeling, re-opening, and allow editing multiple things at once.
- Added caster class level offset configuraton to classes. ([2691](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2691))
- Armor proficiency matching now uses armor base types instead of the identifier for extended matching. ([2737](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2737))
- Roll tooltip styling changed to help with long flavors and added consistent sign symbols. ([3008](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3008))
- Container's item summary now displays contents value and coinage. ([549](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/549))
- Armor class is now included in token and combatant tracked attributes. ([1952](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1952))
- Containers and certain loot item subtypes now require equipping for full effect.
- Action extra attacks segment now has easy configuration for chained and unchained flurry of blows. ([3049](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3049))
- Added a new sheet and actor type for Haunts ([2307](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2307))
- Added a sheet and actor type for traps. ([2307](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2307))
- Added a new sheet and actor type for Vehicles. ([2307](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2307))
- Added global rules-based vision toggle in system settings to no longer need to toggle custom vision for each token individually. ([2039](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2039))
- Destroyed items show as disabled and do not count as active. ([2145](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2145))
- Attack dialog ammo selection is now more informative when no ammo is selected. ([1633](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1633))
- Non-slotless wondrous items are now auto-unequipped in containers.
- Improved domain slot presentation so it's clearer how many spells you actually can have. ([2353](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2353))
- Actor sheet now automatically swaps to relevant tab when drag&dropping items in. ([2932](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2932))
- Level-Up dialog UX and update handling improved.
- Spellbook choice in spells no longer shows disabled spellbooks and is hidden when viewing spells without owning actor. ([3164](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3164))
- Experience Distributor improved.
- Item sheets now display default ammo and allow configuring default ammo type. ([2431](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2431))
- Buffs now have simple interface for imparting conditions when enabled. ([2250](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2250))
- Items can now contain supplement links to other items that are added alongside them to actors. ([561](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/561), [682](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/682), [722](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/722), [1040](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1040), [1792](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1792))
- Added AC, CMD and BAB to NPC lite sheet ([245](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/245))
- Added polymorph selection to condition immunities. ([2959](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2959))
- Migration now includes a progress dialog with secondary dialog for displaying details about any issues that it may have run into. ([1956](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1956))
- Added natural attack and thrown attack roll change targets.
- Added all ranged damage, all melee damage, and natural attack damage change targets.
- Added melee, ranged, and thrown weapon damage change targets. ([709](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/709), [2086](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2086))
- Item sheet details tab layout heavily modified and cleaned up.
- Actor sheet re-rendering was removed for some inputs when the value was unchanged.
- Added option to disable critical confirmations. A small step towards Armor as DR optional rule. ([437](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/437))
- Creating new or duplicating old items, actions, script calls or other similar instances automatically opens their sheet for editing.
- Clicking a target in chat card pans to that target in addition to selecting them.
- Actions can now define charge cost to be per attack. ([2342](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2342))
- Allow token tooltips to be stickified with a key. No default keybinding. ([1280](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1280))
- Held option is now hidden for ranged weapons as it does nothing for them. ([2955](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2955))
- Obfuscated inline rolls are no longer turned into non-inline rolls.
- Feature and Attack type items can have associated class that is accessible with `@class.level` ([2000](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2000))
- Races now can define their base speed which is applied on actors when the race is added to them. ([2297](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2297), [2644](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2644))
- Added links to condition journal entries on the actor buffs tab where such exist. ([1111](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1111))
- Items can no longer be moved to containers when using the "Give Item" feature.
- Clarified item notes configuration. ([2450](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2450))
- Spellbook configuration now behaves in much more uniform manner whether autoslots are enabled or disabled.
- Ability Penalty added as explicit Change target.
- Token HUD quick actions no longer include noisy prefix in names.
- ⚠️ Script change support has been removed.
- Replaced spellbook problem message with info boxes so multiple issues can be displayed at the same time.
- Level Drain on attributes tab has been relabeled to Negative Levels. ([1554](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1554))
- Added lookup() roll function. ([2033](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2033))
- Added ifelse() and if() roll functions. ([1874](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1874))
- sizeReach() roll function was converted into a term, fixing several issues with it.
- Added Post-Use script call category.
- Proficient toggle in items now defaults to false ([2991](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2991))
- Item sheets redesigned to include an always visible sidebar with all items. Several more toggles moved to the sidebar. Information from header was consolidated to the sidebar. ([2221](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2221))
- ⚠️ Spell roll data `@classLevel` is now `@class.level` to match other similar cases.
- Added Caster Level and Concentration change targets for specific spellbooks. ([135](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/135))
- Added CL and DC change targets for specific spell schools. ([468](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/468))
- Buffs and Spells tab positions have been swapped. ([2680](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2680))
- Trait selector (language, proficiency, etc. selector) now has tag-like handling for custom entries.
- Added @Ability, @Action, @Apply, @Browse, @Condition, @Damage, @Heal, @Skill, @Save, and @Use custom text enrichers.
- Regular users can now do world migration for their owned content. ([2410](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2410))
- Added _Base Vision Permission_ setting to control whether you need observer (Foundry default) or owner rights on actor to see with them. ([900](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/900))
- Actor sheet item weights display tooltip with base, stack and contents weights.

### Compendium

- Added Long Arm buff.
- Enhanced actions of coin shot spell. ([2646](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2646))
- Added missing tags for rogue talents. ([2653](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2653))
- Added rare material components for spells. ([2660](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2660))
- Added missing armor proficiency flag for magus class features. ([2668](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2668))
- Added warpriest spell association for cleric spells up to level 6. ([2687](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2687))
- Added exchange spell class feature for spontaneous spellcasters. ([2748](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2748))
- Hourglass, Tent and Whistle were split into distinct items. ([2762](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2762))
- Added missing racial languages. ([2815](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2815))
- Harmonized wild empathy description and added bonus feat association to endurance class feat. ([2842](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2842), [2836](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2836))
- Improved barbarian rage powers and class association. ([2849](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2849))
- Removed unclear context note of cleave feat and added actions to cleave and greater cleave. ([2871](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2871))
- Fixed bad html formats in packs ([2889](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2889))
- Added missing damage formula for call lightning spell. ([2890](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2890))
- Added table of favored enemies and available combat styles to ranger class features. ([2897](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2897), [2838](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2838))
- Split telescope into separated items based on magnification. ([2946](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2946))
- Added missing actions to burning and thorny entanglement. ([2978](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2978))
- Added tags for oracle mysteries and revelations. ([3000](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3000))
- Separated several adventuring gear items that were combined in a single item. ([3025](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3025))
- Fixed incorrect calculation of will bonus in rage buff for chained barbarian. ([3029](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3029))
- Changed HP per mythic tier to use standard HP feature instead of change. ([3035](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3035))
- Harmonized entries for evasion class feat and added missing monk (UC) class association. ([964](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/964))
- Added animal category and different mounts from ultimate equipment items.
- Added cantrips, knacks and orisons class abilities to classes.
- Added missing inquisitor class association to domains, subdomains and some domain powers. ([3138](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3138))
- Added some more magic items (Frost Brand, Gauntlet of Rust, Horn of Blasting, Bag of Tricks, ...).
- Added measure templates to pit spells.
- Added ranger combat styles. ([2841](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2841))
- Added roll tables for timeworn glitches in technology and numerian fluid.
- Added supplement formula and spellbook to classes ([3024](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3024))
- Add swashbuckler deeds and update swashbuckler class feats. ([2966](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2966), [2967](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2967))
- Added technological feats from tech guide and iron gods AP.
- Updated throwing weapon actions. ([2552](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2552))
- Added wondrous containers like bag of holding, portable hole, etc.
- Harmonized Trap Sense, Danger Sense, Trap Finding and Fast Movement class abilities. ([2972](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2972))
- Harmonized feat formatting, added combat trick tags and removed PFS tag from feats. ([2724](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2724))
- Removed PFS tag from packs ([2638](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2638))
- Updated sources, actions and class associations of bloodrager class features.
- Updated hunter class-features and associations.
- Several improvements to the investigator class features.
- Added tags and new feats for several ninja, rogue, slayer, alchemist and investigator talents. In addition overlapping entries were harmonized and class associations maintained. ([2832](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2832), [2831](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2831), [2834](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2834), [2835](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2835))
- Updated alchemical power components.
- Updated and added missing alchemical splash weapons. ([3011](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3011))
- Updated icons and actions of various alchemist bombs. ([3097](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3097))
- Update class kits and included items. ([3012](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3012))
- Updated dark tapestry mystery. ([2998](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2998))
- Moved Adventuring Gear, Kits and some other items to separated subfolders in items compendium.
- Update and harmonize several Monk and Monk (UC) class features.
- Added Sources, updated icons, fixed formats and harmonized description of race compendium. ([2893](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2893), [2887](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2887))
- Updated shaman class features (except for spirits).
- Updated skald class and some minor enhancement to associated features. ([2896](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2896), [2888](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2888))
- Updated slayer class features with correct actions, sources and class associations.
- Reorganized some tools and recreated belt pouch and spell component pouch as containers. ([1160](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1160))
- Added aura and changes to containers.
- Added bloodline feat and bloodline spells as separated class feats for sorcerer and bloodrager. ([2280](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2280))
- Added compendium links to feat prerequisites. ([2648](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2648))
- Added inline rolls for spells which requiere d%. ([3179](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3179))
- Added familar class and features. ([3153](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3153))
- Added haunted subschool and spell descriptors ([2743](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2743), [2742](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2742))
- Added missing investigator class association to alchemist formulas ([2996](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2996))
- Added Power Component tag to relevant items to ease finding them. ([2710](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2710))
- Added secondary actions to channel features. ([3096](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3096))
- Added missing channel haunt medium class feature and fixed incorrect class association. ([3098](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3098))
- Added spellbooks class feature to wizard, magus and arcanist class.
- Added penalty on attack rolls to tower shield. ([2943](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2943))
- Added variant aasimar and tiefling abilities roll tables.
- Added Finesse property to all applicable weapons ([2799](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2799))
- Added backpack variations and sources.
- Age category templates had invalid changes for age effects on physical ability scores. ([1731](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1731))
- Paladin, Antipaladin and Ranger now include casting class level offset. ([2691](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2691))
- Fixed max range increment of many ranged weapons which was incorrectly set to 1. ([2753](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2753))
- Added missing revised action economy activation data to over 500 items. ([2701](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2701))
- Removed redundant instances of black powder and powder horn in items and weapon compendium.
- Added missing damage formula to boneshaker spell ([2949](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2949))
- Fixed Unchained Rage giving invalid bonuses at level 1.
- Added sources to fighter class abilities and added armor training (heavy armor).
- Added 81 missing spells to investigator spell list.
- Moved technology content from pf-content module to system.
- Changed Uncanny Dodge to no longer alter FF AC/CMD. ([3083](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3083))
- Added concealment, total concealment and confusion roll tables. ([3015](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3015))

### API

- Enhanced ability to pass arbitrary data from dialogs. ([1242](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1242))
- ⚠️ Action measure template data format changed, `customColor` is now `color` and `customTexture` is now `texture`. ([1559](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1559))
- ⚠️ Action ammo type data and chat card ammo recovery data has been changed. ([1597](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1597))
- ⚠️ ItemPF.firstAction is deprecated in favor of ItemPF.defaultAction ([1763](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1763))
- D20RollPF dialog now has more context data: speaker and D20RollPF reference. ([1946](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1946))
- ⚠️ conditions, conditionTextures, and conditionMechanics in CONFIG.PF1 are deprecated in favor of pf1.registry.conditions ([2013](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2013))
- ⚠️ Action area renamed from spellArea to area. ([2020](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2020))
- ⚠️ Change and Context note skill targets no longer include `.subSkills` between main skill ID and subSkill ID. ([2093](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2093))
- ⚠️ Script call `shared.attackData` contents are now directly in `shared` ([2134](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2134))
- Attack messages now include used ammo info in their metadata. ([2361](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2361))
- Spell description is once again stored in .description.value like all other items instead of .shortDescription ([2369](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2369))
- ⚠️ ActorPF.createAttackFromWeapon() deprecated in favor of ItemAttackPF.fromItem() ([2409](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2409))
- ⚠️ ItemPF.defaultContextNote() deprecated in favor of pf1.components.ContextNote ([2422](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2422))
- ⚠️ pf1.utils.canvas.getConditions() was moved to pf1.utils.init.getConditions() ([2500](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2500))
- Added ItemPhysicalPF.isBroken getter to determine broken status. ([2517](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2517))
- Added @spellbook to spell roll data. ([2545](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2545))
- Added intermediate ItemPhysicalPF class that all physical items inherit. ([2563](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2563))
- ⚠️ ActorPF.mergeCurrency() deprecated in favor of ActorPF.getTotalCurrency() ([2589](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2589))
- ⚠️ ActorPF.getTotalCurrency() parameters changed. ([2589](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2589))
- Added ActorPF.getCurrency() which does what old ActorPF.getTotalCurrency() did. ([2589](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2589))
- ⚠️ Active Effects tracking buffs are now stored on the buffs themselves. ([2612](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2612))
- ⚠️ ActionUse.getMessageData() is now async
- ⚠️ ItemPF.getChatData() and ItemAction.getChatData() now only takes one parameter. The old first parameter is no longer used and the function no longer auto-enriches contents. ([2731](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2731))
- Added showInAction and showInDefense booleans to condition registry entry datamodel to control inclusion in Defense and Action chat cards
- ActorPF.getSkillInfo() now returns associated journal entry for built-in skills, too. ([2725](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2725))
- ⚠️ Weapon proficiency IDs are now simple and martial instead of sim and mar. ([2738](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2738))
- ItemAction.getRange({type:"min"}) no longer always returns 0 for reach if min range is undefined, but instead returns melee range ([2754](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2754))
- Added ItemAction.canUse getter which returns false if any known use limitation criteria fails. ([2803](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2803))
- Added ItemBasePF.canUse getter which returns very basic usability state of the item.
- ItemSpellPF.canCast has been deprecated in favor of the canUse getters on items and actions.
- Sheet item sections are now configurable via `pf1.config.sheetSections` ([2944](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2944))
- ⚠️ pf1.utils.chat.createInlineRollString() is deprecated with no replacement. ([3032](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3032))
- Ability templates now store reference to the item and action that caused their creation. ([2197](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2197))
- ⚠️ `flags.pf1.abundant` moved to `system.abundant` ([2902](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2902))
- ItemAction.update() now correctly passes its update options param along to the item update call.
- Added ItemPF.getProficiency() for retrieving proficiency status. ([2117](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2117))
- Added getName() and getId() (for system identifier) helper functions to actor.itemTypes type arrays.
- ⚠️ ActionUse.addEffectNotes(), ChatAttack.addEffectNotes() and ChatAttack.setEffectNotesHTML() are now async
- Active Effects when created now record their initiative value when owning actor is in combat. ([1126](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1126))
- Added CombatPF.initiative getter for fetching current initiative value.
- Added ActorPF.getCombatants() for fetching relevant combatants for the actor.
- Added `pf1.utils.parseAlignment()` to parse alignment string.
- Added TokenPF.getOccupiedCells() function.
- Added TokenPF.isSquare getter.
- ⚠️ ChatAttack.setAttackNotesHTML() is now async
- ⚠️ ChatAttack.addAttackNotes() is now async
- Added `pf1PreAttackRoll` and `pf1AttackRoll` hooks.
- Targeted tokens are now present in action shared metadata object and modifiable within script calls.
- Chat message metadata now includes scene ID to properly retain targeted token ID relation and similar.
- Added source book registry. ([2671](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2671))
- ⚠️ Handling of items in containers has been reworked completely. ([2273](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2273))
- ⚠️ Actor's and Item's languages, di, dv, ci, weaponProf, armorProf, descriptors, and weaponGroups custom values are now stored as an array instead of strings.
- ItemPF.use() `actionID` parameter deprecated in favor of `actionId` ([2069](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2069))
- ⚠️ ItemPF.getLinkItem() and ItemPF.getLinkedItemSync() are now deprecated in favor of fromUuid()
- ⚠️ RollPF.safeTotal() is deprecated in favor of RollPF.safeRoll().total
- ⚠️ ItemSpellPF.getEffectiveSpellLevel() and ItemSpellPF.getEffectiveCasterLevel() are both deprecated in favor of ItemSpellPF.spellLevel and ItemSpellPF.casterLevel respectively.
- ItemSpellPF.getDC() is deprecated in favor of ItemAction.getDC()
- Added `pf1CombatTurnSkip` hook with list of skipped combatants when such occur.
- Added ActorBasePF.activeOwner to retrieve first appropriate player owner or GM suitable for running updates on.
- ActorPF.rechargeItems() now accepts period configuration and passing additional options to ItemPF.recharge()
- ⚠️ Actor resources no longer include spells
- ItemPhysicalPF.getValue() now has `identical` and `maximized` options for aiding various use cases.
- ⚠️ Experience config data structure converted into DataModel and some option internal names changed. ([2615](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2615))
- Currency conversion function `pf1.utils.currency.convert()` is now exposed.
- Currency splitting function `pf1.utils.currency.split()` is now exposed.
- D20Roll and attack chat cards now include combat reference in metadata.
- ⚠️ pf1.config.spellComponents now uses long form keys. ([1541](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1541))
- ⚠️ MeasuredTemplatePF.getHighlightedSquares() deprecated in favor of MeasuredTemplatePF.\_getGridHighlightPositions()
- ItemSpellPF.canCast could have incorrect return value depending on charge cost. ([2802](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2802))
- pf1.roll.d20Roll() roll mode parameter no longer prevents roll mode selection in roll dialog. ([2927](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2927))
- ⚠️ ~skillMods change target was removed. ([3102](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/3102))
- ⚠️ pf1.applications.ActionChooser renamed to pf1.applications.ActionSelector
- Action's update() function can now perform deletions as per Foundry's update syntax.
- ⚠️ `ItemPF.getAttackArray()` and `ItemPF.attackArray` are now deprecated in favor of ItemAction.getAttacks()
- ⚠️ `{{actionAttacks}}` HBS helper is deprecated with no replacement.
- ⚠️ AttackDialog constructor parameters revamped completely, taking only ActionUse instance as notable param. No backwards compatibility provided.
- ⚠️ knownUnused in spell level data consolidated to known.unused
- ItemBuffPF.recharge() override removed, allowing buffs to be recharged.
- Currency merging function `pf1.utils.currency.merge()` added.
- ItemChange.create() now correctly returns only the newly created changes instead of all.
- ItemPF.maxCharges could return invalid value. It now returns Infinity when item has unlimited or unconfigured use limit.
- ⚠️ Almost all migration functions are now async.
- Added ItemBasePF.activeState getter to pair with setActive() as isActive could return a state unrelated to what setActive() changes.
- ⚠️ MeasuredTemplatePF.getTokensWithin() and ActionUse.getTargets() are now async.
- `pf1.config.casterProgression` is now more permissive of abnormal configurations with hybrid and prestige.
- ⚠️ Conditions are now fully tracked via active effects. ([2091](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2091))
- Added pf1.utils.getActors() generator function.
- ItemPF.getValue() now has `single` parameter for retrieving singular item's value regardless of the actual stack.
- ⚠️ ItemContainerPF.getValue() no longer includes the value of contained currency when recursive is not true.
- ⚠️ ItemContainerPF.getValue() passes all options to .getValue() function of contained items when recursive is true.
- ⚠️ actor.getSkillInfo() now returns the skill's defined name. The `fullName` property has been added which will include the parent's name.
- ActorPF.applyDamage() now receives event and element parameters when available.
- Added canEquip getter on physical items. ([2559](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2559))
- ActorPF.applyDamage() now accepts additional parameters: `instances` and `message`.
- `pf1.utils.findInCompendia()` now has docType and disabled options for better filtering. The search functionality has also been improved.
- ItemPF.recharge() no longer checks time period for items with limited uses set to "charges" or "single".
- Added pf1.applications.ExperienceDistributor.fromCombat() for opening and initializing XP distributor from combat instance.
- pf1.documents.duplicateCombatantInitiative() is deprecated in favor of CombatantPF.duplicateWithData() ([2351](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2351))
- ⚠️ Actions no longer have uses ammunition toggle. ([2018](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2018))
- ⚠️ ItemChange `.subTarget` and `.modifier` changed to `.target` and `.type` respectively.
- ⚠️ ItemChange is now a datamodel and ItemChange.data is thus no longer used. Constructor second parameter is also changed due to this.
- Added sheet getter and render() function to action component to mimic Foundry functionality.
- Actor.itemTypes caching moved to ActorBasePF.
- ⚠️ Deprecated pf1.utils.dialog.dialogGetNumber() in favor of the more advanced pf1.utils.dialog.getNumber()
- Added pf1.utils.overlandSpeed() for converting tactical speed to overland speed. ([2535](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2535))
- ⚠️ ContextNote.subTarget is deprecated in favor of ContextNote.target
- ⚠️ pf1.utils.dialog.dialogGetActor is deprecated in favor of the more advanced pf1.utils.dialog.getActor()
- ItemPF.use() now returns the actual result even if it has to go through action selector.
- Footnotes may be modified in script calls via `shared.templateData.footnotes` ([2437](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2437))
- ⚠️ ChatAttack.addAttackNotes() and .setAttackNotesHTML() were removed. Use ActionUse.addFootnotes() instead.
- ⚠️ Toggling buffs via Token.toggleEffect() is deprecated in favor of directly interacting with the buffs.
- ⚠️ Token tooltip interfaces redesigned.
- pf1.config.bonusModifiers is deprecated in favor of pf1.config.bonusTypes ([2320](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2320))
- pf1.config.stackingBonusModifiers is deprecated in favor of pf1.config.stackingBonusTypes ([2320](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2320))
- ⚠️ action.attackParts converted to object from tuple. ([1950](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1950))
- ⚠️ ItemChange support for function operator has been removed with no replacement.
- ⚠️ Invalid `penalty` bonus type was removed.
- ⚠️ Conditions with pf1\_ prefix no longer have it.
- Removed unused get typeColor() from ActorPF. ([1530](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1530))
- ⚠️ Spell preparation.spontaneousPrepared and preparation.preparedAmount both are now preparation.value
- ⚠️ Spell preparation.maxAmount is now preparation.max
- Actor resource data is now served via Resource class with helpful functionality.
- Rest dialog form data is passed through to hooks in full.
- ⚠️ pf1.utils.rollPreProcess._ has been deprecated in favor of pf1.utils.roll._
- ⚠️ Health config continuity string property deprecated in favor of continuous boolean property.
- ActorPF.getReach() now accepts number as size.
- ⚠️ ScriptCall `this` no longer points to the ScriptCall but rather to a Macro delegate.
- ⚠️ ItemScriptCall.getScriptBody() has been deprecated with no replacement.
- ⚠️ ItemPF.totalDurationSeconds removed with no replacement.
- ⚠️ RollPF.safeRoll() is turning async. RollPF.safeRollSync() added to provide sync option for deterministic rolls.
- ⚠️ ItemPF.getRawEffectData() is now async.
- ⚠️ Spell descriptor converted into traits-like model
- Added ItemSpellPF.toConsumableDialog()
- ⚠️ ActorPF.rollCMB() is deprecated in favor of ActorPF.rollAttack({maneuver:true})
- ⚠️ ActorPF.rollAttack() accepted parameters changed.
- pf1ActorRollCmb, pf1PreActorRollCmb, pf1ActorRollAttack, and pf1PreActorRollAttack hooks are no longer used. Normal action hooks will work for what these were for. ([2209](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2209))
- ⚠️ Item links are now all stored as UUIDs. As relative UUIDs for links pointing to same actor.

## 9.6 - 2023-11-22

### Bug Fixes

- Reducing class level did not clean associations until level was reduced below 1 (fix affects only newly added/leveled classes).
- Linking class association to a class stored in compendium would fail. ([2617](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2617))
- d20 parameter of ActorPF.rollInitiative() was ignored if dialog was not skipped.

### Compendium

- Added missing caster level progression to warpriest. ([2647](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2647))
- Added missing class association to oracle only spells.
- Harmonized and improved poison resistance and added poison immunity class feat to investigator and alchemist.
- Fixed wrong class associations in some cleric spells. ([2623](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2623))

## 9.5 - 2023-11-13

### Bug Fixes

- System migration now ignores module introduced types. ([2441](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2441))
- Max charge formulas containing `clamped()` were rejected as nondeterministic ([2472](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2472))
- Nonfunctional Sample Macros have been fixed and the rest spruced up. ([1872](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1872))
- Basic checks could sometimes display excessive precision. ([1011](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1011))
- Level-up messages ignored user's roll mode setting. ([1270](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1270))
- Remaining ammo is once again available in chat cards. ([1383](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1383))
- Token HUD did not open for actorless tokens. ([2404](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2404))
- Deleting an action out of many would always delete the last action. ([2426](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2426))
- Active Effect handling was unpredictable under certain circumstances. ([2429](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2429))
- Some strings became untranslated after refresh. ([2443](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2443))
- Unprepared spells could be cast with spontaneous-like spellbooks. ([2444](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2444))
- Non-GMs could not drag&drop actions to other items.
- Non-GMs could not drag&drop items to containers. ([2453](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2453))
- Non-GMs could not re-order actions.
- Adding dice override to initiative roll would remove all other modifiers. ([2480](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2480))
- Rolling initiative from unlinked actor's sheet would cause all unlinked actors from same source to roll initiative. ([2482](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2482))
- Inherited charges could fail to update under certain circumstances. Existing items experiencing from this need to re-link charge sharing. ([2485](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2485))
- Detection modes were reset even with custom vision enabled, making such work incorrectly if at all. ([2519](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2519))
- Rectangle templates did not detect tokens correctly towards the bottom right corner. ([2522](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2522))
- Ray grid highlight was off grid on scenes with unevenly sized grids (e.g. 75px). ([2531](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2531))
- Charge cost would not be deducted from actionless items if shared.hideChat was set to true in script call. ([2566](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2566))
- Take X did not display a die for the roll with initiative. ([2570](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2570))
- Overriding dice in ActorPF.rollInitative() (e.g. to Take 20) would remove all bonuses. ([2571](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2571))
- Add notes to roll messages about abnormal rolls. ([2572](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2572))
- Item value display would sometimes display unreadable fractions in the loot sheet. ([2586](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2586))
- Fractional Base Bonuses rule incorrectly calculated prestige class saves. ([2594](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2594))
- Dragging actions to hotbar would always error. ([2452](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2452))
- Basic actor type initialization always failed.
- Fix ChatMessage getters referencing invalid system property
- Lazily loaded compendium browser entries were not draggable
- Deleting non-existing item caused errors via attempts to find children of the non-existing item.
- ActorPF.mergeCurrency() returned invalid value if you did not use inLowestDenomination option.
- Module introduced actor and item type initialization is less strict with expectations.
- Attack dialog did not correctly detect natural attacks.
- Toggling NPC proficiencies no longer requires manual re-opening of sheets.
- Armor, shields, and weapons are automatically unequipped when placed in containers. ([2551](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2551))
- Removed action sheet double render.
- Slot label was empty for slotless equipment types (armor, shield and clothing). ([2408](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2408))

### Changelog

- Added androffan language. ([2577](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2577))
- Compendium browser search results of the same fuzzy score are sorted alphabetically
- Added Siege type ammo.
- Added pack unlocking option in troubleshooter.
- Migration now removes unrecoverably invalid skills.
- Add Squeezing condition to Conditions journal.

### Compendium

- Added missing unchained action to spells. ([2371](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2371))
- Added missing shaman spirit hexes. ([2469](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2469))
- Added missing vigilante talents. ([2473](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2473))
- Added compendium link to cure and inflict spells. ([2573](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2573))
- Added missing cleric class feats and class association. ([2596](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2596))
- Added rage buff level scaling. ([2569](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2569))
- Added use per day and reroll use script to improved saving throw feats. ([2581](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2581))
- Added missing class association for monk (UC) and corresponding class features. ([1098](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1098))
- Add missing class association for life link and ward shaman abilities ([2469](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2469))
- Enhance Dragon, Wood, Reaper, Streets and Elemental Mystery. Add class association for all mysteries. ([2461](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2461), [2495](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2495))
- Added missing slayer talents from advanced class guide ([2470](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2470))
- Added spell storing rogue talent and missing tags and class associations from magic tactics toolbox ([2449](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2449))
- Added missing wizard shapechange subschool & school power. ([2478](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2478))
- Added quick study investigator talent ([2434](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2434))
- Added missing unchained rogue class associations for core rogue talents
- Add missing wild empathy cavalier order ability. ([2466](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2466))
- Enhanced rogue talents from elemental master's handbook ([2434](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2434), [2470](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2470))
- Enhanced rogue talents from distant realms campaign setting ([2470](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2470))
- Enhance Rogue Talents from Spymaster's Handbook ([2470](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2470), [2434](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2434))
- Fixed action type for sneak attack class features. ([2550](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2550))
- Fixed weapon proficency typo for shortswords. ([#2547](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/#2547))
- Fixed incorrect naming of several sorcerer class abilities.
- Fix Summoner (UC) class association in class abilities
- Removed incorrect spell charge costs. ([1635](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1635))
- Rename incorrect oracle mystery powers
- Added bonus feat change to rogue's edge (UC).
- Add icons to item compendium from pf content module in preparation of clean up
- Added icons for iconic spells.
- Added missing save, measure template and icon to (greater) grease spell ([2428](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2428))
- Added missing measure template definitions to spells. ([2372](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2372))
- Added missing attack abilities to spell attacks actions in compendium ([2529](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2529))
- Add missing class association for scourge of the enemy class feat
- Added missing class association to Cavalier/Samurai orders ([2467](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2467))
- Added wizard elemental schools. ([2477](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2477))
- Added signature skill feats per skill. ([2584](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2584))
- Added missing psychic class abilities. ([2465](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2465))
- Added ammo types to most ranged weapons.
- Added weapon proficiency to races ([2548](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2548))
- Added max charges to several sorcerer abilities. ([2555](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2555))
- Corrected hardness and HP for Siege Engines ([2556](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2556))
- Adding missing description to some Rams ([2557](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2557))
- Added full descriptions and links to Wizard Schools. ([2561](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2561))
- Migrated some Ultimate Equipment RollTables from Plain Text to Compendium entries ([2564](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2564))
- Restored missing Arcanist's Reservoir and Kineticist Burn recharge formulas. ([2588](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2588))
- fixed weapon proficency to utilize system logics for classes. ([2547](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2547))
- Fixed Damnation Inquisition being incorrectly labeled as domain.
- Fixed Ice Spears spell's actions.
- Added missing ranges to large number of spells.
- Fixed wrong range setting of pepperbox rifle. ([2524](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2524))
- Harmonized quarry class feat for slayer and ranger and added class association for slayer. ([2558](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2558))
- Rename incorrect shaman class abilities
- Fix typo in danger ward class feat
- Fixed missplaced duration info in scoop spell action. ([2541](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2541))
- Removed incorrect charge cost from Bardic Performance. ([2487](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2487))
- Remove redundant shifter class association from wild shape class feat
- Removed incorrect spell storing class feature ([2494](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2494))
- Remove redundant challenge Cavalier class feat
- Remove redundant shifter aspect features
- Fixed incorrect kineticist talent names
- Fix Mammoth's Hide shaman hex name

### API

- ⚠️ CombatantPF.getInitiativeRoll() parameters changed.
- Allow roll data hook to modify DC and charge cost bonus ([2376](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2376))

## 9.4 - 2023-8-3

### Bug Fixes

- Combats could not be cycled.
- Scroll position was not restored in container sheets
- Copy weapon tags to created attack
- Equipment items sometimes required more than one migration
- Darkvision in scene with global illumination would render visible areas grayscale. ([2347](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2347))
- Compendium browser button layout was broken in compendium directory popout. ([2384](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2384))
- Class associations level ordering was inconsistent. ([2390](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2390))
- Other typed equipment displayed invalid slot choices. ([2391](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2391))
- Items added to actors via sheet had inconsistent behaviour on where they would show up.
- Woundrous items appeared as light armor in the item browser
- Limited ownership affected NPC actor sheets for GMs
- Spell effect field moved to usage tab and made it always visible for spells. ([2370](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2370))

### Changelog

- Senses no longer function via actively updating token data. ([2303](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2303))
- Guaranteed vision can now be adjusted via vision range in token settings.

### Compendium

- Fix typo in Cytillesh Bomb name
- Unchained Rogue had chained Rogue's sneak attack. ([2388](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2388))
- Rename arcanist familiar exploit to familiar (ARC) to be in line with other class feats which name is used multiple times in the system.
- Changed arcanist exploits to be uniformly named.

## 9.3 - 2023-7-27

### Bug Fixes

- Spell Browser could not find cantrips if some other filters were active
- Errors while applying Changes are handled more gracefully, preventing sheets from becoming inaccessible. ([2367](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2367))
- Experience distributor dialog was shown to all GMs at end of combat. ([2316](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2316))
- Rolling initiative would fail even for GM if no scene was active and combat was not pre-created. ([2341](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2341))
- Active Effect overlays (e.g. defeated symbol over token) were nonfunctional in Foundry v11.
- ActiveEffectPF.isTemporary could return non-boolean. ([2364](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2364))
- Right click opening of items in containers was very particular on where to click.

### Changelog

- Use learned-at levels for spell level filter ([2366](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2366))
- Add Equipment Type filter to Item Browser
- Resting is now more tolerant of missing data in actions.

### Compendium

- Fixed incorrect or missing data in Heal and Harm spells. ([2363](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2363))
- Fixed class data for Covetous Aura spell. ([2368](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2368))
- Remove duplicate Maneuver Mastery and fix typo in Rakshasa's Fortune

## 9.2 - 2023-7-23

### Bug Fixes

- Enhancement bonuses on armor items were doubled in tooltips ([2355](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2355))
- Skip dialog state is now forcefully reset when window regains focus to help with sticky skip state. ([1572](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1572))
- Multiple issues with trait (language, proficiency, and other) selectors resolved. ([2215](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2215))
- Complex change formulas would display poorly in skill roll breakdown. ([2348](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2348))
- Adjusting class association levels would cause incorrect association to have its level adjusted. ([2349](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2349))
- Measure templates in scenes with uneven grid size would provide incorrect grid highlight. ([2359](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2359))
- Migrating classes with their HP field cleared would fail.
- Character vision setting was ignored for new actors.
- Spell points presented incorrect use interface. ([2358](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2358))
- Token tooltip no longer displayed all items they should. ([2362](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2362))
- Invalid item subtypes no longer prevent item sheets from opening.
- Limited ownership affected actor sheets for GMs
- Token tooltip settings did not react to input ([2350](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2350))

### Changelog

- Improve tolerance of invalid items in containers. ([2352](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2352))

## 9.1 - 2023-7-18

### Bug Fixes

- ItemAction.hasRange returned true when range was set to "none" ([1611](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1611))
- Altering conditional modifiers could brick items and actors. ([2345](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2345))
- Basic actor was nonfunctional.
- Resource formulas on actions did not resolve referenced values

## 9.0 - 2023-7-17

### Bug Fixes

- Source info could be missing relevant entries ([2325](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2325))
- Some system dialogs were missing their CSS identifiers.
- Action sheet could not be opened via edit button from uneditable item sheets.
- Buffs with duration set to turn could last longer than a turn.
- Combatants could sometimes error in .updateResource() call ([2100](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2100))
- Fix weight entry for magic item roll tables ([1250](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1250))
- Token tooltip hide by disposition was one off (e.g. hide non-friendly hid only hostile) ([1943](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1943))
- Token tooltip name always hidden not shown if custom name was not configured ([1942](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1942))
- Buffs with identical image to a condition caused conditions to vanish in token HUD condition selector. ([1205](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1205))
- ItemPF.effect getter would sometimes error. ([1453](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1453))
- Dropping item folder on actors did not work. ([1636](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1636))
- Status icons would duplicate on unlinked tokens if an item was added to the actor. ([1707](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1707))
- Content link :: label overrides. ([1737](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1737))
- Drag & dropping into attack & effect notes was nonfunctional. ([1748](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1748))
- Hide toggle for script calls was nonfunctional. ([1752](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1752))
- Natural attacks would incorrectly multiply their power attack bonus by the ability score multiplier. ([1823](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1823))
- Drag & dropping macro into script calls failed to link it. ([1862](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1862))
- Items were incorrectly always displaying as editable inside containers. ([1863](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1863))
- Rolls made with /heal and /damage did not produce roll sounds. ([1876](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1876))
- HD-based health was granted per class level instead of HD. ([1892](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1892))
- Inline rolls in context note tooltips were no longer unrolled. ([1898](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1898))
- Context notes targeting subskills would under certain circumstances show for other skills. ([1914](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1914))
- Nauseated condition incorrectly applied sickened penalties. ([1925](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1925))
- Critical threats were not marked when not based on a natural 20 ([1922](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1922))
- Newly placed tokens would not be sized correctly. ([1933](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1933))
- Resizing source actor would force that size to unlinked tokens that have their own override. ([1934](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1934))
- Hit Die & Class-based spellbooks ignored any custom name.
- Power Attack Multiplier was sometimes a string ([1948](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1948))
- Action range values sometimes weren't a string ([1951](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1951))
- Hotbar macros created by the system erroring with actor has already been defined message. ([1958](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1958))
- DC tag could show incorrect value when DC was adjusted with conditional modifiers. ([1965](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1965))
- Duplicating items included child links with the duplicate. ([1985](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1985))
- setItemDictionaryFlag() and setItemDictionaryFlag() too strictly slugified their keys, disallowing capital letters. ([1989](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1989))
- Scenes could brick when token had detection mode with no specific mode selected. ([1994](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1994))
- Penalties to AC did not apply to CMD ([2003](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2003))
- Various chat messages displayed source actor name instead of relevant token name. ([2025](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2025))
- Foundry's share to players feature of viewed artwork leaked unidentified item name. ([2034](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2034))
- Eliminated rolls could corrupt determining state of d20 in checks. ([2035](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2035))
- Broken condition on attack did not apply penalty to attack checks. ([2040](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2040))
- Metric could display item weights wrong, especially for stacks. ([2072](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2072))
- Spell special range description was not displayed. ([2075](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2075))
- getSkipActionPrompt() could return undefined ([2077](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2077))
- Active Effects not based on buffs would not actually expire on time. ([2094](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2094))
- CR offset from templates was not calculated correctly ([2136](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2136))
- Conditional modifier charge cost adjustment was not applied if base cost was 0 ([2157](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2157))
- Item activation with no action but only a script call would cause linked resource to be set to an invalid value. ([2207](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2207))
- ItemPF.use() would ignore rollMode and chatMessage parameters when item had no actions.
- Formula simplification could break with certain ternaries. ([2227](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2227))
- Max uses did not reset correctly if cleared ([798](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/798))
- Mythic Paths did not grant any HP with automatic HP enabled. ([953](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/953))
- Line ability template width was supersized with metric. ([1907](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1907))
- Measure template default sizing was ignored. ([1913](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1913))
- Linking charges temporarily could record inherited charge configuration permanently. ([1921](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1921))
- Effects would not expire at correct time for first combatant. ([2164](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2164))
- Effects would not always expire correctly if regular player ended their turn. ([2165](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2165))
- Conditional Modifiers stored excess auxillary data permanently. ([1949](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1949))
- Drag&dropping items from a container to items directory would error. ([2061](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2061))
- Drag&dropping items to and from containers on same actor would leave a copy behind. ([2065](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2065))
- Critial Confirmation rolls highlight on Natural 20 instead of reaching crit threat range again.
- Spell component display was missing material and foci. ([1923](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1923))
- Item sheet layout could behave poorly, especially with scrolling.
- Toggling off darkvision would cause weird vision until vision was updated. ([2110](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2110))
- Nonlethal label was missing from attack cards.
- Race size change could cause permission errors on other users.
- ActorPF.roll\*() function rollMode parameter was ignored when dialog was skipped. ([2306](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2306))
- rollMode could not be overridden in relevant roll hooks if dialog was skipped. ([1396](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1396))
- Spell points max formula provided invalid @classLevel value.
- Targets would not be cleared if hideChat was set to true in script call.
- Targeting portraits displayed actor portrait instead of token image, potentially providing spoilers.
- Token HUD no longer displayed item charges nor ammo.
- Token tooltip was incorrectly unbound on token deletion.
- Scorching Ray had erroneous parenthesis usage in its attack count formula.
- ItemPF.use() rollMode parameter was ignored in many situations. ([2083](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2083))
- MeasureTemplate.getTokensWithin() failed on gridless scenes. ([1931](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1931))
- Initiative dialog roll override was ignored. ([1991](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1991))
- LLV affected only dim light radius. ([1868](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1868))
- Initiative rolls were not rolled asynchronously
- LLV was rendered even for sightless tokens. ([1982](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1982))
- Couldn't transfer currency by dragging between actors ([1726](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1726))
- Modifier keys were not tracked on some buttons ([1845](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1845))
- item.use and d20roll's skipDialog parameter properly handles modifier keys again ([1845](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1845))
- Saving Throws couldn't be skipped by modifier key
- Max charges were not calculated outside of actors. Non-actor dependant values now show correct values instead of 0.
- Abundant ammunition no longer can be recovered.
- Deleting an active buff would send the entire item's data to all connected users.
- Resource variables are no longer displayed in containers with no actor.
- Scent sense is now a numeric range instead of a boolean ([1428](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1428))
- Changing certain system settings caused excessive number of sheet refreshes with other players logged in. ([1486](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1486))
- Tokens would sometimes lack or lose vision. ([1783](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1783))
- Removing senses did not immediately update observed senses on scene. ([1724](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1724))
- Updating a resource via item inheriting it would update also the inheriting item's own (unused) resource value.
- Token effect textures were unnecessarily pre-loaded for the user creating the token.
- Actor sheets were refreshed pointlessly on token update.
- Learned at class level was ignored for spells. ([2160](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2160))
- Secret blocks on items were incorrectly shown to players with less than owner permission.
- Secret blocks on items were not shown on items outside of actors.
- Rectangle measured templates could not determine tokens within them. ([1932](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1932))
- Measured templates could not determine tokens within if PF1 measure style was disabled.
- Action usage details were sometimes incorrectly hidden ([1879](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1879))
- Creating attacks from weapons did not copy over several important pieces of data.

### Changelog

- Has Cantrips toggle is now available without auto-spellslots. ([1023](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1023))
- Sources now show bonus types in tooltips. ([1825](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1825))
- ASF is displayed on attributes tab if relevant to the character. ([1886](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1886))
- Template targeting now ignores defeated tokens. ([2172](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2172))
- Create consumable dialog now has identified checkbox for creating unidentified consumables. ([494](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/494))
- Add aura field to actors ([800](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/800))
- Adds an interface to the Actor sheet to modify DR and Energy Resistance ([450](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/450))
- Added tooltips for various roll data variables that were previously lacking such display.
- Languages and Weapon & Armor proficiencies moved closer to bottom of item sheet details tabs with proper header.
- Added Touch attack option for actions.
- Dragging items out from uneditable sheets is now allowed.
- Spellpoint using spellbooks can prepare spells like normal spontaneous spellbooks. ([479](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/479))
- Changes can target skill groups (e.g. Craft or Perform) to buff all skills in them.
- Magic item table on notes tab is split into identified and unidentified items.
- Magic item table shows unidentified name to GM as a tooltip. ([981](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/981))
- Added Action support to Buff items ([2045](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2045))
- Classes can now automatically configure a linked spellbook ([832](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/832))
- Compendium browsers were reworked ([699](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/699), [732](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/732), [954](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/954), [1105](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1105), [1391](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1391), [1687](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1687), [1775](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1775), [1776](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1776))
- Allow configuring default spellpoint cost in system settings. ([464](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/464), [1992](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1992))
- Rules correct darkvision (dim light no longer turns into bright). ([1791](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1791))
- Defense card can now be popped out. ([1130](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1130))
- Skill rolls now support deferred change bonuses.
- Script Changes have been deprecated
- Attack card properties include attack's enhancement bonus if any. ([492](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/492))
- Token tooltip minimum permission is now configurable, defaulting to Limited (previously Observed)
- Duplicate items use `(#)` suffix instead of untranslated `(Copy)`. ([1880](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1880))
- Haste bonus type added. ([1893](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1893))
- Added missing drag&drop hotbar handlers for initiative, basic attacks, and ability checks. ([2056](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2056))
- Invalid change and context note target IDs are no longer dispalyed as missing and instead are now displayed in their base form. ([2183](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2183))
- Item activation icons replaced with d20 icons ([2113](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2113))
- Print to chat icons replaced with info icons ([2113](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2113))
- Display charge source in item charge configuration.
- Colors for Natural 20, Natural 1, and Critical Threat have been adjusted.
- Replaced basic HTML title attribute based tooltips with Foundry tooltips.
- Drag & dropping actions into macro hotbar now creates an appropriate activation macro. ([2322](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2322))
- Reduce unnecesary tags on chat cards
- Token resizing from actor size change is now batched.
- Chat card description size is now limited. ([2244](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2244))
- Wondrous Items and Clothing are now top level types for equipment. ([2038](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2038))
- Scene scaling defaults to 1.5 m with metric enabled. ([1714](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1714))
- Ammunition recovery chance is now configurable in ammunition, defaulting to 50% ([629](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/629))
- ASF is no longer rolled when printing only spell description to chat. ([2088](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2088))
- Toggling skills lock no longer re-renders the actor sheet.
- Items and Actors now have per type default icons.
- Charge restoration can be customized with recharge formula. ([787](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/787))
- Actor senses handling entirely overhauled. ([2111](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2111))
- Learned At list for spells is no longer shown in activation cards. ([1897](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1897))
- Compendium directory handling synced with v10 properly and compendium lock handling improved.
- Added modifier support to sizeRoll() ([1990](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1990))
- Generated hotbar macros now use fromUuidSync() instead of fromUuid()
- Traits can now define their category (e.g. combat, magic, campaign, etc.) ([442](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/442))
- Added Troubleshooter dialog to the sidebar settings tab.
- Added Untrained Skills change target. ([1807](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1807))
- Weapons and Equipment have now easy proficiency toggle like attacks. ([1455](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1455))
- Added missing `automatic` and `scatter` weapon properties to available choices.
- Added weapon and armor base typing.

### Compendium

- Add Artistry and Lore entries to skill compendium ([589](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/589))
- Update compendium links for conditions in packs ([1773](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1773))
- Add or fix measure templates for spells which target two creatures max 30 feet from each other ([2233](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2233))
- Add missing spells from player companion: blood of the seas
- Add missing spells from Disciple's Doctrine
- Add missing spells from Dwarves of Golarion
- Add schools of magic to rules compendium ([1896](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1896))
- Add tags to race compendium ([2202](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2202))
- Fixed incorrect base weight in class item kits which roughly doubled their weight. ([2043](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2043))
- Restyled race descriptions
- Add Acid Ray class ability
- Add Silverlight spell from Guide to the River Kingdoms ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add Arcanist's missing exploits and tags to the other exploits and greater exploits
- Add Infuse Effigy spell from Land of the Linnorm Kings ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Added item creation feats ([2288](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2288))
- Add missing 3.5 spells ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing roll tables for common level 0 Potions and Oils from Ultimate Equipment ([1250](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1250))
- Add missing spells from Blood of the Ancients
- Add missing spells from Blood of the Coven ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing spells from Chronicle of Legends ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing spells from Pathfinder Comic #10 ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing spells from Elemental Master's Handbook
- Add missing spells from Gods and Magic ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing spells from Heroes of the Fringe
- Add missing spells from Legacy of Fire AP ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing spells from Monster Hunter's Handbook ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing spells from People of the Wastes
- Add missing spells from Potions and Poisons ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing spells from Ultimate Wilderness ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add missing spells from Wilderness Origins ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add Raiment of Command spell from Rise of the Runelords AP ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add Resize Item spell from Giant Hunter's Handbook ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add spells with same name from different sources ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Add swim class skill for aquatic creatures ([2202](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2202))
- Fix typo in Caging Strike class ability of the Imprisonment Inquisition
- Add missing part of the Chains of Justice class ability description
- Add missing Sneak Attack tag to Deadly Range ninja trick
- Enhance energy drained condition description ([2142](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2142))
- Update compendium links for skills in packs ([1773](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1773))
- Gunslinger Deeds split up into seperate class abilities ([2087](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2087))
- Fix typo in Hateful Retort class ability of Anger Inquisition and add tags to the class abilities of the inquisition
- Missing unchained summoner class abilities added and class ability list adjusted
- Fix typos in Rusting Grasp and Vision in Iron revelation, add missing Armor Mastery revelation and add tags
- Add missing class abilities Sneak Attack, Ninja Tricks and Master Tricks of the Ninja class
- Add missing ninja master tricks and tags to existing ninja master tricks
- Add missing Poison Use class ability of the Ninja class
- Add missing ninja tricks and tags to existing ninja tricks
- Remove wrong entries for light and heavy shield (without material) and redundant armor and shield spike entries ([1351](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1351))
- Several additions and fixes regarding Samurai, their class abilities and orders
- Fix name of Time Sight revelation and add tags to other Time Mystery revelations
- Add missing class ability Fearless of Valor Inquisition and tags to the other class abilities of the inquisition
- Add missing revelation Weapon Mastery and add tags to other revelations of Battle Mystery
- Fix name of Wisdom of the Ancestors revelation and add tags to Ancestor Mystery revelations
- Fix missing part of the ability name of World Serpent Totem Unity
- All entries were programmatically cleaned up of bad HTML data and artefacts left over from copypasting. ([2187](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2187))
- fixed short description of scripted hallucination + comp. links
- Added Enlarge Person and Reduce Person buffs.
- Added missing spells from Taldor, Echoes of Glory. ([1542](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1542))
- Cavalier Tactician incorrectly targeted only one ally and granted initiative bonus. ([1601](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1601))
- Fixed alchemist fire (siege) weight.
- Bestow Curse spell descriptions were fixed and touch attack was added to both.
- Draconic Bloodline's Breath Weapon lacked damage, saving throw, and was poorly formatted.
- Remove redundant Winter's Grasp spell ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Fix errors in races compendium ([2202](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2202))
- Change healing and damage type of cure and inflict spells
- Jolt was missing attack and damage rolls.
- Maker's Call class ability (chained and unchained) had wrong max uses formula, and UC description was incorrect.
- Sound Burst was missing damage, template and some associated classes.
- Fix Magus class ability 'Spell Blending' which was misspelled as 'Spell Binding'.
- Fix missing or invalid descriptions for some spells and removed 3rd party spells.
- Added missing Distraction and Poison Touch hexes.
- Witch hexes are now tagged with Hex, Major Hex and Grand Hex, and several had missing activation details filled in, such as ranges and saving throws.
- Added Ward and Dire Prophecy hex buffs
- Replace obsolete @critMult and @attributes.naturalAC
- Simplify and optimize various formula
- Fixed Gunsmith's Kit information and removed duplicate in weapons.
- Added context notes to Ninja's No Trace
- Remove external links from descriptions ([540](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/540))
- Caster's Champion, Combat Vigor, Crushing Impact, Dirty Fighting, Extra Bombs, Furious Focus, Hurricane Punch, Ki Throw, Improved Ki Throw, Lingering Performance, Outflank, Painful Collision, Precise Strike, Signature Skill, and Vicious Stomp feats added. ([2224](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2224), [2223](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2223), [178](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/178))
- Added Univeral Monster Rules journal to rules compendium. Only rules for natural attacks are included for now.
- Added Monster Abilities compendium with a number of generic Natural Attack items.
- Added Rage buff for chained and unchained barbarian.
- Class kits were recreated to update and fix their contents. ([2240](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2240))
- Added mundane items found in grooming and mess kits. The kits themselves were recreated.
- Remove external amzn links from items compendium ([540](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/540))
- Remove redundant information from weapon and ammo description ([2188](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2188))
- Remove redundant rhoka and great club from packs. ([2313](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2313))
- Removed unused Travel descriptor from Track Ship spell ([1365](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1365))
- Rogue, Cavalier, Ninja and Slayer Sneak Attack class features now all include appropriate damage formulas.
- Weapon properties were re-added. ([2282](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2282))

### API

- Background skill ranks gained can be configured via CONFIG.PF1.backgroundSkillsPerLevel ([1632](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1632))
- ⚠️ Fixed pf1PreActorRollCl args to intended order ([2211](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2211))
- Creature type string is contained in actor.system.traits.type ([2148](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2148))
- Humanoid boolean is contained in actor.system.traits.humanoid
- ⚠️ The deprecated `game.pf1` API has been removed in favor of `pf1`.
- ⚠️ `pf1.config.damageTypes` has been deprecated in favor of `pf1.registry.damageTypes.getLabels()`
- ⚠️ Deprecated `String#format` has been removed
- ⚠️ The deprecated ESM exports have been removed
- ActorPF.itemTypes now caches its results between actor resets.
- Minor breaking change: An item's source details now provides a name instead of label: (value, label, sort) -> (value, name, modifier, sort)
- ChatAttack now uses roll data for critRange and nonLethal
- CombatantPF introduced to handle combatant overrides.
- Added ItemAction.activation getter for mostly action economy agnostic activation info.
- Removed unused SidebarPF class
- Condition tracks can now be configured via CONFIG.PF1.conditionTracks
- ItemConditional now has .name getter, allowing ItemAction.conditionals.getName() to function.
- Buff types can be extended ([817](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/817))
- ActorPF.getSelectedActors() and ActorPF.getActiveActor() are now deprecated.
- rollItemMacro(), rollSkillMacro(), rollSaveMacro(), rollActorAttributeMacro() and displayDefenses() macro functions are now deprecated.
- ItemPF.parentActor is deprecated in favor of Item.actor ([2067](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2067))
- ItemSpellPF.addUses() has been deprecated in favor of .addCharges() ([2141](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2141))
- ⚠️ Remove deprecated `ItemAction#chargeCost`
- ⚠️ Remove deprecated `ItemPF` members: `roll`, `useAttack`, and`damageSources`
- ⚠️ Remove deprecated `ActorPF#rollDefenses`
- Context info on duration ending for buff updates. ([2005](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2005))
- Introduced several new more specific migration functions.
- `migrateWorld()` and some other migration functions now have unlock parameter that allows them to migrate locked compendiums.
- `migrateWorld()` now skips system compendiums by default and has new `systemPacks` option to include them.
- D20RollPF.isFumble is deprecated in favor of D20RollPF.isNat1
- Class skill bonus is customizable via CONFIG.PF1.classSkillBonus
- Unified item subtypes under Item.subType instead of individual categoried types. ([1846](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1846))
- ⚠️ pf1GetChangeFlat hook's parameters changed, shifting the result parameter to be first, adding the change's value as now-third, and replacing actor data with the actual document.
- Add support for Active Effect expiration by rounds duration.
- Add support for Active Effect auto-deletion on expiry.
- ⚠️ ActorPF.expireActiveEffects() first parameter is now for additional options, old first parameter shifted to be the second.
- ⚠️ CombatPF.\_processCurrentCombatant() has been removed
- ⚠️ ActorPF.expireActiveEffects() parameters have changed.
- ⚠️ TokenQuickActions.addTop3Attacks() replaced with TokenQuickActions.addQuickActions() ([2171](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2171))
- ⚠️ AttackDialog parameters changed: third app options parameter is now fourth to make room for passing extra use options as third.
- ⚠️ createItemMacro() first parameter is now an item UUID instead of an object with the UUID.
- ⚠️ createSkillMacro(), createSaveMacro(), and createMiscActorMacro() second parameter is now actor UUID instead of actor ID.
- ⚠️ createMiscActorMacro() fourth parameter is an additional data object instead of spellbook ID, and book ID is .bookId property in it.
- Fix deprecation notice for `actorRest` hook ([1788](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1788))
- Fix pre actor roll hook options for pf1PreActorRollCmb, pf1PreActorRollSave, and pf1PreActorRollAbility ([2195](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/2195))
- ⚠️ .unchainedAction.activation moved to .activation.unchained
- Point buy calculator point categories are now configurable via `pf1.config.pointBuy`
- ItemPF.recharge() added for restoring charges or item relevant charges.
- Changes DR and ERES to an object structure
- Actor's getSkillInfo now reads from roll data
- ⚠️ `pf1.register<Registry>` hooks have been replaced with `pf1Register<Registry>` ones
- ⚠️ Registry entries now use `DataModel`s to enforce a schema
- Container price uses .price like all other items instead of .basePrice ([1983](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1983))
- ⚠️ Remove deprecated hooks using old namespacing
- {{itemRange}} has been deprecated in favor of {{actionRange}}
- {{itemAttacks}} has been deprecated in favor of {{actionAttacks}}

## 0.82.5 - 2023-1-7

### Bug Fixes

- Spurious "invalid charge formula" errors in actions. ([1901](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1901))
- Spellpoints would cause cost of undefined errors. ([1902](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1902))
- Crit multipliers larger than 2 were ignored ([1905](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1905))

## 0.82.4 - 2023-1-6

### Bug Fixes

- Fix migration not running for v0.82.3

## 0.82.3 - 2023-1-6

### Bug Fixes

- D20 roll messages were not serialized properly, resulting in missing data ([1715](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1715))
- Saving throw chat card flavors did not include their type ([1720](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1720))
- Spell descriptions in chat lacked CL data ([1721](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1721))
- Spells lost their description when converted to a consumable ([1817](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1817))
- Class data in actor roll data was incomplete ([1751](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1751))
- Action sheet became uneditable if re-opened while already open. ([1591](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1591))
- ItemAction.hasRange sometimes incorrectly returned true ([1676](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1676))
- Migration did not convert item dictionary and boolean flags correctly. ([1704](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1704))
- Disable low-light vision in light sources did not function. ([1736](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1736))
- Hidden Line, Circle and Cone templates were visible to players. ([1742](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1742))
- Damage type selector displayed types for primary damage instance even for secondary instances. ([1765](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1765))
- Weapon, Armor, and Language proficiency tags were not rendered on item sheets. ([1789](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1789))
- Roll dialogs were missing subject in dialog data for programmatic identification. ([1801](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1801))
- Splitting item stack gave wrong quantity to the new stack. ([1812](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1812))
- Token tooltip would under certain circumstances stop functioning. ([1847](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1847))
- Added ability scores feature data was incorrect. ([1864](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1864))
- Conditional modifier drag & drop was only possible as GM ([1891](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1891))
- Lore and Artistry skills were shown even with background skills disabled. ([439](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/439))
- Consumable generation did not fill aura school correctly. ([1710](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1710))
- Non-stacking bonuses stacked with each other ([1749](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1749))
- Unidentified items displayed their identified name in items directory. ([1091](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1091))
- Unidentified items displayed their identified name in sheet title. ([1787](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1787))
- Conditional modifiers did not respect their default state in attack dialogs ([1674](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1674))
- Certain items with no actions and no resources generated actor resources. ([1738](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1738))
- Spell school and level were missing from spell sheet header. ([1790](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1790))
- Spell school and components were missing from spells tab. ([1772](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1772))
- Ninja gained Uncanny Dodge at level 3 instead of 4 ([1730](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1730))
- Psychic spellbooks did not correctly convert spell components.
- Quick actions could glitch out for items with an expanded summary ([1755](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1755))
- Fixes Rogue getting Uncanny Dodge at level 3 instead of 4
- Scorching Ray incorrectly capped out at 4 rays instead of 3 ([1802](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1802))
- Skill tag renames could overwrite existing skills. ([1729](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1729))
- Skill modifier would continually increment when skill was edited. ([1785](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1785))
- Cantrips no longer deduct charges by default ([1680](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1680))
- Newly placed tokens did not match actor size ([1679](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1679))
- Blindsense and blindsight incorrectly detected through walls ([1677](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1677))
- Prevent health bar from changing color due to temp hp overflow ([1690](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1690))
- Broken armor didn't halve their base AC
- Duplicated items incorrectly retained the same change IDs
- Conditional modifiers using `@powerAttackBonus` could produce errors when Power Attack was inactive ([1759](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1759))
- Negative modifiers were omitted from critical damage rolls ([1778](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1778))
- Large number of vision settings were disabled without custom vision rules ([1681](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1681))
- sizeRoll did not accept inner complex formulas. ([491](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/491))
- sizeRoll could not have flavor. ([1419](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1419))
- Standardize sheet tooltip line formatting

### Changelog

- Token Tooltip's Actor Names can be hidden by disposition now
- Items & Actions can now have separate use costs per action
- Actions inherit their use cost from their parent Item
- Auto Deduct Charges toggle has been phased out for formulas

### Compendium

- Add unchained Still Mind as a class ability and use it for the Unchained Monk
- Missing Lore Keeper class ability of Oracle added
- Missing Renewed Vitality (UC) rage power of Unchained Barbarian added ([!778](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/!778))
- Missing feat Improved Steal added
- Artistry and Lore are now correctly marked as class skills for classes. ([448](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/448))
- Nightmare Subdomain typo fixed
- Nightmare subdomain typo ([!760](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/!760))

### Localization

- Added French Translation of Help
- Fixes a wrong translation of class features into German

### API

- Add combat-properties css class to chat cards ([1727](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1727))
- Added SizeRollTerm to handle sizeRoll() function.

## 0.82.2 - 2022-9-13

### Bug Fixes

- Melee bonuses were applied to ranged attacks ([1638](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1638))
- Actor sheets' combat tabs provided no damage details for attacks ([1638](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1638))
- Rolls with old class RollPF$1 were not initialized ([1651](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1651))
- Action sheets' usage tabs provided no input fields for durations ([1660](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1660))
- Actions could not be used when the game canvas was disabled
- Document types were not detected correctly.
- Change for bonus skill ranks and feats had no effect ([1650](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1650))
- Hide enhancement bonus override for actions outside of weapons and attacks ([1663](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1663))
- Saving throw totals increased after every roll in certain cases ([1669](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1669))
- Spell point costs were incorrectly migrated into spell slot costs ([1658](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1658))
- Spells with multiple actions had their action chooser prompt repeat itself
- Fix auto deduct charges checkbox being ignored on actions ([1496](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1496))
- Actor sheets could get stuck when an item with an expanded summary was deleted

### Changelog

- Improve See Invisibility detection mode for PF1
- Add the squeezing condition ([1012](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1012))
- Show nonlethal damage and temporary hit points on hit point bars
- Add blindsense and blindsight mechanics
- Add tremorsense mechanics

### API

- BREAKING: Change parameters of action use hooks to only include `ActionUse` instance
- Deprecate DicePF#d20Roll in favor of pf1.dice.d20Roll
- Deprecate pf1PreRoll hook in favor of using pf1PreActorRoll\* hooks
- BREAKING: Remove deprecated ActorPF#rollAbility
- Introduce uniform options interface for actor roll methods
- BREAKING: Standardize actor (pre) roll hook arguments order
- Add getAbilityModifier to API
- Add `pf1MigrationStarted` hook
- BREAKING: Remove deprecated properties from script call arguments
- BREAKING: Remove deprecated bonus property from ActorPF#getSkillInfo result
- BREAKING: Remove deprecated ItemPF#toConsumable
- BREAKING: Remove deprecated ItemSpellPF#addSpellUses

## 0.82.1 - 2022-9-1

### Bug Fixes

- Fix darkvision not detecting creatures outside light sources
- Dragging items to reoganize caused them to duplicate instead ([1645](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1645))
- Various item descriptions weren't displayed or editable ([1646](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1646))
- Subskill creation was buggy ([1647](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1647))
- Script changes in worlds where they aren't allowed now show the item in question in the console ([1643](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1643))

## 0.82.0 - 2022-9-1

### Bug Fixes

- Features didn't show their activation type on actor sheets ([1603](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1603))
- Specific conditional modifiers weren't applying to haste or rapid fire ([1619](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1619))
- Container items weren't being migrated ([1641](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1641))
- The action description tab always had a scrollbar, even when not necessary ([1592](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1592))
- Duplicated conditional modifiers didn't get a new ID, resulting in some bugs ([1610](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1610))
- Editing action descriptions caused it to be enriched within the editor ([1568](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1568))
- Clearing a character's experience points field now resets it to the minimum for this level again ([10](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/10))

### Changelog

- Show some non-magical information on unidentified items ([1614](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1614))
- Move primary attack flag from item to action
- Actions can now have individual charges ([1531](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1531))
- Add concentration and caster level bonuses as changes
- Keep expanded item summaries open on actor sheet render ([1613](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1613))
- FoundryVTT 10 compatibility update

### API

- Add `shared` as a parameter to the `itemUse` hook ([1612](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1612))

## 0.81.3 - 2022-8-4

### Bug Fixes

- Spell chat cards did not include description texts

### Compendium

- Add and fix compendium entries that was supposed to have happened last patch

## 0.81.2 - 2022-8-3

### Compendium

- Oracle Waves Mystery Blizzard class ability added
- Stone Stability class ability of Oracle fixed
- Waves Mystery spells in description fixed
- Projectile weapons weren't market as using a specific ammo type
- Changed subschool and type of minor phantom object spell according to second printing errata of advanced race guide

## 0.81.1 - 2022-7-27

### Bug Fixes

- Wounds & Vigor variant rule did not work with apply damage buttons. ([793](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/793))
- Spell resistance notes were not added to spell chat cards
- Combat tab attack tooltips falsely displayed secondary attack penalty. ([1501](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1501))
- Item weight editing did not properly function. ([1505](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1505))
- Secondary natural attack penalty applied to some non-natural attacks. ([1515](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1515))
- Combat tab damage tooltips displayed no data.
- Slide down item summary did not resolve roll data for inline rolls. ([1551](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1551))
- Migration caused loot type items to be automatically unequipped.
- Loot sheets didn't show the correct value of charged items
- Initiative dialog did not respect base dice ([1534](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1534))
- Cantrips/orisons incorrectly used charges on prepared spellcasters ([1544](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1544))
- Fix unlinked tokens not drawing their buff and condition icons ([1550](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1550))
- Conditionals couldn't be dragged onto other actions ([1525](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1525))
- Fix conditionals only applying to all attacks or first attack ([1522](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1522))
- Fix size conditional modifiers not being ported over to actions ([1495](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1495))
- Unknown damage types were migrated to untyped, rather than a custom damage type ([1498](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1498))
- Trying to open a basic actor's vision permissions threw an error ([1576](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1576))

### Changelog

- Item chat cards now use the description matching their identification state; an info block containing the identified description is added for GMs
- Containers focus contents tab initially. ([1563](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1563))
- New player characters have vision enabled for their token regardless of default token settings (optional).
- Actions now have a tag, and can be accessed via the `action` variable within use script calls
- Added fighter weapon group selection to attacks and weapons ([1332](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1332))

### Compendium

- Add missing class ability Speak with animals of Nature Mystery
- Missing class ability Earth Glide of Oracle added
- Missing class ability Life Link of Oracle added
- Safe Curing class ability fixed
- Stone Stability class ability of Oracle name and tag fixed
- Healing Domain class ability corrected
- Retribution Hex added
- Add Track class ability of the inquisitor and replace it in the inquisitor class

### API

- Customizing point buy ability cost table allows point buy calculator to go outside of normal 7 to 18 range.

## 0.81.0 - 2022-6-16

### Bug Fixes

- Buffs with duration ignored hide buffs system setting. ([1441](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1441))
- Temp vigor was not adjusted before normal vigor when modifying through token bar. ([1445](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1445))
- Item flags were initialized wrong, requiring migration to make flags work.
- Opening the summary of an item in a container would immediately close it again.
- Clicking the (roll) icon of an item in a container would not post its description to chat.
- Items in containers could not be used ([956](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/956))
- Sheets would not re-render after an item in a container was updated, displaying a mix of old and new data. ([1422](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1422))
- Weapons did not respect their nonlethal toggle for damage.
- Fix actor quick actions using the world document's items ([1463](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1463))
- Fix incorrect spell-like spellbook label
- Fix client error message on unlinked token creation ([1449](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1449))
- Fix harmless errors with random chat messages ([1442](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1442))
- Weapon held option was not given on weapon attacks ([1438](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1438))
- Disallow splitting of items with a stack of 1
- Deferred changes (such as damage) did not use expected roll data ([1464](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1464))

### Changelog

- Temp Vigor is included in token bar vigor value. ([1410](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1410))
- Race subtypes are shown directly on race sheet. ([1431](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1431))
- Display subtypes on race sheet ([1431](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1431))
- Attributes tab now includes more tooltips.
- Add class skill modification to all feats
- Add damage type icons
- Enhance skill customization
- Add token flag to disable the system's handling of vision ([1466](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1466))
- Removed alternate attack chat card option
- Add options for secondary natural attack bonuses ([1440](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1440))
- Allow equipment and consumables to be added to the quickbar ([1426](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1426))
- Add multiaction support ([1376](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1376))

### Compendium

- Cleric Aura added as a class ability and as a class association within the Cleric class itself
- Strength Surge (Rage Power) added ([1472](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1472))
- Fixed the damage formula for the spell Flame Strike
- Re-add chained summoner's Eidolon class feature ([1325](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1325))
- Add age categories as misc feats to the monster templates compendium
- Name of Sorcerer Arcane Bloodline Power 'Arcane Apotheosis' fixed (was 'Arcane Hypothesis')
- Sorcerer Bloodline added as a class ability and as a class association within the Sorcerer class itself

### API

- BREAKING: Overhaul ESM exports

## 0.80.24 - 2022-5-21

### Bug Fixes

- Migration messages would sometimes not auto-clear
- Fix scene loading with basic actors on it ([1435](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1435))
- Dice Pools in attack damage broke character sheets
- Create Attack button didn't link attack to weapon as child
- Tracked HP in round tracker was empty if 0
- Fix some styling issues with item sheets
- Damage ability multiplier was always 1 when skipping attack dialog
- Secondary natural attacks were treated as primary attacks when skipping its attack dialog

### Changelog

- Races now define their size and update character size to match where appropriate.
- Scrolling to adjust item charges from an actor sheet now only works while control is held ([203](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/203))

## 0.80.23 - 2022-5-15

### Bug Fixes

- d20 was rolled multiple times when roll dialog was not used. ([1434](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1434))
- Uneditable item sheets allowed editing some elements.
- Tokens without actor broke scenes ([1429](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1429))
- Items with severed children could not be deleted ([1427](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1427))

### Changelog

- Item sheets can be viewed on actors that are not editable.

## 0.80.22 - 2022-5-13

### Bug Fixes

- Conditional modifiers that were on by default always applied ([1425](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1425))
- Critical damage rolls no longer suffer from negative modifiers
- The sickened condition was showing as 'penalty' in damage rolls

### Changelog

- Add better senses support for actors
- Add option to split an item stack ([1142](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1142))
- Add base dice overrides for skill and save roll dialogs ([1354](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1354))

### API

- Add options.targets to ActorPF.applyDamage to override targets ([1424](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1424))

## 0.80.21 - 2022-5-11

### Bug Fixes

- Shield info was parsed incorrectly in roll data. ([1420](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1420))

### Changelog

- Changes to damage are no longer pre-rolled, allowing dice to be used
- Spontaneous casters now take spell slot cost into account ([1412](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1412))

## 0.80.20 - 2022-5-7

## 0.80.19 - 2022-5-7

### Bug Fixes

- Roll data was missing information. ([1413](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1413))
- Fractional Base Bonuses did not display fractions in all circumstances. ([1409](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1409))
- Fractional Base Bonuses gave +2 for every class with good saves instead of only one. ([1409](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1409))
- Fix inconsistent update handling.
- Modules relying on health tracking were broken ([1406](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1406))
- Temp HP couldn't be removed sometimes ([1407](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1407))
- Current hp didn't round when using continuous health ([1405](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1405))
- Linked children were no longer being removed with parent item ([1381](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1381))

## 0.80.18 - 2022-5-3

### Bug Fixes

- Fix critical error in initializing actors
- Fix wound thresholds with new HP handling ([1402](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1402))
- Fix class associations not working ([1401](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1401))
- Ranged weapons became unusable with most ammo ([1400](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1400))

## 0.80.17 - 2022-5-3

### Bug Fixes

- CMB wasn't working ([1398](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1398))

### Localization

- Updated German translation

## 0.80.16 - 2022-5-1

### Bug Fixes

- Broken condition is now considered in an item's value ([635](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/635))
- Clicking on sheets to open didn't always focus them
- Orphaned tokens would cause errors with Health Configuration menu ([1292](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1292))
- Ammo recovery buttons could permanently garble chat messages. ([1348](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1348))
- Arcane Spell Failure was rolled even with no somatic component involved. ([1372](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1372))
- Item sheet numbers sometimes had excessive accuracy. ([1373](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1373))
- Consumables created from cantrips cost as if made from level 1 spells. ([1389](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1389))
- Prevent early error notifications from causing more errors ([874](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/874))
- Initiative could not be rolled with no token on scene. ([1291](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1291))
- Initiative could not be rolled with no scene.
- Unlinking ability score from subskill broke sheets.
- Token HUD was nonfunctional for tokens with no actor.
- Buffs weren't being simplified into combat tab damage display ([1366](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1366))
- Fix error when skipping dialog on attacks ([1350](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1350))
- actor.hasItemBooleanFlag() returned false for buffs on world launch ([1384](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1384))
- Fix changes from items with brackets in their name breaking some rolls ([1352](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1352))
- Power attack critical bonuses were being applied to normal damage as well ([1355](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1355))
- Rolling saving throws on attack card targets wasn't being tracked
- Skipping attack dialogs prevented default conditional modifiers from applying
- Fix rolls not working with no active scene
- Give default names to nameless extra attacks ([1394](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1394))
- Currency could get stuck as a non-number ([939](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/939))

### Changelog

- Allow abundant ammunition
- Manyshot damage is defined more clearly in chat cards ([1374](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1374))
- Right-clicking quick actions now opens its item sheet
- Token HUD conditions are now sorted alphabetically. ([1356](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1356))
- Font Size is now controlled by Foundry setting

### API

- ItemAttack's shared object is now exposed to Use Script Calls through `shared.attackData`
- BREAKING: "Use" Script Call's `attacks`, `template`, `conditionals`, `data.fullAttack`, and `data.chatMessage` are deprecated now. Use above object to access them. They will be removed in V10.
- Add a `sort` property to `CONFIG.PF1.buffTargets`, determining Change application order
- Added `offset` variables to hp, vigor and wounds
- Added `getItemBooleanFlags` and `getItemDictionaryFlags` as Item methods
- New ItemPF#setActive(bool) function to allow simple activation to all item types that support it.
- Script Calls are awaited and called in order now
- `/damage` and `/heal` now roll asynchronously

## 0.80.15 - 2022-3-19

### Bug Fixes

- Haste was incorrectly adding two attacks
- Manyshot wasn't working correctly
- Applying nonlethal damage from a chat card incorrectly applied lethal damage if it was due to low damage

### Changelog

- Improve rapid shot handling
- Remove apply damage chat cards in favor of inline buttons
- Add more control over power attack damage ([1330](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1330))
- Altered ammunition recovery chat buttons to be more visually pleasing

## 0.80.14 - 2022-3-17

### Bug Fixes

- Buff duration.totalSeconds was wrong for round durations.
- Speed wasn't being affected by encumbrance or armor ([1322](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1322))

### Changelog

- Revamped ammunition system

### Compendium

- Added weapon properties to compendium weapons

### API

- game.pf1.utils.measureReachDistance obsoleted.
- game.pf1.utils.measureDistance introduced.

## 0.80.13 - 2022-3-12

### Bug Fixes

- Fix certain sheets not opening ([1319](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1319))
- Fix incorrect metric calculation on actor combat tabs ([1321](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1321))
- Fix baseMod of abilities allowing decimals ([1312](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1312))

### API

- Deprecate ActorPF.rollAbility ([1313](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1313))
- Make the itemUse hook call after the attack dialog ([1316](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1316))

## 0.80.12 - 2022-3-11

### Bug Fixes

- Some changes were not saved correctly (e.g. attack & effect notes).

### Changelog

- Save DC hiding in chat cards is now optional. ([1262](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1262))

## 0.80.11 - 2022-3-8

### Bug Fixes

- Sheet failed to render under certain circumstances. ([1308](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1308))
- Long spell range was broken.
- Hidden tokens initiative roll weren't being hidden correctly
- Implement property checking to prevent errors with basic actors ([1307](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1307))
- Hide tokens from chat card targets for players that can't see them currently ([1294](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1294))

## 0.80.10 - 2022-3-7

### Bug Fixes

- Script changes could not end in comment or few other forms of valid code.
- Spellbook preparation was done twice.
- Bad class level modification formula could brick actors. ([1272](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1272))
- Change IDs were retained, causing conflicts and nonfunctional Changes, especially when duplicating items. ([1290](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1290))
- Attacks & spells would fail with no scene viewed. ([1301](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1301))
- Experience past what was needed to level was lost. ([1256](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1256))
- Custom saving throws in class were nonfunctional. ([1255](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1255))
- Players could reroll initiative if their initiative was exactly 0.
- Initiative rolls ignored current roll mode ([1044](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1044))
- Context notes rolled dice on actor sheet. ([1261](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1261))
- @attackCount was undefined in attack roll data. ([1283](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1283))
- @powerAttackBonus and @powerAttackPenalty were missing. ([1273](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1273))
- Rapid Shot Conditional checkbox did nothing ([1254](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1254))
- Sheet lockup with search in combination of some other actions. ([1265](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1265))
- Template highlight was in use in unsupported grid types. ([1276](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1276))
- Macro script calls referencing no longer existing macros caused the item to break ([1298](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1298))
- Base modifier changes to speed didn't apply to the actual base speed ([1278](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1278))
- Toggling hide from token on buffs caused errors. ([1306](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1306))
- Permission error to update a token was shown to players when unowned linked actor changed size.

### Changelog

- Custom HD formula support.
- Initiative tiebreaker is now labeled and optional.
- Clicking on linked item in item sheet links tab opens its sheet. ([1286](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1286))

### Compendium

- Remove bestiaries
- Uncanny Dodge incorrectly gave additional flat-footed AC unhindered by max dex bonus ([1293](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1293))

### Localization

- Update the German translation

### API

- Make attack rolls asynchronous for custom roll parsers

## 0.80.9 - 2022-1-29

### Bug Fixes

- Skill list, item description, and item advanced tab reset scroll positions.
- Fix missing save description tag.

### Changelog

- Weapons can have ammunition linked.
- Revamped the dialog for leveling up an actor
- The construct racial HD now provides automatic bonus hit points based on size
- Add the cowering condition

## 0.80.8 - 2022-1-24

### Bug Fixes

- Measured templates forced grid snapping for angles and distances with shift held.
- Measured templates did not respect scene configuration (such as line templates being 5m wide).
- Fix tag wrapping
- Measure templates weren't shown on quick rolls ([1232](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1232))
- Fix measure templates with textures throwing errors ([1234](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1234))
- Fix damage multipliers and non-primary attack damage ([1233](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1233))

### Changelog

- Make target clearing optional ([1236](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1236))
- Add psychic spellbooks ([1202](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1202))
- Implemented Bresenham lines for ray measure templates

### API

- Use skipDialog instead of skipPrompt in ActorPF.rollSavingThrow ([1238](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1238))
- Add skipDialog option to ActorPF.rollInitiative ([1239](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1239))

## 0.80.7 - 2022-1-17

### Bug Fixes

- Prototype token was missing system specific vision settings. ([1224](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1224))
- Give item dialog could not be scrolled. ([1195](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1195))
- Experience points were incorrectly tracked as a string, causing issues
- Wound penalties were applying twice to initiative ([1231](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1231))
- Melee/ranged attacks on combat tab ignored wound threshold for display ([1230](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1230))
- Weapon attacks only had a full attack option on their use dialogs ([1228](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1228))
- Fix attack bonus display on attack roll dialogs for formulaic attacks ([1229](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1229))
- Fix error when setting shared.reject in item script with measure template ([1227](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1227))
- Spontaneous spellbooks didn't make use of domain spells ([1193](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1193))

### Compendium

- Fix firearm weapon data ([1203](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1203))

## 0.80.6 - 2022-1-16

### Bug Fixes

- Updating unlinked tokens caused errors ([1223](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1223))

## 0.80.5 - 2022-1-16

### Bug Fixes

- Queued updates would run on all users who own the actor. ([1109](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1109))
- Default token settings caused an error and failed to provide system specific settings. ([1209](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1209))
- DSN was not shown for other users with attacks. ([1206](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1206))
- @powerAttackPenalty was no longer in attack roll data.
- Some chat messages did not respect current roll mode if no forcing was used.
- Power Attack for natural attacks was only adding 1 damage per step
- Negative charge costs work again ([1218](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1218))
- Secondary natural attacks weren't applying an attack penalty ([1207](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1207))
- Fix bar attributes not showing up in token configurations ([1](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1))

### Changelog

- Inline roll turning into raw strings is now optional.
- Allow giving items to all other players while a GM is connected
- Change name property on player clients for unidentified items, allowing for better operability with modules
- Charged actions are now proper actions ([810](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/810))
- Allow multiselect with shift on chat card targets ([1212](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1212))

### Compendium

- Changed Brawler's AC bonus to use a formula instead of a script

### API

- Remove unused ActorPF.useSpell ([1221](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1221))
- Created a class for attack dialogs
- Make game.pf1.ItemAttack actually moddable ([1220](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1220))

## 0.80.4 - 2022-1-8

### Bug Fixes

- Fix chat cards getting an incorrect ID for its measure template
- Help browser was nonfunctional with routePrefix. ([1144](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1144))
- Item gifting was silently failing. ([1190](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1190))
- Buff icons broken with hide from token in token HUD condition menu.
- Non-formulaic extra attacks did not apply their modifiers to attacks. ([1200](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1200))

### Changelog

- Chat cards with measure templates now have all tokens within as targets
- Add saving throws to chat card targets

## 0.80.3 - 2022-1-6

### Bug Fixes

- Attacks with ammo links couldn't be used. ([1187](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1187))
- Fix item images not rendering in actor sheet with some special characters in the file name. ([1197](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1197))
- Actor-specific tooltip settings didn't load correctly ([1189](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1189))
- Unidentified items used from an owned actor showed their identified name and description in the chat card ([1175](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1175))
- Fix light with negative luminosity being affected by low-light vision
- Fix vision permission not working ([1186](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1186))
- Grappled condition was adding penalties to CMB twice ([1191](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1191))

### Changelog

- Added @dc to item roll data. ([1183](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1183))
- Add `shared.reject` to item use script calls ([1182](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1182))

### API

- Add MeasureTemplatePF.getTokensWithin and MeasureTemplatePF.getHighlightedSquares functions
- Roll JSON is no longer created pre-emptively for useAttack (including associated useItem hooks).

## 0.80.2 - 2021-12-21

### Bug Fixes

- Fix item quantity input field missing from item sheets ([1179](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1179))
- Fix error on passing time for tokens with origin actors deleted ([1184](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1184))

### Changelog

- Hide more GM sensitive info from players
- Added custom BAB and saing throw formula options for classes. ([234](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/234))
- Add target info to chat attack cards

### Localization

- Fix consumable creation dialog's spell name ([1178](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1178))

### API

- Untangled items' useAttack and put the individual functions in game.pf1.ItemAttack

## 0.80.1 - 2021-12-19

### Bug Fixes

- Keybindings were broken after Foundry API changes
- Fix an issue with changing available spell slots manually

## 0.80.0 - 2021-12-17

### Changelog

- Update compatibility to FVTT V9

## 0.79.10 - 2021-12-2

### Bug Fixes

- Creating consumables from spells with damage components didn't work
- Initiative wasn't benefitting from dexterity check changes ([1147](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1147))
- Non-consumables with single charges now subtract quantity on use

### Changelog

- Add ability to select CL and SL when creating consumables from spells ([1131](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1131))

### Compendium

- Change initial quantity of Acid to 1

## 0.79.9 - 2021-12-1

### Bug Fixes

- Item sheets were not being brought to the foreground when editing an already open one ([1170](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1170))
- Fix sheets not rendering if CMB Ability is blank
- Fix low-light vision affecting token sight radius ([1151](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1151))
- Prevent actor skill rank source duplication
- Spontaneous spells were unusable in certain situations
- Currency values became strings in certain situations, causing problems ([1152](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1152))
- Many projectile weapons were erroniously adding Strength to damage ([1146](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1146))
- Inline top level spell description data wasn't getting enriched ([1143](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1143))

### Changelog

- Add price per charge to consumable items
- Apply @sl and @cl in more fields in spell to consumable conversion

### Compendium

- Change monk AC bonus to "add" instead of "script" type ([1](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1))
- Change Strix' incorrect Shapechanger subtype to Strix subtype ([1167](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1167))
- Changed two-handed weapons to have a 1.5x Strength damage modifier by default ([1169](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1169))
- Improve default data for tanglefoot bags, alchemist fire, acid and thunderstones
- Bonus from rangers' Track feature had a wrong formula ([1168](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1168))

## 0.79.8 - 2021-11-18

### Bug Fixes

- Broken condition was missing from combat tab damage display.
- Fix hidden buffs did not automatically expire. ([1124](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1124))
- CL and Concentration buttons were missing with attack chat card style.
- Fixed deletion of active effects failing to disable associated buffs in some instances.
- Fix missing initiative dialog.
- Fix multiplied scrollbars.
- Spell chat cards were missing roll data. ([1153](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1153))
- Fix attributes modified via token HUD trashing certain actor data. ([1067](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1067))
- Fix Maker's Call per day
- Creating consumables from spells with damage or healing caused an error
- Spellbook roll data was using an incorrect value for its ability modifier
- Item Script Calls were executed on every client when activated ([1141](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1141))
- Spell description in actor sheet was missing roll data. ([1153](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1153))
- Buffs could expire too soon on round start or refresh. ([1121](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1121))

### Changelog

- Weapons can now have conditional modifiers.
- Add option to hide chat cards with script calls, rather than hide them regardless ([1132](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1132))
- BREAKING: Script type changes are now locked behind a world setting

### API

- Prevent unnecessary `pf1.getRollData` hook calls ([1134](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1134))
- Add bonus formula option to actor.rollSavingThrow and actor.rollSkill

## 0.79.7 - 2021-10-21

### Bug Fixes

- Fix incorrect bonus stacking for skill rolls. ([1120](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1120))
- Fix inconsistent HP adjustment on actor sheet. ([1046](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1046))
- Fix spell description was not editable if it was completely missing.
- Fix rounding error in total value calculations. ([1030](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1030))
- Entangled attack penalty was nondescript. ([1113](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1113))
- Make full spell descriptions show up on chat cards again
- @critMult is now valued at the actual critical multiplier if the attack is a critical threat, rather than at -1 value
- Measure templates were unable to be created properly after having created something on the drawing layer ([1114](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1114))
- Clearing some numeric input values on character sheets changed nothing ([1116](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1116))
- Ability-targeting changes with a negative value and penalty as the modifier incorrectly applied positive values (This also fixes conditions such as Entanglement and Exhausted) ([1112](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1112))
- Fix attacks/iteratives shown for damage-only attacks. ([1093](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1093))

### Changelog

- Delete expired active effects and disable linked buffs.
- Drag Ruler can now be configured to not use token elevation to determine the token's movement type
- Add information on the @critMult variable

### API

- Buff ActiveEffect duration is now initialized.

## 0.79.6 - 2021-10-14

### Bug Fixes

- Fix class item sheet displaying `@classes..level` instead of actual variable.
- Fix seemingly random EmbeddedCollection errors with leveling. ([1103](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1103))
- Changes with certain targets didn't work
- Conditions that limited ability modifiers, such as pinned, still applied non-base ability bonuses ([1104](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1104))
- Drawing measure templates was broken with scene distances different than 5 ([1108](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1108))

### Changelog

- Currencies on actor and container sheets are now less visible if there is nothing

## 0.79.5 - 2021-10-11

### Bug Fixes

- Fix carry capacity migration resetting custom values.
- Fix missing context note target making actor sheet inaccessible.
- Does not exist in EmbeddedCollection with classes.
- Fix missing roll data for formatContextNotes [cannot set property 'item' of undefined]. ([1089](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1089))
- Fix missing size bonus with generic CMBs. ([1075](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1075))
- Fix pinned condition changes ([1088](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1088))
- Fix natural attacks always treated as primary if shift-clicked. ([1074](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1074))
- Fix template grid highlights broken with 0.79.2 ([1087](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1087))
- Hit Die was shown twice on HD based spellbook tooltips ([1094](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1094))
- @details.cr.total wasn't usable in changes ([1100](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1100))
- Mitigate errors with toggling buffs too fast ([1101](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1101))

### Changelog

- Weapons can now have attacks of their own. ([579](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/579))
- Actor rest button moved to right of race to save vertical space.
- Inline rolls in tooltip context notes are no longer rolled. ([1095](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1095))
- Spells no longer permanently cache rendered description. ([1097](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1097))
- Spell descriptions are now editable on description tab instead of bottom of details.

## 0.79.4 - 2021-10-3

### Bug Fixes

- Fix attack tooltip showing bonuses to all attacks twice.
- Disabling experience tracking could lead to actors no longer getting initialised
- Handle missing linked ammunition gracefully.
- Prevent negative light sources from becoming larger with low-light vision

## 0.79.3 - 2021-10-3

### Bug Fixes

- Some actors were not initalized properly when using fractional BAB rules
- Newly created actors had no valid setting to add STR to their CMD

## 0.79.2 - 2021-10-2

### Bug Fixes

- Level up HD were rolled twice by Dice So Nice ([1065](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1065))
- Attack maxIncrements was sometimes stored as a string. ([1028](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1028))
- Buff level was sometimes stored as a string. ([1043](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1043))
- At-will spells could count towards prepared total. ([1054](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1054))
- Missing wand, scroll, and potion action usage with unchained revised action economy. ([1056](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1056))
- Strength not added to CMD correctly. ([1062](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1062))
- Display formulas instead of values for conditionals in damage hover infoboxes. ([1072](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1072))
- Secondary attack modifier penalty could bleed into non-natural attacks. ([1074](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1074))
- Attacks without images prevented the lite sheet from rendering
- Quick actions could overflow outside of the character sheet.
- Size bonus was applied twice for generic attacks (inverted for CMB, negating it).
- Some spells were affected by weapon damage instead of spell damage changes.
- Other action type benefited from weapon damage changes.
- Fix DC labels on items showing data without bonuses from changes
- Remove loop in favor of a formula for calculating carry capacity ([1061](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1061))
- Fix deprecation warnings in the Vision Permission dialog ([1083](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1083))
- Removed duplicate info in generic attacks.

### Changelog

- Added a setting for XP distributor opening to Experience Config ([1063](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1063))
- Added human-readable names and translation support to actor and item types.
- Improved ACP and Max Dex sources in hover infoboxes. ([518](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/518))
- Allow dragging actors from the sidebar to add them to an ExperienceDistributor
- Display context notes in hover infoboxes.
- Display damage type if present for damage hover infoboxes instead of untyped.
- Added CMD strength ability score substitution configuration.
- Improve world load times and actor update performance
- Rework spellbook CL and concentration display. ([773](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/773))

### Compendium

- Update the Award XP sample macro to use the ExperienceDistributor instead
- Fix ammunition data

### API

- Round time set to 6 seconds to support Foundry's time tracking. ([1038](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1038))
- Change ExperienceDistributor to use an array of actors instead of a combat object
- Added the hook "pf1.gainXp" for adding experience through the ExperienceDistributor
- Removed unused .concentration from spellbooks.
- Add `pf1.postInit` hook ([1045](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1045))
- Added Nat 20 and critical threat selectors. ([1053](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1053))
- Revamped cmb.total to be fully derived value and introduced cmb.bonus for the old functionality. ([1064](https://gitlab.com/Furyspark/foundryvtt-pathfinder1/-/issues/1064))
- Added CombatPF to replace prototype overriding core Combat.
- Added TokenPF to replace prototype overriding core Token.

## 0.79.1

### Bug Fixes

- Attack display doubling sometimes in combat tab (!258 by mkahvi)
- `/damage` and `/heal` still triggered Dice So Nice to roll dice twice (#1015)
- Proficiency penalty was incorrect when rolling (!260 by mkahvi)
- Wound thresholds were ignoring temp HP (!264 by mkahvi) (#1032)
- Skill lock button was invisible on NPC sheets (!268 by mkahvi) (#1036)
- Dice modifiers could break if they had special characters `<>`
- World migrations reset the max HP of lite sheet using actors to 0 (#1031)
- Some attack bonuses/penalties weren't shown (!272 by mkahvi) (#784)
- Some maneuver bonuses/penalties weren't shown (!271 by mkahvi) (#714, #481)
- Various fixes to attack tooltips (!270 by mkahvi) (#1034)
- Attack, Feat and Spell DC labels weren't being shown anymore (#988) (!292)
- Token elevation handling was handling relative negative values as positive (#1047) (!295)
- Item tags were visible to players while unidentified, possibly revealing its actual name (#1057) (!293)
- Sources which set an actor's maximum dexterity bonus to 0 weren't being shown (#1039) (!289 by mkahvi)
- Skills incorrectly added zero ACP values to their sources (!287 by mkahvi)
- Changing a buff's icon didn't update the icon on tokens for that actor (!280)

### Changelog

- Container item deletion confirmation dialog says what is being deleted (!259 by mkahvi) (#1004)
- Add conditionals and buffs to damage preview on actor sheets (!262 by mkahvi)
- Add more spell details (!277 by mkahvi)
- Allow translating sheet names (!273 by mkahvi)
- Added a dialog for distributing experience points after a combat (!284)

### API

- Added Hook `itemUse`:`postAttack` before chat message is generated (!267 by mkahvi) (#487)

### Localization

- Updated the German localization (thanks Nico Weichbrodt!)

### Compendium

- Wild Shape's casts per day formula was incorrect (!283 by scapegoat57)

## 0.79.0

### Changelog

- Added `conditionals` to the variables of "use"-type script calls of items that can have Conditional Modifiers
- Updated loot sheet creation macro (!238 by mkahvi)
- Added damage immunity and vulnerability to the Apply Damage dialog (!236 by mkahvi) (#995)
- Add modifiers in breakdown to ability test rolls (!234 by mkahvi)
- Add toggleable caster level and concentration checks to spells and their chat cards (!230 by mkahvi) (#333)
- Add unlock button to edit infrequently changed skill settings on an actor (!241 by mkahvi) (#807)
- Better describe attack number and bonus in combat tab (!227 by mkahvi)
- Conditionals and unlabeled bonuses appear in roll breakdowns now (!217, !223 by mkahvi) (#863, #977)
- Add native language names to language selection (!250 by mkahvi) (#753)
- Add duration field to buffs for future use (!249 by mkahvi) (#808)
- Improved damage display on combat tab (!226 by mkahvi)
- Added change targets for Carry Strength and Carry Multiplier (!248 by mkahvi) (#812)
- Added separate option for distance units (!253 by mkahvi) (#705)
- Unify style of coin and fate rolls (!254 by mkahvi) (#675)
- Improved tooltip performance (!255 by mkahvi)
- Append numbers to additional items created on actors (!256 by mkahvi)

### Bug Fixes

- Duplicating an item duplicated the links as well (!243 by mkahvi) (#952)
- Ability checks were displaying unnecessary info on rolls (!235 by mkahvi) (#791)
- Fix warnings about deprecated code in console (!228 by mkahvi)
- Ability check changes were not working for new actors (!231 by mkahvi) (#1008)
- Duplicating items sometimes did not label them as copies
- Non-GMs could not drag conditional modifiers (!242 by mkahvi)
- Fix skill ranks allowing null values (!237 by mkahvi) (#933)
- Operators were not being treated as such in roll formula
- Maximum Wound Points were half of what they should be (!247 by mkahvi) (#1009)
- Closing the item deletion confirmation dialog prevented reopening it (#1005)
- `attributes.hp.temp/nonlethal` were missing from token resources selection
- Dice So Nice rolled twice for attack rolls (#1015)
- Reflex saves were unaffected by the pinned condition (!239 by mkahvi) (#878)

### API

- Added classes to all pf1 dialogs: `add-character-class, apply-hit-points, use-attack, roll-initiative, duplicate-initiative, get-number, get-actor, die-roll, damage-roll, create-consumable`
- Removed unused `ActorPF.data.data.creatureType` (!225 by mkahvi) (#1001)
- Added `ActorPF.data.data.traits.languages.total` getter to get all the actor's languages, regardless of source (!233 by mkahvi)
- Added `.attack-notes`, `.effect-notes` and `.general-notes` classes to various notes in chat messages (!246 by mkahvi)
- Uniform item size variables (!252 by mkahvi) (#733)

## 0.78.18 (Hotfix)

### Bug Fixes

- Fixed an issue where unlabeled entity links could prevent sheets from opening

## 0.78.17

### Bug Fixes

- Subskills (e.g. Performance skills) could no longer be rolled (#990)
- Macros could no longer be reordered on the macro bar (#992) (thanks mkahvi!)
- Resources don't correctly evaluate inside of a change (#908)
- Encumbrance for strength scores over 30 was incorrect (thanks websterguy!)
- Spells Known (All) behavior was mixed into Casts Per Day (#999) (thanks mkahvi!)
- Items in containers could not be opened by non-gms if the container was not on a character (#972)
- Preactivated buffs added to an actor didn't create token status icons (#970)
- Leveling up could cause the sheet and dialog to error and crash (#947)

### Changelog

- Entity Links can now define extra data attached to the enriched button via `{extra data::Button label}`
- `@item.primaryAttack` now reflects if an attack is primary instead of the Item the attack is from (thanks mkahvi!)
- Point Buy will default to current ability scores instead of resetting to 10 every time it is opened (thanks mkahvi!)

### Compendium

- Firearms had weight 10x higher than expected (#968)
- Fixed most bows having max range of 1 instead of 10 (#967)
- Bravery feature incorrect (#958)
- Removed Cone of Slime (#822)
- Snowball updated (#811)
- Inflict were spells missing damage
- Some weapon critRanges were `NULL`
- Wild Shape uses formula was incorrect
- Contributions from Let's Contribute. Many thanks to fadedshadow, apetina, Mana, DiamondSentinel, Blabermouthe, Vormav, websterguy, Krystaline, erickira, Lyka, SleepyWizard, claudekennilol, Tarbarian, Frost

### API

- Added `ammo`, `spell`, `save` metadata to rolled ChatMessages (thanks mkahvi!)

### Localization

- Updated the Chinese localization (thanks bnp800!)

## 0.78.16

### Bug Fixes

- An item's currency unit was not displayed to players in item sheets (thanks mkahvi!)
- Checking "Lose Dex to AC" for an item broke the actor's touch AC (thanks mkahvi!)
- Generic attack changes appeared with an extra curly brace in the bonus breakdown (thanks mkahvi!)
- Some data from classes was calculated incorrectly or missing in roll data (e.g. HD and BAB)
- Prestige classes were using incorrect values for their base saves (thanks Rastafa!)
- Standardized drag/ drop functionality with core Foundry API (thanks mkahvi!)
- Fix currency dragging between actor sheets
- Fix background skills incorrectly using adventure skill points (#946, #951) (thanks mkahvi!)
- Dropping an item back onto itself caused it to resort in the list (#963) (thanks mkahvi!)
- Fixed cantrips on new actors before rest (thanks mkahvi!)
- Fixed overeager token variable migration (thanks mkahvi!)
- ACP and Max Dexterity Bonus limit adjustments through changes weren't working (thanks mkahvi!)
- Fixed actors incorrectly always considered proficient (thanks mkahvi!)
- Maximum charge formulas were missing from compendium items

### Changelog

- Added ability to drag saves to macro bar to create macros
- Make new attacks use iterative formula instead of hardcoded calculations (thanks mkahvi!)
- Past choice on change type selector is now auto-selected when opened (#861) (thanks mkahvi!)
- Added `chatMessage` parameter for use, useAttack and useSpell item functions (thanks mkahvi!)
- Added `data` parameter to use script calls with miscellaneous variables (thanks mkahvi!)
- Allow non-spells to have an area (thanks mkahvi!)
- Added armor and shield info in roll data (e.g. @armor.ac, @shield.enh, @armor.total) (thanks mkahvi!)
- Show create consumable dialog when a spell is dragged to any actor sheet tab other than spells (thanks mkahvi!)
- Added hit points and hardness to containers (#978)
- Add critical confirmation bonus to changes (#517) (thanks mkahvi!)
- Hide DC from chat cards to non-owners (#957)

### API

- Deprecate `Actor#getSkill` in favor of `Actor#getSkillInfo()`

### Localization

- Changed certain hard-coded bits of text to translatable strings (thanks mkahvi!)
- Updated Spanish localization (thanks Wharomaru Zhamal!)
- Updated Italian localization (thanks Davide Mascaretti!)

## 0.78.15

### Bug Fixes

- Spellbooks showed incorrect message on spell slots
- Rolling initiative from actor sheets did not actually roll anything
- Fix `findInCompendia` failing if pack hasn't been initialized (#923)
- Fix `findInCompendia` crashing if search is longer than 7 words (#937)
- Brackets in item names could prevent certain rolls and saves
- Fix inability to create custom background skills (#935)
- Fix container user permissions (#938)
- Fix racial HD's hit points being calculated as NPC HD (#932)
- Fix actor import process keeping old items
- Craft was incorrectly listed as an adventure skill with the background skills optional rule (thanks mkahvi!)

### Changelog

- Made base skills with the possibility for subskills (artistry, craft, lore, perform and profession) rollable (#934)

### API

- Changed `utils.dialogGetNumber` to select input contents by default and use the Enter key for submission

### Compendiums

- Attack and effect notes could not be added to items from compendiums. Their existing notes were displayed incorrectly on chat cards.

## 0.78.14 (Hotfix)

### Localization

- Updated the Italian translation (thanks Davide Mascaretti!)

### Compendiums

- Compendium items were missing a lot of details since last version
- Fix error on rolling defenses (#920)

### API

- Added `flags.pf1.subject` to chat message data to know what it's about (thanks mkahvi!)

## 0.78.13

### Bug Fixes

- Fixed the Bestiary Browser not loading in a lot of cases (thanks mkahvi!)

### Changelog

- Made ability for AC, Touch AC and CMD configurable (thanks mkahvi!)
- Implemented a rolldata variable for spellbooks' ability modifiers, using `@spells.primary.abilityMod` for example (thanks mkahvi!)
- Added Attack of Opportunity and Nonaction to the list of available actions for items (thanks mkahvi!)
- Slightly changed style of attack and effect note input
- Added favoured class notes (thanks mkahvi!)

### Compendiums

- Fixed Magic Missile firing one missile too many early on (thanks @websterguy!)
- Truncated compendium entry variables, reducing memory usage

### API

- Most rollable functions on actor and items (such as `actor.rollAbilityTest` received an extra variable for their options: `chatMessage`, which is a boolean defaulting to true, which determines if a chat message should be created (thanks Michael Weisner!)

## 0.78.12 (Hotfix)

### Bug Fixes

- The system could not load on certain server configurations (e.g. Forge hosting) (#909)

## 0.78.11

### Bug Fixes

- Level Up messages did not respect roll mode settings
- Resource maximums were out of sync (#892)
- Fix rolling defenses on unlinked tokens (#782)
- Data parsing within roll preprocess functions was returning incorrect values
- /damage and /heal roll functions were broken (#901)
- CL wasn't getting the appropriate value in roll data for changes
- Nullish operator didn't work in roll formulas (#903)
- Low-light vision settings weren't read on prototype token configuration windows (#906)

### Changelog

- Made items without use script calls always show a chat card on use (#891)
- Added `token` to the variables of Script Calls
- Added `template` to the variables of "use"-type Script Calls

### Compendium

- The formula for Agile Maneuvers was changed in compliance with the nullish operator fix (see above), and will need to be adjusted or re-imported on any actors making use of it

## 0.78.10

### Bug Fixes

- Fix token deletion not hiding the tooltip
- Changing actor size didn't save it on its token(s)
- Resource values were no longer able to be referenced in formulas (#885)
- Deleting an actor or item with an open sheet caused the sheet to be uncloseable
- Magic items couldn't be identified from actors' notes tabs (#879)
- Certain token status conditions weren't linked to their actor (#871)

### Changelog

- Added script calls for changing buff and class levels

### API

- Added `utils.findInCompendia` to fuzzy search loaded compendia by name as fast as possible
- Added `utils.sortArrayByName` to sort compendium index arrays for localization
- Added `utils.binarySearch` to quickly find an object in a sorted array

### Compendiums

- Most armor in the compendium didn't have an initial slot type set (#883)
- Reimported Bestiaries with updated SBC. Missing ones will be added in future updates.

## 0.78.9

### Bug Fixes

- Fix armor and shield type roll data not working (#873)
- The Primary Attack checkbox was hidden from natural attacks (#875)
- Fixed not being able to adjust action charges on the NPC Lite sheet (#876)

### Changelog

- Added item script and macro calls to their advanced tabs, for users familiar with JavaScript
- Sped up the loading of compendium browsers
- Reduces memory usage of compendium browsers (at least client side, probably also partially server side)
- Separated optional low-light vision multipliers on token configurations into dim and bright

## 0.78.8 (hotfix)

### Bug Fixes

- Attack rolls from unlinked tokens didn't work

## 0.78.7

### Bug Fixes

- Fixed not being able to alter activation data with the Unchained Action Economy rules (#857)
- Bonus feats from changes weren't showing in the sources list
- Condition icons wouldn't show up on linked tokens (#867)
- Fine creatures were too small, and thus made changes to token presets below Medium size (may need manual alterations to previous tokens, if desired) (#864)
- The setting for when low light vision should be applied was not working (#849)
- Fixed conditions visibility weirdnesses (#859)
- Formulaic action ranges were showing as [object Object]

### Changelog

- Made items' changes tabs look a bit prettier
- Name iterative attacks in roll flavors (old extra attacks may need to manually receive a flavor) (#866)
- Allow users with permission to modify world settings to reach world tooltip settings (#847)

### API

- Started using token UUIDs in chat cards (partially implements #868)

## 0.78.6

### Bug Fixes

- The Sickened and Shaken condition showed a non-descript 'penalty' roll flavor (#854)
- Fixed not working Fractional Base Bonuses (#856) (thanks mkahvi!)
- Fixed an issue some users had with missing images (thanks mkahvi!)
- Wound Thresholds weren't working correctly (#853)
- Fixed showing [object Object] tags in items (#851)
- Condition icons wouldn't show up on unlinked tokens

### Changelog

- Added saving throws to the NPC Lite sheet

### Compendiums

- Updated all weapon descriptions (thanks fadedshadow589!)
- Added eastern weapons (thanks fadedshadow589!)

### Localization

- Update the Chinese localization (thanks bnp800!)

## 0.78.5

### Bug Fixes

- Critical hits weren't rolling naturally (#842)
- Roll data wasn't available in TinyMCE editors (#840)
- Item flags were no longer directly visible on items (#835)
- Drag and drop for CMB and BAB table headers was not enabled, preventing the creation of their respective macros.
- Conditional modifiers had no valid (sub-)targets
- Spells could not be used (#844) (thanks websterguy!)
- Apply Dexterity restrictions from the Pinned condition RAW (#845)

### Changelog

- Added roll flavor text for default attack modifiers (such as power attack)
- Conditional modifiers can now adjust the size used for the roll (thanks Krzysztof Gutkowski!)
- Added change targets that alter ability modifiers only

### API

- Changed the actor sheet's handling of feature types, enabling features of non-default types to be displayed.

## 0.78.4

### Bug Fixes

- AC bonuses from armor and shields weren't being applied
- Certain kinds of roll formulas weren't working, such as `/r 1d100cs>=50` (#838)

### Translations

- Updated the French translation (thanks rectulo!)

## 0.78.3

### Bug Fixes

- Weapon type list was incorrectly empty
- The bestiary browser wouldn't open
- Bonus feats from changes were doubled on the total feat count

## 0.78.2

### Bug Fixes

- Combatant duplication wasn't working
- Custom class tags weren't working
- Attacks for unlinked tokens were not working
- ACP wasn't being subtracted from appropriate skill checks

## 0.78.1

### Bug Fixes

- Some rolls using math functions could cause errors
- Item activation data was hidden
- Context notes weren't showing up on item sheets
- Items couldn't be sorted on actors or containers
- Items with linked charges were behaving oddly
- Token bars targeting charged items were incorrectly read-only

## 0.78.0

Initial release for Foundry 0.8.x

### Changelog

- Added an option for low-light vision multiplier on tokens

## 0.77.24

### Changelog

- Improve display of condition icons in buff tab (#795)
- Added sleep condition (works the same as helpless)
- Add charge counters to actor/token quick actions (thanks mkahvi!)
- Added special movement types to the Drag Ruler integration (thanks Manuel Vögele!)
- Added a search bar in inventory, feats, buffs and spells lists (thanks mkahvi!)
- Added quick link to compendium browsers on actors' buffs tabs and on container items' inventory tabs
- Start container type items on their contents tab
- Add bonus feat count from changes to the feat table (#803)

### Bug Fixes

- Actors could fail to render with some spellbook configurations (#797)
- Cantrips would never display on spell sheet if setting was off
- Copying an attack with linked ammunition to another actor made it behave strangely (#801)
- Fix error on rolling concentration with no ability associated with the spellbook (#825)
- `@abilities.<abl>.base` and `@abilities.<abl>.baseMod` weren't being updated properly (#824)
- Class Associations weren't being copied over anymore

### Compendium

- Applied migration to all compendia. Initial loading will be slow
- Updated
  - Bestiary: Fire Elementals, Mudlord, Attic Whisperer, Wraith Spawn, Giant Phantom Armor, Werebear
  - Class Abilities: Fast Movement (UMK), Rage (UC), Rage
  - Classes: Investigator, Unchained Monk, Unchained Rogue [linked features above]
  - Feats: Animal Affinity, Athletic, Deft Hands, Precise Shot, Scribe Scroll
  - Items: Alchemist's Lab (X), Cloak of Resistance +X, Disguise Kit, Ring of Protection +X, Thieves Tools (X), Wrist Sheath
  - Spells: Burning Disarm, Burning Entanglement, Campfire Wall, Confusion, Cure X Wounds, Ear-Piercing Scream, Fire Snake, Flame Strike, Flurry of Snowballs, Ice Spears, Ice Storm, Magic Missile, Rejuvenate Eidolon X, Restoration X, Thundering Drums, Thunderstomp X, Volcanic Storm, Scorching Ray, Stone Discus, Infernal Healing X
  - Weapons: Lantern Staff
- Added
  - Class Abilities: Trapfinding (INV), Trapfinding (UC), Bonus Feat (UMK)
  - Common Buffs: Fighting Defensively, Mutagaen con/dex/str, Total Defense
  - Feats: Extra Rogue Talent
  - Spells: Admonishing Ray
- Thanks to earlgrey, apetina, fadeshadow589, websterguy, Chris|Lyka, LePheel, SleepyWizard, and Mana!

## 0.77.23

### Bug Fixes

- Energy drain was incorrectly hiding spell slots (#792)
- Spells outside of level requirements were inaccessible on the sheet
- Players could not open items inside containers (#794)
- Caster Level bonus increase incorrectly affected spell progression
- Currency transfer of containers did not work as a player

## 0.77.22

### Bug Fixes

- Rolling untrained skills requiring training sometimes didn't show a note saying it's untrained (#780)
- Custom styles ("not implemented"/ "steps required") for TinyMCE editors would fail to load
- Resources weren't updated for unowned actors (#788)
- Creating characters while other players are connected would cause errors on their clients
- Fixed an issue with duplicate buff effects when multiple players who owned the actor were connected and the buff adjusted max health

### Changelog

- Added an option to disable compendiums, preventing them from showing up in compendium browsers for anyone
- Added a compendium browser for buffs
- Tell Drag Ruler to use metric system if system is metric (thanks Nico Weichbrodt!)
- Loot sheets now add coinage to the total sell value at the bottom
- Added a world setting for an alternative reach rule, which hides the outer corners of 10-ft reach measurements
- Added a new method of automatic spell slot calculation (thanks claudekennilol!)
- Added a new way of choosing change and context note targets
- Added more targets for changes (thanks mkahvi!)
  - BAB
  - Touch AC
  - Flat-footed AC
  - Flat-footed CMD
- Made the action type column for certain types of items on actor sheets more compact (#785)
- Added a new function for formulas: `sizeReach`. See the in-game help browser for more information.
- Enhanced the conditions list on Actors' buffs tab with icons
- Added ability to drag currency between sheets (or to the same sheet)
- Allow feats to be disabled (#570)
- Dictionary Flags from items' advanced tabs can now be used in roll formulas. See the in-game help browser for more information.

### Compendium

- Added a macro to calculate spell book cost

### Localization

- Updated the French localization (thanks rectulo!)

### API

- Added a hook for activating and deactivating of buffs which are active on actors keyed `pf1.toggleActorBuff`. See the system's GitLab wiki for more information.
- Added a hook for activating and deactivating of conditions on actors keyed `pf1.toggleActorCondition`. See the system's GitLab wiki for more information.
- Added `CurrencyTransfer.transfer` and `CurrencyTransfer.convert` to application API

## 0.77.21

### Bug Fixes

- ACP from equipment and encumbrance incorrectly stacked
- Shorthand deferred Damage/ Heal rolls (/d, /h) would prevent chatcard rendering
- Scroll position incorrectly reset between changes to an item sheet while on the changes tab (#764)
- "Learned At" property of spells was not respected when adding to sheet (#299)

### Changelog

- Term specific flavor text can be included in formulas without causing errors in preparation for functionality to be added in 0.8.X
- Added `@attributes.savingThrows.X.base` to actor roll data (#760)
- Added a notes tab to NPC Lite sheets (#774, #244)

### Compendium

- The Create Loot Sheet macro was borked

### API

- The `actorRest` hook has been reworked slightly. It adds 2 new parameters: `updateData` and `itemUpdateData`. See the system's GitLab wiki for more information.
- Added the `pf1.getRollData` hook. See the system's GitLab wiki for more information. (#769)
- The ItemPF methods `getItemDictionaryFlag` and `removeItemDictionaryFlag` defaulted to an empty object rather than an empty array, erroring out in certain cases (#761)
- Setting a dictionary flag on an instance of ItemPF starting with numbers, but also containing alphabetical characters, incorrectly converted the value to a number (#763)

## 0.77.20

### Bug Fixes

- Item links could not be deleted
- Conditional modifiers could not adjust an item's DC
- Fix compendium browser packs filter lacking options (#683)
- Fix maximum dexterity bonus (#736)
- `@combat.round` was rarely refreshed (#738)
- Dice So Nice settings were ignored for attack and damage rolls

## 0.77.19

### Bug Fixes

- Prevent error in console on unowned items containing formulaic attacks
- Consumables had two Advanced tabs when identified (#715)
- Damage rolls ignored the damage multiplier selected in their attack dialog (#706)
- The level up dialog was accepting multiple clicks (#717)
- Players received roll errors for actors they did not own (#716)
- Context notes didn't show for spells with no effects (#711)
- Item durations with formulas errored on unowned items (#719)
- Fix range calculation on sheets not working anymore (#725)
- Encumbrance applied incorrectly with Strength altering changes (#729)
- Item aura strength was empty (#731)
- Fix race condition causing issues with adding context notes and changes (#730)
- Spontaneous-flagged spellbooks initially showed an undefined value for casts per day remaining

### Changelog

- Added `/d` and `/h` as shorthands for `/damage/heal` (#698)
- Spellbook names can now be customized in their spellbook settings (thanks claudekennilol!) (#610)

### API

- Add aliases to spellbook reference names (e.g., `@spells.sorcerer` as well as `@spells.primary`) (thanks claudekennilol!) (#510)
- ActorSheetPF#importItem doesn't error if `event` isn't passed anymore
- An error prevented modules from extending PF1 classes under some circumstances (e.g. Forge hosting)
- `ActorSheetPF#currentPrimaryTab` will now report tabs that aren't inventory as well
- Add `game.pf1.utils` containing dialogGetActor, dialogGetNumber, createTag, getItemOwner, getActorFromId, getChangeFlat, convertDistance, convertWeight, convertWeightBack, and measureReachDistance

### Localization

- Updated the Chinese localization (thanks bnp800!)
- Updated the German localization (thanks Nico Weichbrodt!)

### Compendium

- Haggis, Caviar, and Chocolate were missing
- Soap had wrong weight
- Restoration spells were missing classes
- Entangle spell was missing a template
- Burning Arc, Magic Missile, Storm Step, and Blast Barrier were missing damage
- Breath Weapon, Freedom's Call, Charmed Life and Stunning Fist had incorrect formula
- Added back in similarly named class features that were automatically pruned

## 0.77.18 (Hotfix)

### Bug Fixes

- Item dictionary flags defaulted to an object, causing older items to sometimes not open

### API

- Due to recent workflow changes, most PF1 classes will now need to be imported from `/systems/pf1/pf1.js`, instead of `/systems/pf1/modules/**/*.js`
  - Some modules referencing PF1 classes will need an update before they work again (many apologies)

## 0.77.17

### Bug Fixes

- Race condition preventing functionality could still happen for `heal/ damage` inline rolls
- Potential fix for compendium browsers not opening (#669)
- Fixed error on deleting an active buff
- The `@spells` roll data variable was incorrectly getting deleted in the beginning of an actor update
- Encumbrance wasn't being taken into account when calculating skill bonuses
- Fix `@classes` entries in roll data for classes without a custom tag
- Adding a class to an unlinked token didn't add class features
- Items in containers couldn't have their image changed while within the container

### Changelog

- Added a basic level up dialog
- Added dialog on dragging a class to an actor to determine how to import the class, with the choice to make use of the new level up dialog
- Removed ability score change flags (0 Str, 1 Cha, etc.)
- Always submit data on closing an actor or item sheet
- Added bonus skill ranks and bonus feats as change targets
- Improved speed on creating or removing multiple class features as a result of changing class level
- Always show "full attack" button for melee/ranged weapon attacks (thanks Grarl!)
- Added Manyshot to ranged weapon attacks (thanks Grarl!)
- Separate base class hit points from favoured class hit points in source info
- Added flags to items, which can be referenced by modules and macros (see API changes below)

### API

- `RollPF` and `RollPF.safeRoll` have been added to the system for better roll error handling
- `CONFIG.debug.roll` has been added to log all dice errors and warnings to console
- Moved `useSpell` from ActorPF to ItemPF
- Flags have been added to all items, which can be referenced by modules
  - `ItemPF.hasItemBooleanFlag(flagName)` and `ItemPF.getItemDictionaryFlag(flagName)` can be used to determine what flags an item has
  - `ActorPF.hasItemBooleanFlag(flagName)` can be used to check whether an actor possesses a boolean flag on any of their owned items

### Compendium

- Bestiaries were using incorrect sizeRoll arguments for non-medium monsters
- Replaced some external links with compendium links for some races

## 0.77.16

### Bug Fixes

- Changing a context note's main category didn't set the note's secondary category to something appropriate, making it not show up unless edited again
- The extra attacks generated by haste and rapidshot did not expend ammunition (thanks Grarl!) (#658)
- The extra attacks generated by haste and rapidshot were incorrectly made with the attack roll penalty for iterative attacks (thanks Grarl!) (#662)
- Actor's carry weight could be calculated wrong if world coin weight divisor was set to `0` (#626)
- Fixed race condition preventing inline heal/ damage rolls from working sometimes
- Fixed CL and Concentration bonuses not applying on rolls
- Fixed spellbook ranges not updating
- Limit sizeRoll minimum and maximum
- Limit container quantity maximum to 1
- Spell slot costs of 0 still deducted available spell slots
- Couldn't update item resources on actors with macros anymore
- Fix incorrect spell charge enforcement rules, which made spell costs undefined in some cases
- Adding to a - ability score incorrectly added to the value
- Mythic tiers were incorrectly added to Hit Die
- Fix incomplete subskill data crashing initialization

### Changelog

- Improve migration messaging and add localization strings
- Added chat context notes to show remaining ammunition after using an ammunition-using attack (thanks Grarl!)

### Compendium

- Bestiaries were using incorrect sizeRoll arguments
- Freedom's Call (class ability) was a free action

## 0.77.15

### Bug Fixes

- Changing a class' level on an actor didn't update the actor, unless health calculation was set to automatic
- Rules for d10s weren't acknowledged in `sizeRoll`
- Duration tags in item sheets weren't calculated in preview (thanks mkahvi!)
- The feats-by-level calculation for actors did not take NPC classes into account (thanks Grarl!)
- Roll data resources weren't updated for changes
- Damage bonuses and penalties were being applied to healing effects
- Dragging an item from one container to another with an item with the same ID didn't do anything
- Dragging an item from one container to another duplicated the item instead of moving it
- Toggling buff visibility didn't update active ones on tokens
- Toggling a condition for linked actors with multiple tokens on the current canvas created multiple token effects for each one
- Alternate attack chat cards didn't show buttons if they didn't have damage rolls
- Required experience points weren't updated timely
- Fixed not being able to change maximum hit points on NPC Lite sheets
- Using items with measure templates subtracted uses before confirming the template
- rollInitiative API did not use override formulas

### Changelog

- The variables `item` and `actor` are now present in a script change
- Added label support for `/damage <roll> #label` and `/heal <roll> #label` chat commands
- Added inline support for damage/ heal commands
- Added a 4th parameter to `sizeRoll` which is a number indicating the original size you are measuring from (4 for medium)
- Altered the `@size` roll data variable. It's no longer a relative value based off medium. Instead, it's now an absolute size number (with 4 being medium)
  - The `sizeRoll` function has been altered to accomodate for this change. The player shouldn't need to alter anything
- Untyped bonuses to AC no longer grant that bonus to CMD
- Added the source compendium's label in compendium browsers
- Using a custom formula inplace of a d20 for an attack will now highlight that fact in the chat card
- Implemented bring to top functionality for actor traits, rest, and point buy calculator dialogs and item sheets
- Added error catcher to PF1 socket calls (thanks mkahvi!)
- Added an option for Haste in the attack roll dialog (thanks Grarl!)
- Added an option to give an attack a number of extra attacks based on a formula (thanks mkahvi!)
- Re-enabled speedy actor updates

### API

- Added more hooks, and created a documentation file for hooks
- Added a small tutorial on creating custom changes
- Update Drag Ruler API for Version 1.3.0 (thanks Stäbchenfisch!)

### Localization

- Updated the French localization (thanks rectulo!)
- Updated the Chinese localization (thanks bnp800!)

### Compendium

- Swarms' tokens were set to their creature size instead of their space size
- Monks weren't receiving AC Bonus automatically
- (Unchained) Monk and Brawler AC bonuses used formulas that were no longer working
- Trapfinding was only giving bonuses to Disable Device vs traps instead of always
- All versions of Channel Energy have received templates and improvements (thanks Grarl!)
  - Manual intervention is required for pre-existing actors using these class features. Remove the previous class feature and re-add it from the feature compendium
- Haste and Slow had their measure template radius fixed

## 0.77.14 (Hotfix)

### Bug Fixes

- Enhancement and masterwork bonuses to attack and damage weren't applying
- Show correct label for DC fields in items
- Show correct range label in item description sidebar
- Change formulas could cause errors that were not properly handled

## 0.77.13 (Hotfix)

### Bug Fixes

- Armor, shield and natural armor bonuses could double on unlinked tokens

## 0.77.12 (Semi-hotfix)

### Bug Fixes

- Basic melee and ranged attack rolls weren't working
- Certain temporary bonuses/penalties, such as the caster level from a spell's attack dialog, didn't apply

### Changelog

- Added option to only show tooltips while Control is held
  - Similarly, without that option enabled, holding Control now hides tooltips

## 0.77.11 (Hotfix)

### Bug Fixes

- Armor, shield and natural armor wasn't being applied to actors

## 0.77.10

### Bug Fixes

- Ability score penalties were not being reflected in roll data's `@abilities.<ability>.penalty`
- Tooltips for tokens became wider with more items
- Several migration fixes. Please let us know if migration doesn't finish for you.
- Attack range calculation on actor sheets could cause the sheet to be unopeneable
- Fly maneuverability bonuses/penalties didn't apply to the fly skill bonus
- Changing an attack's damage ability multiplier in the attack dialog changed the value for the item in-memory
- The Wound Threshold optional rule was no longer working
- Dexterity bonuses to CMD were incorrectly limited by the actor's Maximum Dexterity Bonus
- Some attributes (hp, max xp, and some others) were incorrect after importing an actor
- Climb and Swim speeds gained from changes didn't apply a racial skill bonus

### Changelog

- Changed default world settings for tooltips to hide most information from players (may be reverted in the future)
- Added better option to hide actor names from players in tooltips
- Class Association links now indicate if the referenced item doesn't exist
- Clearing an ability score turns it to a null (-) value
- Level 0 spells now use up charges, but will be migrated to not auto deduct charges this version
- Adjusted when players can see a token's name in the tooltip slightly, so that they can always see the actual name if they at least have Observer permissions
- Added `/damage <roll>` and `/heal <roll>` chat commands
- Tooltips will not show while Alt is held
- Attack and Damage bonuses from changes are now deferred until attack rolls
  - This also means that enhancement bonuses to attack and damage don't stack with enhancement bonuses (and the masterwork property) of attacks
- Added sample macro to show an actor's social defenses (demoralize/intimidate and diplomacy DCs)

### Compendium

- Changes added to Fleet, Greater Shield Focus, Shield Focus (Feats) and Track (Class Feature)
- Slayer (Class) - Talent initial level incorrect
- Rage (Class Feature) - Use formula incorrect
- Smite Evil (Class Feature) - Scaling off HD instead of level
- Divine Grace (Class Feature) - Minimum 0 to benefit
- Mirror Image (Spell) - Workaround for roll bug
- Chakram (Weapon) - Not listed as ranged
- Wraith (Bestiary1) - No attacks
- Boar (Bestiary3) - Masterwork checked on attack
- Spectre (Bestiary4) - Incorrect attacks

## 0.77.9 (Hotfix)

### Bug Fixes

- Buff icons on unlinked tokens could not update themselves (#583)
- Conditional modifiers couldn't be modified
- Updating items with context notes resulted in an error message
- Unlinked tokens were reset back to their base stats when migrating worlds
- Encumbrance was incorrectly applied when equal to or above the threshold, instead of when above the threshold

### Changelog

- The GM can now hold Shift to see tooltips from a player's perspective
- All equipped armor is now shown in tooltips, rather than just the first piece of armor in the actor's inventory

## 0.77.8

### Bug Fixes

- Clearing the experience point field didn't reset the value to the minimum for the current level
- Fix error when orphaned tokens were on a scene
- Clearing the range field on an attack would make the actor's sheet unviewable
- Not Implemented/ Steps Required text styles were incorrect with bold/ italics
- Actor sheet wouldn't render if two classes/ features named the same thing granted proficiency
- Spell range type could not be changed
- Duplicating items did not give their changes a new identifier
- Prevent errors and having to click delete twice on certain item properties
- Continuous health wasn't rounding
- (Compendium) Acid Arrow was incorrectly set up to have a Ranged Weapon Attack
- Fixed error messages for players when GM updated an entity which would do something with an actor's hit points they didn't own
- NPC Lite sheets were bugging out majorly
- Wounds and Vigor incorrectly checked for PC rules even for NPCs
- Adding a pre-active buff to an actor didn't add a token overlay

### Changelog

- Unhide Links tab instructions on items (thanks mkahvi) (#565)
- Added a fairly robust (initial) tooltip system
- Added `combat.round` to actor and item roll data

## 0.77.7 (Hotfix)

### Bug Fixes

- The Token configuration window could give an error and refuse to close in some cases
- Updating custom resources while only 1 bar was visible on the actor's tokens gave an error
- Removing a class with links gave an error

## 0.77.6

### Bug Fixes

- Certain attacks and spells with attack or damage rolls weren't working
- Roll data for items could be inconsistent
- Importing older entities from a compendium gave it incorrect attributes
- Custom weapon proficiencies were not properly collected (thanks Ritsuna!)
- Custom resources occasionally didn't get a tag
- Spell ranges didn't update correctly
- The Pinned condition didn't apply a -4 penalty to AC
- The Prone condition didn't apply a -4 penalty to melee attack rolls
- Size bonuses and penalties weren't added to relevant skill checks

### Changelog

- Some lists are sorted by their localised strings now, e.g. conditions and languages (#390)

## 0.77.5

### Bug Fixes

- Fix some actor sheets not being openable if they contained certain attack configurations
- Fix range not being calculated on actor sheet preview
- Fix subskill bonus values being NaN
- The 'Helpless' change flag and the pinned condition incorrectly removed dexterity penalties
- Saving Throw bonuses from racial HD weren't being added
- Armor and encumbrance weren't slowing down actors
- Encumbrance only took base strength into account
- Damage breakdown tooltips on actor sheets didn't show correct ability bonus

## 0.77.4 (Hotfix)

### Bug Fixes

- Fix actor skill bonus values being too high in some cases
- Fix Active Effects throwing errors on creation
- Some sources were not listed for AC fields
- Unlinked tokens received incorrect information during migration processes
- Critical hit multipliers were effectively always 2

## 0.77.3

### Bug Fixes

- Compendium browsers didn't open if there was too much metadata to process

### Changelog

- Add counter for total mythic tiers (thanks mkahvi!)
- Add `@classLevel` variable to spell roll data (thanks mkahvi!)
- Changed the backend for changes, improving performance for actor updates
- Added basic attack rolls to the combat page (thanks mkahvi!)
- Added tooltip display for attack damage formulas (thanks mkahvi!)
- Added support for the module Drag Ruler by Stäbchenfisch

## 0.77.2 (Hotfix)

### Bug Fixes

- Status icon creation failure state could enter a loop and create two icons
- Error spam in consoles on tokens with statuses

### Localization

- Updated the Chinese localization (thanks bnp800!)

## 0.77.1 (Hotfix)

### Bug Fixes

- Newly created tokens were not displaying if they had buffs
- Status HUD was not allowing duplicate textures in list
- Deleting an ActiveEffect didn't deactivate an actor's status
- Deleting an active buff didn't properly remove the effect from tokens
- Wound Thresholds variant rule wasn't being applied to certain attributes
- Setting Wound Threshold Override for an actor to Disabled instead put it on Default

### Changelog

- Partial compatibility with Status Icon Counters module
  - Use right click to enable buff icons

## 0.77.0

### Bug Fixes

- Fixed deleted buff effects being toggled on related unlinked tokens (#319)
- Fixed world level items being corrupted when changing permission before an update
- Buffs/ conditions are toggleable from the statusHUD (#329)
- Fix max dex bonus being calculated wrong sometimes (thanks mkahvi!) (#490)
- SR notes were not listed in the defenses summary when the actor had no SR
- Fix charge linking using Items from the equipment category
- Fix template errors with no scene (thanks mkahvi!) (#434)
- Fix speed not displaying as metric (thanks mkahvi!) (#402)
- Fix privately rolled dice displaying who and what was being rolled (#243)

### Changelog

- Removed FoundryVTT 0.7.7 support. Please update your software if you are still on this version.
- The initiative roll button on the sheet adds to the current active combat now
- The sheet initiative button will allow rerolls if clicker is a GM
- New world setting for including default conditions in status effects (off by default)
- Buffs are always visible from statusHUD unless "Hide from token" is checked
- Conditions are always visible, regardless of "Hide Token Conditions" world setting
- Added two new styles in TextEditors to document unimplemented features

### API

- Conditions and token status effects are now tied together via ActiveEffects
- Added two new Hooks for module developers
  - itemUse: (item, type, options)
    - Types: description, attack, spell
  - actorRoll: (actor, type, id, options)
    - Types: skill, bab, cmb, cl, concentration, save, ability,

## 0.76.13 (Hotfix)

### Bug Fixes

- Wound Tresholds was causing issues with actor variables if it wasn't initialized

## 0.76.12

### Bug Fixes

- Dice numbers were not able to be imputed ('/r d6' works now)
- Attacks and Consumables could sometimes not be linked to a charge pool (#432)
- Acid Splash was listed as having a "Ranged Weapon Attack" (#453)
- Quick token actions for Items without images caused visual glitches
- API calls for dice rolls properly return and resolve to their result(s)
- Removes items from containers when dragged out to same actor (prevents duplication) (thanks mkahvi!)
- Initiative wasn't deferring to "CONFIG.Combat.initiative.formula" setting as per core
- Resource names were not being updated on import from compendium

### Changelog

- Improved race type and subtype visibility on actors
- Add context menu entry for duplicating a combatant's initiative
- Dropping an item on another Item's "Links" will create and add it as a child if it doesn't already exist
- Item sheet's names now use available space more efficiently (thanks mkahvi!)
- Change sources list templates as such instead of defaulting to "Feat" (thanks mkahvi!)
- Implement Wounds Threshold optional rule (thanks mkahvi!) (#131)
- Added ability for classes & feats to grant weapon/ armor proficiencies (#466)
- Improve error and migration logging (thanks mkahvi!)
- Added confirmation dialog for when unsaved TinyMCE changes are about to be lost (#286)
- Made spellcasting configuration button a little clearer (thanks mkahvi!) (#454)
- Move ability score configuration to settings tab (thanks mkahvi!)
- Added "Spell Resistance" as a "Misc" Change subtarget
  - The SR formula entered in the combat tab will now be used as a "Base" type value
- Added "chargeCost" as roll data field
- Add mousewheel support on Apply Damage dialog when inputs are just numbers
- Add context notes for initiative rolls and more specific attack rolls (thanks mkahvi!)
- Changes now report the source of their warnings instead of just the warning

## 0.76.11

### Bug Fixes

- Unlinked tokens could not roll saving throws and skill checks unless edited in any way beforehand (#451)

### Changelog

- Add race type and subtype display to actors

### Localization

- Updated the Chinese localization (thanks bnp800!)

## 0.76.10 (Hotfix)

### Bug Fixes

- Changes to Specific Skills could only target Acrobatics
- Items in containers could not be updated (#444)

## 0.76.9

### Bug Fixes

- Combat Maneuver attacks were not showing CMB context notes (#425)
- Attack filters in the combat tab scrolled out of view
- Stunned change sources were not translated in tooltips (fixed by mkahvi (many thanks!))
- Actor's changes were not initialised until the actor was updated
- Fixed error on using consumables generated from spells (#426)
- Attacks played the default and Dice So Nice's sound (fixed by Manuel Vögele (many thanks!))
- Fix error during scene migration if token's actor didn't exist anymore
- Change subtargets were not set correctly when changing primary targets (#429)
- Reach highlighting for abilities with a specific reach in feet incorrectly used melee reach
- Chat card labels for at-will spells from spellbooks using Spell Points showed Infinity as remaining spell points
- DC labels for chat card labels were not properly localized (#428)
- Arcane spell failure rolls were not properly styled
- Resource names were not generated when using Unchained Action Economy (#430)

### Changelog

- Unclump skill modifiers in rolls (thanks mkahvi!) (#250)
- Unclump saving throw modifiers in rolls (thanks mkahvi!)
- Added Point-Blank Shot and Rapid Shot info to attack chat cards (#431)
- Add armor proficiency detection and application of ACP to attack rolls in case of lacking proficiency (thanks mkahvi!)
- Add ability choice for Initiative
- Added an option for adding minimum reach to abilities (#405)
- Add custom tag option for more than just classes (thanks mkahvi!) (#351)
- Restrict Items showing up in an actor's resources to those with limited charges
- Actor hit points can now go below -100 (#415)
- Add text input for primary attack name (#413)

## 0.76.8

### Bug Fixes

- Implement workaround for parenthetical return values in Rolls (Core#4195)
- Spells not using Spell Points could manipulate their charge cost via conditional modifiers
- Apply Damage dialog said damage and also applied damage instead of healing when not used (#410)
- Compendium with spell-like abilities had incorrect caster levels
- The race item was not draggable from its actor's sheet (#417)
- Incorrect reach templates were shown when using the metric system (#404)
- Don't sort if items are dropped on themselves, due to the efforts of mkahvi (many thanks!) (#194)
- Spell sounds were not played under certain circumstances (#352)
- Spell save buttons were not shown under certain circumstances (#393)
- Abilities with just a save configured could not be used (#328)
- Alternate attack cards were not rendered
- Fixed missing styling for attack and item chat cards (#326)

### Changelog

- Apply Damage dialog accepts math instead of just pure numbers
- Attacks with the "Broken" state now have a chat card indicator
- Added melee and ranged combat maneuvers to available action types (#155)
- Nonlethal damage can now be indicated and applied, due to the efforts of mkahvi (#421)
- Minimum damage is now taken into account in attacks, due to the efforts of mkahvi (#129)
- Compendiums now refresh if the availability of compendiums for its type has changed (#412)
- Attack chat cards now have a dedicated hover region for showing reach
- Creating consumables from spells now also set an appropriate range

### Localization

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)

## 0.76.7

### Bug Fixes

- Containers self-destroyed when given to themselves
- Empty strings could be passed into changes when created
- The level unchained rogues get evasion was incorrectly set to 1
- Actors received background skills for NPC classes and racial HD if they had a normal base class or prestige class as well
- Revealing a chat message to players caused its reach highlight (if any) to stay about
- The Roll Mode entered for d20 rolls was sometimes ignored or only applied partially
- GM sensitive information was shown on chat cards from actors with linked tokens (fixed by Manuel Vögele (many thanks!))

### Changelog

- Added initial support for the script operator on changes
- Add BAB, CMB and Initiative to the Combat tab
- Improved metric system support, due to the efforts of Sven Werlen (many thanks!)
- Added an option to show quick measurements on attacks when skipping the dialog, due to the efforts of Manuel Vögele (many thanks!)
- Shift clicking "Apply Damage/ Healing" will now bring up an adjustment window
- Added reach highlights for attacks, features and spells with a specific range (in feet) and with the 'Close' or 'Medium' range
- Added range increments to weapons and attacks

### Localization

- Updated the German localization, due to the efforts of Nico Weichbrodt (many thanks!)

## 0.76.6

### Bug Fixes

- Added another edgecase to mysterious TokenHelpers foundry bug workaround (Core#???)
- Display of biographies of actors with limited permissions could get cut off (#382)
- Fix Inspire Courage formula (#388)

### Changelog

- Initial support for reach templates when hovering over token quick actions
- Added a size selector to NPC Lite sheets

### Localization

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)

## 0.76.5

### Bug Fixes

- Resting healed too little nonlethal damage
- NPC Loot sheets reset to the inventory tab with every update
- Brought the "Extra Attacks" header into line (#307)
- Items with only change flags but no variable changes were not taken into account
- The Advanced (Rebuild) creature template gave bonuses to ability scores when they were too low
- Compendium browser could fail to load if saved results were no longer accessible (#380)
- Armor/Equipment lost their action configuration when dragged/saved (#381)
- Inventory footer overflowed the sheet on the native Foundry app (#384)
- Biographies of actors with limited permissions were non-scrollable (#382)
- Infinite loop in containers when coin weight divisor was set to 0 (#383)

### Changelog

- Added a spell slot cost to spells (#343)
- Added a checkbox to ambient light and token configurations to disable low-light vision for that light source (#368)
- Tweaked the look of Changes, Context Notes, Extra Attacks, and Damage Formulas (#306, #373)
- Added NPC type classes
- Added background skills for NPCs (#377)
- Added quicker roll data for spellbook variables (#375)
  - See tooltips on a spellbook for more info
- Removed Close, Medium and Long ranges for non-spell items

### Localization

- Updated the German translation, due to the efforts of Nico Weichbrodt (many thanks!)
- Updated the French translation, due to the efforts of rectulo (many thanks!)

## 0.76.4 (Hotfix)

### Bug Fixes

- Fixed spellbooks showing spells for every spellbook

### Changelog

- Added the possibility of switching type filters, rather than adding them, by shift-clicking them (#370)
- Improve visibility of attributes (#369)
- Replaced the inventory icon to show the equipment slot
- Show item sections even when the section is empty, if it's the only section filtered for (#371)

### Localization

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)

## 0.76.3

### Bug Fixes

- Fix Bardic Knowledge (SKA) not existing
- Adding and removing swim and climb speeds did not update racial skill bonuses immediately
- Changed low-light vision to no longer affect Token Dim/Bright vision [commonly darkvision] (#365)
- Added a safeguard when creating charge type item links to prevent linking to an item that has charge links of its own
- Items with links should no longer cause issues for the linked items when deleted

### Changelog

- d20 alternative can now be passed into Actor#rollX and Item#useAttack API (eg "2d20kh")
- Improve actor sheet rendering performance
- Traits on the attributes page on actor sheets have improved visibility on the interface

## 0.76.2

### Bug Fixes (Hotfix)

- Fixed an issue with stacking changes multiplying in some cases (#360)

### Changelog

- Show the item's name in its deletion confirmation dialog title (#363)
- Added an attacks section to the NPC Lite sheet

## 0.76.1

### Changelog

- Allow unsetting associated abilities for saving throws
- Null values are allowed in rollData again (Core#4134)
- Allow using the `=-` operator on certain actor attributes (such as hit points) to set it to a negative value
- Added a help browser (WIP) (#277)
- Overhauled HP and Initiative styles on NPC Lite sheets
- Change priorities now take precedence over change target, in terms of when they are processed (fixes #309)
- Improved domain/school spell slots by adding a field for specifying allowed domain slots per spell level (#339)

## 0.76.0

### Bug Fixes

- Conditional Modifiers on spells were deleted when migrating data (#342)
- At-will spells caused an incorrect calculation of available spell slots
- Token elevation couldn't be set to negative values or use relative math (#354)
- The Haste buff had an incorrect formula for its speed increases (#348)
- Loot sheets showed identified prices for unidentified items from a player's perspective
- Compendiums from modules containing PF1 specific entities were not migrated

### Changelog

- Elevation now allows floating point numbers
- Elevation and Token attribute bars now also accept "=-" to set absolute negative values (core feature parity)
- Added speed decrease formulas to the Slow buff
- Armor values are no longer hidden for non-armor equipment types (#350)
- Added a checkbox for toggling static size on token configurations (#345)
  - When enabled, token sizes will no longer change when its actor changes size

### Localization

- Updated the German localization, due to the efforts of Nico Weichbrodt (many thanks!)
- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)

## 0.75.13

### Bug Fixes

- Global illumination was incorrectly drawn for currently selected token (#340)
- Global illumination threshold was not respected (#340)

### Changelog

- Support for Foundry 0.7.7
- Moved the tooltip anchors for AC and CMD to their headers, to be consistent with other tooltips
- Added a quick link to the class compendium browser on actor sheets for use even after they have a class already

### Localization

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)

## 0.75.12

### Bug Fixes

- Fixed an issue with spell level offsets and spell slot calculations
- Fix prototype tokens not saving (#336)
- Fix owned items not reacting to changes immediately (#335)
- Fix extra attack field not accepting rollData attributes (#337)
- Fixed inability to add spellbooks to unlinked tokens (#331)
- Fixed negative hit points doubling on actor update calls

### Changelog

- Added a formula to spellbooks to determine a bonus to their casting ability score in regards to their bonus spell slots
- Added initial support for the Unchained Action Economy optional ruleset (#130)

### API

- Implement ChatMessagePF#itemSource to retrieve message's linked item

## 0.75.11

### Bug Fixes

- Items with the same name buggily shared charges (#136)

### Changelog

- Updating charges or maximum charges on a spell will update the other value of the two as well, depending on what changed
- Spell slots of prepared spellbooks are now updated in real time (#137)
- Added an option to mark a spell as a domain or school bonus spell, which will not cost any spell slots
- Added a numeric field for spell material component costs
- Conditional Modifiers can now be copied via Drag and Drop
- Added a sum of the inventory value to actor sheets (#224)

### Localization

- Updated the German localization, due to the efforts of Nico Weichbrodt (many thanks!)
- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)
- Updated the Italian localization, due to the efforts of Marco (many thanks!)

## 0.75.10

### Bug Fixes

- Fix actor sheets not being rendered due to missing template files
- Fix Conditional Modifier category Misc being incorrectly hidden
- Fix Context Notes not being shown for subskills
- Fix total spells per day tooltip overflowing (#323)
- Patch core foundry bug (Core#4043)
- Fix Biography being unviewable without spellcasting classes set (#322)
- Item chat cards without an attack showed an incorrect amount of charges (#332)

### Changelog

- Add compatibility with FoundryVTT 0.7.6

## 0.75.9

### Bug Fixes

- Bestiary browser failed to load if non-system actor compendiums were present (#320)
- Armor Check Penalty and Maximum Dexterity Bonus source info didn't take masterwork and changes into account (#317)
- Default status overlay icons transferred over to the main actor when toggled for unlinked tokens (#319)

### Changelog

- Added Changes and Context Notes to items of type "Loot", subtype "Gear", and enabled equipping those items (#310)
- Introduces a tab on actor sheets for settings
  - Made spellbooks selectable on the settings tab

## 0.75.8

### Bug Fixes

- Migrate bestiary compendiums so items with Changes can be opened (#278)
- Players weren't able to see or edit a container's currency and weight reduction
- Actor permissions could not be reset to Default
- Styling of NPC Lite sheets looked weird

### Changelog

- Added charge and spell point cost to list of conditional modifier effects
- Right clicking item names will now bring up the Item's Sheet
- Add buttons to open appropriate compendiums to the features, items and spells parts of actor sheets
- Add Chat Popout functionality for attack and item chat cards
- Attack chat cards now show the attack's icon
- Attack and item chat cards now show the combat round they were shown, if in combat
- Add containers to list of targets for the 'Give Item' action on actor sheets
- Add source information to Armor Check Penalties and Maximum Dexterity Bonus

### Localization

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)
- Updated the French localization, due to the efforts of rectulo (many thanks!)

## 0.75.7

### Bug Fixes

- Fix typos in class abilities compendium
- Weapon held options on attack roll dialogs defaulted to 'Normal'
- Compendium items with changes couldn't be edited, even after assigning them to an actor
- New "Character" Actors did not fully have their Token actorLink set as default

### Changelog

- Spell Points are now restored on rest according to the spellbook's formula, or fully restored if none such is entered
- Slightly changed the look of the conditional modifiers configuration
- Added buttons to open the skill compendium from the skills tab
- Added container type items
- Updated the macro to create loot sheets from tokens filter out items with no quantity and to add containers
  - This will require a re-import of the macro
- Added buttons to open the skill compendium from the skills tab / tweaked skill styles

### Localization

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)

## 0.75.6

### Bug Fixes

- Certain text fields couldn't be changed on Firefox

### Changelog

- Custom trait separators (such as that found in the Languages field) now only separate by a semicolon (;), and no longer by a comma

### Localization

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)

### API

- Redid the inner workings of changes slightly, allowing them to be valid classes

## 0.75.5

### Bug Fixes

- Unlinked tokens didn't change size with actor properties in Foundry 0.7.x
- Dodge bonuses to CMD were applied to flat-footed CMD as well
  - This is a quick and dirty, temporary fix which just prevents flat-footed CMD from getting any dodge bonuses
  - Now that Foundry 0.7.5 is in the stable channels, I'm planning on redoing the whole changes system to make use of Foundry's active effects system in (hopefully) the next system update
- Actor notes and biographies were erased with every change

### Changelog

- Added conditional modifiers for spells, due to the efforts of Ethaks (many thanks!)
- Attack roll dialogs now show an additional field to determine how the weapon is held
- Compendium filter selections are now saved between sessions
- Added the Deadly and Distracting weapon properties
- Compendium Browsers now cache their results, resulting in much faster opening times even in different sessions (except for the first time)
  - Press the Refresh button below the filter list to force an update

### Localization

- Update the German translation, due to the efforts of Nico Weichbrodt (many thanks!)

## 0.75.4

### Bug Fixes

- The rest option didn't work anymore
- The rest option healed an incorrect amount of nonlethal damage

### Changelog

- Brought the old attack chat card style back as a world option
- The rest option now has an extra selector for the amount of hours you want to rest
- Made conditional modifiers which target damage have a text field for damage type

## 0.75.3

### Bug Fixes

- Updating actor permissions led to unexpected results

### Changelog

- Modesto Condensed Bold font switched to small-caps variant to improve readability and match original Nodesto
- Outfits in the item compendium are now Equipment type items of the Clothing subtype
- Added a journal compendium for Core skills
- Skill roll chat cards now have a button to open the associated compendium entry
- Add conditional modifiers to attack type items, due to the efforts of Ethaks (many thanks!)
- Changed display of tags in basic item chat cards to look the same as those from action cards
- Compendium browsers now remember their filters for the session

### Localization

- Updated the French localization, due to the efforts of rectulo (many thanks!)
- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)

### API

- Added the hook event `actorRest`, which is called when an actor uses the Rest option on its sheet
  - Returning `false` from within a function assigned to this hook will prevent the (default) benefits from resting

## 0.75.2

### Bug Fixes

- NPCs always showed an experience value of 10, regardless of CR
- Spell Resistance wasn't working
- Actor sheets didn't update until a page refresh on Foundry 0.6.6

## 0.75.1 (Hotfix)

### Bug Fixes

- Character type actors glitched out after trying to change their permissions

### Changelog

- Add button to open the race compendium browser from an actor sheet if it has no race

## 0.75.0

### Bug Fixes

- Buffs replacing an armor bonus did not disable the enhancement armor bonus of the armor they just replaced
- Hit points, wounds and vigor weren't limited by their maximum values
- Racial and circumstance modifiers didn't stack

### Changelog

- Hide Attack Notes from items without an attack action, due to the efforts of Ethaks (many thanks!)
- Improve help messages for setting a character's first class
- Improve movement speed list styling
- Improve health styling on actor sheets
- Improve ability score styling

## 0.74.11

### Bug Fixes

- Some items with DCs or charges showed warnings when viewed if they didn't have an associated actor
- Caster level wasn't affected by negative levels

### Changelog

- Merged the Defenses and Attacks tabs into a single tab: Combat
- Add a notes page to loot sheets.
- Improved formatting of the feat count tracker located at the bottom of an actor's feat tab
- Improved formatting of the skill rank tracker located on the top of an actor's skills tab
- Improved formatting of character experience and NPC CR
- Renamed the 'Details' tab on actor sheets to 'Summary'
- Revamped attack chat card styles
- Class features added to a character due to gaining levels in a class now get added as linked children to that class, so they get deleted properly when you delete the class (note: items previously added in this way are not affected)

### Localization

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)
- Updated the German localization, due to the efforts of Nico Weichbrodt (many thanks!)

## 0.74.10

### Bug Fixes

- Some consumable items showed remaining charges twice in the chat card
- CL & Concentration notes were gaining spaces on every reload
- Lay on Hands uses per day formula was incorrectly using the actor's hit die, instead of its paladin levels (fixed by Nico Weichbrodt (many thanks!))

### Changelog

- Show changelog of new updates since last run to user
- Added accessibility settings, on a per-client basis
- Added adjustable Aura and Caster Level values to items
- A table of magic items is now shown on the bottom of actors' notes tabs

### Localization

- Updated the French translation, due to the efforts of rectulo (many thanks!)
- Updated the German translation, due to the efforts of Nico Weichbrodt (many thanks!)

## 0.74.9

### Bug Fixes

- Experience settings didn't submit in Foundry 0.6.6

### Changelog

- Updated the Chinese localization, due to the efforts of bnp800 (many thanks!)
- Attack chat cards got a big style overhaul, hopefully making it easier to read
- Added new variables for formulas: `@armor.type` and `@shield.type`, which change depending on the highest level of armor or shield equipped
  - Hover over an actor's AC to see this info
- Hovering over the encumbrance bar in an actor's inventory now shows a tooltip with information on the variable `@attributes.encumbrance.level` for use in formulas
- Hovering over a speed type on an actor's sheet now shows what sources it's all from
- Improved the style of list header icons (such as those from an actor's inventory tab)

## 0.74.8

### Bug Fixes

- Scenes without either Token Vision or Fog Exploration ticked made tokens invisible for players
- ACP wasn't shown as a source of a skill decrease if the actor didn't have at least one rank in the skill
- All changes targeting something in the 'Misc' category were processed before anything else, which led to problems

### Changelog

- Update to be compatible with Foundry 0.7.3
- Add icons as headers for actors' inventories, features and spell lists
- Turn 'yes' and 'no' labels on actors' inventories for identified, carried and equipped statuses of items to icons
- Added a tooltip for speed, showing variables to use in roll formulas

## 0.74.7

### Bug Fixes

- Giving items to another owned actor did not work in 0.6.6 if not done as GM

### Changelog

- Added Chinese localization, due to the efforts of bnp800 (many thanks!)
- Hovering over a skill now shows whether it's boosted by being a class skill or ability score, due to the efforts of Nico Weichbrodt (many thanks!)
- Added more in-game languages, due to the efforts of Nico Weichbrodt (many thanks!)
- Hovering over a skill now shows whether it's being penalized by armor check penalty (if any, and if applicable)
- Added changes to modify ACP and Max Dex Bonus granted/limited by armor and shields
- Improved the macros 'Roll Skill' and 'Roll Saving Throw' so they don't produce an abundance of roll sounds
- Improved the macro 'Roll Skill' so it doesn't need to have a label for custom skills
- Increased font sizes at a lot of places
- Items and skills lists on actor sheets now show hover feedback
- Removed the notes next to skills on an actor's skill page to clear up space (and they were redundant with change items)

## 0.74.6

### Bug Fixes

- Creating attacks from two-handed weapons didn't set the attack's held type to be two-handed
- Non-default NPC sheets were sometimes returning to default due to a race condition
- Changes to unlinked tokens' actor data did nothing

### Changelog

- Loot sheets now show a total sell value without the added currencies
- Added button to give item from inventory to another (owned) actor
- Buffs and conditions are now shown as icons on tokens (unless turned off by a world setting)
- Added conditions to actors without mechanical benefits

## 0.74.5

### Bug Fixes

- Fixed Dice So Nice integration, due to the efforts of Ethaks (many thanks!)
- Fixed critical hit and fumble recognition in Foundry 0.7.2, due to the efforts of Ethaks (many thanks!)
- Fixed various Class Abilities, due to the efforts of Nico Weichbrodt (many thanks!)
- Cantrips couldn't be used without having spell uses

### Changelog

- Improved Dice So Nice roll order on attacks, due to the efforts of Ethaks (many thanks!)
- Updated the German translation, due to the efforts of Nico Weichbrodt (many thanks!)
- Added more translatable strings, due to the efforts of Nico Weichbrodt (many thanks!)
- Added Spanish translation, due to the efforts of Wharomaru Zhamal (many thanks!)
- Added the option to share token vision between players, independent of normal actor permissions
- Added a note to attacks for charged items telling how many charges are left after the attack
- Added a new option to weapon attacks to tell how it's held, which interacts with power attacks

## 0.74.4 (Hotfix)

### Bug Fixes

- Certain rolls (like skill rolls) didn't work in Foundry 0.6.6

## 0.74.3 (Hotfix)

### Bug Fixes

- Attacks without ammo didn't work
- DC showed as 0 on spell attack cards

## 0.74.2 (Hotfix)

### Bug Fixes

- Error with attack rolls while Dice So Nice is enabled on Foundry 0.6.6
- Use isPC in Foundry 0.6.6

### Changelog

- Sped up attacks using ammo

## 0.74.1 (Initial FoundryVTT 0.7.2 support)

### Bug Fixes

- Added safeguard to avoid an infinite loop in the formula for charges on a charged item
- Certain fields like currency fields didn't accept a number-only value, and didn't apply by clicking on something else
- Subtracting hit points from a token which has temporary hit points resulted in a faulty value for hit points

### Changelog

- Updated the German translation, due to the efforts of Nico Weichbrodt (many thanks!)
- Default to not having a custom tag for classes
- Added the ability to drag and drop skills, bab, cmb, defenses, concentration and caster level from an actor's sheet to the macro hotbar to quickly create a macro for it
- Added a new link type for attacks: ammunition

## 0.74.0

### Bug Fixes

- Creating attacks from weapons on unlinked tokens caused a glitch where the item window wouldn't close (fixed by Ethaks (many thanks!))
- Bardic Knowledge used an incorrect formula (fixed by Ethaks (many thanks!))
- Changing anything on an actor sheet while their current hit points were negative caused the negative hit points to accumulate
- Changing all speeds with a change item didn't work
- Deleting items that were linked to another item didn't remove links

### Changelog

- Added a label to attack chat cards saying it's a power attack, due to the efforts of Ethaks (many thanks!)
- Actors of the Character type now have their tokens linked by default, due to the efforts of Ethaks (many thanks!)
- Actor health and token bars can now use the '--' operator to set to a negative value (e.g. '--8' would set the attribute to -8, rather than subtracting 8 from the current value)
- Add Dice So Nice integration for damage rolls
- Add broken condition for equipment, weapons and attacks
- Add compendium filter to compendium browsers
- Remove the possibility of critically hitting for attacks with a critical multiplier of 1

## 0.73.8

### Bug Fixes

- NPC classes were missing
- Update actor on adding items
- Fixed spell durations to make them more universally consistent
- Weight on items could not be set back to 0 (#159)
- Unchained Monks didn't have the AC Bonus class feature associated
- Unchained Monks used an incorrect Fast Movement class feature

### Changelog

- Added ability to change CMB ability
- Added field to change the base dice used for attack rolls in attack roll dialogs, due to the efforts of Ethaks (many thanks!)
- Added a checkbox to enable a buff from the buff's sheet

## 0.73.7

### Bug Fixes

- Using spell points, spells with no cost were still unuseable with an empty spell pool
- Critical confirmation bonuses applied on following attack rolls
- Creating an actor caused an error
- Charged features threw an error on use
- Changing charges on an item (except spells) from an actor sheet didn't update the item in question
- Concentration and Caster Level notes from actor sheets caused an error
- Fixed spell capitalization to what they are on Archives of Nethys, due to the efforts of Noon (many thanks!)

### Changelog

- Linked class abilities to classes, due to the efforts of holyplankton (many thanks!)

## 0.73.6 (Hotfix)

### Bug Fixes

- Some spells were no longer rendering
- Fix tooltip for spontaneous spellbooks

### Changelog

- Added support for spell points

## 0.73.5

### Bug Fixes

- Actor stats were no longer immediately updated with item changes
- Context notes from buffs didn't take `@item.level` into consideration for every type of note
- AC labels for armor and shields didn't take enhancement bonuses into consideration
- Item data wasn't taken into consideration in inline rolls on item descriptions when shown to chat
- Enhancement bonuses were still shown on unidentified armor for players

### Changelog

- Improved spellbook accessability

## 0.73.4 (Hotfix)

### Bug Fixes

- Re-enabled system migration

## 0.73.3

### Bug Fixes

- Experience values were occasionally stored as strings, resulting in unexpected behavior
- Entering values in fields on the NPC Lite sheet didn't do anything
- Non-lethal hit point damage wasn't healed with rest

### Changelog

- Reduced amount of actor updates in some cases, resulting in improved performance
- Improved spellbook accessability, especially in regards to the 'All' tab
- Added customizable class tag
- Added a new item link type for classes, which automatically adds class abilities at certain levels
- Added Caster Level and Concentration context notes

## 0.73.2

### Bug Fixes

- Chat metadata used an incorrect measure template ID
- Entering a non-working formula for bonus feats caused the character sheet to not open anymore
- Some item properties were still visible while unidentified which should have been invisible

### Changelog

- Added sample macro for creating a loot sheet from one or more tokens

## 0.73.1

### Bug Fixes

- Non-critical damage formulas didn't get applied to critical hits at all (they should just not be multiplied)
- Clearing certain fields (like temporary hit points, non-lethal damage and currencies) reverted them back to the previous value

### Changelog

- Added the `template` property to chat card metadata (for use by module/macro developers)

## 0.73

### Bug Fixes

- Temporary hit points were not being added to a token's hit point bar
- Unidentified items showed up at their identified value in actors' inventories
- Items without damage rolls, attack rolls or effect notes, but which did have a measure template, didn't show a chat card on use
- The equipment tab (on actor inventories) didn't show action buttons where appropriate
- Fixed CSS for Lite NPC sheets, and the CR display on normal NPC sheets (the CR went off-sheet partially for wide CR text)
- Nested Ultimate Equipment roll tables were not working correctly, because they were set to reference roll tables in the world, rather than in their own compendium
- The Ultimate Equipment roll table for Greater Medium Weapons had an incorrect reference type

### Changelog

- Improved the way item weight is edited, due to the efforts of Dorgendubal (many thanks!)
  - When using the metric system, item weights can now be edited in kg values (2 kg = 1 lbs)
  - Internally, the item stores an lbs value, but that shouldn't affect gameplay
- Added additional inventory statistics (carrying above head, above ground and dragging/pushing)
- Added the ability to add non-critical hit damage formulas (damage that only gets applied on normal hits)
- Changed the way damage is displayed on chat cards
- Critical hit damage now includes the non-critical hit damage part
  - Due to the way damage handling has changed, the variable `@critMult` may no longer be required, and old formulas will need to be changed
  - This also makes the last parameter on `sizeRoll` obsolete, though it won't do harm to leave it in (for now, at least)

## 0.72.1

### Bug Fixes

- TinyMCE editors were showing 2 scrollbars, depending on the content
- Added backwards compatibility with old changes

### Changelog

- Improved visibility of tabs
- You can now drop world or compendium entities onto items' attack, effect and change notes to create a link to them
- Added a feat tracking interface from the feat tab on actor sheets

## 0.72

### Bug Fixes

- Change formulas incorrectly used base data
- Changes with the set (=) operator didn't show up in source info

### Changelog

- Added more class abilities, due to the efforts of holyplankton (many thanks!)
- Updated the italian translation, due to the efforts of Marco (many thanks!)
- Added a race compendium browser
- Compendium browsers now implement natural sorting in regards to filters and entries
- Changes with the '=' operator no longer get applied before changes with the '+' operator, but will instead depend on priority
- Added base ability scores and modifiers which are unaffected by changes except for the modifiers 'Untyped (Permanent)', 'Racial', 'Trait' and 'Base'
  - These can be accessed for formulas by writing something like `@abilities.str.base` or `@abilities.wis.baseMod` (see ability score tooltips as well)

## 0.71

### Bug Fixes

- Fixed a compability issue with Babele, due to the efforts of Simone Ricciardi (many thanks!)

### Changelog

- Updated the French translation, due to the efforts of rectulo (many thanks!)
- Added the ability to offset currencies by entering things like '+5' or '-5'
- Added buttons to convert currencies
- Added metadata to ChatMessagePF attacks for use by macro and module creators
- Added the '=' operator to changes, setting an actor variable to a given value rather than adding to it
  - The '=' operator is modifier-specific, meaning that for example multiple Enhancement modifiers replace one another, but an Enhancement modifier and a Deflection modifier are added to each other
  - Changes with the '=' operator get applied before changes with the '+' operator
  - Internally, the base speeds as entered on the front page of an actor sheet is used as a change with the appropriate target, a 'Base' modifier, an '=' operator and a priority of 1000
- Added the ability to assign a sound effect to attacks, which will be fired upon showing the message for it

## 0.701

### Bug Fixes

- Token quick actions were no longer working
- Unlinked tokens linked size with the main actor

### Changelog

- Added more class abilities, due to the efforts of holyplankton (many thanks!)
- Updated the Ultimate Equipment roll tables, due to the efforts of Iron (many thanks!)

## 0.7

### Bug Fixes

- When deleting an item, links to that item remained
- Inventory items of different types couldn't be sorted manually
- The merfolk race had an incorrect amount of Charisma bonus

### Changelog

- Big revamp to actor sheets
- Added more class abilities, due to the efforts of holyplankton (many thanks!)
- Alexandre Nizoux updated the French translation (many thanks!)
- Added most human languages to the list of pre-selectable languages
- There's now a tab in actors' spellbooks that shows all spells
- Certain input fields can now be clicked once to select their content
- Certain input fields now react to the mouse wheel while hovering over them
- Add client-side setting for quick rolling items
- Skills which require training and have no ranks are now displayed in a lighter shade

## 0.69

### Bug Fixes

- Compendium filters weren't being sorted since last update
- Results from rollable tables were not private (solves issue #65)

### Changelog

- Added more class abilities, due to the efforts of holyplankton (many thanks!)
- Added roll tables for Ultimate Equipment, due to the efforts of Iron (many thanks!)
- Implemented lazy loading of list items in compendium browsers, improving performance
- Show number of matching filtered items on compendium browsers
- Removed the option to preload compendiums
- Made the metric system more useable (solves issue #71, possibly)
- Added an option to change the weight of coins, on a per-world basis (solves issue #99)
- Items now refresh upon being created on an actor, which helps clear up actor-dependent formulas after getting one from the compendiums, for example
- Buttons for saving throws on chat cards will now roll saving throws for all selected tokens
- Added chat card buttons for applying half damage/healing

## 0.68

### Bug Fixes

- Fixed sizeRoll (again...)
- Loot sheets with items other than inventory items on them gave NaN for prices
- Dragging spells to the loot sheet added them as an actual spell, rather than showing the Create Consumable dialog
- Creating consumables from 0 level spells gave them a 0gp value

### Changelog

- Improved actor sheets in regards to scrollable areas
- Improved load speeds of compendium browsers

## 0.67

### Bug Fixes

- sizeRoll for smaller characters was using the incorrect die
- Couldn't select spellcasting classes for spellbooks anymore

### Changelog

- Added a rectangle measure template for items with actions
- Added fields for adjusting the CL and SL of Spells in their attack dialogs
- Made critical hits more compact in chat
- Added an Italian translation, due to the efforts of Marco (many thanks!)

## 0.66

### Bug Fixes

- Charged items will now check their charge cost before usage, rather than only denying usage at 0 charges
- A bunch of formula fields on actors didn't use the correct function for fetching roll data

### Changelog

- Added more class abilities to its compendium, due to the efforts of holyplankton (many thanks!)
- Loot sheets now show the total value and the sale value of its contents
- Added mythic paths, due to the efforts of ManaHime (many thanks!)
- Show at-will status instead of spell uses in spellbooks for at-will useable spells

## 0.65

### Bug Fixes

- Concentration checks didn't roll
- Limit power attack damage multiplier to 1.5x

### Changelog

- Added more class abilities to its compendium, due to the efforts of holyplankton (many thanks!)
- Added more creatures to the bestiary, due to the efforts of Dorgendubal, Primer and jimjambojangles (many thanks!)
- You can now choose how many charges charged items cost to use
- Consumables and attacks can now have items linked to them to share charges

## 0.64

### Bug Fixes

- Added a safeguard for SR calculation
- Word wrap attack and effect notes, due to the efforts of Marco (many thanks!)
- Selecting a measure template texture for an attack item didn't submit the form, possibly resulting in not updating the value
- Measure templates from attacks with textures couldn't be placed due to hitbox issues
- Strength added (or subtracted) from item changes didn't alter carrying capacity

### Changelog

- Made attack chat cards a bit more compact
- Moved setting for disabling xp tracking to the new experience config panel
- Added more class abilities, due to the efforts of holyplankton (many thanks!)
- Added a class compendium browser

## 0.63

### Bug Fixes

- Actors' caster levels were being temporarily increased under certain circumstances

### Changelog

- Sizes for measure templates on items are now formulas, rather than static numbers
- Added an option for a custom experience track

## 0.627

### Changelog

- Removed some space from spellbook checkboxes so it's more difficult to accidentally click them, due to the efforts of Marco (many thanks!)
- Changed spell counts in spellbooks to be easily adjustable numbers, thanks to the efforts of Marco (many thanks!)

### Bug Fixes

- Actor sheets couldn't be opened in FoundryVTT 0.6.5
- Changing the type of change the first time around had a delay of being applied until the next change to the item

## 0.626

### Changelog

- Added many entries to the bestiary, due to the efforts of Dorgendubal, Primer and jimjambojangles (many thanks!)
  - The individual entries of the bestiary are missing some info, so it's probably best to use them as a base only
- Added a lot more class abilities, due to the efforts of holyplankton (many thanks!)

## 0.625

### Bug Fixes

- Spells were not updating since 0.624

## 0.624

### Bug Fixes

- Changing the masterwork flag on equipment changed the ACP another update later
- Spells no longer show duplicate chat information when used
- Showing defenses didn't work if some item added AC notes (Fixed by Marco (many thanks!))

### Changelog

- holyplankton added more class abilities (many thanks!)
- Added a loading bar when opening compendium browsers
- Adam added an initial version of a Wild Shape sample macro (many thanks!)

## 0.623

### Bug Fixes

- Entering a CR lower than 1 resulted in it becoming NaN
- Item descriptions should now correctly use their normal roll data for inline rolls
- The Distribute XP macro sometimes wasn't correctly adding xp to characters
- Negative dexterity wasn't being added to FF AC

## 0.622

### Bug Fixes

- Spells didn't auto subtract uses under certain circumstances
- Will Saving Throws didn't use an ability modifier
- Critical confirmation bonuses were not being applied
- Divine Favor (buff) formula was incorrect

### Changelog

- Add button to duplicate an item on an actor

## 0.621

### Bug Fixes

- Items compendium was empty since v0.62
- Races compendium items' changes were empty since v0.62

## 0.62

### Bug Fixes

- Inspire Courage was using an incorrect formula for its bonuses
- Pressing enter to confirm a change on an actor sheet triggered the point buy calculator
- Ammunition now uses the price and weight for a single unit in their compendium
- Melee weapons' attacks were being created as ranged attacks
- Client freeze when adding a certain number of item links

### Changelog

- Changed the way alignment is selected (WARNING: Creature alignments will have to be re-selected this update)
- Pecomica added missing items to the items compendium (many thanks!)
- holyplankton created a compendium for creature templates (many thanks!)
- Added a priority field to item changes

## 0.61

### Bug Fixes

- Dice So Nice integration
- Defense Chat Card saving throw buttons not working

### Changelog

- Added initial class abilities compendium
- DC offsets for creature templates are now formulas
- Added a new item link type: charge sharing (only for features for now)
- Added a point buy calculator to actor sheets

## 0.601

### Bug Fixes

- Point-blank Shot was not adding damage
- Shift-clicking attacks to bypass the dialog didn't work
- Amulets of Natural Armor other than +1 didn't give the right amount of AC
- Haste didn't give speed increases
- The Toggle Buff sample macro incorrectly tried to toggle items that weren't buffs if the name matched

### Changelog

- Improved visibility of saving throw DCs on attack and spell chat cards

## 0.6

### Bug Fixes

- 1/6 CR was not an option
- Token tint was missing from the token configuration window

### Changelog

- Added a flag for spell preparation in spontaneous spellbooks (for Arcanists, mainly)
- Added a CR offset field to creature templates
- Improved visibility of editing base spell slots
- Added initial item linking support, which for now only has one type of linking (automatic deletion of linked child items)
- Creating attacks from weapons now adds the newly created attack as a linked child of the weapon (see above)
- Marc Robinson added Rapid Shot and Point-blank Shot to attack dialogs (many thanks!)
- rectulo updated the French translation (many thanks!)

## 0.561

### Bug Fixes

- Fatal bug with feats causing character sheets to be unopenable

### Changelog

- Added fields for damage that's only applied on critical hits

## 0.56

### Bug Fixes

- Chat card buttons were not visible to players who didn't own the message

### Changelog

- Added title coloring to chat cards involving items
- holyplankton added the Esufey (many thanks!)
- Added ability to drag spells to an actor's inventory tab to create a consumable item from it
- Added ability types (ex, su and sp) to features
- Added masterwork property to armor and shields
- Added creature templates to actors' feature lists

### Internal Changes

- Class items now use 'data.level' instead of 'data.levels', to be in sync with the internal data of buff levels

## 0.551

### Bug Fixes

- Some sample macros were throwing errors
- Hidden tokens would not show up on the combat tracker
- sizeRoll with an original die of 1d6 would increase too much for larger sizes
- Races couldn't be dragged from actor sheets

### Changelog

- holyplankton added unchained classes (many thanks!)
- Added Omdura as a class
- Added Lo's item compendium (many thanks!)
- holyplankton added a bunch of races (many thanks!)

## 0.55

### Bug Fixes

- Fixed Dice So Nice integration with attack rolls
- Power attack damage bonuses are no longer applied to additional damage formulas on attacks
- Fixed the 'toggle buff' sample macro

### Changelog

- Added races as item types
- Added the possibility to add features to token quickbars
- You can now add specific skill changes to items without an associated actor
- You can now easily select what ability score affects your hit points and saving throws
- Added an option to preload compendiums

## 0.54

### Bug Fixes

- Attack measure templates appeared frozen during the preview under certain circumstances
- sizeRoll was not functioning correctly under certain circumstances
- Fixed power attack (again)

### Changelog

- You can now use features that have no real action, but do have charges, making it subtract a charge before showing its chat entry
- You can now add features to the token quickbar
- The modifier key to show an item from the macro bar, rather than using the item, has been changed from Shift to Control

## 0.53

### Bug Fixes

- Maximum dexterity bonus was not showing up on actor sheets
- Power attack didn't add damage
- Changes to a category of skill bonuses didn't apply to subskills

### Changelog

- Added a way to select the ability damage multiplier one time on attack roll dialogs
- Add fields for fast healing and regeneration
- Shift-clicking an item macro now just shows the item to chat, rather than using it when applicable
- Once-per-attack attack notes can now be added to all attacks, not just those with attack rolls
- A spell resistance table is no longer shown on defense chat entries for creatures without spell resistance
- Dan Gomme greatly improved the PF1 style measure templates (many thanks!)

## 0.52

### Bug Fixes

- Normal measure templates were no longer working
- Applying damage from an item attack chat entry gave an error
- Compendium browsers were working incorrectly when reopening after previously filtering by name
- Worlds that were just being migrated from an older version had actors with missing items
- Positive dexterity modifiers were being applied to flat-footed CMD
- CSS styling for actors' skill tabs looked strange since the FoundryVTT 0.5.7 update

### Changelog

- Effect Notes (on attacks and spells) are now added to each individual attack roll, rather than once in the whole (full-round) attack

## 0.51

### Bug Fixes

- Measure templates for attacks didn't work since Foundry 0.5.6 anymore
- CMB incorrectly used Strength instead of Dexterity for actors that were Tiny or smaller

### Changelog

- Spellbooks are now set to spontaneous or not, rather than individual spells
- Added a rest option to actors which will automatically heal hit point and ability score damage, as well as restore daily uses of items, features, attacks, spells and spellbooks
- Measure template previews now highlight the grid they affect

## 0.5

### Bug Fixes

- Saving throw and skill roll criticals and fumbles weren't being highlighted anymore
- Dice So Nice integration for multi attacks was showing the result of the last roll on every dice toss
- Attacks without damage or effect notes weren't useable

### Changelog

- Attacks with multiple damage parts now have their parts clearly separated in the chat tooltip
- Full attacks are now consolidated into a single chat card again
- Added a few more bestiary entries
- Edited the Award XP sample macro to add an option for distributing experience evenly among those selected

## 0.44

### Bug Fixes

- Quick attack actions not using token data when applicable
- Pre-processed functions (sizeRoll) couldn't use calculated parameters
- Attack and effect/damage notes were not using any actor data

### Changelog

- Dice So Nice integration
- Obfuscate roll notes from players without at least LIMITED permission over the actor
- Added mechanism to automatically deduct spell uses
- Added sample macro to award experience points

## 0.431

### Changelog

- Now pre-processes the `sizeRoll` function, which gives the ability to show the die you rolled as a result

## 0.43

### Bug Fixes

- Fix missing icons for classes

### Changelog

- Added a few more tooltips for formula uses
- Added a new variable for formulas: `@size`, which is a number in the range of -4 to 4, based on the actor's size, where 0 equals Medium
- Added a new function to use in formulas: `sizeRoll(c, s[, size[, crit]])`, which returns a random number based on a given die for different sizes (for more information, check [https://furyspark.gitlab.io/foundryvtt-pathfinder1-doc/advanced/formula-data/](https://furyspark.gitlab.io/foundryvtt-pathfinder1-doc/advanced/formula-data/))
- Added some data fields for weapons to account for the new size functionality, and creating an attack from a weapon now uses the new function
- Added feat tags and a feat compendium browser
- Added context note options for all attack and damage rolls to items with changes

## 0.42

### Bug Fixes

- Inability to rename items in certain conditions

### Changelog

- Improved styling of attack and effect notes
- Added a quick way of adding and subtracting item quantities in inventory screens
- Og added more weapons, ammo, armor and shields (this did change around some icon files, so unfortunately it'll mean you have to manually change icons or replace items) (many thanks!)
- Turned certain dice rolls (such as skills and saving throws, but not attacks) into actual Roll type messages again, meaning they will work with modules that rely on that data (such as BubbleRolls)
- Dorgendubal added quick attacks to tokens (many thanks!)

## 0.411

### Bug Fixes

- Shields were not applying their AC

### Changelog

- Dorgendubal added initial support for the metric system (many thanks!)
- Moved defense tab on character and npc sheets

## 0.41

### Bug Fixes

- Actor inventories didn't show an equipment's label under certain circumstances
- An error in physical item updates
- A niche error with item attacks
- Actors weren't being slowed down by armor anymore

### Changelog

- @Grenadier added an advanced health configuration screen (many thanks!)
- A lot of feats were updated (thanks, @Og and @Krise !)
- Added 3 creatures to the bestiary

## 0.4

### Changelog

- @Xam changed up some hardcoded strings (many thanks!)
- Add an actor inventory column for GMs to set an item's identified state
- Refactored weapons' and equipments' categories, adding subcategories to them as well
  - The items compendium has been updated to reflect these changes
  - The migration will do a decent job at updating the (sub)types of these items, but sometimes it's not possible to get appropriate data from previous entries (most notably with shield subtypes)
- Added a sample macro for toggling buffs
- Add an option to automatically deduct charges from items
- Changed styling of character sheet tabs somewhat
- Add an option to adjust the base DC formula of spells, on a per-spellbook basis
- Spells dropped on an actor's sheet now start out belonging to the currently open spellbook
- Hovering over certain attributes on character sheets now shows a tooltip, where previously the intent was completely hidden (such as with alignment, deity, temp hp, etc.)

## 0.361

### Bug Fixes

- Automated HP calculation was not being done properly past level 2
- Identified weapon names were being forgotten

## 0.36

### Bug Fixes

- Blind rolls were not hidden

### Changelog

- Slightly improve styling of actor sheets with limited visibility
- Add initial support for unidentified items
  - Only GMs can toggle an item's identified state
  - Players will see an alternate name, description and price, and some info is completely missing for unidentified items
  - Actions of unidentified items are unusable by players
- Add separate carried column for actors' inventories, and a quick way to mark an item as carried/not carried.
- Add an alternate style for item names without a quantity in actors' inventories (a line through the name)
- @Grenadier added the Wounds and Vigor optional rules system (many thanks!)
- @Grenadier changed automatic hit point calculation to be slightly higher (acknowledge the fact that there's no 0 on a dice) (many thanks!)

## 0.35

### Bug Fixes

- Using spells with multiple attacks showed the spell description multiple times
- John Shetler fixed a giant oversight in the Fractional Base Bonuses optional rule system (many thanks!)

### Changelog

- Add color and texture override options to measure templates on items
- Added a dedicated field for darkvision in token configurations
  - Unlike bright vision, darkvision radius ignores the scene's darkness level, making it seem fully lit for darkvision owners (up to their darkvision radius)
  - Updated creatures in the bestiary to use darkvision instead of bright vision
- @Dorgendubal and @rectulo improved the French translation (many thanks!)

## 0.34

### Bug Fixes

- Armor Check Penalty stacked incorrectly
- Fog of War was not being loaded
- Items from hidden compendiums were visible to players in the compendium browsers
- Dexterity penalties didn't apply to flat-footed CMD
- Having multiple spell level checkboxes ticked in the compendium browser used to be an AND comparison, when it should have been an OR comparison

### Changelog

- Imported most (if not all) spells into a compendium
  - The old spells compendium is replaced
  - The spells all have a generic icon, and a lot of them don't have a damage formula or template yet when they could make use of one

## 0.33

### Changelog

- Add level requirement data fields for spells
  - Updated the spells compendium to reflect these changes
- Add compendium browsers
  - Currently only for spells, items and a bestiary, but more to come
- Creatures with a climb or swim speed now gain a +8 Racial bonus to the Climb and Swim skills, respectively, as per the core rules
- Merged the Armor, Weapons and Magic Items compendium into a single compendium
- Added a bunch of entries to the following compendiums: bestiary, spells and items

## 0.32

### Bug Fixes

- Sample macros' accidental reliance on Furnace

### Changelog

- Add Fractional Base Bonuses optional ruleset as a world setting
- Add another type of class, Racial HD, which represents a creature's racial hit die
  - Added a compendium for racial hit die
  - What little exists in the bestiary compendium has been updated to reflect this
- Classes can now have changes, similar to buffs, feats, weapons and equipment
- Added a list of all skills to classes with checkboxes to make them class skills
  - A skill is now a class skill if it's checked as a class skill on at least one of the actor's classes
  - Updated all classes in the classes compendium to reflect these changes
- Add option for items with actions (like spells and attacks) to have an associated measure template
  - When using the attack or spell, you get an option on whether you want to automatically insert the template
- Add option to ignore arcane spell failure, on a per-spellbook basis

## 0.311

### Bug Fixes

- Character sheet glitch with incorrect class type set

## 0.31

### Bug Fixes

- Freeze on adding/removing items to/from unlinked tokens

### Changelog

- Improved existing sample macros
- Added a journal compendium for conditions
- Shows a warning on character sheets without a class, indicating that some attributes require one
- Add option for natural attacks on whether it's a primary or secondary attack, and apply penalties as appropriate

## 0.302

### Bug Fixes

- Error with actor sheets in certain circumstances, causing them to not update

## 0.301

### Changelog

- Increased the compatible core version so that it works with FoundryVTT 0.5.5

## 0.3

### Bug Fixes

- Rectangle and ray measurements using too strict snapping

### Changelog

- Allow rolling initiative without combat
- Add another type of NPC sheet, which only shows inventory (useful for party loot tracking, for example)
- Automate scaling of BAB and Saving Throws with class levels (NOTE: you'll have to re-enter that info on your existing classes, one time only)
- Add a german translation (thanks, arwec!)
- Add a french translation (thanks, rectulo!)

## 0.26

### Bug Fixes

- Only base strength was used for calculating carrying capacity.
- Item changes with wrong formulas crashing/locking the actor's updates
- Delay with encumbrance penalties rolling in
- Low-light Vision always on under certain circumstances for players with multiple owned tokens

### Changelog

- Add power attack option to attack rolls, and show their dialog by default (shift-click or right-click to circumvent dialog)
- Add world setting to change low-light vision behaviour for players

## 0.25

### Bug Fixes

- Error with looking up fly maneuverability

### Changelog

- Turned most of the hardcoded UI text into translatable strings
- Generate spell descriptions automatically (will require some re-editing of spells)
- Updated spells compendium to reflect spell changes

## 0.24

### Bug Fixes

- Actor permissions not updating without a page refresh

### Changelog

- Add more movement types, and automate movement speedt totals based on encumbrance and armor
- Automation of spell slot count (you'll have to re-enter your casters' spell slot count for this update)
- Add lite version of the NPC sheet, which is meant to be used alongside an NPC stat block, and only shows the bare minimum
- Added a bunch of feats to their compendium, thanks to Amakiir (some icons still missing, for now)

## 0.23.2 (Shameful Emergency Update 2)

### Bug Fixes

- Certain actor data not updating

## 0.23.1 (Emergency Update)

### Bug Fixes

- Certain elements (textareas) on item sheets not updating
- Saving throw butons on efense chat cards for unlinked tokens not working
- Certain actor data not updating

## 0.23

### Bug Fixes

- Carrying capacity for creatures small than medium with low strength
- Glitch with token with deleted actor
- Duplicate effect notes on multi attacks
- Missing attack notes on attacks
- Glitch with buff/change flags
- Unlinked tokens not updating with item changes
- Features as item resources sometimes not working
- Level Drain not subtracting hit points

### Changelog

- Add world options to automatically calculate class hit points
- Add or update items in the following compendiums:
  - Classes (added NPC classes)
  - Weapons (fixed description for Shortbows)
  - Spells (unticked SR flag and removed saving throw)
- Add the following compendiums:
  - Bestiary
  - Sample Macros
  - Roll Tables
- Show more info on defense chat logs, including buttons to roll saving throws
- A slight performance increase in actor and owned item sheets
- Remove sound effect from showing defenses

## 0.22

### Bug Fixes

- Defenses not showing with auto collapsing chat cards enabled
- Certain properties not working on inline rolls in chat logs (like @item.level on a buff)
- Item macros with duplicate names (you need to re-add item macros for this to work correctly)
- Restrict access on certain actor functions (so players can't roll an NPC's skill checks in a macro, for example)

### Changelog

- Add or update some items to the following compendiums:
  - Magic Items
  - Common Buffs
- Add macro'able function to show an actor's defenses as a chatlog (game.pf1.rollDefenses()) (see [documentation](https://furyspark.gitlab.io/foundryvtt-pathfinder1-doc/advanced/macros/))

## 0.21

### Bug Fixes

- Inability to delete custom skills and subskills
- Bug with quadruped actors
- Scrolling issue on skill pages
- Unformatted inline rolls in item chat logs

### Changelog

- Add a button to show static defenses

## 0.2002

### Changelog

- Add weapon range
- Automatically fill out more slots when creating an attack: attack ability,
  damage ability, damage ability multiplier, action type and action range
- Speed up actor sheets slightly
- Add ability to change loot item subtypes
- Fix measurement tools (cone and circle) to be more Pathfinder rule-friendly
- Support inline rolls for item roll messages
- Add compendiums for armor, weapons and magic items
