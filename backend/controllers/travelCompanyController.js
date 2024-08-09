import travelCompanyModel from "../models/TravelCompanySchema.js";

// Create a new travel company
const createTravelCompany = async (req, res) => {
  try {
    const { company_name, email, phone } = req.body;
    const newTravelCompany = new travelCompanyModel({
      company_name,
      email,
      phone,
    });
    const savedTravelCompany = await newTravelCompany.save();
    res.status(201).json(savedTravelCompany);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

// Get all travel companies
const getAllTravelCompanies = async (req, res) => {
  try {
    const travelCompanies = await travelCompanyModel.find();
    res.json(travelCompanies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single travel company by ID
// const getTravelCompanyById = async (req, res) => {
//   try {
//     const travelCompany = await travelCompanyModel.findById(req.params.id);
//     if (!travelCompany) {
//       return res.status(404).json({ message: "Travel company not found" });
//     }
//     res.json(travelCompany);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Update a travel company by ID
const updateTravelCompany = async (req, res) => {
  try {
    const { company_name, email, phone, admins } = req.body;
    const updatedTravelCompany = await travelCompanyModel.findByIdAndUpdate(
      req.params.id,
      { company_name, email, phone, admins },
      { new: true }
    );
    if (!updatedTravelCompany) {
      return res.status(404).json({ message: "Travel company not found" });
    }
    res.json(updatedTravelCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a travel company by ID
const deleteTravelCompany = async (req, res) => {
  try {
    const deletedTravelCompany = await travelCompanyModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTravelCompany) {
      return res.status(404).json({ message: "Travel company not found" });
    }
    res.json({ message: "Travel company deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  createTravelCompany,
  getAllTravelCompanies,
  // getTravelCompanyById,
  updateTravelCompany,
  deleteTravelCompany,
};
