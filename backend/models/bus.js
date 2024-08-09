import mongoose from "mongoose";
import { Schema } from "mongoose";

const seatSchema = new Schema({
  seatNumber: { type: String, required: true },
  isEnable: { type: Boolean, default: true },
  type: {
    type: String,
    enum: ["window", "aisle", "middle"],
    required: true,
  },
  rowNum: {
    type: Number,
    required: true,
  },
});

// assuming a bus can have max 5 seats in last row
const lastRowSeatSchema = new Schema({
  seatNumber: { type: String, required: true },
  isEnable: { type: Boolean, default: true },
  type: {
    type: String,
    enum: [
      "window",
      "aisle",
      "middle",
      "2nd from left side",
      "2nd from right side",
    ],
    required: true,
  },
});

const busSchema = new Schema(
  {
    busNumber: { type: String, required: true, unique: true },
    seatCapacity: { type: Number, required: true },
    type: { type: String, required: true },
    amenities: { type: [String], required: true },
    travel_company_id: {
      type: Schema.Types.ObjectId,
      ref: "travelCompany",
      required: true,
    },
    seatLayout: {
      leftSideSeatLayout: [seatSchema],
      rightSideSeatLayout: [seatSchema],
      lastRowSeatLayout: [lastRowSeatSchema],
    },
  },
  { timestamps: true }
);

const busModel = mongoose.models.bus || mongoose.model("bus", busSchema);

export default busModel;
