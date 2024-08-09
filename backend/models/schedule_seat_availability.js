import mongoose from "mongoose";
import { Schema } from "mongoose";

const scheduleSeatAvailabilitySchema = new Schema(
  {
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: "schedule",
      required: true,
    },
    seatStatusLayout: [
      {
        seatNumber: { type: String, required: true },
        isAvailable: { type: Boolean, default: true },
        bookingId: { type: Schema.Types.ObjectId, ref: "booking" },
      },
    ],
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const scheduleSeatAvailabilityModel =
  mongoose.models.schedule_seat_availability ||
  mongoose.model("schedule_seat_availability", scheduleSeatAvailabilitySchema);
export default scheduleSeatAvailabilityModel;
