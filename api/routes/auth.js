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
  res.status(200).json({ ...req.user, success: req.user ? true : false });
});

module.exports = authRouter;
