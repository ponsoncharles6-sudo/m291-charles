// =====================================================
// Ponson Cuisson — script du site (module M291)
// Les écrans sont écrits dans index.html ; ce script
// affiche le bon écran, remplit les listes et calcule
// les calories selon les règles du brief.
// =====================================================

// ---------- Variables ----------

let recettes = [];          // recettes de départ (data.json) + mes recettes
let ingredientsDispo = [];  // liste fixe d'ingrédients { nom, kcalPour100g }
let brouillon = [];         // ingrédients de la recette en cours de création
let ingredientChoisi = null;
let recetteAffichee = null;

const CLE_STOCKAGE = 'ponsonCuisson.mesRecettes';


// ---------- Calculs (brief, section 8) ----------

// Calories d'un ingrédient = quantité (g) ÷ 100 × kcal pour 100 g
function kcalIngredient(ingredient) {
  return ingredient.quantiteG / 100 * ingredient.kcalPour100g;
}

// Total du plat = somme des ingrédients (arrondi seulement à la fin)
function totalPlat(ingredients) {
  let total = 0;
  for (const ingredient of ingredients) {
    total = total + kcalIngredient(ingredient);
  }
  return total;
}

// 2691 -> "2 691"
function formater(nombre) {
  return Math.round(nombre).toLocaleString('fr-FR');
}

// "8 portions", "1 portion"
function portionsTexte(n) {
  return n + (n > 1 ? ' portions' : ' portion');
}

// Minuscules sans accents : "Gruyère" se trouve en tapant "gruyere"
function simplifier(texte) {
  return texte.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Évite que du texte tapé par l'utilisateur soit lu comme du HTML
function proteger(texte) {
  const div = document.createElement('div');
  div.textContent = texte;
  return div.innerHTML;
}


// ---------- Navigation entre les écrans ----------

function afficherEcran(id) {
  for (const ecran of document.querySelectorAll('.ecran')) {
    ecran.hidden = true;
  }
  document.getElementById(id).hidden = false;
  window.scrollTo(0, 0);
}


// ---------- Mes recettes (enregistrées dans le navigateur) ----------

function lireMesRecettes() {
  try {
    return JSON.parse(localStorage.getItem(CLE_STOCKAGE)) || [];
  } catch (erreur) {
    return [];
  }
}

function sauverMesRecettes() {
  const mesRecettes = recettes.filter((r) => r.mienne);
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(mesRecettes));
  } catch (erreur) {
    console.warn("Impossible d'enregistrer dans le navigateur");
  }
}


// ---------- Écran 1 : liste des recettes ----------

function afficherListe() {
  const recherche = simplifier(document.getElementById('recherche').value.trim());
  const vegetarienSeulement = document.getElementById('filtre-vegetarien').checked;
  const liste = document.getElementById('liste-recettes');
  const message = document.getElementById('message-liste');

  const resultats = recettes.filter((recette) => {
    if (vegetarienSeulement && !recette.estVegetarien) return false;
    const texte = (recette.titre + ' ' + (recette.commune || '') + ' ' +
      recette.ingredients.map((i) => i.nom).join(' '));
    return simplifier(texte).includes(recherche);
  });

  liste.innerHTML = '';
  for (const recette of resultats) {
    const infos = recette.mienne
      ? 'Ma recette · ' + portionsTexte(recette.portions)
      : recette.commune + ' · ' + recette.prixMoyen.toFixed(2) + ' CHF / portion';

    const li = document.createElement('li');
    li.className = 'recette';
    li.tabIndex = 0;
    li.innerHTML = `
      <div>
        <p class="titre">${proteger(recette.titre)}</p>
        <p class="kcal"><b>${formater(recette.kcalParPortion)}</b> kcal / portion</p>
        <p class="meta">${proteger(infos)}</p>
      </div>
      <span class="fleche">›</span>`;
    li.addEventListener('click', () => afficherFiche(recette));
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') afficherFiche(recette); });
    liste.appendChild(li);
  }

  document.getElementById('compteur').textContent = resultats.length + ' recette(s)';
  message.hidden = resultats.length > 0;
  message.textContent = recettes.length === 0 ? 'Crée ta première recette' : 'Aucune recette trouvée';
}


// ---------- Écran 2 : création / calcul ----------

function nouvelleRecette() {
  brouillon = [];
  document.getElementById('nom').value = '';
  document.getElementById('portions').value = '';
  document.getElementById('erreur-nom').hidden = true;
  mettreAJourCreation();
  afficherEcran('ecran-creation');
}

function mettreAJourCreation() {
  const portions = Number(document.getElementById('portions').value);
  const portionsValides = Number.isInteger(portions) && portions >= 1;
  const champPortions = document.getElementById('portions');

  // Liste des ingrédients ajoutés
  const liste = document.getElementById('liste-ingredients');
  liste.innerHTML = '';
  brouillon.forEach((ingredient, index) => {
    const li = document.createElement('li');
    li.className = 'ligne';
    li.innerHTML = `
      <span>${proteger(ingredient.nom)}</span>
      <span class="detail">${formater(ingredient.quantiteG)} g · <b>${formater(kcalIngredient(ingredient))}</b> kcal
        <button class="supprimer" type="button" aria-label="Supprimer ${proteger(ingredient.nom)}">×</button></span>`;
    li.querySelector('.supprimer').addEventListener('click', () => {
      brouillon.splice(index, 1);
      mettreAJourCreation();
    });
    liste.appendChild(li);
  });

  // Totaux recalculés à chaque changement
  const total = totalPlat(brouillon);
  document.getElementById('total-plat').textContent = formater(total) + ' kcal';
  document.getElementById('total-portion').textContent =
    portionsValides ? formater(total / portions) + ' kcal' : '—';

  // Cas limites du user flow
  const portionsVides = champPortions.value === '';
  const erreurPortions = !portionsVides && !portionsValides;
  document.getElementById('erreur-portions').hidden = !erreurPortions;
  champPortions.classList.toggle('invalide', erreurPortions);

  document.getElementById('erreur-ingredients').hidden = brouillon.length > 0;
  document.getElementById('btn-enregistrer').disabled = brouillon.length === 0;
}

function enregistrer() {
  const nom = document.getElementById('nom').value.trim();
  const portions = Number(document.getElementById('portions').value);

  document.getElementById('erreur-nom').hidden = nom !== '';
  document.getElementById('nom').classList.toggle('invalide', nom === '');
  const portionsValides = Number.isInteger(portions) && portions >= 1;
  document.getElementById('erreur-portions').hidden = portionsValides;
  document.getElementById('portions').classList.toggle('invalide', !portionsValides);

  if (nom === '' || !portionsValides || brouillon.length === 0) return;

  const total = totalPlat(brouillon);
  const recette = {
    id: Math.max(0, ...recettes.map((r) => r.id)) + 1,
    titre: nom,
    portions: portions,
    ingredients: brouillon,
    totalKcal: Math.round(total),
    kcalParPortion: Math.round(total / portions),
    mienne: true
  };

  recettes.unshift(recette); // la nouvelle recette apparaît en tête de liste
  sauverMesRecettes();
  afficherListe();
  afficherFiche(recette);
}


// ---------- Écran 2b : sélecteur d'ingrédients ----------

function ouvrirSelecteur() {
  document.getElementById('recherche-ingredient').value = '';
  document.getElementById('etape-choix').hidden = false;
  document.getElementById('etape-quantite').hidden = true;
  afficherChoix();
  afficherEcran('ecran-ingredient');
  document.getElementById('recherche-ingredient').focus();
}

function afficherChoix() {
  const recherche = simplifier(document.getElementById('recherche-ingredient').value.trim());
  const liste = document.getElementById('liste-choix');
  const trouves = ingredientsDispo.filter((i) => simplifier(i.nom).includes(recherche));

  liste.innerHTML = '';
  for (const ingredient of trouves) {
    const li = document.createElement('li');
    li.className = 'ligne cliquable';
    li.tabIndex = 0;
    li.innerHTML = `<span>${proteger(ingredient.nom)}</span>
      <span class="detail">${formater(ingredient.kcalPour100g)} kcal / 100 g</span>`;
    li.addEventListener('click', () => choisirIngredient(ingredient));
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') choisirIngredient(ingredient); });
    liste.appendChild(li);
  }
  document.getElementById('message-choix').hidden = trouves.length > 0;
}

function choisirIngredient(ingredient) {
  ingredientChoisi = ingredient;
  document.getElementById('ingredient-choisi').textContent = ingredient.nom;
  document.getElementById('ingredient-kcal').textContent = '· ' + ingredient.kcalPour100g + ' kcal / 100 g';
  document.getElementById('quantite').value = '';
  document.getElementById('erreur-quantite').hidden = true;
  document.getElementById('apercu-kcal').textContent = '';
  document.getElementById('etape-choix').hidden = true;
  document.getElementById('etape-quantite').hidden = false;
  document.getElementById('quantite').focus();
}

function apercuQuantite() {
  const quantite = Number(document.getElementById('quantite').value);
  document.getElementById('erreur-quantite').hidden = true;
  document.getElementById('apercu-kcal').textContent = quantite > 0
    ? '= ' + formater(kcalIngredient({ quantiteG: quantite, kcalPour100g: ingredientChoisi.kcalPour100g })) + ' kcal'
    : '';
}

function validerQuantite() {
  const quantite = Number(document.getElementById('quantite').value);
  if (!(quantite > 0)) {
    document.getElementById('erreur-quantite').hidden = false;
    return;
  }
  brouillon.push({
    nom: ingredientChoisi.nom,
    quantiteG: quantite,
    kcalPour100g: ingredientChoisi.kcalPour100g
  });
  mettreAJourCreation();
  afficherEcran('ecran-creation');
}

function retourSelecteur() {
  // à l'étape « quantité », la flèche revient au choix de l'ingrédient
  if (!document.getElementById('etape-quantite').hidden) {
    document.getElementById('etape-quantite').hidden = true;
    document.getElementById('etape-choix').hidden = false;
  } else {
    afficherEcran('ecran-creation');
  }
}


// ---------- Écran 3 : fiche recette ----------

function afficherFiche(recette) {
  recetteAffichee = recette;
  document.getElementById('fiche-titre').textContent = recette.titre;
  document.getElementById('fiche-portion').textContent = formater(recette.kcalParPortion);
  document.getElementById('fiche-total').textContent =
    'Total du plat : ' + formater(recette.totalKcal) + ' kcal · ' + portionsTexte(recette.portions);
  document.getElementById('fiche-description').textContent = recette.description || '';

  const infos = [];
  if (recette.commune) infos.push(recette.commune);
  if (recette.prixMoyen !== undefined) infos.push(recette.prixMoyen.toFixed(2) + ' CHF / portion');
  if (recette.estVegetarien) infos.push('Végétarien');
  document.getElementById('fiche-infos').textContent = infos.join(' · ');

  const liste = document.getElementById('fiche-ingredients');
  liste.innerHTML = '';
  for (const ingredient of recette.ingredients) {
    const li = document.createElement('li');
    li.className = 'ligne';
    li.innerHTML = `<span>${proteger(ingredient.nom)}</span><span class="detail">${formater(ingredient.quantiteG)} g</span>`;
    liste.appendChild(li);
  }

  document.getElementById('btn-supprimer').hidden = !recette.mienne;
  afficherEcran('ecran-fiche');
}

function supprimerRecette() {
  if (!confirm('Supprimer cette recette ?')) return;
  recettes = recettes.filter((r) => r !== recetteAffichee);
  sauverMesRecettes();
  afficherListe();
  afficherEcran('ecran-liste');
}


// ---------- Écran 4 : partage ----------

function texteFiche(recette) {
  let texte = recette.titre + ' — Ponson Cuisson\n';
  texte += formater(recette.kcalParPortion) + ' kcal par portion\n';
  texte += 'Total : ' + formater(recette.totalKcal) + ' kcal · ' + portionsTexte(recette.portions) + '\n\n';
  texte += 'Ingrédients :\n';
  for (const ingredient of recette.ingredients) {
    texte += '- ' + ingredient.nom + ' : ' + formater(ingredient.quantiteG) + ' g\n';
  }
  return texte;
}

function afficherPartage() {
  const r = recetteAffichee;
  document.getElementById('apercu-titre').textContent = r.titre;
  document.getElementById('apercu-portion').textContent = formater(r.kcalParPortion) + ' kcal';
  document.getElementById('apercu-total').textContent =
    'Total : ' + formater(r.totalKcal) + ' kcal · ' + portionsTexte(r.portions);
  document.getElementById('lien-email').href = 'mailto:?subject=' + encodeURIComponent(r.titre) +
    '&body=' + encodeURIComponent(texteFiche(r));
  document.getElementById('confirmation').hidden = true;
  afficherEcran('ecran-partage');
}

function confirmer(message) {
  const zone = document.getElementById('confirmation');
  zone.textContent = '✓ ' + message;
  zone.hidden = false;
}

async function copierTexte() {
  try {
    await navigator.clipboard.writeText(texteFiche(recetteAffichee));
    confirmer('Texte copié');
  } catch (erreur) {
    confirmer('Copie impossible sur cet appareil');
  }
}

async function partagerMessagerie() {
  if (navigator.share) {
    try {
      await navigator.share({ title: recetteAffichee.titre, text: texteFiche(recetteAffichee) });
      confirmer('Fiche partagée');
    } catch (erreur) {
      // l'utilisateur a fermé le menu de partage
    }
  } else {
    // sur ordinateur, pas de menu de partage : on copie le texte
    await copierTexte();
  }
}


// ---------- Branchement des boutons ----------

document.getElementById('recherche').addEventListener('input', afficherListe);
document.getElementById('filtre-vegetarien').addEventListener('change', afficherListe);
document.getElementById('btn-nouvelle').addEventListener('click', nouvelleRecette);

document.getElementById('btn-annuler').addEventListener('click', () => afficherEcran('ecran-liste'));
document.getElementById('portions').addEventListener('input', mettreAJourCreation);
document.getElementById('btn-ajouter').addEventListener('click', ouvrirSelecteur);
document.getElementById('btn-enregistrer').addEventListener('click', enregistrer);

document.getElementById('btn-retour-ingredient').addEventListener('click', retourSelecteur);
document.getElementById('recherche-ingredient').addEventListener('input', afficherChoix);
document.getElementById('quantite').addEventListener('input', apercuQuantite);
document.getElementById('quantite').addEventListener('keydown', (e) => { if (e.key === 'Enter') validerQuantite(); });
document.getElementById('btn-valider').addEventListener('click', validerQuantite);

document.getElementById('btn-partager').addEventListener('click', afficherPartage);
document.getElementById('btn-supprimer').addEventListener('click', supprimerRecette);
document.getElementById('btn-retour-fiche').addEventListener('click', () => afficherEcran('ecran-fiche'));
document.getElementById('btn-messagerie').addEventListener('click', partagerMessagerie);
document.getElementById('btn-copier').addEventListener('click', copierTexte);
document.getElementById('lien-email').addEventListener('click', () => confirmer('Fiche partagée'));

for (const bouton of document.querySelectorAll('.btn-liste')) {
  bouton.addEventListener('click', () => afficherEcran('ecran-liste'));
}


// ---------- Démarrage ----------

async function demarrer() {
  let recettesDepart = RECETTES; // copie dans data.js (marche avec un double-clic)

  // Si le site est ouvert avec un serveur (Live Server, GitHub Pages), on lit data.json
  if (location.protocol !== 'file:') {
    try {
      const reponse = await fetch('data.json');
      recettesDepart = await reponse.json();
    } catch (erreur) {
      console.warn('data.json illisible, on utilise data.js');
    }
  }

  recettes = [...lireMesRecettes(), ...recettesDepart];

  // Liste fixe des ingrédients, construite à partir des recettes
  for (const recette of recettes) {
    for (const ingredient of recette.ingredients) {
      if (!ingredientsDispo.some((i) => i.nom === ingredient.nom)) {
        ingredientsDispo.push({ nom: ingredient.nom, kcalPour100g: ingredient.kcalPour100g });
      }
    }
  }
  ingredientsDispo.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));

  afficherListe();
}

demarrer();
