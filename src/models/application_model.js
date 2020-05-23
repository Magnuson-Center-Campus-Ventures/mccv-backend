import mongoose, { Schema } from 'mongoose';

const ApplicationSchema = new Schema({
  post_id: String,
  questions: Object,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const ApplicationModel = mongoose.model('Application', ApplicationSchema);

export default ApplicationModel;
