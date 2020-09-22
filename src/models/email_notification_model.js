import mongoose, { Schema } from 'mongoose';

const EmailNotificationSchema = new Schema({
  user_id: String,
  type: String,
  info: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const EmailNotificationModel = mongoose.model('EmailNotification', EmailNotificationSchema);

export default EmailNotificationModel;
