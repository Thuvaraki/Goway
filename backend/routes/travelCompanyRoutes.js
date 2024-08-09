import express from "express";
import {
  createTravelCompany,
  getAllTravelCompanies,
  // getTravelCompanyById,
  updateTravelCompany,
  deleteTravelCompany,
} from "../controllers/travelCompanyController.js";

const travelCompanyRouter = express.Router();

travelCompanyRouter.post("/add-TravelCompany", createTravelCompany);
travelCompanyRouter.get("/get-all-travel-companies", getAllTravelCompanies);
// travelCompanyRouter.get("/get-travel-company-by-id/:id", getTravelCompanyById);
travelCompanyRouter.put("/update-travel-company/:id", updateTravelCompany);
travelCompanyRouter.delete("/delete-travel-company/:id", deleteTravelCompany);

export default travelCompanyRouter;
