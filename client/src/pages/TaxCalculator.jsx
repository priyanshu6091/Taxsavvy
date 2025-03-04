import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const integrations = [
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    lastSync: '2024-03-15 14:30',
    status: 'connected',
  },
  {
    id: 'xero',
    name: 'Xero',
    status: 'disconnected',
  },
  {
    id: 'bank_of_america',
    name: 'Bank of America',
    lastSync: '2024-03-15 14:45',
    status: 'connected',
  },
  {
    id: 'chase_business',
    name: 'Chase Business',
    status: 'disconnected',
  },
  {
    id: 'netsuite',
    name: 'NetSuite ERP',
    lastSync: '2024-03-15 15:15',
    status: 'connected',
  },
];

const alerts = [
  {
    id: 'tax_rate_change',
    title: 'New Tax Rate Change',
    description: 'Corporate tax rate changes effective from Q2 2024',
    date: '2024-03-15',
    impact: 'high',
  },
  {
    id: 'deduction_rules',
    title: 'Updated Deduction Rules',
    description: 'New guidelines for home office deductions',
    date: '2024-03-14',
    impact: 'medium',
  },
  {
    id: 'compliance',
    title: 'Compliance Update',
    description: 'Your business meets new regulatory requirements',
    date: '2024-03-13',
    impact: 'low',
  },
];

function TaxCalculator() {
  const [income, setIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [standardDeduction, setStandardDeduction] = useState(12650);

  const getAlertColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-yellow-50 border-yellow-200';
      case 'medium':
        return 'bg-blue-50 border-blue-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getAlertIcon = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-yellow-600';
      case 'medium':
        return 'text-blue-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Main Calculator Section */}
      <div className="col-span-2 space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Input Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annual Income
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="head">Head of Household</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Standard Deduction
              </label>
              <input
                type="number"
                value={standardDeduction}
                onChange={(e) => setStandardDeduction(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Financial Integrations
          </h2>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <img
                      src={`/icons/${integration.id}.png`}
                      alt={integration.name}
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {integration.name}
                    </p>
                    {integration.lastSync && (
                      <p className="text-xs text-gray-500">
                        Last synced: {integration.lastSync}
                      </p>
                    )}
                  </div>
                </div>
                {integration.status === 'connected' ? (
                  <button className="text-sm text-gray-600 flex items-center">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Sync
                  </button>
                ) : (
                  <button className="text-sm text-primary">Connect</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Estimated Tax Breakdown
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estimated Tax</span>
                <span className="font-medium text-gray-900">$12,117.00</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary w-3/4 h-2 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">After Deductions</span>
                <span className="font-medium text-green-600">$0.00</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Effective Tax Rate</span>
                <span className="font-medium text-gray-900">16.2%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Regulatory Alerts</h2>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg ${getAlertColor(alert.impact)}`}
            >
              <div className="flex justify-between">
                <h3 className={`text-sm font-medium ${getAlertIcon(alert.impact)}`}>
                  {alert.title}
                </h3>
                <button className="text-gray-400 hover:text-gray-500">×</button>
              </div>
              <p className="mt-1 text-sm text-gray-600">{alert.description}</p>
              <p className="mt-1 text-xs text-gray-500">
                Date: {new Date(alert.date).toLocaleDateString()}
              </p>
            </div>
          ))}
          <button className="w-full px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary/5">
            Manage Alerts
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaxCalculator;
