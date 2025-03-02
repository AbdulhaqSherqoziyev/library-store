const User = require('../models/user.model');
const { generateToken } = require('../config/jwt');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const sendOtp = require('../config/email');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const user = await User.create({ name, email, password: hashedPassword, otp });
    sendOtp(email, otp);
    res.status(201).json({ message: 'User registered. Please verify OTP.', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user.otp === otp) {
      user.isVerified = true;
      await user.save();
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your OTP first' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { register, verifyOtp, login };