const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/user.routes');
const { sequelize } = require('./models');

dotenv.config();

// Express ilovasini yaratish
const app = express();

// JSON ma'lumotlarni qabul qilish uchun middleware
app.use(express.json());

// API marshrutlari
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

// Ma'lumotlar bazasi ulanishini tekshirish
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Global xato boshqaruvchi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;