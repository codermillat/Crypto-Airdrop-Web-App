// Encryption utilities using TweetNaCl
import { box, randomBytes } from 'tweetnacl';
import { base64, utf8 } from './encoding';

export const generateNonce = () => randomBytes(box.nonceLength);

export const encrypt = (message: string, nonce: Uint8Array, publicKey: Uint8Array, secretKey: Uint8Array): string => {
  const messageUint8 = utf8.encode(message);
  const encrypted = box(messageUint8, nonce, publicKey, secretKey);
  return base64.encode(encrypted);
};

export const decrypt = (encryptedMessage: string, nonce: Uint8Array, publicKey: Uint8Array, secretKey: Uint8Array): string => {
  const messageUint8 = base64.decode(encryptedMessage);
  const decrypted = box.open(messageUint8, nonce, publicKey, secretKey);
  if (!decrypted) throw new Error('Failed to decrypt message');
  return utf8.decode(decrypted);
};