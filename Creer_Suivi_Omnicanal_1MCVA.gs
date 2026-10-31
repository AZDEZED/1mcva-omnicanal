/**
 * Mission omnicanale 1re MCV A — A.Zeboudj
 * Exécuter creerSuiviOmnicanal() UNE FOIS depuis script.google.com.
 * Le script crée neuf Google Forms, un tableur privé, et neuf déclencheurs.
 * Il ne publie aucune donnée d'élève sur GitHub.
 */
const OMNI_ETAPES = [
  {id:'outils', titre:'01 · Mes outils', questions:[
    ['Adresse de travail utilisée (compte scolaire ou professionnel, jamais de mot de passe)','text'],
    ['Canva : accès obtenu, invitation en attente ou difficulté rencontrée','text'],
    ['Où avez-vous sauvegardé votre carnet de travail ?','text']]},
  {id:'notions', titre:'02 · Les notions', questions:[
    ['Expliquez avec vos mots la différence entre multicanal, cross-canal et omnicanal.','paragraph'],
    ['Donnez un exemple de continuité entre deux canaux.','paragraph']]},
  {id:'recherche', titre:'03 · Ma recherche sans IA', questions:[
    ['Lien exact d’une source utile','text'],
    ['Quelle information en retenez-vous, avec vos propres mots ?','paragraph'],
    ['Quelles autres sources avez-vous consultées ?','paragraph']]},
  {id:'commerce', titre:'04 · Mon commerce de proximité', questions:[
    ['Nom et commune du commerce réel choisi','text'],
    ['Son activité et la raison de votre choix','paragraph'],
    ['Lien d’une source vérifiable concernant ce commerce, ou limite rencontrée','text']]},
  {id:'parcours', titre:'05 · Le parcours client', questions:[
    ['Décrivez quatre points de contact dans l’ordre.','paragraph'],
    ['Quelle friction avez-vous repérée ? Sur quelle observation vous appuyez-vous ?','paragraph']]},
  {id:'strategie', titre:'06 · Ma proposition', questions:[
    ['Quelle amélioration concrète proposez-vous ?','paragraph'],
    ['Quel bénéfice pour le client ? Comment pourriez-vous vérifier l’effet ?','paragraph'],
    ['Quelle partie est observée et quelle partie est proposée ?','paragraph']]},
  {id:'canva', titre:'07 · Ma présentation Canva', questions:[
    ['Lien de consultation de votre présentation Canva (vérifiez l’accès, aucun mot de passe)','text'],
    ['Quelles diapositives sont prêtes ? Quelle partie reste à terminer ?','paragraph']]},
  {id:'oral', titre:'08 · Ma prise de parole', questions:[
    ['Donnez le plan de votre présentation en trois étapes.','paragraph'],
    ['Après un essai, quelle amélioration précise allez-vous apporter ?','paragraph']]},
  {id:'bilan', titre:'09 · Ma remise et mon bilan', questions:[
    ['Lien de consultation du rendu final ou lieu de remise indiqué en classe','text'],
    ['Une réussite dont vous pouvez donner une preuve','paragraph'],
    ['Une difficulté dépassée et ce que vous avez appris','paragraph']]}
];
const OMNI_PROP = 'OMNI_1MCVA_';
const OMNI_ENTETES = ['Nom','Prénom','Classe','Adresse de travail',
  ...OMNI_ETAPES.map(s => s.titre), 'Professionnalisme /2', 'Total /20',
  'Étapes déposées /9', 'Dernier dépôt'];

function creerSuiviOmnicanal() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(OMNI_PROP + 'SHEET_ID');
  const ss = existingId ? SpreadsheetApp.openById(existingId) :
    SpreadsheetApp.create('1MCVA — Suivi privé mission omnicanale');
  if (!existingId) props.setProperty(OMNI_PROP + 'SHEET_ID', ss.getId());
  const suivi = ss.getSheets()[0].setName('Suivi');
  suivi.getRange(1,1,1,OMNI_ENTETES.length).setValues([OMNI_ENTETES]);
  suivi.setFrozenRows(1);
  suivi.getRange(1,1,1,OMNI_ENTETES.length).setBackground('#17484B').setFontColor('#ffffff').setFontWeight('bold');
  suivi.setColumnWidths(1,4,150);
  suivi.setColumnWidths(5,9,160);
  suivi.getRange('N2:N').setDataValidation(SpreadsheetApp.newDataValidation()
    .requireNumberBetween(0,2).setAllowInvalid(false).build());
  const depots = ss.getSheetByName('Dépôts') || ss.insertSheet('Dépôts');
  if (depots.getLastRow() === 0) depots.appendRow(['Date','Étape','Nom','Prénom','Classe','Adresse de travail','Réponses et preuves','ID de réponse']);
  depots.setFrozenRows(1);
  depots.getRange(1,1,1,8).setBackground('#17484B').setFontColor('#ffffff').setFontWeight('bold');
  depots.setColumnWidth(7,620);
  const liens = ss.getSheetByName('Liens et installation') || ss.insertSheet('Liens et installation');
  liens.clearContents();
  liens.appendRow(['Étape','Lien élève','Lien édition (enseignant)']);
  liens.setFrozenRows(1);
  liens.getRange(1,1,1,3).setBackground('#17484B').setFontColor('#ffffff').setFontWeight('bold');
  liens.setColumnWidths(1,3,320);
  const urls = {};
  OMNI_ETAPES.forEach(etape => {
    const savedFormId = props.getProperty(OMNI_PROP + 'STAGE_' + etape.id);
    const form = savedFormId ? FormApp.openById(savedFormId) :
      FormApp.create('1re MCV A — Mission omnicanale — ' + etape.titre);
    props.setProperty(OMNI_PROP + 'STAGE_' + etape.id, form.getId());
    props.setProperty(OMNI_PROP + form.getId(), etape.id);
    form.setDescription('Après avoir travaillé l’étape dans le parcours, décrivez ce que vous avez réellement fait. Ce dépôt sera relu par A.Zeboudj. Ne saisissez aucun mot de passe ni donnée de client.');
    form.setConfirmationMessage('Votre dépôt est enregistré. Revenez au parcours et cochez « Formulaire envoyé ». Votre enseignant vérifiera la preuve et attribuera les points.');
    form.setCollectEmail(false);
    form.setAllowResponseEdits(false);
    form.setAcceptingResponses(true);
    if (typeof form.setPublished === 'function') form.setPublished(true);
    const expected = [['Nom','text'],['Prénom','text'],['Classe','text'],
      ['Adresse de travail (compte scolaire ou professionnel)','text'], ...etape.questions];
    const present = new Set(form.getItems().map(item => item.getTitle()));
    expected.forEach(q => {
      if (present.has(q[0])) return;
      const item = q[1] === 'paragraph' ? form.addParagraphTextItem() : form.addTextItem();
      item.setTitle(q[0]).setRequired(true);
    });
    if (!form.getDestinationId()) form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    const hasTrigger = ScriptApp.getProjectTriggers().some(t =>
      t.getHandlerFunction() === 'enregistrerDepotOmnicanal' && t.getTriggerSourceId() === form.getId());
    if (!hasTrigger) ScriptApp.newTrigger('enregistrerDepotOmnicanal').forForm(form).onFormSubmit().create();
    urls[etape.id] = form.getPublishedUrl();
    liens.appendRow([etape.titre, urls[etape.id], form.getEditUrl()]);
  });
  const js = 'window.OMNI_FORM_URLS = ' + JSON.stringify(urls, null, 2) + ';';
  liens.getRange(12,1).setValue('Copiez le code de la cellule A13 dans forms-config.js du dépôt GitHub. Ne partagez que les liens élèves.');
  liens.getRange(13,1).setValue(js);
  liens.getRange(13,1).setWrap(true);
  liens.setRowHeight(13,220);
  SpreadsheetApp.flush();
  Logger.log('Tableur privé : ' + ss.getUrl());
  Logger.log('Configuration GitHub :\n' + js);
  return ss.getUrl();
}

function enregistrerDepotOmnicanal(e) {
  if (!e || !e.source || !e.response) throw new Error('À déclencher par un Google Form, pas manuellement.');
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty(OMNI_PROP + e.source.getId());
  const step = OMNI_ETAPES.find(s => s.id === id);
  if (!step) throw new Error('Formulaire inconnu : ' + e.source.getId());
  const ss = SpreadsheetApp.openById(props.getProperty(OMNI_PROP + 'SHEET_ID'));
  const responses = e.response.getItemResponses();
  const answers = {};
  responses.forEach(r => answers[r.getItem().getTitle()] = String(r.getResponse() || '').trim());
  const nom = answers['Nom'] || '', prenom = answers['Prénom'] || '';
  const classe = answers['Classe'] || '';
  const mail = (answers['Adresse de travail (compte scolaire ou professionnel)'] || '').toLowerCase();
  if (!nom || !prenom || !mail) throw new Error('Identité manquante dans le dépôt.');
  const detail = step.questions.map(q => q[0] + ' : ' + (answers[q[0]] || '')).join('\n');
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const depots = ss.getSheetByName('Dépôts');
    depots.appendRow([e.response.getTimestamp(), step.titre, nom, prenom, classe, mail, detail, e.response.getId()]);
    const suivi = ss.getSheetByName('Suivi');
    const last = suivi.getLastRow();
    const rows = last > 1 ? suivi.getRange(2,1,last-1,4).getValues() : [];
    let idx = rows.findIndex(r => String(r[3]).trim().toLowerCase() === mail && String(r[2]).trim().toLowerCase() === classe.toLowerCase());
    let row;
    if (idx < 0) {
      row = last + 1;
      suivi.getRange(row,1,1,4).setValues([[nom, prenom, classe, mail]]);
      suivi.getRange(row,14).setValue(0);
      suivi.getRange(row,15).setFormula('=SUM(E' + row + ':N' + row + ')');
      suivi.getRange(row,16).setFormula('=COUNT(E' + row + ':M' + row + ')');
    } else row = idx + 2;
    const col = OMNI_ETAPES.findIndex(s => s.id === id) + 5;
    const current = Number(suivi.getRange(row,col).getValue()) || 0;
    if (current < 2) suivi.getRange(row,col).setValue(1);
    suivi.getRange(row,17).setValue(e.response.getTimestamp());
  } finally { lock.releaseLock(); }
}
