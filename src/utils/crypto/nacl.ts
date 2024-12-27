import { box, randomBytes } from 'tweetnacl';
import { decodeUTF8, encodeBase64, decodeBase64 } from 'tweetnacl-util';

export const generateKeyPair = () => box.keyPair();

export const encrypt = (message: string, publicKey: Uint8Array): string => {
  const ephemeralKeyPair = box.keyPair();
  const nonce = randomBytes(box.nonceLength);
  const messageUint8 = decodeUTF8(message);
  
  const encryptedMessage = box(
    messageUint8,
    nonce,
    publicKey,
    ephemeralKeyPair.secretKey
  );

  const fullMessage = new Uint8Array(nonce.length + encryptedMessage.length);
  fullMessage.set(nonce);
  fullMessage.set(encryptedMessage, nonce.length);

  return encodeBase64(fullMessage);
};

export const decrypt = (messageWithNonce: string, secretKey: Uint8Array): string => {
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    box.nonceLength,
    messageWithNonce.length
  );

  const decrypted = box.open(message, nonce, publicKey, secretKey);
  if (!decrypted) {
    throw new Error('Failed to decrypt message');
  }

  return encodeUTF8(decrypted);
};