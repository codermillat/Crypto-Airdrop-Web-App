// Base64 and UTF8 encoding utilities
import { encode as encodeBase64, decode as decodeBase64 } from '@stablelib/base64';
import { encode as encodeUTF8, decode as decodeUTF8 } from '@stablelib/utf8';

export const base64 = {
  encode: encodeBase64,
  decode: decodeBase64
};

export const utf8 = {
  encode: encodeUTF8,
  decode: decodeUTF8
};