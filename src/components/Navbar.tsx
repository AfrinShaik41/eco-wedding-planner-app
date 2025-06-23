
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getCurrentUser, logout } from '../utils/auth';
import { ROUTES } from '../config/routes';
import { User, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const getDashboardLink = () => {
    if (!user) return ROUTES.LOGIN;
    
    switch (user.role) {
      case 'admin':
        return ROUTES.ADMIN_DASHBOARD;
      case 'manager':
        return ROUTES.MANAGER_DASHBOARD;
      default:
        return ROUTES.CUSTOMER_DASHBOARD;
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to={getDashboardLink()} 
            className="text-2xl font-bold text-gray-900 hover:text-[#FF8080] transition-colors"
          >
            🌿 Zero Waste Weddings
          </Link>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User size={18} />
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-gray-500 capitalize">({user.role})</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-[#FF8080] text-[#FF8080] hover:bg-[#FF8080] hover:text-white"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
