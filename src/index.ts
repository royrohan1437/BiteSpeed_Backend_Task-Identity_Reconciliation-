import "dotenv/config"
import express from "express";
import identifyRoute from "./routes/identify";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get("/", (req,res)=>{
 res.send("Bitespeed Identity API Running");
});

app.use("/identify", identifyRoute);

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`);
});