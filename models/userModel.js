const UserModel = {};

UserModel.getUserInfo = (userId) => {
    const query = {
        text: `SELECT o.id,
            o.cooker_id,
            o.status,
            u.id as owner_id,
            u.fullname,
            u.email,
            u.gravatar,
            u.about_me,
            u.phone_number,
            u.role_id,
            u.is_premium,
            ur.user_role,
            ur.id,
            array_agg(oc.id) as order_id,
            array_agg(oc.price) as order_price,
            array_agg(r.id) as recipes_id,
            array_agg(r.title) as recipes_title
        FROM orders o
        RIGHT JOIN order_context oc ON oc.order_id = o.id
        RIGHT OUTER JOIN recipes r ON oc.recipe_id = r.id
        RIGHT OUTER JOIN users u ON u.id = o.user_id
        RIGHT OUTER JOIN users_roles ur ON ur.id = u.role_id
        where u.id = '${userId}'
        group by o.id,u.id,ur.id`,
    };
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

module.exports = UserModel;
