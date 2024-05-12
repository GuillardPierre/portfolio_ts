const mongoose = require('mongoose');

const mongooseConnection = {
	async mgConnect(req, res, next) {
		try {
			const mgConnected = await mongoose.connect(`${process.env.MONGODB}`);
			console.log(mgConnected.connection.readyState);
			next();		
		} catch (error) {
			console.log("ERREUR MW MONGOOSE", error, mgConnected.connection.readyState)
			next();
		}
	},
};

module.exports = mongooseConnection;
