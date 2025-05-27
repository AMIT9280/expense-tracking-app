import React from "react";
import { LayoutList, PieChart, UserCircle } from "lucide-react";

interface SidebarProps {
  currentPage: "expenses" | "statistics";
  onChangePage: (page: "expenses" | "statistics") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onChangePage }) => {
  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-800 shadow-xl hidden sm:flex flex-col justify-between">
      <div className="p-6">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => onChangePage("expenses")}
              className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                currentPage === "expenses"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-600 hover:text-indigo-800 dark:hover:text-white"
              }`}
            >
              <LayoutList className="w-5 h-5" /> Manage Expenses
            </button>
          </li>
          <li>
            <button
              onClick={() => onChangePage("statistics")}
              className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                currentPage === "statistics"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-600 hover:text-indigo-800 dark:hover:text-white"
              }`}
            >
              <PieChart className="w-5 h-5" /> Statistics
            </button>
          </li>
        </ul>
      </div>
      <div className="px-6 pb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <UserCircle className="w-4 h-4" />
        Amit Thakkar
      </div>
    </aside>
  );
};

export default Sidebar;
