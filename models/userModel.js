
let userModel = {};

userModel.getUserInfo = (params) => {
      return `SELECT users.*, users_roles.user_role FROM users JOIN users_roles ON users_roles.id=users.role_id WHERE users.id='${params}'`;
  };

module.exports=userModel;
