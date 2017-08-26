let tagModel = {};

tagModel.findAllTags = () => {
    return `SELECT * FROM tags`;
};

module.exports = tagModel;