
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '../../utils/auth';
import { getData, setData } from '../../config/data';
import { useToast } from '@/hooks/use-toast';

const PersonalInfo = () => {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = getData('users');
      const updatedUsers = users.map(u => 
        u.id === user?.id ? { ...u, ...formData } : u
      );
      setData('users', updatedUsers);

      // Update current user in localStorage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      toast({
        title: "Profile updated!",
        description: "Your personal information has been saved.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h1>
        <p className="text-gray-600">Manage your account details</p>
      </div>

      <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">👤</span>
            <span>Profile Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FF8080] hover:bg-[#FF8080]/90 text-white transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfo;
