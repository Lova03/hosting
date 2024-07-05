const notiRouter = require('express').Router();
const Notification = require('../models/notification');
const checkAuth = require('../helpers/verify');

// Get all notifications for the logged-in user
notiRouter.get('/', checkAuth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id, read: false }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Failed to fetch notifications', error: error.message });
  }
});

// Mark a notification as read
notiRouter.put('/:id/read', checkAuth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, msg: 'Notification not found' });
    }

    if (notification.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, msg: 'You do not have permission to update this notification' });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Failed to update notification', error: error.message });
  }
});

module.exports = notiRouter;
