// Add unique index for telegramId to ensure one account per Telegram user
const userSchema = new Schema({
  // ... existing fields ...
  telegramId: {
    type: String,
    required: true,
    unique: true,
    index: true
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

export default model('User', userSchema);