import express from "express";
import identifyRoute from "./routes/identify";

const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
 res.send("Bitespeed Identity API Running");
});

app.use("/identify", identifyRoute);

app.listen(3000,()=>{
 console.log("Server running on port 3000");
});