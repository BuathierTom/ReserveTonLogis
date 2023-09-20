
# ReserveTonLogis

Le site que nous devons réaliser est un site de gestions de réservations de 3 chambres d’hôtes chez un particulier. Le site doit être dynamique et permettre de réserver une chambre avec des prix différents en fonction des saisons. 


## Fonctionnalités Principales :

- Gestion des Réservations : Le site permet aux visiteurs de consulter la disponibilité des trois chambres d'hôtes et de réserver en fonction de leurs préférences en termes de dates, durée du séjour et nombre de personnes.

 - Tarification Dynamique : Le prix des chambres varie en fonction de la période et du nombre de personnes. Les visiteurs peuvent voir le tarif en temps réel lors de la réservation.

 - Galerie Photos : Une galerie de photos attrayante présente les chambres, les espaces communs et l'environnement extérieur pour donner aux visiteurs une idée précise de leur séjour potentiel.

 - Activités Proposées : Une section dédiée présente les activités locales, les attractions touristiques, et les expériences uniques que les visiteurs peuvent apprécier pendant leur séjour.

- Météo Locale : Le site intègre une fonctionnalité qui affiche les prévisions météorologiques locales lors de la réservation, aidant ainsi les visiteurs à prévoir leur voyage en conséquence.

 - Itinéraires et Bornes Électriques : Un itinéraire pour permettre au client de se rendre au Gite en fonction de sa localisation.
 
 - Calendrier de réservation : Un calendrier avec les disponibilités de réservation des chambres avec les dates disponibles. 
 
- Connexion/Inscription : Le client va pouvoir créer un compte et avec ce compte il pourra voir le nombre de réservation qu’il a déjà fais dans le Gite. Toutes les données seront sécurisé afin de respecter le RGPD.

 - Contacter le propriétaire : Le client peut contacter le propriétaire en toute circonstance en cas de question sur les chambres ou autre.

 - Données personnelles : Le client pourra modifier ses information personnelles en cas de besoin.




## Besoin du client :

Notre client a émis plusieurs exigences pour ce site de réservation :

  - Pouvoir choisir une chambre d’après une galerie de photo
  - Pouvoir réserver une chambre suivant un planning de réservation
  - Le prix doit s’afficher en fonction de la chambre choisie, le nombre de jours, le nombre de personnes et la période de l’année.
  - Lors de la consultation des chambres, pouvoir connaître la météo du jour (avec une API)
  - Pourvoir se rendre au Gîte avec un itinéraire à l’internaute en lui demandant sa localisation (toujours et encore avec une API)
 - Rajouter une force lors de la création du mot de passe
 - Ajouter un capcha lors de la connexion/inscription pour éviter les spams
 - Envoyer un email de confirmation de compte

 


## Actions techniques :

- _Actions obligatoires :_

    - Séparation des fichiers d’un composant
    - Pages, services, composants
    - « CVE » interdites.
    - Utilisation de token JWT
    - Le Cross-Origin Resource Sharing (CORS)
    - Variabiliser vos variables d’environnement.
    - Chiffrer et protéger les données sensibles.

- _Actions fortements recommandées :_

    - Utilisation VueJS 3
    - Utilisation ExpressJS
    - Séparer les responsabilités
    - Séparer les routes, controllers

- _Bonne pratique à suivre_

    - Variabiliser vos constantes en SCSS

## Les améliorations proposées :

Pour notre site, nous avons proposés plusieurs améliorations à notre client :

- Un pop-up pour permettre à l’utilisateur du site d’avoir une suggestion personnalisée en fonction des réservations qu’il a déjà passé dans le Gîte.
- La structure de la base de données
- La typographie avec la palette de couleurs
- Le squelette des pages web (Wireframes) ainsi que les maquettes
- Utilisation de React pour le Front et de TypeScript pour le Back


## Auteurs :

- [@BuathierTom](https://github.com/BuathierTom)
- [@adriengmbt](https://github.com/adriengmbt)
- [@crepincorentin](https://github.com/crepincorentin)
- [@Mayel16](https://github.com/Mayel16)

