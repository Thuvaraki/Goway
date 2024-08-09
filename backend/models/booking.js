import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: "schedule",
      required: true,
    },
    fare: { type: Number, required: true },
    seatNumbers: [{ type: String, required: true }],
    dateOfJourney: { type: Date, required: true },
    bookingStatus: {
      type: String,
      enum: [, "confirmed", "canceled"],
      default: "confirmed",
    },
    passengerName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String },
    boardingPoint: { type: String, required: true },
    droppingPoint: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    bookingConfirmationCode: { type: Number },
  },
  { timestamps: true }
);

const bookingModel =
  mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default bookingModel;
