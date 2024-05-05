const User = require('../models/mongoDb/User');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const authcontroller = {
	signupPage(req, res) {
		res.render('signup');
	},

	async signup(req, res) {
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
		console.log(hashedPassword);

		const user = await User.create({
			name: validationBody.data.name,
			password: hashedPassword,
		});

		console.log(user);
		res.status(201).json({ statusCode: 201, message: 'Compte créé' });
	},

	async login(req, res) {
		console.log('test');
		const userIsExist = await User.findOne({ name: req.body.name });
		console.log(userIsExist);

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
		console.log(req.session);
		res
			.status(200)
			.json({ statusCode: 200, message: 'Utilisateur connecté !' });
	},

	logout(req, res) {
		req.session.destroy();
		res.redirect('/');
	},

	showAccount(req, res) {
		res.render('account');
	},
};

module.exports = authcontroller;
