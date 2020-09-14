const mongoose = require('mongoose');
const Tag = mongoose.model("tags");
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

module.exports = {
    editTag: (changeTag) => {
        return Tag.findById(changeTag.id).then(doc => {
            doc.name = changeTag.name;
            doc.color = changeTag.color;
            doc.user = new mongoose.Types.ObjectId(changeTag.user);
            return Promise.resolve(doc);
        }).then(doc => {
            return doc.save();
        }).catch(err => {
            logger.info(err);
            return Promise.reject(err);
        })
    },

    createTag: (newTag) => {
        const tag = new Tag({
            name: newTag.name,
            color: newTag.color,
            user: new mongoose.Types.ObjectId(newTag.user)
        });
        return tag.save();
    },

    deleteTag: (id) => {
        return Tag.findByIdAndDelete(id);
    }

}
