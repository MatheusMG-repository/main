# Formules

Cette section est actuellement en cours de travail (WIP).

Les formules sont un aspect important du système Pathfinder 1e. Elles peuvent être aussi simples qu’une valeur numérique
seule ou complexes via une seule ligne de code. Elles jouent un grand rôle dans les changements d’objets.

## Variables

Pour une référence rapide, vous pouvez aussi trouver beaucoup d’informations dans les info-bulles d’aide sur les
feuilles d’acteur.

### `@abilities.X.total`

La valeur totale d’un score de caractéristique. Remplacez `X` avec une des valeurs suivantes : `str` (pour `for`), `dex`
, `con`, `int`, `wis` (pour `sag`), `cha`.

### `@abilities.X.mod`

Le modificateur d’un score de caractéristique. Remplacez X avec une des valeurs suivantes : `str` (pour `for`), `dex`,
`con`, `int`, `wis` (pour `sag`), `cha`.

### `@attributes.hd.total`

Le total de Dés de vie que l’acteur possède. C’est une combinaison de niveaux de classes et de niveaux raciaux et cela
exclut les rangs mythiques.

### `@attributes.savingThrows.X.total`

Le bonus total des jets de sauvegarde appropriés pour cet acteur. `X` peut être soit `fort` (Vigueur), `ref` (Réflexes)
ou `will` (Volonté)

### `@attributes.savingThrows.X.base`

Le bonus de base total du jet de sauvegarde approprié pour cet acteur, comme indiqué par le niveau de classe. `X` peut
être soit `fort` (Vigueur), `ref` (Réflexes) ou `will` (Volonté)

### `@attributes.encumbrance.level`

Le niveau d’encombrement actuel de l’acteur.

- `0`: Charge légère
- `1`: Charge intermédiaire
- `2`: Charge lourde

### `@armor.type`

Le type d’armure revêtue par l’acteur.

- `0`: Pas d’armure
- `1`: Armure légère
- `2`: Armure intermédiaire
- `3`: Armure lourde

### `@shield.type`

Le type de bouclier tenu par l’acteur.

- `0`: Pas de bouclier
- `1`: Bouclier divers (tel qu’une targe)
- `2`: Bouclier léger
- `3`: Bouclier lourd
- `4`: Pavois

### `@combat.round`

Le round actuel de combat ou `0` hors combat.

### `@critMult`

Le multiplicateur de critique de l’attaque, ou `1` si l’attaque n’est pas un critique.
Convient uniquement pour une utilisation dans les jets de dégâts et les notes d’attaque et d’effet.

## Fonctions

Foundry (et par extension ce système) autorise l’utilisation des
[fonctions `Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) de JavaScript
dans ses formules.

Des informations à propos de comment utiliser ce genre d’expressions et référencer les données d’un acteur ou d’un
objet peuvent être trouvés dans la [Base de Connaissance de Foundry](https://foundryvtt.com/article/dice-advanced/).

En plus des fonctions qui y sont mentionnées, le système Pathfinder 1e fournit des aides spécifiques disponibles pour
une utilisation dans certaines formules.

### `sizeRoll`

Modifie le jet de dégât à celui d’une autre catégorie de taille.

**Exemple :** `sizeRoll(1, 8, @size)` – Lance 1d8 pour un acteur de taille M et altère la formule de dégâts en fonction
de la taille actuelle de l’acteur appelé.

**Exemple :** `sizeRoll(1, 4, 6, 2)` – Transforme le jet de dégâts de 1d4 d’un acteur de taille TP (size `2`) vers un
acteur de taille TG (size `6`); Sortie : `3d6`.

### `sizeReach`

Génère un nombre égal à la portée d’une créature d’une certaine taille et stature.

**Exemple :** `sizeReach(@size + 1, false, @traits.stature)` – Renvoie l’allonge normale au corps à corps si l’acteur
était d’une catégorie de taille supérieure.

**Exemple :** `sizeReach(6, true, "long")` – Renvoie l’allonge qu’un Très grand et long acteur devrait avoir avec une
arme d’allonge.
