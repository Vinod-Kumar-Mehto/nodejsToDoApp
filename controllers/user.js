import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../Utils/feature.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User is already exist", 400));

    const hashedPass = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPass });
    sendCookie(user, res, "registered sucessfull", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or password", 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 400));

    sendCookie(user, res, `welcome back${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};
export const getUserDetails = (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "logged out successfully",
      });
  } catch (error) {
    next(error);
  }
};
