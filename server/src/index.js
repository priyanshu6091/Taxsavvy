import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import financialRoutes from './routes/financial.js';
import taxRoutes from './routes/tax.js';
import expenseRoutes from './routes/expenses.js';
import regulatoryRoutes from './routes/regulatory.js';
import taxAssistantRoutes from './routes/taxAssistant.js';
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/regulatory', regulatoryRoutes);
app.use('/api/tax-assistant', taxAssistantRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://galanimeghji:galanimeghji@cluster0.bidm5gv.mongodb.net/taxsavvy')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
