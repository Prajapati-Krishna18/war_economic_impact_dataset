const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

class AuthService {
  async register(userData) {
    const user = await User.create(userData);
    const token = user.getSignedJwtToken();
    return { user, token };
  }

  async login(email, password) {
    if (!email || !password) {
      throw new ErrorResponse('Please provide an email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    const token = user.getSignedJwtToken();
    return { user, token };
  }

  async getMe(userId) {
    const user = await User.findById(userId);
    return user;
  }
}

module.exports = new AuthService();
