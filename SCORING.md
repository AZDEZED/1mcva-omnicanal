# Suivi des neuf étapes — 1re MCV A

Le site reste public, mais les noms, adresses et évaluations restent dans un Google Sheet privé, créé sous votre compte Google. Ne publiez pas ce tableur ni les liens d'édition des formulaires.

## Installation (une fois)

1. Ouvrez [script.google.com](https://script.google.com/), créez un projet, collez le contenu de `Creer_Suivi_Omnicanal_1MCVA.gs` dans `Code.gs`, enregistrez et exécutez **`creerSuiviOmnicanal`**. Autorisez les accès demandés pour créer neuf Forms et le Sheet. Si l'exécution s'interrompt, relancez la même fonction : elle reprend les formulaires déjà créés.
2. Ouvrez le tableur « 1MCVA — Suivi privé mission omnicanale » depuis le journal d'exécution. Dans l'onglet « Liens et installation », copiez **tout le contenu de la cellule A13** (code JavaScript).
3. Dans le dépôt GitHub, ouvrez `forms-config.js` → crayon « Edit » → remplacez `window.OMNI_FORM_URLS = {};` par le contenu copié → « Commit changes ». Le site se met à jour après déploiement de GitHub Pages. Vérifiez le lien du premier formulaire sur le site depuis un autre navigateur.

Les neuf liens d'élèves apparaissent aussi dans l'onglet « Liens et installation ». Les liens d'édition sont réservés à l'enseignant. Aucune connexion entre GitHub Pages et les réponses privées n'est nécessaire : les élèves ouvrent les Forms directement.

## Barème et fonctionnement

- Dans « Suivi », E à M correspondent aux neuf étapes. Une réponse Form crée/actualise la ligne de l'élève et inscrit **1** (dépôt en attente). Après lecture de l'onglet « Dépôts » et des réponses détaillées du Form, remplacez par **2** pour valider l'étape. Laissez **0** ou vide si rien n'est recevable. Un nouveau dépôt ne ramène pas une étape déjà validée de 2 à 1.
- N correspond au professionnalisme, à saisir de 0 à 2 par l'enseignant ; O calcule le total sur 20 et P compte les étapes déposées.
- Une coche sur le site et « J'ai envoyé » sont des déclarations locales de l'élève. Elles n'écrivent aucune note et ne prouvent pas un dépôt. Le Sheet est le registre enseignant. Les réponses dans l'onglet « Dépôts » permettent de vérifier la réalité du travail.
- Une même adresse de travail et une même classe rassemblent les dépôts d'un élève. Si l'élève change d'adresse, rapprochez manuellement les lignes après vérification.

## Continuité des données

La clé locale `1MCVA_omni_v1` et le format JSON version 1 restent identiques. Les anciens carnets sont relus automatiquement sur le même navigateur ou importés depuis leur fichier JSON. Les nouvelles cases « formulaire envoyé » sont simplement vides dans les anciens fichiers.

Le premier chargement sans `forms-config.js` renseigné montre un message « lien en préparation ». Publier le site n'envoie aucun formulaire ni aucune note tant que la configuration n'a pas été ajoutée.
