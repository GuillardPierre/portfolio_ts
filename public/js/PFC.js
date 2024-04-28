function choixAdversaire() {
	let adversaire = nombreRandom(3);
	return adversaire;
}

// Fonction pour choisir un nombre aléatoire
function nombreRandom(max) {
	return Math.floor(Math.random() * max);
}

let choixJoueur = 'bug';
let victoire = 0;
let partiesJouees = 0;

let images = [
	{ src: '/images/PFC/rock.png', alt: 'pierre' },
	{ src: '/images/PFC/Hand.png', alt: 'feuille' },
	{ src: '/images/PFC/scissor.png', alt: 'ciseaux' },
];

let mesBoutons = [
	document.getElementById('0'),
	document.getElementById('1'),
	document.getElementById('2'),
];

let slotScore = document.getElementById('score');
function majScore() {
	let texteScore = `Votre score est de : ${victoire} / ${partiesJouees}`;
	slotScore.innerHTML = texteScore;
}

mesBoutons.forEach((boutons) => {
	boutons.addEventListener('click', () => {
		choixJoueur = boutons.id;
		let slotJoueur = document.getElementById('resultat');

		if (choixJoueur !== 'bug') {
			let spanVS = document.createElement('span');
			spanVS.innerText = 'VS';
			let imageJoueur = document.createElement('img');
			imageJoueur.src = images[choixJoueur].src;
			imageJoueur.alt = images[choixJoueur].alt;
			imageJoueur.id = 'joueur';
			let adversaire = choixAdversaire();
			console.log(adversaire);
			let imageAdversaire = document.createElement('img');
			imageAdversaire.src = images[adversaire].src;
			imageAdversaire.alt = images[adversaire].alt;
			imageAdversaire.id = 'adversaire';
			console.log(imageAdversaire.alt);

			while (slotJoueur.firstChild) {
				slotJoueur.removeChild(slotJoueur.firstChild);
			}
			slotJoueur.appendChild(imageJoueur);
			slotJoueur.appendChild(spanVS);
			slotJoueur.appendChild(imageAdversaire);

			if (imageJoueur === 'bug') {
				alert('partie annulée');
			} else if (imageAdversaire.alt === imageJoueur.alt) {
				console.log('égalité');
				slotJoueur.style.background = 'orange';
			} else if (
				(imageJoueur.alt === 'pierre' && imageAdversaire.alt === 'feuille') ||
				(imageJoueur.alt === 'feuille' && imageAdversaire.alt === 'ciseaux') ||
				(imageJoueur.alt === 'ciseaux' && imageAdversaire.alt === 'pierre')
			) {
				console.log('perdu');
				slotJoueur.style.background = 'red';
				partiesJouees++;
				majScore();
			} else {
				console.log('gagné');
				slotJoueur.style.background = 'green';
				partiesJouees++;
				victoire++;
				majScore();
			}
		}
	});
});
