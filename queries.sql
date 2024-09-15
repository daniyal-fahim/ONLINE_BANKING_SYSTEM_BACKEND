CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    fname VARCHAR(50),
    lname VARCHAR(50),
    nationality VARCHAR(50),
    gender VARCHAR(10)
);

ALTER TABLE users RENAME COLUMN username TO email;

CREATE TABLE bills (
  selectedBill VARCHAR(255), -- Define the data type for selectedBill
  selectedCompany VARCHAR(255),
  Id SERIAL PRIMARY KEY,       -- Id as the primary key with auto-increment
  Amount DECIMAL(10, 2),       -- Assuming Amount is a decimal with 2 decimal places
  Username VARCHAR(255),       -- Username, which will be a foreign key
  Month1 VARCHAR(50),           -- Define the data type for Month
  BillEmail VARCHAR(255),          -- Define the data type for Email
  "Check" BOOLEAN,             -- Use BOOLEAN for Check to represent true/false
  Address VARCHAR(90),         -- Address with a maximum length of 90 characters
  Email VARCHAR(90),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- Automatically save the date and time
 CONSTRAINT fk_username FOREIGN KEY (Email) REFERENCES users(email)
);


ALTER TABLE users ADD COLUMN balance DECIMAL(10, 2) DEFAULT 0.00;

ALTER TABLE users ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP

ALTER TABLE bills ADD COLUMN AccNum text

select * from bills

select * from users

UPDATE users
SET balance = 50000;
 