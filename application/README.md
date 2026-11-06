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
| `js/donnees.js` | Copie de `data.json`, utilisée quand on ouvre `index.html` par un double-clic |

Les 4 écrans du user flow sont dans la même page et changent selon l'adresse : `#/` (liste), `#/nouvelle` (création et sélecteur d'ingrédients), `#/recette/1` (fiche) et `#/recette/1/partager` (partage).

Les recettes de départ viennent de `data.json`. Les recettes créées sont enregistrées dans le navigateur (`localStorage`), sans compte ni serveur, comme demandé dans le brief.

### Ouvrir le site

- **Double-clic sur `index.html`** : le site s'ouvre dans le navigateur. Les recettes viennent alors de `js/donnees.js`, car le navigateur bloque la lecture de `data.json` sur un fichier local. **Si tu modifies `data.json`, recopie son contenu dans `js/donnees.js`** (après `window.RECETTES_DEPART =`).
- **VS Code** : extension « Live Server », puis clic droit sur `index.html` → « Open with Live Server ». Le site lit directement `data.json`.
- **En ligne** : GitHub → Settings → Pages → « Deploy from a branch », branche `main`, dossier `/ (root)`. Le site est alors publié à l'adresse `https://ponsoncharles6-sudo.github.io/m291-charles/` et lit lui aussi `data.json`.
