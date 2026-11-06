# Application

Dossier principal de l'application.

- `design/` : maquettes, éléments graphiques et ressources de design

## Le site

Le code du site Ponson Cuisson est à la racine du dépôt, à côté de `data.json` :

| Fichier | Rôle |
|---|---|
| `index.html` | Page unique de l'application |
| `css/style.css` | Styles, d'après la proposition 2 « Énergie » (voir `design/critique.md`) |
| `js/app.js` | Écrans, calculs des calories, recherche, partage et enregistrement |

Les 4 écrans du user flow sont dans la même page et changent selon l'adresse : `#/` (liste), `#/nouvelle` (création et sélecteur d'ingrédients), `#/recette/1` (fiche) et `#/recette/1/partager` (partage).

Les recettes de départ viennent de `data.json`. Les recettes créées sont enregistrées dans le navigateur (`localStorage`), sans compte ni serveur, comme demandé dans le brief.

### Ouvrir le site

Le site lit `data.json` avec `fetch`, ce que le navigateur bloque quand on ouvre `index.html` par un double-clic. Il faut donc passer par un petit serveur :

- **VS Code** : extension « Live Server », puis clic droit sur `index.html` → « Open with Live Server » ;
- **En ligne** : GitHub → Settings → Pages → « Deploy from a branch », branche `main`, dossier `/ (root)`. Le site est alors publié à l'adresse `https://ponsoncharles6-sudo.github.io/m291-charles/`.
