const BASE_URL = 'http://localhost:5000/api';

export const erpApi = {
  sync: () => fetch(`${BASE_URL}/erp/sync`, { method: 'POST' }).then(res => res.json()),
  getBalances: () => fetch(`${BASE_URL}/erp/balances`).then(res => res.json()),
  getTaxReport: () => fetch(`${BASE_URL}/erp/tax-report`).then(res => res.json())
};

export const expenseApi = {
  getExpenses: () => fetch(`${BASE_URL}/expenses`).then(res => res.json()),
  createExpense: (data) => fetch(`${BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())
};
