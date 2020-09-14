const mongoose = require('mongoose');
const User = mongoose.model("users");


module.exports = {
    findUserByEmail: (email) => {
        const query = {
            email: email
        };
        return User.findOne(query);
    },

    createUser: (name, password) => {
        const user = new User({
            email:name,
            password: password,
        });
        return user.save();
    },

}
