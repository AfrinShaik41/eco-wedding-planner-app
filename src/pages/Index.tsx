
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { ROUTES } from '../config/routes';

const Index = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      // Redirect to appropriate dashboard based on role
      const dashboardRoutes = {
        customer: ROUTES.CUSTOMER_DASHBOARD,
        admin: ROUTES.ADMIN_DASHBOARD,
        manager: ROUTES.MANAGER_DASHBOARD
      };
      navigate(dashboardRoutes[user.role] || ROUTES.CUSTOMER_DASHBOARD, { replace: true });
    } else {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🌿</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Zero Waste Weddings</h1>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
