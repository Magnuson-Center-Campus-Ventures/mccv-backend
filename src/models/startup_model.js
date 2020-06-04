import mongoose, { Schema } from 'mongoose';

const StartupSchema = new Schema({
  user_id: String,
  name: String,
  contact_email: String,
  // industries: Array,
  industries: [{ type: Schema.Types.ObjectId, ref: 'Industry' }],
  description: String,
  video: String,
  // posts: Array,
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
