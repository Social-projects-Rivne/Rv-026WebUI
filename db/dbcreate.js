import db from '../db';

module.exports=function(){

  const  createUsers_roles= {
    text: `CREATE TABLE IF NOT EXISTS users_roles(
            id          serial      PRIMARY KEY,
            user_role   varchar(30)
          );`,
    values: [],
  }
  const createTags = {
    text:`CREATE TABLE IF NOT EXISTS tags(
            id                  serial         PRIMARY KEY,
            name                varchar(30)    UNIQUE       NOT NULL,
            tag_description     text
          )`,
    values: [],
  }
  const createIngredients = {
    text:`CREATE TABLE IF NOT EXISTS ingredients(
            id            serial        PRIMARY KEY,
            name          varchar(30)   UNIQUE      NOT NULL,
            is_deleted    boolean       NOT NULL,
            photo         varchar(200)   
          )`,
    values: [],
  }

  const createUsers ={
    text: `CREATE TABLE IF NOT EXISTS users(
              id              serial        PRIMARY KEY,
              fullname        varchar(64)   UNIQUE                        NOT NULL,
              role_id         integer       references    users_roles(id)       NOT NULL,
              passhesh        varchar(40)   NOT NULL,
              email           varchar(50)   NOT NULL,
              is_premium      boolean       NOT NULL,
              phone_number    varchar(24)   NOT NULL,
              is_deleted      boolean       NOT NULL      DEFAULT TRUE,
              gravatar        varchar(100),
              about_me         text
          );`,
    values: [],
  }

  const createRecipes = {
    text: `CREATE TABLE IF NOT EXISTS recipes(
              id            serial        PRIMARY KEY,
              title         varchar(100)  UNIQUE        NOT NULL,
              description   text          NOT NULL,
              is_deleted    boolean       NOT NULL,
              owner_id      integer       references users(id),
              photo         varchar(200),
              rating        integer
          )`,
    values: [],
  }

  const createCalc_card = {
    text: `CREATE TABLE IF NOT EXISTS calc_card(
          id              serial    PRIMARY KEY,
          resipe_id       integer  references recipes(id),
          ingredient_id   integer references ingredients(id)
          )`,
  values: [],
  }

  const createIngredients_map = {
    text: `CREATE TABLE IF NOT EXISTS ingredient_map(
          id              serial          PRIMARY KEY,
          ingredient_id   integer         references ingredients(id), 
          is_deleted      boolean         DEFAULT     FALSE,
          lat             real,
          lon             real,
          price           varchar(10)
          )`,
  values: [],
  }

  const createRecipe_tag = {
    text: `CREATE TABLE IF NOT EXISTS resipe_tag(
          id              serial      PRIMARY KEY,
          resipe_id       integer     references ingredients(id),
          tag_id          integer     references tags(id)
          )`,
  values: [],
  }


  console.log("START!");

var p1 =new Promise((resolve, reject) => {
    db.query(createIngredients,(err, res) => {
        resolve('Table created');
      });
    })
  p1.then(res => {
    db.query(createIngredients_map,(err,res) => {
      console.log(res);
    });       
  })

var p2 =new Promise((resolve, reject) => {
    db.query(createUsers_roles,(err, res) => {
        resolve('Table created');
      });
    })
  p2.then(res => {
    db.query(createUsers,(err, res) => {
      db.query(createRecipes,(err,res) => {
        console.log(res);
        db.query(createCalc_card,(err, res) => {
          console.log(res);
      })
    });
  })
})

var p3 =new Promise((resolve, reject) =>
  {
   db.query(createTags,(err,res) => {
     resolve('Table created');
   }) 
  });
  p3.then(res => {
    db.query(createRecipe_tag,(err, res) => {
      console.log(res);
    });
    });
  
}();
