import express from "express";
import {
  addSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";

const scheduleRouter = express.Router();

scheduleRouter.post("/add-schedule", addSchedule);
scheduleRouter.delete("/delete-schedule/:id", deleteSchedule);

export default scheduleRouter;
