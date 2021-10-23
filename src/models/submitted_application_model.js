import mongoose, { Schema } from 'mongoose';

const SubmittedApplicationSchema = new Schema({
  post_id: String,
  student_id: String,
  questions: Array, 
  answers: Array,
  status: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const SubmittedApplicationModel = mongoose.model('SubmittedApplication', SubmittedApplicationSchema);

export default SubmittedApplicationModel;
