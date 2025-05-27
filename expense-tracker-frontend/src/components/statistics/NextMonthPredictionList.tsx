import React from "react";
import { PredictionRecord } from "../../types/statistics";
import { UserIcon } from "lucide-react";

interface Props {
  data: PredictionRecord[];
  getUserName: (userId: number) => string;
}

export const NextMonthPredictionList: React.FC<Props> = ({
  data,
  getUserName,
}) => (
  <>
    {data.map((user) => (
      <div
        key={user.user_id}
        className="mb-4 bg-white p-6 rounded-lg shadow flex items-center justify-between"
      >
        <span className="font-semibold text-gray-900 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-gray-700" />
          {getUserName(user.user_id)}
        </span>
        <span className="font-bold text-indigo-600">
          ₹{user.predicted_next_month_total.toFixed(2)}
        </span>
      </div>
    ))}
  </>
);
