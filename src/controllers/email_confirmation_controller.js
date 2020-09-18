import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import User from '../models/user_model';
import EmailConfirmation from '../models/email_confirmation_model';

dotenv.config({ silent: true });

// create token for email
export const createToken = (req, res) => {
  const { email } = req.body;

  // check for email field
  if (!email) {
    res.status(406).send('You must provide email');
  }

  // find email in db
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(404).send('(Not found)');
      } else {
        // generate token that contains created date and email
        const reset = new EmailConfirmation();
        reset.email = email;
        const timestamp = new Date().getTime();
        reset.token = jwt.encode({ sub: email, iat: timestamp }, process.env.AUTH_SECRET);
        console.log('reset:', reset);
        reset.save();
        sendResetEmail(reset.email, reset.token);
        res.send('Success');
      }
    }).catch((error) => {
      res.status(500).json({ error });
    });
};

// once link generated above is clicked, calls this function
export const confirmEmail = (req, res) => {
  const { token } = req.body;
  const { password } = req.body;

  if (!token || !password) {
    res.status(406).send('Either password or token is empty');
  }

  const decoded = jwt.decode(token, process.env.AUTH_SECRET);
  const email = decoded.sub;
  const { iat } = decoded;

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        const timestamp = new Date().getTime();
        if (timestamp - 111600000 < iat) {
          const saltRounds = 10;
          // help from https://www.npmjs.com/package/bcrypt
          // eslint-disable-next-line prefer-arrow-callback
          bcrypt.hash(password, saltRounds, function errorHash(error, hash) {
            // Store hash in your password DB.
            User.findOneAndUpdate(
              { email },
              { password: hash },
            ).then((a) => { a.save(); });
          });
          res.send('Success');
        } else {
          res.status(409).send('Invalid token');
        }
      } else {
        res.status(409).send('Invalid token');
      }
    }).catch((error) => {
      res.status(500).json({ error });
    });
};

// from https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
function sendResetEmail(email, token) {
  // const url = 'http://cs52-mcv.surge.sh/resetpassword/?token='.concat(token);
  const url = 'http://localhost:8080/resetpassword/?token='.concat(token);
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
          Data: 'We received a request to signup for the Magnuson Center Campus Ventures web application with your email address.<br/><br/>Click the link below in the next 10 minutes to signup:<br/><br/>'.concat(url).concat('<br/><br/>If you do not the use Magnuson Center Campus Ventures web application or did not attempt to signup, please ignore this email or contact support if you have questions.<br/><br/>Thanks,<br/>The Magnuson Center Campus Ventures Team'),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Email Confirmation for MCCV account',
      },
    },
    Source: 'no.reply.mccv@gmail.com', /* required */
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
      console.error(err, err.stack);
    },
  );
}
