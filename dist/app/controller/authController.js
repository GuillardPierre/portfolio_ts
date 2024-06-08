var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('../models/mongoDb/User');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const authcontroller = {
    signupPage(req, res) {
        res.render('signup');
    },
    showAccount(req, res) {
        res.render('account');
    },
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = z.object({
                name: z.string().min(2),
                password: z.string().min(3),
                password__confirmation: z.string(),
            });
            const validationBody = schema.safeParse(req.body);
            if (!validationBody.success) {
                res
                    .status(400)
                    .json({ statusCode: 400, message: 'Mot de passe trop court' });
                return;
            }
            if (validationBody.data.password !==
                validationBody.data.password__confirmation) {
                res.status(400).json({
                    status: 400,
                    message: 'Les mots de passe ne correspondent pas',
                });
                return;
            }
            const userWithSameName = yield User.findOne({
                name: validationBody.data.name,
            });
            if (userWithSameName) {
                res.status(400).json({ message: 'Pseudo déjà pris' });
                return;
            }
            const hashedPassword = yield bcrypt.hash(validationBody.data.password, 10);
            const user = yield User.create({
                name: validationBody.data.name,
                password: hashedPassword,
            });
            res.status(201).json({ statusCode: 201, message: 'Compte créé' });
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIsExist = yield User.findOne({ name: req.body.name });
            if (!userIsExist) {
                res
                    .status(401)
                    .json({ statusCode: 401, message: 'Mauvais identifiants' });
                return;
            }
            const passwordIsValid = yield bcrypt.compare(req.body.password, userIsExist.password);
            if (!passwordIsValid) {
                res
                    .status(401)
                    .json({ statusCode: 401, message: 'Mauvais identifiants' });
                return;
            }
            req.session.userId = userIsExist.id;
            res
                .status(200)
                .json({ statusCode: 200, message: 'Utilisateur connecté !' });
        });
    },
    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    accountInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                const user = yield User.findById(req.session.userId);
                if (!user) {
                    res.status(404).json({
                        statusCode: 404,
                        message: "erreur lors de la récupération de l'utilisateur",
                    });
                    return;
                }
                res.status(200).json({ statusCode: 200, user: user.name });
            }
            else {
                res
                    .status(401)
                    .json({ statusCode: 401, message: 'Pas de session en cours' });
            }
        });
    },
};
export default authcontroller;
