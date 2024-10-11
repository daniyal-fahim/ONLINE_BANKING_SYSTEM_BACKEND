import { pool } from "../../../index.js";

const getIdNum = () => {
    let Id = "CD-";
    for (let i = 0; i < 4; i++) {
      Id += Math.floor(Math.random() * 10).toString(); // Generate a digit from 0-9
    }
    return Id;
  };
  
  export const getCardid = async () => {
    let Id = getIdNum();
    const checkAcc = await pool.query(
      "SELECT * FROM CARD WHERE card_id = $1",
      [Id]
    );
  
    if (checkAcc.rows.length > 0) {
      return await getCardid(); // Recurse to generate a new ID
    } else {
      return Id;
    }
  };
  const getCardNum = () => {
    let cardNum = "";
    for (let i = 0; i < 13; i++) {
        cardNum += Math.floor(Math.random() * 10).toString(); // Generate a digit from 0-9
    }
    return cardNum;
};

export const getUniqueCardNum = async () => {
    let cardNum = getCardNum();
    const checkCardNum = await pool.query(
        "SELECT * FROM CARD WHERE card_num = $1",
        [cardNum]
    );

    if (checkCardNum.rows.length > 0) {
        return await getUniqueCardNum(); // Recurse to generate a new card number
    } else {
        return cardNum;
    }
};