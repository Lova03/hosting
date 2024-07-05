const passport = require('passport');
const User = require('./models/user');
const DiscordStrategy = require('passport-discord').Strategy;

const scopes = ['identify', 'email'];
const prompt = 'consent';

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
      try {
        const existingUser = await User.findOne({ discordId: profile.id });
        if (existingUser) {
          if (existingUser.avatar !== profile.avatar || existingUser.username !== profile.username) {
            await User.updateOne(
              { discordId: profile.id },
              { username: profile.username, avatar: profile.avatar }
            );
          }
          return done(null, existingUser);
        }
        const user = new User({
          discordId: profile.id,
          username: profile.username,
          avatar: profile.avatar,
          email: profile.email,
        });
        await user.save();
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        done(null, false);
      } else {
        done(null, user.toObject({ getters: true }));
      }
    })
    .catch((err) => {
      done(err, null);
    });
});
