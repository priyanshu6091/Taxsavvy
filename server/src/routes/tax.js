import express from 'express';
import { protect } from '../middleware/auth.js';
import { calculateTax, getTaxHistory, saveTaxCalculation } from '../controllers/tax.js';

const router = express.Router();

// Calculate tax
router.post('/calculate', protect, async (req, res) => {
  try {
    const { income, expenses, deductions, filingStatus } = req.body;
    const calculation = await calculateTax(req.user.id, {
      income,
      expenses,
      deductions,
      filingStatus
    });
    res.json(calculation);
  } catch (error) {
    res.status(500).json({ message: 'Tax calculation failed', error: error.message });
  }
});

// Get tax calculation history
router.get('/history', protect, async (req, res) => {
  try {
    const history = await getTaxHistory(req.user.id);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tax history', error: error.message });
  }
});

// Save tax calculation
router.post('/save', protect, async (req, res) => {
  try {
    const saved = await saveTaxCalculation(req.user.id, req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save calculation', error: error.message });
  }
});

export default router;
