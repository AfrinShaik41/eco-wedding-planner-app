
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '../../utils/auth';
import { getData } from '../../config/data';
import DashboardCard from '../../components/DashboardCard';

const DutyHours = () => {
  const user = getCurrentUser();
  const allShifts = getData('shifts') || [];
  const myShifts = allShifts.filter(shift => shift.managerId === user?.id);

  const calculateHours = (shifts: any[]) => {
    return shifts.reduce((total, shift) => {
      const start = new Date(`2024-01-01 ${shift.startTime}`);
      const end = new Date(`2024-01-01 ${shift.endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      return total + hours;
    }, 0);
  };

  const getWeeklyHours = (weeksBack: number = 0) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() - (weeksBack * 7)));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const weekShifts = myShifts.filter(shift => {
      const shiftDate = new Date(shift.date);
      return shiftDate >= startOfWeek && shiftDate <= endOfWeek && shift.status === 'completed';
    });
    
    return calculateHours(weekShifts);
  };

  const thisWeekHours = getWeeklyHours(0);
  const lastWeekHours = getWeeklyHours(1);
  const totalHours = calculateHours(myShifts.filter(s => s.status === 'completed'));
  const avgHoursPerWeek = myShifts.length > 0 ? totalHours / Math.max(1, Math.ceil(myShifts.length / 7)) : 0;

  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => {
      const monthIndex = months.indexOf(month);
      const monthShifts = myShifts.filter(shift => {
        const shiftDate = new Date(shift.date);
        return shiftDate.getMonth() === monthIndex && shift.status === 'completed';
      });
      return {
        month,
        hours: calculateHours(monthShifts)
      };
    });
  };

  const monthlyData = getMonthlyData();

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Duty Hours</h1>
        <p className="text-gray-600">Track your work hours and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="This Week"
          value={`${thisWeekHours.toFixed(1)}h`}
          icon="📊"
          description="Hours worked"
          trend={thisWeekHours > lastWeekHours ? 'up' : thisWeekHours < lastWeekHours ? 'down' : 'neutral'}
          className="animate-scale-in"
        />
        <DashboardCard
          title="Last Week"
          value={`${lastWeekHours.toFixed(1)}h`}
          icon="📈"
          description="Previous week"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Total Hours"
          value={`${totalHours.toFixed(1)}h`}
          icon="⏱️"
          description="All time"
          className="animate-scale-in"
        />
        <DashboardCard
          title="Weekly Average"
          value={`${avgHoursPerWeek.toFixed(1)}h`}
          icon="📋"
          description="Average per week"
          className="animate-scale-in"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📅</span>
              <span>Weekly Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">This Week</span>
                <span className="text-lg font-bold text-[#FF8080]">{thisWeekHours.toFixed(1)} hours</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Last Week</span>
                <span className="text-lg font-bold text-gray-600">{lastWeekHours.toFixed(1)} hours</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <span className="font-medium">Difference</span>
                <span className={`text-lg font-bold ${thisWeekHours >= lastWeekHours ? 'text-green-600' : 'text-red-600'}`}>
                  {thisWeekHours >= lastWeekHours ? '+' : ''}{(thisWeekHours - lastWeekHours).toFixed(1)} hours
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📊</span>
              <span>Monthly Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {monthlyData.map((month, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">{month.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#FF8080] h-2 rounded-full transition-all duration-500" 
                        style={{width: `${Math.min(100, (month.hours / Math.max(...monthlyData.map(m => m.hours), 1)) * 100)}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">{month.hours.toFixed(1)}h</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 backdrop-blur-sm bg-white/90 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Performance Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{myShifts.filter(s => s.status === 'completed').length}</div>
                <div className="text-sm text-blue-800">Completed Shifts</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{(totalHours / 8).toFixed(1)}</div>
                <div className="text-sm text-green-800">Full Work Days</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Math.round((myShifts.filter(s => s.status === 'completed').length / Math.max(1, myShifts.length)) * 100)}%</div>
                <div className="text-sm text-purple-800">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DutyHours;
