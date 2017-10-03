const signinModel = {};

signinModel.findUserByEmail = (email) => {
    return `SELECT id, email, password FROM users WHERE email = '${email}'`
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
