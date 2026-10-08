# Critique comparative des propositions de design — Ponson Cuisson

Trois propositions ont été générées par IA à partir du wireframe (`wireframes/wireframe.svg`). Chacune montre les mêmes 4 écrans : liste des recettes, création / calcul, fiche recette, partage. Les images sont dans `propositions/`.

| Proposition | Fichier |
|---|---|
| 1. Fraîcheur | `propositions/proposition-1-fraicheur.png` |
| 2. Énergie | `propositions/proposition-2-energie.png` |
| 3. Chaleur | `propositions/proposition-3-chaleur.png` |

## Critères de comparaison

Les critères viennent du persona (Lucas, 25 ans, sportif, utilise l'application vite et souvent d'une seule main) et du brief :

1. **Lisibilité du résultat** : le chiffre « par portion » se repère-t-il en une seconde ?
2. **Adéquation au persona** : l'ambiance correspond-elle à Lucas ?
3. **Contraste** : les textes et chiffres restent-ils lisibles (rapport de contraste mesuré, objectif WCAG AA : 4,5 pour le texte normal, 3 pour le grand texte) ?
4. **Utilisation à une main** : boutons larges, zones de toucher claires, action principale en bas de l'écran.
5. **Cohérence avec le brief** : « Total du plat » et « Par portion » bien distincts à l'écran.
6. **Faisabilité en 4 semaines** : le style est-il simple à coder (peu d'effets, peu d'images, polices disponibles) ?

## Proposition 1 — Fraîcheur

Clair, vert, très arrondi, ombres douces. Ambiance « application de santé ».

**Points forts**
- Texte principal très lisible (contraste 13,6 sur le fond).
- Formes arrondies et espacées, faciles à toucher.
- Style simple à coder, sans effets coûteux.

**Points faibles**
- Texte blanc sur vert (boutons) : contraste de 3,4, sous le seuil de 4,5 pour du texte normal.
- Le gros chiffre jaune sur vert est faible (2,7), alors que c'est justement l'information la plus importante.
- Ambiance très proche de celle des autres applications de nutrition : peu d'identité.

## Proposition 2 — Énergie

Fond sombre, vert citron fluo, titres en majuscules très gras, chiffres en police à chasse fixe.

**Points forts**
- Meilleurs contrastes des trois (texte 16,9 ; bouton 16,5 ; kcal en vert citron 14,3).
- Le résultat « par portion » ressort : grand chiffre noir sur fond vert citron, impossible à manquer.
- Correspond à l'univers sportif de Lucas (salle, performance).
- Une seule couleur d'accent : le regard sait toujours où appuyer.

**Points faibles**
- Fond sombre moins agréable en plein jour ; un mode clair serait à prévoir si le temps le permet.
- Les titres en majuscules fatiguent si les noms de recettes sont longs.
- Gris secondaire (contraste 5,2) correct, mais à ne pas rendre plus clair ou plus petit.

## Proposition 3 — Chaleur

Crème et terracotta, titres en italique à empattement, bordures en pointillés. Ambiance « carnet de cuisine ».

**Points forts**
- Identité très marquée, cohérente avec le thème de la cuisine.
- Bons contrastes pour les boutons (4,7) et les kcal dans les listes (5,0).
- Le gris secondaire est limite (4,5) mais acceptable.

**Points faibles**
- Moins en phase avec le persona : Lucas est sportif, pas amateur de cuisine rétro.
- Chiffre jaune pâle sur terracotta : 4,2, à la limite pour du grand texte seulement.
- Italique et pointillés rendent l'ensemble plus lent à parcourir, alors que Lucas veut aller vite.
- Les polices à empattement demandent un chargement de police propre à l'application.

## Tableau comparatif

Notes de 1 (faible) à 5 (excellent), selon mon appréciation après lecture des rendus et mesure des contrastes.

| Critère | 1. Fraîcheur | 2. Énergie | 3. Chaleur |
|---|---|---|---|
| Lisibilité du résultat | 3 | 5 | 4 |
| Adéquation au persona | 3 | 5 | 2 |
| Contraste | 2 | 5 | 4 |
| Utilisation à une main | 4 | 4 | 4 |
| Cohérence avec le brief | 4 | 4 | 4 |
| Faisabilité en 4 semaines | 5 | 4 | 3 |
| **Total (sur 30)** | **21** | **27** | **21** |

## Choix final : proposition 2 — Énergie

Raison principale : c'est la seule qui met le résultat au premier plan avec un contraste très élevé, et elle colle au persona. Lucas ouvre l'application debout, souvent en mouvement ; il doit lire « 336 kcal par portion » en une seconde.

### Direction artistique retenue

| Élément | Choix |
|---|---|
| **Ambiance** | Sportive, directe, sans décoration inutile |
| **Fond** | Noir bleuté `#101216`, cartes `#1A1D23`, bordures fines `#272B33` |
| **Couleur d'accent** | Vert citron `#C6FF3D`, utilisé uniquement pour les actions et les calories |
| **Texte** | Blanc cassé `#F2F4F0` ; gris secondaire `#8A9088` (ne pas l'éclaircir en dessous du contraste actuel) |
| **Typographie** | Inter (titres en gras, majuscules) ; chiffres en chasse fixe pour que les totaux ne « sautent » pas à chaque ajout |
| **Formes** | Coins peu arrondis (8 px), pas d'ombres, un trait vert sous l'en-tête |
| **Boutons** | Pleins, pleine largeur, en bas de l'écran ; bouton secondaire en contour vert citron |
| **Mise en avant du résultat** | Bloc vert citron avec texte noir : « Total du plat » en petit, « Par portion » en grand |

### Ajustements à faire avant de coder

- Limiter les titres en majuscules aux en-têtes et aux boutons ; les noms de recettes restent en casse normale.
- Garder la hiérarchie du bloc de totaux : « Par portion » toujours plus gros que « Total du plat » (règle du brief : pas de confusion entre les deux).
- Prévoir un état d'erreur lisible sur fond sombre (message sous le champ, couleur à choisir avec un contraste d'au moins 4,5).
- Dans l'application réelle, remplacer la police à chasse fixe du rendu par une police disponible partout, ou utiliser les chiffres tabulaires d'Inter.
- Vérifier la lisibilité en plein soleil ; si elle est mauvaise, ajouter un thème clair en dernier.

## Note

Les trois images ont été produites par IA et rendues en PNG ; les contrastes ont été calculés avec la formule WCAG. Les notes sont une appréciation, à ajuster après avoir regardé les images et testé sur un vrai téléphone.
