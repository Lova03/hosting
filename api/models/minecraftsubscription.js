const mongoose = require('mongoose');
const { Schema } = mongoose;

const minecraftSubscriptionSchema = new Schema(
  {
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'MinecraftPlan', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serverType: {
      type: String,
      enum: ['Vanilla', 'Forge', 'Paper', 'Bukkit', 'Spigot'],
      default: 'Vanilla',
    },
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ['Active', 'Expired', 'Suspended'], default: 'Active' },
    autoRenew: { type: Boolean, default: false },
    usageMetrics: {
      uptime: { type: Number, default: 0 }, // Hours of server uptime
      playerPeak: { type: Number, default: 0 }, // Peak number of players
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MinecraftSubscription', minecraftSubscriptionSchema);
