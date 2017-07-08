DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);


-- Insert 10 mock products into the table
INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES('65-inch 4K TV', 'Electronics', 1200.00, 20), ('Surround Sound System', 'Electronics', 250.00, 25), ('Playstation 4 Pro', 'Electronics', 299.99, 18), 
('Bath Towels', 'Bath', 9.99, 50), ('Dishwashing Soap', 'Kitchen', 3.50, 18), ('Paper Towels', 'Kitchen', 1.50, 23),
('Couch Pillows', 'Home', 10.99, 34), ('Google Home', 'Electronics', 129.99, 26), ('Google Pixel XL', 'Electronics', 650.00, 23),
('Toilet Paper', 'Bath', 10.99, 39);