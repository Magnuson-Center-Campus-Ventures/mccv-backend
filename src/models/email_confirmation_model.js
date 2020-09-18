import mongoose, { Schema } from 'mongoose';

const EmailConfirmationSchema = new Schema({
  email: String,
  token: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const EmailConfirmationModel = mongoose.model('EmailConfirmation', EmailConfirmationSchema);

export default EmailConfirmationModel;
