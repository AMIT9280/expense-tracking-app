import React from "react";
import { MonthlyChangeRecord } from "../../types/statistics";
import { UserIcon } from "lucide-react";

interface Props {
  data: MonthlyChangeRecord[];
  getUserName: (userId: number) => string;
}

export const MonthlyChangeList: React.FC<Props> = ({ data, getUserName }) => (
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
        <span
          className={`font-bold ${
            user.percentChange! > 0
              ? "text-green-600"
              : user.percentChange! < 0
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {user.percentChange === null ? "N/A" : `${user.percentChange}%`}
        </span>
      </div>
    ))}
  </>
);
