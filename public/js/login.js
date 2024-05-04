const app = {
	init() {
		app.signup();
		app.login();
		document.querySelector('.main__login').classList.toggle('is-hidden');
	},

	signup() {
		const signupBtn = document
			.querySelector('.main__signup--btn')
			.closest('form');
		console.log(signupBtn);
		signupBtn.addEventListener('submit', (event) => {
			event.preventDefault();
			const formData = new FormData(event.target);
			apiCall.newUser(formData);
			console.log(JSON.stringify(Object.fromEntries(formData)));
		});
		document
			.querySelector('.main__signup--btnAlreadyAccount')
			.addEventListener('click', (event) => {
				event.preventDefault();
				const signupForm = event.target.closest('.main__signup');
				signupForm.classList.toggle('is-hidden');
				document.querySelector('.main__login').classList.toggle('is-hidden');
			});
	},

	login() {
		const loginBtn = document
			.querySelector('.main__login--btn')
			.closest('form');
		console.log(loginBtn);
		loginBtn.addEventListener('submit', (event) => {
			event.preventDefault();
			const formData = new FormData(event.target);
			apiCall.connectUser(formData);
			console.log(JSON.stringify(Object.fromEntries(formData)));
		});
		document
			.querySelector('.main__login--btnNoAccount')
			.addEventListener('click', (event) => {
				event.preventDefault();
				const loginForm = event.target.closest('.main__login');
				loginForm.classList.toggle('is-hidden');
				document.querySelector('.main__signup').classList.toggle('is-hidden');
			});
	},
};

const apiCall = {
	async newUser(formData) {
		try {
			const rep = await fetch(`http://pierrofeu.alwaysdata.net/api/user`, {
				method: 'POST',
				body: formData,
			});
			const json = await rep.json();
			if (!rep.ok) {
				throw json;
			}
			return json;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async connectUser(formData) {
		try {
			const rep = await fetch(`http://pierrofeu.alwaysdata.net/api/user`, {
				method: 'GET',
				body: formData,
			});
			const json = await rep.json();
			if (!rep.ok) {
				throw json;
			}
			return json;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};

document.addEventListener('DOMContentLoaded', app.init);
