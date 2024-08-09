import busModel from "../models/bus.js";

// add bus
const addBus = async (req, res) => {
  const {
    busNumber,
    seatCapacity,
    type,
    amenities,
    seatLayout,
    travel_company_id,
  } = req.body;
  try {
    const existingBus = await busModel.findOne({ busNumber });
    if (existingBus) {
      return res
        .status(400)
        .json({ error: "Bus with this bus number already exists" });
    }

    const newBus = new busModel({
      busNumber,
      seatCapacity,
      type,
      amenities,
      travel_company_id,
      seatLayout,
    });

    const bus = await newBus.save();

    return res.status(201).json({ success: true, bus });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const getBuses = async (req, res) => {
//   try {
//     let buses = await busModel.find();
//     return res.status(200).json(buses);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

const getBusById = async (req, res) => {
  try {
    const { id } = req.params;
    let bus = await busModel.findById(id);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    return res.status(200).json(bus);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// const updateBus = async (req, res) => {
//   try {
//     let id = req.params.id;
//     let existingBus = await busModel.findByIdAndUpdate(id, req.body, {
//       runValidators: true,
//       new: true,
//     });
//     if (!existingBus) {
//       return res.status(404).json({ error: "Bus not found" });
//     }
//     return res.status(200).json(existingBus);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

const deleteBus = async (req, res) => {
  try {
    let id = req.params.id;
    let existingbus = await busModel.findByIdAndDelete(id);
    if (!existingbus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    return res.status(200).json({ msg: "Bus deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// export { addBus, deleteBus, getBuses, updateBus, getBusById };
export { addBus, deleteBus, getBusById };
