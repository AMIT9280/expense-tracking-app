import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../types/user";
import { Category } from "../../types/category";
import { ExpenseFilters } from "../../types/expense";
import { getTodayDate } from "../../utils/formatDate";
import { ApiResponse } from "../../types/api";

interface ExpenseFilterProps {
  filters: ExpenseFilters;
  onChange: (filters: ExpenseFilters) => void;
  onClear: () => void;
}

export const ExpenseFilter: React.FC<ExpenseFilterProps> = ({
  filters,
  onChange,
  onClear,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const today = getTodayDate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<ApiResponse<User[]>>("http://localhost:5000/api/users");
        setUsers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get<ApiResponse<Category[]>>(
          "http://localhost:5000/api/categories"
        );
        setCategories(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchUsers();
    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          User
        </label>
        <select
          value={filters.user}
          onChange={(e) => onChange({ ...filters, user: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id.toString()}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          From Date
        </label>
        <input
          type="date"
          value={filters.fromDate}
          max={today}
          onChange={(e) => onChange({ ...filters, fromDate: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          To Date
        </label>
        <input
          type="date"
          value={filters.toDate}
          max={today}
          onChange={(e) => onChange({ ...filters, toDate: e.target.value })}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-end">
        <button
          onClick={onClear}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
