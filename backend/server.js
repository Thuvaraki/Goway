import express from "express";
import cors from "cors";
import "dotenv/config";
import { ConnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import travelCompanyRouter from "./routes/travelCompanyRoutes.js";
import busRouter from "./routes/busRoutes.js";
import routeRouter from "./routes/routeRoutes.js";
import scheduleRouter from "./routes/scheduleRoutes.js";
import searchRouter from "./routes/searchRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import stationRouter from "./routes/stationRoutes.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

ConnectDB();

app.use("/api/travel-company", travelCompanyRouter);
app.use("/api/bus", busRouter);
app.use("/api/route", routeRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/search", searchRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/stations", stationRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
