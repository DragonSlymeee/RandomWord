// Mise en majuscule
function strUcFirst(a) {
    return (a + '').charAt(0).toUpperCase() + a.substr(1);
}


// Retourne un mot aléatoire
function requete_mot_alea() {
    // Requete API
    let url_requete = 'https://random-word-api.herokuapp.com/word';
    let requete = new XMLHttpRequest();
    requete.open('GET', url_requete);
    requete.responseType = 'json';
    requete.send();
    // Réception de l'API
    requete.onload = function () {
        const mot = requete.response;
        // Recherche dans le dictionnaire
        requete_dictionnaire(mot)
    }
}


// Recherche dans le dictionnaire
function requete_dictionnaire(mot) {
    // Requete API
    let url_requete = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + mot;
    let requete = new XMLHttpRequest();
    requete.open('GET', url_requete);
    requete.responseType = 'json';
    requete.send();
    // Réception de l'API
    requete.onload = function () {
        const trad = requete.response;
        // Récupération dans le DOM
        let p_mot_presente = document.getElementById('mot_presente');
        let p_definition = document.getElementById('definition');
        // Try
        try {
            // Récupération de la définition
            let def = trad[0]['meanings'][0]['definitions'][0]['definition'];
            // Majuscule à la première lettre
            mot = strUcFirst(mot[0]);
            // == Affichage du mot et de la définition
            p_mot_presente.innerHTML = mot;
            p_definition.innerHTML = def
        // Erreur
        } catch (error) {
            // Recherche d'un autre mot
            requete_mot_alea()
        }
    }
}


window.addEventListener('load',() => {
    requete_mot_alea()
  });


