const ingredientModel = {};

ingredientModel.findAllIngredients = () => {
    return `SELECT * FROM ingredients`;
};

ingredientModel.saveIngredients = (ingredientValue) => {
    const query = {
        text: `INSERT INTO ingredients (name, is_deleted, photo) VALUES ($1,$2,$3) RETURNING id`,
        values: [ingredientValue, null, null],
    };
    return query;
};

ingredientModel.findIngredientByName = (ingredientName) => {
    const query = {
        text: `SELECT i.id FROM ingredients i WHERE i.name = $1::text`,
        values: [ingredientName],
    };
    return query;
};

module.exports = ingredientModel;
