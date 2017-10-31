const recipeModel = {};

recipeModel.saveRecipe = (recipe) => {
    const recipeValues = Object.keys(recipe).map(k => recipe[k]);
    const query = {
        text: 'INSERT INTO recipes (title, description, is_deleted, owner_id, photo, rating) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
        values: recipeValues,
    };
    return query;
};

recipeModel.saveRecipeTag = (recipeId, tagId) => {
    const query = {
        text: 'INSERT INTO recipe_tag(recipe_id, tag_id) VALUES($1, $2)',
        values: [recipeId, tagId],
    };
    return query;
};

recipeModel.saveRecipeIngredient = (recipeId, ingredientId) => {
    const query = {
        text: 'INSERT INTO calc_card(recipe_id, ingredient_id) VALUES($1, $2)',
        values: [recipeId, ingredientId],
    };
    return query;
};

recipeModel.findTitle = (title) => {
    return `SELECT title,is_deleted FROM recipes WHERE title = '${title}' LIMIT 1`;
};

recipeModel.findRecipesByTagId = (tagId, maxId) => {
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
        FULL JOIN recipe_tag rt ON rt.recipe_id = r.id
        LEFT JOIN tags t ON rt.tag_id = t.id
        GROUP BY r.id
        HAVING $1 = ANY(array_agg(t.id))
        AND r.id > $2
        LIMIT 10
        `,
        values: [tagId, maxId],
    };
    return query;
};

recipeModel.getAllRecipes = (maxId) => {
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
        FULL JOIN recipe_tag rt ON rt.recipe_id = r.id
        LEFT JOIN tags t ON rt.tag_id = t.id
        GROUP BY r.id
        HAVING r.id > ${maxId}
        LIMIT 10
        `,
    };
    return query;
};

recipeModel.findRicipesByName = (recipeName, maxId) => {
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
        FULL JOIN recipe_tag rt ON rt.recipe_id = r.id
        LEFT JOIN tags t ON rt.tag_id = t.id
        INNER JOIN users u ON u.id = r.owner_id
        WHERE LOWER(r.title) LIKE $1||'%'
        GROUP BY r.id,u.id
        HAVING r.id > $2
        LIMIT 10
        `,
        values: [recipeName, maxId],
    };
    return query;
};

recipeModel.findRicipesByTagType = (tagType, maxId) => {
    const query = {
        text: `
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
        FULL JOIN recipe_tag rt ON rt.recipe_id = r.id
        LEFT JOIN tags t ON rt.tag_id = t.id
        INNER JOIN users u ON u.id = r.owner_id
        GROUP BY r.id, u.id
        HAVING $1 = any(array_agg(t.tag_type))
        AND r.id > $2
        LIMIT 10
        `,
        values: [tagType, maxId],
    };
    return query;
};

recipeModel.findTop5RicipesByName = (recipeName) => {
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
        FULL JOIN recipe_tag rt ON rt.recipe_id = r.id
        LEFT JOIN tags t ON rt.tag_id = t.id
        INNER JOIN users u ON u.id = r.owner_id
        WHERE LOWER(r.title) LIKE $1||'%'
        GROUP BY r.id,u.id
        ORDER BY r.rating DESC
        LIMIT 5
        `,
        values: [recipeName],
    };
    return query;
};

recipeModel.findTop5RicipesByTagType = (tagType) => {
    const query = {
        text: `
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
        FULL JOIN recipe_tag rt ON rt.recipe_id = r.id
        LEFT JOIN tags t ON rt.tag_id = t.id
        INNER JOIN users u ON u.id = r.owner_id
        GROUP BY r.id, u.id
        HAVING $1 = any(array_agg(t.tag_type))
        ORDER BY r.rating DESC
        LIMIT 5
        `,
        values: [tagType],
    };
    return query;
};

recipeModel.getRecipeById = (id) => {
    return `select recipes.id,recipes.photo,recipes.title,recipes.description, recipes.rating, recipes.owner_id,t2.name,t2.id as ingredientid from recipes
        FULL OUTER join
        (select calc_card.recipe_id,calc_card.ingredient_id,ingredients.name,ingredients.id from calc_card
        FULL OUTER join ingredients
        on calc_card.ingredient_id=ingredients.id
        where calc_card.recipe_id=${id}) as t2
        on recipes.id=t2.recipe_id
        where recipes.id=${id}`;
};

recipeModel.getTagsByRecipeId = (id) => {
    return `select tags.id, tags.name from tags FULL OUTER join recipe_tag on tags.id=recipe_tag.tag_id where recipe_tag.recipe_id=${id}`;
};

recipeModel.updateRecipe = (data, value) => {
    return `INSERT INTO ${data.fieldName}(name)
            SELECT DISTINCT '${value}'
            FROM   ${data.fieldName}
            ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id`;
};

recipeModel.removeDbLink = (table, fieldName, recipeId, insertId) => {
    return `DELETE FROM ${table}
            WHERE recipe_id =${recipeId} AND ${fieldName}_id = ${insertId}`;
};

recipeModel.addDbLink = (table, fieldName, recipeId, insertId) => {
    return `INSERT INTO ${table} (recipe_id, ${fieldName}_id)
            SELECT ${recipeId}, ${insertId}
            WHERE NOT EXISTS (SELECT id FROM ${table} WHERE recipe_id = ${recipeId} AND ${fieldName}_id = ${insertId});`;
};

recipeModel.upsertData = (data) => {
    return `INSERT INTO recipes (id,${data.fieldName}) VALUES (${data.id},'${data.value}') ON CONFLICT(id) DO UPDATE SET ${data.fieldName} = '${data.value}'`;
};

recipeModel.findRecipesByIngredients = (ingredients, maxId) => {
    const query = `
        SELECT r.id,
        r.title,
        r.description,
        r.photo,
        r.owner_id,
        r.rating,
        r.is_deleted,
        array_agg(distinct t.id) as tags_id,
        array_agg(distinct t.name) as tags_name
        FROM recipes r
        FULL JOIN recipe_tag rt ON rt.recipe_id = r.id
        LEFT JOIN tags t ON rt.tag_id = t.id
        full join calc_card cc on cc.recipe_id = r.id
        left join ingredients i on cc.ingredient_id = i.id
        group by r.id
        having array[${ingredients}] <@ array_agg(distinct i.id) AND r.id>${maxId}
        LIMIT 1
    `;
    return query;
};

module.exports = recipeModel;
