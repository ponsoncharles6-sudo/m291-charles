# Bug du compteur

Ce que je vois : je clique sur +1 plusieurs fois, mais le chiffre affiché à l'écran reste à 0.
Ce que j'attendais : le chiffre affiché à l'écran devait augmenter de 1 à chaque clic, comme le compteur.
La boîte qui change : la variable `n` (en mémoire), incrémentée dans l'écouteur de clic (`n = n + 1`).
Ce qui ne se met pas à jour : l'élément du DOM `#affiche` — rien dans le code ne recopie la valeur de `n` vers `textContent` de `affiche`. Le `console.log` confirme que `n` change bien en mémoire, mais cette valeur n'est jamais renvoyée vers l'écran.
