
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '../../utils/auth';
import { getData } from '../../config/data';
import DashboardCard from '../../components/DashboardCard';

const ManagerShifts = () => {
  const user = getCurrentUser();
  const allShifts = getData('shifts') || [];
  const myShifts = allShifts.filter(shift => shift.managerId === user?.id);
  
  const today = new Date().toDateString();
  const todayShifts = myShifts.filter(shift => new Date(shift.date).toDateString() === today);
  const upcomingShifts = myShifts.filter(shift => new Date(shift.date) > new Date());
  const completedShifts = myShifts.filter(shift => shift.status === 'completed');

  const getCurrentShift = () => {
    const now = new Date();
    return todayShifts.find(shift => {
      const shiftStart = new Date(`${shift.date} ${shift.startTime}`);
      const shiftEnd = new Date(`${shift.date} ${shift.endTime}`);
      return now >= shiftStart && now <= shiftEnd;
    });
  };

  const getNextShift = () => {
    const future = myShifts.filter(shift => new Date(`${shift.date} ${shift.startTime}`) > new Date());
    return future.sort((a, b) => new Date(`${a.date} ${a.startTime}`).getTime() - new Date(`${b.date} ${b.startTime}`).getTime())[0];
  };

  const currentShift = getCurrentShift();
  const nextShift = getNextShift();

  const calculateWeeklyHours = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return myShifts
      .filter(shift => new Date(shift.date) >= oneWeekAgo && shift.status === 'completed')
      .reduce((total, shift) => {
        const start = new Date(`2024-01-01 ${shift.startTime}`);
        const end = new Date(`2024-01-01 ${shift.endTime}`);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return total + hours;
      }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shifts</h1>
        <p className="text-gray-600">Manage your work schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Today's Shifts"
          value={todayShifts.length}
          icon="📅"
          description="Scheduled today"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Upcoming Shifts"
          value={upcomingShifts.length}
          icon="⏰"
          description="Future shifts"
          className="animate-scale-in"
        />
        <DashboardCard
          title="This Week Hours"
          value={`${calculateWeeklyHours()}h`}
          icon="⏱️"
          description="Total worked"
          trend="up"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Completed"
          value={completedShifts.length}
          icon="✅"
          description="Finished shifts"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🔔</span>
              <span>Current Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentShift ? (
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <h3 className="font-semibold text-green-800">Currently On Shift</h3>
                  <p className="text-green-700">{currentShift.startTime} - {currentShift.endTime}</p>
                  <p className="text-sm text-green-600">{currentShift.description}</p>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg">
                  <h3 className="font-semibold text-gray-600">No Active Shift</h3>
                  <p className="text-gray-500">You are currently off duty</p>
                </div>
              )}
              
              {nextShift && (
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Next Shift</h3>
                  <p className="text-blue-700">{nextShift.date}</p>
                  <p className="text-blue-700">{nextShift.startTime} - {nextShift.endTime}</p>
                  <p className="text-sm text-blue-600">{nextShift.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📋</span>
              <span>All My Shifts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {myShifts.map((shift) => (
                <div key={shift.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-[#FF8080]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{shift.date}</div>
                      <div className="text-sm text-gray-600">{shift.startTime} - {shift.endTime}</div>
                      {shift.description && (
                        <div className="text-sm text-gray-500">{shift.description}</div>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      shift.status === 'completed' ? 'bg-green-100 text-green-800' :
                      shift.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      shift.status === 'canceled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shift.status}
                    </span>
                  </div>
                </div>
              ))}
              {myShifts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">⏰</div>
                  <p>No shifts assigned yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerShifts;
