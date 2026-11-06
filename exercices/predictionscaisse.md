# Prédictions — e1-8 La caisse du kiosque

Piège central : `total` démarre à `0` (nombre), mais chaque clic fait `total = total + "6"` ou `total = total + "4"` — une addition avec une **chaîne entre guillemets**. Dès le premier clic, la boîte `total` devient elle-même une chaîne, et tous les clics suivants ne font plus qu'accoler du texte, pas additionner des nombres.

## Scénario 1 — un clic sur Frites
**Prédiction :** `total` vaut `0 + "6"`. Comme `"6"` est une chaîne, JS convertit `0` en `"0"` et colle : `"0" + "6" = "06"`. La vitrine affiche donc `06 CHF` (avec le zéro devant), pas `6 CHF`.
**Boîte qui change :** `total`, qui passe de nombre `0` à chaîne `"06"`.

## Scénario 2 — Frites puis Boisson
**Prédiction :** après Frites, `total = "06"`. Le clic Boisson fait `total = "06" + "4" = "064"`. La vitrine affiche `064 CHF` — un simple collage de texte, pas `10 CHF` comme le donnerait une vraie addition.

## Scénario 3 — Frites, puis code `PALEO`, puis Appliquer
**Prédiction :** le total ne revient **pas** à 0. Le code vérifie `code === "paleo"` (minuscules), mais l'affiche montre `PALEO` en majuscules et on tape ce qui est écrit. La comparaison est sensible à la casse : `"PALEO" === "paleo"` est faux, donc le `if` ne s'exécute jamais. La vitrine reste à `06 CHF`.

## Scénario 4 — Frites, Vider le plateau, Frites à nouveau
**Prédiction :** après le premier Frites, `total = "06"`. Le bouton **Vider** ne touche qu'à la vitrine — il écrit `"0 CHF"` directement dans `#affiche` et vide `#panier`, mais ne remet **jamais** `total` à `0` dans la mémoire. Donc au second clic Frites, `total = "06" + "6" = "066"`, et la vitrine affiche `066 CHF` au lieu de `6 CHF`. La boîte gardait l'ancienne valeur pendant que l'écran, lui, avait l'air propre.

## Bilan
4 prédictions sur 4, toutes centrées sur le même piège : `total` devient une chaîne dès le premier clic (concaténation au lieu d'addition), et le bouton Vider ne réinitialise que la vitrine, pas la boîte.
