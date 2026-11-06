/*
 * Copie de data.json, pour que le site marche aussi en ouvrant index.html par un double-clic
 * (le navigateur bloque alors la lecture de data.json).
 * Si tu modifies data.json, recopie son contenu ici, après « window.RECETTES_DEPART = ».
 */
window.RECETTES_DEPART = [
  {
    "id": 1,
    "titre": "Tarte au sucre",
    "commune": "Payerne",
    "description": "Tarte broyarde à la crème et au sucre, simple et économique pour le dessert de la semaine.",
    "prixMoyen": 0.80,
    "portions": 8,
    "estVegetarien": true,
    "tags": ["dessert", "four", "terroir"],
    "image": "images/tarte-au-sucre.jpg",
    "ingredients": [
      { "nom": "Farine", "quantiteG": 250, "kcalPour100g": 364 },
      { "nom": "Beurre", "quantiteG": 100, "kcalPour100g": 717 },
      { "nom": "Sucre", "quantiteG": 120, "kcalPour100g": 387 },
      { "nom": "Crème", "quantiteG": 200, "kcalPour100g": 300 }
    ],
    "totalKcal": 2691,
    "kcalParPortion": 336
  },
  {
    "id": 2,
    "titre": "Pâtes au thon",
    "commune": "Lausanne",
    "description": "Plat de pâtes à la sauce tomate et au thon, prêt en vingt minutes.",
    "prixMoyen": 2.50,
    "portions": 2,
    "estVegetarien": false,
    "tags": ["rapide", "petit-budget", "proteines"],
    "image": "images/pates-au-thon.jpg",
    "ingredients": [
      { "nom": "Pâtes", "quantiteG": 170, "kcalPour100g": 371 },
      { "nom": "Thon au naturel", "quantiteG": 140, "kcalPour100g": 116 },
      { "nom": "Tomates concassées", "quantiteG": 400, "kcalPour100g": 32 },
      { "nom": "Oignon", "quantiteG": 75, "kcalPour100g": 40 },
      { "nom": "Huile d'olive", "quantiteG": 10, "kcalPour100g": 884 }
    ],
    "totalKcal": 1040,
    "kcalParPortion": 520
  },
  {
    "id": 3,
    "titre": "Salade de quinoa",
    "commune": "Yverdon-les-Bains",
    "description": "Salade froide au quinoa, concombre, tomate et feta, idéale pour la lunchbox.",
    "prixMoyen": 3.20,
    "portions": 2,
    "estVegetarien": true,
    "tags": ["salade", "lunchbox", "frais"],
    "image": "images/salade-de-quinoa.jpg",
    "ingredients": [
      { "nom": "Quinoa", "quantiteG": 140, "kcalPour100g": 368 },
      { "nom": "Concombre", "quantiteG": 150, "kcalPour100g": 15 },
      { "nom": "Tomate", "quantiteG": 200, "kcalPour100g": 18 },
      { "nom": "Feta", "quantiteG": 60, "kcalPour100g": 264 },
      { "nom": "Huile d'olive", "quantiteG": 10, "kcalPour100g": 884 }
    ],
    "totalKcal": 820,
    "kcalParPortion": 410
  },
  {
    "id": 4,
    "titre": "Papet vaudois",
    "commune": "Moudon",
    "description": "Poireaux et pommes de terre mijotés, servis avec une saucisse aux choux.",
    "prixMoyen": 4.50,
    "portions": 4,
    "estVegetarien": false,
    "tags": ["terroir", "hiver", "mijote"],
    "image": "images/papet-vaudois.jpg",
    "ingredients": [
      { "nom": "Poireau", "quantiteG": 800, "kcalPour100g": 61 },
      { "nom": "Pommes de terre", "quantiteG": 600, "kcalPour100g": 77 },
      { "nom": "Saucisse aux choux", "quantiteG": 400, "kcalPour100g": 300 },
      { "nom": "Crème", "quantiteG": 100, "kcalPour100g": 300 },
      { "nom": "Vin blanc", "quantiteG": 100, "kcalPour100g": 82 }
    ],
    "totalKcal": 2532,
    "kcalParPortion": 633
  },
  {
    "id": 5,
    "titre": "Fondue moitié-moitié",
    "commune": "Fribourg",
    "description": "Fondue au gruyère et au vacherin fribourgeois, à partager entre amis.",
    "prixMoyen": 7.50,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["fromage", "hiver", "convivial"],
    "image": "images/fondue-moitie-moitie.jpg",
    "ingredients": [
      { "nom": "Gruyère", "quantiteG": 400, "kcalPour100g": 413 },
      { "nom": "Vacherin fribourgeois", "quantiteG": 400, "kcalPour100g": 360 },
      { "nom": "Vin blanc", "quantiteG": 300, "kcalPour100g": 82 },
      { "nom": "Pain", "quantiteG": 600, "kcalPour100g": 265 },
      { "nom": "Ail", "quantiteG": 5, "kcalPour100g": 149 }
    ],
    "totalKcal": 4935,
    "kcalParPortion": 1234
  },
  {
    "id": 6,
    "titre": "Raclette",
    "commune": "Sion",
    "description": "Fromage à raclette fondu sur des pommes de terre en robe des champs.",
    "prixMoyen": 6.50,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["fromage", "hiver", "convivial"],
    "image": "images/raclette.jpg",
    "ingredients": [
      { "nom": "Fromage à raclette", "quantiteG": 800, "kcalPour100g": 357 },
      { "nom": "Pommes de terre", "quantiteG": 1000, "kcalPour100g": 77 },
      { "nom": "Cornichons", "quantiteG": 100, "kcalPour100g": 12 }
    ],
    "totalKcal": 3638,
    "kcalParPortion": 910
  },
  {
    "id": 7,
    "titre": "Malakoffs",
    "commune": "Vinzel",
    "description": "Beignets de gruyère sur pain, spécialité de La Côte servie bien chaude.",
    "prixMoyen": 4.80,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["fromage", "friture", "terroir"],
    "image": "images/malakoffs.jpg",
    "ingredients": [
      { "nom": "Gruyère", "quantiteG": 400, "kcalPour100g": 413 },
      { "nom": "Farine", "quantiteG": 40, "kcalPour100g": 364 },
      { "nom": "Œufs", "quantiteG": 100, "kcalPour100g": 143 },
      { "nom": "Vin blanc", "quantiteG": 60, "kcalPour100g": 82 },
      { "nom": "Pain", "quantiteG": 160, "kcalPour100g": 265 },
      { "nom": "Huile de tournesol", "quantiteG": 40, "kcalPour100g": 884 }
    ],
    "totalKcal": 2767,
    "kcalParPortion": 692
  },
  {
    "id": 8,
    "titre": "Gâteau du Vully",
    "commune": "Mont-Vully",
    "description": "Gâteau brioché au sucre et à la crème, typique de la région des Trois-Lacs.",
    "prixMoyen": 1.10,
    "portions": 8,
    "estVegetarien": true,
    "tags": ["dessert", "four", "terroir"],
    "image": "images/gateau-du-vully.jpg",
    "ingredients": [
      { "nom": "Farine", "quantiteG": 300, "kcalPour100g": 364 },
      { "nom": "Beurre", "quantiteG": 60, "kcalPour100g": 717 },
      { "nom": "Lait", "quantiteG": 150, "kcalPour100g": 64 },
      { "nom": "Sucre", "quantiteG": 80, "kcalPour100g": 387 },
      { "nom": "Crème", "quantiteG": 150, "kcalPour100g": 300 },
      { "nom": "Œufs", "quantiteG": 50, "kcalPour100g": 143 }
    ],
    "totalKcal": 2449,
    "kcalParPortion": 306
  },
  {
    "id": 9,
    "titre": "Tarte au vin cuit",
    "commune": "Romont",
    "description": "Tarte à la crème parfumée au vin cuit, le dessert de la Bénichon.",
    "prixMoyen": 1.30,
    "portions": 8,
    "estVegetarien": true,
    "tags": ["dessert", "four", "terroir"],
    "image": "images/tarte-au-vin-cuit.jpg",
    "ingredients": [
      { "nom": "Farine", "quantiteG": 200, "kcalPour100g": 364 },
      { "nom": "Beurre", "quantiteG": 90, "kcalPour100g": 717 },
      { "nom": "Vin cuit", "quantiteG": 150, "kcalPour100g": 280 },
      { "nom": "Crème", "quantiteG": 200, "kcalPour100g": 300 },
      { "nom": "Œufs", "quantiteG": 100, "kcalPour100g": 143 },
      { "nom": "Sucre", "quantiteG": 30, "kcalPour100g": 387 }
    ],
    "totalKcal": 2652,
    "kcalParPortion": 332
  },
  {
    "id": 10,
    "titre": "Croûte au fromage",
    "commune": "Château-d'Œx",
    "description": "Tranches de pain imbibées de vin blanc, gratinées au gruyère avec jambon et œuf.",
    "prixMoyen": 4.20,
    "portions": 2,
    "estVegetarien": false,
    "tags": ["fromage", "four", "montagne"],
    "image": "images/croute-au-fromage.jpg",
    "ingredients": [
      { "nom": "Pain", "quantiteG": 160, "kcalPour100g": 265 },
      { "nom": "Gruyère", "quantiteG": 150, "kcalPour100g": 413 },
      { "nom": "Vin blanc", "quantiteG": 60, "kcalPour100g": 82 },
      { "nom": "Œufs", "quantiteG": 50, "kcalPour100g": 143 },
      { "nom": "Jambon", "quantiteG": 60, "kcalPour100g": 145 }
    ],
    "totalKcal": 1251,
    "kcalParPortion": 626
  },
  {
    "id": 11,
    "titre": "Soupe de chalet",
    "commune": "Bulle",
    "description": "Soupe épaisse aux légumes, pâtes, lait et gruyère, comme à l'alpage.",
    "prixMoyen": 3.60,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["soupe", "hiver", "montagne"],
    "image": "images/soupe-de-chalet.jpg",
    "ingredients": [
      { "nom": "Pommes de terre", "quantiteG": 300, "kcalPour100g": 77 },
      { "nom": "Poireau", "quantiteG": 200, "kcalPour100g": 61 },
      { "nom": "Carottes", "quantiteG": 150, "kcalPour100g": 41 },
      { "nom": "Oignon", "quantiteG": 100, "kcalPour100g": 40 },
      { "nom": "Pâtes", "quantiteG": 100, "kcalPour100g": 371 },
      { "nom": "Lait", "quantiteG": 500, "kcalPour100g": 64 },
      { "nom": "Crème", "quantiteG": 100, "kcalPour100g": 300 },
      { "nom": "Gruyère", "quantiteG": 120, "kcalPour100g": 413 },
      { "nom": "Épinards", "quantiteG": 100, "kcalPour100g": 23 },
      { "nom": "Bouillon de légumes", "quantiteG": 500, "kcalPour100g": 5 }
    ],
    "totalKcal": 1989,
    "kcalParPortion": 497
  },
  {
    "id": 12,
    "titre": "Macaronis de chalet",
    "commune": "Charmey",
    "description": "Macaronis et pommes de terre à la crème, gratinés au gruyère.",
    "prixMoyen": 2.90,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["pates", "fromage", "montagne"],
    "image": "images/macaronis-de-chalet.jpg",
    "ingredients": [
      { "nom": "Pâtes", "quantiteG": 320, "kcalPour100g": 371 },
      { "nom": "Pommes de terre", "quantiteG": 300, "kcalPour100g": 77 },
      { "nom": "Crème", "quantiteG": 200, "kcalPour100g": 300 },
      { "nom": "Gruyère", "quantiteG": 150, "kcalPour100g": 413 },
      { "nom": "Oignon", "quantiteG": 150, "kcalPour100g": 40 },
      { "nom": "Beurre", "quantiteG": 20, "kcalPour100g": 717 }
    ],
    "totalKcal": 2841,
    "kcalParPortion": 710
  },
  {
    "id": 13,
    "titre": "Saucisson vaudois aux lentilles",
    "commune": "Echallens",
    "description": "Saucisson vaudois cuit lentement, servi sur des lentilles à la moutarde.",
    "prixMoyen": 4.90,
    "portions": 4,
    "estVegetarien": false,
    "tags": ["terroir", "hiver", "proteines"],
    "image": "images/saucisson-lentilles.jpg",
    "ingredients": [
      { "nom": "Saucisson vaudois", "quantiteG": 400, "kcalPour100g": 300 },
      { "nom": "Lentilles", "quantiteG": 250, "kcalPour100g": 352 },
      { "nom": "Carottes", "quantiteG": 200, "kcalPour100g": 41 },
      { "nom": "Oignon", "quantiteG": 100, "kcalPour100g": 40 },
      { "nom": "Moutarde", "quantiteG": 20, "kcalPour100g": 66 }
    ],
    "totalKcal": 2215,
    "kcalParPortion": 554
  },
  {
    "id": 14,
    "titre": "Gâteau aux pommes",
    "commune": "Morges",
    "description": "Gâteau aux pommes à la crème sur pâte brisée maison.",
    "prixMoyen": 1.20,
    "portions": 8,
    "estVegetarien": true,
    "tags": ["dessert", "four", "fruits"],
    "image": "images/gateau-aux-pommes.jpg",
    "ingredients": [
      { "nom": "Farine", "quantiteG": 200, "kcalPour100g": 364 },
      { "nom": "Beurre", "quantiteG": 100, "kcalPour100g": 717 },
      { "nom": "Pommes", "quantiteG": 600, "kcalPour100g": 52 },
      { "nom": "Crème", "quantiteG": 150, "kcalPour100g": 300 },
      { "nom": "Œufs", "quantiteG": 100, "kcalPour100g": 143 },
      { "nom": "Sucre", "quantiteG": 80, "kcalPour100g": 387 }
    ],
    "totalKcal": 2660,
    "kcalParPortion": 332
  },
  {
    "id": 15,
    "titre": "Totché",
    "commune": "Porrentruy",
    "description": "Gâteau salé jurassien à la crème et aux oignons.",
    "prixMoyen": 1.40,
    "portions": 6,
    "estVegetarien": true,
    "tags": ["four", "terroir", "sale"],
    "image": "images/totche.jpg",
    "ingredients": [
      { "nom": "Farine", "quantiteG": 250, "kcalPour100g": 364 },
      { "nom": "Beurre", "quantiteG": 80, "kcalPour100g": 717 },
      { "nom": "Lait", "quantiteG": 100, "kcalPour100g": 64 },
      { "nom": "Crème", "quantiteG": 300, "kcalPour100g": 300 },
      { "nom": "Oignon", "quantiteG": 150, "kcalPour100g": 40 },
      { "nom": "Œufs", "quantiteG": 50, "kcalPour100g": 143 }
    ],
    "totalKcal": 2579,
    "kcalParPortion": 430
  },
  {
    "id": 16,
    "titre": "Taillé aux greubons",
    "commune": "Orbe",
    "description": "Feuilleté vaudois aux greubons, à servir à l'apéro.",
    "prixMoyen": 1.00,
    "portions": 8,
    "estVegetarien": false,
    "tags": ["apero", "four", "terroir"],
    "image": "images/taille-aux-greubons.jpg",
    "ingredients": [
      { "nom": "Farine", "quantiteG": 300, "kcalPour100g": 364 },
      { "nom": "Beurre", "quantiteG": 50, "kcalPour100g": 717 },
      { "nom": "Greubons", "quantiteG": 150, "kcalPour100g": 600 },
      { "nom": "Lait", "quantiteG": 120, "kcalPour100g": 64 }
    ],
    "totalKcal": 2427,
    "kcalParPortion": 303
  },
  {
    "id": 17,
    "titre": "Meringues à la double crème",
    "commune": "Gruyères",
    "description": "Meringues croquantes, double crème et fraises fraîches.",
    "prixMoyen": 4.00,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["dessert", "terroir", "fruits"],
    "image": "images/meringues-double-creme.jpg",
    "ingredients": [
      { "nom": "Blanc d'œuf", "quantiteG": 120, "kcalPour100g": 52 },
      { "nom": "Sucre", "quantiteG": 240, "kcalPour100g": 387 },
      { "nom": "Crème double", "quantiteG": 200, "kcalPour100g": 450 },
      { "nom": "Fraises", "quantiteG": 200, "kcalPour100g": 32 }
    ],
    "totalKcal": 1955,
    "kcalParPortion": 489
  },
  {
    "id": 18,
    "titre": "Filets de perche meunière",
    "commune": "Lutry",
    "description": "Filets de perche dorés au beurre, servis avec des pommes de terre vapeur.",
    "prixMoyen": 11.50,
    "portions": 4,
    "estVegetarien": false,
    "tags": ["poisson", "lac", "proteines"],
    "image": "images/filets-de-perche.jpg",
    "ingredients": [
      { "nom": "Filets de perche", "quantiteG": 600, "kcalPour100g": 91 },
      { "nom": "Farine", "quantiteG": 30, "kcalPour100g": 364 },
      { "nom": "Beurre", "quantiteG": 60, "kcalPour100g": 717 },
      { "nom": "Pommes de terre", "quantiteG": 800, "kcalPour100g": 77 }
    ],
    "totalKcal": 1701,
    "kcalParPortion": 425
  },
  {
    "id": 19,
    "titre": "Gratin de cardons",
    "commune": "Plan-les-Ouates",
    "description": "Cardons genevois en gratin crémeux au gruyère, plat de fête de l'Escalade.",
    "prixMoyen": 3.80,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["gratin", "hiver", "terroir"],
    "image": "images/gratin-de-cardons.jpg",
    "ingredients": [
      { "nom": "Cardons", "quantiteG": 800, "kcalPour100g": 20 },
      { "nom": "Crème", "quantiteG": 200, "kcalPour100g": 300 },
      { "nom": "Gruyère", "quantiteG": 100, "kcalPour100g": 413 },
      { "nom": "Farine", "quantiteG": 20, "kcalPour100g": 364 },
      { "nom": "Beurre", "quantiteG": 20, "kcalPour100g": 717 },
      { "nom": "Lait", "quantiteG": 200, "kcalPour100g": 64 }
    ],
    "totalKcal": 1517,
    "kcalParPortion": 379
  },
  {
    "id": 20,
    "titre": "Longeole et gratin",
    "commune": "Genève",
    "description": "Longeole genevoise pochée, accompagnée d'un gratin de pommes de terre.",
    "prixMoyen": 5.80,
    "portions": 4,
    "estVegetarien": false,
    "tags": ["terroir", "hiver", "four"],
    "image": "images/longeole-et-gratin.jpg",
    "ingredients": [
      { "nom": "Longeole", "quantiteG": 500, "kcalPour100g": 300 },
      { "nom": "Pommes de terre", "quantiteG": 800, "kcalPour100g": 77 },
      { "nom": "Crème", "quantiteG": 100, "kcalPour100g": 300 },
      { "nom": "Oignon", "quantiteG": 100, "kcalPour100g": 40 }
    ],
    "totalKcal": 2456,
    "kcalParPortion": 614
  },
  {
    "id": 21,
    "titre": "Risotto aux champignons",
    "commune": "Martigny",
    "description": "Risotto crémeux aux champignons de Paris et au vin blanc.",
    "prixMoyen": 3.40,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["riz", "automne", "mijote"],
    "image": "images/risotto-champignons.jpg",
    "ingredients": [
      { "nom": "Riz", "quantiteG": 320, "kcalPour100g": 360 },
      { "nom": "Champignons", "quantiteG": 400, "kcalPour100g": 22 },
      { "nom": "Oignon", "quantiteG": 100, "kcalPour100g": 40 },
      { "nom": "Vin blanc", "quantiteG": 100, "kcalPour100g": 82 },
      { "nom": "Bouillon de légumes", "quantiteG": 1000, "kcalPour100g": 5 },
      { "nom": "Beurre", "quantiteG": 30, "kcalPour100g": 717 },
      { "nom": "Gruyère", "quantiteG": 60, "kcalPour100g": 413 }
    ],
    "totalKcal": 1875,
    "kcalParPortion": 469
  },
  {
    "id": 22,
    "titre": "Poulet au curry et riz",
    "commune": "Neuchâtel",
    "description": "Émincé de poulet au lait de coco et au curry, servi avec du riz.",
    "prixMoyen": 4.20,
    "portions": 3,
    "estVegetarien": false,
    "tags": ["proteines", "meal-prep", "riz"],
    "image": "images/poulet-curry-riz.jpg",
    "ingredients": [
      { "nom": "Blanc de poulet", "quantiteG": 450, "kcalPour100g": 110 },
      { "nom": "Riz", "quantiteG": 225, "kcalPour100g": 360 },
      { "nom": "Lait de coco", "quantiteG": 200, "kcalPour100g": 197 },
      { "nom": "Oignon", "quantiteG": 100, "kcalPour100g": 40 },
      { "nom": "Poivron", "quantiteG": 150, "kcalPour100g": 31 },
      { "nom": "Huile d'olive", "quantiteG": 10, "kcalPour100g": 884 }
    ],
    "totalKcal": 1874,
    "kcalParPortion": 625
  },
  {
    "id": 23,
    "titre": "Chili sin carne",
    "commune": "Delémont",
    "description": "Chili végétarien aux haricots rouges et au maïs, servi avec du riz.",
    "prixMoyen": 2.20,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["petit-budget", "meal-prep", "epice"],
    "image": "images/chili-sin-carne.jpg",
    "ingredients": [
      { "nom": "Haricots rouges", "quantiteG": 500, "kcalPour100g": 100 },
      { "nom": "Maïs", "quantiteG": 280, "kcalPour100g": 86 },
      { "nom": "Tomates concassées", "quantiteG": 800, "kcalPour100g": 32 },
      { "nom": "Oignon", "quantiteG": 150, "kcalPour100g": 40 },
      { "nom": "Poivron", "quantiteG": 200, "kcalPour100g": 31 },
      { "nom": "Riz", "quantiteG": 280, "kcalPour100g": 360 },
      { "nom": "Huile d'olive", "quantiteG": 15, "kcalPour100g": 884 }
    ],
    "totalKcal": 2259,
    "kcalParPortion": 565
  },
  {
    "id": 24,
    "titre": "Omelette épinards et feta",
    "commune": "Sainte-Croix",
    "description": "Omelette de trois œufs aux épinards et à la feta, avec une tranche de pain.",
    "prixMoyen": 3.10,
    "portions": 1,
    "estVegetarien": true,
    "tags": ["rapide", "proteines", "oeufs"],
    "image": "images/omelette-epinards-feta.jpg",
    "ingredients": [
      { "nom": "Œufs", "quantiteG": 150, "kcalPour100g": 143 },
      { "nom": "Épinards", "quantiteG": 100, "kcalPour100g": 23 },
      { "nom": "Feta", "quantiteG": 40, "kcalPour100g": 264 },
      { "nom": "Huile d'olive", "quantiteG": 5, "kcalPour100g": 884 },
      { "nom": "Pain", "quantiteG": 60, "kcalPour100g": 265 }
    ],
    "totalKcal": 546,
    "kcalParPortion": 546
  },
  {
    "id": 25,
    "titre": "Overnight oats à la banane",
    "commune": "Vevey",
    "description": "Flocons d'avoine trempés la veille dans le lait et le yaourt, avec banane et miel.",
    "prixMoyen": 1.60,
    "portions": 1,
    "estVegetarien": true,
    "tags": ["petit-dejeuner", "rapide", "petit-budget"],
    "image": "images/overnight-oats-banane.jpg",
    "ingredients": [
      { "nom": "Flocons d'avoine", "quantiteG": 60, "kcalPour100g": 389 },
      { "nom": "Lait", "quantiteG": 200, "kcalPour100g": 64 },
      { "nom": "Yaourt nature", "quantiteG": 100, "kcalPour100g": 61 },
      { "nom": "Banane", "quantiteG": 120, "kcalPour100g": 89 },
      { "nom": "Miel", "quantiteG": 10, "kcalPour100g": 304 }
    ],
    "totalKcal": 560,
    "kcalParPortion": 560
  },
  {
    "id": 26,
    "titre": "Wok de légumes au tofu",
    "commune": "Carouge",
    "description": "Tofu sauté au wok avec brocoli, carottes et poivron, sur du riz.",
    "prixMoyen": 3.30,
    "portions": 2,
    "estVegetarien": true,
    "tags": ["rapide", "legumes", "riz"],
    "image": "images/wok-tofu-legumes.jpg",
    "ingredients": [
      { "nom": "Tofu", "quantiteG": 200, "kcalPour100g": 76 },
      { "nom": "Riz", "quantiteG": 150, "kcalPour100g": 360 },
      { "nom": "Brocoli", "quantiteG": 200, "kcalPour100g": 34 },
      { "nom": "Carottes", "quantiteG": 150, "kcalPour100g": 41 },
      { "nom": "Poivron", "quantiteG": 150, "kcalPour100g": 31 },
      { "nom": "Sauce soja", "quantiteG": 30, "kcalPour100g": 53 },
      { "nom": "Huile de tournesol", "quantiteG": 15, "kcalPour100g": 884 }
    ],
    "totalKcal": 1016,
    "kcalParPortion": 508
  },
  {
    "id": 27,
    "titre": "Saumon, riz et brocoli",
    "commune": "Nyon",
    "description": "Box de meal prep au saumon, riz et brocoli vapeur pour trois jours.",
    "prixMoyen": 6.20,
    "portions": 3,
    "estVegetarien": false,
    "tags": ["meal-prep", "poisson", "proteines"],
    "image": "images/saumon-riz-brocoli.jpg",
    "ingredients": [
      { "nom": "Saumon", "quantiteG": 450, "kcalPour100g": 208 },
      { "nom": "Riz", "quantiteG": 225, "kcalPour100g": 360 },
      { "nom": "Brocoli", "quantiteG": 450, "kcalPour100g": 34 },
      { "nom": "Huile d'olive", "quantiteG": 15, "kcalPour100g": 884 }
    ],
    "totalKcal": 2032,
    "kcalParPortion": 677
  },
  {
    "id": 28,
    "titre": "Spaghetti bolognaise",
    "commune": "Montreux",
    "description": "Spaghetti à la sauce tomate et à la viande hachée, mijotée avec carottes et oignon.",
    "prixMoyen": 3.00,
    "portions": 4,
    "estVegetarien": false,
    "tags": ["pates", "classique", "mijote"],
    "image": "images/spaghetti-bolognaise.jpg",
    "ingredients": [
      { "nom": "Pâtes", "quantiteG": 400, "kcalPour100g": 371 },
      { "nom": "Viande hachée de bœuf", "quantiteG": 400, "kcalPour100g": 250 },
      { "nom": "Tomates concassées", "quantiteG": 800, "kcalPour100g": 32 },
      { "nom": "Oignon", "quantiteG": 100, "kcalPour100g": 40 },
      { "nom": "Carottes", "quantiteG": 100, "kcalPour100g": 41 },
      { "nom": "Huile d'olive", "quantiteG": 15, "kcalPour100g": 884 }
    ],
    "totalKcal": 2954,
    "kcalParPortion": 738
  },
  {
    "id": 29,
    "titre": "Gratin de pâtes au jambon",
    "commune": "Estavayer-le-Lac",
    "description": "Gratin de cornettes au jambon, à la crème et au gruyère.",
    "prixMoyen": 2.80,
    "portions": 4,
    "estVegetarien": false,
    "tags": ["pates", "gratin", "four"],
    "image": "images/gratin-pates-jambon.jpg",
    "ingredients": [
      { "nom": "Pâtes", "quantiteG": 320, "kcalPour100g": 371 },
      { "nom": "Jambon", "quantiteG": 200, "kcalPour100g": 145 },
      { "nom": "Crème", "quantiteG": 200, "kcalPour100g": 300 },
      { "nom": "Lait", "quantiteG": 200, "kcalPour100g": 64 },
      { "nom": "Gruyère", "quantiteG": 120, "kcalPour100g": 413 },
      { "nom": "Œufs", "quantiteG": 100, "kcalPour100g": 143 }
    ],
    "totalKcal": 2844,
    "kcalParPortion": 711
  },
  {
    "id": 30,
    "titre": "Salade de lentilles et carottes",
    "commune": "Le Locle",
    "description": "Salade tiède de lentilles et carottes, vinaigrette à la moutarde.",
    "prixMoyen": 1.50,
    "portions": 2,
    "estVegetarien": true,
    "tags": ["salade", "petit-budget", "lunchbox"],
    "image": "images/salade-lentilles-carottes.jpg",
    "ingredients": [
      { "nom": "Lentilles", "quantiteG": 140, "kcalPour100g": 352 },
      { "nom": "Carottes", "quantiteG": 200, "kcalPour100g": 41 },
      { "nom": "Oignon", "quantiteG": 50, "kcalPour100g": 40 },
      { "nom": "Huile d'olive", "quantiteG": 20, "kcalPour100g": 884 },
      { "nom": "Moutarde", "quantiteG": 10, "kcalPour100g": 66 }
    ],
    "totalKcal": 778,
    "kcalParPortion": 389
  },
  {
    "id": 31,
    "titre": "Pancakes au séré",
    "commune": "La Chaux-de-Fonds",
    "description": "Pancakes à l'avoine, au séré et à la banane, riches en protéines.",
    "prixMoyen": 1.90,
    "portions": 2,
    "estVegetarien": true,
    "tags": ["petit-dejeuner", "proteines", "sucre"],
    "image": "images/pancakes-sere.jpg",
    "ingredients": [
      { "nom": "Flocons d'avoine", "quantiteG": 80, "kcalPour100g": 389 },
      { "nom": "Séré maigre", "quantiteG": 250, "kcalPour100g": 67 },
      { "nom": "Œufs", "quantiteG": 100, "kcalPour100g": 143 },
      { "nom": "Banane", "quantiteG": 120, "kcalPour100g": 89 },
      { "nom": "Lait", "quantiteG": 100, "kcalPour100g": 64 }
    ],
    "totalKcal": 792,
    "kcalParPortion": 396
  },
  {
    "id": 32,
    "titre": "Soupe à la courge",
    "commune": "Avenches",
    "description": "Velouté de courge et pommes de terre, adouci à la crème.",
    "prixMoyen": 1.80,
    "portions": 4,
    "estVegetarien": true,
    "tags": ["soupe", "automne", "petit-budget"],
    "image": "images/soupe-a-la-courge.jpg",
    "ingredients": [
      { "nom": "Courge", "quantiteG": 1000, "kcalPour100g": 26 },
      { "nom": "Pommes de terre", "quantiteG": 200, "kcalPour100g": 77 },
      { "nom": "Oignon", "quantiteG": 100, "kcalPour100g": 40 },
      { "nom": "Crème", "quantiteG": 100, "kcalPour100g": 300 },
      { "nom": "Bouillon de légumes", "quantiteG": 600, "kcalPour100g": 5 },
      { "nom": "Beurre", "quantiteG": 10, "kcalPour100g": 717 }
    ],
    "totalKcal": 856,
    "kcalParPortion": 214
  }
];
