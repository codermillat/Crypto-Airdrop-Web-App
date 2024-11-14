import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  reward: {
    type: Number,
    required: true,
  },
  icon: String,
  type: {
    type: String,
    enum: ['limited', 'in-game', 'partners'],
    default: 'limited',
  },
  requirements: [{
    type: String,
  }],
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Task', taskSchema);