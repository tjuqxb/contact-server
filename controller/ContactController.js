const mongoose = require('mongoose');
const Contact = mongoose.model("contacts");
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

module.exports = {
    editContact: (changeContact) => {
        return Contact.findById(changeContact.id).then(doc => {
            doc.name = changeContact.name;
            doc.email = changeContact.email;
            doc.phone = changeContact.phone;
            doc.tag = new mongoose.Types.ObjectId(changeContact.tag);
            doc.user = new mongoose.Types.ObjectId(changeContact.user);
            return Promise.resolve(doc);
        }).then((doc) => {
            return doc.save();
        }).catch(err => {
            logger.info(err);
        });
        },

    createContact: (newContact) => {
        const contact = new Contact({
            name: newContact.name,
            email: newContact.email,
            phone: newContact.phone,
            tag: new  mongoose.Types.ObjectId(newContact.tag),
            user: new mongoose.Types.ObjectId(newContact.user)
        });
        return contact.save();
    },

    deleteContact: (id) => {
        return Contact.findByIdAndDelete(id);
    },

    getContactsByUser: (userId) => {
        const query = {
            user: new mongoose.Types.ObjectId(userId)
        };
        return Contact.find(query).catch(err => {
            logger.info(err);
        })
    }
}
