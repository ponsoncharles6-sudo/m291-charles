# Ponson Cuisson

Application web qui calcule les calories d'un plat à partir de ses ingrédients (total du plat et par portion), puis permet de partager la fiche de la recette. Projet du module ICT 291 au CPNV.

**Voir le site en ligne :** https://ponsoncharles6-sudo.github.io/m291-charles/

Sur ordinateur, on peut aussi télécharger le dépôt et ouvrir `index.html` par un double-clic.

## Organisation du dépôt

| Emplacement | Contenu |
|---|---|
| `index.html`, `style.css`, `script.js` | Le site (HTML, CSS et JavaScript classiques) |
| `data.json` | Base de 32 recettes (fiche e3-2) |
| `data.js` | Copie de `data.json`, pour que le site marche avec un double-clic |
| `data/` | Schéma de validation (S10-AV1), données avancées (S10-AV2) et documentation |
| `brief.md` | Spécification officielle de l'application |
| `application/` | Conception : pitch, persona, user flow, wireframe, propositions de design et critique ; mode d'emploi du site |
| `exercices/` | Exercices du module faits avant le projet (compteur, bug, prédictions, essai Markdown) |

## Fonctionnement

- **Liste des recettes** avec recherche et filtre « végétarien ».
- **Nouvelle recette** : choix des ingrédients et des quantités, calcul en direct du total du plat et des calories par portion.
- **Fiche recette** et **partage** (messagerie, e-mail ou copie du texte).
- Les recettes créées sont enregistrées dans le navigateur, sans compte ni serveur.

Plus de détails : `application/README.md` (le site) et `data/README.md` (les données).
