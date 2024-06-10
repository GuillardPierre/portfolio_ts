"use strict";
const zoneMotADeviner2 = document.querySelector('.motADeviner2');
const zoneImage = document.querySelector('#imageDuJeu');
const btnsLettre = document.querySelectorAll('.boiteLettre img');
const zoneReponseProposition = document.getElementById('zoneReponseProposition');
const popup = document.querySelector('.popup');
const zoneResultat = document.querySelector('.resultat');
const btnPopup = document.querySelector('.nouveauMot');
let nombre;
let motADeviner = '';
let mot = '';
let lettreProposee = [];
let numeroImg = 0;
let essai = 11;
let listeMots = [
    'PARAPLUIE',
    'GRENOUILLE',
    'CHOCOLAT',
    'ORDINATEUR',
    'MONSTRE',
    'GUITARE',
    'PAPILLON',
    'COCCINELLE',
    'SOURIS',
    'ETOILE',
    'CROISSANT',
    'VOYAGE',
    'CASCADE',
    'TRAMPOLINE',
    'BAGUETTE',
    'FLEUR',
    'MONTAGNE',
    'BOUGIE',
    'CHAUSSURE',
    'LYNX',
    'PYJAMA',
    'LYCÉE',
    'GYMNASIUM',
    'MYSTERE',
];
function nbrHasard(liste) {
    //pour générer un nombre aléatoire dans la liste de mots de départ
    return Math.floor(Math.random() * liste.length);
}
function affichageMotCache(mot) {
    //Pour suivre l'avancée des lettres trouvées (pas visible par l'utilisateur)
    let motVide = '';
    for (let i = 0; i < mot.length; i++) {
        let lettreAAjouter = '_';
        motVide = motVide + lettreAAjouter;
    }
    return motVide;
}
function affichageMotCache2(mot) {
    // ¨Pour créer les cases où iront se mettre les futurs lettres"
    zoneMotADeviner2.innerHTML = '';
    for (let i = 0; i < mot.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'lettreVide');
        newDiv.setAttribute('id', i);
        zoneMotADeviner2.appendChild(newDiv);
    }
}
function majImage() {
    // pour mettre à jour l'image du pendu pour chaque erreur.
    if (zoneImage.children.length > 0) {
        zoneImage.removeChild(zoneImage.firstElementChild);
        let img = document.createElement('img');
        img.setAttribute('src', `/images/pendu/${numeroImg}.png`);
        zoneImage.appendChild(img);
    }
    else {
        let img = document.createElement('img');
        img.setAttribute('src', `/images/pendu/${numeroImg}.png`);
        zoneImage.appendChild(img);
    }
}
function majLettreUnique(position, lettre) {
    // pour rajouter les lettres trouvées sur le mot à deviner.
    let lettreTrouvee = document.getElementById(position);
    if (lettreTrouvee.children.length > 0) {
        lettreTrouvee.removeChild(lettreTrouvee.firstElementChild);
    }
    lettreTrouvee.style.border.display = 'none';
    let imgAAjouter = document.createElement('img');
    imgAAjouter.setAttribute('src', `/images/pendu/${lettre.toLowerCase()}.png`);
    lettreTrouvee.appendChild(imgAAjouter);
}
function proposition(mot) {
    affichageMotCache2(mot);
    motADeviner = affichageMotCache(mot);
}
btnsLettre.forEach((image) => {
    image.addEventListener('click', (e) => {
        let choixJoueur = e.target.classList[0];
        let lettrePresente = false;
        choixJoueur = choixJoueur.toUpperCase();
        for (let i = 0; i < mot.length; i++) {
            if (choixJoueur === mot[i]) {
                // si lettre cliquée et trouvée dans le mot
                let lettreTrouvee = document.getElementById(i);
                lettreTrouvee = lettreTrouvee.id;
                majLettreUnique(lettreTrouvee, mot[i]);
                motADeviner =
                    motADeviner.substring(0, i) +
                        choixJoueur +
                        motADeviner.substring(i + 1);
                lettrePresente = true;
                e.target.style.backgroundColor = 'green';
            }
        }
        if (lettrePresente === false) {
            // si lettre cliquée mais pas trouvée dans le mot
            lettreProposee.push(' ' + choixJoueur);
            e.target.style.backgroundColor = 'red';
            essai--;
            numeroImg++;
            majImage();
        }
        if (motADeviner === mot) {
            const txt = `🎉🎉🎉 Bravo ! Tu as trouvé en ${11 - essai} essais!`;
            zoneResultat.innerHTML = txt;
            popup.style.display = 'block';
            listeMots.splice(nombre, 1);
            btnPopup.addEventListener('click', () => {
                generationMot();
            });
        }
        else if (essai === 0) {
            const txt = `C'est perdu 😭😭😭 le mot était ${mot}`;
            zoneResultat.innerHTML = txt;
            popup.style.display = 'block';
            listeMots.splice(nombre, 1);
            btnPopup.addEventListener('click', () => {
                generationMot();
            });
        }
    });
});
function generationMot() {
    if (listeMots.length === 0) {
        const txt = `Félicitations tu as trouvé tous les mots !`;
        zoneResultat.innerHTML = txt;
        popup.style.display = 'block';
    }
    else {
        popup.style.display = 'none';
        motADeviner = '';
        lettreProposee = [];
        numeroImg = 0;
        essai = 11;
        majImage();
        btnsLettre.forEach((element) => {
            element.style.backgroundColor = 'white';
        });
        nombre = nbrHasard(listeMots);
        mot = listeMots[nombre];
        proposition(listeMots[nombre]);
    }
}
generationMot();
majImage();
