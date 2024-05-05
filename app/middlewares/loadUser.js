const User = require('../models/mongoDb/User');

async function loadUser(req, res, next) {
	try {
		if (req.session.userId) {
			// A partir de l'id de l'utilisateur stocker en session.
			// Je vais chercher l'utilisateur en base de données
			const user = await User.findById(req.session.userId);
			console.log(user);
			if (user) {
				// Et le stocker dans req.user et res.locals.user
				req.user = user;
				res.locals.user = user;
			}
		} else {
			console.log("Pas d'utilisateur connecté");
		}
		next();
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erreur interne' });
	}
}

module.exports = loadUser;
