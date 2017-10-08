import db from '../db';

module.exports = function () {
    const createUsersRoles = {
        text: `CREATE TABLE IF NOT EXISTS users_roles(
              id          serial      PRIMARY KEY,
              user_role   varchar(30) UNIQUE
        );`,
        values: [],
    };
    const createTags = {
        text: `CREATE TABLE IF NOT EXISTS tags(
              id                  serial         PRIMARY KEY,
              name                varchar(30)    UNIQUE         NOT NULL,
              tag_description     text,
              tag_type            varchar(30)
        )`,
        values: [],
    };
    const createIngredients = {
        text: `CREATE TABLE IF NOT EXISTS ingredients(
              id            serial        PRIMARY KEY,
              name          varchar(30)   UNIQUE      NOT NULL,
              is_deleted    date          DEFAULT CURRENT_DATE,
              photo         varchar(200)
        )`,
        values: [],
    };

    const createUsers = {
        text: `CREATE TABLE IF NOT EXISTS users(
              id              serial        PRIMARY KEY,
              fullname        varchar(64),
              role_id         integer       references    users_roles(id),
              password        char(64),
              email           varchar(50)   UNIQUE,
              is_premium      boolean,
              phone_number    varchar(24),
              gravatar        varchar(100),
              about_me        text,
              is_activated    boolean DEFAULT FALSE,
              activation_id   char(36),
              is_deleted      date
          );`,
        values: [],
    };

    const createRecipes = {
        text: `CREATE TABLE IF NOT EXISTS recipes(
              id            serial        PRIMARY KEY,
              title         varchar(100)  UNIQUE,
              description   text,
              is_deleted    date          DEFAULT CURRENT_DATE,
              owner_id      integer       references users(id),
              photo         varchar(200),
              rating        integer
          )`,
        values: [],
    };

  const createCalc_card = {
    text: `CREATE TABLE IF NOT EXISTS calc_card(
          id              serial    PRIMARY KEY,
          recipe_id       integer  references recipes(id),
          ingredient_id   integer references ingredients(id)
          )`,
  values: [],
  }

  const createIngredients_map = {
    text: `CREATE TABLE IF NOT EXISTS ingredient_map(
          id              serial          PRIMARY KEY,
          ingredient_id   integer         references ingredients(id),
          is_deleted      date,
          lat             real,
          lon             real,
          price           varchar(10)
          )`,
  values: [],
  }

    const createRecipe_tag = {
        text: `CREATE TABLE IF NOT EXISTS recipe_tag(
          id              serial      PRIMARY KEY,
          recipe_id       integer     references recipes(id),
          tag_id          integer     references tags(id)
          )`,
        values: [],
    };

    const createOrder = {
        text: `CREATE TABLE IF NOT EXISTS orders(
          id              serial      PRIMARY KEY,
          user_id         integer     references users(id),
          cooker_id       integer,    
          status          integer     default 1,
          comment         varchar(200)
          )`,
        values: [],
    };

    const createOrderContext = {
        text: `CREATE TABLE IF NOT EXISTS order_context(
          id              serial      PRIMARY KEY,
          order_id        integer     references orders(id),
          recipe_id       integer     references recipes(id),
          count           integer,     
          price           integer
          )`,
        values: [],
    };

  const commentArr = [];
  commentArr[0]={
    text: `COMMENT ON TABLE users_roles IS 'Table with names of users roles'`,
    values: [],
  }
  commentArr[1] ={
    text:`COMMENT ON COLUMN users_roles.id IS 'ID number of user_role'`,
    value:[],
  }
  commentArr[2] ={
    text:`COMMENT ON COLUMN users_roles.user_role IS 'Name of user_role'`,
    value:[],
  }
  commentArr[3] ={
    text:`COMMENT ON TABLE users IS 'Table with main information about users'`,
    value:[],
  }
  commentArr[4] ={
    text:`COMMENT ON COLUMN users.id IS 'User ID number'`,
    value:[],
  }
  commentArr[5] ={
    text:`COMMENT ON COLUMN users.fullname IS 'User firstname and lastname'`,
    value:[],
  }
  commentArr[6] ={
    text:`COMMENT ON COLUMN users.role_id IS 'ID number of user role'`,
    value:[],
  }
  commentArr[7] ={
    text:`COMMENT ON COLUMN users.password IS 'Crypted  presentation of user password'`,
    value:[],
  }
  commentArr[8] ={
    text:`COMMENT ON COLUMN users.email IS 'User email adress'`,
    value:[],
  }
  commentArr[9] ={
    text:`COMMENT ON COLUMN users.is_premium IS 'Status of premium account'`,
    value:[],
  }
  commentArr[10] ={
    text:`COMMENT ON COLUMN users.phone_number IS 'User contact phone number'`,
    value:[],
  }
  commentArr[11] ={
    text:`COMMENT ON COLUMN users.is_deleted IS 'Status of user acount if value TRUE user deactiveted'`,
    value:[],
  }
  commentArr[12] ={
    text:`COMMENT ON COLUMN users.gravatar IS 'Link to user avatar picture'`,
    value:[],
  }
  commentArr[13] ={
    text:`COMMENT ON COLUMN users.about_me IS 'Additional information about user'`,
    value:[],
  }
  commentArr[14] ={
    text:`COMMENT ON TABLE recipes IS 'Table that consists cooking instructions and info about dishes'`,
    value:[],
  }
  commentArr[15] ={
    text:`COMMENT ON COLUMN recipes.id IS 'Recipe ID number'`,
    value:[],
  }
  commentArr[16] ={
    text:`COMMENT ON COLUMN recipes.title IS 'Name of dish'`,
    value:[],
  }
  commentArr[17] ={
    text:`COMMENT ON COLUMN recipes.description IS 'Cookimg instruction'`,
    value:[],
  }
  commentArr[18] ={
    text:`COMMENT ON COLUMN recipes.is_deleted IS 'Status of recipe if TRUE recipe dont show'`,
    value:[],
  }
  commentArr[19] ={
    text:`COMMENT ON COLUMN recipes.photo IS 'Link to dish photo'`,
    value:[],
  }
  commentArr[20] ={
    text:`COMMENT ON COLUMN recipes.rating IS 'Recipe quality assessment'`,
    value:[],
  }
  commentArr[21] ={
    text:`COMMENT ON TABLE ingredients IS 'Table with list of ingredients'`,
    value:[],
  }
  commentArr[22] ={
    text:`COMMENT ON COLUMN ingredients.id IS 'Ingredient ID number'`,
    value:[],
  }
  commentArr[23] ={
    text:`COMMENT ON COLUMN ingredients.name IS 'Ingredient name'`,
    value:[],
  }
  commentArr[24] ={
    text:`COMMENT ON COLUMN ingredients.is_deleted IS 'If TRUE dont show'`,
    value:[],
  }
  commentArr[25] ={
    text:`COMMENT ON COLUMN ingredients.photo IS 'Link to ingredient photo'`,
    value:[],
  }
  commentArr[26] ={
    text:`COMMENT ON TABLE calc_card IS 'Create many-to-many relation between tables resipes and ingredients'`,
    value:[],
  }
  commentArr[27] ={
    text:`COMMENT ON TABLE ingredient_map IS 'Table with data about ingredients position and price'`,
    value:[],
  }
  commentArr[28] ={
    text:`COMMENT ON COLUMN ingredient_map.lat IS 'Latitude'`,
    value:[],
  }
  commentArr[29] ={
    text:`COMMENT ON COLUMN ingredient_map.lon IS 'Longitude'`,
    value:[],
  }
  commentArr[30] ={
    text:`COMMENT ON COLUMN ingredient_map.price IS 'Actual ingredient price'`,
    value:[],
  }
  commentArr[31] ={
    text:`COMMENT ON TABLE tags IS 'Table with tags names and their description'`,
    value:[],
  }
  commentArr[32] ={
    text:`COMMENT ON COLUMN tags.name IS 'Tag name'`,
    value:[],
  }
  commentArr[33] ={
    text:`COMMENT ON COLUMN tags.tag_description IS 'Tag description, optional field'`,
    value:[],
  }
  commentArr[34] ={
    text:`COMMENT ON TABLE calc_card IS 'Create many-to-many relation between tables resipes and tags'`,
    value:[],
  }

  function addComments(arr){
    for (var i=0; i < arr.length; i++){
      db.query(arr[i],(err,res) => {
        if (err) console.log(err);
        else console.log(`Comment added`);
    })
  }
}

  console.log("START!");

  var p1 =new Promise((resolve, reject) => {
      db.query(createIngredients,(err, res) => {
          resolve('Table created');
    })
  })
  p1.then(res => {
    db.query(createIngredients_map,(err,res) => {
        console.log(res);
    })
  })

  var p2 =new Promise((resolve, reject) => {
    db.query(createUsersRoles,(err, res) => {
        resolve('Table created');
    })
  })
  p2.then(res => {
    db.query(createUsers,(err, res) => {
      console.log(res);
      db.query(createRecipes,(err,res) => {
        console.log(res);
        db.query(createCalc_card,(err, res) => {
          console.log(res);
      })
    })
  })

  var p3 =new Promise((resolve, reject) =>{
      db.query(createTags,(err,res) => {
          resolve('Table created');
        })
      })
  p3.then(res => {
      db.query(createRecipe_tag,(err, res) => {
          console.log(res);
      })
      db.query(createOrder,(err, res) => {
        console.log(err);
    })
    db.query(createOrderContext,(err, res) => {
      console.log(err);
  })
      
  })

  Promise.all([p1, p2, p3]).then(value =>{
    addComments(commentArr)
  })
})


}();