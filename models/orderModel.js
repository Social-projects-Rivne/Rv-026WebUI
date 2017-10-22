const orderModel = {};

orderModel.saveOrder = (order) => {
    console.log(order);
    const query = {
        text: 'INSERT INTO orders (user_id, comment, status_id, price) VALUES($1, $2, $3, $4) RETURNING id',
        values: [order.userId, order.comment, order.status_id, 0 + order.price],
    };
    return query;
}

orderModel.findAllOrders = () => {
    const query = {
        text: `SELECT o.id,
            o.cooker_id,
            o.price,
            o.comment,
            os.status,
            u.id as owner_id,
            u.role_id,
            u.fullname,
            u.email,
            array_agg(oc.id) as order_contex_id,
            array_agg(r.id) as recipes_id,
            array_agg(r.title) as recipes_title,
            array_agg(oc.count) as count
        FROM orders o
        inner JOIN order_context oc ON oc.order_id = o.id
        full JOIN orders_status os ON os.id = o.status_id
        inner JOIN recipes r ON oc.recipe_id = r.id
        inner JOIN users u ON u.id = o.user_id
        where os.status = 'new'
        group by o.id,u.id,os.id
        ORDER BY o.id DESC;`,
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

orderModel.findIdToStatusName = (status) => {
    const query = {
        text: `SELECT os.id FROM orders_status os WHERE status = $1`,
        values: [status],
    };
    return query;
};

orderModel.updateStatusId = (statusId, orderId) => {
    const query = {
        text: `UPDATE orders SET status_id = $1 WHERE id = $2`,
        values: [statusId, orderId],
    };
    return query;
};

orderModel.updateStatusIdAndCookId = (cookId, statusId, orderId) => {
    const query = {
        text: `UPDATE orders SET status_id = $2, cooker_id = $1 WHERE id = $3`,
        values: [cookId, statusId, orderId],
    };
    return query;
};

module.exports = orderModel;
