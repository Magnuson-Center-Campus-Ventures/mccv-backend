import mongoose, { Schema } from 'mongoose';

const StartupSchema = new Schema({
  user_id: String,
  name: String,
  contact_email: String,
  industry: Array,
  description: String,
  posts: Array,
  status: String,
  location: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const StartupModel = mongoose.model('Startup', StartupSchema);

export default StartupModel;
