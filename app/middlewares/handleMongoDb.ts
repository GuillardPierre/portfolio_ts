import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

const mongooseConnection = {
	async mgConnect(req: Request, res: Response, next: NextFunction) {
		try {
			const mgConnected = await mongoose.connect(`${process.env.MONGODB}`);
			console.log('Mongo connecté');
			next();
		} catch (error) {
			console.log('ERREUR MW MONGO', error);
			next();
		}
	},
};

export default mongooseConnection;
