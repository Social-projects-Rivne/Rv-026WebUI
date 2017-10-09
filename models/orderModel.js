const orderModel = {};

orderModel.saveOrder = (order) => {
    const orderValues = Object.keys(order).map(k => order[k]);
    const query = {
        text: 'INSERT INTO orders (user_id, comment, status) VALUES($1, $2, $3) RETURNING id',
        values: orderValues,
    };
    return query;
};

orderModel.saveOrder = (idOrder, id, count) => {
    const query = {
        text: 'INSERT INTO order_context(order_id, recipe_id, count, price ) VALUES ($1, $2, $3, $4)',
        values: [idOrder, id, count, 10],
    };
    return query;
};
module.exports = orderModel;
