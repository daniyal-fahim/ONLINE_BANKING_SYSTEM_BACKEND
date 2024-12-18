-- Drop existing tables
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS BILLS;
DROP TABLE IF EXISTS BALANCE;
DROP TABLE IF EXISTS administration;
DROP TABLE IF EXISTS users;
select * from users
select * from balance
select * from history
-- USERS TABLE
CREATE TABLE users( 
  USER_ID VARCHAR(12) UNIQUE NOT NULL,
  ACCOUNT_NUMBER VARCHAR(30) UNIQUE,
  EMAIL VARCHAR(50) UNIQUE,
  PASSWORD VARCHAR(100),
  FNAME VARCHAR(50),
  LNAME VARCHAR(50),
  CNIC VARCHAR(20) UNIQUE,
  GENDER VARCHAR(10) DEFAULT NULL,
  NATIONALITY VARCHAR(50),
  DOB DATE,  
  JOINED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UPDATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INFO TEXT,
  Approved BOOL DEFAULT FALSE,
  PRIMARY KEY (USER_ID)
);

-- ADMINISTRATION TABLE
CREATE TABLE administration( 
  ADMIN_ID VARCHAR(12) UNIQUE NOT NULL,
  Designation VARCHAR(50),
  EMAIL VARCHAR(50) UNIQUE,
  PASSWORD VARCHAR(60),
  FNAME VARCHAR(50),
  LNAME VARCHAR(50),
  CNIC VARCHAR(20) UNIQUE,
  GENDER VARCHAR(10),
  NATIONALITY VARCHAR(50),
  DOB DATE,
  JOINED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UPDATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INFO TEXT,
  Approved BOOL DEFAULT FALSE,
  PRIMARY KEY (ADMIN_ID)
);

-- BALANCE TABLE
CREATE TABLE BALANCE (
  USER_ID VARCHAR(12) NOT NULL,
  BALANCE DECIMAL(15, 2),
  MAXBAL DECIMAL(15, 2),
  MINBAL DECIMAL(15, 2),
  PRIMARY KEY (USER_ID),
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID)
);

-- BILLS TABLE
CREATE TABLE BILLS (
  BILL_ID VARCHAR(12) UNIQUE NOT NULL,
  USER_ID VARCHAR(12) NOT NULL,
  USERNAME VARCHAR(100) NOT NULL,
  EMAIL VARCHAR(50) NOT NULL,
  ADDRESS VARCHAR(150) NOT NULL,
  ACCOUNT_NUMBER VARCHAR(50) NOT NULL,
  TERMSCHECK BOOL,
  PAID_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  BILL_MONTH VARCHAR(50) NOT NULL,
  SELECTED_COMPANY VARCHAR(100) NOT NULL,
  SELECT_TYPE VARCHAR(100) NOT NULL,
  AMOUNT DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (BILL_ID),
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID)
);

-- HISTORY TABLE
CREATE TABLE history (
  HISTORY_ID VARCHAR(12) UNIQUE NOT NULL,
  USER_ID VARCHAR(12) NOT NULL,
  BILL_ID VARCHAR(12),
  TRANSACTION_ID VARCHAR(12),
  PRIMARY KEY (HISTORY_ID),
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID),
  FOREIGN KEY (BILL_ID) REFERENCES bills(BILL_ID)
);


--NEW COMMANDS TO WORK ON 2nd

ALTER TABLE balance ALTER COLUMN balance TYPE NUMERIC(15, 2);

--INTER_BANK_TRANSACTIONS TABLE
CREATE TABLE INTER_BANK_TRANSACTIONS (
  TRANS_ID VARCHAR(12) UNIQUE NOT NULL,
  SENDER_USER_ID VARCHAR(12) NOT NULL,
  SENDER_EMAIL VARCHAR(50) NOT NULL,
  SENDER_ACCOUNT_NUMBER VARCHAR(50) NOT NULL,
  RECEIVER_USER_ID VARCHAR(12) NOT NULL,
  RECEIVER_EMAIL VARCHAR(50) NOT NULL,
  RECEIVER_ACCOUNT_NUMBER VARCHAR(50) NOT NULL,
  TERMSCHECK BOOL,
  PAID_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  AMOUNT DECIMAL(10, 2) NOT NULL,

  PRIMARY KEY (TRANS_ID),
  FOREIGN KEY (SENDER_USER_ID) REFERENCES users(USER_ID),
  FOREIGN KEY (RECEIVER_USER_ID) REFERENCES users(USER_ID)
);


CREATE TABLE FAQS (
    FAQ_ID VARCHAR(12) PRIMARY KEY NOT NULL,
    QUESTION TEXT DEFAULT NULL,
    ANSWER TEXT DEFAULT NULL,
    USER_ID VARCHAR(12) default NULL,
    ADMIN_ID VARCHAR(12) default NULL,
    ADDFAQ BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (USER_ID) REFERENCES users(USER_ID),
    FOREIGN KEY (ADMIN_ID) REFERENCES administration(ADMIN_ID)
);
alter table faqs add column Name VARCHAR (100);
alter table faqs add column Email VARCHAR (100);

--notchecked\
CREATE TABLE Loans (
    LOAN_ID INT PRIMARY KEY,
     USER_ID VARCHAR(12) NOT NULL,
    LOAN_TYPE VARCHAR(50) NOT NULL,
    LOAN_AMOUNT DECIMAL(10, 2) NOT NULL,
    INTEREST_RATE DECIMAL(5, 2) NOT NULL,
    TENURE INT NOT NULL,
    INSTALLMENT_AMOUNT DECIMAL(10, 2) NOT NULL,
    START_DATE DATE DEFAULT CURRENT_TIMESTAMP,
    END_DATE DATE,
    STATUS VARCHAR(20) DEFAULT 'PENDING',
    COLLATERAL VARCHAR(100) DEFAULT NULL,
    GUARANTOR_NAME VARCHAR(100) DEFAULT NULL,
    GUARANTOR_CNIC VARCHAR(50) DEFAULT NULL,
    REPAYMENT_SCHEDULE TEXT DEFAULT NULL,
    FOREIGN KEY (USER_ID) REFERENCES Users(USER_ID)
);
ALTER TABLE loans
ALTER COLUMN loan_id TYPE VARCHAR(15);

ALTER TABLE loans
ALTER COLUMN loan_amount TYPE DECIMAL(15,2);

-- Secured Loan: Backed by collateral (e.g., home, car), reducing the lender's risk.
-- Unsecured Loan: No collateral required, often with higher interest rates due to increased risk.
-- Fixed-Rate Loan: Interest rate remains constant throughout the loan term.
-- Variable-Rate Loan: Interest rate fluctuates based on market conditions.
-- Personal Loan: Used for various personal expenses, usually unsecured.
-- Mortgage Loan: Specifically for purchasing property, typically secured by the property itself.
-- Auto Loan: For financing the purchase of a vehicle, often secured by the vehicle.
-- Student Loan: Specifically for educational expenses, often with favorable repayment terms.


--3rd  CHANGES
CREATE TABLE CARD(
  CARD_ID INT PRIMARY KEY UNIQUE,
  USER_ID VARCHAR(12) NOT NULL UNIQUE,
  CARD_NUM VARCHAR(20) NOT NULL,
  PHONE VARCHAR(30) NOT NULL,
  PIN VARCHAR(100) NOT NULL,
  CARD_NAME VARCHAR(30) NOT NULL,
  CARD_TYPE VARCHAR(30) NOT NULL,
  FOREIGN KEY (USER_ID) REFERENCES Users(USER_ID)

  
);
ALTER TABLE CARD
ALTER COLUMN CARD_ID TYPE VARCHAR(15),
ADD CONSTRAINT card_id_unique UNIQUE (CARD_ID);


--4th change
 
 CREATE TABLE CBT (
    accnum VARCHAR(50) NOT NULL PRIMARY KEY,
    AMOUNT DECIMAL(10, 2) NOT NULL
);
