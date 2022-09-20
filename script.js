
function requete_mot_alea() {
    let url_requete = 'https://random-word-api.herokuapp.com/word';
    let requete = new XMLHttpRequest();
    requete.open('GET', url_requete);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function () {
        const mot = requete.response;
        requete_dictionnaire(mot)
    }
}


function requete_dictionnaire(mot) {
    let url_requete = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + mot;
    let requete = new XMLHttpRequest();
    requete.open('GET', url_requete);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function () {
        const trad = requete.response;
        let p_mot_presente = document.getElementById('mot_presente');
        let p_definition = document.getElementById('definition');
        try {
            let def = trad[0]['meanings'][0]['definitions'][0]['definition'];
            p_mot_presente.innerHTML = mot;
            p_definition.innerHTML = def
          } catch (error) {
            requete_mot_alea()
          }

        
    }
}


requete_mot_alea()

