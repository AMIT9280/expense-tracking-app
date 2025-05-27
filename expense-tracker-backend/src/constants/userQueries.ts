export const GET_ALL_USERS = `
  SELECT id, name, email, status FROM Users
`;

export const ADD_USER = `
  INSERT INTO Users (name, email, status) VALUES (?, ?, ?)
`;

export const UPDATE_USER = `
  UPDATE Users SET name = ?, email = ?, status = ? WHERE id = ?
`;

export const DELETE_USER = `
  DELETE FROM Users WHERE id = ?
`;
