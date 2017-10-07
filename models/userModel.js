const UserModel = {};

UserModel.getUserInfo = (userId) => {
    const query = {
        text: `SELECT users.*, users_roles.user_role FROM users JOIN users_roles ON users_roles.id=users.role_id WHERE users.id='${userId}'`,
    };
    return query;
};

UserModel.getUserOrders = (userId, roleId) => {
    let query;
    if (Number(roleId) === 2) {
        query = {
            text: `SELECT o.*, oc.*, r.title, u.fullname, u.role_id, os.status FROM orders o
                  LEFT JOIN order_context as oc on oc.order_id = o.id
                  LEFT JOIN recipes as r on r.id = oc.id
                  LEFT JOIN users as u on u.id = o.cooker_id
                  LEFT JOIN orders_status as os on os.id = o.status_id
                  WHERE o.user_id='${userId}'`,
        };
    } else if (Number(roleId) === 3) {
        query = {
            text: `SELECT o.*, oc.*, r.title, u.fullname, u.role_id, os.status FROM orders o
                  LEFT JOIN order_context as oc on oc.order_id = o.id
                  LEFT JOIN recipes as r on r.id = oc.id
                  LEFT JOIN users as u on u.id = o.user_id
                  LEFT JOIN orders_status as os on os.id = o.status_id
                  WHERE o.cooker_id='${userId}'`,
        };
    } else {
        query = {
            text: `SELECT o.*, oc.*, r.title, u.fullname, u.role_id, os.status FROM orders o
                  LEFT JOIN order_context as oc on oc.order_id = o.id
                  LEFT JOIN recipes as r on r.id = oc.id
                  LEFT JOIN users as u on u.id = o.user_id
                  LEFT JOIN orders_status as os on os.id = o.status_id
                  WHERE o.user_id='${userId}'`,
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

module.exports = UserModel;
