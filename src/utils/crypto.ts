import { encodeBase64, decodeBase64, encodeUTF8, decodeUTF8 } from 'tweetnacl-util';
import { box, randomBytes } from 'tweetnacl';

export const crypto = {
  encodeBase64,
  decodeBase64,
  encodeUTF8,
  decodeUTF8,
  box,
  randomBytes
};

export const generateNonce = () => randomBytes(box.nonceLength);

export const encodeMessage = (message: string): string => {
  const messageUint8 = decodeUTF8(message);
  return encodeBase64(messageUint8);
};

export const decodeMessage = (encodedMessage: string): string => {
  const messageUint8 = decodeBase64(encodedMessage);
  return encodeUTF8(messageUint8);
};