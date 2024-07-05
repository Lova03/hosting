const mongoose = require('mongoose');
const { Schema } = mongoose;

const vpsSubscriptionSchema = new Schema(
  {
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'VPSPlan', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    os: { type: String, enum: ['Ubuntu', 'CentOS', 'Debian'], default: 'Ubuntu' },
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ['Active', 'Expired', 'Suspended'], default: 'Active' },
    autoRenew: { type: Boolean, default: false },
    usageMetrics: {
      uptime: { type: Number, default: 0 }, // Hours of VPS uptime
      bandwidthUsed: { type: String, default: '0GB' }, // Bandwidth used
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VPSSubscription', vpsSubscriptionSchema);
