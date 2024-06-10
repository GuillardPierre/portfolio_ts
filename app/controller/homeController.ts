import { Request, Response } from 'express';
const homeController = {
	index(req: Request, res: Response) {
		res.render('accueil');
	},
};

export default homeController;
