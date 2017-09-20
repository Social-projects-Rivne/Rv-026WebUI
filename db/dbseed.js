import db from '../db';

module.exports = function(){

db.query(`INSERT INTO users_roles (user_role) VALUES ('user');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO users_roles (user_role) VALUES ('admin');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

  db.query(`INSERT INTO users
  (id, fullname, role_id, password, email, is_premium, phone_number, gravatar, about_me, is_activated)
  VALUES
  (1, 'JohnRosauser', 1, 'ba79baeb9f10896a46ae74715271b7f586e74123', 'JohnSRosa1@armyspy.com', FALSE, '+1-202-322-0101', 'none', 'Im happy!', FALSE),
  (2, 'GarrRoss', 1, 'ba79baeb9f10896a46ae74715271b7f586e74456', 'VasiliySRosa2@armyspy.com', FALSE, '+1-202-555-1337', 'none', 'Im happy!', FALSE),
  (3, 'StepanGiga', 1, 'ba79baeb9f10896a46ae74715271b7f586e74789', 'PetroSRosa3@armyspy.com', TRUE, '+1-420-555-0101', 'none', 'Im happy!', FALSE),
  (4, 'MyhailoPoplavskiy', 1, 'ba79baeb9f10896a46ae74715271b7f586e74999', 'MariRosa4@armyspy.com', TRUE, '+8-800-555-35-35', 'none', 'Im happy!', FALSE);`,
  (err, res) => {
    if (err) {console.log(err)}
    else {console.log(res)}
  });

db.query(`INSERT INTO tags (name) VALUES ('Італійська кухня');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO tags (name) VALUES ('Легко готувати');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO tags (name) VALUES ('Швидко готувати');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO tags (name) VALUES ('Солоденьке');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO tags (name) VALUES ('Гаряче');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO tags (name) VALUES ('Холодне');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Цукор', NULL, 'https://agropolit.com/media/news/original/00/02/2375/2216-real-693x463-3887.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Вода',NULL, 'http://unity.lviv.ua/wp-content/uploads/2015/12/383930225.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Хліб',NULL, 'http://senfil.net/uploads/posts/2014-10/1414486993_1547.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Майонез',NULL, 'http://zakluchenie.com/wp-content/uploads/2016/11/maj.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Цибуля',NULL, 'http://ukraineclub.net/sites/default/files/field/pdf/zybulya.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Морква',NULL, 'http://likarski-roslini.net.ua/wp-content/uploads/2014/08/morkva-yak-l%D1%96karskij-zas%D1%96b.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Гриби',NULL, 'https://adrenaline.name/uploads/posts/2016-09/thumbs/1474149239_griby-kopy.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Олія',NULL, 'http://likarski-roslini.net.ua/wp-content/uploads/2014/11/pravilnij-vib%D1%96r-sonyashnikovoi-ol%D1%96i.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Вино',NULL, 'https://bit.ua/wp-content/uploads/2015/03/DSC_0523.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Картопля',NULL, 'http://infoherbs.com.ua/wp-content/uploads/2015/04/kartofel.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Вершки',NULL, 'http://molokoferma.com.ua/73-large_default/vershki.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Мука',NULL, 'http://cdn.bolshoyvopros.ru/files/users/images/cf/53/cf53ea864d66bce837da326792b99d35.png');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Сіль',NULL, 'https://baker-group.net/images/v-evrope-zapretili-sol-s-iodatom-kaliya.jpg.pagespeed.ce.jKqxkj4eRB.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Перець',NULL, 'http://okean-vkysa.com.ua/wp-content/uploads/2015/09/-----------------------6.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name) VALUES ('Мишʼяк');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Чай',NULL, 'http://provitaminki.com/wp-content/uploads/2015/05/81_20052-300x240.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(10, 'КРЕМ-СУП У ХЛІБНОМУ ГОРЩИКУ', 'Цибулю, моркву і гриби обсмажити на олії. Влити вино і випарувати його наполовину. Потім потрібно додати воду і картоплю. Коли страва буде готова, збити блендером, посолити і поперчити. Вилити вершки і залишити ще на 10 хвилин. З хліба зрізати вершечок, вийняти мякуш і запекти в духовці до утворення скоринки. Залити крем-суп у попередньо натертий часником хліб.', NULL, 1, 'https://rud.ua/uploads/under_recipe/sup-v-hlebe.jpg', 2);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(20, 'Хліб з майонезом', 'Порізати хліб, намазати на хліб майонез.', NULL, 2, 'https://i12.fotocdn.net/s9/30/public_pin_m/242/2268393757.jpg', 5);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(30, 'Чай', 'Насипати чай в кружку, залити гарячою водою, якщоу вас немає діабету можна додати цукор за смаком.', NULL, 3, 'http://www.fresher.ru/manager_content/images2/7-lyubopytnyx-faktov-o-granenom-stakane/big/3.jpg', 3);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(40, 'Вареники', 'Висипати свіжовпольовані вареники в гарячу воду, варити доки не злипнуться. bellissimo! Будь який шеф-повар буде в захваті!', NULL, 4, 'dickinchocolate.jpg', 3);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});


db.query(`INSERT INTO calc_card (recipe_id, ingredient_id) VALUES
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6), (10, 7), (10, 8), (10, 10), (10, 11), (10, 14), (20, 14), (20, 15), (30, 13);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (recipe_id, ingredient_id) VALUES
(10, 3);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (recipe_id, ingredient_id) VALUES
(30, 5);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (recipe_id, ingredient_id) VALUES
(30, 6);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (recipe_id, ingredient_id) VALUES
(30, 7);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipe_tag (recipe_id, tag_id) VALUES
(30, 7);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipe_tag (recipe_id, tag_id) VALUES
(30, 5);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipe_tag (recipe_id, tag_id) VALUES
(30, 2);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipe_tag (recipe_id, tag_id) VALUES (10,1), (10,2), (20,3), (20,6), (30,5), (30,6)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
}();