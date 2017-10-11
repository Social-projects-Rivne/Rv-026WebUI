const orderModel = {};

orderModel.saveOrder = (order) => {
    console.log(order);
    const query = {
        text: 'INSERT INTO orders (user_id, comment, status, price) VALUES($1, $2, $3, $4) RETURNING id',
        values: [order.userId, order.comment, order.status, 0 + order.price],
    };
    return query;
};

orderModel.saveOrderContext = (idOrder, id, count) => {
    const query = {
        text: 'INSERT INTO order_context(order_id, recipe_id, count) VALUES ($1, $2, $3)',
        values: [idOrder, id, count],
    };
    return query;
};
module.exports = orderModel;
