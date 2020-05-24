import mongoose, { Schema } from 'mongoose';

const ClassSchema = new Schema({
  name: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const ClassModel = mongoose.model('Class', ClassSchema);

export default ClassModel;
