const User = require('../models/mongoDb/User');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const authcontroller = {
	signupPage(req, res) {
		res.render('signup');
	},

	async signup(req, res) {
		const schema = z.object({
			name: z.string().min(2, { message: 'le nom est trop court' }),
			password: z
				.string()
				.min(2, { message: 'le mot de passe est trop court' }),
			password__confirmation: z.string().min(2),
		});

		const validationBody = schema.safeParse(req.body);

		if (!validationBody.success) {
			res.status(400).send(validationBody.error);
			return;
		}

		if (
			validationBody.data.password !==
			validationBody.data.password__confirmation
		) {
			res.status(400).send('Les mots de passe ne correspondent pas');
			return;
		}

		const userWithSameName = await User.findOne({
			name: validationBody.data.name,
		});

		if (userWithSameName) {
			res.status(400).send('Pseudo déjà pris');
			return;
		}

		const hashedPassword = await bcrypt.hash(validationBody.data.password, 10);
		console.log(hashedPassword);

		const user = await User.create({
			name: validationBody.data.name,
			password: hashedPassword,
		});

		console.log(user);
		res.status(201).send('Utilisateur créé');
	},

	async login(req, res) {
		console.log('test');
		const userIsExist = await User.findOne({ name: req.body.name });
		console.log(userIsExist);

		if (!userIsExist) {
			res.status(401).send('Mauvais identifiants');
			return;
		}

		const passwordIsValid = await bcrypt.compare(
			req.body.password,
			userIsExist.password
		);

		if (!passwordIsValid) {
			res.status(401).send('Mauvais identifiants');
			return;
		}
		req.session.userId = userIsExist.name;
		console.log(req.session);
		res.status(200).send('Utilisateur connecté !');
	},

	logout(req, res) {
		req.session.destroy();
		res.redirect('/');
	},
};

module.exports = authcontroller;
