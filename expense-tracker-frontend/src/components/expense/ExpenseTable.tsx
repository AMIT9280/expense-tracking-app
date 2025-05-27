import React from "react";
import { Expense } from "../../types/expense";
import { formatDate } from "../../utils/formatDate";

interface ExpenseTableProps {
  expenses: Expense[];
  loading: boolean;
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  loading,
}) => {
  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
    );

  if (expenses.length === 0)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No expenses found.
      </p>
    );

  return (
    <div className="overflow-x-auto rounded-2xl shadow-md bg-white dark:bg-gray-900">
      <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="bg-indigo-600 text-white dark:bg-indigo-800 rounded-t-xl">
          <tr>
            <th className="px-6 py-4 font-semibold">User</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            ({ id, user, category, date, description, amount }, idx) => (
              <tr
                key={id}
                className={`transition-colors ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                } hover:bg-indigo-50 dark:hover:bg-indigo-900`}
              >
                <td className="px-6 py-4">{user}</td>
                <td className="px-6 py-4">{category}</td>
                <td className="px-6 py-4">{formatDate(date)}</td>
                <td className="px-6 py-4">
                  {description || (
                    <span className="text-gray-400 italic">—</span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-right text-gray-900 dark:text-white">
                  ₹{Number(amount).toFixed(2)}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
