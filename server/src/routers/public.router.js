import express from "express";
import { ContactUsForm } from "../controllers/public.controllers.js";


const router = express.Router();

router.post("/contactus",ContactUsForm);

export default router;
