const mongoose = require('mongoose');
const { decrypt, encrypt } = require('../helpers/encryption');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    discordId: { type: String, unique: true, required: true },
    id: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    fullName: { type: String, default: '', get: decrypt, set: encrypt },
    contactNumber: { type: String, default: '', get: decrypt, set: encrypt },
    billingAddress: { type: String, default: '', get: decrypt, set: encrypt },
    email: { type: String, unique: true, get: decrypt, set: encrypt },
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
  { timestamps: true, toObject: { getters: true }, toJSON: { getters: true } }
);

module.exports = mongoose.model('User', userSchema);
