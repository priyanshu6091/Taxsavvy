import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Calculator,
  Receipt,
  LineChart,
  FileText,
  MessageSquare,
  Search,
  Bell,
  Settings,
  HelpCircle,
  User,
} from 'lucide-react';
import toast from 'react-hot-toast';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Tax Calculator', to: '/calculator', icon: Calculator },
  { name: 'Expenses', to: '/expenses', icon: Receipt },
  { name: 'Planning', to: '/planning', icon: LineChart },
  { name: 'Documents', to: '/documents', icon: FileText },
  { name: 'Tax Assistant', to: '/assistant', icon: MessageSquare },
];

function DashboardLayout() {
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    // Add your logout logic here
  };

  const handleNotifications = () => {
    toast('No new notifications', { icon: '🔔' });
  };

  const handleHelp = () => {
    toast('Help center coming soon!', { icon: '❓' });
  };

  const handleSettings = () => {
    toast('Settings panel coming soon!', { icon: '⚙️' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b">
          <span className="text-xl font-semibold text-primary">TaxSavvy</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="h-10 rounded-lg border border-gray-200 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleNotifications}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleHelp}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleSettings}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 hover:bg-gray-100">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium">{user?.email || 'Guest'}</span>
              </button>
              <div className="absolute right-0 mt-2 hidden w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg group-hover:block">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
