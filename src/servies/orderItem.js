import pool from "../config/db.js";

async function createOrderItem(orderItem) {
    const query = `
        INSERT INTO OrderItems (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [orderItem.orderId, orderItem.productId, orderItem.quantity, orderItem.price];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating order item:", error);
        throw error;
    }
}

async function getAllOrderItems() {
    const query = "SELECT * FROM OrderItems";
     try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching all order items:", error);
        throw error;
    }
}

async function getOrderItemsByOrderId(orderId) {
    const query = "SELECT * FROM OrderItems WHERE order_id = $1";
    const values = [orderId];
     try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
         console.error("Error fetching order items by order ID:", error);
        throw error;
    }
}

async function deleteOrderItem(orderItemId) {
    const query = `
        DELETE FROM OrderItems WHERE order_item_id = $1
        RETURNING *;
    `;
    const values = [orderItemId];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error deleting order item:", error);
            throw error;
        }
}


export { createOrderItem, getAllOrderItems, getOrderItemsByOrderId, deleteOrderItem };