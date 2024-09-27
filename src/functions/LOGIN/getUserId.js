
let GId = null;

export const getId =async(req,res)=>{
        res.json({Id:GId}) ;
}

export const setGId = (Id) => {
  GId = Id;
};

export const getGId = () => {
  return GId;
};