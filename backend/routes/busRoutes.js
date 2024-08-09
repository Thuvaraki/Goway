import express from "express";
import {
  addBus,
  deleteBus,
  // getBuses,
  // updateBus,
  getBusById,
} from "../controllers/busController.js";

const busRouter = express.Router();

busRouter.post("/add-bus", addBus);
// busRouter.get("/get-buses", getBuses);
// busRouter.put("/update-bus/:id", updateBus);
busRouter.delete("/delete-bus/:id", deleteBus);
busRouter.get("/get-bus/:id", getBusById);

export default busRouter;
