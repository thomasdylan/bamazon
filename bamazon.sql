DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NULL,
    department_name VARCHAR(255) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Plain T-shirts", "Clothing", 5.99, 15),
        ("Graphic T-shirts", "Clothing", 8.99, 10),
        ("Slayer Box Set", "Music", 9.99, 8),
        ("Harry Potter Collection", "Books", 35.50, 4),
        ("Iphone XS", "Electronics", 1800.00, 13),
        ("Samsung 4K TV", "Electronics", 700.99, 2),
        ("Laptop", "Electronics", 500.50, 46),
        ("Minecraft", "Games", 20.99, 100),
        ("Funko Pop!", "Toys", 14.99, 40),
        ("Wireless Headphones", "Electronics", 135.99, 14);