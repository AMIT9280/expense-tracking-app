import React, { ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

interface DashboardProps {
  children?: ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex max-h-screen w-full overflow-y-auto scrollbar-hide bg-gradient-to-br from-indigo-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Sidebar
        currentPage={
          location.pathname.includes("statistics") ? "statistics" : "expenses"
        }
        onChangePage={(page: any) => navigate(`/${page}`)}
      />
      <main className="flex-1 overflow-y-auto max-h-screen p-8 scrollbar-hide">
        {children ?? <Outlet />}
      </main>
    </div>
  );
};
