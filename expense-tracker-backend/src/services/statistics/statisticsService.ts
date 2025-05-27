import { pool } from "../../config/db";
import * as queries from "../../constants/statisticsQueries";

export const fetchTopDays = async () => {
  const [rows] = await pool.query(queries.TOP_3_DAYS_QUERY);
  const grouped = (rows as any[]).reduce((acc, row) => {
    acc[row.user_id] = acc[row.user_id] || [];
    if (acc[row.user_id].length < 3) acc[row.user_id].push(row);
    return acc;
  }, {} as Record<number, any[]>);
  return grouped;
};

export const fetchMonthlyTotals = async () => {
  const [rows] = await pool.query(queries.MONTHLY_TOTALS_QUERY);
  const grouped = (rows as any[]).reduce((acc, row) => {
    if (!acc[row.user_id]) acc[row.user_id] = [];
    acc[row.user_id].push(row);
    return acc;
  }, {} as Record<number, any[]>);

  const result = Object.entries(grouped).map(([user_id, months]: any) => {
    const current = months[months.length - 1];
    const previous = months[months.length - 2];
    const percentChange =
      previous && previous.total !== 0
        ? ((current.total - previous.total) / previous.total) * 100
        : null;
    return { user_id, current_month: current.month, percentChange };
  });

  return result;
};

export const predictNextMonth = async () => {
  const [rows] = await pool.query(queries.MONTHLY_TOTALS_QUERY);
  const grouped = (rows as any[]).reduce((acc, row) => {
    if (!acc[row.user_id]) acc[row.user_id] = [];
    if (acc[row.user_id].length < 3) acc[row.user_id].push(row.total);
    return acc;
  }, {} as Record<number, number[]>);

  const result = Object.entries(grouped).map(([user_id, totals]) => {
    const totalsArr = totals as number[];
    const avg = totalsArr.reduce((a, b) => a + b, 0) / totalsArr.length;
    return { user_id, predicted_next_month_total: avg };
  });

  return result;
};
