/** 1re MCV A — Quiz de vocabulaire en situation.
 * À coller comme nouveau fichier .gs dans le projet Apps Script qui héberge le suivi.
 * Exécuter creerQuizLexiqueOmnicanal() une fois ; les relances réutilisent le formulaire existant.
 * Le formulaire et ses réponses restent dans Google ; seul le lien élève doit aller sur GitHub.
 */
function creerQuizLexiqueOmnicanal() {
  const props = PropertiesService.getScriptProperties();
  const key = 'OMNI_1MCVA_LEX_QUIZ_ID';
  const existingId = props.getProperty(key);
  const form = existingId ? FormApp.openById(existingId) : FormApp.create('1re MCV A — Mission omnicanale · Vocabulaire en situation');
  if (!existingId) props.setProperty(key, form.getId());
  form.setDescription('20 situations, une réponse exacte par question. Répondez avec votre propre raisonnement. Nom, prénom et adresse de travail permettent à l’enseignant d’identifier votre copie. Aucune réponse n’est publiée sur GitHub.');
  form.setIsQuiz(true);
  form.setCollectEmail(false);
  form.setConfirmationMessage('Réponses enregistrées. Consultez votre score et les explications selon les paramètres de publication choisis par votre enseignant.');
  const ensureText = title => {
    let item = form.getItems().find(it => it.getTitle() === title);
    if (!item) item = form.addTextItem().setTitle(title);
    item.asTextItem().setRequired(true);
  };
  ['Nom','Prénom','Classe','Adresse de travail (jamais de mot de passe)'].forEach(ensureText);
  const questions = [
  [
    "Un client découvre la boutique sur Instagram, réserve sur le site et retire l’article en magasin. Quel terme décrit la coordination de ces points de contact ?",
    "Omnicanalité",
    [
      "Multicanal",
      "Brick and mortar",
      "Segmentation"
    ],
    "Les canaux se complètent dans un même parcours."
  ],
  [
    "La boutique et son site présentent chacun des produits, sans preuve qu’ils communiquent entre eux. Quelle qualification est prudente ?",
    "Multicanal",
    [
      "Omnicanalité",
      "Click and collect",
      "Phygital"
    ],
    "Plusieurs canaux existent, sans continuité vérifiée."
  ],
  [
    "Le client passe d’un canal à un autre pour accomplir la même démarche. Quel terme convient ?",
    "Cross-canal",
    [
      "Audience",
      "Assortiment",
      "B to B"
    ],
    "Le passage d’un canal à l’autre caractérise ce parcours."
  ],
  [
    "Le site permet de payer un panier. Dans la phrase « Le site marchand est un … », quel mot convient ?",
    "canal de vente",
    [
      "canal de communication",
      "canal de contact",
      "support de signalétique"
    ],
    "Le client peut effectivement acheter."
  ],
  [
    "Une publication annonce les horaires, sans possibilité de commander. Quelle expression convient d’abord ?",
    "canal de communication",
    [
      "canal de vente",
      "bon de commande",
      "stock de sécurité"
    ],
    "Elle sert à informer."
  ],
  [
    "Un formulaire permet au client d’écrire au magasin. Dans « Ce formulaire est un … », choisissez le terme précis.",
    "canal de contact",
    [
      "canal de vente",
      "taux de conversion",
      "rayon"
    ],
    "Il permet d’entrer en relation."
  ],
  [
    "Une vitrine attire l’attention et une page de contact répond aux questions. Quel nom commun désigne ces deux occasions d’interagir avec le commerce ?",
    "points de contact",
    [
      "canaux de vente",
      "unités de stock",
      "références produit"
    ],
    "Un point de contact ne sert pas nécessairement à vendre."
  ],
  [
    "Le client commande en ligne et vient retirer l’achat à la boutique. Quelle expression décrit ce service ?",
    "click and collect",
    [
      "web to store",
      "pure player",
      "live shopping"
    ],
    "Commande en ligne, retrait en magasin."
  ],
  [
    "Le client compare des offres sur le site avant d’aller essayer un produit en boutique, sans commande préalable. Quel parcours décrit-on ?",
    "web to store",
    [
      "click and collect",
      "e-mail retargeting",
      "vente croisée"
    ],
    "La recherche en ligne précède la visite."
  ],
  [
    "« Nous avons reconstitué le …, de la découverte au suivi après achat. » Complétez.",
    "parcours d’achat",
    [
      "linéaire développé",
      "plan de marchandisage",
      "bon de livraison"
    ],
    "On décrit les étapes vécues par le client."
  ],
  [
    "Le client juge ensemble le site, l’accueil et la réponse du service client. Quelle notion résume cette impression globale ?",
    "expérience client",
    [
      "satisfaction client ponctuelle",
      "chiffre d’affaires",
      "approvisionnement"
    ],
    "L’expérience porte sur l’ensemble des interactions."
  ],
  [
    "Après un achat précis, les clients évaluent ce qu’ils ont reçu. Quel indicateur qualitatif examine-t-on ?",
    "satisfaction client",
    [
      "taux d’engagement",
      "trafic",
      "marge"
    ],
    "On apprécie le niveau de satisfaction du client."
  ],
  [
    "Après la vente, un client demande la réparation d’un article. À quel service s’adresse-t-il ?",
    "service après-vente (SAV)",
    [
      "canal de vente",
      "centrale d’achat",
      "marchandisage de séduction"
    ],
    "Le SAV traite les demandes après achat."
  ],
  [
    "La boutique reprend contact après l’achat pour résoudre un problème et entretenir la relation. Comment nommer cette démarche ?",
    "suivi client",
    [
      "approvisionnement",
      "facing",
      "segmentation"
    ],
    "Le suivi client intervient après la vente."
  ],
  [
    "« Je n’ai trouvé aucune preuve d’un stock commun entre le site et le magasin. » Quelle formulation est professionnelle ?",
    "La synchronisation du stock n’est pas vérifiée.",
    [
      "Le commerce ne possède aucun stock.",
      "Le stock est forcément synchronisé.",
      "Le magasin vend uniquement en ligne."
    ],
    "Une absence de preuve ne permet pas de conclure à une absence de service."
  ],
  [
    "Un commerce publie ses horaires sur Instagram, mais n’y prend pas de commandes. Choisissez la phrase exacte.",
    "Instagram est ici un canal de communication et un point de contact.",
    [
      "Instagram est forcément un canal de vente.",
      "Instagram est un bon de livraison.",
      "Instagram prouve à lui seul l’omnicanalité."
    ],
    "La fonction se déduit de ce que le client peut réellement faire."
  ],
  [
    "« Je propose une réservation en ligne suivie d’un retrait en magasin. » Quelle phrase évite de présenter une idée comme un fait déjà observé ?",
    "Le click and collect est une amélioration proposée.",
    [
      "Le click and collect fonctionne déjà sans vérification.",
      "Tous les clients utilisent le click and collect.",
      "Le magasin est un pure player."
    ],
    "Il faut distinguer service constaté et solution envisagée."
  ],
  [
    "La boutique répond à une réclamation par téléphone, puis retrouve l’historique dans le magasin. Quel bénéfice peut-on expliquer ?",
    "La continuité améliore l’expérience client.",
    [
      "Le canal téléphonique augmente mécaniquement le stock.",
      "Le magasin devient automatiquement un pure player.",
      "Le client perd toute possibilité de suivi."
    ],
    "Le passage d’un contact à l’autre est plus fluide."
  ],
  [
    "Une élève dit : « La présence d’un site et d’une boutique prouve une stratégie omnicanale. » Quelle correction est juste ?",
    "Il faut aussi vérifier que les canaux se coordonnent.",
    [
      "Il suffit que les logos aient la même couleur.",
      "Un site empêche le contact en magasin.",
      "Deux canaux impliquent toujours le même stock."
    ],
    "Deux canaux ne prouvent pas leur intégration."
  ],
  [
    "Pour présenter son analyse, un élève décrit d’abord la recherche sur Internet, puis l’essayage, l’achat et le SAV. Quel ordre met-il en évidence ?",
    "Le parcours d’achat du client.",
    [
      "La zone de chalandise du magasin.",
      "La marge du produit.",
      "Le plan d’approvisionnement."
    ],
    "L’ordre raconte les étapes du client."
  ]
];
  questions.forEach((q, index) => {
    const title = String(index + 1).padStart(2,'0') + ' · ' + q[0];
    if (form.getItems().some(it => it.getTitle() === title)) return;
    const item = form.addMultipleChoiceItem().setTitle(title).setRequired(true).setPoints(1);
    const options = [q[1], ...q[2]];
    const rotation = (index * 3 + 1) % 4;
    const ordered = options.slice(rotation).concat(options.slice(0, rotation));
    item.setChoices(ordered.map(answer => item.createChoice(answer, answer === q[1])));
    item.setFeedbackForCorrect(FormApp.createFeedback().setText('Exact. ' + q[3]).build());
    item.setFeedbackForIncorrect(FormApp.createFeedback().setText('À revoir : ' + q[1] + '. ' + q[3]).build());
  });
  const sheetId = props.getProperty('OMNI_1MCVA_SHEET_ID');
  let current = null;
  try { current = form.getDestinationId(); } catch (e) {}
  if (sheetId && !current) form.setDestination(FormApp.DestinationType.SPREADSHEET, sheetId);
  if (current && sheetId && current !== sheetId) throw new Error('Le quiz a déjà un autre tableur de réponses ; aucune modification de destination.');
  Logger.log('Lien élève (à ajouter dans OMNI_LEX_QUIZ_URL de forms-config.js) : ' + form.getPublishedUrl());
  Logger.log('Lien enseignant : ' + form.getEditUrl());
  Logger.log('Questions : ' + questions.length + ' ; points : ' + questions.length);
  return form.getPublishedUrl();
}
