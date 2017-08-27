let recipeModel = {};

recipeModel.saveRecipe = (recipe) => {
    var recipeValues = Object.keys(recipe).map((k) => recipe[k]);

    const query = {
      text: 'INSERT INTO recipes (title, description, is_deleted, owner_id, photo, rating) VALUES($1, $2, $3, $4, $5, $6)',
      values: recipeValues
    }
    
    return query;
};

module.exports = recipeModel;