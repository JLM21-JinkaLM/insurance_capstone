const Reinsurer = require("../models/Reinsurer");

// CREATE reinsurer
exports.createReinsurer = async (req, res) => {
  try {
    const reinsurer = await Reinsurer.create(req.body);

    res.status(201).json({
      success: true,
      data: reinsurer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET all reinsurers
exports.getAllReinsurers = async (req, res) => {
  try {
    const reinsurers = await Reinsurer.find();

    res.json({
      success: true,
      data: reinsurers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET by ID
exports.getReinsurerById = async (req, res) => {
  try {
    const reinsurer = await Reinsurer.findById(req.params.id);

    if (!reinsurer) {
      return res.status(404).json({ message: "Reinsurer not found" });
    }

    res.json(reinsurer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE reinsurer
exports.updateReinsurer = async (req, res) => {
  try {
    const reinsurer = await Reinsurer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(reinsurer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE reinsurer
exports.deleteReinsurer = async (req, res) => {
  try {
    await Reinsurer.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Reinsurer deleted"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHANGE status
exports.changeReinsurerStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const reinsurer = await Reinsurer.findById(req.params.id);

    if (!reinsurer) {
      return res.status(404).json({ message: "Reinsurer not found" });
    }

    reinsurer.status = status;

    await reinsurer.save();

    res.json({
      message: "Status updated successfully",
      data: reinsurer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

