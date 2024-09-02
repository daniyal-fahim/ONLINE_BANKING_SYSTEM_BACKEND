import express from "express"
import bodyparser from "body-parser"
const app=express();
const port=3000;
app.use(bodyparser.urlencoded({extended:true}));


app.listen(port,(req,res)=>{
    console.log("YOUR BACKEND HAS BEEN SUCCESFULLY STARTED");
});

app.post("/usersubmit",(req,res)=>{
    console.log(req.body);
})