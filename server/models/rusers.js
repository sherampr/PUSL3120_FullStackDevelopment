const mongoose = require('mongoose');

const rusersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
});

const rusers = mongoose.model('rusers', rusersSchema);

module.exports = rusers;


