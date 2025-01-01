# Online Banking System Backend (D-Pay)

D-Pay is a secure and efficient online banking system designed to enable users to perform transactions, manage accounts, and access various banking services with ease. This repository contains the backend codebase for the D-Pay application, developed using Node.js, Express.js, and PostgreSQL.

## Features

- **Authentication**: Secure JWT-based authentication for all users.
- **Billing Management**: Handle bills, view balance, and generate new bills.
- **Card Services**: Add cards, check card status, and manage card details.
- **FAQ Management**: Submit questions, get answers, and manage FAQs.
- **History Tracking**: Comprehensive history for users and managers.
- **Loan Services**: Apply for loans, calculate interest rates, and track loan status.
- **Transaction Management**: Intra-bank and inter-bank transactions.
- **Managerial Controls**: Tools for managers to approve users, update user data, and manage operations.

## Deployment

The backend is deployed on [Vercel](https://online-banking-system-backend.vercel.app/), and APIs require JWT authentication for access.

## Project Structure

```
src/
├── config/
│   ├── auth.js
│   ├── db.js
│   ├── mailer.js
│   └── transporter.js
├── functions/
│   ├── BILLING/
│   │   ├── EmailBill.js
│   │   ├── getBalance.js
│   │   ├── NewBill.js
│   │   └── ShowUserBills.js
│   ├── CARD/
│   │   ├── AddCard.js
│   │   ├── CheckPin.js
│   │   ├── checkStatus.js
│   │   ├── GenerateCard_Id-NUM.js
│   │   └── GetCardDetail.js
│   ├── FAQS/
│   │   ├── AskQuestion.js
│   │   ├── getfaqid.js
│   │   ├── GiveAnswer.js
│   │   ├── ResponseToFaq.js
│   │   ├── SendFaqReply.js
│   │   └── ShowAllFaqs.js
│   ├── History/
│   │   ├── getfullhistory.js
│   │   ├── GetFullHistoryForManager.js
│   │   └── getHistoryId.js
│   ├── LOAN/
│   │   ├── generateLoanId.js
│   │   ├── getIntrestRate.js
│   │   ├── loanemail.js
│   │   └── newloan.js
│   ├── LOGIN/
│   │   ├── AuthenticateUser.js
│   │   ├── BankMonthlyUsage.js
│   │   ├── bankthismonthusage.js
│   │   ├── DeleteUser.js
│   │   ├── FindUser.js
│   │   ├── getUserEmail.js
│   │   ├── getUserId.js
│   │   ├── LoginUser.js
│   │   ├── MonthlyUsage.js
│   │   ├── RegisterUser.js
│   │   └── userallgetter.js
│   ├── MANAGER/
│   │   ├── adminallgetter.js
│   │   ├── DeleteManager.js
│   │   ├── FindManager.js
│   │   ├── FindParticularUser.js
│   │   ├── GetAllUser.js
│   │   ├── getverified.js
│   │   ├── LoginManager.js
│   │   ├── managerdashboard.js
│   │   ├── RegisterManager.js
│   │   ├── UpdateApproval.js
│   │   ├── UpdateUser.js
│   │   └── UserCount.js
│   ├── OTP/
│   │   ├── CheckOTP.js
│   │   ├── EmailSender.js
│   │   └── getOtp.js
│   └── Transaction/
│       ├── CBT.js
│       ├── crossbanktransaction.js
│       ├── getTransactionId.js
│       ├── interbanktransaction.js
│       └── TranEmail.js
├── routes/
│   ├── BillingRoutes.js
│   ├── CardRoutes.js
│   ├── FaqRoutes.js
│   ├── HistoryRoutes.js
│   ├── LoanRoutes.js
│   ├── ManagerRoutes.js
│   ├── OTPRoutes.js
│   ├── register without auth.js
│   ├── TransactionRoutes.js
│   └── UserRoutes.js
```

## API Endpoints

For detailed API endpoints, refer to the respective route files located in the `routes/` folder.

## Database Schema

### Tables

#### Users Table
```sql
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
```

#### Other Tables
- `administration`
- `balance`
- `bills`
- `history`
- `inter_bank_transactions`
- `faqs`
- `loans`
- `card`
- `cbt`

For more detailed SQL schema, refer to the `sql` folder.

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure Node.js is installed.
- **PostgreSQL**: Set up a PostgreSQL database.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/online_banking_system_backend.git
   cd online_banking_system_backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file and add the following:
     ```env
     DB_HOST=your_db_host
     DB_USER=your_db_user
     DB_PASS=your_db_password
     DB_NAME=your_db_name
     JWT_SECRET=your_jwt_secret
     ```

4. Run database migrations:

   ```bash
   npm run migrate
   ```

5. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

## Contribution

We welcome contributions! If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

