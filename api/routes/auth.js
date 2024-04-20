const authRouter = require('express').Router();
const passport = require('passport');
const checkAuth = require('../helpers/verify');

const scopes = ['identify', 'email'];
const prompt = 'consent';

authRouter.get(
  '/discord',
  passport.authenticate('discord', { scope: scopes, prompt: prompt }),
  function (req, res) {}
);

authRouter.get(
  '/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URL);
  } // auth success
);

authRouter.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

authRouter.get('/', checkAuth, function (req, res) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }

  const userResponse = {
    services: req.user.services,
    _id: req.user._id,
    discordId: req.user.discordId,
    id: req.user.id,
    username: req.user.username,
    isAdmin: req.user.isAdmin,
    balance: req.user.balance,
    xp: req.user.xp,
    role: req.user.role,
    avatar: req.user.avatar,
    createdAt: req.user.createdAt,
    success: true,
  };

  res.status(200).json(userResponse);
});

module.exports = authRouter;
