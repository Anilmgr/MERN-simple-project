import express from 'express';
import 'dotenv/config';

const app = express();


app.get('/',(req,res)=>{
    res.json({"message":"Hello World!"})
})
app.listen(process.env.PORT,()=>{
    console.log("Server started!");
})
