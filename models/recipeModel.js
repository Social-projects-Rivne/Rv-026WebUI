class recipeModel {

  constructor (title, description, is_deleted, owner_id, photo, rating) {
    this.title = title;
    this.description = description;
    this.is_deleted = is_deleted;
    this.owner_id = owner_id;
    this.photo = photo;
    this.rating = rating;
  };

  saveRecipe (recipe) {
    var recipeValues = Object.keys(recipe).map((k) => recipe[k]);
    const query = {
      text: 'INSERT INTO recipes (title, description, is_deleted, owner_id, photo, rating) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: recipeValues
    }
    return query;
  };

  saveRecipeTag(recipeId, tagId){
    const query = {
      text: `INSERT INTO recipe_tag(resipe_id, tag_id) VALUES($1, $2)`,
      values: [recipeId, tagId]
    }
    return query;
  };
    
  getAllRecipes () {
    return `SELECT * FROM recipes`
  };

  getTagsRecipes () {
    return `SELECT * FROM tags_recipes`
  };
  
}

module.exports = recipeModel;
