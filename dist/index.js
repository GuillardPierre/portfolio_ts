"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const express_session_1 = __importDefault(require("express-session"));
const router_1 = __importDefault(require("./app/router"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express_1.default.static((0, path_1.join)(__dirname, 'public')));
app.use((0, cors_1.default)());
// On demande à Express d'extraire les données des requêtes POST formatées en multipart
const mutipartParser = (0, multer_1.default)();
// On utlise .none() pour dire qu'on attend pas de fichier, uniquement des inputs "classiques" !
app.use(mutipartParser.none());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(router_1.default);
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
