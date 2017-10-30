import db from '../db';

module.exports = function(){

db.query(`INSERT INTO users_roles (id, user_role) VALUES (2, 'user');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO users_roles (id, user_role) VALUES (1, 'admin');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO users_roles (id, user_role) VALUES (3, 'cook');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});


db.query(`INSERT INTO users
(id, fullname, role_id, password, email, is_premium, phone_number, gravatar, about_me, is_activated, activation_id)
VALUES
(100, 'JohnRosauser', 2, '32d6e86feea61f0d2faa1ae7823ed797f42d7af69fb9b808a9a3480e3d52f0b4', 'JohnSRosa1@armyspy.com', FALSE, '+1-202-322-0101', 'none', 'Im happy!', FALSE, '47374f43-27e9-49ad-93b2-c90560189189'),
(200, 'GarrRoss', 2, 'ba79baeb9f10896a46ae74715271b7f586e74456', 'VasiliySRosa2@armyspy.com', FALSE, '+1-202-555-1337', 'none', 'Im happy!', FALSE, '47374f43-27e9-49ad-93b2-c90560189189'),
(300, 'StepanGiga', 2, 'ba79baeb9f10896a46ae74715271b7f586e74789', 'PetroSRosa3@armyspy.com', TRUE, '+1-420-555-0101', 'none', 'Im happy!', FALSE, '47374f43-27e9-49ad-93b2-c90560189189'),
(400, 'MyhailoPoplavskiy', 2, 'ba79baeb9f10896a46ae74715271b7f586e74999', 'MariRosa4@armyspy.com', TRUE, '+8-800-555-35-35', 'none', 'Im happy!', FALSE, '47374f43-27e9-49ad-93b2-c90560189189'),
(500, 'yuriy faievskyi', 3, '32d6e86feea61f0d2faa1ae7823ed797f42d7af69fb9b808a9a3480e3d52f0b4', 'urfaevskii@gmail.com', TRUE, '+8-800-555-35-35', '/public/images/avatars/default-avatar.jpg', 'Im happy!', TRUE, '47374f43-27e9-49ad-93b2-c90560189189');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO tags (id, name) VALUES (100, 'Італійська кухня');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO tags (id, name) VALUES (200, 'Легко готувати');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO tags (id, name) VALUES (300, 'Швидко готувати');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO tags (id, name) VALUES (400, 'Солоденьке');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO tags (id, name) VALUES (500, 'Гаряче');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO tags (id, name) VALUES (600, 'Холодне');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (100, 'Цукор', NULL, 'https://agropolit.com/media/news/original/00/02/2375/2216-real-693x463-3887.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (200, 'Вода',NULL, 'http://unity.lviv.ua/wp-content/uploads/2015/12/383930225.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (300, 'Хліб',NULL, 'http://senfil.net/uploads/posts/2014-10/1414486993_1547.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (400, 'Майонез',NULL, 'http://zakluchenie.com/wp-content/uploads/2016/11/maj.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (500, 'Цибуля',NULL, 'http://ukraineclub.net/sites/default/files/field/pdf/zybulya.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (600, 'Морква',NULL, 'http://likarski-roslini.net.ua/wp-content/uploads/2014/08/morkva-yak-l%D1%96karskij-zas%D1%96b.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (700, 'Гриби',NULL, 'https://adrenaline.name/uploads/posts/2016-09/thumbs/1474149239_griby-kopy.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (800, 'Олія',NULL, 'http://likarski-roslini.net.ua/wp-content/uploads/2014/11/pravilnij-vib%D1%96r-sonyashnikovoi-ol%D1%96i.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (900, 'Вино',NULL, 'https://bit.ua/wp-content/uploads/2015/03/DSC_0523.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (1000, 'Картопля',NULL, 'http://infoherbs.com.ua/wp-content/uploads/2015/04/kartofel.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (1100, 'Вершки',NULL, 'http://molokoferma.com.ua/73-large_default/vershki.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (1200, 'Мука',NULL, 'http://cdn.bolshoyvopros.ru/files/users/images/cf/53/cf53ea864d66bce837da326792b99d35.png');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (1300, 'Сіль',NULL, 'https://baker-group.net/images/v-evrope-zapretili-sol-s-iodatom-kaliya.jpg.pagespeed.ce.jKqxkj4eRB.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO ingredients (id, name, is_deleted, photo) VALUES (1400, 'Перець',NULL, 'http://okean-vkysa.com.ua/wp-content/uploads/2015/09/-----------------------6.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(100, 'КРЕМ-СУП У ХЛІБНОМУ ГОРЩИКУ', 'Цибулю, моркву і гриби обсмажити на олії. Влити вино і випарувати його наполовину. Потім потрібно додати воду і картоплю. Коли страва буде готова, збити блендером, посолити і поперчити. Вилити вершки і залишити ще на 10 хвилин. З хліба зрізати вершечок, вийняти мякуш і запекти в духовці до утворення скоринки. Залити крем-суп у попередньо натертий часником хліб.', NULL, 100, 'https://rud.ua/uploads/under_recipe/sup-v-hlebe.jpg', 2);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(200, 'Хліб з майонезом', 'Порізати хліб, намазати на хліб майонез.', NULL, 200, 'https://i12.fotocdn.net/s9/30/public_pin_m/242/2268393757.jpg', 5);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(300, 'Чай', 'Насипати чай в кружку, залити гарячою водою, якщоу вас немає діабету можна додати цукор за смаком.', NULL, 300, 'http://www.fresher.ru/manager_content/images2/7-lyubopytnyx-faktov-o-granenom-stakane/big/3.jpg', 3);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(400, 'Вареники', 'Висипати свіжовпольовані вареники в гарячу воду, варити доки не злипнуться. bellissimo! Будь який шеф-повар буде в захваті!', NULL, 400, 'dickinchocolate.jpg', 3);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES
(500, 'Котлети по домашньому', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', NULL, 400, 'http://поради.pp.ua/uploads/posts/2016-12/kotleti-z-ndichogo-farshu-recepti-prigotuvannya_603.jpeg', 4);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO calc_card (id, recipe_id, ingredient_id) VALUES
(100, 100, 300);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO calc_card (id, recipe_id, ingredient_id) VALUES
(200, 300, 500);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO calc_card (id, recipe_id, ingredient_id) VALUES
(300, 300, 600);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO calc_card (id, recipe_id, ingredient_id) VALUES
(400, 300, 700);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO calc_card (id, recipe_id, ingredient_id) VALUES
(800, 100, 800), (900, 100, 100), (1000, 100, 1100), (1100, 100, 1400), (1200, 200, 1300), (1300, 200, 700), (1400, 300, 1300);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipe_tag (id, recipe_id, tag_id) VALUES
(100, 300, 7);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipe_tag (id, recipe_id, tag_id) VALUES
(200, 300, 500);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipe_tag (id, recipe_id, tag_id) VALUES
(300, 300, 200);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipe_tag (id, recipe_id, tag_id) VALUES (400, 100, 100), (500, 100, 200), (600, 200, 300), (700, 200, 600), (800, 400, 500), (900, 300, 600)`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO orders_status (id, status) VALUES (1, 'new')`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO orders_status (id, status) VALUES (2, 'taken')`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO orders_status (id, status) VALUES (3, 'ready')`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO orders_status (id, status) VALUES (4, 'delivered')`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO orders_status (id, status) VALUES (5, 'paid')`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO orders_status (id, status) VALUES (6, 'canceled')`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO orders_status (id, status) VALUES (7, 're-opened')`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`
INSERT INTO orders(id, user_id, cooker_id, status_id, price, comment) VALUES 
(100, 100, 500, 1, 200, 'Youre an outstanding'),
(200, 100, 500, 1, 255, 'add less pepper'),
(300, 200, 500, 1, 100, 'cook without salt'),
(400, 100, null, 1, 310, 'use fresh vegetables');
`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`
INSERT INTO order_context(id, order_id, recipe_id, count) 
VALUES 
(100, 100, 200, 1),
(200, 100, 300, 5),
(300, 200, 400, 6),
(400, 200, 500, 1),
(500, 200, 100, 2),
(600, 300, 200, 2),
(700, 300, 300, 4),
(800, 300, 400, 5),
(900, 400, 100, 2),
(1000, 400, 200, 2),
(1100, 400, 300, 2);
`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

}();