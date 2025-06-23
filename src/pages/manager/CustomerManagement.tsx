
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getData } from '../../config/data';
import DashboardCard from '../../components/DashboardCard';

const CustomerManagement = () => {
  const customers = getData('customers') || [];
  const events = getData('events') || [];
  
  const confirmedCustomers = customers.filter(c => c.status === 'confirmed');
  const pendingCustomers = customers.filter(c => c.status === 'pending');
  const totalGuests = customers.reduce((sum, customer) => sum + (customer.guests || 0), 0);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600">Manage your assigned customers and their events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Customers"
          value={customers.length}
          icon="👥"
          description="All customers"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Confirmed"
          value={confirmedCustomers.length}
          icon="✅"
          description="Confirmed bookings"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Pending"
          value={pendingCustomers.length}
          icon="⏳"
          description="Awaiting confirmation"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Total Guests"
          value={totalGuests}
          icon="🎉"
          description="Expected attendees"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">👰</span>
              <span>Customer Directory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {customers.map((customer) => (
                <div key={customer.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#FF8080]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                      <p className="text-sm text-gray-600">{customer.eventType} • {customer.guests} guests</p>
                      {customer.specialRequests && (
                        <p className="text-sm text-blue-600 mt-1">{customer.specialRequests}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      customer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                </div>
              ))}
              {customers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">👥</div>
                  <p>No customers assigned yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Special Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <h3 className="font-semibold text-green-800">Arjun & Priya</h3>
                <p className="text-green-700 text-sm">Vegan Menu Required</p>
                <p className="text-green-600 text-xs">150 guests • No plastic usage</p>
              </div>
              
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <h3 className="font-semibold text-blue-800">Sameer & Ayesha</h3>
                <p className="text-blue-700 text-sm">Traditional Setup</p>
                <p className="text-blue-600 text-xs">80 guests • Sustainable practices</p>
              </div>
              
              <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
                <h3 className="font-semibold text-purple-800">Eco-Friendly Wedding</h3>
                <p className="text-purple-700 text-sm">Zero Waste Celebration</p>
                <p className="text-purple-600 text-xs">150 guests • Complete sustainability</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📊</span>
              <span>Customer Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{Math.round((confirmedCustomers.length / Math.max(1, customers.length)) * 100)}%</div>
                <div className="text-sm text-green-800">Confirmation Rate</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{Math.round(totalGuests / Math.max(1, customers.length))}</div>
                <div className="text-sm text-blue-800">Avg Guests per Event</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{customers.filter(c => c.eventType === 'Vegan').length}</div>
                <div className="text-sm text-purple-800">Eco-Friendly Events</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Event Type Distribution</h4>
              <div className="space-y-2">
                {['Traditional', 'Vegan', 'Modern', 'Eco-Friendly'].map(type => {
                  const count = customers.filter(c => c.eventType === type).length;
                  const percentage = (count / Math.max(1, customers.length)) * 100;
                  return (
                    <div key={type} className="flex items-center space-x-3">
                      <span className="w-20 text-sm font-medium">{type}</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerManagement;
