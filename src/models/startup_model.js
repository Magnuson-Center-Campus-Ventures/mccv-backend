import mongoose, { Schema } from 'mongoose';

const StartupSchema = new Schema({
  user_ids: Array,
  name: String,
  industry: String,
  description: String,
  job_posts: Array,
  status: String,
  location: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const StartupModel = mongoose.model('Startup', StartupSchema);

export default StartupModel;
