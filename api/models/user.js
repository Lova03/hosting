const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userid: { type: String, unique: true, required: true },
    id: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
    balance: { type: Number, default: 0.0 },
    xp: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ['Admin', 'Customer', 'Helper', 'Influencer'],
      default: 'Customer',
    },
    services: {
      minecraft: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MinecraftSubscription' }],
      discordBot: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscordBotSubscription' }],
      vps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VPSSubscription' }],
    },
    avatar: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
