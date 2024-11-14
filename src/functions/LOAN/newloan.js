import { getloanid } from "./generateLoanId.js";
import { getGId } from "../LOGIN/getUserId.js";
import pool from "../../config/db.js";
import { getInterestRate } from "./getIntrestRate.js"; 
import { LoanEmail } from "./loanemail.js";
export const newloanreq = async (req, res) => {
    var Loan_id = await getloanid();
    const { income,LOAN_TYPE, LOAN_AMOUNT, TENURE, COLLATERAL, GUARANTOR_NAME, GUARANTOR_CNIC } = req.body;
    //add logic for income
    var user_id = getGId();
    let interestRate = getInterestRate(TENURE, LOAN_AMOUNT, COLLATERAL);

    // Calculate total loan amount with interest
    const totalLoanAmount = LOAN_AMOUNT + (LOAN_AMOUNT * (interestRate / 100));

    // Calculate monthly installment amount
    const installmentAmount = totalLoanAmount / (TENURE * 12);

    // Set the start date to the current date
    const startDate = new Date();

    // Calculate end date by adding tenure (in years) to start date
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + TENURE);

    // Create repayment schedule (optional - just an example format)
    const repaymentSchedule = JSON.stringify({
        monthlyInstallment: installmentAmount,
        startDate: startDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
        endDate: endDate.toISOString().split('T')[0],
        totalPayments: TENURE * 12,
        totalLoanAmount: totalLoanAmount
    });

    try {
        // Insert loan request data into the Loans table
        await pool.query(
            `INSERT INTO loans 
            (LOAN_ID, USER_ID, LOAN_TYPE, LOAN_AMOUNT, INTEREST_RATE, TENURE, INSTALLMENT_AMOUNT, START_DATE, END_DATE, STATUS, COLLATERAL, GUARANTOR_NAME, GUARANTOR_CNIC, REPAYMENT_SCHEDULE)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
            [
                Loan_id,
                user_id,
                LOAN_TYPE,
                totalLoanAmount,
                interestRate,
                TENURE,
                installmentAmount,
                startDate,
                endDate,
                'PENDING', // Loan status
                COLLATERAL || null,
                GUARANTOR_NAME || null,
                GUARANTOR_CNIC || null,
                repaymentSchedule
            ]
        );
        LoanEmail(LOAN_TYPE, LOAN_AMOUNT, TENURE, installmentAmount);
        res.status(200).send("Loan request submitted successfully!");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error processing loan request.");
    }
};
