let categoryModel = {};
categoryModel.GetAllCategory = () => {
    return `SELECT * FROM recipes_category`
  };

module.exports=categoryModel;