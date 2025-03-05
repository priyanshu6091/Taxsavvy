import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { createExpense, getExpenses, uploadExpense } from '../controllers/expense.js';

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// For manual entry
router.post('/', createExpense);
router.get('/', getExpenses);

// For file upload
router.post('/upload', upload.single('receipt'), uploadExpense);

export default router;
