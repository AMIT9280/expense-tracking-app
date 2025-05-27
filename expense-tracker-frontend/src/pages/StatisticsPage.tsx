import React, { useEffect, useState } from "react";
import { statisticsApi } from "../api/statisticsApi";
import {
  DayRecord,
  MonthlyChangeRecord,
  PredictionRecord,
} from "../types/statistics";
import { TopSpendingDaysChart } from "../components/statistics/TopSpendingDaysChart";
import { MonthlyChangeList } from "../components/statistics/MonthlyChangeList";
import { NextMonthPredictionList } from "../components/statistics/NextMonthPredictionList";
import { User } from "../types/user";

export const StatisticsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [topDaysData, setTopDaysData] = useState<Record<string, DayRecord[]>>(
    {}
  );
  const [monthlyChangeData, setMonthlyChangeData] = useState<
    MonthlyChangeRecord[]
  >([]);
  const [predictionData, setPredictionData] = useState<PredictionRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsersAndStats = async () => {
      try {
        const usersRes = await fetch("http://localhost:5000/api/users");
        const usersJson = await usersRes.json();
        setUsers(usersJson.data);

        const [topDays, monthlyChange, prediction] = await Promise.all([
          statisticsApi.getTopDays(),
          statisticsApi.getMonthlyChange(),
          statisticsApi.getNextMonthPrediction(),
        ]);

        setTopDaysData(topDays);
        setMonthlyChangeData(monthlyChange);
        setPredictionData(prediction);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndStats();
  }, []);

  const getUserName = (userId: number) => {
    const user = users.find((u) => String(u.id) === String(userId));
    return user ? user.name : `User ${userId}`;
  };

  if (loading) return <p className="p-4">Loading statistics...</p>;

  return (
    <div className="p-6 space-y-10 overflow-y-auto scrollbar-hide h-full">
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Top 3 Spending Days per User
        </h2>
        <TopSpendingDaysChart data={topDaysData} getUserName={getUserName} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Monthly Expenditure Change</h2>
        <MonthlyChangeList data={monthlyChangeData} getUserName={getUserName} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Predicted Expenditure for Next Month
        </h2>
        <NextMonthPredictionList
          data={predictionData}
          getUserName={getUserName}
        />
      </section>
    </div>
  );
};
