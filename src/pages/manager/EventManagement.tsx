
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getData } from '../../config/data';
import DashboardCard from '../../components/DashboardCard';

const EventManagement = () => {
  const events = getData('events') || [];
  const assignments = getData('assignments') || [];
  
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  const plannedEvents = events.filter(event => event.status === 'planned');
  const confirmedEvents = events.filter(event => event.status === 'confirmed');

  const getEventAssignments = (eventId: string) => {
    return assignments.filter(assignment => assignment.eventId === eventId);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management</h1>
        <p className="text-gray-600">Oversee and coordinate wedding events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Events"
          value={events.length}
          icon="🎉"
          description="All events"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Upcoming"
          value={upcomingEvents.length}
          icon="📅"
          description="Future events"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Confirmed"
          value={confirmedEvents.length}
          icon="✅"
          description="Ready to go"
          className="animate-scale-in"
        />
        <DashboardCard
          title="In Planning"
          value={plannedEvents.length}
          icon="📋"
          description="Being organized"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🎊</span>
              <span>Event Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {events.map((event) => (
                <div key={event.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#FF8080]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.date} • {event.venue}</p>
                      <p className="text-sm text-gray-600">{event.guests} guests</p>
                      {event.description && (
                        <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                      )}
                      <div className="mt-2">
                        <span className="text-xs text-blue-600">
                          {getEventAssignments(event.id).length} assignments
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      event.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🎉</div>
                  <p>No events scheduled yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📍</span>
              <span>Featured Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <h3 className="font-semibold text-green-800">Green Wedding 2025</h3>
                <p className="text-green-700 text-sm">December 15, 2025</p>
                <p className="text-green-600 text-xs">BioPark Hall • 200 guests</p>
                <p className="text-green-600 text-xs">Traditional setup with eco-friendly elements</p>
              </div>
              
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <h3 className="font-semibold text-blue-800">Eco-Friendly Wedding</h3>
                <p className="text-blue-700 text-sm">December 5, 2025</p>
                <p className="text-blue-600 text-xs">Hyderabad Eco Garden • 150 guests</p>
                <p className="text-blue-600 text-xs">Complete zero waste celebration</p>
              </div>
              
              <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
                <h3 className="font-semibold text-purple-800">Arjun & Priya Wedding</h3>
                <p className="text-purple-700 text-sm">November 20, 2025</p>
                <p className="text-purple-600 text-xs">Nature Resort • 150 guests</p>
                <p className="text-purple-600 text-xs">Vegan menu with organic decorations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📈</span>
              <span>Event Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Event Status Distribution</h4>
                <div className="space-y-3">
                  {['planned', 'confirmed', 'completed', 'canceled'].map(status => {
                    const count = events.filter(e => e.status === status).length;
                    const percentage = (count / Math.max(1, events.length)) * 100;
                    return (
                      <div key={status} className="flex items-center space-x-3">
                        <span className="w-16 text-sm font-medium capitalize">{status}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF8080] h-2 rounded-full transition-all duration-500" 
                            style={{width: `${percentage}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Guest Count Overview</h4>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      {events.reduce((sum, event) => sum + event.guests, 0)}
                    </div>
                    <div className="text-sm text-green-800">Total Expected Guests</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">
                      {Math.round(events.reduce((sum, event) => sum + event.guests, 0) / Math.max(1, events.length))}
                    </div>
                    <div className="text-sm text-blue-800">Average per Event</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventManagement;
