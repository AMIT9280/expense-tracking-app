import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/statistics";

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

export const statisticsApi = {
  getTopDays: async (): Promise<Record<string, DayRecord[]>> => {
    const response = await axios.get<{ data: Record<string, DayRecord[]> }>(
      `${API_BASE_URL}/top-days`
    );
    return response.data.data;
  },

  getMonthlyChange: async (): Promise<MonthlyChangeRecord[]> => {
    const response = await axios.get<{ data: MonthlyChangeRecord[] }>(
      `${API_BASE_URL}/monthly-change`
    );
    return response.data.data;
  },

  getNextMonthPrediction: async (): Promise<PredictionRecord[]> => {
    const response = await axios.get<{ data: PredictionRecord[] }>(
      `${API_BASE_URL}/predict-next-month`
    );
    return response.data.data;
  },
};
