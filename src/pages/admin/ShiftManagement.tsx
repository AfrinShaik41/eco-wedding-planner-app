
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getData, setData } from '../../config/data';
import { useToast } from '@/hooks/use-toast';
import DashboardCard from '../../components/DashboardCard';

const ShiftManagement = () => {
  const [shifts, setShifts] = useState(getData('shifts') || []);
  const managers = getData('users').filter(user => user.role === 'manager');
  const [newShift, setNewShift] = useState({
    managerId: '',
    date: '',
    startTime: '',
    endTime: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const todayShifts = shifts.filter(shift => 
    new Date(shift.date).toDateString() === new Date().toDateString()
  );
  const upcomingShifts = shifts.filter(shift => 
    new Date(shift.date) > new Date()
  );

  const handleCreateShift = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shift = {
        ...newShift,
        id: Date.now().toString(),
        status: 'scheduled'
      };
      
      const updatedShifts = [...shifts, shift];
      setData('shifts', updatedShifts);
      setShifts(updatedShifts);

      toast({
        title: "Shift created!",
        description: "New shift has been scheduled successfully.",
      });

      setNewShift({
        managerId: '',
        date: '',
        startTime: '',
        endTime: '',
        description: ''
      });
    } catch (error) {
      toast({
        title: "Failed to create shift",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const getManagerName = (managerId: string) => {
    const manager = managers.find(m => m.id === managerId);
    return manager?.name || 'Unknown';
  };

  const handleStatusChange = (shiftId: string, newStatus: string) => {
    const updatedShifts = shifts.map(shift => 
      shift.id === shiftId ? { ...shift, status: newStatus } : shift
    );
    setData('shifts', updatedShifts);
    setShifts(updatedShifts);

    toast({
      title: "Shift updated",
      description: `Shift status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shift Management</h1>
        <p className="text-gray-600">Schedule and manage work shifts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Today's Shifts"
          value={todayShifts.length}
          icon="📅"
          description="Active today"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Upcoming Shifts"
          value={upcomingShifts.length}
          icon="⏰"
          description="Future scheduled"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Total Shifts"
          value={shifts.length}
          icon="📊"
          description="All time"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">➕</span>
              <span>Schedule New Shift</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateShift} className="space-y-4">
              <div className="space-y-2">
                <Label>Manager</Label>
                <Select value={newShift.managerId} onValueChange={(value) => setNewShift({ ...newShift, managerId: value })}>
                  <SelectTrigger className="focus:ring-2 focus:ring-[#FF8080]">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name} - {manager.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newShift.date}
                  onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newShift.startTime}
                    onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newShift.endTime}
                    onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newShift.description}
                  onChange={(e) => setNewShift({ ...newShift, description: e.target.value })}
                  placeholder="Morning setup shift"
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF8080] hover:bg-[#FF8080]/90 text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Creating Shift...' : 'Schedule Shift'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📋</span>
              <span>Scheduled Shifts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {shifts.map((shift) => (
                <div key={shift.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#FF8080]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{getManagerName(shift.managerId)}</h3>
                      <p className="text-sm text-gray-600">{shift.date}</p>
                      <p className="text-sm text-gray-600">{shift.startTime} - {shift.endTime}</p>
                      {shift.description && (
                        <p className="text-sm text-gray-500">{shift.description}</p>
                      )}
                    </div>
                    <Select
                      value={shift.status}
                      onValueChange={(value) => handleStatusChange(shift.id, value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
              {shifts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">⏰</div>
                  <p>No shifts scheduled yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShiftManagement;
