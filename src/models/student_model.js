import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema({
  user_id: String,
  first_name: String,
  last_name: String,
  gender: String,
  bio: String,
  affiliation: String,
  phone_number: String,
  majors: Array,
  minors: Array,
  grad_year: String,
  interested_industries: [{ type: Schema.Types.ObjectId, ref: 'Industry' }],
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  work_exp: [{ type: Schema.Types.ObjectId, ref: 'WorkExperience' }],
  relevant_classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  other_exp: [{ type: Schema.Types.ObjectId, ref: 'OtherExperience' }],
  status: String,
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
