const { Order, OrderItem, Book, User } = require('../models');

const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let totalAmount = 0;
    for (const item of items) {
      const book = await Book.findByPk(item.bookId);
      if (!book) {
        return res.status(404).json({ message: `Book with ID ${item.bookId} not found` });
      }
      if (book.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for book ${book.title}` });
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

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User }, { model: OrderItem, include: [Book] }],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [{ model: User }, { model: OrderItem, include: [Book] }],
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({ status });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder };