import express from "express";
import { bookBus, cancelBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/new-booking", bookBus);
bookingRouter.post("/cancel-booking", cancelBooking);

export default bookingRouter;
