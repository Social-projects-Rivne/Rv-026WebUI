let recipeModel = {};

recipeModel.findAllTags = () => {
    return `SELECT * FROM tags`;
};

module.exports = recipeModel;