import pool from "../config/db.js";

export async function createPublisher(publisher) {
    const query = `
        INSERT INTO Publishers (publisher_name)
        VALUES ($1)
        RETURNING *;
    `;
    const values = [publisher.publisherName];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating publisher:", error);
        throw error;
    }
}

export async function getAllPublishers() {
    const query = "SELECT * FROM Publishers";

    try {
        const result = await
        pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching all publishers:", error);
        throw error;
    }
}

export async function getPublisherById(publisherId) {
    const query = "SELECT * FROM Publishers WHERE publisher_id = $1";
    const values = [publisherId];
     try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching publisher by ID:", error);
        throw error;
    }
}

export async function deletePublisher(publisherId) {
    const query = `
        DELETE FROM Publishers WHERE publisher_id = $1
        RETURNING *;
    `;
    const values = [publisherId];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting publisher:", error);
        throw error;
    }
}
