let signupModel = {};

signupModel.findEmail = (email) => {
    return `SELECT email,is_deleted FROM users WHERE email = '${email}' LIMIT 1`
};

signupModel.upsertIntoUsers = (email, phone, password) => {
    return `INSERT INTO users (email, phone_number, password) VALUES ('${email}', '${phone}', '${password}') ON CONFLICT (email) DO UPDATE SET phone_number = '${phone}', password = '${password}'`;
}

signupModel.getId = (email) => {
    return `SELECT id from users where email='${email}'`
}

signupModel.updateIsDeleted = (id) => {
    return `UPDATE users SET is_deleted='false' where id='${id}'`
}

module.exports = signupModel;
