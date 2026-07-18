import express from "express";
import multer from "multer";
import {
  RestaurantUpdateProfile,
  RestaurantGetData,
} from "../controllers/restaurant.controller.js";
import { AuthProtect } from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.put(
  "/update-profile",
  AuthProtect,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "restaurantImage", maxCount: 10 },
  ]),
  RestaurantUpdateProfile
);

router.get(
  "/get-restaurant-data",
  AuthProtect,
  RestaurantGetData
);

export default router;