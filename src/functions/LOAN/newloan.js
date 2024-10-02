import { getloanid } from "./generateLoanId";
import { getGId } from "../LOGIN/getUserId";
import { pool } from "../../../index.js";

// CREATE TABLE Loans (
//     LOAN_ID INT PRIMARY KEY,
//     USER_ID INT,
//     LOAN_TYPE VARCHAR(50),
//     LOAN_AMOUNT DECIMAL(10, 2),
//     INTEREST_RATE DECIMAL(5, 2),
//     TENURE INT,
//     INSTALLMENT_AMOUNT DECIMAL(10, 2),
//     START_DATE DATE,
//     END_DATE DATE,
//     STATUS VARCHAR(20),
//     COLLATERAL VARCHAR(100) DEFAULT NULL,
//     GUARANTOR_NAME VARCHAR(100) DEFAULT NULL,
//     GUARANTOR_CNIC VARCHAR(50) DEFAULT NULL,,
//     REPAYMENT_SCHEDULE TEXT DEFAULT NULL,
//     FOREIGN KEY (USER_ID) REFERENCES Users(USER_ID)
//   );
  
export const newloanreq = (req,res) => {
    var Loan_id=getloanid();
    const {LOAN_TYPE,LOAN_AMOUNT,TENURE,INSTALLMENT_AMOUNT,COLLATERAL,GUARANTOR_NAME, GUARANTOR_CNIC}=req.body;
    var user_id=getGId();


} 