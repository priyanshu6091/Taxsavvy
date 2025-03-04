import express from 'express';
import { protect } from '../middleware/auth.js';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenses.js';

const router = express.Router();

// Get all expenses
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await getExpenses(req.user.id);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
});

// Create new expense
router.post('/', protect, async (req, res) => {
  try {
    const expense = await createExpense(req.user.id, req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create expense', error: error.message });
  }
});

// Update expense
router.put('/:id', protect, async (req, res) => {
  try {
    const expense = await updateExpense(req.params.id, req.body);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update expense', error: error.message });
  }
});

// Delete expense
router.delete('/:id', protect, async (req, res) => {
  try {
    await deleteExpense(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
  }
});

export default router;
