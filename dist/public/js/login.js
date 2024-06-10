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
    init() {
        app.signup();
        app.login();
        document.querySelector('.main__login').classList.toggle('is-hidden');
    },
    signup() {
        return __awaiter(this, void 0, void 0, function* () {
            const signupBtn = document
                .querySelector('.main__signup--btn')
                .closest('form');
            signupBtn.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const formData = new FormData(event.target);
                const rep = yield apiCall.newUser(formData);
                if (rep.statusCode === 201) {
                    if (document
                        .querySelector('.notification')
                        .classList.contains('is-hidden')) {
                        app.hideOrShowNotification();
                    }
                    document.querySelector('.notification p').textContent = rep.message;
                    app.changeTheForm;
                }
                else {
                    if (document
                        .querySelector('.notification')
                        .classList.contains('is-hidden')) {
                        app.hideOrShowNotification();
                    }
                    document.querySelector('.notification p').textContent = rep.message;
                }
            }));
            document
                .querySelector('.main__signup--btnAlreadyAccount')
                .addEventListener('click', (event) => {
                event.preventDefault();
                app.changeTheForm();
            });
        });
    },
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const loginBtn = document
                .querySelector('.main__login--btn')
                .closest('form');
            loginBtn.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const formData = new FormData(event.target);
                const rep = yield apiCall.connectUser(formData);
                if (rep.statusCode === 200) {
                    setTimeout(() => {
                        document.location.href = '/';
                    }, 2000);
                    if (document
                        .querySelector('.notification')
                        .classList.contains('is-hidden')) {
                        app.hideOrShowNotification();
                    }
                    document.querySelector('.notification p').textContent =
                        rep.message + ' Redirection...';
                }
                else {
                    if (document
                        .querySelector('.notification')
                        .classList.contains('is-hidden')) {
                        app.hideOrShowNotification();
                    }
                    document.querySelector('.notification p').textContent = rep.message;
                }
            }));
            document
                .querySelector('.main__login--btnNoAccount')
                .addEventListener('click', (event) => {
                event.preventDefault();
                app.changeTheForm();
            });
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
    newUser(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rep = yield fetch(`https://pierrofeu.alwaysdata.net/api/signup`, 
                // 'http://localhost:3000/api/signup',
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
                return error;
            }
        });
    },
    connectUser(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rep = yield fetch(`https://pierrofeu.alwaysdata.net/api/login`, 
                // 'http://localhost:3000/api/login',
                {
                    method: 'POST',
                    body: formData,
                });
                const json = yield rep.json();
                if (!rep.ok) {
                    throw json;
                }
                console.log(json);
                return json;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    },
};
document.addEventListener('DOMContentLoaded', app.init);
