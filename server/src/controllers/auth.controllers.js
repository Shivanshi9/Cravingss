import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/auth.service.js";

// ================= REGISTER =================
export const RegisterUser = async (req, res, next) => {
  try {
    const { FullName, email, password, phone, gender, DOB } = req.body;

    if (!FullName || !email || !password || !phone || !gender || !DOB) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

    const photo = `https://placehold.co/600x400?text=${FullName
      .charAt(0)
      .toUpperCase()}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      FullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      DOB,
      photo,
    });

    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// ================= LOGIN =================
export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isVerified) {
      const error = new Error("Incorrect Password");
      error.statusCode = 401;
      return next(error);
    }

    await genToken(existingUser, res);

    // Password frontend ko mat bhejo
    const { password: pass, ...userData } = existingUser.toObject();

    res.status(200).json({
      message: "Welcome Back",
      data: userData,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// ================= LOGOUT =================
export const LogoutUser = async (req, res, next) => {
  try {
    es.clearCookie("CravingCookie", { maxAge: 0 });

    res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};