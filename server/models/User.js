import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  telegramId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  completedTasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  referralCode: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  referredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  referralCount: {
    type: Number,
    default: 0
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add pre-save hook to check for existing Telegram ID
userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingUser = await this.constructor.findOne({ telegramId: this.telegramId });
    if (existingUser) {
      next(new Error('This Telegram account is already registered'));
    }
  }
  next();
});

// Add indexes for performance
userSchema.index({ points: -1 });
userSchema.index({ telegramId: 1 }, { unique: true });
userSchema.index({ referralCode: 1 }, { unique: true });

export default model('User', userSchema);