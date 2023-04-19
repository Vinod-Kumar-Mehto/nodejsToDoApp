import express from "express";
import {
  newTask,
  getMyTask,
  updateTask,
  deleteTask,
} from "../controllers/task.js";
const router = express.Router();
import { isAuthenticated } from "../Middlewares/auth.js";

router.post("/new", isAuthenticated, newTask);
router.get("/getAll", isAuthenticated, getMyTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
