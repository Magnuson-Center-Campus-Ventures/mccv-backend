/* eslint-disable camelcase */
import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import User from '../models/user_model';
import Student from '../models/student_model';
import Startup from '../models/startup_model';
import EmailConfirmation from '../models/email_confirmation_model';

dotenv.config({ silent: true });

// create token for email
export const createToken = (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const { role } = req.body;

  // check for fields
  if (!email) {
    res.status(422).send('You must provide email');
  }
  if (!password) {
    res.status(422).send('You must provide password');
  }
  if (!role) {
    res.status(422).send('You must provide role');
  }

  // generate token that contains created date and email
  const confirmation = new EmailConfirmation();
  // confirmation.email = email;
  // confirmation.password = password; // save this as a hash
  // confirmation.role = role;
  const timestamp = new Date().getTime();
  confirmation.token = jwt.encode({
    email,
    password,
    role,
    iat: timestamp,
  }, process.env.AUTH_SECRET);
  confirmation.save();
  sendConfirmationEmail(email, confirmation.token);
  res.status(200).send('Success');
};

// from https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
function sendConfirmationEmail(email, token) {
  console.log(token);
  const url = 'http://dartmouth-mccv.surge.sh/emailconfirmation/?token='.concat(token);
  // const url = 'http://localhost:8080/emailconfirmation/?token='.concat(token);
  // Load the AWS SDK for Node.js
  // eslint-disable-next-line global-require
  const AWS = require('aws-sdk');
  // Set the region
  AWS.config.update({ region: 'us-east-1' });

  // Create sendEmail params
  const params = {
    Destination: { /* required */
      ToAddresses: [
        email,
      ],
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Charset: 'UTF-8',
          Data: 'We received a request to signup for the Magnuson Center Campus Ventures web application with your email address.<br/><br/>Click the link below in the next hour to signup:<br/><br/>'.concat(url).concat('<br/><br/>If you did not attempt to signup, please ignore this email or contact support if you have any questions.<br/><br/>Thanks,<br/>The Magnuson Center Campus Ventures Team'),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Email Confirmation for Magnuson Center Campus Ventures',
      },
    },
    Source: 'magnuson.center.campus.ventures@dartmouth.edu', /* required */
  };

  // Create the promise and SES service object
  const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    (data) => {
      console.log(data.MessageId);
    },
  ).catch(
    (err) => {
      console.error(err);
    },
  );
}

// once link generated above is clicked, calls this function
export const confirmSignUp = (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(422).send('Token is empty');
  }

  const decoded = jwt.decode(token, process.env.AUTH_SECRET);
  const { email } = decoded;
  const { password } = decoded;
  const { role } = decoded;
  const { iat } = decoded;
  const timestamp = new Date().getTime();

  if (timestamp - 3600000 < iat) {
    User.findOne({ email })
      .then((foundUser) => {
        if (foundUser) { // if the user exists, then return error
          res.status(422).send('User with this email already exists');
        } else {
        // if user doesn't exist, then create user
          const user = new User();
          user.email = email;
          user.password = password;
          user.role = role;
          user.student_profile_id = '';
          user.startup_id = '';
          user.signed = new Date().getTime();

          // depending on role, create appropriate profiles
          if (user.role === 'student') { // if user role is student, save user
            const student = new Student();
            user.save().then((result) => {
              res.send({ token: tokenForUser(result), user });
            }).then((result2) => { // if saved user, save a student with user_id prefilled
              student.user_id = user._id;
              student.status = 'Approved';
              student.save().then((result3) => {
              // if saved student, update previously created user with student_profile_od
                user.student_profile_id = student._id;
                User.findByIdAndUpdate(user._id, user, { new: true }).then((result4) => {
                }).catch((error) => { // error updating user
                  res.status(500).json({ error });
                });
              }).catch((error) => { // error saving student
                res.status(500).json({ error });
              });
            }).catch((error) => { // error saving user
              res.status(500).json({ error });
            });
          } else if (user.role === 'startup') { // if user role is startup, save user
            const startup = new Startup();
            user.save().then((result) => {
              res.send({ token: tokenForUser(result), user });
            }).then((result2) => { // if saved user, save a startup with user_id and status prefilled
              startup.user_id = user._id;
              startup.status = 'Pending';
              startup.save().then((result3) => {
              // if saved startup, update previously created user with startup_id
                user.startup_id = startup._id;
                User.findByIdAndUpdate(user._id, user, { new: true }).then((result4) => {
                }).catch((error) => { // error updating user
                  res.status(500).json({ error });
                });
              }).catch((error) => { // error saving student
                res.status(500).json({ error });
              });
            }).catch((error) => { // error saving user
              res.status(500).json({ error });
            });
          }
        }
      }).catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    res.status(409).send('Token timed out');
  }
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
