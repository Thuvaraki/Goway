import { getAvailableBuses } from "../controllers/searchController.js";
import express from "express";

const searchRouter = express.Router();

searchRouter.post("/available-buses", getAvailableBuses);

export default searchRouter;
