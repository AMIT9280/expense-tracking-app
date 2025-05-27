import { Request, Response } from "express";
import * as statisticsService from "../../services/statistics/statisticsService";

export const getTopDays = async (_req: Request, res: Response) => {
  try {
    const data = await statisticsService.fetchTopDays();
    res.status(200).json({
      success: true,
      message: "Top days fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching top days:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMonthlyChange = async (_req: Request, res: Response) => {
  try {
    const data = await statisticsService.fetchMonthlyTotals();
    res.status(200).json({
      success: true,
      message: "Monthly change fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching monthly change:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getNextMonthPrediction = async (_req: Request, res: Response) => {
  try {
    const data = await statisticsService.predictNextMonth();
    res.status(200).json({
      success: true,
      message: "Next month prediction fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching next month prediction:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
