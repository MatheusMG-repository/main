# Änderungen

![Beispiel](/Help/img/item-changes.webp)

- **Flags**
  - **Zwergenähnliche Traglast**: Solange ein Gegenstand mit dieser Änderung aktiv ist, wird sein Träger nicht durch mittlere oder schwere Last verlangsamt.
  - **Bewegungsrate in Mittlerer Rüstung**: Solange ein Gegenstand mit dieser Änderung aktiv ist, wird sein Träger nicht durch mittlere Rüstung verlangsamt.
  - **Bewegungsrate in Schwerer Rüstung**: Solange ein Gegenstand mit dieser Änderung aktiv ist, wird sein Träger nicht durch schwerer Rüstung verlangsamt.
  - **Geschicklichkeit von RK abziehen**: Solange ein Gegenstand mit dieser Änderung aktiv ist, verliert sein Träger seinen GE-Bonus auf seine Rüstungsklasse.
- **Änderungen**: Dies ist die Liste der Änderungen, die einen Aktor mit diesem Gegenstand betreffen. Von links nach rechts:
  - **Formel**: Die Formel nach der der Wert der Änderungen errechnet wird. Die Art der Änderung wird durch den Operator (siehe unten) festgelegt.
  - **Operator**: Die Operatoren sind '+' (relativ), '=' (absolut) oder 'S' (Skript). Relative Werte werden auf das Attribut addiert, während absolute Werte das Attribut setzen. Siehe unten für den Skript-Operator.
  - **Ziel**: Das zu verändernde Attribut.
  - **Modifikator**: Der Modifikator dieser Änderung.
  - **Priorität**: Die Priorität dieser Änderung. Änderungen mit einer niedrigen Priorität werden später verarbeitet. Niedrigere Prioritäten sind in seltenen Fällen notwendig.
- **Kontextnotizen**: Dies ist eine Liste der Kontextnotizen, die in den entsprechenden Situationen gezeigt werden. Von links nach rechts:
  - **Beschreibung**: Die Beschreibung, die in der entsprechenden Situation gezeigt werden soll. Jede neue Zeile erstellt eine neue Beschreibung für das selbe Zielt. Du kannst hier Foundry-artige inline-Würfe verwenden.
  - **Ziel**: Das zu verändernde Attribut.

## Skript-Operator

Die 'Formel' von Änderungen mit Skript-Operator sind in Wirklichkeit kleine JavaScript-Skripe, die laufen, wenn die Änderungen verarbeitet werden. Um sie zu verstehen ist JavaScript-Wissen erforderlich.

> ⚠ Skript-Operatoren sind per Default deaktiviert. ⚠
>
> **Aktiviere sie nur, wenn du deinen Spielern vertraust, denn mit aktivierten Skript-Operatoren können sie JavaScript-Code mit erhöhter Berechtigung ausführen!**
>
> Wenn du jeden einzelnen deiner Spieler vertraust, und nur dann, kannst du Skript-Operator in den Systemeinstellungen aktivieren, unter dem Punkt "Script-Änderungen zulassen".

In diesen Skripten können folgende Variablen verwendet werden:

- `d` Die Daten des Wurfs zur Zeit der Verarbeitung der Änderung. Alle Variablen, die in normalen Formeln mit dem `@`-Symbol verwendet werden können, können auch hier verwendet werden.
- `result` Dies enthält zwei weitere Variablen, `value` und `operator`. Setze `value` auf den numerischen Wert, den du für diese Änderung möchtest und `operator` auf entweder "add" oder "set".
  Der Default ist `0` für `value` und "add" für `operator`.
