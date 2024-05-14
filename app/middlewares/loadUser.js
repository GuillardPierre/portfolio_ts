const User = require('../models/mongoDb/User');

async function loadUser(req, res, next) {
	try {
		console.log('test');
		if (req.session.userId) {
			const user = await User.findById(req.session.userId);
			console.log(user);
			if (user) {
				req.user = user;
				res.locals.user = user;
				console.log('utilisateur connecté');
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
