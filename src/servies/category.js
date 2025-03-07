import pool from "../config/db.js";

export async function createCategory(category) {
	const query = `
    INSERT INTO Categories (category_name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;
	const values = [category.categoryName, category.description];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

export async function getAllCategory() {
	const query = "SELECT * FROM Categories";

	try {
		const result = await pool.query(query);
		return result.rows;
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		throw error;
	}
}

export async function getCategoryById(categoryId) {
	console.log({ categoryId });
	const query = "SELECT * FROM Categories WHERE category_id = $1";
	const values = [categoryId];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		throw error;
	}
}

export async function deleteCategoy(categoryId) {
	const query = `
    DELETE FROM categories WHERE category_id = $1;
  `;
	const values = [categoryId];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

//TODO: implement update category logic
export async function updateCategory(categoryId, name, description) {
	const query = `
    INSERT INTO Categories (category_name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;
	const values = [name, description];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}
