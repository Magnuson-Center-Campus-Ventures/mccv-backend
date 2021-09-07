import mongoose, { Schema } from 'mongoose';

const OtherExperienceSchema = new Schema({
  name: String,
  description: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const OtherExperienceModel = mongoose.model('OtherExperience', OtherExperienceSchema);

export default OtherExperienceModel;
