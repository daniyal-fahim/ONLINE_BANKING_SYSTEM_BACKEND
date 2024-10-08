export function getInterestRate(tenure, amount, collateral) {
    let baseRate;
    
    // Base interest rate based on tenure (example logic)
    if (tenure <= 1) {
        baseRate = 5.0; // 5% interest for 1 year or less
    } else if (tenure <= 5) {
        baseRate = 4.0; // 4% interest for 1 to 5 years
    } else {
        baseRate = 3.5; // 3.5% interest for more than 5 years
    }

    // Modify interest rate based on loan amount (example logic)
    if (amount > 100000) {
        baseRate -= 0.5; // Discount for large loan amounts
    }

    // Increase the rate if there's no collateral
    if (!collateral) {
        baseRate += 2.0; // Add 2% for loans without collateral
    }

    return baseRate;
}


