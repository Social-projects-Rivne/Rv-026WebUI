let recipeModel = {};
recipeModel.GetAllRecipes = () => {
    return `SELECT recipes.id, recipes.title, recipes.description, recipes.photo, recipes.owner_id, 
    		recipes.rating, array_agg(tags.id) as tags_id, array_agg(DISTINCT tags.name) as tags_name
			FROM
			(recipes FULL JOIN recipe_tag  ON (recipe_tag.resipe_id = recipes.id)) 
			LEFT JOIN tags ON (recipe_tag.tag_id = tags.id)
			GROUP BY recipes.id`
  };

module.exports=recipeModel;