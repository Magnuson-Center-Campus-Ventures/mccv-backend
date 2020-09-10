import mongoose, { Schema } from 'mongoose';

// For companies' volunteer position postings
const PostSchema = new Schema({
  startup_id: { type: Schema.Types.ObjectId, ref: 'Startup' },
  title: String,
  description: String,
  industries: [{ type: Schema.Types.ObjectId, ref: 'Industry' }],
  required_skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  preferred_skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  responsibilities: Array,
  time_commitment: Number,
  desired_start_date: Date,
  desired_end_date: Date,
  desired_classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  available_until: Date,
  status: String,
  applicants: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  application_id: String,
  students_selected: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  city: String,
  state: String,
  virtual: Boolean,
  inperson: Boolean,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
