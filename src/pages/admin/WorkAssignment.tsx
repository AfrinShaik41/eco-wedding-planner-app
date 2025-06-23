
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getData, setData } from '../../config/data';
import { useToast } from '@/hooks/use-toast';

const WorkAssignment = () => {
  const [assignments, setAssignments] = useState(getData('assignments') || []);
  const managers = getData('users').filter(user => user.role === 'manager');
  const events = getData('events');
  
  const [newAssignment, setNewAssignment] = useState({
    managerId: '',
    eventId: '',
    task: '',
    priority: 'medium',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const assignment = {
        ...newAssignment,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      const updatedAssignments = [...assignments, assignment];
      setData('assignments', updatedAssignments);
      setAssignments(updatedAssignments);

      toast({
        title: "Assignment created!",
        description: "Work has been assigned successfully.",
      });

      setNewAssignment({
        managerId: '',
        eventId: '',
        task: '',
        priority: 'medium',
        dueDate: ''
      });
    } catch (error) {
      toast({
        title: "Failed to create assignment",
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

  const getEventTitle = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    return event?.title || 'Unknown Event';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Assignment</h1>
        <p className="text-gray-600">Assign tasks to managers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📋</span>
              <span>New Assignment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div className="space-y-2">
                <Label>Manager</Label>
                <Select value={newAssignment.managerId} onValueChange={(value) => setNewAssignment({ ...newAssignment, managerId: value })}>
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
                <Label>Event</Label>
                <Select value={newAssignment.eventId} onValueChange={(value) => setNewAssignment({ ...newAssignment, eventId: value })}>
                  <SelectTrigger className="focus:ring-2 focus:ring-[#FF8080]">
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task">Task Description</Label>
                <Input
                  id="task"
                  value={newAssignment.task}
                  onChange={(e) => setNewAssignment({ ...newAssignment, task: e.target.value })}
                  placeholder="Setup venue decoration"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newAssignment.priority} onValueChange={(value) => setNewAssignment({ ...newAssignment, priority: value })}>
                    <SelectTrigger className="focus:ring-2 focus:ring-[#FF8080]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-[#FF8080]"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF8080] hover:bg-[#FF8080]/90 text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Creating Assignment...' : 'Create Assignment'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📝</span>
              <span>Current Assignments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#FF8080]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{assignment.task}</h3>
                      <p className="text-sm text-gray-600">Manager: {getManagerName(assignment.managerId)}</p>
                      <p className="text-sm text-gray-600">Event: {getEventTitle(assignment.eventId)}</p>
                      <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        assignment.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        assignment.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {assignment.priority}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {assignments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📋</div>
                  <p>No assignments created yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkAssignment;
