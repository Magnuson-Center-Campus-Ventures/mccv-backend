import passport from 'passport';
import LocalStrategy from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({silent: true});

// Use this code snippet in your app. If you need more information about
// configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/ Load the AWS SDK
var AWS = require('aws-sdk'),
    region = "us-east-1",
    secretName = "backend-JWT-secret",
    secret,
    decodedBinarySecret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({region: region});

// In this sample we only handle the specific exceptions for the
// 'GetSecretValue' API. See
// https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.
const JWTsecret = (async () => {
    return await new Promise((resolve, reject) => {
        client.getSecretValue({
            SecretId: secretName
        }, function (err, data) {
            if (err) {
                console.log("Error when fetching AWS secret: ", err.code)
                reject(err.code)
            } else {
                // Decrypts secret using the associated KMS CMK. Depending on whether the secret
                // is a string or binary, one of these fields will be populated.
                if ('SecretString' in data) {
                    secret = data.SecretString;
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    decodedBinarySecret = buff.toString('ascii');
                    resolve(decodedBinarySecret)
                }
            }
        });
    })
})();

// mostly from lab5 options for local strategy, we'll use email AS the username
// not have separate ones
const localOptions = {
    usernameField: 'email'
};

// options for jwt strategy we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWTsecret || process.env.AUTH_SECRET
};
// NOTE: we are not calling this a bearer token (although it technically is), if
// you see people use Bearer in front of token on the internet you could either
// ignore it, use it but then you have to parse it out here as well as prepend
// it on the frontend. username + password authentication strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // Verify this email and password, call done with the user if it is the correct
    // email and password otherwise, call done with false eslint-disable-next-line
    // consistent-return
    User.findOne({
        email
    }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        // compare passwords - is `password` equal to user.password?
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                done(err);
            } else if (!isMatch) {
                done(null, false);
            } else {
                done(null, user);
            }
        });
    });
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // is called with confirmed jwt we just need to confirm that user exists See if
    // the user ID in the payload exists in our database If it does, call 'done'
    // with that user otherwise, call done without a user object
    User.findById(payload.sub, (err, user) => {
        if (err) {
            done(err, false);
        } else if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

export const requireAuth = passport.authenticate('jwt', {session: false});
export const requireSignin = passport.authenticate('local', {session: false});
