const { Order, OrderItem, Book } = require('../models');

const createOrder = async (userId, items) => {
  let totalAmount = 0;
  for (const item of items) {
    const book = await Book.findByPk(item.bookId);
    if (!book) {
      throw new Error(`Book with ID ${item.bookId} not found`);
    }
    if (book.stock < item.quantity) {
      throw new Error(`Not enough stock for book ${book.title}`);
    }
    totalAmount += book.price * item.quantity;
  }

  const order = await Order.create({ userId, totalAmount, status: 'pending' });

  for (const item of items) {
    const book = await Book.findByPk(item.bookId);
    await OrderItem.create({
      orderId: order.id,
      bookId: item.bookId,
      quantity: item.quantity,
      price: book.price,
    });
    book.stock -= item.quantity;
    await book.save();
  }

  return order;
};

module.exports = { createOrder }; 