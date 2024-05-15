const mongoose = require('mongoose');

const mongooseConnection = {
	async mgConnect(req, res, next) {
		try {
			const mgConnected = await mongoose.connect(`${process.env.MONGODB}`);
			console.log('Mongo connecté');
			next();
		} catch (error) {
			console.log('ERREUR MW MONGO', error, mgConnected.connection.readyState);
			next();
		}
	},
};

module.exports = mongooseConnection;
