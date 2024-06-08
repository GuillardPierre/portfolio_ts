const User = require('../models/mongoDb/User');

async function loadUser(req, res, next) {
	try {
		if (req.session.userId) {
			const user = await User.findById(req.session.userId);
			if (user) {
				req.user = user;
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
