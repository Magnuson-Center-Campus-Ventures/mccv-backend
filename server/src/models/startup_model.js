import mongoose, { Schema } from 'mongoose';

const StartupSchema = new Schema({
  user_id: String,
  logo: String,
  name: String,
  contact_email: String,
  founder_gender: String,
  affiliation: String,
  industries: [{ type: Schema.Types.ObjectId, ref: 'Industry' }],
  description: String,
  video: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  status: String,
  city: String,
  state: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const StartupModel = mongoose.model('Startup', StartupSchema);

export default StartupModel;
