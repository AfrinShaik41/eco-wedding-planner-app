
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend = 'neutral',
  className 
}: DashboardCardProps) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-[#FF8080]",
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
          <span>{title}</span>
          <span className="text-2xl">{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        {description && (
          <div className={cn("text-sm", trendColors[trend])}>
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
