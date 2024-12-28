import { base64, utf8 } from './encoding';

export const encodeMessage = (message: string): string => {
  const messageUint8 = utf8.decode(message);
  return base64.encode(messageUint8);
};

export const decodeMessage = (encodedMessage: string): string => {
  const messageUint8 = base64.decode(encodedMessage);
  return utf8.encode(messageUint8);
};