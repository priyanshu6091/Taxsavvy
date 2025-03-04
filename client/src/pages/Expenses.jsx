import { Home, Car, GraduationCap, Heart, Briefcase } from 'lucide-react';

const expenses = [
  {
    id: 'housing',
    category: 'Housing',
    icon: Home,
    amount: 2500,
    date: '2024-03-15',
    status: 'deductible',
  },
  {
    id: 'transportation',
    category: 'Transportation',
    icon: Car,
    amount: 450,
    date: '2024-03-14',
    status: 'deductible',
  },
  {
    id: 'education',
    category: 'Education',
    icon: GraduationCap,
    amount: 1200,
    date: '2024-03-13',
    status: 'deductible',
  },
  {
    id: 'healthcare',
    category: 'Healthcare',
    icon: Heart,
    amount: 300,
    date: '2024-03-12',
    status: 'deductible',
  },
  {
    id: 'business',
    category: 'Business',
    icon: Briefcase,
    amount: 800,
    date: '2024-03-11',
    status: 'deductible',
  },
];

function Expenses() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'deductible':
        return 'bg-green-100 text-green-800';
      case 'non_deductible':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Expenses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and categorize your tax-deductible expenses
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">
          Add Expense
        </button>
      </div>

      <div className="grid gap-6">
        {expenses.map((expense) => {
          const Icon = expense.icon;
          return (
            <div
              key={expense.id}
              className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {expense.category}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    expense.status
                  )}`}
                >
                  {expense.status === 'deductible' ? 'Deductible' : expense.status}
                </span>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${expense.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Expenses;
