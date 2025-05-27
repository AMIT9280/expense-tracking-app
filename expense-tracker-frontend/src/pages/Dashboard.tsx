import React, { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { StatisticsPage } from "../pages/StatisticsPage";
import Sidebar from "../components/layout/Sidebar";

export const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"expenses" | "statistics">(
    "expenses"
  );

  return (
    <Layout title="Expense Tracker">
      <div className="flex min-h-screen  overflow-y-auto scrollbar-hide w-full bg-gradient-to-br from-indigo-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 scrollbar-hide">
        <Sidebar currentPage={currentPage} onChangePage={setCurrentPage} />

        <main className="flex-1 overflow-y-auto scrollbar-hide p-8 min-w-0">
          {currentPage === "expenses" && (
            <>
              <div className="flex flex-wrap justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Expenses
                </h1>
              </div>
            </>
          )}
          {currentPage === "statistics" && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Statistics
              </h1>
              <StatisticsPage />
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};
