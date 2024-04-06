const mongoose = require('mongoose');
const { Schema } = mongoose;

const discordBotPlanSchema = new Schema(
  {
    serviceType: { type: String, default: 'Discord Bot Hosting' },
    planName: { type: String, unique: true, required: true },
    pricePerMonth: { type: Number, required: true },
    cpu: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    image: { type: String, default: null },
    defaultTypeValue: { type: String, default: 'Node.js' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DiscordBotPlan', discordBotPlanSchema);
