const Message = require('../models/mongoDb/Message');
const User = require('../models/mongoDb/User');

const { z } = require('zod');

const messageController = {
	async save(req, res) {
		const { userId } = req.session;
		const user = await User.findById(userId);

		if (!user) {
			res
				.status(400)
				.json({ message: "erreur lors de la récupération de l'utilisateur" });
			return;
		}

		console.log(user, req.body);

		const schema = z.object({
			content: z.string(),
		});

		const validationBody = schema.safeParse(req.body);

		if (!validationBody.success) {
			res.status(400).json({
				statusCode: 400,
				// message: 'Erreur dans les formats de données (zod)',
				error: validationBody.error,
			});
			return;
		}

		const newMessage = await Message.create({
			content: validationBody.data.content,
			user_name: user.name,
		});

		console.log(newMessage);

		res.status(201).json({ statusCode: 201, message: 'message enregistré' });
		return;
	},

	async display(req, res) {
		const allMessages = await Message.find();

		if (!allMessages) {
			res
				.status(404)
				.json({ message: 'Erreur lors de la récupération des messages' });
			return;
		}

		res.status(200).json({ allMessages });
	},

	async Delete(req, res) {
		const { userId } = req.session;
		const user = await User.findById(userId);

		if (!user) {
			res
				.status(400)
				.json({ message: "erreur lors de la récupération de l'utilisateur" });
			return;
		}

		if (user.name !== 'PierreGuillard') {
			res
				.status(400)
				.json({ message: "Tu n'as pas le droit d'effacer de messages toi !" });
			return;
		}

		if (req.body.messageId) {
			const message = await Message.deleteOne(req.body.messageId);
			console.log(message);
			res.status(200).json({ message: 'message supprimé' });
		}

		if (req.body.userId) {
			const allMessages = await Message.deleteMany({
				user_id: req.body.userId,
			});
			console.log(allMessages);
			res.status(200).json({ message: 'messages supprimé' });
		}

		return;
	},
};

module.exports = messageController;
