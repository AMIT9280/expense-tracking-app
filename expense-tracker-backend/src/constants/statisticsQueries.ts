export const TOP_3_DAYS_QUERY = `
  SELECT user_id, date, SUM(amount) as total
  FROM Expenses
  GROUP BY user_id, date
  ORDER BY user_id, total DESC
`;

export const MONTHLY_TOTALS_QUERY = `
  SELECT user_id, DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total
  FROM Expenses
  GROUP BY user_id, month
  ORDER BY user_id, month
`;
