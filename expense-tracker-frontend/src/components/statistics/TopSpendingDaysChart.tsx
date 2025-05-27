import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DayRecord } from "../../types/statistics";
import { UserIcon } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  data: Record<string, DayRecord[]>;
  getUserName: (userId: number) => string;
}

export const TopSpendingDaysChart: React.FC<Props> = ({
  data,
  getUserName,
}) => {
  const chartRefs = useRef<Record<string, Chart<"bar"> | null>>({});

  useEffect(() => {
    return () => {
      Object.values(chartRefs.current).forEach((chart) => chart?.destroy());
    };
  }, []);

  return (
    <>
      {Object.entries(data).map(([userId, days]) => {
        const chartId = `user-chart-${userId}`;
        const chartData = {
          labels: days.map((d) => new Date(d.date).toLocaleDateString()),
          datasets: [
            {
              label: "Amount Spent",
              data: days.map((d) => d.total),
              backgroundColor: "#6366f1",
            },
          ],
        };

        const options = {
          responsive: true,
          plugins: { legend: { display: false } },
        };

        return (
          <div key={userId} className="mb-8 bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-gray-700" />
              {getUserName(Number(userId))}
            </h3>

            <Bar
              id={chartId}
              data={chartData}
              options={options}
              ref={(chart) => {
                if (chart) {
                  chartRefs.current[userId]?.destroy();
                  chartRefs.current[userId] = chart;
                }
              }}
            />
          </div>
        );
      })}
    </>
  );
};
