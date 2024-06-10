import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const mongooseConnection = {
	async mgConnect(req: Request, res: Response, next: NextFunction) {
		try {
			await mongoose.connect(`${process.env.MONGODB}`);
			console.log('Mongo connecté');
			next();
		} catch (error) {
			console.log('ERREUR MW MONGO', error);
			next();
		}
	},
};

export default mongooseConnection;
