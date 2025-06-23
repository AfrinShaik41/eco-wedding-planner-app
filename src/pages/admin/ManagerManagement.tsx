
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getData, setData } from '../../config/data';
import { useToast } from '@/hooks/use-toast';

const ManagerManagement = () => {
  const [managers, setManagers] = useState(getData('users').filter(user => user.role === 'manager'));
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    department: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddManager = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = getData('users');
      const managerId = Date.now().toString();
      
      const manager = {
        ...newManager,
        id: managerId,
        role: 'manager',
        password: 'temppass123',
        phone: '',
        createdAt: new Date().toISOString()
      };
      
      users.push(manager);
      setData('users', users);
      setManagers(users.filter(user => user.role === 'manager'));

      toast({
        title: "Manager added!",
        description: `${newManager.name} has been added to the system.`,
      });

      setNewManager({
        name: '',
        email: '',
        department: '',
        status: 'active'
      });
    } catch (error) {
      toast({
        title: "Failed to add manager",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleStatusChange = (managerId: string, newStatus: string) => {
    const users = getData('users');
    const updatedUsers = users.map(user => 
      user.id === managerId ? { ...user, status: newStatus } : user
    );
    setData('users', updatedUsers);
    setManagers(updatedUsers.filter(user => user.role === 'manager'));

    toast({
      title: "Status updated",
      description: `Manager status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manager Management</h1>
        <p className="text-gray-600">Add and manage event managers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">👨‍💼</span>
              <span>Add New Manager</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddManager} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newManager.name}
                  onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newManager.email}
                  onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newManager.department} onValueChange={(value) => setNewManager({ ...newManager, department: value })}>
                  <SelectTrigger className="focus:ring-2 focus:ring-[#FF8080]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Events">Events</SelectItem>
                    <SelectItem value="Catering">Catering</SelectItem>
                    <SelectItem value="Decoration">Decoration</SelectItem>
                    <SelectItem value="Coordination">Coordination</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF8080] hover:bg-[#FF8080]/90 text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Adding Manager...' : 'Add Manager'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📋</span>
              <span>Current Managers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {managers.map((manager) => (
                <div key={manager.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#FF8080]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{manager.name}</h3>
                      <p className="text-sm text-gray-600">{manager.email}</p>
                      <p className="text-sm text-gray-600">{manager.department}</p>
                    </div>
                    <Select
                      value={manager.status || 'active'}
                      onValueChange={(value) => handleStatusChange(manager.id, value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
              {managers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">👨‍💼</div>
                  <p>No managers added yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerManagement;
