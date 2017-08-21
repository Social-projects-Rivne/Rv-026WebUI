let signupModel = {};

signupModel.findEmail = (email) => {
    return `SELECT email FROM users WHERE email = '${email}' LIMIT 1`
};

signupModel.insertIntoRegistration = (confirmId, email, phone, password) => {
    return `INSERT INTO registration (id, email, phone, password) VALUES ('${confirmId}','${email}','${phone}','${password}')`
}

signupModel.findEmailByConfirmId = (confirmId) => {
    return `select email from registration where id='${confirmId}'`
}

signupModel.moveFromRegistrationToUsers = (confirmId, email) => {
    return `insert into users (email, phone, password) select email, phone, password from registration where id='${confirmId}'; update users set is_deleted=false; DELETE FROM registration
where email='${email}';`
}

module.exports = signupModel;
