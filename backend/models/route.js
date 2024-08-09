import mongoose from "mongoose";
const { Schema } = mongoose;

const routeSchema = new Schema(
  {
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    duration: { type: String, required: true },
    travel_company_id: {
      type: Schema.Types.ObjectId,
      ref: "travelCompany",
      required: true,
    },
    ticketPrice: { type: Number, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    boardingPoints: [
      {
        point: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
    droppingPoints: [
      {
        point: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const routeModel = mongoose.model("route", routeSchema);

export default routeModel;
