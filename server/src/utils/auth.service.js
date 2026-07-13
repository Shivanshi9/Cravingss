import jwt from "jsonwebtoken";

export const genToken = (user, res) => {
  try {
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("CravingCookie", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, 
    });

    console.log("Generated Token:", token);

    return token;
  } catch (error) {
    throw error;
  }
};