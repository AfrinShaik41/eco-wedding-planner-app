
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { getData } from '../../config/data';
import DashboardCard from '../../components/DashboardCard';

const Analytics = () => {
  const analytics = getData('analytics') || { customers: { booked: 0, confirmed: 0, canceled: 0, walkins: 0 }, monthlyData: [] };
  const events = getData('events') || [];
  const staff = getData('staff') || [];
  
  const customerData = [
    { name: 'Booked', value: analytics.customers.booked, color: '#FF8080' },
    { name: 'Confirmed', value: analytics.customers.confirmed, color: '#82ca9d' },
    { name: 'Canceled', value: analytics.customers.canceled, color: '#ffc658' },
    { name: 'Walk-ins', value: analytics.customers.walkins, color: '#8884d8' }
  ];

  const assignedStaff = staff.filter(s => s.status === 'assigned').length;
  const availableStaff = staff.filter(s => s.status === 'available').length;

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard 📊</h1>
        <p className="text-gray-600">Real-time insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Customers"
          value={analytics.customers.booked}
          icon="👥"
          description="Total bookings"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Confirmed Events"
          value={analytics.customers.confirmed}
          icon="✅"
          description="Confirmed bookings"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Active Events"
          value={events.length}
          icon="🎉"
          description="Total events"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Staff Assigned"
          value={`${assignedStaff}/${staff.length}`}
          icon="👨‍💼"
          description="Working staff"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📊</span>
              <span>Customer Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📈</span>
              <span>Monthly Revenue Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#FF8080" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📅</span>
              <span>Monthly Bookings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#FF8080" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">👨‍💼</span>
              <span>Staff Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Staff</span>
                <span className="font-semibold text-lg">{staff.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Assigned</span>
                <span className="font-semibold text-lg text-green-600">{assignedStaff}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Available</span>
                <span className="font-semibold text-lg text-blue-600">{availableStaff}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#FF8080] h-2 rounded-full transition-all duration-500" 
                  style={{width: `${(assignedStaff / staff.length) * 100}%`}}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                {Math.round((assignedStaff / staff.length) * 100)}% Staff Utilization
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
