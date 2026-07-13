import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const AuthProtect = async (req, res, next) => {
  try {
    // Cookie se token lo
    const token = req.cookies.CravingCookie;

    if (!token) {
      const error = new Error("Session Expired. Please login again.");
      error.statusCode = 401;
      return next(error);
    }

    console.log("Token:", token);

    // JWT Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    // User Find
    const verifiedUser = await User.findById(decoded.id);

    if (!verifiedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    // User Request me attach karo
    req.user = verifiedUser;

    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};