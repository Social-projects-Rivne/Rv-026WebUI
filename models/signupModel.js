let signupModel = {};

signupModel.findEmail = (email) => {
    return `SELECT email,is_deleted FROM users WHERE email = '${email}' LIMIT 1`
};

signupModel.upsertIntoUsers = (email, phone, password) => {
    return `INSERT INTO users (email, phone, password, is_deleted) VALUES ('${email}', '${phone}', '${password}', true) ON CONFLICT (email) DO UPDATE SET phone = '${phone}', password = '${password}'`;
}

signupModel.getId = (email) => {
    return `SELECT id from users where email='${email}'`
}

signupModel.updateIsDeleted = (id) => {
    return `UPDATE users SET is_deleted='false' where id='${id}'`
}

module.exports = signupModel;
