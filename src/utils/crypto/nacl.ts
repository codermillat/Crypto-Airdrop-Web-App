import { box, randomBytes } from 'tweetnacl';
import { base64, utf8 } from './encoding';

export const crypto = {
  encode: base64.encode,
  decode: base64.decode,
  encodeText: utf8.encode,
  decodeText: utf8.decode,
  box,
  randomBytes
};

export const generateNonce = () => randomBytes(box.nonceLength);