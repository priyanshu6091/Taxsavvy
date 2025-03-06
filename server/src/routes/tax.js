import express from 'express';
import { protect } from '../middleware/auth.js';
import { calculateTax, getTaxHistory, saveTaxCalculation } from '../controllers/tax.js';
import { generateTaxSavingPlan } from '../services/aiTaxService.js';
import { calculateCapitalGains } from '../services/capitalGainsService.js';
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
router.post('/capital-gains', protect, async (req, res) => {
  try {
    const { assetValue, holdingPeriod } = req.body;
    const result = calculateCapitalGains(assetValue, holdingPeriod);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
router.post('/generate-plan', protect, async (req, res) => {
  try {
    const { income, expenses, deductions } = req.body;
    const plan = await generateTaxSavingPlan(income, expenses, deductions);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/scenario', protect, async (req, res) => {
  try {
    const scenarios = req.body.scenarios;
    const results = await Promise.all(scenarios.map(async scenario => {
      const calculation = await calculateTax(scenario.income, scenario.expenses, scenario.deductions);
      return {
        ...scenario,
        ...calculation
      };
    }));
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
