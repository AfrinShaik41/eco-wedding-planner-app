
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { ROUTES } from '../config/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const dashboardRoutes = {
      customer: ROUTES.CUSTOMER_DASHBOARD,
      admin: ROUTES.ADMIN_DASHBOARD,
      manager: ROUTES.MANAGER_DASHBOARD
    };
    
    return <Navigate to={dashboardRoutes[user.role] || ROUTES.LOGIN} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
