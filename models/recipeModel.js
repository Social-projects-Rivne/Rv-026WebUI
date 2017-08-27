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
        text: 'INSERT INTO recipes (title, description, is_deleted, owner_id, photo, rating) VALUES($1, $2, $3, $4, $5, $6)',
        values: recipeValues
      }
      return query;
  };
}

module.exports = recipeModel;