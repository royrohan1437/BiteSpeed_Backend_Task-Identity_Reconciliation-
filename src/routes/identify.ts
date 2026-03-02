import express from "express";

const router = express.Router();

router.post("/", async(req,res)=>{

 res.send("Identify endpoint");

});

export default router;