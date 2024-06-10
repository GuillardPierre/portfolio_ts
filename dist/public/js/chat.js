"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const app = {
    user: null,
    messagesZone: document.querySelector('.messagesFeed'),
    formZone: document.querySelector('.inputZone'),
    btnSendMessage: document.querySelector('.sendMessage'),
    otherMessageClone: document.querySelector('#otherMessage'),
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (document.querySelector('.inputZone')) {
                app.formZone.addEventListener('submit', app.sendMessage);
            }
            yield app.getAllMessages();
            setInterval(app.refresh, 10000);
        });
    },
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            app.messagesZone.innerHTML = '';
            const messages = yield API.getAllMessagesAPI();
            messages.allMessages.forEach((message) => {
                if (!app.user) {
                    app.displayMessageInDom(message, 'otherMessage');
                }
                else if (message.user_name === app.user.user) {
                    app.displayMessageInDom(message, 'yourMessage');
                }
                else {
                    app.displayMessageInDom(message, 'otherMessage');
                }
                app.messagesZone.scrollTop = app.messagesZone.scrollHeight;
            });
        });
    },
    getAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield API.getAllMessagesAPI();
            app.user = yield API.getUser();
            messages.allMessages.forEach((message) => {
                if (!app.user) {
                    app.displayMessageInDom(message, 'otherMessage');
                }
                else if (message.user_name === app.user.user) {
                    app.displayMessageInDom(message, 'yourMessage');
                }
                else {
                    app.displayMessageInDom(message, 'otherMessage');
                }
                app.messagesZone.scrollTop = app.messagesZone.scrollHeight;
            });
        });
    },
    displayMessageInDom(json, position) {
        const messageTemplate = document.querySelector('#message');
        const messageClone = document.importNode(messageTemplate.content, true);
        if (position === 'yourMessage') {
            messageClone.querySelector('.message').classList.add('yourMessage');
            messageClone.querySelector('.message').style.backgroundColor = '#FFA500';
        }
        else {
            messageClone.querySelector('.message').classList.add('otherMessage');
            messageClone.querySelector('.message').style.backgroundColor = '#DACDF1';
        }
        const strong = document.createElement('strong');
        strong.textContent = `${json.user_name}:`;
        messageClone.querySelector('.author').append(strong);
        messageClone.querySelector('.textContent').textContent = json.content;
        app.messagesZone.append(messageClone);
    },
    sendMessage(evt) {
        return __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            const formData = new FormData(evt.target);
            const rep = yield API.sendMessageToAPI(formData);
            if (rep.statusCode === 201) {
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
                const object = yield JSON.parse(json);
                object.user_name = app.user.user;
                app.displayMessageInDom(object, 'yourMessage');
                app.messagesZone.scrollTop = app.messagesZone.scrollHeight;
            }
        });
    },
};
const API = {
    getAllMessagesAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rep = yield fetch(`https://pierrofeu.alwaysdata.net/api/message`
                // 'http://localhost:3000/api/message'
                );
                const json = rep.json();
                if (!rep.ok) {
                    throw json;
                }
                return json;
            }
            catch (error) {
                return error;
            }
        });
    },
    sendMessageToAPI(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rep = yield fetch(`https://pierrofeu.alwaysdata.net/api/message`, 
                // 'http://localhost:3000/api/message',
                {
                    method: 'POST',
                    body: formData,
                });
                const json = yield rep.json();
                if (!rep.ok) {
                    throw json;
                }
                return json;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    },
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rep = yield fetch(`https://pierrofeu.alwaysdata.net/getUser`
                // 'http://localhost:3000/getUser'
                );
                const json = yield rep.json();
                if (!rep.ok) {
                    throw json;
                }
                return json;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    },
};
document.addEventListener('DOMContentLoaded', app.init());
