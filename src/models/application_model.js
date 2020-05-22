import mongoose, { Schema } from 'mongoose';

const ApplicationSchema = new Schema({
  post_id: String,
  quesions: Object,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const ApplicationModel = mongoose.model('Application', ApplicationSchema);

export default ApplicationModel;
