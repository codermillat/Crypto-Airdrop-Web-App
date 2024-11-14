import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  completedTasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  referralCode: String,
  referredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  referralCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('User', userSchema);