const UserModel = {};

UserModel.getUserInfo = (userId) => {
    const query = {
        text: `SELECT u.about_me, u.email, u.fullname, u.gravatar, u.id, u.is_premium, u.role_id, u.phone_number, users_roles.user_role FROM users as u JOIN users_roles ON users_roles.id=u.role_id WHERE u.id='${userId}'`,
    };
    return query;
};

UserModel.getUserOrders = (userId, roleId) => {
    let query;
    if (Number(roleId) === 2) {
        query = {
            text: `SELECT o.id,
            o.user_id,
            o.cooker_id,
            o.status_id,
            o.comment,
            o.price,
            array_agg(oc.id) as order_contex_id,
            array_agg(oc.order_id) as order_id,
            array_agg(oc.recipe_id) as recipes_id,
            array_agg(oc.count) as count,
            array_agg(r.title) as recipes_title,
            u.fullname,
            u.email,
            u.role_id,
            os.status FROM orders o
          LEFT JOIN order_context as oc on oc.order_id = o.id
          LEFT JOIN recipes as r on r.id = oc.recipe_id
          LEFT JOIN users as u on u.id = o.cooker_id
          LEFT JOIN orders_status as os on os.id = o.status_id
          WHERE o.user_id='${userId}'
          group by o.id,u.id,os.id
          ORDER BY o.id DESC;`,
        };
    } else if (Number(roleId) === 3) {
        query = {
            text: `SELECT o.id,
            o.user_id,
            o.cooker_id,
            o.status_id,
            o.comment,
            o.price,
            array_agg(oc.id) as order_contex_id,
            array_agg(oc.order_id) as order_id,
            array_agg(oc.recipe_id) as recipes_id,
            array_agg(oc.count) as count,
            array_agg(r.title) as recipes_title,
            u.fullname,
            u.email,
            u.role_id,
            os.status FROM orders o
          LEFT JOIN order_context as oc on oc.order_id = o.id
          LEFT JOIN recipes as r on r.id = oc.recipe_id
          LEFT JOIN users as u on u.id = o.user_id
          LEFT JOIN orders_status as os on os.id = o.status_id
          WHERE o.cooker_id='${userId}'
          group by o.id,u.id,os.id
          ORDER BY o.id DESC;`,
        };
    } else {
        query = {
            text: `SELECT o.id,
            o.user_id,
            o.cooker_id,
            o.status_id,
            o.comment,
            o.price,
            array_agg(oc.id) as order_contex_id,
            array_agg(oc.order_id) as order_id,
            array_agg(oc.recipe_id) as recipes_id,
            array_agg(oc.count) as count,
            array_agg(r.title) as recipes_title,
            u.fullname,
            u.email,
            u.role_id,
            os.status FROM orders o
          LEFT JOIN order_context as oc on oc.order_id = o.id
          LEFT JOIN recipes as r on r.id = oc.recipe_id
          LEFT JOIN users as u on u.id = o.cooker_id
          LEFT JOIN orders_status as os on os.id = o.status_id
          WHERE o.user_id='${userId}'
          group by o.id,u.id,os.id
          ORDER BY o.id DESC;`,
        };
    }
    return query;
};

UserModel.updateUserInfo = (editedField, editedValue, userId) => {
    const query = {
        text: `UPDATE users SET ${editedField} = $1 WHERE id = '${userId}'`,
        values: [editedValue],
    };
    return query;
};

UserModel.updateUserName = (editedValue, userId) => {
    const query = {
        text: `UPDATE users SET fullname = $1 WHERE id = '${userId}'`,
        values: [editedValue],
    };
    return query;
};

UserModel.updateUserRole = (editedValue, userId) => {
    const query = {
        text: `UPDATE users SET role_id = $1 WHERE id = '${userId}'`,
        values: [editedValue],
    };
    return query;
};

UserModel.updateUserAvatar = (ImageSrc, userId) => {
    const query = {
        text: `UPDATE users SET gravatar = $1 WHERE id = '${userId}'`,
        values: [ImageSrc],
    };
    return query;
};

UserModel.getUser = (userId) => {
    const query = {
        text: `SELECT users.*, users_roles.user_role FROM users JOIN users_roles ON users_roles.id=users.role_id WHERE users.id='${userId}'`,
    };
    return query;
};

UserModel.updateStatus = (userId, statusValue, orderId, roleId) => {
    let query;
    if (Number(roleId) === 2) {
        query = {
            text: `UPDATE orders SET status_id = $1 WHERE user_id = '${userId}' AND id = '${orderId}'`,
            values: [statusValue],
        };
    } else if (Number(roleId) === 3) {
        query = {
            text: `UPDATE orders SET status_id = $1 WHERE cooker_id = '${userId}' AND id = '${orderId}'`,
            values: [statusValue],
        };
    }
    return query;
};


module.exports = UserModel;
