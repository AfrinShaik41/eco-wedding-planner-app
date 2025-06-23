
import DashboardCard from '../../components/DashboardCard';
import { getCurrentUser } from '../../utils/auth';
import { getData } from '../../config/data';

const ManagerDashboard = () => {
  const user = getCurrentUser();
  const assignments = getData('assignments')?.filter(assignment => assignment.managerId === user?.id) || [];
  const shifts = getData('shifts')?.filter(shift => shift.managerId === user?.id) || [];
  const events = getData('events');
  
  const pendingTasks = assignments.filter(assignment => assignment.status === 'pending').length;
  const upcomingShifts = shifts.filter(shift => new Date(shift.date) > new Date()).length;

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}! 📋
        </h1>
        <p className="text-gray-600">Manage your tasks and events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Pending Tasks"
          value={pendingTasks}
          icon="📝"
          description="Assignments to complete"
          trend="neutral"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Upcoming Shifts"
          value={upcomingShifts}
          icon="⏰"
          description="Scheduled work hours"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Total Events"
          value={events.length}
          icon="🎉"
          description="All events in system"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Department"
          value={user?.department || 'General'}
          icon="🏢"
          description="Your work area"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF8080]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Assignments</h2>
          <div className="space-y-3">
            {assignments.slice(0, 5).map((assignment) => (
              <div key={assignment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">📋</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{assignment.task}</div>
                  <div className="text-sm text-gray-600">Due: {assignment.dueDate}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {assignment.status}
                </span>
              </div>
            ))}
            {assignments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📋</div>
                <p>No assignments yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF8080]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Shifts</h2>
          <div className="space-y-3">
            {shifts.slice(0, 5).map((shift) => (
              <div key={shift.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">⏰</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{shift.date}</div>
                  <div className="text-sm text-gray-600">{shift.startTime} - {shift.endTime}</div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {shift.status}
                </span>
              </div>
            ))}
            {shifts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">⏰</div>
                <p>No shifts scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
