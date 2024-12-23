export const validateTelegramId = (telegramId) => {
  if (!telegramId) return false;
  // Telegram IDs are large integers
  const id = parseInt(telegramId);
  return !isNaN(id) && id > 0;
};

export const validateUsername = (username) => {
  if (!username) return false;
  // Username should be 3-20 chars, alphanumeric and underscores only
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
};

export const validateWalletAddress = (address) => {
  if (!address) return false;
  // Basic TON address validation
  return /^[0-9A-Za-z_-]{48}$/.test(address);
};