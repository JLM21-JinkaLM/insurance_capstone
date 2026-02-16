const Treaty = require("../models/Treaty");

exports.createTreaty = async (req, res) => {
  res.json(await Treaty.create(req.body));
};

exports.getTreaties = async (req, res) => {
  res.json(await Treaty.find());
};


exports.createTreaty = async (req, res) => {
  try {
    const treaty = await Treaty.create(req.body);
    res.status(201).json(treaty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTreaties = async (req, res) => {
  try {
    const treaties = await Treaty.find().populate("reinsurerId");
    res.json(treaties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTreatyById = async (req, res) => {
  try {
    const treaty = await Treaty.findById(req.params.id);
    res.json(treaty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTreaty = async (req, res) => {
  try {
    const treaty = await Treaty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(treaty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTreaty = async (req, res) => {
  try {
    await Treaty.findByIdAndDelete(req.params.id);
    res.json({ message: "Treaty deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.activateTreaty = async (req, res) => {
  try {
    const treaty = await Treaty.findByIdAndUpdate(
      req.params.id,
      { status: "ACTIVE" },
      { new: true }
    );
    res.json(treaty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.expireTreaty = async (req, res) => {
  try {
    const treaty = await Treaty.findByIdAndUpdate(
      req.params.id,
      { status: "EXPIRED" },
      { new: true }
    );
    res.json(treaty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

