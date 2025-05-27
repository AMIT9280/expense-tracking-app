import axios from "axios";
import { Expense, ExpenseFilters, ExpenseUpdate } from "../types/expense";

const API_BASE_URL = "http://localhost:5000/api";

export const expenseApi = {
  getExpenses: async (filters: ExpenseFilters): Promise<Expense[]> => {
    const params = new URLSearchParams();

    if (filters.user) params.append("user", filters.user);
    if (filters.category) params.append("category", filters.category);
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);

    const response = await axios.get(
      `${API_BASE_URL}/expenses?${params.toString()}`
    );
    return response.data.data;
  },

  addExpense: async (expense: Omit<Expense, "id">): Promise<Expense> => {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense);
    return response.data.data;
  },

  updateExpense: async (
    id: string,
    expense: ExpenseUpdate
  ): Promise<Expense> => {
    const response = await axios.put(`${API_BASE_URL}/expenses/${id}`, expense);
    return response.data.data;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/expenses/${id}`);
  },
};
