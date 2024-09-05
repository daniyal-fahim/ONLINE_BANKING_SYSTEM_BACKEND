CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    fname VARCHAR(50),
    lname VARCHAR(50),
    nationality VARCHAR(50),
    gender VARCHAR(10)
);