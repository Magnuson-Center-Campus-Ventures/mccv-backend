import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema({
  user_id: Array,
  first_name: String,
  last_name: String,
  majors: Array,
  minors: Array,
  grad_year: String,
  interested_industries: Array,
  skills: {
    type: Map,
    of: Number,
  },
  work_experiences: Array,
  relevant_classes: Array,
  personal_projects: Array,
  desired_start_date: Date,
  desired_end_date: Date,
  time_commitment: Number,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const StudentModel = mongoose.model('Student', StudentSchema);

export default StudentModel;