
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { ROUTES } from '../config/routes';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) return null;

  const getMenuItems = () => {
    switch (user.role) {
      case 'customer':
        return [
          { label: 'Dashboard', path: ROUTES.CUSTOMER_DASHBOARD, icon: '🏠' },
          { label: 'Personal Info', path: ROUTES.CUSTOMER_PERSONAL, icon: '👤' },
          { label: 'Event Details', path: ROUTES.CUSTOMER_EVENT, icon: '🎉' },
          { label: 'Food Details', path: ROUTES.CUSTOMER_FOOD, icon: '🍽️' }
        ];
      case 'admin':
        return [
          { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: '📊' },
          { label: 'Manager Management', path: ROUTES.ADMIN_MANAGERS, icon: '👥' },
          { label: 'Work Assignment', path: ROUTES.ADMIN_ASSIGNMENTS, icon: '📋' },
          { label: 'Shifts', path: ROUTES.ADMIN_SHIFTS, icon: '⏰' },
          { label: 'Staff', path: ROUTES.ADMIN_STAFF, icon: '👷' },
          { label: 'Analytics', path: ROUTES.ADMIN_ANALYTICS, icon: '📈' }
        ];
      case 'manager':
        return [
          { label: 'Dashboard', path: ROUTES.MANAGER_DASHBOARD, icon: '📋' },
          { label: 'Shifts', path: ROUTES.MANAGER_SHIFTS, icon: '⏰' },
          { label: 'Personal Info', path: ROUTES.MANAGER_PERSONAL, icon: '👤' },
          { label: 'Duty Hours', path: ROUTES.MANAGER_DUTIES, icon: '🕐' },
          { label: 'Customers', path: ROUTES.MANAGER_CUSTOMERS, icon: '👰' },
          { label: 'Events', path: ROUTES.MANAGER_EVENTS, icon: '🎊' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 capitalize">
          {user.role} Panel
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#FF8080]/10",
                location.pathname === item.path
                  ? "bg-[#FF8080]/20 text-[#FF8080] border-l-4 border-[#FF8080]"
                  : "text-gray-700 hover:text-[#FF8080]"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
