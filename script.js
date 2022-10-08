let mot_global;

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
        mot_global = mot;
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
        // Récupération dans le DOM
        let p_mot_presente = document.getElementById('mot_presente');
        let p_definition = document.getElementById('definition');
        let p_type = document.getElementById('type');
        // Try
        try {
            const trad = requete.response[0]['meanings'];
            // Récupération de la définition
            let def = trad[0]['definitions'][0]['definition'];

            console.log( trad[0]['definitions'])

            let type = strUcFirst(trad[0]['partOfSpeech'])

            // Majuscule à la première lettre
            mot = strUcFirst(mot[0]);
            // == Affichage du mot et de la définition
            p_mot_presente.innerHTML = mot;
            p_type.innerHTML = type;
            p_definition.innerHTML = def
        // Erreur
        } catch (error) {
            // Recherche d'un autre mot
            requete_mot_alea()
        }
    }
}

function prononciation_mot() {
    if ('speechSynthesis' in window) {
        let mot = new SpeechSynthesisUtterance();
        mot.text = mot_global;
        mot.lang = "en";


        // Prononce le mot
        window.speechSynthesis.speak(mot);

       } else {
        // Le navigateur ne supporte pas le text-to-speech
        alert("Votre navigateur ne supporte pas la fonction text-to-speech.");

       }
}


window.addEventListener('load',() => {
    let div_host = document.getElementsByTagName("div")
    console.log(div_host)

    requete_mot_alea()
  });


