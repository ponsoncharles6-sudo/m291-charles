# Application

Dossier principal de l'application.

- `design/` : maquettes, éléments graphiques et ressources de design

## Le site

Le site Ponson Cuisson est à la racine du dépôt, en HTML, CSS et JavaScript classiques :

| Fichier | Rôle |
|---|---|
| `index.html` | Les 4 écrans du user flow (liste, création + sélecteur d'ingrédients, fiche, partage), chacun dans une `<section>` |
| `style.css` | Le style « Énergie » (proposition 2, voir `design/critique.md`) |
| `js/app.js` | Charge `data.json` avec `fetch`, gère les 4 états de la liste, affiche le bon écran, calcule les calories, partage et enregistre |

**Ouvrir le site :** dans VS Code, clic droit sur `index.html` → « Open with Live Server » (l'adresse doit commencer par `http://127.0.0.1`), ou ouvrir la version en ligne sur GitHub Pages. En double-clic (`file://`), le navigateur bloque `fetch` : le site affiche alors l'état d'erreur avec ce conseil. Les recettes créées sont enregistrées dans le navigateur (`localStorage`), sans compte ni serveur.

### Les 4 états de la liste (fiche e3-3)

`js/app.js` charge `data.json` avec `fetch()` et injecte les cartes (`<article class="carte">`) dans `<section id="liste-cartes">` :

| État | Quand | Ce qui s'affiche |
|---|---|---|
| Chargement | pendant la requête | « Chargement des recettes en cours... » |
| Succès | `data.json` contient des recettes | une carte par recette (titre, kcal par portion, commune, prix, badge végétarien) |
| Vide | `data.json` vaut `[]` et aucune recette créée | « Aucune recette enregistrée pour le moment. » |
| Erreur | fichier manquant, coupure réseau, JSON invalide ou ouverture en double-clic | alerte rouge avec conseil et bouton « Réessayer » |

Pour tester : remplacer temporairement `data.json` par `[]` (vide), changer le chemin en `"./data-inexistant.json"` dans `js/app.js` (erreur), ou choisir « Slow 3G » dans l'onglet Réseau des DevTools (chargement). Remettre ensuite les fichiers normaux.
