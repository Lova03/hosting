const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const SECRET_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const IV = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
const passport = require('passport');
const User = require('./models/user');
const DiscordStrategy = require('passport-discord').Strategy;
const { v4: uuidv4 } = require('uuid');

const scopes = ['identify', 'email'];
const prompt = 'consent';

// Encryption function
function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(SECRET_KEY), IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

// Decryption function
function decrypt(text) {
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(SECRET_KEY), IV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.API_BASE_URL}/auth/discord/callback`,
      scope: scopes,
      prompt: prompt,
    },
    async function (accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({ userid: profile.id });
      if (existingUser) {
        if (existingUser.avatar !== profile.avatar || existingUser.username !== profile.username) {
          await User.updateOne(
            { userid: profile.id },
            { $set: { username: profile.username, avatar: profile.avatar } }
          );
        }
        return done(null, existingUser);
      }
      const user = new User({
        id: uuidv4(),
        userid: profile.id,
        username: profile.username,
        avatar: profile.avatar,
        email: encrypt(profile.email),
      });
      await user.save();
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ id: id })
    .lean()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});
