import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    sparse: true
  },
  points: {
    type: Number,
    default: 0,
  },
  completedTasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  referralCode: {
    type: String,
    required: true,
    unique: true
  },
  referredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  referralCount: {
    type: Number,
    default: 0,
  },
  isRegistered: {
    type: Boolean,
    default: false
  },
  lastDailyReward: Date,
  claimedCommunityReward: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('User', userSchema);