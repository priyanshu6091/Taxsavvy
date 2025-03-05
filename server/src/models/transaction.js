import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  companyName: String,
  category: {
    type: String,
    enum: ['Transportation', 'Business Expense', 'Personal', 'Education', 
           'Healthcare', 'Uncategorized'],
    default: 'Uncategorized'
  },
  isDeductible: {
    type: Boolean,
    default: false
  },
  aiConfidence: {
    type: Number,
    default: 0
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Transaction', transactionSchema);
