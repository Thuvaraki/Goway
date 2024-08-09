import mongoose from "mongoose";
const { Schema } = mongoose;

const daysOfWeekEnum = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const scheduleSchema = new mongoose.Schema(
  {
    busId: { type: Schema.Types.ObjectId, ref: "bus", required: true },
    schedules: [
      {
        routeId: { type: Schema.Types.ObjectId, ref: "route", required: true },
        days: [{ type: String, enum: daysOfWeekEnum, required: true }],
      },
    ],
  },
  { timestamps: true }
);

const scheduleModel =
  mongoose.models.schedule || mongoose.model("schedule", scheduleSchema);

export default scheduleModel;
