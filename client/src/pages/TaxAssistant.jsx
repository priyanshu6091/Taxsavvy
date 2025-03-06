import { useState } from 'react';
import { Calculator, TrendingUp, PieChart, Zap } from 'lucide-react';
import { taxAssistantApi } from '../services/taxAssistantApi';
import toast from 'react-hot-toast';

export default function TaxAssistant() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');

  const [formData, setFormData] = useState({
    income: '',
    expenses: [],
    investments: {},
    deductions: {}
  });

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const result = await taxAssistantApi.analyze(formData);
      setAnalysis(result);
    } catch (error) {
      toast.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Tax Assistant</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeTab === 'calculator' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Tax Calculator
          </button>
          <button
            onClick={() => setActiveTab('planning')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeTab === 'planning' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Tax Planning
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Financial Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Annual Income</label>
              <input
                type="number"
                value={formData.income}
                onChange={(e) => setFormData(prev => ({ ...prev, income: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expenses</label>
              <input
                type="text"
                value={formData.expenses.join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, expenses: e.target.value.split(', ') }))}
                className="w-full rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Investments</label>
              <input
                type="text"
                value={Object.keys(formData.investments).join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, investments: e.target.value.split(', ').reduce((acc, key) => ({ ...acc, [key]: '' }), {}) }))}
                className="w-full rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deductions</label>
              <input
                type="text"
                value={Object.keys(formData.deductions).join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, deductions: e.target.value.split(', ').reduce((acc, key) => ({ ...acc, [key]: '' }), {}) }))}
                className="w-full rounded-lg border-gray-300"
              />
            </div>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
          >
            {loading ? 'Analyzing...' : 'Analyze Tax Situation'}
          </button>
        </div>

        {/* Results & Recommendations */}
        {analysis && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Tax Analysis</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium">Current Tax Liability</div>
                <div className="text-2xl font-bold">
                  ₹{analysis.currentTax ? analysis.currentTax.toLocaleString() : 'N/A'}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <div className="font-medium">{rec.title}</div>
                        <div className="text-sm text-gray-600">{rec.description}</div>
                        <div className="text-xs text-gray-500">{rec.impact}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}