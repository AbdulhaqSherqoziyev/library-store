# Library Store Backend

This is the backend for a library store application. It provides APIs for user authentication, book management, and order processing.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add the required environment variables.
4. Run `npm start` to start the server.

## API Endpoints

- **Auth**
  - POST `/auth/register` - Register a new user.
  - POST `/auth/verify-otp` - Verify OTP.
  - POST `/auth/login` - Login user.

- **Books**
  - GET `/books` - Get all books.
  - POST `/books` - Add a new book.

- **Orders**
  - POST `/orders` - Create a new order.
  - GET `/orders` - Get all orders.

## License

MIT