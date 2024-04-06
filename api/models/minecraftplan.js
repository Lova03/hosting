const mongoose = require('mongoose');
const { Schema } = mongoose;

const minecraftPlanSchema = new Schema(
  {
    serviceType: { type: String, default: 'Minecraft Hosting' },
    planName: { type: String, unique: true, required: true },
    pricePerMonth: { type: Number, required: true },
    cpu: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    image: { type: String, default: null },
    maxPlayers: { type: Number },
    defaultTypeValue: { type: String, default: 'Vanilla' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model('MinecraftPlan', minecraftPlanSchema);
