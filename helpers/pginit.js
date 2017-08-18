import pg from 'pg';
import config from '../config.js';

module.exports=function(){

const conString = `postgres://${config.userName}:${config.password}@${config.dbServerLocation}:${config.serverPort}/${config.dbName}`;
const client = new pg.Client(conString);

client.connect();
client.query(`CREATE TABLE IF NOT EXISTS users(
    id              serial        PRIMARY KEY,
    fullname        varchar(64)   NOT NULL,
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
    name        varchar(100)  NOT NULL,
    is_deleted    boolean       NOT NULL
)`);
client.query(`CREATE TABLE IF NOT EXISTS recipes(
    id            serial        PRIMARY KEY,
    title         varchar(100)  NOT NULL,
    description   text          NOT NULL,
    is_deleted    boolean       NOT NULL,
    owner_id      integer       references users(id),
    category_id   integer       references recipes_category(id),
    photo         varchar(100),
    rating        integer
)`);
client.query(`CREATE TABLE IF NOT EXISTS ingradients(
    id            serial        PRIMARY KEY,
    name          varchar(30)   NOT NULL,
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
    name         varchar(30)    NOT NULL
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

client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES
('Перші страви', FALSE);`);
client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES
('Другі страви', FALSE);`);
client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES
('Десерти', FALSE);`);
client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES
('Напої', FALSE);`);
client.query(`INSERT INTO recipes_category (name, is_deleted) VALUES
('Додатки', FALSE);`)

client.query(`INSERT INTO resipes (title, description, is_deleted, owner_id, category_id, photo, rating) VALUES
('СИРНИКИ З МАНКОЮ', 'Сир потрібно перетерти через сито, щоб не було грудочок і тісто вийшло більш однорідним. Додаємо до сиру цукор, манку, дрібку солі й перемішуємо за допомогою вилки або блендера. У разі, якщо сир був дещо сухим, додайте в отриману масу 1 ст. ложку молока або води.Тісто вийде трохи липким, тому візьміть на руки трохи борошна, щоб легше було формувати кульки. Розігрійте пательню з невеликою кількістю рослинного масла. Обсмажуйте сирники на середньому вогні близько 7 хвилин з кожного боку, накривши кришкою. Подавайте сирники гарячими, додавши сметану або варення.','1', '3', 'https://rud.ua/uploads/under_recipe/120131111838-120530010908-p-O-sirniki-s-izjumom-bez-muki.jpg', 5,)`
  , (err, res) => {
    console.log(err, res);
    client.end();
  });
}();

