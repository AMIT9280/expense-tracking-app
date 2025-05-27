export interface DayRecord {
  user_id: number;
  date: string;
  total: number;
}

export interface MonthlyChangeRecord {
  user_id: number;
  percentChange: number | null;
}

export interface PredictionRecord {
  user_id: number;
  predicted_next_month_total: number;
}
