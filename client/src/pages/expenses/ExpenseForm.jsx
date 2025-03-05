import React from 'react';
import { Calendar } from 'lucide-react';

export default function ExpenseForm({ formData, setFormData, loading }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
          <input
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
            placeholder="e.g., 27AABCT3518Q1Z2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <div className="relative mt-1">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
            <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GST Amount</label>
            <input
              type="number"
              name="gstAmount"
              value={formData.gstAmount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          >
            <option value="">Select category</option>
            <option value="Travel and Conveyance">Travel and Conveyance</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Rent and Utilities">Rent and Utilities</option>
            <option value="IT and Software">IT and Software</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>
    </div>
  );
}
