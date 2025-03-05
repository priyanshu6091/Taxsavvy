import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import TaxCalculator from './pages/TaxCalculator';
import Expenses from './pages/Expenses';
import Planning from './pages/Planning';
import Documents from './pages/Documents';
import TaxAssistant from './pages/TaxAssistant';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ExpenseDashboard from './pages/ExpenseDashboard';

// Components
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calculator" element={<TaxCalculator />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/assistant" element={<TaxAssistant />} />
              <Route index element={<ExpenseDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
