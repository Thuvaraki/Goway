import mongoose from "mongoose";
const { Schema } = mongoose;

const travelCompanySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const travelCompanyModel =
  mongoose.models.travelCompany ||
  mongoose.model("travelCompany", travelCompanySchema);

export default travelCompanyModel;
