import mongoose from "mongoose";

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const stationsModel =
  mongoose.models.stations || mongoose.model("stations", stationSchema);

export default stationsModel;
