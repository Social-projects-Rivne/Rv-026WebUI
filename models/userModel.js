class userModel {

  getUserInfo(userId) {
      return `SELECT users.*, users_roles.user_role FROM users JOIN users_roles ON users_roles.id=users.role_id WHERE users.id='${userId}'`
  };

  updateUserInfo(editedField, editedValue, userId) {
      const query = {
          text: `UPDATE users SET ${editedField} = $1 WHERE id = '${userId}'`,
          values: [editedValue]
      }
      return query;
  };

  updateUserName(editedValue, userId) {
      const query = {
          text: `UPDATE users SET fullname = $1 WHERE id = '${userId}'`,
          values: [editedValue]
      }
      return query;
  };

  updateUserRole(editedValue, userId) {
      const query = {
          text: `UPDATE users SET role_id = $1 WHERE id = '${userId}'`,
          values: [editedValue]
      }
      return query;
  };

  updateUserAvatar(ImageSrc, userId) {
      const query = {
          text: `UPDATE users SET gravatar = $1 WHERE id = '${userId}'`,
          values: [ImageSrc]
      }
      return query;
  };
}

module.exports = userModel;
