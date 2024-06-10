import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export function catchErrors(fn: Function) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

export function errorHandler(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	let statusCode = 500;
	let message = "Une erreur à été intercepté dans le mw d'erreur";

	if (error.statusCode) {
		statusCode = error.statusCode;
	}

	if (error.message) {
		message = error.message;
	}

	res.status(statusCode).json({ error: message });
}
