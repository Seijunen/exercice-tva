document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const siretInput = document.getElementById('siret').value;
    const apiKey = '6780d82a-a801-474a-80d8-2aa801974a53';
    const apiUrl = `https://api.insee.fr/api-sirene/3.11/siret/${siretInput}`;

    // Validation du SIRET
    if (siretInput.length !== 14 || isNaN(siretInput)) {
        alert("Veuillez entrer un numéro SIRET valide (14 chiffres).");
        return;
    }

    // Calcul et affichage du numéro de TVA
    afficherTVA(siretInput);

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'X-INSEE-Api-Key-Integration': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: Impossible de récupérer les données`);
        }
        return response.json();
    })
    .then(data => {
        const etablissement = data.etablissement;
        const uniteLegale = etablissement.uniteLegale;
        const adresse = etablissement.adresseEtablissement;

        // Affichage des informations dans la console
        console.log(`Nom de l'entreprise: ${uniteLegale.denominationUniteLegale}`);
        console.log(`SIRET: ${etablissement.siret}`);
        console.log(`Adresse: ${adresse.numeroVoieEtablissement} ${adresse.typeVoieEtablissement} ${adresse.libelleVoieEtablissement}, ${adresse.codePostalEtablissement} ${adresse.libelleCommuneEtablissement}`);
        console.log(`Activité principale: ${uniteLegale.activitePrincipaleUniteLegale}`);
        console.log(`Effectifs: ${uniteLegale.trancheEffectifsUniteLegale}`);
        console.log(`Statut: ${etablissement.etablissementSiege ? 'Siège' : 'Non siège'}`);

        // Affichage dans le DOM
        document.getElementById('result').innerHTML = `
            <h3>Résultats de la recherche</h3>
            <p><strong>Nom de l'entreprise:</strong> ${uniteLegale.denominationUniteLegale}</p>
            <p><strong>SIRET:</strong> ${etablissement.siret}</p>
            <p><strong>Adresse:</strong> ${adresse.numeroVoieEtablissement} ${adresse.typeVoieEtablissement} ${adresse.libelleVoieEtablissement}, ${adresse.codePostalEtablissement} ${adresse.libelleCommuneEtablissement}</p>
            <p><strong>Activité principale:</strong> ${uniteLegale.activitePrincipaleUniteLegale}</p>
            <p><strong>Effectifs:</strong> ${uniteLegale.trancheEffectifsUniteLegale} (Année: ${uniteLegale.anneeEffectifsUniteLegale})</p>
            <p><strong>Statut:</strong> ${etablissement.etablissementSiege ? 'Siège' : 'Non siège'}</p>
        `;
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la récupération des données.');
    });
});

// Fonction pour calculer le numéro de TVA intracommunautaire à partir du SIRET
function calculerTVAIntracommunautaire(siret) {
    // Vérifier que le SIRET est valide (14 chiffres)
    if (!/^\d{14}$/.test(siret)) {
        return "Numéro de SIRET invalide";
    }

    // Extraire le SIREN (les 9 premiers chiffres du SIRET)
    const siren = siret.substring(0, 9);

    // Calculer la clé de contrôle
    const cle = (12 + 3 * (siren % 97)) % 97;

    // Formater le numéro de TVA intracommunautaire
    return `FR${cle.toString().padStart(2, '0')}${siren}`;
}

// Fonction pour calculer et afficher le numéro de TVA
function afficherTVA(siret) {
    // Calculer le numéro de TVA intracommunautaire
    const resultatTVA = calculerTVAIntracommunautaire(siret);
    console.log("ResultatTva :", resultatTVA);

    // Afficher le résultat dans le paragraphe avec l'id "resultat"
    document.getElementById("resultat").innerHTML = `<p><strong>Numéro de TVA intracommunautaire:</strong> ${resultatTVA}</p>`;
}
