import scheduleModel from "../models/schedule.js";
import busModel from "../models/bus.js";

// add schedule
const addSchedule = async (req, res) => {
  try {
    const { busId, schedules } = req.body;
    const existingBus = await busModel.findById(busId);
    if (!existingBus) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid bus ID" });
    }

    const newSchedule = await scheduleModel.create({ busId, schedules });
    return res.status(201).json({ success: true, newSchedule });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// deleteSchedule
const deleteSchedule = async (req, res) => {
  try {
    let id = req.params.id;
    let existingRoute = await scheduleModel.findByIdAndDelete(id);
    if (!existingRoute) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    return res.status(200).json({ msg: "Schedule deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { addSchedule, deleteSchedule };
