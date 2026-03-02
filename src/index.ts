import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
 res.send("Bitespeed Identity API Running");
});

app.listen(3000,()=>{
 console.log("Server running on port 3000");
});