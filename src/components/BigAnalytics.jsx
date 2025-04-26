"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-1))",
  },
};

// 💡 Dummy 365-day entry data (replace with API data)
const entries = Array.from({ length: 365 }, (_, i) => ({
  day: i + 1,
  amount: i + 1,
}));

function generateChartData(startDate, entries) {
  const baseDate = new Date(startDate); // e.g., "2024-01-01"

  return entries.map((entry) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + (entry.day - 1));
    return {
      date: date.toISOString().slice(0, 10), // format: yyyy-mm-dd
      savings: entry.amount,
    };
  });
}

const fullChartData = generateChartData("2024-01-01", entries);

export function BigAnalytics() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-12-31");
    const daysToSubtract =
      timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - daysToSubtract);

    return fullChartData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= referenceDate;
    });
  }, [timeRange]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Savings</CardTitle>
          <CardDescription>Daily savings over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[80px] h-8 text-xs">
            <SelectValue placeholder="Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7d</SelectItem>
            <SelectItem value="30d">30d</SelectItem>
            <SelectItem value="90d">90d</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="savings"
              stroke={chartConfig.savings.color}
              fill={chartConfig.savings.color}
              name={chartConfig.savings.label}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
