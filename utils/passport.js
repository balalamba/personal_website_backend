import bcrypt from 'bcrypt';
import passport from 'passport'
import {localStrategy} from 'passport-local'
const BCRYPT_SALT_ROUNDS = 10;
const jwtSecret = global.config.jwttoken;  
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret,
};

passport.use(new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey : jwtSecret,
  //we expect the user to send the token as a query parameter with the name 'secret_token'
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    //Pass the user details to the next middleware
    return done(null, token.email);
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message
    })
    done(e);
  }
}));