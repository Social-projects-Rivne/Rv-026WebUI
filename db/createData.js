const tablesData = [
    {
        tableName: 'users_roles',
        column: `    
            id          serial      PRIMARY KEY,
            user_role   varchar(30) UNIQUE`,
    },
    {
        tableName: 'tags',
        column: `
            id                  serial         PRIMARY KEY,
            name                varchar(30)    UNIQUE         NOT NULL,
            tag_description     text,
            tag_type            varchar(30)`,
    },
    {
        tableName: 'ingredients',
        column: `
            id            serial        PRIMARY KEY,
            name          varchar(30)   UNIQUE      NOT NULL,
            is_deleted    date          DEFAULT CURRENT_DATE,
            photo         varchar(200)`,
    },
    {
        tableName: 'users',
        column: `
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
            is_deleted      date`,
    },
    {
        tableName: 'recipes',
        column: `
            id            serial        PRIMARY KEY,
            title         varchar(100)  UNIQUE,
            description   text,
            is_deleted    date          DEFAULT CURRENT_DATE,
            owner_id      integer       references users(id),
            photo         varchar(200),
            rating        integer`,
    },
    {
        tableName: 'calc_card',
        column: `
            id              serial    PRIMARY KEY,
            recipe_id       integer  references recipes(id),
            ingredient_id   integer references ingredients(id)`,
    },
    {
        tableName: 'ingredient_map',
        column: `
            id              serial          PRIMARY KEY,
            ingredient_id   integer         references ingredients(id),
            is_deleted      date,
            lat             real,
            lon             real,
            price           varchar(10)`,
    },
    {
        tableName: 'recipe_tag',
        column: `
            id              serial      PRIMARY KEY,
            recipe_id       integer     references recipes(id),
            tag_id          integer     references tags(id)`,
    },
    {
        tableName: 'orders_status',
        column: `
            id        serial      PRIMARY KEY,
            status    varchar(30) UNIQUE`,
    },
    {
        tableName: 'orders',
        column: `
            id              serial      PRIMARY KEY,
            user_id         integer     references users(id),
            cooker_id       integer,    
            status_id       integer     references orders_status(id),
            comment         varchar(200),
            price           integer`,
    },
    {
        tableName: 'order_context',
        column: `
            id              serial      PRIMARY KEY,
            order_id        integer     references orders(id),
            recipe_id       integer    references recipes(id),
            count           integer`,
    },

];

module.exports = {
    tablesData,
};
