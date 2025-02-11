import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createTokenAndSaveCookie = (userId, res) => {
  try {
    if (!process.env.JWT_TOKEN) {
      throw new Error("JWT Secret Key is missing");
    }

    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "10d",
    });

    res.cookie("jwt", token, {
      httpOnly: true, // XSS protection
      secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
      sameSite: "strict", // CSRF protection
    });

    return token;
  } catch (error) {
    console.error("Error generating JWT:", error.message);
  }
};

export default createTokenAndSaveCookie;
