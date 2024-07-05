const authRouter = require('express').Router();
const passport = require('passport');
const checkAuth = require('../helpers/verify');

const scopes = ['identify', 'email'];
const prompt = 'consent';

authRouter.get(
  '/discord',
  (req, res, next) => {
    const redirect = req.query.redirect || process.env.CLIENT_URL;
    req.session.redirectTo = redirect;
    console.log('Session ID on /discord:', req.sessionID);
    console.log('Storing redirect URL in session:', req.session.redirectTo);
    next();
  },
  passport.authenticate('discord', { scope: scopes, prompt: prompt })
);

authRouter.get(
  '/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Session ID on /discord/callback:', req.sessionID);
    const redirectTo = req.session.redirectTo || process.env.CLIENT_URL;
    console.log('Redirect to from session:', redirectTo);
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  }
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
    isContributor: req.user.isContributor,
    balance: req.user.balance,
    xp: req.user.xp,
    role: req.user.role,
    avatar: req.user.avatar,
    createdAt: req.user.createdAt,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    contactNumber: req.user.contactNumber,
    billingAddress: req.user.billingAddress,
    success: true,
  };

  res.status(200).json(userResponse);
});

module.exports = authRouter;
