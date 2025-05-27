import express from "express";
import {
  addExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expense/expenseController";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
