
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '../utils/auth';
import { ROUTES } from '../config/routes';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = login(formData.email, formData.password);
    
    if (result.success) {
      toast({
        title: "Login successful!",
        description: `Welcome back, ${result.user.name}!`,
      });
      
      // Redirect to appropriate dashboard
      const dashboardRoutes = {
        customer: ROUTES.CUSTOMER_DASHBOARD,
        admin: ROUTES.ADMIN_DASHBOARD,
        manager: ROUTES.MANAGER_DASHBOARD
      };
      
      navigate(dashboardRoutes[result.user.role] || ROUTES.CUSTOMER_DASHBOARD);
    } else {
      toast({
        title: "Login failed",
        description: result.error,
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-sm bg-white/90">
        <CardHeader className="text-center pb-8">
          <div className="text-4xl mb-4">🌿</div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Zero Waste Weddings
          </CardTitle>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FF8080] hover:bg-[#FF8080]/90 text-white transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                to={ROUTES.SIGNUP}
                className="text-[#FF8080] hover:text-[#FF8080]/80 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">Demo Accounts:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>Customer: customer@test.com / password</div>
              <div>Admin: admin@test.com / password</div>
              <div>Manager: manager@test.com / password</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
