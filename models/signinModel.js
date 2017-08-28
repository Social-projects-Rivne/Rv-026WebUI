let signinModel = {};

signinModel.findUserByEmail = (email) => {
    return `SELECT id, email, password FROM users WHERE email = '${email}'`
};

module.exports = signinModel;
