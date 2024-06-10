"use strict";
const zoneAffichagePokemon = document.querySelector('.image');
const zoneAffichageType = document.querySelector('.imgType');
const card = document.querySelectorAll('.card');
const zoneNomPokemon = document.querySelector('.pokemonName');
const zonePvPokemon = document.querySelector('.PV');
const zoneTalents = document.querySelector('.talents');
const imgTalent1 = document.querySelector('.imgTalent1');
const imgTalent2 = document.querySelector('.imgTalent2');
const zoneTalent1 = document.querySelector('.talent1');
const zoneTalent2 = document.querySelector('.talent2');
const zoneDegat1 = document.querySelector('.degats1');
const zoneDegat2 = document.querySelector('.degats2');
const boutton = document.querySelector('.btnGeneration');
const url = 'https://tyradex.vercel.app/api/v1/gen/1';
let listePokemonGen1 = [];
let listeType = [];
function NombreRandom(max) {
    return Math.floor(Math.random() * max);
}
fetch(url)
    .then((response) => {
    if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
    return response.json();
})
    .then((data) => {
    listePokemonGen1 = data;
    majAffichage();
})
    .catch((error) => {
    console.error('Erreur :', error);
});
boutton.addEventListener('click', () => {
    majAffichage();
});
function majAffichage() {
    listeType = [];
    let nbreRandom = NombreRandom(listePokemonGen1.length);
    nettoyageAncienneCarte();
    infosPokemon(nbreRandom);
}
function nettoyageAncienneCarte() {
    zoneAffichagePokemon.innerHTML = '';
    zoneNomPokemon.innerHTML = '';
    zonePvPokemon.innerHTML = '';
    zoneAffichageType.innerHTML = '';
    imgTalent1.innerHTML = '';
    imgTalent2.innerHTML = '';
}
function infosPokemon(nbreRandom) {
    const nomPokemon = listePokemonGen1[nbreRandom].name.fr;
    const idPokemon = listePokemonGen1[nbreRandom].pokedex_id;
    listeType.push(listePokemonGen1[nbreRandom].types[0].image);
    const imgType = document.createElement('img');
    const img2 = document.createElement('img');
    const img3 = document.createElement('img');
    imgType.setAttribute('src', listeType[0]);
    if (listePokemonGen1[nbreRandom].types.length > 1) {
        listeType.push(listePokemonGen1[nbreRandom].types[1].image);
        img3.setAttribute('src', listeType[1]);
    }
    else {
        img3.setAttribute('src', listeType[0]);
    }
    img2.setAttribute('src', listeType[0]);
    const pvPokemon = listePokemonGen1[nbreRandom].stats.hp;
    const imagePokemon = listePokemonGen1[nbreRandom].sprites.regular;
    const img1 = document.createElement('img');
    img1.setAttribute('src', imagePokemon);
    const talent1 = listePokemonGen1[nbreRandom].talents[0].name;
    const nbrDegats1 = listePokemonGen1[nbreRandom].stats.atk;
    zoneTalent2.innerHTML = '';
    zoneDegat2.innerHTML = '';
    if (listePokemonGen1[nbreRandom].talents.length > 1) {
        const talent2 = listePokemonGen1[nbreRandom].talents[1].name;
        const nbrDegats2 = listePokemonGen1[nbreRandom].stats.spe_atk;
        zoneTalent2.innerHTML = talent2;
        zoneDegat2.innerHTML = `${nbrDegats2} dégâts`;
    }
    // MAJ AFFICHAGE
    zoneNomPokemon.innerHTML = `#${idPokemon} ${nomPokemon}`;
    zoneAffichageType.appendChild(imgType);
    zonePvPokemon.innerHTML = `PV:${pvPokemon}`;
    zoneAffichagePokemon.appendChild(img1);
    imgTalent1.appendChild(img2);
    imgTalent2.appendChild(img3);
    zoneTalent1.innerHTML = talent1;
    zoneDegat1.innerHTML = `${nbrDegats1} dégâts`;
}
card.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
        let elRect = el.getBoundingClientRect();
        let x = e.clientX - elRect.x;
        let y = e.clientY - elRect.y;
        let midCardWidth = elRect.width / 2;
        let midCardHeight = elRect.height / 2;
        let angleY = -(x - midCardWidth) / 15;
        let angleX = (y - midCardHeight) / 15;
        el.children[0].style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
    });
    el.addEventListener('mouseleave', () => {
        el.children[0].style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});
