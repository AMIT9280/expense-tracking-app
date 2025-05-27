import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./components/layout/DashboardLayout";
import ExpensePage from "./pages/ExpensePage";
import { StatisticsPage } from "./pages/StatisticsPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function DashboardLayout() {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout title="Expense Tracker">
          <Routes>
            <Route path="/" element={<Navigate to="/expenses" replace />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route path="expenses" element={<ExpensePage />} />
              <Route path="statistics" element={<StatisticsPage />} />
            </Route>
          </Routes>
        </Layout>
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </QueryClientProvider>
  );
}
