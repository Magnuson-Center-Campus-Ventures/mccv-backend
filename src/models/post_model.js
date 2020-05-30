import mongoose, { Schema } from 'mongoose';

// For companies' volunteer position postings
const PostSchema = new Schema({
  startup_id: { type: Schema.Types.ObjectId, ref: 'Startup' },
  title: String,
  description: String,
  industries: Array,
  required_skills: Array,
  preferred_skills: Array,
  responsibilities: Array,
  time_commitment: Number,
  desired_start_date: Date,
  desired_end_date: Date,
  desired_classes: Array,
  available_until: Date,
  status: String,
  applicants: Array,
  application_id: String,
  students_selected: Array,
  location: String,
  remote: Boolean,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
