const app = {
	init() {
		app.signup();
		app.login();
		document.querySelector('.main__login').classList.toggle('is-hidden');
	},

	async signup() {
		const signupBtn = document
			.querySelector('.main__signup--btn')
			.closest('form');
		signupBtn.addEventListener('submit', async (event) => {
			event.preventDefault();
			const formData = new FormData(event.target);
			const rep = await apiCall.newUser(formData);
			if (rep.statusCode === 201) {
				app.hideOrShowNotification();
				document.querySelector('.notification p').textContent = rep.message;
				app.changeTheForm;
			} else {
				app.hideOrShowNotification();
				document.querySelector('.notification p').textContent = rep.message;
			}
		});
		document
			.querySelector('.main__signup--btnAlreadyAccount')
			.addEventListener('click', (event) => {
				event.preventDefault();
				app.changeTheForm();
			});
	},

	async login() {
		const loginBtn = document
			.querySelector('.main__login--btn')
			.closest('form');
		loginBtn.addEventListener('submit', async (event) => {
			event.preventDefault();
			const formData = new FormData(event.target);
			const rep = await apiCall.connectUser(formData);
			console.log(rep);
			if (rep.statusCode === 200) {
				document.location.href = '/';
			} else {
				app.hideOrShowNotification();
				document.querySelector('.notification p').textContent = rep.message;
			}
		});
		document
			.querySelector('.main__login--btnNoAccount')
			.addEventListener('click', (event) => {
				event.preventDefault();
				app.changeTheForm();
			});
	},

	changeTheForm() {
		document.querySelector('.main__signup').classList.toggle('is-hidden');
		document.querySelector('.main__login').classList.toggle('is-hidden');
	},

	hideOrShowNotification() {
		document.querySelector('.notification').classList.toggle('is-hidden');
	},
};

const apiCall = {
	async newUser(formData) {
		try {
			const rep = await fetch(
				`https://pierrofeu.alwaysdata.net/api/signup`,
				// 'http://localhost:3000/api/signup',
				{
					method: 'POST',
					body: formData,
				}
			);
			const json = await rep.json();
			if (!rep.ok) {
				throw json;
			}
			return json;
		} catch (error) {
			console.log(error);
			return error;
		}
	},

	async connectUser(formData) {
		try {
			const rep = await fetch(
				`https://pierrofeu.alwaysdata.net/api/login`,
				// 'http://localhost:3000/api/login',
				{
					method: 'POST',
					body: formData,
				}
			);
			const json = await rep.json();
			if (!rep.ok) {
				throw json;
			}
			console.log(json);
			return json;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};

document.addEventListener('DOMContentLoaded', app.init);
