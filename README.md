# Application de Vérification d'Entreprise - SIRET

Cette application web permet de rechercher des informations détaillées sur une entreprise à partir de son numéro SIRET. En utilisant l'API de l'INSEE, l'application récupère des données pertinentes et calcule également le numéro de TVA intracommunautaire associé à l'entreprise.

## Sommaires

- [Technologies Utilisées](#technologies-utilisées)
- [Fonctionnalités](#fonctionnalités)
- [Utilisation](#utilisation)

## Technologies Utilisées

- **HTML** :computer: : pour la structure de la page web.
- **CSS** :art: : pour la mise en forme et le design de l'interface utilisateur.
- **JavaScript** :globe_with_meridians: : pour la logique d'interaction et l'appel à l'API.
- **API INSEE** :satellite: : pour récupérer les informations sur les entreprises.

## Fonctionnalités

- **Validation du SIRET** : Vérifie que le numéro SIRET est valide (14 chiffres) avant d'effectuer la recherche.
- **Recherche via API** : Récupère les informations de l'entreprise à partir de l'API de l'INSEE, incluant :
  - Nom de l'entreprise
  - Adresse
  - Activité principale
  - Effectifs
  - Statut (Siège ou Non)
- **Affichage des Résultats** : Présente les détails de l'entreprise de manière claire et structurée dans l'interface utilisateur.
- **Calcul du Numéro de TVA** : Calcule et affiche le numéro de TVA intracommunautaire associé au SIRET fourni.

## Utilisation

Pour utiliser l'application, il suffit de saisir un numéro SIRET valide et de soumettre le formulaire. Voici un exemple de code JavaScript utilisé pour traiter la soumission du formulaire :

```javascript
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut
    const siretInput = document.getElementById('siret').value;
    // ... (autres instructions)
});
