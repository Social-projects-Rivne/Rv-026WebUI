import db from '../db';

module.exports=function(){
  
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

db.query(`INSERT INTO users (id, fullname, role_id, password, email, is_premium, phone_number, is_deleted, gravatar, about_me) VALUES
(51, 'JohnRosauser', 1, 'ba79baeb9f10896a46ae74715271b7f586e74123', 'JohnSRosa1@armyspy.com', FALSE, '+1-202-322-0101', FALSE, 'none', 'Im happy!');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO users (id, fullname, role_id, password, email, is_premium, phone_number, is_deleted, gravatar, about_me) VALUES
(52, 'GarrRoss', 1, 'ba79baeb9f10896a46ae74715271b7f586e74456', 'VasiliySRosa2@armyspy.com', FALSE, '+1-202-555-1337', FALSE, 'none', 'Im happy!');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO users (id, fullname, role_id, password, email, is_premium, phone_number, is_deleted, gravatar, about_me) VALUES
(53, 'StepanGiga', 1, 'ba79baeb9f10896a46ae74715271b7f586e74789', 'PetroSRosa3@armyspy.com', TRUE, '+1-420-555-0101', FALSE, 'none', 'Im happy!');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO users (id, fullname, role_id, password, email, is_premium, phone_number, is_deleted, gravatar, about_me) VALUES
(54, 'MyhailoPoplavskiy', 1, 'ba79baeb9f10896a46ae74715271b7f586e74999', 'MariRosa4@armyspy.com', TRUE, '+8-800-555-35-35', FALSE, 'none', 'Im happy!');`,
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

db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Цукор', 'FALSE', 'https://agropolit.com/media/news/original/00/02/2375/2216-real-693x463-3887.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Вода','FALSE', 'http://unity.lviv.ua/wp-content/uploads/2015/12/383930225.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Хліб','FALSE', 'http://senfil.net/uploads/posts/2014-10/1414486993_1547.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Майонез','FALSE', 'http://zakluchenie.com/wp-content/uploads/2016/11/maj.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Цибуля','FALSE', 'http://ukraineclub.net/sites/default/files/field/pdf/zybulya.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Морква','FALSE', 'http://likarski-roslini.net.ua/wp-content/uploads/2014/08/morkva-yak-l%D1%96karskij-zas%D1%96b.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Гриби','FALSE', 'https://adrenaline.name/uploads/posts/2016-09/thumbs/1474149239_griby-kopy.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Олія','FALSE', 'http://likarski-roslini.net.ua/wp-content/uploads/2014/11/pravilnij-vib%D1%96r-sonyashnikovoi-ol%D1%96i.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Вино','FALSE', 'https://bit.ua/wp-content/uploads/2015/03/DSC_0523.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Картопля','FALSE', 'http://infoherbs.com.ua/wp-content/uploads/2015/04/kartofel.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Вершки','FALSE', 'http://molokoferma.com.ua/73-large_default/vershki.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Мука','FALSE', 'http://cdn.bolshoyvopros.ru/files/users/images/cf/53/cf53ea864d66bce837da326792b99d35.png');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Сіль','FALSE', 'https://baker-group.net/images/v-evrope-zapretili-sol-s-iodatom-kaliya.jpg.pagespeed.ce.jKqxkj4eRB.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Перець','FALSE', 'http://okean-vkysa.com.ua/wp-content/uploads/2015/09/-----------------------6.jpg');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO ingredients (name, is_deleted, photo) VALUES ('Мишʼяк','TRUE', '');`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES 
(10, 'КРЕМ-СУП У ХЛІБНОМУ ГОРЩИКУ', 'Цибулю, моркву і гриби обсмажити на олії. Влити вино і випарувати його наполовину. Потім потрібно додати воду і картоплю. Коли страва буде готова, збити блендером, посолити і поперчити. Вилити вершки і залишити ще на 10 хвилин. З хліба зрізати вершечок, вийняти мякуш і запекти в духовці до утворення скоринки. Залити крем-суп у попередньо натертий часником хліб.', FALSE, 51, 'https://rud.ua/uploads/under_recipe/sup-v-hlebe.jpg', 2);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});  
db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES 
(20, 'Хліб з майонезом', 'Порізати хліб, намазати на хліб майонез.', FALSE, 52, 'https://i12.fotocdn.net/s9/30/public_pin_m/242/2268393757.jpg', 5);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES 
(30, 'Чай', 'Насипати чай в кружку, залити гарячою водою, якщоу вас немає діабету можна додати цукор за смаком.', FALSE, 53, 'http://www.fresher.ru/manager_content/images2/7-lyubopytnyx-faktov-o-granenom-stakane/big/3.jpg', 3);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipes (id, title, description, is_deleted, owner_id, photo, rating) VALUES 
(40, 'Вареники', 'Висипати свіжовпольовані вареники в гарячу воду, варити доки не злипнуться. bellissimo! Будь який шеф-повар буде в захваті!', FALSE, 54, 'dickinchocolate.jpg', 3);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (resipe_id, ingredient_id) VALUES 
(10, 1);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (resipe_id, ingredient_id) VALUES 
(10, 2);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (resipe_id, ingredient_id) VALUES 
(10, 3);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (resipe_id, ingredient_id) VALUES 
(30, 5);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (resipe_id, ingredient_id) VALUES 
(30, 6);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO calc_card (resipe_id, ingredient_id) VALUES 
(30, 7);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});

db.query(`INSERT INTO recipe_tag (resipe_id, tag_id) VALUES 
(30, 7);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipe_tag (resipe_id, tag_id) VALUES 
(30, 5);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
db.query(`INSERT INTO recipe_tag (resipe_id, tag_id) VALUES 
(30, 2);`,
(err, res) => {
  if (err) {console.log(err)}
  else {console.log(res)}
});
}(); 