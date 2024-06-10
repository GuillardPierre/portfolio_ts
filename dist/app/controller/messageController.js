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
Object.defineProperty(exports, "__esModule", { value: true });
const Message = require('../models/mongoDb/Message');
const User = require('../models/mongoDb/User');
const { z } = require('zod');
const messageController = {
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const user = yield User.findById(userId);
            if (!user) {
                res
                    .status(400)
                    .json({ message: "erreur lors de la récupération de l'utilisateur" });
                return;
            }
            const schema = z.object({
                content: z.string(),
            });
            const validationBody = schema.safeParse(req.body);
            if (!validationBody.success) {
                res.status(400).json({
                    statusCode: 400,
                    // message: 'Erreur dans les formats de données (zod)',
                    error: validationBody.error,
                });
                return;
            }
            const newMessage = yield Message.create({
                content: validationBody.data.content,
                user_name: user.name,
            });
            res.status(201).json({ statusCode: 201, message: 'message enregistré' });
            return;
        });
    },
    display(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allMessages = yield Message.find();
            if (!allMessages) {
                res
                    .status(404)
                    .json({ message: 'Erreur lors de la récupération des messages' });
                return;
            }
            res.status(200).json({ allMessages });
        });
    },
    Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            const user = yield User.findById(userId);
            if (!user) {
                res
                    .status(400)
                    .json({ message: "erreur lors de la récupération de l'utilisateur" });
                return;
            }
            if (user.name !== 'PierreGuillard') {
                res
                    .status(400)
                    .json({ message: "Tu n'as pas le droit d'effacer de messages toi !" });
                return;
            }
            if (req.body.messageId) {
                const message = yield Message.deleteOne(req.body.messageId);
                res.status(200).json({ message: 'message supprimé' });
            }
            if (req.body.userId) {
                const allMessages = yield Message.deleteMany({
                    user_id: req.body.userId,
                });
                res.status(200).json({ message: 'messages supprimé' });
            }
            return;
        });
    },
};
exports.default = messageController;
