# Changements

![Exemples de changements](/Help/img/item-changes.webp)

- **À cocher**
  - **Encombrement spécifique des nains** : Lorsqu'un objet avec ce changement est actif, son acteur ne sera pas
    ralenti en étant dans une charge moyenne ou lourde.
  - **Vitesse de Déplacement en armure Intermédiaire** : Lorsqu'un objet avec ce changement est actif, son acteur ne
    sera pas ralenti en portant une armure moyenne.
  - **Vitesse de Déplacement en armure lourde** : Lorsqu'un objet avec ce changement est actif, son acteur ne sera pas
    ralenti par le port d'une armure lourde.
  - **Perte du bénéfice de Dex à la CA** : Lorsqu’un objet avec ce changement est actif, un personnage perd son bonus de
    Dextérité à la Classe d’Armure.
- **Changements** : Il s'agit d'une liste de changements qui affectent directement l'acteur propriétaire de l'élément.
  De gauche à droite :
  - **Formule** : La formule par laquelle affecter ce changement particulier. La manière dont cela altère l’attribut
    d’un acteur dépend de l’opérateur (vois après). Voir [cette page](/Help/Formulas) pour plus de détails.
  - **Opérateur** : L’opérateur est soit `+` (relatif) ou `=` (absolu). Les valeurs relatives _ajoutent_ à un attribut,
    alors que les valeurs absolues _fixent_ l’attribut au résultat de la formule.
  - **Cible** : L'attribut à modifier avec ce changement.
  - **Modificateur** : Le modificateur de ce changement.
  - **Priorité** : La priorité de ce changement. Les changements avec de moindres propriétés seront effectués plus tard.
- **Notes de contexte** : C’est une liste de notes contextuelles qui sont montrées dans les situations appropriées. De
  gauche à droite :
  - **Description** : La description à montrer dans les situations appropriées. Chaque nouvelle ligne ajoute une
    nouvelle description à la même cible. Vous pouvez utiliser les styles de jets utilisables dans Foundry dans
    celles-ci.
  - **Cible** : L'attribut à modifier avec ce changement.

## Opérateur de script

Les 'formules' des changements utilisant l'opérateur script sont actuellement des petits scripts en JavaScript qui sont
lancés lorsque vous faites les changements. Des connaissances en JavaScript sont requises pour les comprendre.

> ⚠ Les opérateurs Script sont désactivés par défaut. ⚠
>
> **Activez-les uniquement si vous faites confiance à vos joueurs, les activer leur permettra d'exécuter du code
> JavaScript avec des autorisations élevées !**
>
> Si, et seulement si, vous faites confiance à chaque joueur, vous pouvez activer les opérateurs de script dans
> Paramètres système de jeu > Activer les changements par Script.

Au sein de ces scripts, les variables suivantes sont utilisées :

- `d` Les donnés du lancer au moment de procéder au changement. Contient toute variable que vous pourriez utiliser au
  sein d’un changement normal de formule en utilisant le symbole `@`.
- `result` Ceci contient deux variables de plus, `value` et `operator`. Définissez `value` au résultat numérique que
  vous souhaitez pour le changement et `operator` sur `add` ou `set`.
  Par défaut `value` vaut `0` et `operator` vaut `add`.
