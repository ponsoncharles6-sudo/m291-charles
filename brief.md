# Brief — Ponson Cuisson

> Fichier de spécification officiel de l'application (module M291).
> Document de référence : en cas de doute pendant le développement, c'est ce fichier qui fait foi.

## 1. Résumé

**Ponson Cuisson** est une application mobile qui permet de calculer les calories d'un plat à partir de ses ingrédients, puis de partager la fiche de la recette.

## 2. Public cible

Voir `application/design/persona.md`.

**Lucas, 25 ans**, sportif, vient de commencer à travailler. Il veut suivre ce qu'il mange sans perdre de temps : pas de compte, pas de longs formulaires, un résultat immédiat.

## 3. Problème et objectif

| | |
|---|---|
| **Problème** | Un plat fait maison n'a pas d'étiquette nutritionnelle ; calculer ses calories à la main prend du temps. |
| **Objectif** | Donner en quelques secondes les calories totales et par portion d'un plat, et permettre de le partager. |

## 4. Tâche principale

Créer une recette : choisir des ingrédients, indiquer les quantités, voir tout de suite les calories totales et par portion, puis partager la fiche.

Le détail des étapes, des écrans et des feedbacks est décrit dans `application/design/user-flow.md`.

## 5. Périmètre

### Inclus

- Liste des recettes enregistrées
- Création d'une recette (nom, nombre de portions, ingrédients avec quantités en grammes)
- Calcul automatique des calories totales et par portion, mis à jour à chaque modification
- Fiche recette
- Partage de la fiche
- Liste fixe d'ingrédients avec leurs calories pour 100 g

### Exclu

- Compte utilisateur et connexion
- Base de données externe ou serveur
- Ajout d'ingrédients personnalisés
- Suivi de journal alimentaire, objectifs ou poids
- Autres valeurs nutritionnelles (protéines, glucides, lipides)

## 6. Écrans

| # | Écran | Rôle |
|---|---|---|
| 1 | Liste des recettes | Voir les recettes enregistrées, accéder à la création ou à une fiche |
| 2 | Création / calcul | Saisir le nom, les portions et les ingrédients ; voir les totaux en direct |
| 3 | Fiche recette | Consulter une recette enregistrée et lancer le partage |
| 4 | Partage | Choisir un moyen d'envoi et confirmer |

Un sélecteur d'ingrédients (recherche dans la liste fixe puis saisie de la quantité) s'ouvre depuis l'écran 2 (écran 2b du wireframe).

## 7. Données

### Ingrédient (liste fixe, non modifiable par l'utilisateur)

| Champ | Type | Exemple |
|---|---|---|
| nom | texte | Farine |
| kcalPour100g | nombre | 364 |

### Recette

| Champ | Type | Exemple |
|---|---|---|
| nom | texte | Tarte au sucre |
| portions | nombre entier (≥ 1) | 8 |
| ingrédients | liste de lignes (ingrédient + quantité en g) | voir ci-dessous |
| totalKcal | nombre calculé | 2691 |
| kcalParPortion | nombre calculé | 336 |

### Exemple : « Tarte au sucre » (données inventées, valeurs approximatives)

| Ingrédient | Quantité | kcal pour 100 g | kcal |
|---|---|---|---|
| Farine | 250 g | 364 | 910 |
| Beurre | 100 g | 717 | 717 |
| Sucre | 120 g | 387 | 464 |
| Crème | 200 g | 300 | 600 |
| **Total du plat** | | | **2 691** |
| **Par portion (8)** | | | **336** |

## 8. Règles de calcul

- Calories d'un ingrédient = quantité (g) ÷ 100 × kcal pour 100 g
- Total du plat = somme des calories de tous les ingrédients
- Par portion = total du plat ÷ nombre de portions
- Les valeurs affichées sont arrondies à l'entier ; le calcul interne n'est arrondi qu'à la fin

## 9. Critères de réussite

- [ ] Une recette peut être créée en moins de 2 minutes avec 4 ingrédients
- [ ] Les totaux se mettent à jour immédiatement après chaque ajout, modification ou suppression d'ingrédient
- [ ] La recette « Tarte au sucre » ci-dessus donne 2 691 kcal au total et 336 kcal par portion
- [ ] Une recette enregistrée réapparaît dans la liste et sur sa fiche
- [ ] La fiche peut être partagée en un appui depuis la fiche recette
- [ ] Les cas limites du user flow (aucun ingrédient, portions à 0, quantité à 0) affichent un message clair

## 10. Contraintes

- **Durée :** 4 semaines de code
- **Données :** stockées localement, sans compte ni service externe
- **Ergonomie :** utilisable à une main, boutons larges, clavier numérique pour les quantités
- **Langue :** français
- **Technologies :** à compléter selon ce qui est imposé dans le cours

## 11. Livrables liés

| Fichier | Emplacement |
|---|---|
| Pitch | `application/design/pitch.md` |
| Persona | `application/design/persona.md` |
| User flow | `application/design/user-flow.md` |
| Wireframe | `application/design/wireframes/` |
| Propositions de design (IA) | `application/design/propositions/` |
| Critique comparative | `application/design/critique.md` |

---

## Relecture préalable (par Claude, IA)

Vérifications faites avant la revue croisée : cohérence entre `pitch.md`, `persona.md`, `user-flow.md`, ce brief et le wireframe ; calcul de l'exemple « Tarte au sucre » (2 691 kcal au total, 336 kcal par portion) ; chemins des livrables. Un manque a été corrigé : le sélecteur d'ingrédients est maintenant dessiné (écran 2b du wireframe). **Reste à compléter :** la ligne « Technologies » (section 10). Cette relecture ne remplace pas la revue croisée avec un binôme ci-dessous.

## Revue croisée avec un binôme (à faire avant le commit)

**Relecteur :** ______________  **Date :** ______________

- [ ] Je comprends l'application en lisant seulement le résumé
- [ ] Le persona correspond bien à l'application décrite
- [ ] La tâche principale est claire et réalisable en 4 semaines
- [ ] Le périmètre (inclus / exclu) est sans ambiguïté
- [ ] Les données et les règles de calcul sont cohérentes avec l'exemple
- [ ] Les critères de réussite sont vérifiables
- [ ] Remarques : _______________________________________________
