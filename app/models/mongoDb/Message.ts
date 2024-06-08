const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	content: { type: String, required: true },
	user_name: {
		// type: mongoose.Schema.Types.ObjectId,
		type: mongoose.Schema.Types.String,
		ref: 'User',
		required: true,
	},
	date_creation: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
