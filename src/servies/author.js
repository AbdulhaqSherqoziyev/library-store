import pool from "../config/db.js";

export async function createAuthor(author) {
    const query = `
        INSERT INTO Authors (first_name, last_name, email, phone, address)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [author.firstName, author.lastName, author.email, author.phone, author.address];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating author:", error);
        throw error;
    }
}

export async function getAllAuthors() {
    const query = "SELECT * FROM Authors";
    try {
        const result = await
        pool.query(query);
        return result.rows;
    }
    catch (error) {
        console.error("Error fetching all authors:", error);
        throw error;
    }
}

export async function getAuthorById(authorId) {
    const query = "SELECT * FROM Authors WHERE author_id = $1";
    const values = [authorId];
    try {
        const result
        = await pool.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error fetching author by ID:", error);
        throw error;
    }
}

export async function updateAuthor(authorId, author) {
    const query = `
        UPDATE Authors
        SET first_name = $1, last_name = $2, email = $3, phone = $4, address = $5
        WHERE author_id = $6
        RETURNING *;
    `;
    const values = [
        author.firstName, author.lastName, author.email, author.phone, author.address, authorId
    ];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error updating author:", error);
        throw error;
    }
}

export async function deleteAuthor(authorId) {
    const query = "DELETE FROM Authors WHERE author_id = $1 RETURNING *";
    const values = [authorId];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error deleting author:", error);
        throw error;
    }
}

export async function getAuthorBooks(authorId) {
    const query = `
        SELECT b.*
        FROM Books b
        INNER JOIN Authors_Books ab ON b.book_id = ab.book_id
        WHERE ab.author_id = $1;
        `;
    const values = [authorId];
    try {
        const result = await pool.query(query, values);
        return result.rows;
    }
    catch (error) {
        console.error("Error fetching author's books:", error);
        throw error;
    }
}
