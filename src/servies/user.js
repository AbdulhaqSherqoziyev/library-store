import pool from "../config/db.js";


export async function main() {
    // Create a new book
    const newBook = {
        title: "Book Title",
        authorId: 1,
        publicationYear: 2022,
        genreId: 1,
        publisherId: 1,
        quantityInStock: 100,
        price: 19.99,
    };
    const createdBook = await createBook(newBook);
    console.log("Created book:", createdBook);

    // Fetch all books
    const allBooks = await getAllBooks();
    console.log("All books:", allBooks);

    // Fetch book by ID
    const bookId = 1;
    const fetchedBook = await getBookById(bookId);
    console.log("Book by ID:", fetchedBook);

    // Update book details
    const updatedBook = {
        ...fetchedBook,
        title: "Updated Book Title",
        price: 24.99,
    };

    await updateBook(updatedBook);
    console.log("Updated book:", updatedBook);

    // Delete book
    await deleteBook(updatedBook.bookId);
    console.log("Deleted book with ID:", updatedBook.bookId);
}

async function createBook(book) {
    const query = `
        INSERT INTO Books (title, author_id, publication_year, genre_id, publisher_id, quantity_in_stock, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [
        book.title,
        book.authorId,
        book.publicationYear,
        book.genreId,
        book.publisherId,
        book.quantityInStock,
        book.price,
    ];
}

async function getAllBooks() {
    const query = "SELECT * FROM Books";
    const result = await pool.query(query);
    return result.rows;
}

async function getBookById(bookId) {
    const query = "SELECT * FROM Books WHERE book_id = $1";
    const values = [bookId];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function updateBook(book) {
    const query = `
        UPDATE Books
        SET title = $1, price = $2
        WHERE book_id = $3;
    `;
    const values = [book.title, book.price, book.bookId];
    await pool.query(query, values);
    return book;
}

async function deleteBook(bookId) {
    const query = "DELETE FROM Books WHERE book_id = $1";
    const values = [bookId];
    await pool.query(query, values);
    return bookId;
}

