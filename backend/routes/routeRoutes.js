import express from "express";
import { addRoute, deleteRoute } from "../controllers/routeController.js";

const routeRouter = express.Router();

routeRouter.post("/add-route", addRoute);
routeRouter.delete("/delete-route/:id", deleteRoute);

export default routeRouter;
