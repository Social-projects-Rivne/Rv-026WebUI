class recipeModel {

    constructor(title, description, is_deleted, owner_id, photo, rating) {
        this.title = title;
        this.description = description;
        this.is_deleted = is_deleted;
        this.owner_id = owner_id;
        this.photo = photo;
        this.rating = rating;
    };

    saveRecipe(recipe) {
        var recipeValues = Object.keys(recipe).map((k) => recipe[k]);
        const query = {
            text: 'INSERT INTO recipes (title, description, is_deleted, owner_id, photo, rating) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: recipeValues
        }
        return query;
    };

    saveRecipeTag(recipeId, tagId) {
        const query = {
            text: `INSERT INTO recipe_tag(resipe_id, tag_id) VALUES($1, $2)`,
            values: [recipeId, tagId]
        }
        return query;
    };

    findTitle(title) {
        return `SELECT title,is_deleted FROM recipes WHERE title = '${title}' LIMIT 1`
    };

    findRecipesByTagId(tagId) {
        const query = {
            text: `
            SELECT r.id, 
                r.title, 
                r.description, 
                r.photo, 
                r.owner_id, 
                r.rating, 
                r.is_deleted,
                array_agg(t.id) as tags_id, 
                array_agg(t.name) as tags_name
            FROM recipes r 
            FULL JOIN recipe_tag rt ON rt.resipe_id = r.id
            LEFT JOIN tags t ON rt.tag_id = t.id
            GROUP BY r.id
            HAVING $1 = ANY(array_agg(t.id))
            `,
            values: [tagId]
        }
        return query;
    };

    getAllRecipes() {
        const query = {
            text: `
            SELECT r.id, 
                r.title, 
                r.description, 
                r.photo, 
                r.owner_id, 
                r.rating, 
                r.is_deleted,
                array_agg(t.id) as tags_id, 
                array_agg(t.name) as tags_name
            FROM recipes r 
            FULL JOIN recipe_tag rt ON rt.resipe_id = r.id
            LEFT JOIN tags t ON rt.tag_id = t.id
            GROUP BY r.id
            `
        }
        return query;
    };

    findRicipeByName(recipeName) {
        const query = {
            text:
            `SELECT r.id,
	            r.title, 
                r.description, 
	            r.is_deleted, 
	            r.photo, 
                r.owner_id, 
	            r.rating,
	            u.fullname,
                array_agg(t.id) as tags_id, 
                array_agg(t.name) as tags_name
            FROM recipes r
            FULL JOIN recipe_tag rt ON rt.resipe_id = r.id
            INNER JOIN tags t ON rt.tag_id = t.id 
            INNER JOIN users u ON u.id = r.owner_id
            WHERE LOWER(r.title) LIKE $1||'%'
            GROUP BY r.id,u.id
            `,
            values:[recipeName]
        }
        return query;
    };

    findRicipeByTagType(tagType) {
        const query = {
            text:`
            SELECT r.id,
	            r.title, 
                r.description, 
	            r.is_deleted, 
	            r.photo, 
                r.owner_id, 
	            r.rating,
	            u.fullname,
                array_agg(t.id) as tags_id, 
                array_agg(t.name) as tags_name
            FROM recipes r 
            FULL JOIN recipe_tag rt ON rt.resipe_id = r.id
            INNER JOIN tags t ON rt.tag_id = t.id 
            INNER JOIN users u ON u.id = r.owner_id
            GROUP BY r.id, u.id
            HAVING $1 = any(array_agg(t.tag_type))
            `,
            values:[tagType]
        }
        return query;
    };
    

}

module.exports = recipeModel;
