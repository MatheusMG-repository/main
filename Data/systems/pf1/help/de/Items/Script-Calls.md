# Skriptaufrufe

Die meisten Gegenstände haben bestimmte Kategorien von Skriptaufrufen, die eine Kombination auf Makros und inline-Skripten sind, die bei bestimmten Ereignissen des Gegenstandes ausgelöst werden.

## Makros als Skriptaufrufe verwenden

Um Makros als Skriptaufrufe zu verwenden, ziehe einfach ein Makro von irgendwoher auf die Kategorie von Skriptaufrufen, bei der du es laufen lassen möchtest.

## Variablen

Die zu Verfügung stehenden Variablen unterscheiden sich von denen in regulären Makros.
Unten findest du eine Liste von Variablen, die du in Skriptaufrufen benutzen kannst.
| Name | Beschreibung|
| ------ | ------ |
| `item` | Der Gegenstand von dem aus das Ereignis aufgerufen wurde. |
| `actor` | Der Aktor, der den auslösenden Gegenstand besitzt. Kann `null` sein, wenn der Gegenstand nicht von einem Aktor besitzt wird. |
| `shared` | Ein Objekt, das leer anfängt, aber zwischen allen Skriptaufrufen eines einzelnen Ereignisses geteilt wird. Danach wird es zur aufrufenden Funktion übergeben, die etwas damit tun kann. |

## Kategorien

### Benutzen

Wird aufgerufen, wenn der Gegenstand benutzt wird.
Wenn ein Gegenstand mindestens ein Skriptaufruf dieser Kategorie enthält, ist es immer benutzbar.
Dieser Aufruf enthält eine weitere Variablen: `shared.attackData.action` die der Aktion, die benutzt wurde, entspricht. Du kannst `shared.attackData.action.tag` benutzen, um zwischen verschiedenen Aktionen zu unterscheiden.
Optional kann auch `shared.reject` auf `true` gesetzt werden, um die Benutzen des Gegenstandes abzubrechen.

### Ausrüsten

Wird aufgerufen, wenn der Gegenstand an- oder abgelegt wird.
Dieser Aufruf enthält eine weitere Variable `equipped`, die entweder `true` (wenn der Gegenstand angelegt wurde) oder `false` (wenn der Gegenstand abgelegt wurde) sein kann.

### Umschalten

Wird aufgerufen, wenn ein Buff oder Talent an- oder ausgeschaltet wurde.
Dieser Aufruf enthält eine weitere Variable `state`, die entweder `true` (wenn der Gegenstand angeschaltet wurde) oder `false` (wenn der Gegenstand ausgeschaltet wurde) sein kann.

### Mengenänderung

Wird aufgerufen, wenn die Menge eines Gegenstands verändert wurde.
Dieser Aufruf enthält zwei weitere Variablen `quantity.previous` und `quantity.new`, die die Menge vor und nach der Änderung enthalten.

### Stufenänderung

Wird aufgerufen, wenn die Stufe eines Gegenstands verändert wurde.
Dieser Aufruf enthält zwei weitere Variablen `level.previous` und `level.new`, die die Stufe vor und nach der Änderung enthalten.
