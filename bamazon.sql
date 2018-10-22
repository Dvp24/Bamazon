DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40) NOT NULL,
  department_name VARCHAR(40),
  price DECIMAL(5,2) NOT NULL DEFAULT 00.00,
  stock_quantity INT NOT NULL DEFAULT 0,
  PRIMARY KEY(id)
); 

INSERT INTO products
  (product_name, department_name, price, stock_quantity)
VALUES
  ("Humidifier", "Electronics", 50.00, 3),
  ("AA batteries", "Electronics", 10.00, 4),
  ("Table fan", "Electronics", 30.00, 6),
  ("Mic", "Electronics", 20.00, 1),
  ("Laptop", "Electronics", 150.00, 6),
  ("Baby monitor", "Electronics", 40.00, 9),
  ("iphone", "Electronics", 500.00, 4),
  ("Notebook", "School", 3.00, 9),
  ("Pen", "School", 2.00, 14),
  ("Griddle", "Cooking", 20.00, 8),

SELECT * FROM products;
    