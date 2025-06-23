
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { signup } from '../utils/auth';
import { ROUTES, ROLES } from '../config/routes';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: ROLES.CUSTOMER
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = signup(formData);
    
    if (result.success) {
      toast({
        title: "Account created successfully!",
        description: `Welcome, ${result.user.name}!`,
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
        title: "Signup failed",
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
            Join Zero Waste Weddings
          </CardTitle>
          <p className="text-gray-600 mt-2">Create your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="focus:ring-2 focus:ring-[#FF8080]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ROLES.CUSTOMER}>Customer</SelectItem>
                  <SelectItem value={ROLES.MANAGER}>Manager</SelectItem>
                  <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FF8080] hover:bg-[#FF8080]/90 text-white transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to={ROUTES.LOGIN}
                className="text-[#FF8080] hover:text-[#FF8080]/80 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
