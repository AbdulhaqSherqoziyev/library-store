import pool from "../config/db.js";

// set up all table

export const setUp = async () => {
	const createPublishersTableQuery = `
    CREATE TABLE IF NOT EXISTS Publishers (
      publisher_id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT,
      phone VARCHAR(50),
      email VARCHAR(255)
    );
  `;

	// 2) Categories Table
	const createCategoriesTableQuery = `
    CREATE TABLE IF NOT EXISTS Categories (
      category_id uuid DEFAULT gen_random_uuid(),
      category_name VARCHAR(255) NOT NULL,
      description TEXT
    );
  `;

	// 3) Books Table
	const createBooksTableQuery = `
    CREATE TABLE IF NOT EXISTS Books (
      book_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      publisher_id INT,
      publication_year INT,
      isbn VARCHAR(20),
      price NUMERIC(10,2),
      category_id INT,
      stock_quantity INT,
      CONSTRAINT fk_publisher
        FOREIGN KEY (publisher_id)
        REFERENCES Publishers(publisher_id),
      CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES Categories(category_id)
    );
  `;

	// 4) Authors Table
	const createAuthorsTableQuery = `
    CREATE TABLE IF NOT EXISTS Authors (
      author_id SERIAL PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      bio TEXT
    );
  `;

	// 5) BookAuthors (Junction) Table
	const createBookAuthorsTableQuery = `
    CREATE TABLE IF NOT EXISTS BookAuthors (
      book_id INT,
      author_id INT,
      CONSTRAINT fk_book
        FOREIGN KEY (book_id)
        REFERENCES Books(book_id),
      CONSTRAINT fk_author
        FOREIGN KEY (author_id)
        REFERENCES Authors(author_id),
      CONSTRAINT pk_book_authors PRIMARY KEY (book_id, author_id)
    );
  `;

	// 6) Customers Table
	const createCustomersTableQuery = `
    CREATE TABLE IF NOT EXISTS Customers (
      customer_id SERIAL PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(255),
      phone VARCHAR(50),
      address TEXT
    );
  `;

	// 7) Orders Table
	const createOrdersTableQuery = `
    CREATE TABLE IF NOT EXISTS Orders (
      order_id SERIAL PRIMARY KEY,
      customer_id INT,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50),
      CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES Customers(customer_id)
    );
  `;

	// 8) OrderItems Table
	const createOrderItemsTableQuery = `
    CREATE TABLE IF NOT EXISTS OrderItems (
      order_item_id SERIAL PRIMARY KEY,
      order_id INT,
      book_id INT,
      quantity INT,
      unit_price NUMERIC(10,2),
      CONSTRAINT fk_order
        FOREIGN KEY (order_id)
        REFERENCES Orders(order_id),
      CONSTRAINT fk_book
        FOREIGN KEY (book_id)
        REFERENCES Books(book_id)
    );
  `;

	try {
		// Use async/await to run the queries in sequence

		const result = Promise.all([
			pool.query(createPublishersTableQuery),
			pool.query(createCategoriesTableQuery),
			pool.query(createBooksTableQuery),
			pool.query(createAuthorsTableQuery),
			pool.query(createBookAuthorsTableQuery),
			pool.query(createCustomersTableQuery),
			pool.query(createOrdersTableQuery),
			pool.query(createOrderItemsTableQuery),
		]);

		return "All tables have been created (if they did not already exist).";
	} catch (err) {
		console.error("Error creating tables:", err);
		throw new Error("Error creating tables");
	}
};
