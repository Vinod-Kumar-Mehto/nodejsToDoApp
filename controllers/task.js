import ErrorHandler from "../Middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.user });

    res.status(200).json({
      success: true,
      message: "Task added successFully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const task = await Task.find({ user: _id });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Account not found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(201).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Account not found", 404));

    await task.deleteOne();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
