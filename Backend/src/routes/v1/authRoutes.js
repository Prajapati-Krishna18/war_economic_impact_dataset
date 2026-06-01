const express = require('express');
const {
  register, login, logout, getMe,
  forgotPassword, resetPassword, refreshToken, deleteAccount,
} = require('../../controllers/authController');
const { protect } = require('../../middlewares/authMiddleware');
const { authLimiter } = require('../../middlewares/rateLimiter');

const router = express.Router();

router.options('/', (req, res) => res.set('Allow', 'POST, OPTIONS').status(204).end());
router.options('/login', (req, res) => res.set('Allow', 'POST, OPTIONS').status(204).end());
router.head('/me', protect, (req, res) => res.set('X-User-Id', String(req.user._id)).status(200).end());

router.post('/register',        authLimiter, register);
router.post('/login',           authLimiter, login);
router.post('/logout',          protect,     logout);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password',               resetPassword);
router.post('/refresh-token',   protect,     refreshToken);

router.get('/me',     protect, getMe);
router.delete('/account', protect, deleteAccount);

module.exports = router;
