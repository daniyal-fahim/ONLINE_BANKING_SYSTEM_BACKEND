import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

// Import routes
import Billing from "./src/routes/BillingRoutes.js";
import Otp from "./src/routes/OTPRoutes.js";
import Transaction from "./src/routes/TransactionRoutes.js";
import Manager from "./src/routes/ManagerRoutes.js";
import History from "./src/routes/HistoryRoutes.js";
import User from "./src/routes/UserRoutes.js";
import FAQ from "./src/routes/FaqRoutes.js";
import Loan from "./src/routes/LoanRoutes.js";
import withoutauth from "./src/routes/register without auth.js";
import card from "./src/routes/CardRoutes.js";

// Initialize express app
const app = express();

const corsOptions = {
    origin: [
        'http://localhost:3000',  // For local development
        'https://ddd-banking-app-88r4.vercel.app'  
    ],
    credentials: true,  
    optionSuccessStatus: 200
};


app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Define routes
app.use('/', withoutauth);
app.use('/', Otp);

// Importing and using authentication middleware
import { authenticateToken } from "./src/functions/LOGIN/AuthenticateUser.js";
app.use(authenticateToken);

app.use('/', User);
app.use('/', Billing);
app.use('/', Transaction);
app.use('/', Manager);
app.use('/', History);
app.use('/', FAQ);
app.use('/', Loan);
app.use('/', card);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 5000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the app for Vercel
export default app;
