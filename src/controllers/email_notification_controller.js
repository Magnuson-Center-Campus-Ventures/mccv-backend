import dotenv from 'dotenv';
import User from '../models/user_model';
import EmailNotification from '../models/email_notification_model';

dotenv.config({ silent: true });

const sendEmailNotification = (req, res) => {
  const { email } = req.body;
  const { type } = req.body;
  const { info } = req.body;

  // check fields
  if (!email) {
    res.status(406).send('You must provide email');
  }
  if (!type) {
    res.status(406).send('You must provide type');
  }

  // find email in db
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(404).send('(Not found)');
      } else {
        // generate token that contains created date and email
        const notification = new EmailNotification();
        notification.email = email;
        notification.type = type;
        notification.info = info;
        notification.save();
        sendEmail(notification.email, notification.type, notification.info);
        res.send('Success');
      }
    }).catch((error) => {
      res.status(500).json({ error });
    });
};

// from https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
function sendEmail(email, type, info) {
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
          Data: '',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: '',
      },
    },
    Source: 'no.reply.mccv@gmail.com', /* required */
  };

  switch (type) {
    case 'startup approve':
      params.Message.Body.Html.Data = 'Your Startup has been approved!<br/><br/>Your startup and volunteer positions will now be available to students<br/><br/>Thanks,<br/>The Magnuson Center Campus Ventures Team';
      params.Message.Subject.Data = 'Magnuson Center Campus Ventures: Startup Approved';
      break;
    case 'startup denial':
      params.Message.Body.Html.Data = '';
      params.Message.Subject.Data = 'Magnuson Center Campus Ventures: Startup Denied';
      break;
    case 'post approve':
      params.Message.Body.Html.Data = '';
      params.Message.Subject.Data = '';
      break;
    case 'application accept':
      params.Message.Body.Html.Data = '';
      params.Message.Subject.Data = '';
      break;
    case 'application deny':
      params.Message.Body.Html.Data = '';
      params.Message.Subject.Data = '';
      break;
    default:
      return false;
  }

  // Create the promise and SES service object
  const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    (data) => {
      return (true);
      // console.log(data.MessageId);
    },
  ).catch(
    (err) => {
      return (false);
      // console.error(err, err.stack);
    },
  );
  return (false);
}

export default sendEmailNotification;
