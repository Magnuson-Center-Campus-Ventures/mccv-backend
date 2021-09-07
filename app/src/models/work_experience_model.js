import mongoose, { Schema } from 'mongoose';

const WorkExperienceSchema = new Schema({
  employer: String,
  role: String,
  city: String,
  state: String,
  start_date: Date,
  end_date: Date,
  currently_working: Boolean,
  description: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const WorkExperienceModel = mongoose.model('WorkExperience', WorkExperienceSchema);

export default WorkExperienceModel;
