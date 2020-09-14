const mongoose = require('mongoose');
const Contact = mongoose.model("contacts");

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
            console.log(err);
            return Promise.reject(err);
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
    }

    getContacts: (userId) => {

    }
}
