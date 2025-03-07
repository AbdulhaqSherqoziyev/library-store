import pool from "../config/db.js";

// Kitobni ID bo‘yicha olish
export async function getBookById(bookId) {
	const sql = "SELECT * FROM books WHERE id = $1";
	const values = [bookId];

	try {
		const result = await pool.query(sql, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error fetching book by ID:", error);
		throw error;
	}
}

// Yangi kitob qo‘shish
export async function createBook(title, author) {
	const sql = `
    INSERT INTO books (title, author)
    VALUES ($1, $2)
    RETURNING *;
  `;
	const values = [title, author];

	try {
		const result = await pool.query(sql, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error creating book:", error);
		throw error;
	}
}

// Kitobni yangilash
export async function updateBook(bookId, updatedTitle) {
	const sql = "UPDATE books SET title = $2 WHERE id = $1 RETURNING *";
    const values = [bookId, updatedTitle];

    try {
        const result = await pool.query(sql, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

// Kitobni o‘chirish
export async function deleteBook(bookId) {
	const sql = "DELETE FROM books WHERE id = $1 RETURNING *";
	const values = [bookId];

	try {
		const result = await pool.query(sql, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error deleting book:", error);
		throw error;
	}
}

// Barcha kitoblarni olish
export async function getAllBooks() {
	const sql = "SELECT * FROM books";

	try {
		const result = await pool.query(sql);
		return result.rows;
	} catch (error) {
		console.error("Error fetching all books:", error);
		throw error;
	}
}
