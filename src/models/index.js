const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

const User = require('./user.model')(sequelize);
const Book = require('./book.model')(sequelize);
const Order = require('./order.model')(sequelize);
const OrderItem = require('./orderItem.model')(sequelize);
const Author = require('./author.model')(sequelize);
const Publisher = require('./publisher.model')(sequelize);
const Category = require('./category.model')(sequelize);

// Modellar orasidagi bog'liqliklar
User.hasMany(Order);
Order.belongsTo(User);

Book.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Book, { through: OrderItem });

Book.belongsTo(Author);
Author.hasMany(Book);

Book.belongsTo(Publisher);
Publisher.hasMany(Book);

Book.belongsTo(Category);
Category.hasMany(Book);

module.exports = {
  sequelize,
  User,
  Book,
  Order,
  OrderItem,
  Author,
  Publisher,
  Category,
};