import express from "express";
import { EditUserProfile } from "../controllers/user.controller.js";
import { AuthProtect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.put(
  "/edit-profile",
  AuthProtect,
  upload.single("photo"),
  EditUserProfile,
);

export default router;