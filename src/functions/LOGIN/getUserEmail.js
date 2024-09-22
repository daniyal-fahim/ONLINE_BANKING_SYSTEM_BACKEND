
let Gemail = null;

export const getEmail =async(req,res)=>{
        res.json({email:Gemail}) ;
}



export const setGemail = (email) => {
  Gemail = email;
};

export const getGemail = () => {
  return Gemail;
};