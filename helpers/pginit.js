import pg from 'pg';
import config from '../config.js';

module.exports=function(){

const conString = `postgres://${config.userName}:${config.password}@${config.dbServerLocation}:${config.serverPort}/${config.dbName}`;
const client = new pg.Client(conString);

client.connect();
client.query(`CREATE TABLE IF NOT EXISTS users(
    id              serial        PRIMARY KEY,
    fullname        varchar(64)   UNIQUE        NOT NULL,
    userrole        varchar(20)   NOT NULL,
    passhesh        varchar(40)   NOT NULL,
    salt            varchar(16)   NOT NULL,
    email           varchar(50)   NOT NULL,
    is_premium      boolean       NOT NULL,
    phone_number    varchar(24)   NOT NULL,
    is_deleted      boolean       NOT NULL,
    avatar          varchar(100),
    aboutMe         text
);`); 

client.query(`CREATE TABLE IF NOT EXISTS recipes_category(
    id            serial        PRIMARY KEY,
    name        varchar(100)    UNIQUE        NOT NULL,
    is_deleted    boolean       NOT NULL
)`);
client.query(`CREATE TABLE IF NOT EXISTS recipes(
    id            serial        PRIMARY KEY,
    title         varchar(100)  UNIQUE        NOT NULL,
    description   text          NOT NULL,
    is_deleted    boolean       NOT NULL,
    owner_id      integer       references users(id),
    category_id   integer       references recipes_category(id),
    photo         varchar(100),
    rating        integer
)`);
client.query(`CREATE TABLE IF NOT EXISTS ingradients(
    id            serial        PRIMARY KEY,
    name          varchar(30)   UNIQUE      NOT NULL,
    is_deleted    boolean       NOT NULL,
    photo         varchar(100)   
)`);
client.query(`CREATE TABLE IF NOT EXISTS calc_card(
    id              serial    PRIMARY KEY,
    resipe_id       serial  references recipes(id),
    ingredient_id   serial  references ingradients(id)
)`);
client.query(`CREATE TABLE IF NOT EXISTS ingradient_map(
    id              serial          PRIMARY KEY,
    ingredient_id   integer         references ingradients(id), 
    is_deleted      boolean         NOT NULL,
    lat             real,
    lon             real,
    price           varchar(10)
)`);
client.query(`CREATE TABLE IF NOT EXISTS tags(
    id           serial         PRIMARY KEY,
    name         varchar(30)    UNIQUE      NOT NULL
)`);
client.query(`CREATE TABLE IF NOT EXISTS resipe_tag(
    id              serial      PRIMARY KEY,
    resipe_id       integer     references ingradients(id),
    tag_id          integer     references tags(id)
)`);
client.query(`CREATE TABLE IF NOT EXISTS registartion(
    id              varchar(36)   PRIMARY KEY,
    email           varchar(50)   NOT NULL,
    phone           varchar(24)   NOT NULL,
    password        varchar(64)   NOT NULL,
)`);

client.query(`INSERT INTO users (fullname, userrole,passhesh, salt, email, is_premium, phone_number, is_deleted, avatar, aboutMe) VALUES
('JohnRosauser', 'user','ba79baeb9f10896a46ae74715271b7f586e74640', 'sflprt49fhi2',  'JohnSRosa@armyspy.com', FALSE, '+1-202-322-0101', FALSE, 'none', 'Im happy!');`);
client.query(`INSERT INTO users (fullname, userrole,passhesh, salt, email, is_premium, phone_number, is_deleted, avatar, aboutMe) VALUES
('GarrRoss', 'user','ba79baeb9f10896a46ae74715271b7f586e74640', 'sflprt49fhi2',  'JohnSRosa@armyspy.com', FALSE, '+1-202-555-1337', FALSE, 'none', 'Im happy!');`);
client.query(`INSERT INTO users (fullname, userrole,passhesh, salt, email, is_premium, phone_number, is_deleted, avatar, aboutMe) VALUES
('StepanGiga', 'user','ba79baeb9f10896a46ae74715271b7f586e74640', 'sflprt49fhi2',  'JohnSRosa@armyspy.com', TRUE, '+1-420-555-0101', FALSE, 'none', 'Im happy!');`);
client.query(`INSERT INTO users (fullname, userrole,passhesh, salt, email, is_premium, phone_number, is_deleted, avatar, aboutMe) VALUES
('MyhailoPoplavskiy', 'user','ba79baeb9f10896a46ae74715271b7f586e74640', 'sflprt49fhi2',  'JohnSRosa@armyspy.com', TRUE, '+8-800-555-35-35', FALSE, 'none', 'Im happy!');`);

client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES ('Перші страви', FALSE);`);
client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES ('Другі страви', FALSE);`);
client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES ('Десерти', FALSE);`);
client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES ('Напої', FALSE);`);
client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES ('Додатки', FALSE);`)

client.query(`INSERT INTO tags (name) VALUES ('Італійська кухня');`);
client.query(`INSERT INTO tags (name) VALUES ('Легко готувати');`);
client.query(`INSERT INTO tags (name) VALUES ('Швидко готувати');`);
client.query(`INSERT INTO tags (name) VALUES ('Солоденьке');`);
client.query(`INSERT INTO tags (name) VALUES ('Гаряче');`);
client.query(`INSERT INTO tags (name) VALUES ('Холодне');`);

client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Цукор', 'FALSE', 'https://agropolit.com/media/news/original/00/02/2375/2216-real-693x463-3887.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Вода','FALSE', 'http://unity.lviv.ua/wp-content/uploads/2015/12/383930225.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Хліб','FALSE', 'http://senfil.net/uploads/posts/2014-10/1414486993_1547.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Майонез','FALSE', 'http://zakluchenie.com/wp-content/uploads/2016/11/maj.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Цибуля','FALSE', 'http://ukraineclub.net/sites/default/files/field/pdf/zybulya.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Морква','FALSE', 'http://likarski-roslini.net.ua/wp-content/uploads/2014/08/morkva-yak-l%D1%96karskij-zas%D1%96b.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Гриби','FALSE', 'https://adrenaline.name/uploads/posts/2016-09/thumbs/1474149239_griby-kopy.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Олія','FALSE', 'http://likarski-roslini.net.ua/wp-content/uploads/2014/11/pravilnij-vib%D1%96r-sonyashnikovoi-ol%D1%96i.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Вино','FALSE', 'https://bit.ua/wp-content/uploads/2015/03/DSC_0523.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Картопля','FALSE', 'http://infoherbs.com.ua/wp-content/uploads/2015/04/kartofel.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Вершки','FALSE', 'http://molokoferma.com.ua/73-large_default/vershki.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Мука','FALSE', 'http://cdn.bolshoyvopros.ru/files/users/images/cf/53/cf53ea864d66bce837da326792b99d35.png');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Сіль','FALSE', 'https://baker-group.net/images/v-evrope-zapretili-sol-s-iodatom-kaliya.jpg.pagespeed.ce.jKqxkj4eRB.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Перець','FALSE', 'http://okean-vkysa.com.ua/wp-content/uploads/2015/09/-----------------------6.jpg');`);
client.query(`INSERT INTO ingradients (name, is_deleted, photo) VALUES ('Мишʼяк','TRUE', '');`);

client.query(`INSERT INTO recipes (title, description, is_deleted, owner_id, category_id, photo, rating) VALUES 
('КРЕМ-СУП У ХЛІБНОМУ ГОРЩИКУ', 'Цибулю, моркву і гриби обсмажити на олії. Влити вино і випарувати його наполовину. Потім потрібно додати воду і картоплю. Коли страва буде готова, збити блендером, посолити і поперчити. Вилити вершки і залишити ще на 10 хвилин. З хліба зрізати вершечок, вийняти мякуш і запекти в духовці до утворення скоринки. Залити крем-суп у попередньо натертий часником хліб.', FALSE, 3, 3, 'https://rud.ua/uploads/under_recipe/sup-v-hlebe.jpg', 2);`);  
client.query(`INSERT INTO recipes (title, description, is_deleted, owner_id, category_id, photo, rating) VALUES 
('Хліб з майонезом', 'Порізати хліб, намазати на хліб майонез.', FALSE, 3, 1, 'https://i12.fotocdn.net/s9/30/public_pin_m/242/2268393757.jpg', 5);`);
client.query(`INSERT INTO recipes (title, description, is_deleted, owner_id, category_id, photo, rating) VALUES 
('Чай', 'Насипати чай в кружку, залити гарячою водою, якщоу вас немає діабету можна додати цукор за смаком.', FALSE, 1, 5, 'http://www.fresher.ru/manager_content/images2/7-lyubopytnyx-faktov-o-granenom-stakane/big/3.jpg', 3);`);
client.query(`INSERT INTO recipes (title, description, is_deleted, owner_id, category_id, photo, rating) VALUES 
('Вареники', 'Висипати свіжовпольовані вареники в гарячу воду, варити доки не злипнуться. bellissimo! Будь який шеф-повар буде в захваті!', FALSE, 2, 5, 'dickinchocolate.jpg', 3);`),(err, res) => {console.log(err, res);client.end();});
}();