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
    enum: [
      'Travel and Conveyance',
      'Office Supplies',
      'Professional Services',
      'Rent and Utilities',
      'Repairs and Maintenance',
      'IT and Software',
      'Marketing',
      'Employee Benefits',
      'Bank Charges',
      'GST Payments',
      'TDS Payments',
      'Other'
    ],
    default: 'Other'
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
  },
  // Add Indian-specific fields
  gstNumber: {
    type: String,
    trim: true
  },
  gstCategory: {
    type: String,
    enum: ['CGST', 'SGST', 'IGST', 'None'],
    default: 'None'
  },
  gstAmount: {
    type: Number,
    default: 0
  },
  subCategory: String,
  isITCEligible: {
    type: Boolean,
    default: false
  },
  section: {
    type: String,
    enum: [
      'Section 16', // Regular ITC
      'Section 17(5)', // Blocked Credits
      'Not Applicable'
    ],
    default: 'Not Applicable'
  }
}, {
  timestamps: true
});

export default mongoose.model('Transaction', transactionSchema);
