import React, { useState, useEffect } from "react";
import { Expense, ExpenseFormData } from "../../types/expense";
import axios from "axios";
import { User } from "../../types/user";
import { Category } from "../../types/category";
import { validateExpenseForm } from "../../utils/validationUtils";
import { getTodayDate } from "../../utils/formatDate";
import toast from "react-hot-toast";
import { ApiResponse } from "../../types/api";

interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, "id">) => Promise<void>;
  onClose: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd, onClose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ExpenseFormData>({
    user_id: "",
    category: "",
    date: "",
    amount: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const today = getTodayDate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await axios.get<ApiResponse<User[]>>("http://localhost:5000/api/users");
        setUsers(res.data.data);
      } catch {
        toast.error("Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await axios.get<ApiResponse<Category[]>>(
          "http://localhost:5000/api/categories"
        );
        setCategories(res.data.data);
      } catch {
        toast.error("Failed to fetch categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const validationErrors = validateExpenseForm(form, users, categories);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await onAdd({
        user_id: form.user_id,
        category: form.category,
        date: form.date,
        amount: Number(form.amount),
        description: form.description.trim(),
      });
      toast.success("Expense added successfully!");
      setForm({
        user_id: "",
        category: "",
        date: "",
        amount: "",
        description: "",
      });
      onClose();
    } catch {
      setSubmitError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="user"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              User <span className="text-red-500">*</span>
            </label>
            <select
              id="user"
              value={form.user_id}
              onChange={(e) => setForm({ ...form, user_id: e.target.value })}
              className={`form-select w-full p-2.5 rounded-md border ${
                errors.user_id ? "border-red-500" : "border-gray-300"
              } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            >
              <option value="">
                {loadingUsers ? "Loading users..." : "Select User"}
              </option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            {errors.user_id && (
              <p className="text-sm text-red-500 mt-1">{errors.user_id}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={`form-select w-full p-2.5 rounded-md border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            >
              <option value="">
                {loadingCategories ? "Loading..." : "Select Category"}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Date & Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              max={today}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={`form-input w-full p-2.5 rounded-md border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            {errors.date && (
              <p className="text-sm text-red-500 mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={`form-input w-full p-2.5 rounded-md border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            {errors.amount && (
              <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="form-textarea w-full p-2.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Submit error */}
        {submitError && (
          <div className="text-center text-sm text-red-600 font-medium">
            {submitError}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
};
