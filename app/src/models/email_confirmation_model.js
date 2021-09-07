import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const EmailConfirmationSchema = new Schema({
  email: String,
  password: String,
  role: String,
  student_profile_id: String,
  startup_id: String,
  token: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});
// eslint-disable-next-line consistent-return
EmailConfirmationSchema.pre('save', function beforeUserSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const saltRounds = 10;
  // help from https://www.npmjs.com/package/bcrypt
  // eslint-disable-next-line prefer-arrow-callback
  bcrypt.hash(user.password, saltRounds, function errorHash(error, hash) {
    if (error) return next(error);
    // Store hash in your password DB.
    user.password = hash;
    return next();
  });
});
EmailConfirmationSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;
  // return callback(null, comparisonResult) for success, or callback(error) in the error case
  // help from: https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  // eslint-disable-next-line prefer-arrow-callback
  bcrypt.compare(candidatePassword, user.password, function errorComparison(error, comparisonResult) {
    if (error) return callback(error);
    return callback(null, comparisonResult);
  });
};
const EmailConfirmationModel = mongoose.model('EmailConfirmation', EmailConfirmationSchema);

export default EmailConfirmationModel;
