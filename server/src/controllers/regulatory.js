import RegulatoryAlert from '../models/regulatory.js';

export const getAlerts = async (req, res) => {
  try {
    const alerts = await RegulatoryAlert.find({ userId: req.user.id });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAlert = async (req, res) => {
  try {
    const alert = new RegulatoryAlert({
      ...req.body,
      userId: req.user.id
    });
    const savedAlert = await alert.save();
    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAlert = async (req, res) => {
  try {
    const alert = await RegulatoryAlert.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json(alert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAlert = async (req, res) => {
  try {
    const alert = await RegulatoryAlert.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.json({ message: 'Alert deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUpdates = async (req, res) => {
  try {
    const updates = await RegulatoryAlert.find({ 
      userId: req.user.id,
      type: 'update'
    }).sort({ createdAt: -1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
