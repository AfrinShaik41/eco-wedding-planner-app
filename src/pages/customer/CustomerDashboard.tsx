
import DashboardCard from '../../components/DashboardCard';
import { getCurrentUser } from '../../utils/auth';
import { getData } from '../../config/data';

const CustomerDashboard = () => {
  const user = getCurrentUser();
  const events = getData('events').filter(event => event.customerId === user?.id);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 🌿
        </h1>
        <p className="text-gray-600">Manage your eco-friendly wedding plans</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Events"
          value={events.length}
          icon="🎉"
          description="Planned celebrations"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Upcoming Events"
          value={upcomingEvents.length}
          icon="📅"
          description="Future weddings"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Eco Score"
          value="85%"
          icon="🌱"
          description="Sustainability rating"
          trend="up"
          className="animate-scale-in"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF8080]">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {events.slice(0, 3).map((event, index) => (
            <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">🎊</div>
              <div>
                <div className="font-medium text-gray-900">{event.title}</div>
                <div className="text-sm text-gray-600">{event.date} at {event.venue}</div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🌿</div>
              <p>No events yet. Start planning your eco-friendly wedding!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
