/*
 * Ponson Cuisson — application (module M291)
 * Spécification : brief.md · Parcours : application/design/user-flow.md
 *
 * Écrans (adresse dans la barre du navigateur) :
 *   #/                       1. Liste des recettes (recherche, filtres, tri)
 *   #/nouvelle               2. Création / calcul (+ 2b. sélecteur d'ingrédients)
 *   #/recette/ID             3. Fiche recette
 *   #/recette/ID/partager    4. Partage
 *
 * Données : data.json (recettes de départ) + mes recettes enregistrées
 * dans le navigateur (localStorage), sans compte ni serveur.
 */
'use strict';

const CLE_STOCKAGE = 'ponsonCuisson.mesRecettes';
const QUANTITE_MAX_G = 10000;
const NB_PUCES_TAGS = 5;

const etat = {
  recettesDepart: [],
  mesRecettes: [],
  ingredients: [],          // liste fixe : { nom, kcalPour100g }
  erreurChargement: null,
  stockageOk: true,

  // écran 1
  recherche: '',
  filtre: 'tout',           // 'tout' | 'vegetarien' | 'mes' | 'tag:xxx'
  tri: 'defaut',            // 'defaut' | 'kcal' | 'prix' | 'titre'

  // écran 2
  brouillon: null,          // { titre, portions, ingredients: [...] }
  tentativeEnregistrer: false,
  selecteur: null,          // null = fermé, sinon { recherche, choisi, quantite, index, erreur }

  // écran 4
  confirmation: '',
};

const app = document.getElementById('app');

/* ==========================================================
   Calculs (règles du brief, section 8)
   ========================================================== */

function kcalLigne(ligne) {
  return (ligne.quantiteG / 100) * ligne.kcalPour100g;
}

/** Total non arrondi : l'arrondi n'est fait qu'à l'affichage. */
function totalBrut(lignes) {
  return lignes.reduce((somme, ligne) => somme + kcalLigne(ligne), 0);
}

function calculer(lignes, portions) {
  const total = totalBrut(lignes);
  return {
    totalKcal: Math.round(total),
    kcalParPortion: portions >= 1 ? Math.round(total / portions) : null,
  };
}

/* ==========================================================
   Outils
   ========================================================== */

/** 2691 -> "2 691" (espace insécable comme sur les maquettes). */
function nombre(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function prix(n) {
  return n.toFixed(2) + ' CHF';
}

/** Échappe le texte avant de l'insérer dans du HTML. */
function esc(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/** Minuscules sans accents, pour la recherche. */
function normaliser(texte) {
  return String(texte || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')
    .trim();
}

function lireEntier(valeur) {
  return /^\s*\d+\s*$/.test(valeur) ? parseInt(valeur, 10) : NaN;
}

function lireNombre(valeur) {
  const texte = String(valeur).trim().replace(',', '.');
  return /^\d+(\.\d+)?$/.test(texte) ? parseFloat(texte) : NaN;
}

/* ==========================================================
   Données
   ========================================================== */

function chargerMesRecettes() {
  try {
    const texte = localStorage.getItem(CLE_STOCKAGE);
    const donnees = texte ? JSON.parse(texte) : [];
    return Array.isArray(donnees) ? donnees : [];
  } catch (e) {
    etat.stockageOk = false;
    return [];
  }
}

function sauverMesRecettes() {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(etat.mesRecettes));
    etat.stockageOk = true;
  } catch (e) {
    etat.stockageOk = false;
  }
}

function toutesRecettes() {
  return [...etat.mesRecettes, ...etat.recettesDepart];
}

function trouverRecette(id) {
  return toutesRecettes().find((r) => r.id === id);
}

function construireListeIngredients() {
  const parNom = new Map();
  for (const recette of toutesRecettes()) {
    for (const ligne of recette.ingredients || []) {
      if (!parNom.has(ligne.nom)) parNom.set(ligne.nom, ligne.kcalPour100g);
    }
  }
  etat.ingredients = [...parNom]
    .map(([nom, kcalPour100g]) => ({ nom, kcalPour100g }))
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
}

function tagsFrequents() {
  const compte = new Map();
  for (const recette of etat.recettesDepart) {
    for (const tag of recette.tags || []) compte.set(tag, (compte.get(tag) || 0) + 1);
  }
  return [...compte]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr'))
    .slice(0, NB_PUCES_TAGS)
    .map(([tag]) => tag);
}

function recettesFiltrees() {
  const q = normaliser(etat.recherche);
  let liste = toutesRecettes().filter((r) => {
    if (etat.filtre === 'vegetarien' && !r.estVegetarien) return false;
    if (etat.filtre === 'mes' && !r.mienne) return false;
    if (etat.filtre.startsWith('tag:') && !(r.tags || []).includes(etat.filtre.slice(4))) return false;
    if (!q) return true;
    const texte = normaliser([
      r.titre, r.commune, ...(r.tags || []), ...(r.ingredients || []).map((i) => i.nom),
    ].join(' '));
    return texte.includes(q);
  });

  if (etat.tri === 'kcal') liste = [...liste].sort((a, b) => a.kcalParPortion - b.kcalParPortion);
  if (etat.tri === 'prix') liste = [...liste].sort((a, b) => (a.prixMoyen ?? Infinity) - (b.prixMoyen ?? Infinity));
  if (etat.tri === 'titre') liste = [...liste].sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));
  return liste;
}

/* ==========================================================
   Navigation
   ========================================================== */

function route() {
  return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
}

function aller(chemin, remplacer) {
  const cible = '#/' + chemin;
  if (remplacer) location.replace(cible);
  else location.hash = cible;
}

function afficher() {
  const [page, id, action] = route();

  if (page === 'nouvelle') {
    if (!etat.brouillon) etat.brouillon = { titre: '', portions: '', ingredients: [] };
    app.innerHTML = etat.selecteur ? vueSelecteur() : vueCreation();
    if (etat.selecteur) majSelecteur(); else majCreation();
  } else if (page === 'recette' && id) {
    const recette = trouverRecette(Number(id));
    if (!recette) app.innerHTML = vueIntrouvable();
    else if (action === 'partager') app.innerHTML = vuePartage(recette);
    else app.innerHTML = vueFiche(recette);
  } else {
    etat.selecteur = null;
    app.innerHTML = vueListe();
    majListe();
  }

  window.scrollTo(0, 0);
  const aFocaliser = app.querySelector('[data-focus]') || app.querySelector('h1');
  if (aFocaliser) aFocaliser.focus({ preventScroll: true });
}

function entete(titre, lienRetour, options = {}) {
  const retour = lienRetour
    ? (lienRetour.startsWith('#')
      ? `<a class="retour" href="${lienRetour}" aria-label="${esc(options.labelRetour || 'Retour')}">←</a>`
      : `<button type="button" class="retour" data-action="${lienRetour}" aria-label="${esc(options.labelRetour || 'Retour')}">←</button>`)
    : '';
  const classe = options.nomRecette ? ' class="nom-recette"' : '';
  return `<header class="entete">${retour}<h1 tabindex="-1"${classe}>${esc(titre)}</h1></header>`;
}

/* ==========================================================
   Écran 1 — Liste des recettes
   ========================================================== */

function vueListe() {
  const puces = [
    ['tout', 'Tout'],
    ['vegetarien', 'Végétarien'],
    ['mes', 'Mes recettes'],
    ...tagsFrequents().map((tag) => ['tag:' + tag, tag.replace(/-/g, ' ')]),
  ];
  const tris = [
    ['defaut', 'Par défaut'],
    ['kcal', 'Moins de kcal'],
    ['prix', 'Moins cher'],
    ['titre', 'De A à Z'],
  ];

  return `
    ${entete('Mes recettes')}
    <main class="contenu">
      ${etat.erreurChargement ? blocErreurChargement() : ''}
      ${etat.stockageOk ? '' : `<div class="alerte" role="alert"><strong>Stockage indisponible.</strong>
        <p>Ton navigateur bloque l'enregistrement local : tes nouvelles recettes seront perdues en fermant la page.</p></div>`}
      <div>
        <label class="sr-only" for="recherche">Rechercher une recette</label>
        <input id="recherche" class="champ" type="search" data-champ="recherche" autocomplete="off"
          placeholder="Rechercher une recette…" value="${esc(etat.recherche)}">
      </div>
      <div class="puces" role="group" aria-label="Filtres">
        ${puces.map(([valeur, libelle]) => `
          <button type="button" class="puce" data-action="filtre" data-valeur="${esc(valeur)}"
            aria-pressed="${etat.filtre === valeur}">${esc(libelle)}</button>`).join('')}
      </div>
      <div class="ligne-tri">
        <span id="compteur"></span>
        <label>Trier
          <select class="select" data-champ="tri">
            ${tris.map(([valeur, libelle]) => `
              <option value="${valeur}"${etat.tri === valeur ? ' selected' : ''}>${libelle}</option>`).join('')}
          </select>
        </label>
      </div>
      <ul id="liste" class="liste"></ul>
    </main>
    <footer class="actions">
      <button type="button" class="bouton" data-action="nouvelle">+ Nouvelle recette</button>
    </footer>`;
}

function blocErreurChargement() {
  return `
    <div class="alerte" role="alert">
      <strong>Impossible de charger les recettes.</strong>
      <p>Vérifie que data.json et js/donnees.js sont bien présents à côté de index.html et que leur syntaxe est valide.</p>
    </div>`;
}

function majListe() {
  const liste = document.getElementById('liste');
  const compteur = document.getElementById('compteur');
  if (!liste) return;

  const total = toutesRecettes().length;
  const recettes = recettesFiltrees();
  compteur.textContent = `${recettes.length} recette${recettes.length > 1 ? 's' : ''}`;

  if (total === 0) {
    liste.innerHTML = `<li class="vide"><strong>Crée ta première recette</strong>
      Appuie sur « Nouvelle recette » pour calculer les calories d'un plat.</li>`;
    return;
  }
  if (recettes.length === 0) {
    liste.innerHTML = `<li class="vide"><strong>Aucune recette trouvée</strong>
      Essaie un autre mot ou retire le filtre.</li>`;
    return;
  }

  liste.innerHTML = recettes.map((r) => {
    const meta = r.mienne
      ? `Ma recette · ${r.portions} portion${r.portions > 1 ? 's' : ''}`
      : [r.commune, typeof r.prixMoyen === 'number' ? prix(r.prixMoyen) + ' / portion' : '']
        .filter(Boolean).join(' · ');
    return `
      <li>
        <a class="carte-recette" href="#/recette/${r.id}">
          <span>
            <span class="titre-recette">${esc(r.titre)}</span>
            <span class="kcal"><b>${nombre(r.kcalParPortion)}</b> kcal / portion</span>
            ${meta ? `<span class="meta">${esc(meta)}</span>` : ''}
          </span>
          <span class="chevron" aria-hidden="true">›</span>
        </a>
      </li>`;
  }).join('');
}

/* ==========================================================
   Écran 2 — Création / calcul
   ========================================================== */

function vueCreation() {
  const b = etat.brouillon;
  return `
    ${entete('Nouvelle recette', 'annuler', { labelRetour: 'Annuler et revenir à la liste' })}
    <main class="contenu">
      <div class="groupe">
        <label for="titre">Nom</label>
        <input id="titre" class="champ" data-champ="titre" maxlength="60" autocomplete="off"
          placeholder="Ex. Tarte au sucre" value="${esc(b.titre)}" aria-describedby="erreur-titre">
        <p class="erreur" id="erreur-titre" hidden></p>
      </div>
      <div class="groupe">
        <label for="portions">Portions</label>
        <input id="portions" class="champ champ-court" data-champ="portions" inputmode="numeric"
          autocomplete="off" placeholder="1" value="${esc(b.portions)}" aria-describedby="erreur-portions">
        <p class="erreur" id="erreur-portions" hidden></p>
      </div>

      <h2 class="sous-titre">Ingrédients</h2>
      <ul class="liste-ingredients">
        ${b.ingredients.map((ligne, i) => `
          <li>
            <button type="button" class="ligne" data-action="editer-ligne" data-index="${i}"
              aria-label="Modifier ${esc(ligne.nom)}, ${nombre(ligne.quantiteG)} grammes">
              <span>${esc(ligne.nom)}</span>
              <span class="detail">${nombre(ligne.quantiteG)} g · <b>${nombre(kcalLigne(ligne))}</b> kcal</span>
            </button>
            <button type="button" class="supprimer-ligne" data-action="supprimer-ligne" data-index="${i}"
              aria-label="Supprimer ${esc(ligne.nom)}">×</button>
          </li>`).join('')}
      </ul>
      <button type="button" class="bouton-pointille" data-action="ouvrir-selecteur">+ Ajouter un ingrédient</button>

      <div id="totaux" class="totaux" aria-live="polite"></div>
      <p class="erreur" id="erreur-enregistrer" hidden></p>
    </main>
    <footer class="actions">
      <button type="button" class="bouton" id="bouton-enregistrer" data-action="enregistrer">Enregistrer</button>
    </footer>`;
}

/** Met à jour les totaux et les messages sans redessiner l'écran (le champ garde le focus). */
function majCreation() {
  const b = etat.brouillon;
  const totaux = document.getElementById('totaux');
  if (!b || !totaux) return;

  const portions = lireEntier(b.portions);
  const portionsOk = portions >= 1;
  const calcul = calculer(b.ingredients, portionsOk ? portions : 0);

  totaux.innerHTML = `
    <div class="petit-total"><span>Total du plat</span><strong>${nombre(calcul.totalKcal)} kcal</strong></div>
    <div class="grand-total"><span>Par portion</span>
      <strong>${calcul.kcalParPortion === null ? '—' : nombre(calcul.kcalParPortion) + ' kcal'}</strong></div>`;

  // Portions vides ou à 0 : message sous le champ (cas limites du user flow)
  const champPortions = document.getElementById('portions');
  const erreurPortions = document.getElementById('erreur-portions');
  let messagePortions = '';
  if (b.portions.trim() !== '' && !portionsOk) messagePortions = 'Indique un nombre entier de portions, au moins 1.';
  else if (b.portions.trim() === '' && (etat.tentativeEnregistrer || b.ingredients.length > 0)) {
    messagePortions = 'Indique le nombre de portions pour calculer « Par portion ».';
  }
  afficherErreur(champPortions, erreurPortions, messagePortions);

  const champTitre = document.getElementById('titre');
  const erreurTitre = document.getElementById('erreur-titre');
  afficherErreur(champTitre, erreurTitre,
    etat.tentativeEnregistrer && !b.titre.trim() ? 'Donne un nom à la recette.' : '');

  // Aucun ingrédient : « Enregistrer » désactivé + message
  const bouton = document.getElementById('bouton-enregistrer');
  const erreur = document.getElementById('erreur-enregistrer');
  bouton.disabled = b.ingredients.length === 0;
  erreur.hidden = b.ingredients.length > 0;
  erreur.textContent = b.ingredients.length === 0 ? 'Ajoute au moins un ingrédient.' : '';
}

function afficherErreur(champ, zone, message) {
  if (!champ || !zone) return;
  zone.textContent = message;
  zone.hidden = !message;
  champ.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function enregistrer() {
  const b = etat.brouillon;
  etat.tentativeEnregistrer = true;
  const portions = lireEntier(b.portions);

  if (!b.titre.trim() || !(portions >= 1) || b.ingredients.length === 0) {
    majCreation();
    const premierChamp = !b.titre.trim() ? 'titre' : 'portions';
    document.getElementById(premierChamp)?.focus();
    return;
  }

  const calcul = calculer(b.ingredients, portions);
  const id = Math.max(0, ...toutesRecettes().map((r) => r.id)) + 1;
  const recette = {
    id,
    titre: b.titre.trim(),
    portions,
    ingredients: b.ingredients.map((l) => ({ ...l })),
    totalKcal: calcul.totalKcal,
    kcalParPortion: calcul.kcalParPortion,
    mienne: true,
  };

  etat.mesRecettes.unshift(recette); // en tête de liste (user flow, étape 13)
  sauverMesRecettes();
  etat.brouillon = null;
  etat.tentativeEnregistrer = false;
  aller('recette/' + id, true);
}

/* ==========================================================
   Écran 2b — Sélecteur d'ingrédients
   ========================================================== */

function ouvrirSelecteur(index) {
  const ligne = index === null ? null : etat.brouillon.ingredients[index];
  etat.selecteur = {
    recherche: '',
    choisi: ligne ? { nom: ligne.nom, kcalPour100g: ligne.kcalPour100g } : null,
    quantite: ligne ? String(ligne.quantiteG) : '',
    index,
    erreur: '',
  };
  afficher();
}

function fermerSelecteur() {
  etat.selecteur = null;
  afficher();
}

function vueSelecteur() {
  const s = etat.selecteur;

  if (!s.choisi) {
    return `
      ${entete('Ajouter un ingrédient', 'fermer-selecteur', { labelRetour: 'Revenir à la recette' })}
      <main class="contenu">
        <div>
          <label class="sr-only" for="recherche-ingredient">Rechercher un ingrédient</label>
          <input id="recherche-ingredient" class="champ" type="search" data-champ="recherche-ingredient"
            autocomplete="off" placeholder="Rechercher un ingrédient…" value="${esc(s.recherche)}" data-focus>
        </div>
        <ul id="liste-ingredients" class="liste"></ul>
      </main>`;
  }

  const edition = s.index !== null;
  return `
    ${entete(edition ? 'Modifier la quantité' : 'Quantité',
      edition ? 'fermer-selecteur' : 'changer-ingredient',
      { labelRetour: edition ? 'Revenir à la recette' : 'Choisir un autre ingrédient' })}
    <main class="contenu">
      <p class="carte"><strong>${esc(s.choisi.nom)}</strong>
        <span class="gris"> · ${nombre(s.choisi.kcalPour100g)} kcal / 100 g</span></p>
      <div class="groupe">
        <label for="quantite">Quantité (g)</label>
        <input id="quantite" class="champ champ-quantite" data-champ="quantite" inputmode="decimal"
          autocomplete="off" placeholder="0" value="${esc(s.quantite)}" aria-describedby="erreur-quantite" data-focus>
        <p class="erreur" id="erreur-quantite" hidden></p>
      </div>
      <p id="apercu-kcal" class="apercu-kcal" aria-live="polite"></p>
    </main>
    <footer class="actions">
      <button type="button" class="bouton" data-action="valider-quantite">Valider</button>
      ${edition ? '<button type="button" class="bouton-contour" data-action="supprimer-depuis-selecteur">Supprimer l\'ingrédient</button>' : ''}
    </footer>`;
}

function majSelecteur() {
  const s = etat.selecteur;
  if (!s) return;

  if (!s.choisi) {
    const liste = document.getElementById('liste-ingredients');
    const q = normaliser(s.recherche);
    const trouves = etat.ingredients.filter((i) => normaliser(i.nom).includes(q));
    liste.innerHTML = trouves.length === 0
      ? '<li class="vide"><strong>Aucun ingrédient trouvé</strong>Essaie un autre mot.</li>'
      : trouves.map((i) => `
          <li><button type="button" class="choix-ingredient" data-action="choisir-ingredient" data-nom="${esc(i.nom)}">
            <span>${esc(i.nom)}</span><span>${nombre(i.kcalPour100g)} kcal / 100 g</span>
          </button></li>`).join('');
    return;
  }

  const quantite = lireNombre(s.quantite);
  const apercu = document.getElementById('apercu-kcal');
  apercu.textContent = quantite > 0
    ? '= ' + nombre(kcalLigne({ quantiteG: quantite, kcalPour100g: s.choisi.kcalPour100g })) + ' kcal'
    : '';
  afficherErreur(document.getElementById('quantite'), document.getElementById('erreur-quantite'), s.erreur);
}

function validerQuantite() {
  const s = etat.selecteur;
  const quantite = lireNombre(s.quantite);

  if (!(quantite > 0)) s.erreur = 'Indique une quantité en grammes, plus grande que 0.';
  else if (quantite > QUANTITE_MAX_G) s.erreur = `Quantité trop grande (maximum ${nombre(QUANTITE_MAX_G)} g).`;
  else s.erreur = '';

  if (s.erreur) {
    majSelecteur();
    document.getElementById('quantite').focus();
    return;
  }

  const ligne = { nom: s.choisi.nom, quantiteG: quantite, kcalPour100g: s.choisi.kcalPour100g };
  if (s.index === null) etat.brouillon.ingredients.push(ligne);
  else etat.brouillon.ingredients[s.index] = ligne;
  fermerSelecteur();
}

/* ==========================================================
   Écran 3 — Fiche recette
   ========================================================== */

function vueFiche(r) {
  const infos = [];
  if (r.commune) infos.push(`<span class="info">${esc(r.commune)}</span>`);
  if (typeof r.prixMoyen === 'number') infos.push(`<span class="info">${prix(r.prixMoyen)} / portion</span>`);
  if (r.estVegetarien) infos.push('<span class="info vert">Végétarien</span>');
  for (const tag of r.tags || []) infos.push(`<span class="info">${esc(tag.replace(/-/g, ' '))}</span>`);

  return `
    ${entete(r.titre, '#/', { nomRecette: true, labelRetour: 'Retour à la liste' })}
    <main class="contenu">
      ${etat.stockageOk ? '' : `<div class="alerte" role="alert"><strong>Recette non sauvegardée.</strong>
        <p>Le navigateur bloque l'enregistrement local : elle disparaîtra en fermant la page.</p></div>`}
      <section class="bloc-resultat" aria-label="Calories">
        <p><span class="resultat-chiffre">${nombre(r.kcalParPortion)}</span> <span class="resultat-unite">kcal</span></p>
        <p class="resultat-label">Par portion</p>
        <p class="resultat-total">Total du plat : ${nombre(r.totalKcal)} kcal · ${r.portions} portion${r.portions > 1 ? 's' : ''}</p>
      </section>
      ${r.description ? `<p class="description">${esc(r.description)}</p>` : ''}
      ${infos.length ? `<div class="infos">${infos.join('')}</div>` : ''}

      <h2 class="sous-titre">Ingrédients</h2>
      <ul class="liste-ingredients">
        ${r.ingredients.map((l) => `
          <li><div class="ligne"><span>${esc(l.nom)}</span><span class="detail">${nombre(l.quantiteG)} g</span></div></li>`).join('')}
      </ul>
      ${r.mienne ? '<button type="button" class="lien-danger" data-action="supprimer-recette" data-id="' + r.id + '">Supprimer cette recette</button>' : ''}
    </main>
    <footer class="actions">
      <a class="bouton" href="#/recette/${r.id}/partager">Partager la fiche</a>
    </footer>`;
}

function vueIntrouvable() {
  return `
    ${entete('Recette introuvable', '#/', { labelRetour: 'Retour à la liste' })}
    <main class="contenu">
      <p class="vide"><strong>Cette recette n'existe pas ou plus.</strong>Elle a peut-être été supprimée.</p>
    </main>
    <footer class="actions"><a class="bouton" href="#/">Retour à la liste</a></footer>`;
}

/* ==========================================================
   Écran 4 — Partage
   ========================================================== */

function texteFiche(r) {
  return [
    `${r.titre} — Ponson Cuisson`,
    `${nombre(r.kcalParPortion)} kcal par portion`,
    `Total : ${nombre(r.totalKcal)} kcal · ${r.portions} portion${r.portions > 1 ? 's' : ''}`,
    '',
    'Ingrédients :',
    ...r.ingredients.map((l) => `- ${l.nom} : ${nombre(l.quantiteG)} g`),
  ].join('\n');
}

function vuePartage(r) {
  etat.confirmation = '';
  const mail = `mailto:?subject=${encodeURIComponent(r.titre + ' — Ponson Cuisson')}&body=${encodeURIComponent(texteFiche(r))}`;
  return `
    ${entete('Partager', '#/recette/' + r.id, { labelRetour: 'Retour à la fiche' })}
    <main class="contenu">
      <div class="carte">
        <p class="gris petit">Aperçu de la fiche</p>
        <p class="apercu-titre">${esc(r.titre)}</p>
        <p><b class="vert">${nombre(r.kcalParPortion)} kcal</b> par portion</p>
        <p class="gris petit">Total : ${nombre(r.totalKcal)} kcal · ${r.portions} portion${r.portions > 1 ? 's' : ''}</p>
      </div>
      <h2 class="sous-titre">Envoyer via</h2>
      <div class="options">
        <button type="button" class="option" data-action="partager-messagerie" data-id="${r.id}">Messagerie</button>
        <a class="option" href="${mail}" data-action="partager-email">E-mail</a>
        <button type="button" class="option" data-action="partager-copier" data-id="${r.id}">Copier le texte</button>
      </div>
      <p id="confirmation" class="confirmation" role="status" hidden></p>
      <p id="erreur-partage" class="erreur" role="alert" hidden></p>
    </main>
    <footer class="actions">
      <a class="bouton-contour" href="#/">Retour à la liste</a>
    </footer>`;
}

function confirmer(message) {
  const zone = document.getElementById('confirmation');
  const erreur = document.getElementById('erreur-partage');
  if (erreur) erreur.hidden = true;
  if (zone) { zone.textContent = '✓ ' + message; zone.hidden = false; }
}

function erreurPartage(message) {
  const zone = document.getElementById('erreur-partage');
  if (zone) { zone.textContent = message; zone.hidden = false; }
}

async function copier(texte) {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch (e) {
    // Repli pour les navigateurs sans accès au presse-papiers
    const zone = document.createElement('textarea');
    zone.value = texte;
    zone.setAttribute('readonly', '');
    zone.style.position = 'fixed';
    zone.style.opacity = '0';
    document.body.appendChild(zone);
    zone.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    zone.remove();
    return ok;
  }
}

async function partagerMessagerie(r) {
  const texte = texteFiche(r);
  if (navigator.share) {
    try {
      await navigator.share({ title: r.titre + ' — Ponson Cuisson', text: texte });
      confirmer('Fiche partagée');
    } catch (e) {
      if (e.name !== 'AbortError') erreurPartage("Le partage n'a pas pu s'ouvrir. Essaie « Copier le texte ».");
    }
    return;
  }
  // Ordinateur sans menu de partage : on copie le texte pour le coller dans la messagerie
  if (await copier(texte)) confirmer('Texte copié : colle-le dans ta messagerie');
  else erreurPartage("Impossible de copier le texte sur cet appareil.");
}

/* ==========================================================
   Événements (délégation sur #app)
   ========================================================== */

app.addEventListener('click', async (event) => {
  const cible = event.target.closest('[data-action]');
  if (!cible) return;
  const action = cible.dataset.action;
  const index = cible.dataset.index !== undefined ? Number(cible.dataset.index) : null;

  switch (action) {
    case 'filtre':
      etat.filtre = cible.dataset.valeur;
      for (const puce of app.querySelectorAll('.puce')) {
        puce.setAttribute('aria-pressed', String(puce.dataset.valeur === etat.filtre));
      }
      majListe();
      break;
    case 'nouvelle':
      aller('nouvelle');
      break;
    case 'annuler':
      etat.brouillon = null;
      etat.tentativeEnregistrer = false;
      aller('');
      break;
    case 'ouvrir-selecteur':
      ouvrirSelecteur(null);
      break;
    case 'editer-ligne':
      ouvrirSelecteur(index);
      break;
    case 'supprimer-ligne':
      etat.brouillon.ingredients.splice(index, 1);
      afficher();
      break;
    case 'fermer-selecteur':
      fermerSelecteur();
      break;
    case 'choisir-ingredient': {
      const choisi = etat.ingredients.find((i) => i.nom === cible.dataset.nom);
      if (choisi) { etat.selecteur.choisi = choisi; etat.selecteur.erreur = ''; afficher(); }
      break;
    }
    case 'changer-ingredient':
      etat.selecteur.choisi = null;
      etat.selecteur.quantite = '';
      etat.selecteur.erreur = '';
      afficher();
      break;
    case 'valider-quantite':
      validerQuantite();
      break;
    case 'supprimer-depuis-selecteur':
      etat.brouillon.ingredients.splice(etat.selecteur.index, 1);
      fermerSelecteur();
      break;
    case 'enregistrer':
      enregistrer();
      break;
    case 'supprimer-recette': {
      const id = Number(cible.dataset.id);
      if (window.confirm('Supprimer définitivement cette recette ?')) {
        etat.mesRecettes = etat.mesRecettes.filter((r) => r.id !== id);
        sauverMesRecettes();
        aller('', true);
      }
      break;
    }
    case 'partager-messagerie':
      await partagerMessagerie(trouverRecette(Number(cible.dataset.id)));
      break;
    case 'partager-email':
      // le lien mailto: ouvre l'application e-mail
      setTimeout(() => confirmer('Fiche partagée'), 300);
      break;
    case 'partager-copier':
      if (await copier(texteFiche(trouverRecette(Number(cible.dataset.id))))) confirmer('Texte copié');
      else erreurPartage("Impossible de copier le texte sur cet appareil.");
      break;
    default:
      break;
  }
});

app.addEventListener('input', (event) => {
  const champ = event.target.dataset.champ;
  if (!champ) return;
  const valeur = event.target.value;

  if (champ === 'recherche') { etat.recherche = valeur; majListe(); }
  if (champ === 'titre') { etat.brouillon.titre = valeur; majCreation(); }
  if (champ === 'portions') { etat.brouillon.portions = valeur; majCreation(); }
  if (champ === 'recherche-ingredient') { etat.selecteur.recherche = valeur; majSelecteur(); }
  if (champ === 'quantite') { etat.selecteur.quantite = valeur; etat.selecteur.erreur = ''; majSelecteur(); }
});

app.addEventListener('change', (event) => {
  if (event.target.dataset.champ === 'tri') { etat.tri = event.target.value; majListe(); }
});

// « Entrée » dans le champ quantité = Valider
app.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.dataset.champ === 'quantite') {
    event.preventDefault();
    validerQuantite();
  }
});

/* ==========================================================
   Démarrage
   ========================================================== */

/**
 * Recettes de départ :
 * - site servi par un serveur (Live Server, GitHub Pages) : lecture de data.json ;
 * - index.html ouvert par un double-clic (file://) : le navigateur bloque fetch,
 *   on utilise la copie js/donnees.js (window.RECETTES_DEPART).
 */
async function chargerRecettesDepart() {
  const copie = Array.isArray(window.RECETTES_DEPART) ? window.RECETTES_DEPART : null;
  if (location.protocol !== 'file:') {
    try {
      const reponse = await fetch('data.json');
      if (!reponse.ok) throw new Error('HTTP ' + reponse.status);
      const donnees = await reponse.json();
      if (!Array.isArray(donnees)) throw new Error('data.json doit contenir un tableau de recettes');
      return donnees;
    } catch (e) {
      console.warn('data.json illisible, utilisation de js/donnees.js :', e);
    }
  }
  if (copie) return copie;
  throw new Error('Aucune recette trouvée (data.json et js/donnees.js)');
}

async function demarrer() {
  etat.mesRecettes = chargerMesRecettes();
  try {
    etat.recettesDepart = await chargerRecettesDepart();
  } catch (e) {
    etat.erreurChargement = e;
    console.error(e);
  }
  construireListeIngredients();
  window.addEventListener('hashchange', afficher);
  afficher();
}

demarrer();
