function adminVerify(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ success: false, msg: 'Not enough permissions' });
  }
  next();
}

module.exports = adminVerify;
