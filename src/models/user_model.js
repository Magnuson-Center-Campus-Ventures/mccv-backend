import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  password: String,
  role: String,
  student_profile_id: String,
  startup_id: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;