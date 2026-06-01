const crypto = require('crypto');
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
    if (!user) throw new ErrorResponse('Invalid credentials', 401);

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new ErrorResponse('Invalid credentials', 401);

    const token = user.getSignedJwtToken();
    return { user, token };
  }

  async getMe(userId) {
    return await User.findById(userId);
  }

  async deleteAccount(userId) {
    await User.findByIdAndDelete(userId);
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw new ErrorResponse('No user found with that email', 404);

    // Generate a random reset token (in production, email this to the user)
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Hash and store on user (dev mode: just return the raw token)
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save({ validateBeforeSave: false });

    return {
      resetToken,
      message: 'In production this token would be emailed. Use it in POST /auth/reset-password.',
    };
  }

  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) throw new ErrorResponse('Invalid or expired reset token', 400);

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const jwtToken = user.getSignedJwtToken();
    return { user, token: jwtToken };
  }

  async refreshToken(currentUser) {
    const user = await User.findById(currentUser.id);
    if (!user) throw new ErrorResponse('User not found', 404);
    const token = user.getSignedJwtToken();
    return { token };
  }
}

module.exports = new AuthService();
