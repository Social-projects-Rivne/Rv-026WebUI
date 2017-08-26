let recipeModel = {};
recipeModel.GetAllRecipes = () => {
    return `SELECT * FROM recipes`
  };

recipeModel.GetAllRecipesByCategory = (id) => {
    return `SELECT * FROM recipes WHERE category_id='${id}'`
  };

module.exports=recipeModel;