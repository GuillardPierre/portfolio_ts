const app = {
	user: null,
	messagesZone: document.querySelector('.messagesFeed'),
	inputZone: document.querySelector('.inputZone'),
	btnSendMessage: document.querySelector('.sendMessage'),

	otherMessageClone: document.querySelector('#otherMessage'),

	async init() {
		app.btnSendMessage.addEventListener('click', API.sendMessageToAPI);
		const messages = await API.getAllMessagesAPI();
		app.user = await API.getUser();
		console.log(messages.allMessages, app.user);
		// TODO => Gestion si le status code renvoyé par user est 401 ou 200
		messages.allMessages.forEach((message) => {
			if (message.user_name === app.user) {
				app.makeMessageInDom(message, 'yourMessage');
			} else {
				app.makeMessageInDom(message, 'otherMessage');
			}
		});
	},

	refreshMessages() {},

	makeMessageInDom(json, position) {
		const messageTemplate = document.querySelector('#message');
		console.log(messageTemplate);
		const yourMessageClone = document.importNode(messageTemplate.content, true);
		console.log(yourMessageClone);
		if (position === 'yourMessage') {
			yourMessageClone.querySelector('.message').classList.add('yourMessage');
		} else {
			yourMessageClone.querySelector('.message').classList.add('otherMessage');
		}
		yourMessageClone.querySelector('[slot="author"]').content = json.user_name;
		yourMessageClone.querySelector('[slot="content"]').content = json.content;
		console.log(app.messagesZone);
		app.messagesZone.append(yourMessageClone);
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
			console.log(error);
			return error;
		}
	},

	async sendMessageToAPI(json) {
		try {
			const rep = await fetch(
				// `https://pierrofeu.alwaysdata.net/api/message`,
				'http://localhost:3000/api/message',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: json,
				}
			);
		} catch (error) {
			console.log(error);
			return error;
		}
	},

	async getUser() {
		try {
			const rep = await fetch(
				//`https://pierrofeu.alwaysdata.net/getUser`,
				'http://localhost:3000/getUser'
			);
			const json = await rep.json();
			console.log(rep);
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
