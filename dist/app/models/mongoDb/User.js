const mongoose = require('mongoose');
const utilisateurSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', utilisateurSchema);
