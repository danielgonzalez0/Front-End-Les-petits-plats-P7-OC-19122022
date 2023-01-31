# Formation Développeur Front-End Javascript / react (OpenClassroom)

## Projet 8 - Les petits Plats

Description du projet : <br>
Projet n°8 du parcours Développeur Front-End qui consiste à développer un algorithme de recherche en Javascript

#### Information du debut du projet :

1. Il est conseillé d'utiliser VisualStudio Code
2. Il n'y a aucune dépendance ;
3. Vous ne devez utiliser que du CSS personnalisé et du JavaScript pur, sans jQuery, Bootstrap ou autre librairie.

### Cahiers des charges :

1. Créer interface application à partir de la maquette donnée: 
https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?node-id=0%3A1&t=xpehqhUqWBmAhJKi-0
2. Planifier 2 versions de la fonctionnalité de recherche (boucles natives et méthodes array)
3. remplir le document d'investigation de la fonctionnalité (avantages, inconvénients, tests,...)
4. faire un algorigramme sur la fonctionnalité de recherche
5. implémenter les 2 versions de la fonctionnalité sur des branches séparés
6. respecter les informations techniques du document de cas d'utilisation
7. tester les performances et compléter le document d'investigation avec la recommandation finale
8. vérifier son code avec un linter

### Version web du projet disponible 

https://danielgonzalez0.github.io/Front-End-Les-petits-plats-P7-OC-19122022/

### installation et utilisation eslint

étape installation: 

- commande installation: npm install eslint --save-dev
- commande config: npx eslint --init
- choisir json pour le fichier .eslintrc dans config
- ajouter les lignes suivantes dans package.json

{
  "scripts": {
    "lint": "eslint ." 
  }
}

- créer un gitignore avec node_modules/
- commande pour executer:  npm run lint