const signinModel = {};

signinModel.findUserByEmail = (email) => {
    const query = {
        text: `SELECT u.id, u.email, u.password, r.user_role 
        FROM users u 
        INNER JOIN users_roles r ON u.role_id = r.id
        WHERE u.email = $1`,
        values: [email],
    };
    return query;
};

signinModel.findRoleById = (userId) => {
    const query = {
        text: `SELECT r.user_role
            FROM users_roles r
            INNER JOIN users u ON u.role_id = r.id
            WHERE u.id = $1`,
        values: [userId],
    };
    return query;
};

module.exports = signinModel;
