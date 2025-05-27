export interface Expense {
  id: string;
  user_id: string;
  user?: string;
  category: string;
  date: string;
  amount: number;
  description?: string;
}

export interface ExpenseFilters {
  user?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
}

export interface ExpenseFormData {
  user_id: string;
  category: string;
  date: string;
  amount: string;
  description: string;
}

export type ExpenseUpdate = Partial<Omit<Expense, "id">>;
