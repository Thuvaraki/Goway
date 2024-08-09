import stationsModel from "../models/stations.js";

// Add a new station
const addStation = async (req, res) => {
  const { name } = req.body;

  try {
    const newStation = new stationsModel({ name });
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Station already exists" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getAllStations = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    let query = {};
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i"); // Case-insensitive search
      query = { name: regex };
    }

    const stations = await stationsModel.find(query);
    res.status(200).json({ stations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addStation, getAllStations };
