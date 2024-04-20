const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../helpers/encryption');

const paymentCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      set: encrypt,
      get: decrypt,
    },
    expirationDate: {
      type: String,
      required: true,
      set: encrypt,
      get: decrypt,
    },
    cardholderName: {
      type: String,
      required: true,
      set: encrypt,
      get: decrypt,
    },
    brand: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
  }
);

paymentCardSchema.virtual('lastFourDigits').get(function () {
  const decryptedCardNumber = decrypt(this.cardNumber);
  return decryptedCardNumber.slice(-4);
});

module.exports = mongoose.model('PaymentCard', paymentCardSchema);
