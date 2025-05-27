import { pool } from "../../config/db";
import * as queries from "../../constants/expenseQueries";

interface ExpenseFilters {
  user?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
}

export const addExpense = async (data: any) => {
  return pool.query(queries.INSERT_EXPENSE, [
    data.user_id,
    data.category,
    data.amount,
    data.date,
    data.description,
  ]);
};

export const updateExpense = async (id: string, data: any) => {
  return pool.query(queries.UPDATE_EXPENSE, [
    data.category,
    data.amount,
    data.date,
    data.description,
    id,
  ]);
};

export const deleteExpense = async (id: string) => {
  return pool.query(queries.DELETE_EXPENSE, [id]);
};

export const getExpenses = async (filters: {
  user?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
}) => {
  let baseQuery = `
    SELECT e.*, u.name as user
    FROM Expenses e 
    JOIN Users u ON e.user_id = u.id 
    WHERE 1 = 1
  `;
  const params: any[] = [];

  if (filters.user) {
    baseQuery += " AND e.user_id = ?";
    params.push(filters.user);
  }
  if (filters.category) {
    baseQuery += " AND e.category = ?";
    params.push(filters.category);
  }
  if (filters.fromDate) {
    baseQuery += " AND e.date >= ?";
    params.push(filters.fromDate);
  }
  if (filters.toDate) {
    baseQuery += " AND e.date <= ?";
    params.push(filters.toDate);
  }

  baseQuery += " ORDER BY e.date DESC";

  const [rows] = await pool.query(baseQuery, params);
  return rows;
};
