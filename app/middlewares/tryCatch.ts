export function catchErrors(fn) {
	return async function (req, res, next) {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

export function errorHandler(error, req, res, next) {
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
