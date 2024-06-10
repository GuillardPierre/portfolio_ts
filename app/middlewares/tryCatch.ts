import { Request, Response, NextFunction } from 'express';

interface error {
	statusCode: number;
	message: string;
}

type ControllerFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void>;

export function catchErrors(fn: ControllerFunction) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

export function errorHandler(error: error, req: Request, res: Response) {
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
