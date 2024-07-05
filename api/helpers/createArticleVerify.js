function createArticleVerify(req, res, next) {
  if (!req.user?.isAdmin && !req.user?.isContributor) {
    return res.status(403).json({ success: false, msg: 'Not authorized to create articles' });
  }
  next();
}

module.exports = createArticleVerify;
