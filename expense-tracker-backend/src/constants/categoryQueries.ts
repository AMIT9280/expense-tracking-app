export const GET_ALL_CATEGORIES = `SELECT * FROM Categories;`;

export const ADD_CATEGORY = `
  INSERT INTO Categories (name)
  VALUES (?);
`;

export const UPDATE_CATEGORY = `
  UPDATE Categories
  SET name = ?
  WHERE id = ?;
`;

export const DELETE_CATEGORY = `
  DELETE FROM Categories
  WHERE id = ?;
`;
