import { pool } from "../../../index.js";
import { getGId } from "../LOGIN/getUserId.js";
///UNDER CONSTRUCTION

const gethistoy = (req,res)=>{
    const user_id=getGId();
    try{
        const data=pool.query('select  * from history where user_id = $1',user_id);

        if(data.rows.length>0){
                var user1=data.rows;

                array.forEach(user1 => {
                    console.log(user1.bill_id);
                    const data1=pool.query('select  * from bills where user_id = $1',bill_id_);
                    
                });
        }else{
            res.status(500).json({message:"no user history found"});
        }
    }catch(err){

    }
}