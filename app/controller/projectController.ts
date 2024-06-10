import { Request, Response } from 'express';

const projectController = {
	snake(req: Request, res: Response) {
		res.render('snake');
	},

	meteo(req: Request, res: Response) {
		res.render('meteo');
	},

	pokemon(req: Request, res: Response) {
		res.render('pokemon');
	},

	department(req: Request, res: Response) {
		res.render('departmentKing');
	},

	pendu(req: Request, res: Response) {
		res.render('pendu');
	},

	pfc(req: Request, res: Response) {
		res.render('PFC');
	},

	chat(req: Request, res: Response) {
		res.render('chat');
	},
};

export default projectController;
