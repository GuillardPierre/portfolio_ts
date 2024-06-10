function choixAdversaire() {
	const adversaire = nombreRandom(3);
	return adversaire;
}

// Fonction pour choisir un nombre aléatoire
function nombreRandom(max: number) {
	return Math.floor(Math.random() * max);
}

let choixJoueur: number;
let victoire = 0;
let partiesJouees = 0;

const images = [
	{ src: '/images/PFC/rock.png', alt: 'pierre' },
	{ src: '/images/PFC/Hand.png', alt: 'feuille' },
	{ src: '/images/PFC/scissor.png', alt: 'ciseaux' },
];

const mesBoutons = [
	document.getElementById('0'),
	document.getElementById('1'),
	document.getElementById('2'),
];

const slotScore = document.getElementById('score');
function majScore() {
	if (!slotScore) {
		console.log("Erreur lors de la récupération de l'élément SlotScore");
	} else {
		const texteScore = `Votre score est de : ${victoire} / ${partiesJouees}`;
		slotScore.innerHTML = texteScore;
	}
}

mesBoutons.forEach((bouton) => {
	if (!bouton) {
		console.log("Erreur lors de la récupération de l'élément bouton");
	} else {
		bouton.addEventListener('click', () => {
			choixJoueur = parseInt(bouton.id);
			const slotJoueur = document.getElementById('resultat');

			if (choixJoueur !== null) {
				const spanVS = document.createElement('span');
				spanVS.innerText = 'VS';
				const imageJoueur = document.createElement('img');
				imageJoueur.src = images[choixJoueur].src;
				imageJoueur.alt = images[choixJoueur].alt;
				imageJoueur.id = 'joueur';
				const adversaire = choixAdversaire();
				const imageAdversaire = document.createElement('img');
				imageAdversaire.src = images[adversaire].src;
				imageAdversaire.alt = images[adversaire].alt;
				imageAdversaire.id = 'adversaire';

				if (!slotJoueur) {
					console.log('Erreur lors de la récupération de slotJoueur');
				} else {
					while (slotJoueur.firstChild) {
						slotJoueur.removeChild(slotJoueur.firstChild);
					}
					slotJoueur.appendChild(imageJoueur);
					slotJoueur.appendChild(spanVS);
					slotJoueur.appendChild(imageAdversaire);

					if (imageJoueur === null) {
						alert('partie annulée');
					} else if (imageAdversaire.alt === imageJoueur.alt) {
						slotJoueur.style.background = 'orange';
					} else if (
						(imageJoueur.alt === 'pierre' &&
							imageAdversaire.alt === 'feuille') ||
						(imageJoueur.alt === 'feuille' &&
							imageAdversaire.alt === 'ciseaux') ||
						(imageJoueur.alt === 'ciseaux' && imageAdversaire.alt === 'pierre')
					) {
						slotJoueur.style.background = 'red';
						partiesJouees++;
						majScore();
					} else {
						slotJoueur.style.background = 'green';
						partiesJouees++;
						victoire++;
						majScore();
					}
				}
			}
		});
	}
});
