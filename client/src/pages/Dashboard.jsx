import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const metrics = [
  {
    name: 'Total Tax Liability',
    value: '$24,563',
    change: '12%',
    trend: 'up',
  },
  {
    name: 'Deductions',
    value: '$8,954',
    change: '2.1%',
    trend: 'down',
  },
  {
    name: 'Tax Rate',
    value: '24.5%',
    change: '0.5%',
    trend: 'up',
  },
];

const chartData = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 3000 },
  { month: 'Mar', amount: 5000 },
  { month: 'Apr', amount: 4500 },
  { month: 'May', amount: 6000 },
  { month: 'Jun', amount: 5500 },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="p-6 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                {metric.name}
              </h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {metric.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {metric.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Tax Liability Trend
          </h3>
          <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
