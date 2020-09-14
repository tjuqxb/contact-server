const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contacts',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
});

const Contact = mongoose.model('contacts', ContactSchema);

module.exports = Contact;
