import mongoose, { Schema } from 'mongoose';

// For companies' volunteer position postings
const PostSchema = new Schema({
  startup_id: String,
  title: String,
  description: String,
  pending: Boolean,
  industry: String,
  required_skills: Array,
  preferred_skills: Array,
  time_commitment: Number,
  desired_start_date: Date,
  desired_end_date: Date,
  desired_classes: Array,
  available_until: Date,
  status: String,
  applicants: Array,
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
