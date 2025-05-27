import { Request, Response } from "express";
import * as service from "../../services";

export const addExpense = async (req: Request, res: Response) => {
  try {
    const [result] = await service.addExpense(req.body);
    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: { id: (result as any).insertId },
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Expense ID is required",
      });
      return;
    }
    await service.updateExpense(id, req.body);
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Expense ID is required",
      });
      return;
    }
    await service.deleteExpense(id);
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const filters = {
      user: req.query.user as string | undefined,
      category: req.query.category as string | undefined,
      fromDate: req.query.fromDate as string | undefined,
      toDate: req.query.toDate as string | undefined,
    };

    const expenses = await service.getExpenses(filters);
    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
