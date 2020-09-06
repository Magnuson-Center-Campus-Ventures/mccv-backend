import mongoose, { Schema } from 'mongoose';

const PasswordResetSchema = new Schema({
  email: String,
  token: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const PasswordResetModel = mongoose.model('PasswordReset', PasswordResetSchema);

export default PasswordResetModel;
