import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema({
  user_id: String,
  first_name: String,
  last_name: String,
  phone_number: String,
  majors: Array,
  minors: Array,
  grad_year: String,
  interested_industries: Array,
  skills: Object,
  work_exp: Array,
  relevant_classes: Array,
  other_exp: Array,
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
