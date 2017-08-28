let recipeModel = {};
recipeModel.GetAllRecipes = () => {
    return `SELECT * FROM recipes`
  };

recipeModel.getTagsRecipes = () => {
    return `SELECT * FROM tags_recipes`
  };

module.exports=recipeModel;