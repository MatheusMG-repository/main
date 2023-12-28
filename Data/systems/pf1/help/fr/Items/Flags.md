# Flags

Les flags peuvent être utilisés par des modules et des macros. Les flags booléens ne font rien par eux-mêmes, mais les
flags dictionnaire peuvent être utilisés dans les jets, en plus de leur utilisation dans les macros et les modules.

## Flags dictionnaire

Vous pouvez accéder aux Flags dictionnaire à l'intérieur des jets en utilisant `@dFlags.(itemTag).(flagName)` ou
avec `@item.dFlags.(flagName)` au sein de l'objet actuel.
