const orderModel = {};

orderModel.findAllOrders = () => {
    const query = {
        text: `SELECT o.id, 
            o.cooker_id, 
            o.status,
            u.id as owner_id,
            u.fullname,
            array_agg(oc.id) as order_id,
            array_agg(oc.price) as order_price,
            array_agg(r.id) as recipes_id,
            array_agg(r.title) as recipes_title
        FROM orders o
        inner JOIN order_context oc ON oc.order_id = o.id
        inner JOIN recipes r ON oc.recipe_id = r.id
        inner JOIN users u ON u.id = o.user_id
        group by o.id,u.id`,
    };
    return query;
};

module.exports = orderModel;
