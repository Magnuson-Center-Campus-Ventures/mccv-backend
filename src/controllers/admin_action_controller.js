//import MailComposer from "nodemailer/lib/mail-composer";
import Student from '../models/student_model';
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-east-1' });
export const massEmail = (req, res) => {
    // using MailComposer to make raw MIME data to allow for attachments
    // let mailOptions = {
    //     from: 'magnuson.center.campus.ventures@dartmouth.edu',
    //     sender: 'magnuson.center.campus.ventures@dartmouth.edu',
    //     subject: req.body.email_heading,
    //     html: req.body.email_body,
    //     //attachments: req.body.file_attachments.map((attach =>{ return {...attach, content: new Buffer(attach,'utf-8')}}))
    // }
    let params = {
        Message: { 
          Body: { 
            Html: {
              Charset: 'UTF-8',
              Data: req.body.email_body,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: req.body.email_heading,
          },
        },
        Source: 'magnuson.center.campus.ventures@dartmouth.edu', /* required */
      };
    let sendPromises=[];
    for (let i =0;i<req.body.target_users.length;i+=50) {
        //mailOptions.bcc=req.body.target_users.slice(i, i+50)
        params.Destination={
            BccAddresses: req.body.target_users.slice(i,i+50)
        }
        sendPromises.push(new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise());

        // new MailComposer(mailOptions).compile().build((err, message)=>{
        //     console.log(err)
        //     console.log(message)
        //     let sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendRawEmail({
        //         RawMessage:{Data:message}
        //     }, (err, sesdata, resp) => {
        //         console.log(resp)
        //     })
        // })
    }
    Promise.all(sendPromises).then((data)=>{
        console.log(req.body.target_users.length+" emails sent.")
        res.send('Success');
    }).catch((err)=>{
        res.status(500).json({ err });
    })
}
export const broadcastBanner = (req, res) => {

}
export const massArchive = (req,res) => {
    req.body.target_users.forEach((user)=>{
        user.status="Archived"
        if (user.user_data.role=="startup") {
            Startup.findByIdAndUpdate(user.id, user, { new: true })
                .populate('posts')
                .populate('industries')
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
        }
        else if (user.user_data.role=="student") {
            Student.findByIdAndUpdate(user.id, user, { new: true })
            .populate('relevant_classes')
            .populate('interested_industries')
            .populate('skills')
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
        }
    })
}