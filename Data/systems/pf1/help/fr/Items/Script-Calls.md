# Appels de scripts

La plupart des objets ont certaines catégories d'appels de script, qui sont une combinaison de macros et de scripts en
ligne qui s'exécutent lors d'événements spécifiques pour cet élément.

## Utilisation de macros comme appel de script

Pour utiliser les macros en tant qu'appel de script, faites simplement glisser une macro de quelque part vers la
catégorie d'appel de script sur laquelle vous souhaitez les exécuter.

## Variables

La disponibilité de variables diffère quelque peu de ce qui est disponible dans les macros classiques.
Vous trouverez ci-dessous une liste des variables présentes dans les appels de script.

| Nom      | Description                                                                                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `item`   | L'objet à partir duquel cet événement a été appelé.                                                                                                                                              |
| `actor`  | L'acteur qui possède l'objet appelant. Peut être `null` si l'élément n'est pas sur un acteur.                                                                                                    |
| `shared` | Un objet qui commence vide, mais qui est partagé entre tous les appels de script d'un même événement, après quoi il est renvoyé à la fonction appelante, qui peut ou non en faire quelque chose. |

## Catégories

### Utiliser

Appelé lorsqu'un objet a été utilisé.

Si un objet a au moins un appel de script dans cette catégorie, il est utilisable quoi qu'il en soit.

Cet appel aura une variable supplémentaire `shared.attackData.action` qui fait référence à l'action spécifique utilisée.

Vous pouvez utiliser `shared.attackData.action.tag` pour différencier les actions.

Optionnellement, `shared.reject` peut être défini sur `true` pour annuler l'utilisation de l'élément.

### Équiper

Appelé lorsqu'un objet a été équipé ou déséquipé.

Cet appel aura une variable supplémentaire `equipped` qui vaudra soit `true` s'il vient d'être équipé, soit `false` s'il
vient d'être déséquipé.

### Basculer

Appelé lorsqu'un buff ou une fonctionnalité a été activé / désactivé.

Cet appel aura une variable supplémentaire `state` qui vaudra `true` si elle vient d'être activée ou `false` si elle
vient d'être désactivée.

### Modifier la quantité

Appelé lorsque la quantité d'un objet physique a été modifiée.

Cet appel aura les variables supplémentaires `quantity.previous` et `quantity.new`, qui contiennent respectivement la
quantité avant et après la mise à jour.

### Changer de niveau

Appelé lorsque le niveau d'un objet a été modifié.

Cet appel aura les variables supplémentaires `level.previous` et `level.new`, qui contiennent respectivement le niveau
avant et après la mise à jour.
