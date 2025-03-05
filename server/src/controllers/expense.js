import { processExpenseDocument } from '../services/expenseClassifier.js';
import Transaction from '../models/transaction.js';

const TEST_USER_ID = '65bf631dc5b35d8d259a81c1';

export const createExpense = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      companyId: TEST_USER_ID,
      transactionId: `TXN${Date.now()}`
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const transactions = await Transaction.find({ companyId: TEST_USER_ID })
      .sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadExpense = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const result = await processExpenseDocument(req.file, req.body);
    const transaction = new Transaction({
      ...req.body,
      ...result,
      companyId: TEST_USER_ID,
      transactionId: `TXN${Date.now()}`
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
