import mongoose, { Schema } from 'mongoose';

const StartupUserSchema = new Schema({
  user_id: String,
  first_name: String,
  last_name: String,
  role: String,
  startup_id: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const StartupUserModel = mongoose.model('StartupUser', StartupUserSchema);

export default StartupUserModel;
