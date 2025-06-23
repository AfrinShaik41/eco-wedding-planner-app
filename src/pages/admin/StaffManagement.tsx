
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getData, setData } from '../../config/data';
import { useToast } from '@/hooks/use-toast';
import DashboardCard from '../../components/DashboardCard';

const StaffManagement = () => {
  const [staff, setStaff] = useState(getData('staff') || []);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    department: '',
    status: 'available'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const assignedStaff = staff.filter(s => s.status === 'assigned');
  const availableStaff = staff.filter(s => s.status === 'available');

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const staffMember = {
        ...newStaff,
        id: Date.now().toString(),
        assignedTo: null
      };
      
      const updatedStaff = [...staff, staffMember];
      setData('staff', updatedStaff);
      setStaff(updatedStaff);

      toast({
        title: "Staff member added!",
        description: `${newStaff.name} has been added to the team.`,
      });

      setNewStaff({
        name: '',
        role: '',
        department: '',
        status: 'available'
      });
    } catch (error) {
      toast({
        title: "Failed to add staff member",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const handleStatusChange = (staffId: string, newStatus: string) => {
    const updatedStaff = staff.map(member => 
      member.id === staffId ? { ...member, status: newStatus } : member
    );
    setData('staff', updatedStaff);
    setStaff(updatedStaff);

    toast({
      title: "Status updated",
      description: `Staff member status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Management</h1>
        <p className="text-gray-600">Manage your wedding event staff</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Staff"
          value={staff.length}
          icon="👥"
          description="All team members"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Assigned"
          value={assignedStaff.length}
          icon="✅"
          description="Currently working"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Available"
          value={availableStaff.length}
          icon="⏰"
          description="Ready for assignment"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">👨‍💼</span>
              <span>Add New Staff</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newStaff.role} onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}>
                  <SelectTrigger className="focus:ring-2 focus:ring-[#FF8080]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Decorator">Decorator</SelectItem>
                    <SelectItem value="Chef">Chef</SelectItem>
                    <SelectItem value="Server">Server</SelectItem>
                    <SelectItem value="Coordinator">Coordinator</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Photographer">Photographer</SelectItem>
                    <SelectItem value="Cleaner">Cleaner</SelectItem>
                    <SelectItem value="Driver">Driver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newStaff.department} onValueChange={(value) => setNewStaff({ ...newStaff, department: value })}>
                  <SelectTrigger className="focus:ring-2 focus:ring-[#FF8080]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Decoration">Decoration</SelectItem>
                    <SelectItem value="Catering">Catering</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Coordination">Coordination</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF8080] hover:bg-[#FF8080]/90 text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Adding Staff...' : 'Add Staff Member'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📋</span>
              <span>Staff Directory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {staff.map((member) => (
                <div key={member.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#FF8080]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                      {member.assignedTo && (
                        <p className="text-sm text-blue-600">Assigned to: {member.assignedTo}</p>
                      )}
                    </div>
                    <Select
                      value={member.status}
                      onValueChange={(value) => handleStatusChange(member.id, value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="off-duty">Off Duty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffManagement;
