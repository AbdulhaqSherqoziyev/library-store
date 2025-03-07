import pool from "../config/db.js";

export async function createCustomer(customer) {
    const query = `
        INSERT INTO Customers (first_name, last_name, email, phone, address)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [customer.firstName, customer.lastName, customer.email, customer.phone, customer.address];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
}

export async function getAllCustomers() {
    const query = "SELECT * FROM Customers";
     try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching all customers:", error);
        throw error;
    }
}

export async function getCustomerById(customerId) {
    const query = "SELECT * FROM Customers WHERE customer_id = $1";
    const values = [customerId];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching customer by ID:", error);
            throw error;
        }
}

export async function deleteCustomer(customerId) {
    const query = `
        DELETE FROM Customers WHERE customer_id = $1
        RETURNING *;
    `;
    const values = [customerId];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw error;
    }
}