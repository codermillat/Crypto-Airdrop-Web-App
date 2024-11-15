import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  reward: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    enum: ['onboarding', 'social', 'defi', 'daily'],
    required: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  completionCount: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

taskSchema.index({ type: 1, isActive: 1 });
taskSchema.index({ completionCount: -1 });

export default model('Task', taskSchema);