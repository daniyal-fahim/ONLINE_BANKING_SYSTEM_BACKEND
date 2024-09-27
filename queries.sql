DROP TABLE USERS;
DROP TABLE ADMINISTRATION;
DROP TABLE BILLS
DROP TABLE BALANCE


--USERS TABLE
CREATE TABLE users( 
  USER_ID 	 SERIAL UNIQUE ,
  ACCOUNT_NUMBER VARCHAR(20),
  EMAIL	VARCHAR(50),
  PASSWORD	VARCHAR(60),  
  FNAME	VARCHAR(30),
  LNAME	VARCHAR(30),
  CNIC  VARCHAR(15),
  GENDER VARCHAR(10),
  NATIONALITY VARCHAR(30),
  DOB	DATE,  
  JOINED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UPDATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Update timestamp automatically on row modification
  INFO TEXT,
  Approved  BOOL DEFAULT FALSE,
  PRIMARY KEY (CNIC,USER_ID)
);
ALTER TABLE users
ADD CONSTRAINT UNIQUE_EMAIL UNIQUE (EMAIL);
ALTER TABLE users
ADD CONSTRAINT UNIQUE_ACC UNIQUE (ACCOUNT_NUMBER);
ALTER TABLE users
ALTER COLUMN account_number SET DATA TYPE VARCHAR(30);

--ADMINISTRATION TABLE
CREATE TABLE administration( 
  ADMIN_ID 	 SERIAL UNIQUE,
  Designation VARCHAR(20),
  EMAIL	VARCHAR(50),
  PASSWORD	VARCHAR(60),  
  FNAME	VARCHAR(30),
  LNAME	VARCHAR(30),
  CNIC  VARCHAR(15),
  GENDER VARCHAR(10),
  NATIONALITY VARCHAR(30),
  DOB	DATE,  
  JOINED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UPDATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  Approved  BOOL DEFAULT FALSE,
  PRIMARY KEY (CNIC, ADMIN_ID)
);

--BALANCE TABLE
CREATE TABLE BALANCE (
  USER_ID INT NOT NULL UNIQUE, 
  BALANCE DECIMAL(15, 2),
  MAXBAL DECIMAL(15, 2),
  MINBAL DECIMAL(15, 2),
  PRIMARY KEY (USER_ID),
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID) 
  );

--BILLING

CREATE TABLE BILLS (
  user_id INT NOT NULL,         
  bill_id  SERIAL PRIMARY KEY,                  
  username VARCHAR(100) NOT NULL,                             
  email VARCHAR(100) NOT NULL,                 
  address VARCHAR(255) NOT NULL,               
  account_number VARCHAR(20) NOT NULL,         
  termscheck bool,
  paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  bill_month VARCHAR(50) NOT NULL,              
  selected_company VARCHAR(100) NOT NULL,      
  select_type VARCHAR(50) NOT NULL,            
  amount FLOAT NOT NULL,
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID) 


);
 