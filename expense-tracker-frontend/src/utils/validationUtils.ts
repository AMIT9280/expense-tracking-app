import { User } from "../types/user";
import { Category } from "../types/category";
import { ExpenseFormData } from "../types/expense";

interface ValidationErrors {
  [key: string]: string;
}

export function validateExpenseForm(
  form: ExpenseFormData,
  users: User[],
  categories: Category[]
): ValidationErrors {
  const errors: ValidationErrors = {};
  const trimmedCategory = form.category.trim();

  if (!form.user_id) {
    errors.user_id = "User is required.";
  } else if (!users.find((u) => String(u.id) === form.user_id)) {
    errors.user_id = "Invalid user selected.";
  }

  if (!trimmedCategory) errors.category = "Category is required.";
  else if (!categories.find((c) => c.name === trimmedCategory))
    errors.category = "Invalid category selected.";

  if (!form.date) errors.date = "Date is required.";
  else {
    const dateValue = new Date(form.date);
    dateValue.setHours(0, 0, 0, 0);
    if (isNaN(dateValue.getTime())) errors.date = "Invalid date.";
    else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dateValue > today) errors.date = "Date cannot be in the future.";
    }
  }

  const amountNumber = Number(form.amount);
  if (!form.amount) errors.amount = "Amount is required.";
  else if (isNaN(amountNumber)) errors.amount = "Amount must be a number.";
  else if (amountNumber <= 0) errors.amount = "Amount must be positive.";

  return errors;
}
