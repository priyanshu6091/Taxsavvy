import { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import ExpenseUpload from './expenses/ExpenseUpload';
import { expenseApi } from '../services/api';
import toast from 'react-hot-toast';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await expenseApi.getExpenses();
      // Filter out any null or invalid expenses
      const validExpenses = data.filter(expense => expense && typeof expense === 'object');
      setExpenses(validExpenses);
    } catch (error) {
      console.error('Load expenses error:', error);
      toast.error('Failed to load expenses');
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (data) => {
    if (data && data.transaction) {
      setExpenses(prev => [data.transaction, ...prev]);
    }
    setShowUpload(false);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatAmount = (amount) => {
    return typeof amount === 'number' ? amount.toFixed(2) : '0.00';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showUpload && (
        <ExpenseUpload onUploadComplete={handleUploadComplete} />
      )}

      <div className="grid gap-6">
        {loading ? (
          <div>Loading...</div>
        ) : expenses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No expenses found. Upload your first receipt!
          </div>
        ) : (
          expenses.map((expense) => (
            expense && (
              <div
                key={expense._id || expense.id || Date.now()}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">
                    {expense.description || expense.vendorName || 'Unnamed Expense'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(expense.date)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₹{formatAmount(expense.amount)}</div>
                  <div className="text-sm text-gray-500">{expense.category || 'Uncategorized'}</div>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}
