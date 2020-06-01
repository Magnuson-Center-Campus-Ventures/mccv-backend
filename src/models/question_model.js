import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  question: String,
  application_id: String,
  status: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;
