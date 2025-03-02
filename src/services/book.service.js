const { Book } = require('../models');

const getAllBooks = async () => {
  return await Book.findAll();
};

const getBookById = async (id) => {
  return await Book.findByPk(id);
};

const createBook = async (bookData) => {
  return await Book.create(bookData);
};

const updateBook = async (id, bookData) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  await book.update(bookData);
  return book;
};

const deleteBook = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  await book.destroy();
  return { message: 'Book deleted successfully' };
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };