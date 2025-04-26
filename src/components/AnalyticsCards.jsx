import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Clock, Flame, Trophy } from "lucide-react";

const AnalyticsCards = ({ data, loading, error }) => {
  const skeletons = new Array(4).fill(null);
  const cards = [
    {
      title: "Goal",
      value: `₹${data?.totalGoal?.toLocaleString() || 0}`,
      icon: <Trophy className="text-blue-500" />,
    },
    {
      title: "Total Savings",
      value: `₹${data?.currentSaved?.toLocaleString() || 0}`,
      icon: <Banknote className="text-green-500" />,
    },
    {
      title: "Balance Days",
      value: `${data?.totalDaysPending || 0}`,
      icon: <Clock className="text-yellow-500" />,
    },
    {
      title: "Streak",
      value: `${data?.streak || 0}`,
      icon: <Flame className="text-red-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {loading
        ? skeletons.map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-6 w-6 bg-gray-200 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="h-6 w-24 bg-gray-300 rounded mt-2" />
              </CardContent>
            </Card>
          ))
        : error
        ? skeletons.map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h1>Something Went Wrong</h1>
              </CardHeader>
              <CardContent>
                <p>No data Found</p>
              </CardContent>
            </Card>
          ))
        : cards.map((card, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {card.value}
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
};

export default AnalyticsCards;
