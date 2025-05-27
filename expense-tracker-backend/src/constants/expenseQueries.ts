export const INSERT_EXPENSE = `
  INSERT INTO Expenses (user_id, category, amount, date, description)
  VALUES (?, ?, ?, ?, ?)
`;

export const UPDATE_EXPENSE = `
  UPDATE Expenses
  SET category = ?, amount = ?, date = ?, description = ?
  WHERE id = ?
`;

export const DELETE_EXPENSE = `DELETE FROM Expenses WHERE id = ?`;
