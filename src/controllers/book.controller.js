const { Book, Author, Publisher, Category } = require('../models');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [Author, Publisher, Category],
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id, {
      include: [Author, Publisher, Category],
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

const createBook = async (req, res) => {
  const { title, description, price, stock, authorId, publisherId, categoryId } = req.body;
  try {
    const book = await Book.create({ title, description, price, stock, authorId, publisherId, categoryId });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, stock, authorId, publisherId, categoryId } = req.body;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.update({ title, description, price, stock, authorId, publisherId, categoryId });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };