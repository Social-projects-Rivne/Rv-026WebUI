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
);
COPY users FROM '../helpers/users.csv' DELIMITER '|' CSV HEADER;
`); 

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
)`, (err, res) => {
    console.log(err, res)
    client.end()
  });

}();

