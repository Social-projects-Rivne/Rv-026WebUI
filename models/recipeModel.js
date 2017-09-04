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

  getAllRecipes () {
    return `SELECT * FROM recipes`
  };

  getTagsRecipes () {
    return `SELECT * FROM tags_recipes`
  };

    getRecipeById(id) {
        return `select recipes.id,recipes.photo,recipes.title,recipes.description, recipes.rating,t2.name from recipes
    FULL OUTER join
    (select calc_card.resipe_id,calc_card.ingredient_id,ingredients.name from calc_card
    FULL OUTER join ingredients
    on calc_card.ingredient_id=ingredients.id
    where calc_card.resipe_id=${id}) as t2
    on recipes.id=t2.resipe_id
    where recipes.id=${id}`;
    }

    getTagsByRecipeId(id) {
        return `select tags.id, tags.name from tags FULL OUTER join recipe_tag on tags.id=recipe_tag.tag_id where recipe_tag.resipe_id=${id}`;
    }
}

module.exports = recipeModel;
