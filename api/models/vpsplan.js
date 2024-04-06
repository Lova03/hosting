const mongoose = require('mongoose');
const { Schema } = mongoose;

const vpsPlanSchema = new Schema(
  {
    serviceType: { type: String, default: 'VPS Hosting' },
    planName: { type: String, unique: true, required: true },
    pricePerMonth: { type: Number, required: true },
    cpu: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    image: { type: String, default: null },
    bandwidth: { type: String },
    defaultTypeValue: { type: String, default: 'Ubuntu' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VPSPlan', vpsPlanSchema);
