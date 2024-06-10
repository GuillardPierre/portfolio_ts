import { Request, Response } from 'express';
import User from '../models/mongoDb/User';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const authcontroller = {
	signupPage(req: Request, res: Response) {
		res.render('signup');
	},

	showAccount(req: Request, res: Response) {
		res.render('account');
	},

	async signup(req: Request, res: Response) {
		const schema = z.object({
			name: z.string().min(2),
			password: z.string().min(3),
			password__confirmation: z.string(),
		});

		const validationBody = schema.safeParse(req.body);

		if (!validationBody.success) {
			res
				.status(400)
				.json({ statusCode: 400, message: 'Mot de passe trop court' });
			return;
		}

		if (
			validationBody.data.password !==
			validationBody.data.password__confirmation
		) {
			res.status(400).json({
				status: 400,
				message: 'Les mots de passe ne correspondent pas',
			});
			return;
		}

		const userWithSameName = await User.findOne({
			name: validationBody.data.name,
		});

		if (userWithSameName) {
			res.status(400).json({ message: 'Pseudo déjà pris' });
			return;
		}

		const hashedPassword = await bcrypt.hash(validationBody.data.password, 10);

		await User.create({
			name: validationBody.data.name,
			password: hashedPassword,
		});

		res.status(201).json({ statusCode: 201, message: 'Compte créé' });
	},

	async login(req: Request, res: Response) {
		const userIsExist = await User.findOne({ name: req.body.name });

		if (!userIsExist) {
			res
				.status(401)
				.json({ statusCode: 401, message: 'Mauvais identifiants' });
			return;
		}

		const passwordIsValid = await bcrypt.compare(
			req.body.password,
			userIsExist.password
		);

		if (!passwordIsValid) {
			res
				.status(401)
				.json({ statusCode: 401, message: 'Mauvais identifiants' });
			return;
		}
		req.session.userId = userIsExist.id;
		res
			.status(200)
			.json({ statusCode: 200, message: 'Utilisateur connecté !' });
	},

	logout(req: Request, res: Response) {
		req.session.destroy();
		res.redirect('/');
	},

	async accountInformation(req: Request, res: Response) {
		if (req.session.userId) {
			const user = await User.findById(req.session.userId);
			if (!user) {
				res.status(404).json({
					statusCode: 404,
					message: "erreur lors de la récupération de l'utilisateur",
				});
				return;
			}

			res.status(200).json({ statusCode: 200, user: user.name });
		} else {
			res
				.status(401)
				.json({ statusCode: 401, message: 'Pas de session en cours' });
		}
	},
};

export default authcontroller;
