import express from "express";
import {
  getTopDays,
  getMonthlyChange,
  getNextMonthPrediction,
} from "../controllers/statistics/statisticsController";

const router = express.Router();

router.get("/top-days", getTopDays);
router.get("/monthly-change", getMonthlyChange);
router.get("/predict-next-month", getNextMonthPrediction);

export default router;
