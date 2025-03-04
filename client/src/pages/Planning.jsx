import { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';

const mockStrategies = [
  {
    id: 1,
    title: 'Pension Optimization',
    description: 'Maximize pension contributions for tax relief',
    status: 'active',
    savings: 2500,
  },
  {
    id: 2,
    title: 'Business Expense Review',
    description: 'Identify and categorize all allowable expenses',
    status: 'pending',
    savings: 1800,
  },
  {
    id: 3,
    title: 'Investment Planning',
    description: 'Structure investments for tax efficiency',
    status: 'completed',
    savings: 3200,
  },
];

function Planning() {
  const [strategies] = useState(mockStrategies);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tax Planning</h1>
          <p className="mt-1 text-sm text-gray-500">
            Develop and track your tax optimization strategies
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90">
          <Plus className="w-5 h-5 mr-2" />
          New Strategy
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {strategy.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {strategy.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(strategy.status)}`}>
                      {getStatusText(strategy.status)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Potential savings: £{strategy.savings.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button className="ml-4 p-2 text-gray-400 hover:text-primary">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Annual Review', 'Risk Analysis', 'Action Items'].map((title) => (
          <div key={title} className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500">
              More details will be available soon.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planning;
