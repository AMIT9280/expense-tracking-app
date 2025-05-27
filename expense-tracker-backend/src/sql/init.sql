-- Create database
CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

-- Users table
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Categories table
CREATE TABLE IF NOT EXISTS Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Expenses table
CREATE TABLE IF NOT EXISTS Expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (category) REFERENCES Categories(id)
);

-- Insert test data
INSERT INTO Users (name, email, status) VALUES
('Alice', 'alice@example.com', 'active'),
('Bob', 'bob@example.com', 'active');

INSERT INTO Categories (name) VALUES
('Food'),
('Travel'),
('Utilities');

INSERT INTO Expenses (user_id, category, amount, date, description) VALUES
(1, 1, 100.00, '2024-04-01', 'Groceries'),
(1, 2, 50.00, '2024-04-03', 'Cab ride'),
(2, 3, 80.00, '2024-04-05', 'Electric bill');
