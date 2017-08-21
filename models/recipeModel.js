let recipeModel = {};
recipeModel.GetAllRecipes = () => {
    return 'SELECT * FROM recipes'
  };

module.exports=recipeModel;