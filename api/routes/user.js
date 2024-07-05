const userRouter = require('express').Router();
const User = require('../models/user');
const PaymentCard = require('../models/paymentcard');
const Article = require('../models/article');
const DiscordBotSubscription = require('../models/discordBotSubscription');
const MinecraftSubscription = require('../models/minecraftSubscription');
const VPSSubscription = require('../models/vpsSubscription');
const checkAuth = require('../helpers/verify');

// Get user settings
userRouter.get('/settings', checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }
    res.status(200).json({
      success: true,
      settings: {
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        billingAddress: user.billingAddress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user settings.',
    });
  }
});

// Update user settings
userRouter.put('/settings', checkAuth, async (req, res) => {
  const { firstName, lastName, contactNumber, billingAddress } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName,
        lastName,
        contactNumber,
        billingAddress,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User settings updated successfully.',
      settings: {
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        billingAddress: user.billingAddress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user settings.',
    });
  }
});

// Get all payment cards for a user
userRouter.get('/payment-cards', checkAuth, async (req, res) => {
  try {
    const cards = await PaymentCard.find({ userId: req.user._id }).select('-cardNumber');
    res.json({ success: true, cards });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve payment cards.' });
  }
});

// Add a payment card
userRouter.post('/payment-cards', checkAuth, async (req, res) => {
  const { cardNumber, expirationDate, cardholderName, brand, isDefault } = req.body;
  try {
    const newCard = new PaymentCard({
      userId: req.user._id,
      cardNumber,
      expirationDate,
      cardholderName,
      brand,
      isDefault,
    });
    await newCard.save();
    res
      .status(201)
      .json({ success: true, message: 'Card added successfully.', card: newCard.lastFourDigits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add the card.' });
  }
});

// Edit a payment card
userRouter.put('/payment-cards/:id', checkAuth, async (req, res) => {
  const { cardNumber, expirationDate, cardholderName, brand, isDefault } = req.body;
  try {
    const card = await PaymentCard.findByIdAndUpdate(
      req.params.id,
      { cardNumber, expirationDate, cardholderName, brand, isDefault },
      { new: true }
    );
    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found.' });
    }
    res.json({ success: true, message: 'Card updated successfully.', card: card.lastFourDigits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update the card.' });
  }
});

// Delete a payment card
userRouter.delete('/payment-cards/:id', async (req, res) => {
  try {
    const card = await PaymentCard.findByIdAndRemove(req.params.id);
    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found.' });
    }
    res.json({ success: true, message: 'Card deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete the card.' });
  }
});

userRouter.delete('/delete', checkAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Remove user's payment cards
    await PaymentCard.deleteMany({ userId });

    // Remove user's subscriptions
    await DiscordBotSubscription.deleteMany({ userId });
    await MinecraftSubscription.deleteMany({ userId });
    await VPSSubscription.deleteMany({ userId });

    // Remove the user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, message: 'User account and related data deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete user account.' });
  }
});

userRouter.get('/my-articles', checkAuth, async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: articles });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: 'Failed to fetch articles', error: error.message });
  }
});

module.exports = userRouter;
