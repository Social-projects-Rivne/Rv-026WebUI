
let userModel = {};

userModel.getUserInfo = (params) => {
    return `SELECT * FROM users WHERE id='${params}'`;
  };

module.exports=userModel;
