const mongoose = require('mongoose');

const mongooseConnection = {
	async mgConnect(req, res, next) {
		const mgConnected = await mongoose.connect(`${process.env.MONGODB}`);
		console.log('connection à MongoDB');
		next();
	},
};

module.exports = mongooseConnection;
