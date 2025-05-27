import { pool } from "../../config/db";
import * as queries from "../../constants/userQueries";

export const getAllUsers = async () => {
  const [rows] = await pool.query(queries.GET_ALL_USERS);
  return rows;
};

export const addUser = async (data: any) => {
  return pool.query(queries.ADD_USER, [data.name, data.email, data.status]);
};

export const updateUser = async (id: string, data: any) => {
  return pool.query(queries.UPDATE_USER, [
    data.name,
    data.email,
    data.status,
    id,
  ]);
};

export const deleteUser = async (id: string) => {
  return pool.query(queries.DELETE_USER, [id]);
};
