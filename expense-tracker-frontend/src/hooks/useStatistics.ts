import { useQuery } from "@tanstack/react-query";
import { statisticsApi } from "../api/statisticsApi";

export const useTopDays = () => {
  return useQuery({
    queryKey: ["topDays"],
    queryFn: statisticsApi.getTopDays,
  });
};

export const useMonthlyChange = () => {
  return useQuery({
    queryKey: ["monthlyChange"],
    queryFn: statisticsApi.getMonthlyChange,
  });
};

export const useNextMonthPrediction = () => {
  return useQuery({
    queryKey: ["nextMonthPrediction"],
    queryFn: statisticsApi.getNextMonthPrediction,
  });
};
