const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { generateToken } = require('../config/jwt');

const registerUser = async (name, email, password) => {
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = generateToken(user.id);
  return token;
};

module.exports = { registerUser, loginUser };