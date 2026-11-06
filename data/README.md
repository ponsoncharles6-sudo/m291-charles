# Données — Ponson Cuisson

Ce dossier documente la base de recettes de l'application et la façon de la valider.

| Fichier | Rôle | Fiche d'atelier |
|---|---|---|
| `../data.json` | Base officielle : 32 recettes (les 5 premières saisies à la main) | e3-2 |
| `schema.json` | Schéma JSON Schema (draft-07) qui valide la structure des recettes | S10-AV1 |
| `../.vscode/settings.json` | Branche le schéma sur les fichiers de données dans VS Code | S10-AV1 |
| `data-avance.json` | Échantillon de 5 recettes enrichies (coordonnées GPS + horaires) | S10-AV2 |

Toutes les recettes, quantités et prix sont **inventés** pour le projet. Les calories pour 100 g sont des valeurs moyennes approximatives.

## Structure d'une recette

| Champ | Type | Obligatoire | Règle | Exemple |
|---|---|---|---|---|
| `id` | entier | oui | ≥ 1, unique | `1` |
| `titre` | texte | oui | 2 à 60 caractères | `"Tarte au sucre"` |
| `commune` | texte | oui | commune romande d'origine de la spécialité, ou de la fiche | `"Payerne"` |
| `prixMoyen` | nombre | oui | coût moyen **par portion** en CHF, entre 0 et 50 | `0.80` |
| `description` | texte | oui | 10 à 200 caractères | |
| `portions` | entier | oui | ≥ 1 | `8` |
| `estVegetarien` | booléen | oui | `true` ou `false` | `true` |
| `tags` | tableau de textes | oui | au moins 1, sans doublon, minuscules sans accent (`petit-budget`) | `["dessert", "four"]` |
| `image` | texte | oui | chemin `images/nom-en-minuscules.jpg` (ou `.png`, `.webp`) | `"images/tarte-au-sucre.jpg"` |
| `ingredients` | tableau d'objets | oui | au moins 1 ligne (voir ci-dessous) | |
| `totalKcal` | entier | oui | total du plat, arrondi | `2691` |
| `kcalParPortion` | entier | oui | total ÷ portions, arrondi | `336` |

Les quatre champs imposés par la fiche S10-AV1 (`id`, `titre`, `commune`, `prixMoyen`) sont obligatoires ; les autres le sont aussi, car l'application en a besoin pour afficher la liste et la fiche.

Une ligne d'ingrédient contient `nom` (texte), `quantiteG` (nombre **strictement** positif : une quantité de 0 est refusée, comme dans le user flow) et `kcalPour100g` (nombre entre 0 et 900).

`additionalProperties: false` interdit toute clé inconnue : une faute de frappe comme `prix` au lieu de `prixMoyen` est signalée tout de suite au lieu de faire planter l'application.

## Données avancées (`data-avance.json`)

Les 5 premières recettes reprennent tous les champs ci-dessus et ajoutent deux sous-objets, en vue d'une future carte des spécialités romandes et d'un planning de repas :

```json
"coordonnees": { "lat": 46.8219, "lng": 6.9383 },
"horaires": {
  "lundi": [],
  "mardi": [],
  "mercredi": [{ "debut": "16:00", "fin": "17:00" }],
  "jeudi": [],
  "vendredi": [],
  "samedi": [],
  "dimanche": [{ "debut": "15:00", "fin": "16:30" }]
}
```

- `coordonnees` : position approximative du centre de la commune (`lat`, `lng` en degrés décimaux). Le schéma refuse une position hors de Suisse romande (latitude 45,8 à 47,6 ; longitude 5,9 à 7,7).
- `horaires` : les 7 jours sont toujours présents ; chaque jour contient une liste de plages `{ "debut", "fin" }` au format `HH:MM`. Pour une recette, une plage indique quand le plat est prévu au menu (exemple de planning de Lucas, qui cuisine le dimanche pour plusieurs jours). Une liste vide veut dire que le plat n'est pas prévu ce jour-là.

Ces deux champs sont facultatifs dans `schema.json` : `data.json` reste valide sans eux, mais s'ils sont présents, leur structure est contrôlée.

## Calcul des calories

Les champs `totalKcal` et `kcalParPortion` suivent les règles du `brief.md` :

- calories d'un ingrédient = quantité (g) ÷ 100 × kcal pour 100 g
- total du plat = somme des lignes, arrondi à l'entier à la fin seulement
- par portion = total non arrondi ÷ portions, arrondi à l'entier

Contrôle : la « Tarte au sucre » donne bien 2 691 kcal au total et 336 kcal par portion, et les valeurs du wireframe se retrouvent (Pâtes au thon 520, Salade de quinoa 410).

## Valider les données

**Dans VS Code (automatique).** Le fichier `.vscode/settings.json` associe `schema.json` à `data.json` et à `data/data-avance.json`. Ouvrez le dossier du dépôt dans VS Code : toute erreur (clé inconnue, mauvais type, champ manquant) est soulignée en rouge, avec le message au survol.

**En ligne.** Collez `schema.json` puis `data.json` dans un validateur JSON Schema (par exemple jsonschemavalidator.net) en choisissant draft-07.

**En ligne de commande** (Node.js installé) :

```bash
npx ajv-cli@5 validate --spec=draft7 -s data/schema.json -d data.json -d data/data-avance.json
```

Résultat attendu : `data.json valid` et `data/data-avance.json valid`.

**Contre-épreuve.** Renommez `prixMoyen` en `prix` dans une fiche, ou mettez `"portions": 0` : la validation doit échouer (« prixMoyen is a required property », « prix was unexpected », « 0 is less than the minimum of 1 »). Annulez ensuite la modification.

### Ce que le schéma ne vérifie pas

JSON Schema (draft-07) ne sait pas comparer les fiches entre elles ni refaire des calculs. Ces points restent à contrôler à la relecture :

- chaque `id` et chaque `titre` sont uniques ;
- `totalKcal` et `kcalParPortion` correspondent bien aux ingrédients ;
- dans les horaires, l'heure de `debut` est avant l'heure de `fin` ;
- les images référencées existent dans le dossier `images/`.
