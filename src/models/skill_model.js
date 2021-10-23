import mongoose, { Schema } from 'mongoose';

const SkillSchema = new Schema({
  name: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const SkillModel = mongoose.model('Skill', SkillSchema);

export default SkillModel;
