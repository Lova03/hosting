const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const notificationSchema = new Schema(
  {
    user: { type: ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['article', 'info', 'payment', 'support'],
      default: 'payment',
      required: true,
    },
    link: { type: String, default: '' }, // either articleId, nothing, billing link or support ticket id
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
