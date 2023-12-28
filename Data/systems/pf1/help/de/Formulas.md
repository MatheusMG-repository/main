# Formeln

Dieser Teil der Hilfedatei befindet sich momentan im Aufbau.

Formeln sind wichtige Aspekte im Pathfinder-1e-System. Sie können so nur eine einzelne Nummer sein oder ein komplexer Ausdruck. Sie spielen eine große Rolle in Veränderungen von Gegenständen.

## Variablen

Viele dieser Informationen kannst du auch in Tooltips auf dem Charakterbogen finden.

### `@abilities.X.total`

Die Gesamtwert der Eigenschaft. Ersetze X durch eins der folgenden: 'str' (Stärke), 'dex' (Geschicklichkeit), 'con' (Konstitution), 'int' (Intelligenz), 'wis' (Weisheit), 'cha' (Charisma).

### `@abilities.X.mod`

Der Modifikator des Eigenschaftswerts. Ersetze X durch eins der folgenden: 'str' (Stärke), 'dex' (Geschicklichkeit), 'con' (Konstitution), 'int' (Intelligenz), 'wis' (Weisheit), 'cha' (Charisma).

### `@attributes.hd.total`

Die gesamten Trefferwürfel des Aktors. Dies ist eine Kombination aus Klassenstufen und Volkstrefferwürfeln, ohne Legendenstufen.

### `@attributes.savingThrows.X.total`

Der Gesamtbonus eines Rettungswurfs für diesen Aktor. X kann 'fort' (Zähigkeit), 'ref' (Reflex) or 'will' (Wille) sein.

### `@attributes.savingThrows.X.base`

Der Gesamtgrundbonus eines Rettungswurfs für diesen Aktor entsprechend der Klassenstufe. X kann 'fort' (Zähigkeit), 'ref' (Reflex) or 'will' (Wille) sein.

### `@attributes.encumbrance.level`

Der momentane Belastungszustand des Aktors.

- `0`: Leichte Last
- `1`: Mittlere Last
- `2`: Schwere Last

### `@armor.type`

Die Art der Rüstung, die der Aktor trägt.

- `0`: Keine Rüstung
- `1`: Leichte Rüstung
- `2`: Mittlere Rüstung
- `3`: Schwere Rüstung

### `@shield.type`

Die Art des ausgerüsteten Schildes.

- `0`: Kein Schild
- `1`: Sonstiger Schild (wie Tartsche)
- `2`: Leichter Schild
- `3`: Schwerer Schild
- `4`: Turmschild

### `@combat.round`

Die derzeitige Kampfrunde, oder `0` falls nicht im Kampf.

### `@critMult`

Der Multiplikator eines kritischen Treffers, oder 1 wenn der Angriff keine kritische Bedrohung ist.
Nur in Schadenswürfen und Angriffs- und Schadensnotizen angemessen.

## Funktionen

Foundry (und dadurch auch dieses System) erlaubt die [`Math`-Formeln](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) von JavaScript in Formeln.

Informationen über das Schreiben von Formeln mithilfe von Ausdrücken, die die Aktor- und Gegenstandsdaten benutzen befinden sich in der ["Knowledge Base" von Foundry](https://foundryvtt.com/article/dice-advanced/).
Abgesehen von diesen Funktionen bietet das Pathfinder-1e-System noch einige spezifischere Helferfunktionen an:

### `sizeRoll`

Verändert die Schadensformel entsprechend für eine bestimmte Größenkategorie.

**Beispiel:** `sizeRoll(1, 8, @size)` – Wirft 1W8 für mittelgroße Aktoren und verändert die Schadensformel entsprechend der Größe des ausführenden Aktors.

**Beispiel:** `sizeRoll(1, 4, 6, 2)` – Ändert den Schadenswurf von 1W4 eines kleines Aktors (Größe '2') zu einem Schadenswurf eines großen Aktors (Größe '6'); Ergebnis: 3W6

### `sizeReach`

Generiert eine Zahl für die Reichweite einer Kreature einer bestimmten Größe und Gestalt (lang oder hoch).

**Beispiel:** `sizeReach(@size + 1, false, @traits.stature)` – Gibt die normale Nahkampfreichweite zurück als wäre der Aktor eine Größenkategorie größer.

**Beispiel:** `sizeReach(6, true, "long")` – Gibt die Reichweite zurück, die eine riesige, lange Kreatur mit einer Reichweitenwaffe hat.
