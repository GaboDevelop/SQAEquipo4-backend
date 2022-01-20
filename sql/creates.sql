
CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,

);

CREATE TABLE user_sys (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    state BOOLEAN NOT NULL,
    rol_id INTEGER NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES rol(id)
);

CREATE TABLE access_system (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_sys(id)
);

CREATE TABLE offer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    discount INTEGER NOT NULL,
    code VARCHAR(255) NOT NULL
);

CREATE TABLE sandwich (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE order_sandwich (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    user_id INTEGER NOT NULL,
    cashier_id INTEGER NOT NULL,
    offer_id INTEGER NULL,
    price INTEGER NULL,
    total_price INTEGER NULL,
    estimate_time INTEGER NULL,
    comment VARCHAR(255) NULL,
    discount INTEGER NULL,
    FOREIGN KEY (user_id) REFERENCES user_sys(id),
    FOREIGN KEY (offer_id) REFERENCES offer(id)
)


CREATE TABLE order_sandwich_ingredient (
    id SERIAL PRIMARY KEY,
    price_sandwich INTEGER NOT NULL,
    price_ingredient INTEGER NOT NULL,
    price_total INTEGER NOT NULL,
    sandwich_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
    FOREIGN KEY (sandwich_id) REFERENCES sandwich(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
    FOREIGN KEY (order_id) REFERENCES order_sandwich(id)
);


