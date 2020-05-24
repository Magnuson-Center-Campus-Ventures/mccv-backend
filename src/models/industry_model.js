import mongoose, { Schema } from 'mongoose';

const IndustrySchema = new Schema({
  name: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const IndustryModel = mongoose.model('Industry', IndustrySchema);

export default IndustryModel;
