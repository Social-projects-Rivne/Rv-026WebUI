
let roleModel = {};

roleModel.getRoleName = (params) => {
      return `SELECT user_role FROM users_roles WHERE id='${params}'`;
};

module.exports=roleModel;
