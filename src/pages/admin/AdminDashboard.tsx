
import DashboardCard from '../../components/DashboardCard';
import { getData } from '../../config/data';

const AdminDashboard = () => {
  const users = getData('users');
  const events = getData('events');
  const managers = users.filter(user => user.role === 'manager');
  const customers = users.filter(user => user.role === 'customer');
  const activeEvents = events.filter(event => event.status === 'planned');

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard 📊</h1>
        <p className="text-gray-600">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Users"
          value={users.length}
          icon="👥"
          description="All registered users"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Active Events"
          value={activeEvents.length}
          icon="🎉"
          description="Ongoing projects"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Managers"
          value={managers.length}
          icon="👨‍💼"
          description="Event managers"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Customers"
          value={customers.length}
          icon="👰"
          description="Wedding couples"
          trend="up"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF8080]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h2>
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">🎊</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-600">{event.date} • {event.guests} guests</div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF8080]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">User Growth</span>
              <span className="text-green-600 font-semibold">+15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Event Success Rate</span>
              <span className="text-green-600 font-semibold">98%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="text-green-600 font-semibold">4.8/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sustainability Score</span>
              <span className="text-green-600 font-semibold">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
