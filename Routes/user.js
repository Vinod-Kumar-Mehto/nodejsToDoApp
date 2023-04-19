import express from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import {
  register,
  getUserDetails,
  login,
  logout,
} from "../controllers/user.js";
const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUserDetails);

export default router;
