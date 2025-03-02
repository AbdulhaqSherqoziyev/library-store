const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

// Ma'lumotlar bazasi sinxronizatsiyasi
sequelize
  .sync({ force: false }) // `force: true` - barcha jadvallarni qayta yaratadi (faqat rivojlanishda ishlating)
  .then(() => {
    console.log('Database synced successfully.');
    // Serverni ishga tushirish
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });