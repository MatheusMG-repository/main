# Text Enrichers

Common input format: `@Command[key;options]{label}`

Options format: `key=value` pairs separated with semicolon (`;`)

Label adds a prefix to the button, for example `@Ability[str]{Flex}` would show up as `Flex: Strength`. Some enrichers deviate from this however.

## Common Options

| Option    | Explanation                                           |
| :-------- | :---------------------------------------------------- |
| `speaker` | Limit activation to card speaker.                     |
| `bonus`   | Bonus to the roll.                                    |
| `roll`    | Roll replacement, e.g. for Fake 10 or fortune effect. |

## Enricher Usage

### `@Ability`

| Input           | Explanation                         |
| :-------------- | :---------------------------------- |
| `@Ability[str]` | Roll strength with any valid actor. |

### `@Action`

Trigger action from same item as the card is for.

Meant as a shorthand for `@Use` when you don't need to refer to different items.

#### Examples

| Input                     | Explanation                           |
| :------------------------ | :------------------------------------ |
| `@Action[Grab]{Followup}` | Trigger Grab action on the same item. |

### `@Apply`

Apply defined buff (by UUID) to actors. The buff is set to active state automatically.

If the item is found, displays the item name as default label.

#### Examples

| Input                                                              | Explanation                              |
| :----------------------------------------------------------------- | :--------------------------------------- |
| `@Apply[Compendium.pf1.commonbuffs.Item.IlO0CNpAIKZtNYu8;level=5]` | Add Mage Armor with buff level set to 5. |

#### Special Options

### `@Browse`

Open specified compendium browser.

Currently only supports raw IDs as they appear in `pf1.applications.compendiums`.

Unlike other enrichers, custom label replaces the text entirely.

#### Examples

| Input            | Explanation         |
| :--------------- | :------------------ |
| `@Browse[feats]` | Open feats browser. |

### `@Condition`

Add, remove, toggle or link conditions.

If toggle or removal is not defined, the condition is added.

#### Examples

| Input                               | Explanation                            |
| :---------------------------------- | :------------------------------------- |
| `@Condition[nauseated]`             | Add nauseated condition.               |
| `@Condition[grappled;toggle]`       | Toggle grappled condition.             |
| `@Condition[dazed;disable]{Undaze}` | Remove dazed condition.                |
| `@Condition[fatigued;info]`         | Link sleep condition compendium entry. |

#### Special Options

- `toggle` - Toggle condition.
- `remove` - Remove condition.
- `disable` - Alias for remove.
- `info` - Link compendium entry as defined in

### `@Damage`

Damages selected tokens by defined amount.

The key is damage formula instead.

#### Examples

| Input                  | Explanation                                    |
| :--------------------- | :--------------------------------------------- |
| `@Damage[2d4]`         | Rolls 2d4 and damages the actors by that much. |
| `@Damage[6;nonlethal]` | Causes 6 nonlethal damage.                     |

#### Special Options

- `nonlethal` - Adds nonlethal damage.

### `@Heal`

Heals selected tokens by defined amount.

The key is heal formula instead.

**Note!** Label replaces formula display instead of becoming a prefix.

#### Examples

| Input                | Explanation                                  |
| :------------------- | :------------------------------------------- |
| `@Heal[3d6]`         | Rolls 3d6 and heals the actors by that much. |
| `@Heal[6;nonlethal]` | Heals 6 nonlethal damage.                    |

#### Special Options

- `nonlethal` - Heals nonlethal damage.

### `@Save`

#### Examples

| Input                       | Explanation                                                               |
| :-------------------------- | :------------------------------------------------------------------------ |
| `@Save[ref]{Dodge!}`        | Roll reflex saving throw with any valid actor.                            |
| `@Save[fort;dc=15]{Resist}` | Roll fortitude save, displaying DC 15 as additional detail in the button. |

#### Special Options

- `dc` - Defines DC for the roll. Only used for display.

### `@Skill`

Skill roll button.

#### Examples

| Input                                   | Explanation                                                                                  |
| :-------------------------------------- | :------------------------------------------------------------------------------------------- |
| `@Skill[acr]`                           | Roll acrobatics with any valid actor.                                                        |
| `@Skill[acr;bonus=15;roll=10]{Take 10}` | Roll acrobatics with Take 10, +15 bonus, and with extra Take 10 label, with any valid actor. |
| `@Skill[acr;speaker]`                   | Roll acrobatics as card's speaker.                                                           |
| `@Skill[per;info]`                      | Link to perception's compendium entry.                                                       |

#### Special Options

- `info` - Button instead links to the compendium entry as configured in `pf1.config.skillCompendiumEntries`

#### Limitations

- Subskills and custom skills are not supported.

### `@Use`

Item use button.

#### Examples

| Input                                              | Explanation                                                                                             |
| :------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `@Use[Hero Points]`                                | Use hero points item's default action as any valid actor.                                               |
| `@Use[Fireball#cast;type=spell;speaker]{Cast}`     | Use Fireball spell's cast action as card's speaker.                                                     |
| `@Use[Fireball#tag:cast;type=spell;speaker]{Cast}` | Use Fireball spell's cast action with card's speaker, using action tag instead of name to match action. |

#### Special Options

| Option     | Description                                     |
| :--------- | :---------------------------------------------- |
| `type`     | Item type                                       |
| `#tag:TAG` | Action tag, needs to be part of the item name.  |
| `#id:ID`   | Action ID, needs to be part of the item name.   |
| `#name`    | Action name, needs to be part of the item name. |
