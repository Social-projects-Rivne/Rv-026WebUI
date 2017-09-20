const signupModel = {};

signupModel.findEmail = email =>
    `SELECT email,is_deleted FROM users WHERE email = '${email}' LIMIT 1`;

signupModel.upsertIntoUsers = (email, phone, password, activationId) =>
    `INSERT INTO users (role_id, email, phone_number, password, is_activated, activation_id) VALUES ('1','${email}', '${phone}', '${password}', FALSE, '${activationId}') ON CONFLICT (email) DO UPDATE SET phone_number = '${phone}', password = '${password}', activation_id='${activationId}'`;

signupModel.updateIsActivated = activationId =>
    `UPDATE users SET is_activated='true' where activation_id='${activationId}'`;

module.exports = signupModel;
