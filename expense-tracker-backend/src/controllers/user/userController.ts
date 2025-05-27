import { Request, Response } from "express";
import * as userService from "../../services/user/userService";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const [result] = await userService.addUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { id: (result as any).insertId },
    });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
