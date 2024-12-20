# Formulas

This section is currently a Work In Progress (WIP).

Formulas are an important aspect in the Pathfinder 1e system. They can be as simple as a single numerical value, or as complex as single lines of code. They play a great role in item changes.

## Variables

For a quick reference, you can find a lot of this information in tooltips on actor sheets as well.

### `@abilities.X.total`

The total value of an ability score. Replace `X` with one of the following: `str`, `dex`, `con`, `int`, `wis`, `cha`.

### `@abilities.X.mod`

The modifier of an ability score. Replace `X` with one of the following: `str`, `dex`, `con`, `int`, `wis`, `cha`.

### `@attributes.hd.total`

The total hit die the actor has. This is a combination of class levels and racial hit die, and it excludes mythic tiers.

### `@attributes.savingThrows.X.total`

The total bonus of the appropriate saving throw for that actor. X can be either 'fort' (Fortitude), 'ref' (Reflex) or 'will' (Will)

### `@attributes.savingThrows.X.base`

The total bonus of the appropriate saving throw for that actor. X can be either 'fort' (Fortitude), 'ref' (Reflex) or 'will' (Will)

### `@attributes.encumbrance.level`

The current encumbrance level of the actor.

- `0`: Light Load
- `1`: Medium Load
- `2`: Heavy Load

### `@armor.type`

The type of armor the actor is wearing.

- `0`: No Armor
- `1`: Light Armor
- `2`: Medium Armor
- `3`: Heavy Armor

### `@shield.type`

The type of shield the actor is holding.

- `0`: No Shield
- `1`: Miscellaneous Shield (such as a buckler)
- `2`: Light Shield
- `3`: Heavy Shield
- `4`: Tower Shield

### `@combat.round`

The current round of combat, or `0` if not in combat.

### `@critMult`

The critical multiplier of the attack, or `1` if the attack is not a critical threat.
Only appropriate for use in damage rolls and attack and effect notes.

### `@sizeBonus`

Effective attack roll bonus or penalty from size.

### `@powerAttackBonus`

Base bonus damage given by power attack to individual damage. E.g. two-handed attack at level 2 would always give 3 for this.

Defaults to `0` if power attack is disabled.

### `@powerAttackPenalty`

Attack penalty power attacking causes. Goes hand in hand with `@powerAttackBonus`.

For example furious focus is easy to implement with conditional attack roll modifier of `-@powerAttackPenalty` on the first attack.

Defaults to `0` if power attack is disabled.

### `@attackCount`

Zero-indexed counter for which attack is being processed. So if this was placed as damage bonus, it would give you `0`, `1`, `2`, `3`, etc. bonus to damage as the attacks progress.

Can also be used for ternaries to add modifications to specific attack, e.g. `@attackCount == 0 ? 4 : 0` would add 4 to first attack but no other.

## Functions

Foundry (and by extension this system) allow using JavaScript's [`Math` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) in its formulas.
Information about writing formulas using such expressions and referencing actor and item data can be found in [Foundry's Knowledge Base](https://foundryvtt.com/article/dice-advanced/).
In addition to the functions mentioned there, the Pathfinder 1e system provides some specific helpers available for use in some formulas.

### `sizeRoll`

Alters a damage roll to that of another size category.

**Example:** `sizeRoll(1, 8, @size)` – Rolls 1d8 for medium actors, and alters the damage formula according to the calling actor's current size.

**Example:** `sizeRoll(1, 4, 6, 2)` – Translates a damage roll of `1d4` from a tiny actor (size `2`) to a huge actor (size `6`); Output: `3d6`

| `@size` | Actual     |
| :------ | :--------- |
| `0`     | Fine       |
| `1`     | Diminutive |
| `2`     | Tiny       |
| `3`     | Small      |
| `4`     | Small      |
| `5`     | Large      |
| `6`     | Huge       |
| `7`     | Gargantuan |
| `8`     | Colossal   |

Normally you should not need the fourth parameter. It's mainly useful if you have damage for non-medium character and use that info to fill the first two parameters, then the fourth parameter should include the size for which the first two were for.

The function does not really do anything useful with less than 3 parameters provided.

You can also use `@item.size` to use the item's own size instead of `@size` which refers to actor's size.

### `sizeReach`

Generates a number equal to the reach of a creature of a certain size and stature.

**Example:** `sizeReach(@size + 1, false, @traits.stature)` – Returns the normal melee reach as if the actor was 1 size category higher.

**Example:** `sizeReach(6, true, "long")` – Returns the reach a huge, long actor would have with a reach weapon.
