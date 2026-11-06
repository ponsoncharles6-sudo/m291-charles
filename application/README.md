# Application

Dossier principal de l'application.

- `design/` : maquettes, éléments graphiques et ressources de design

## Le site

Le site Ponson Cuisson est à la racine du dépôt, en HTML, CSS et JavaScript classiques :

| Fichier | Rôle |
|---|---|
| `index.html` | Les 4 écrans du user flow (liste, création + sélecteur d'ingrédients, fiche, partage), chacun dans une `<section>` |
| `style.css` | Le style « Énergie » (proposition 2, voir `design/critique.md`) |
| `script.js` | Affiche le bon écran, remplit les listes, calcule les calories, partage et enregistre |
| `data.js` | Copie de `data.json`, pour que le site marche avec un double-clic |

**Ouvrir le site :** double-clic sur `index.html`. Les recettes créées sont enregistrées dans le navigateur (`localStorage`), sans compte ni serveur.

Avec un serveur (« Live Server » dans VS Code, ou GitHub Pages), le site lit directement `data.json`. En double-clic, le navigateur bloque cette lecture, il utilise donc `data.js`. **Si tu modifies `data.json`, recopie son contenu dans `data.js`** (après `const RECETTES =`).
