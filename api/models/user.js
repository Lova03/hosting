const mongoose = require('mongoose');
const { decrypt, encrypt } = require('../helpers/encryption');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema(
  {
    discordId: { type: String, unique: true, required: true },
    id: { type: String, unique: true, required: true, default: uuidv4 },
    username: { type: String, required: true },
    firstName: { type: String, default: '', get: decrypt, set: encrypt },
    lastName: { type: String, default: '', get: decrypt, set: encrypt },
    contactNumber: { type: String, default: '', get: decrypt, set: encrypt },
    billingAddress: { type: String, default: '', get: decrypt, set: encrypt },
    email: { type: String, unique: true, get: decrypt, set: encrypt },
    isAdmin: { type: Boolean, default: false },
    isContributor: { type: Boolean, default: false },
    balance: { type: Number, default: 0.0 },
    xp: { type: Number, default: 0 },
    role: {
      type: String,
      enum: ['Admin', 'Customer', 'Helper', 'Influencer'],
      default: 'Customer',
    },
    services: {
      minecraft: [{ type: ObjectId, ref: 'MinecraftSubscription' }],
      discordBot: [{ type: ObjectId, ref: 'DiscordBotSubscription' }],
      vps: [{ type: ObjectId, ref: 'VPSSubscription' }],
    },
    avatar: { type: String, default: null },
    comments: [{ type: ObjectId, ref: 'Comment' }],
    articles: [{ type: ObjectId, ref: 'Article' }],
    favourites: [{ type: ObjectId, ref: 'Article' }],
  },
  { timestamps: true, toObject: { getters: true }, toJSON: { getters: true } }
);

module.exports = mongoose.model('User', userSchema);
