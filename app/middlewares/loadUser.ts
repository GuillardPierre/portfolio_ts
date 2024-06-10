import { Request, Response, NextFunction } from 'express';
import User from '../models/mongoDb/User';

async function loadUser(req: Request, res: Response, next: NextFunction) {
	try {
		if (req.session.userId) {
			const user = await User.findById(req.session.userId);
			if (user) {
				// On pourrait stocker les données du User dans la requête si besoin mais pour l'instant c'est inutile
				// req.user = user;
				res.locals.user = user;
				console.log('utilisateur connecté');
			}
		}
		next();
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Erreur chargement user mw/loadUser' + err });
	}
}

export default loadUser;
