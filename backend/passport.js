import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import user from "./models/user.js";
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const findUser = await user.findOne({ email: profile.emails[0].value });
      console.log(findUser);
      if (!findUser) {
        return done(null, null, { message: "User not found" });
      } else if (!findUser.verified) {
        return done(null, null, { message: "User is not verified" });
      }
      done(null, profile);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const findUser = await user.findOne({ email: profile.emails[0].value });
      console.log(findUser);
      if (!findUser) {
        return done(null, null);
      }
    done(null, profile);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})