import React, { useState } from "react";
import { ExpenseFilter } from "../components/expense/ExpenseFilter";
import { ExpenseForm } from "../components/expense/ExpenseForm";
import { ExpenseTable } from "../components/expense/ExpenseTable";
import { useExpenses, useAddExpense } from "../hooks/useExpenses";
import { Expense, ExpenseFilters } from "../types/expense";
import { PlusCircle, Filter } from "lucide-react";

const ExpensePage: React.FC = () => {
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const { data: expenses = [], isLoading } = useExpenses(filters);
  const addExpenseMutation = useAddExpense();
  const [showFormModal, setShowFormModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleAddExpense = async (expense: Omit<Expense, "id">) => {
    await addExpenseMutation.mutateAsync(expense);
    setShowFormModal(false);
  };

  const handleClearFilters = () => setFilters({});

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Expenses
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowFormModal(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <PlusCircle className="w-5 h-5" /> Add Expense
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6">
          <ExpenseFilter
            filters={{
              user: filters.user || "",
              category: filters.category || "",
              fromDate: filters.fromDate || "",
              toDate: filters.toDate || "",
            }}
            onChange={setFilters}
            onClear={handleClearFilters}
          />
        </div>
      )}

      {/* Table */}
      <ExpenseTable expenses={expenses} loading={isLoading} />

      {/* Modal */}
      {showFormModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                >
                  Add New Expense
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fill in the form to record a new expense.
                  </p>
                </h2>

                <button
                  onClick={() => setShowFormModal(false)}
                  className="text-gray-500 hover:text-red-500 text-2xl leading-none"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              <ExpenseForm
                onAdd={handleAddExpense}
                onClose={() => setShowFormModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensePage;
