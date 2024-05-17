CREATE DATABASE IF NOT EXISTS grocery_booking;

USE grocery_booking;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);


CREATE TABLE IF NOT EXISTS grocery_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    inventory_count INT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    grocery_item_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (grocery_item_id) REFERENCES grocery_items(id)
);


-- Insert initial data into users table
INSERT INTO users (username, password, role) VALUES ('admin', 'adminpass', 'admin');
INSERT INTO users (username, password, role) VALUES ('user', 'userpass', 'user');

-- Insert initial data into grocery_items table
INSERT INTO grocery_items (name, price, inventory_count) VALUES ('Apple', 1.99, 100);
INSERT INTO grocery_items (name, price, inventory_count) VALUES ('Banana', 0.99, 150);