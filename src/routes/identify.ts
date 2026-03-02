import express from "express";
import { identifyContact } from "../services/identifyService";

const router=express.Router();

router.post("/",async(req,res)=>{

 const {email,phoneNumber}=req.body;

 const result=await identifyContact(email,phoneNumber);

 res.json(result);

});

export default router;