
import DashboardCard from '../../components/DashboardCard';
import { getCurrentUser } from '../../utils/auth';
import { getData } from '../../config/data';

const CustomerDashboard = () => {
  const user = getCurrentUser();
  const events = getData('events').filter(event => event.customerId === user?.id);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  const foodItems = getData('foodItems') || [];
  const sustainableItems = foodItems.filter(item => item.sustainable);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'Afrin Shaik'}! 🌿
        </h1>
        <p className="text-gray-600">Manage your eco-friendly wedding plans</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          value="92%"
          icon="🌱"
          description="Sustainability rating"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Sustainable Items"
          value={sustainableItems.length}
          icon="♻️"
          description="Eco-friendly choices"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF8080]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {events.slice(0, 3).map((event, index) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">🎊</div>
                <div>
                  <div className="font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-600">{event.date} at {event.venue}</div>
                  <div className="text-sm text-gray-500">{event.guests} guests</div>
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

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF8080]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sustainability Tips</h2>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800">Zero Waste Dining</h3>
              <p className="text-green-700 text-sm">Use banana leaf plates and steel water bottles</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-800">Local Sourcing</h3>
              <p className="text-blue-700 text-sm">Choose locally grown organic ingredients</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-800">Digital Invitations</h3>
              <p className="text-purple-700 text-sm">Save trees with electronic invites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
