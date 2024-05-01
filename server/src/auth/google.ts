// this is example for google login

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//   clientID: 'YOUR_GOOGLE_CLIENT_ID',
//   clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
//   callbackURL: 'YOUR_CALLBACK_URL',
// },
// (accessToken, refreshToken, profile, done) => {
//   // Check if the user with this Google ID already exists in your MongoDB
//   User.findOne({ googleId: profile.id }, (err, user) => {
//     if (err) {
//       return done(err);
//     }

//     if (!user) {
//       // If the user doesn't exist, create a new one
//       const newUser = new User({
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         googleId: profile.id,
//         // Add any additional fields you want to save from the Google profile
//       });

//       newUser.save((err) => {
//         if (err) {
//           return done(err);
//         }
//         return done(null, newUser);
//       });
//     } else {
//       // If the user already exists, log them in
//       return done(null, user);
//     }
//   });
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });
