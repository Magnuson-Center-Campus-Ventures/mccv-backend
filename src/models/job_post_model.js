import mongoose, { Schema } from 'mongoose';

const JobPostSchema = new Schema({
  startup_id: String,
  title: String,
  description: String,
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

const JobPostModel = mongoose.model('JobPost', JobPostSchema);

export default JobPostModel;
