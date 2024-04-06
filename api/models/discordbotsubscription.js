const discordBotSubscriptionSchema = new Schema(
  {
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'DiscordBotPlan', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    botLanguage: { type: String, enum: ['Node.js', 'Python'], default: 'Node.js' },
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ['Active', 'Expired', 'Suspended'], default: 'Active' },
    autoRenew: { type: Boolean, default: false },
    usageMetrics: {
      uptime: { type: Number, default: 0 }, // Hours of bot uptime
      commandsProcessed: { type: Number, default: 0 }, // Number of commands processed
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DiscordBotSubscription', discordBotSubscriptionSchema);
