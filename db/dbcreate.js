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

db.query(`COMMENT ON TABLE users_roles IS 'Table with names of users roles'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users_roles.id IS 'ID number of user_role'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users_roles.user_role IS 'Name of user_role'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS users(
    id              serial        PRIMARY KEY,
    fullname        varchar(64)   UNIQUE                        NOT NULL,
    role_id      integer       references    users_roles(id)       NOT NULL,
    passhesh        varchar(40)   NOT NULL,
    email           varchar(50)   NOT NULL,
    is_premium      boolean       NOT NULL,
    phone_number    varchar(24)   NOT NULL,
    is_deleted      boolean       NOT NULL      DEFAULT TRUE,
    gravatar        varchar(100),
    about_me         text
);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});

db.query(`COMMENT ON TABLE users IS 'Table with main information about users'`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.id IS 'User ID number'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.fullname IS 'User firstname and lastname'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.role_id IS 'ID number of user role'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.passhesh IS 'Crypted  presentation of user password'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.email IS 'User email adress'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.is_premium IS 'Status of premium account'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.phone_number IS 'User contact phone number'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.is_deleted IS 'Status of user acount if value TRUE user deactiveted'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});;
db.query(`COMMENT ON COLUMN users.gravatar IS 'Link to user avatar picture'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN users.about_me IS 'Additional information about user'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS recipes(
    id            serial        PRIMARY KEY,
    title         varchar(100)  UNIQUE        NOT NULL,
    description   text          NOT NULL,
    is_deleted    boolean       NOT NULL,
    owner_id      integer       references users(id),
    photo         varchar(200),
    rating        integer
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table recipes created!')}
});

db.query(`COMMENT ON TABLE recipes IS 'Table that consists cooking instructions and info about dishes'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN recipes.id IS 'Recipe ID number'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN recipes.title IS 'Name of dish'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN recipes.description IS 'Cookimg instruction'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN recipes.is_deleted IS 'Status of recipe if TRUE recipe dont show'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN recipes.photo IS 'Link to dish photo'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN recipes.rating IS 'Recipe quality assessment'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS ingredients(
    id            serial        PRIMARY KEY,
    name          varchar(30)   UNIQUE      NOT NULL,
    is_deleted    boolean       NOT NULL,
    photo         varchar(200)   
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table ingredients created!')}
});

db.query(`COMMENT ON TABLE ingredients IS 'Table with list of ingredients'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN ingredients.id IS 'Ingredient ID number'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN ingredients.name IS 'Ingredient name'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN ingredients.is_deleted IS 'If TRUE dont show'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN ingredients.photo IS 'Link to ingredient photo'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});

db.query(`CREATE TABLE IF NOT EXISTS calc_card(
    id              serial    PRIMARY KEY,
    resipe_id       serial  references recipes(id),
    ingredient_id   serial  references ingredients(id)
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table calc_card created!')}
});

db.query(`COMMENT ON TABLE calc_card IS 'Create many-to-many relation between tables resipes and ingredients'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});


db.query(`CREATE TABLE IF NOT EXISTS ingredient_map(
    id              serial          PRIMARY KEY,
    ingredient_id   integer         references ingredients(id), 
    is_deleted      boolean         DEFAULT     FALSE,
    lat             real,
    lon             real,
    price           varchar(10)
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table ingradient_map created!')}
});

db.query(`COMMENT ON TABLE ingredient_map IS 'Table with data about ingredients position and price'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN ingredient_map.lat IS 'Latitude'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN ingredient_map.lon IS 'Longitude'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN ingredient_map.price IS 'Actual ingredient price'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
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

db.query(`COMMENT ON TABLE tags IS 'Table with tags names and their description'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN tags.name IS 'Tag name'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
db.query(`COMMENT ON COLUMN tags.tag_description IS 'Tag description, optional field'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});


db.query(`CREATE TABLE IF NOT EXISTS resipe_tag(
    id              serial      PRIMARY KEY,
    resipe_id       integer     references ingredients(id),
    tag_id          integer     references tags(id)
)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table recipe_tag created!')}
});
db.query(`COMMENT ON TABLE calc_card IS 'Create many-to-many relation between tables resipes and tags'`,(err, res) => {
  if (err) {console.log(err)}
  else {console.log('Table users created!')}
});
}();
