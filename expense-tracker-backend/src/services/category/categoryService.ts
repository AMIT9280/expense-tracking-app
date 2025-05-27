import { pool } from '../../config/db';
import * as queries from '../../constants/categoryQueries';

export const getAllCategories = async () => {
  const [rows] = await pool.query(queries.GET_ALL_CATEGORIES);
  return rows;
};

export const addCategory = async (name: string) => {
  const [result] = await pool.query(queries.ADD_CATEGORY, [name]);
  return result;
};

export const updateCategory = async (id: string, name: string) => {
  const [result] = await pool.query(queries.UPDATE_CATEGORY, [name, id]);
  return result;
};

export const deleteCategory = async (id: string) => {
  const [result] = await pool.query(queries.DELETE_CATEGORY, [id]);
  return result;
};
