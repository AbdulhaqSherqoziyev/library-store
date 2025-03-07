import pool from "../config/db.js";

export async function createOrder(order) {
    const query = `
        INSERT INTO Orders (customer_id, total_amount, order_date)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [order.customerId, order.totalAmount, order.orderDate];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}

export async function getAllOrders() {
    const query = "SELECT * FROM Orders";

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
    }
}

export async function getOrderById(orderId) {
    const query = "SELECT * FROM Orders WHERE order_id = $1";
    const values = [orderId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
}

export async function deleteOrder(orderId) {
    const query = `
        DELETE FROM Orders WHERE order_id = $1
        RETURNING *;
    `;
    const values = [orderId];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Agar o‘chirilgan order bo‘lsa, qaytaradi
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
}

