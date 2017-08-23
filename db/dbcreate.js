import db from '../db';

module.exports=function(){

db.query(`CREATE TABLE IF NOT EXISTS users_roles(
    id          serial      PRIMARY KEY,
    user_role   varchar(30)
);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users_role created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS users(
    id              serial        PRIMARY KEY,
    fullname        varchar(64)   UNIQUE                        NOT NULL,
    user_role       integer       references    users_roles(id)       NOT NULL,
    passhesh        varchar(40)   NOT NULL,
    email           varchar(50)   NOT NULL,
    is_premium      boolean       NOT NULL,
    phone_number    varchar(24)   NOT NULL,
    is_deleted      boolean       NOT NULL      DEFAULT TRUE,
    gravatar        varchar(100),
    aboutMe         text
);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
}); 

db.query(`CREATE TABLE IF NOT EXISTS recipes_category(
    id            serial        PRIMARY KEY,
    name        varchar(100)    UNIQUE        NOT NULL,
    is_deleted    boolean       NOT NULL
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table recipes_category created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS recipes(
    id            serial        PRIMARY KEY,
    title         varchar(100)  UNIQUE        NOT NULL,
    description   text          NOT NULL,
    is_deleted    boolean       NOT NULL,
    owner_id      integer       references users(id),
    category_id   integer       references recipes_category(id),
    photo         varchar(200),
    rating        integer
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table recipes created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS ingradients(
    id            serial        PRIMARY KEY,
    name          varchar(30)   UNIQUE      NOT NULL,
    is_deleted    boolean       NOT NULL,
    photo         varchar(200)   
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table ingradients created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS calc_card(
    id              serial    PRIMARY KEY,
    resipe_id       serial  references recipes(id),
    ingredient_id   serial  references ingradients(id)
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table calc_card created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS ingradient_map(
    id              serial          PRIMARY KEY,
    ingredient_id   integer         references ingradients(id), 
    is_deleted      boolean         DEFAULT     FALSE,
    lat             real,
    lon             real,
    price           varchar(10)
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table ingradient_map created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS tags(
    id                  serial         PRIMARY KEY,
    name                varchar(30)    UNIQUE       NOT NULL,
    tag_description     text
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table tags created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS resipe_tag(
    id              serial      PRIMARY KEY,
    resipe_id       integer     references ingradients(id),
    tag_id          integer     references tags(id)
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table recipe_tag created!')}
});
}();