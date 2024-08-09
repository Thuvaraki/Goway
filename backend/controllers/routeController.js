import routeModel from "../models/route.js";

// add route
const addRoute = async (req, res) => {
  try {
    const newRoute = await routeModel.create(req.body);
    return res.status(201).json({ success: true, newRoute });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteRoute = async (req, res) => {
  try {
    let id = req.params.id;
    let existingRoute = await routeModel.findByIdAndDelete(id);
    if (!existingRoute) {
      return res.status(404).json({ error: "Route not found" });
    }
    return res.status(200).json({ msg: "Route deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { addRoute, deleteRoute };
