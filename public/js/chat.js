const app = {
	user: null,
	messagesZone: document.querySelector('.messagesFeed'),
	formZone: document.querySelector('.inputZone'),
	btnSendMessage: document.querySelector('.sendMessage'),

	otherMessageClone: document.querySelector('#otherMessage'),

	async init() {
		if (document.querySelector('.inputZone')) {
			app.formZone.addEventListener('submit', app.sendMessage);
		}
		await app.getAllMessages();
	},

	async getAllMessages() {
		const messages = await API.getAllMessagesAPI();
		app.user = await API.getUser();
		messages.allMessages.forEach((message) => {
			if (!app.user) {
				app.displayMessageInDom(message, 'otherMessage');
			} else if (message.user_name === app.user.user) {
				app.displayMessageInDom(message, 'yourMessage');
			} else {
				app.displayMessageInDom(message, 'otherMessage');
			}
			app.messagesZone.scrollTop = app.messagesZone.scrollHeight;
		});
	},

	displayMessageInDom(json, position) {
		const messageTemplate = document.querySelector('#message');
		const messageClone = document.importNode(messageTemplate.content, true);
		if (position === 'yourMessage') {
			messageClone.querySelector('.message').classList.add('yourMessage');
			messageClone.querySelector('.message').style.backgroundColor = '#FFA500';
		} else {
			messageClone.querySelector('.message').classList.add('otherMessage');
			messageClone.querySelector('.message').style.backgroundColor = '#DACDF1';
		}
		const strong = document.createElement('strong');
		strong.textContent = `${json.user_name}:`;
		messageClone.querySelector('.author').append(strong);
		messageClone.querySelector('.textContent').textContent = json.content;
		app.messagesZone.append(messageClone);
	},

	async sendMessage(evt) {
		evt.preventDefault();
		const formData = new FormData(evt.target);
		const rep = await API.sendMessageToAPI(formData);
		if (rep.statusCode === 201) {
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			const object = await JSON.parse(json);
			object.user_name = app.user.user;
			app.displayMessageInDom(object, 'yourMessage');
			app.messagesZone.scrollTop = app.messagesZone.scrollHeight;
		}
	},
};

const API = {
	async getAllMessagesAPI() {
		try {
			const rep = await fetch(
				// `https://pierrofeu.alwaysdata.net/api/message`,
				'http://localhost:3000/api/message'
			);
			const json = rep.json();
			if (!rep.ok) {
				throw json;
			}
			return json;
		} catch (error) {
			return error;
		}
	},

	async sendMessageToAPI(formData) {
		try {
			const rep = await fetch(
				// `https://pierrofeu.alwaysdata.net/api/message`,
				'http://localhost:3000/api/message',
				{
					method: 'POST',
					// headers: {
					// 	'Content-Type': 'application/json',
					// },
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
			return null;
		}
	},

	async getUser() {
		try {
			const rep = await fetch(
				//`https://pierrofeu.alwaysdata.net/getUser`,
				'http://localhost:3000/getUser'
			);
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

document.addEventListener('DOMContentLoaded', app.init());
