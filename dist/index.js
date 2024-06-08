import dotenv from 'dotenv';
import express from 'express';
import { join } from 'path';
import session from 'express-session';
import router from './app/router';
import cors from 'cors';
import multer from 'multer';
const app = express();
dotenv.config();
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static(join(__dirname, 'public')));
app.use(cors());
// On demande à Express d'extraire les données des requêtes POST formatées en multipart
const mutipartParser = multer();
// On utlise .none() pour dire qu'on attend pas de fichier, uniquement des inputs "classiques" !
app.use(mutipartParser.none());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(router);
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
