import express from "express";
import {
  addStation,
  getAllStations,
} from "../controllers/stationController.js";

const stationRouter = express.Router();

stationRouter.post("/add-station", addStation);
stationRouter.get("/get-stations", getAllStations);

export default stationRouter;
