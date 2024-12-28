import {
  require_crypto
} from "./chunk-VNASIH7Q.js";
import {
  require_react
} from "./chunk-QTVD6AVW.js";
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-PR4QN5HX.js";

// node_modules/tweetnacl-util/nacl-util.js
var require_nacl_util = __commonJS({
  "node_modules/tweetnacl-util/nacl-util.js"(exports, module) {
    (function(root, f) {
      "use strict";
      if (typeof module !== "undefined" && module.exports) module.exports = f();
      else if (root.nacl) root.nacl.util = f();
      else {
        root.nacl = {};
        root.nacl.util = f();
      }
    })(exports, function() {
      "use strict";
      var util = {};
      function validateBase64(s2) {
        if (!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(s2)) {
          throw new TypeError("invalid encoding");
        }
      }
      util.decodeUTF8 = function(s2) {
        if (typeof s2 !== "string") throw new TypeError("expected string");
        var i2, d = unescape(encodeURIComponent(s2)), b = new Uint8Array(d.length);
        for (i2 = 0; i2 < d.length; i2++) b[i2] = d.charCodeAt(i2);
        return b;
      };
      util.encodeUTF8 = function(arr) {
        var i2, s2 = [];
        for (i2 = 0; i2 < arr.length; i2++) s2.push(String.fromCharCode(arr[i2]));
        return decodeURIComponent(escape(s2.join("")));
      };
      if (typeof atob === "undefined") {
        if (typeof Buffer.from !== "undefined") {
          util.encodeBase64 = function(arr) {
            return Buffer.from(arr).toString("base64");
          };
          util.decodeBase64 = function(s2) {
            validateBase64(s2);
            return new Uint8Array(Array.prototype.slice.call(Buffer.from(s2, "base64"), 0));
          };
        } else {
          util.encodeBase64 = function(arr) {
            return new Buffer(arr).toString("base64");
          };
          util.decodeBase64 = function(s2) {
            validateBase64(s2);
            return new Uint8Array(Array.prototype.slice.call(new Buffer(s2, "base64"), 0));
          };
        }
      } else {
        util.encodeBase64 = function(arr) {
          var i2, s2 = [], len = arr.length;
          for (i2 = 0; i2 < len; i2++) s2.push(String.fromCharCode(arr[i2]));
          return btoa(s2.join(""));
        };
        util.decodeBase64 = function(s2) {
          validateBase64(s2);
          var i2, d = atob(s2), b = new Uint8Array(d.length);
          for (i2 = 0; i2 < d.length; i2++) b[i2] = d.charCodeAt(i2);
          return b;
        };
      }
      return util;
    });
  }
});

// node_modules/tweetnacl/nacl-fast.js
var require_nacl_fast = __commonJS({
  "node_modules/tweetnacl/nacl-fast.js"(exports, module) {
    (function(nacl2) {
      "use strict";
      var gf = function(init) {
        var i2, r = new Float64Array(16);
        if (init) for (i2 = 0; i2 < init.length; i2++) r[i2] = init[i2];
        return r;
      };
      var randombytes = function() {
        throw new Error("no PRNG");
      };
      var _0 = new Uint8Array(16);
      var _9 = new Uint8Array(32);
      _9[0] = 9;
      var gf0 = gf(), gf1 = gf([1]), _121665 = gf([56129, 1]), D = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), D2 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), X = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), Y = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), I = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
      function ts64(x, i2, h2, l2) {
        x[i2] = h2 >> 24 & 255;
        x[i2 + 1] = h2 >> 16 & 255;
        x[i2 + 2] = h2 >> 8 & 255;
        x[i2 + 3] = h2 & 255;
        x[i2 + 4] = l2 >> 24 & 255;
        x[i2 + 5] = l2 >> 16 & 255;
        x[i2 + 6] = l2 >> 8 & 255;
        x[i2 + 7] = l2 & 255;
      }
      function vn(x, xi, y, yi, n2) {
        var i2, d = 0;
        for (i2 = 0; i2 < n2; i2++) d |= x[xi + i2] ^ y[yi + i2];
        return (1 & d - 1 >>> 8) - 1;
      }
      function crypto_verify_16(x, xi, y, yi) {
        return vn(x, xi, y, yi, 16);
      }
      function crypto_verify_32(x, xi, y, yi) {
        return vn(x, xi, y, yi, 32);
      }
      function core_salsa20(o2, p2, k, c2) {
        var j0 = c2[0] & 255 | (c2[1] & 255) << 8 | (c2[2] & 255) << 16 | (c2[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c2[4] & 255 | (c2[5] & 255) << 8 | (c2[6] & 255) << 16 | (c2[7] & 255) << 24, j6 = p2[0] & 255 | (p2[1] & 255) << 8 | (p2[2] & 255) << 16 | (p2[3] & 255) << 24, j7 = p2[4] & 255 | (p2[5] & 255) << 8 | (p2[6] & 255) << 16 | (p2[7] & 255) << 24, j8 = p2[8] & 255 | (p2[9] & 255) << 8 | (p2[10] & 255) << 16 | (p2[11] & 255) << 24, j9 = p2[12] & 255 | (p2[13] & 255) << 8 | (p2[14] & 255) << 16 | (p2[15] & 255) << 24, j10 = c2[8] & 255 | (c2[9] & 255) << 8 | (c2[10] & 255) << 16 | (c2[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c2[12] & 255 | (c2[13] & 255) << 8 | (c2[14] & 255) << 16 | (c2[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u2;
        for (var i2 = 0; i2 < 20; i2 += 2) {
          u2 = x0 + x12 | 0;
          x4 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x4 + x0 | 0;
          x8 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x8 + x4 | 0;
          x12 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x12 + x8 | 0;
          x0 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x5 + x1 | 0;
          x9 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x9 + x5 | 0;
          x13 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x13 + x9 | 0;
          x1 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x1 + x13 | 0;
          x5 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x10 + x6 | 0;
          x14 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x14 + x10 | 0;
          x2 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x2 + x14 | 0;
          x6 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x6 + x2 | 0;
          x10 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x15 + x11 | 0;
          x3 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x3 + x15 | 0;
          x7 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x7 + x3 | 0;
          x11 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x11 + x7 | 0;
          x15 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x0 + x3 | 0;
          x1 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x1 + x0 | 0;
          x2 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x2 + x1 | 0;
          x3 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x3 + x2 | 0;
          x0 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x5 + x4 | 0;
          x6 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x6 + x5 | 0;
          x7 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x7 + x6 | 0;
          x4 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x4 + x7 | 0;
          x5 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x10 + x9 | 0;
          x11 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x11 + x10 | 0;
          x8 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x8 + x11 | 0;
          x9 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x9 + x8 | 0;
          x10 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x15 + x14 | 0;
          x12 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x12 + x15 | 0;
          x13 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x13 + x12 | 0;
          x14 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x14 + x13 | 0;
          x15 ^= u2 << 18 | u2 >>> 32 - 18;
        }
        x0 = x0 + j0 | 0;
        x1 = x1 + j1 | 0;
        x2 = x2 + j2 | 0;
        x3 = x3 + j3 | 0;
        x4 = x4 + j4 | 0;
        x5 = x5 + j5 | 0;
        x6 = x6 + j6 | 0;
        x7 = x7 + j7 | 0;
        x8 = x8 + j8 | 0;
        x9 = x9 + j9 | 0;
        x10 = x10 + j10 | 0;
        x11 = x11 + j11 | 0;
        x12 = x12 + j12 | 0;
        x13 = x13 + j13 | 0;
        x14 = x14 + j14 | 0;
        x15 = x15 + j15 | 0;
        o2[0] = x0 >>> 0 & 255;
        o2[1] = x0 >>> 8 & 255;
        o2[2] = x0 >>> 16 & 255;
        o2[3] = x0 >>> 24 & 255;
        o2[4] = x1 >>> 0 & 255;
        o2[5] = x1 >>> 8 & 255;
        o2[6] = x1 >>> 16 & 255;
        o2[7] = x1 >>> 24 & 255;
        o2[8] = x2 >>> 0 & 255;
        o2[9] = x2 >>> 8 & 255;
        o2[10] = x2 >>> 16 & 255;
        o2[11] = x2 >>> 24 & 255;
        o2[12] = x3 >>> 0 & 255;
        o2[13] = x3 >>> 8 & 255;
        o2[14] = x3 >>> 16 & 255;
        o2[15] = x3 >>> 24 & 255;
        o2[16] = x4 >>> 0 & 255;
        o2[17] = x4 >>> 8 & 255;
        o2[18] = x4 >>> 16 & 255;
        o2[19] = x4 >>> 24 & 255;
        o2[20] = x5 >>> 0 & 255;
        o2[21] = x5 >>> 8 & 255;
        o2[22] = x5 >>> 16 & 255;
        o2[23] = x5 >>> 24 & 255;
        o2[24] = x6 >>> 0 & 255;
        o2[25] = x6 >>> 8 & 255;
        o2[26] = x6 >>> 16 & 255;
        o2[27] = x6 >>> 24 & 255;
        o2[28] = x7 >>> 0 & 255;
        o2[29] = x7 >>> 8 & 255;
        o2[30] = x7 >>> 16 & 255;
        o2[31] = x7 >>> 24 & 255;
        o2[32] = x8 >>> 0 & 255;
        o2[33] = x8 >>> 8 & 255;
        o2[34] = x8 >>> 16 & 255;
        o2[35] = x8 >>> 24 & 255;
        o2[36] = x9 >>> 0 & 255;
        o2[37] = x9 >>> 8 & 255;
        o2[38] = x9 >>> 16 & 255;
        o2[39] = x9 >>> 24 & 255;
        o2[40] = x10 >>> 0 & 255;
        o2[41] = x10 >>> 8 & 255;
        o2[42] = x10 >>> 16 & 255;
        o2[43] = x10 >>> 24 & 255;
        o2[44] = x11 >>> 0 & 255;
        o2[45] = x11 >>> 8 & 255;
        o2[46] = x11 >>> 16 & 255;
        o2[47] = x11 >>> 24 & 255;
        o2[48] = x12 >>> 0 & 255;
        o2[49] = x12 >>> 8 & 255;
        o2[50] = x12 >>> 16 & 255;
        o2[51] = x12 >>> 24 & 255;
        o2[52] = x13 >>> 0 & 255;
        o2[53] = x13 >>> 8 & 255;
        o2[54] = x13 >>> 16 & 255;
        o2[55] = x13 >>> 24 & 255;
        o2[56] = x14 >>> 0 & 255;
        o2[57] = x14 >>> 8 & 255;
        o2[58] = x14 >>> 16 & 255;
        o2[59] = x14 >>> 24 & 255;
        o2[60] = x15 >>> 0 & 255;
        o2[61] = x15 >>> 8 & 255;
        o2[62] = x15 >>> 16 & 255;
        o2[63] = x15 >>> 24 & 255;
      }
      function core_hsalsa20(o2, p2, k, c2) {
        var j0 = c2[0] & 255 | (c2[1] & 255) << 8 | (c2[2] & 255) << 16 | (c2[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c2[4] & 255 | (c2[5] & 255) << 8 | (c2[6] & 255) << 16 | (c2[7] & 255) << 24, j6 = p2[0] & 255 | (p2[1] & 255) << 8 | (p2[2] & 255) << 16 | (p2[3] & 255) << 24, j7 = p2[4] & 255 | (p2[5] & 255) << 8 | (p2[6] & 255) << 16 | (p2[7] & 255) << 24, j8 = p2[8] & 255 | (p2[9] & 255) << 8 | (p2[10] & 255) << 16 | (p2[11] & 255) << 24, j9 = p2[12] & 255 | (p2[13] & 255) << 8 | (p2[14] & 255) << 16 | (p2[15] & 255) << 24, j10 = c2[8] & 255 | (c2[9] & 255) << 8 | (c2[10] & 255) << 16 | (c2[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c2[12] & 255 | (c2[13] & 255) << 8 | (c2[14] & 255) << 16 | (c2[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u2;
        for (var i2 = 0; i2 < 20; i2 += 2) {
          u2 = x0 + x12 | 0;
          x4 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x4 + x0 | 0;
          x8 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x8 + x4 | 0;
          x12 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x12 + x8 | 0;
          x0 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x5 + x1 | 0;
          x9 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x9 + x5 | 0;
          x13 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x13 + x9 | 0;
          x1 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x1 + x13 | 0;
          x5 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x10 + x6 | 0;
          x14 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x14 + x10 | 0;
          x2 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x2 + x14 | 0;
          x6 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x6 + x2 | 0;
          x10 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x15 + x11 | 0;
          x3 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x3 + x15 | 0;
          x7 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x7 + x3 | 0;
          x11 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x11 + x7 | 0;
          x15 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x0 + x3 | 0;
          x1 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x1 + x0 | 0;
          x2 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x2 + x1 | 0;
          x3 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x3 + x2 | 0;
          x0 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x5 + x4 | 0;
          x6 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x6 + x5 | 0;
          x7 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x7 + x6 | 0;
          x4 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x4 + x7 | 0;
          x5 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x10 + x9 | 0;
          x11 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x11 + x10 | 0;
          x8 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x8 + x11 | 0;
          x9 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x9 + x8 | 0;
          x10 ^= u2 << 18 | u2 >>> 32 - 18;
          u2 = x15 + x14 | 0;
          x12 ^= u2 << 7 | u2 >>> 32 - 7;
          u2 = x12 + x15 | 0;
          x13 ^= u2 << 9 | u2 >>> 32 - 9;
          u2 = x13 + x12 | 0;
          x14 ^= u2 << 13 | u2 >>> 32 - 13;
          u2 = x14 + x13 | 0;
          x15 ^= u2 << 18 | u2 >>> 32 - 18;
        }
        o2[0] = x0 >>> 0 & 255;
        o2[1] = x0 >>> 8 & 255;
        o2[2] = x0 >>> 16 & 255;
        o2[3] = x0 >>> 24 & 255;
        o2[4] = x5 >>> 0 & 255;
        o2[5] = x5 >>> 8 & 255;
        o2[6] = x5 >>> 16 & 255;
        o2[7] = x5 >>> 24 & 255;
        o2[8] = x10 >>> 0 & 255;
        o2[9] = x10 >>> 8 & 255;
        o2[10] = x10 >>> 16 & 255;
        o2[11] = x10 >>> 24 & 255;
        o2[12] = x15 >>> 0 & 255;
        o2[13] = x15 >>> 8 & 255;
        o2[14] = x15 >>> 16 & 255;
        o2[15] = x15 >>> 24 & 255;
        o2[16] = x6 >>> 0 & 255;
        o2[17] = x6 >>> 8 & 255;
        o2[18] = x6 >>> 16 & 255;
        o2[19] = x6 >>> 24 & 255;
        o2[20] = x7 >>> 0 & 255;
        o2[21] = x7 >>> 8 & 255;
        o2[22] = x7 >>> 16 & 255;
        o2[23] = x7 >>> 24 & 255;
        o2[24] = x8 >>> 0 & 255;
        o2[25] = x8 >>> 8 & 255;
        o2[26] = x8 >>> 16 & 255;
        o2[27] = x8 >>> 24 & 255;
        o2[28] = x9 >>> 0 & 255;
        o2[29] = x9 >>> 8 & 255;
        o2[30] = x9 >>> 16 & 255;
        o2[31] = x9 >>> 24 & 255;
      }
      function crypto_core_salsa20(out, inp, k, c2) {
        core_salsa20(out, inp, k, c2);
      }
      function crypto_core_hsalsa20(out, inp, k, c2) {
        core_hsalsa20(out, inp, k, c2);
      }
      var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
      function crypto_stream_salsa20_xor(c2, cpos, m, mpos, b, n2, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u2, i2;
        for (i2 = 0; i2 < 16; i2++) z[i2] = 0;
        for (i2 = 0; i2 < 8; i2++) z[i2] = n2[i2];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i2 = 0; i2 < 64; i2++) c2[cpos + i2] = m[mpos + i2] ^ x[i2];
          u2 = 1;
          for (i2 = 8; i2 < 16; i2++) {
            u2 = u2 + (z[i2] & 255) | 0;
            z[i2] = u2 & 255;
            u2 >>>= 8;
          }
          b -= 64;
          cpos += 64;
          mpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i2 = 0; i2 < b; i2++) c2[cpos + i2] = m[mpos + i2] ^ x[i2];
        }
        return 0;
      }
      function crypto_stream_salsa20(c2, cpos, b, n2, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u2, i2;
        for (i2 = 0; i2 < 16; i2++) z[i2] = 0;
        for (i2 = 0; i2 < 8; i2++) z[i2] = n2[i2];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i2 = 0; i2 < 64; i2++) c2[cpos + i2] = x[i2];
          u2 = 1;
          for (i2 = 8; i2 < 16; i2++) {
            u2 = u2 + (z[i2] & 255) | 0;
            z[i2] = u2 & 255;
            u2 >>>= 8;
          }
          b -= 64;
          cpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i2 = 0; i2 < b; i2++) c2[cpos + i2] = x[i2];
        }
        return 0;
      }
      function crypto_stream(c2, cpos, d, n2, k) {
        var s2 = new Uint8Array(32);
        crypto_core_hsalsa20(s2, n2, k, sigma);
        var sn = new Uint8Array(8);
        for (var i2 = 0; i2 < 8; i2++) sn[i2] = n2[i2 + 16];
        return crypto_stream_salsa20(c2, cpos, d, sn, s2);
      }
      function crypto_stream_xor(c2, cpos, m, mpos, d, n2, k) {
        var s2 = new Uint8Array(32);
        crypto_core_hsalsa20(s2, n2, k, sigma);
        var sn = new Uint8Array(8);
        for (var i2 = 0; i2 < 8; i2++) sn[i2] = n2[i2 + 16];
        return crypto_stream_salsa20_xor(c2, cpos, m, mpos, d, sn, s2);
      }
      var poly1305 = function(key) {
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.leftover = 0;
        this.fin = 0;
        var t0, t1, t2, t3, t4, t5, t6, t7;
        t0 = key[0] & 255 | (key[1] & 255) << 8;
        this.r[0] = t0 & 8191;
        t1 = key[2] & 255 | (key[3] & 255) << 8;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        t2 = key[4] & 255 | (key[5] & 255) << 8;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        t3 = key[6] & 255 | (key[7] & 255) << 8;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        t4 = key[8] & 255 | (key[9] & 255) << 8;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        t5 = key[10] & 255 | (key[11] & 255) << 8;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        t6 = key[12] & 255 | (key[13] & 255) << 8;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        t7 = key[14] & 255 | (key[15] & 255) << 8;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
        this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
        this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
        this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
        this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
        this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
        this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
        this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
      };
      poly1305.prototype.blocks = function(m, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11;
        var t0, t1, t2, t3, t4, t5, t6, t7, c2;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
        var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
        while (bytes >= 16) {
          t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
          h0 += t0 & 8191;
          t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          c2 = 0;
          d0 = c2;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c2 = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c2 += d0 >>> 13;
          d0 &= 8191;
          d1 = c2;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c2 = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c2 += d1 >>> 13;
          d1 &= 8191;
          d2 = c2;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c2 = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c2 += d2 >>> 13;
          d2 &= 8191;
          d3 = c2;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c2 = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c2 += d3 >>> 13;
          d3 &= 8191;
          d4 = c2;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c2 = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c2 += d4 >>> 13;
          d4 &= 8191;
          d5 = c2;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c2 = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c2 += d5 >>> 13;
          d5 &= 8191;
          d6 = c2;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c2 = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c2 += d6 >>> 13;
          d6 &= 8191;
          d7 = c2;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c2 = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c2 += d7 >>> 13;
          d7 &= 8191;
          d8 = c2;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c2 = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c2 += d8 >>> 13;
          d8 &= 8191;
          d9 = c2;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c2 = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c2 += d9 >>> 13;
          d9 &= 8191;
          c2 = (c2 << 2) + c2 | 0;
          c2 = c2 + d0 | 0;
          d0 = c2 & 8191;
          c2 = c2 >>> 13;
          d1 += c2;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this.h[0] = h0;
        this.h[1] = h1;
        this.h[2] = h2;
        this.h[3] = h3;
        this.h[4] = h4;
        this.h[5] = h5;
        this.h[6] = h6;
        this.h[7] = h7;
        this.h[8] = h8;
        this.h[9] = h9;
      };
      poly1305.prototype.finish = function(mac, macpos) {
        var g = new Uint16Array(10);
        var c2, mask, f, i2;
        if (this.leftover) {
          i2 = this.leftover;
          this.buffer[i2++] = 1;
          for (; i2 < 16; i2++) this.buffer[i2] = 0;
          this.fin = 1;
          this.blocks(this.buffer, 0, 16);
        }
        c2 = this.h[1] >>> 13;
        this.h[1] &= 8191;
        for (i2 = 2; i2 < 10; i2++) {
          this.h[i2] += c2;
          c2 = this.h[i2] >>> 13;
          this.h[i2] &= 8191;
        }
        this.h[0] += c2 * 5;
        c2 = this.h[0] >>> 13;
        this.h[0] &= 8191;
        this.h[1] += c2;
        c2 = this.h[1] >>> 13;
        this.h[1] &= 8191;
        this.h[2] += c2;
        g[0] = this.h[0] + 5;
        c2 = g[0] >>> 13;
        g[0] &= 8191;
        for (i2 = 1; i2 < 10; i2++) {
          g[i2] = this.h[i2] + c2;
          c2 = g[i2] >>> 13;
          g[i2] &= 8191;
        }
        g[9] -= 1 << 13;
        mask = (c2 ^ 1) - 1;
        for (i2 = 0; i2 < 10; i2++) g[i2] &= mask;
        mask = ~mask;
        for (i2 = 0; i2 < 10; i2++) this.h[i2] = this.h[i2] & mask | g[i2];
        this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
        this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
        this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
        this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
        this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
        this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
        this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
        this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
        f = this.h[0] + this.pad[0];
        this.h[0] = f & 65535;
        for (i2 = 1; i2 < 8; i2++) {
          f = (this.h[i2] + this.pad[i2] | 0) + (f >>> 16) | 0;
          this.h[i2] = f & 65535;
        }
        mac[macpos + 0] = this.h[0] >>> 0 & 255;
        mac[macpos + 1] = this.h[0] >>> 8 & 255;
        mac[macpos + 2] = this.h[1] >>> 0 & 255;
        mac[macpos + 3] = this.h[1] >>> 8 & 255;
        mac[macpos + 4] = this.h[2] >>> 0 & 255;
        mac[macpos + 5] = this.h[2] >>> 8 & 255;
        mac[macpos + 6] = this.h[3] >>> 0 & 255;
        mac[macpos + 7] = this.h[3] >>> 8 & 255;
        mac[macpos + 8] = this.h[4] >>> 0 & 255;
        mac[macpos + 9] = this.h[4] >>> 8 & 255;
        mac[macpos + 10] = this.h[5] >>> 0 & 255;
        mac[macpos + 11] = this.h[5] >>> 8 & 255;
        mac[macpos + 12] = this.h[6] >>> 0 & 255;
        mac[macpos + 13] = this.h[6] >>> 8 & 255;
        mac[macpos + 14] = this.h[7] >>> 0 & 255;
        mac[macpos + 15] = this.h[7] >>> 8 & 255;
      };
      poly1305.prototype.update = function(m, mpos, bytes) {
        var i2, want;
        if (this.leftover) {
          want = 16 - this.leftover;
          if (want > bytes)
            want = bytes;
          for (i2 = 0; i2 < want; i2++)
            this.buffer[this.leftover + i2] = m[mpos + i2];
          bytes -= want;
          mpos += want;
          this.leftover += want;
          if (this.leftover < 16)
            return;
          this.blocks(this.buffer, 0, 16);
          this.leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this.blocks(m, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (i2 = 0; i2 < bytes; i2++)
            this.buffer[this.leftover + i2] = m[mpos + i2];
          this.leftover += bytes;
        }
      };
      function crypto_onetimeauth(out, outpos, m, mpos, n2, k) {
        var s2 = new poly1305(k);
        s2.update(m, mpos, n2);
        s2.finish(out, outpos);
        return 0;
      }
      function crypto_onetimeauth_verify(h2, hpos, m, mpos, n2, k) {
        var x = new Uint8Array(16);
        crypto_onetimeauth(x, 0, m, mpos, n2, k);
        return crypto_verify_16(h2, hpos, x, 0);
      }
      function crypto_secretbox(c2, m, d, n2, k) {
        var i2;
        if (d < 32) return -1;
        crypto_stream_xor(c2, 0, m, 0, d, n2, k);
        crypto_onetimeauth(c2, 16, c2, 32, d - 32, c2);
        for (i2 = 0; i2 < 16; i2++) c2[i2] = 0;
        return 0;
      }
      function crypto_secretbox_open(m, c2, d, n2, k) {
        var i2;
        var x = new Uint8Array(32);
        if (d < 32) return -1;
        crypto_stream(x, 0, 32, n2, k);
        if (crypto_onetimeauth_verify(c2, 16, c2, 32, d - 32, x) !== 0) return -1;
        crypto_stream_xor(m, 0, c2, 0, d, n2, k);
        for (i2 = 0; i2 < 32; i2++) m[i2] = 0;
        return 0;
      }
      function set25519(r, a2) {
        var i2;
        for (i2 = 0; i2 < 16; i2++) r[i2] = a2[i2] | 0;
      }
      function car25519(o2) {
        var i2, v, c2 = 1;
        for (i2 = 0; i2 < 16; i2++) {
          v = o2[i2] + c2 + 65535;
          c2 = Math.floor(v / 65536);
          o2[i2] = v - c2 * 65536;
        }
        o2[0] += c2 - 1 + 37 * (c2 - 1);
      }
      function sel25519(p2, q, b) {
        var t2, c2 = ~(b - 1);
        for (var i2 = 0; i2 < 16; i2++) {
          t2 = c2 & (p2[i2] ^ q[i2]);
          p2[i2] ^= t2;
          q[i2] ^= t2;
        }
      }
      function pack25519(o2, n2) {
        var i2, j, b;
        var m = gf(), t2 = gf();
        for (i2 = 0; i2 < 16; i2++) t2[i2] = n2[i2];
        car25519(t2);
        car25519(t2);
        car25519(t2);
        for (j = 0; j < 2; j++) {
          m[0] = t2[0] - 65517;
          for (i2 = 1; i2 < 15; i2++) {
            m[i2] = t2[i2] - 65535 - (m[i2 - 1] >> 16 & 1);
            m[i2 - 1] &= 65535;
          }
          m[15] = t2[15] - 32767 - (m[14] >> 16 & 1);
          b = m[15] >> 16 & 1;
          m[14] &= 65535;
          sel25519(t2, m, 1 - b);
        }
        for (i2 = 0; i2 < 16; i2++) {
          o2[2 * i2] = t2[i2] & 255;
          o2[2 * i2 + 1] = t2[i2] >> 8;
        }
      }
      function neq25519(a2, b) {
        var c2 = new Uint8Array(32), d = new Uint8Array(32);
        pack25519(c2, a2);
        pack25519(d, b);
        return crypto_verify_32(c2, 0, d, 0);
      }
      function par25519(a2) {
        var d = new Uint8Array(32);
        pack25519(d, a2);
        return d[0] & 1;
      }
      function unpack25519(o2, n2) {
        var i2;
        for (i2 = 0; i2 < 16; i2++) o2[i2] = n2[2 * i2] + (n2[2 * i2 + 1] << 8);
        o2[15] &= 32767;
      }
      function A(o2, a2, b) {
        for (var i2 = 0; i2 < 16; i2++) o2[i2] = a2[i2] + b[i2];
      }
      function Z(o2, a2, b) {
        for (var i2 = 0; i2 < 16; i2++) o2[i2] = a2[i2] - b[i2];
      }
      function M(o2, a2, b) {
        var v, c2, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        v = a2[0];
        t0 += v * b0;
        t1 += v * b1;
        t2 += v * b2;
        t3 += v * b3;
        t4 += v * b4;
        t5 += v * b5;
        t6 += v * b6;
        t7 += v * b7;
        t8 += v * b8;
        t9 += v * b9;
        t10 += v * b10;
        t11 += v * b11;
        t12 += v * b12;
        t13 += v * b13;
        t14 += v * b14;
        t15 += v * b15;
        v = a2[1];
        t1 += v * b0;
        t2 += v * b1;
        t3 += v * b2;
        t4 += v * b3;
        t5 += v * b4;
        t6 += v * b5;
        t7 += v * b6;
        t8 += v * b7;
        t9 += v * b8;
        t10 += v * b9;
        t11 += v * b10;
        t12 += v * b11;
        t13 += v * b12;
        t14 += v * b13;
        t15 += v * b14;
        t16 += v * b15;
        v = a2[2];
        t2 += v * b0;
        t3 += v * b1;
        t4 += v * b2;
        t5 += v * b3;
        t6 += v * b4;
        t7 += v * b5;
        t8 += v * b6;
        t9 += v * b7;
        t10 += v * b8;
        t11 += v * b9;
        t12 += v * b10;
        t13 += v * b11;
        t14 += v * b12;
        t15 += v * b13;
        t16 += v * b14;
        t17 += v * b15;
        v = a2[3];
        t3 += v * b0;
        t4 += v * b1;
        t5 += v * b2;
        t6 += v * b3;
        t7 += v * b4;
        t8 += v * b5;
        t9 += v * b6;
        t10 += v * b7;
        t11 += v * b8;
        t12 += v * b9;
        t13 += v * b10;
        t14 += v * b11;
        t15 += v * b12;
        t16 += v * b13;
        t17 += v * b14;
        t18 += v * b15;
        v = a2[4];
        t4 += v * b0;
        t5 += v * b1;
        t6 += v * b2;
        t7 += v * b3;
        t8 += v * b4;
        t9 += v * b5;
        t10 += v * b6;
        t11 += v * b7;
        t12 += v * b8;
        t13 += v * b9;
        t14 += v * b10;
        t15 += v * b11;
        t16 += v * b12;
        t17 += v * b13;
        t18 += v * b14;
        t19 += v * b15;
        v = a2[5];
        t5 += v * b0;
        t6 += v * b1;
        t7 += v * b2;
        t8 += v * b3;
        t9 += v * b4;
        t10 += v * b5;
        t11 += v * b6;
        t12 += v * b7;
        t13 += v * b8;
        t14 += v * b9;
        t15 += v * b10;
        t16 += v * b11;
        t17 += v * b12;
        t18 += v * b13;
        t19 += v * b14;
        t20 += v * b15;
        v = a2[6];
        t6 += v * b0;
        t7 += v * b1;
        t8 += v * b2;
        t9 += v * b3;
        t10 += v * b4;
        t11 += v * b5;
        t12 += v * b6;
        t13 += v * b7;
        t14 += v * b8;
        t15 += v * b9;
        t16 += v * b10;
        t17 += v * b11;
        t18 += v * b12;
        t19 += v * b13;
        t20 += v * b14;
        t21 += v * b15;
        v = a2[7];
        t7 += v * b0;
        t8 += v * b1;
        t9 += v * b2;
        t10 += v * b3;
        t11 += v * b4;
        t12 += v * b5;
        t13 += v * b6;
        t14 += v * b7;
        t15 += v * b8;
        t16 += v * b9;
        t17 += v * b10;
        t18 += v * b11;
        t19 += v * b12;
        t20 += v * b13;
        t21 += v * b14;
        t22 += v * b15;
        v = a2[8];
        t8 += v * b0;
        t9 += v * b1;
        t10 += v * b2;
        t11 += v * b3;
        t12 += v * b4;
        t13 += v * b5;
        t14 += v * b6;
        t15 += v * b7;
        t16 += v * b8;
        t17 += v * b9;
        t18 += v * b10;
        t19 += v * b11;
        t20 += v * b12;
        t21 += v * b13;
        t22 += v * b14;
        t23 += v * b15;
        v = a2[9];
        t9 += v * b0;
        t10 += v * b1;
        t11 += v * b2;
        t12 += v * b3;
        t13 += v * b4;
        t14 += v * b5;
        t15 += v * b6;
        t16 += v * b7;
        t17 += v * b8;
        t18 += v * b9;
        t19 += v * b10;
        t20 += v * b11;
        t21 += v * b12;
        t22 += v * b13;
        t23 += v * b14;
        t24 += v * b15;
        v = a2[10];
        t10 += v * b0;
        t11 += v * b1;
        t12 += v * b2;
        t13 += v * b3;
        t14 += v * b4;
        t15 += v * b5;
        t16 += v * b6;
        t17 += v * b7;
        t18 += v * b8;
        t19 += v * b9;
        t20 += v * b10;
        t21 += v * b11;
        t22 += v * b12;
        t23 += v * b13;
        t24 += v * b14;
        t25 += v * b15;
        v = a2[11];
        t11 += v * b0;
        t12 += v * b1;
        t13 += v * b2;
        t14 += v * b3;
        t15 += v * b4;
        t16 += v * b5;
        t17 += v * b6;
        t18 += v * b7;
        t19 += v * b8;
        t20 += v * b9;
        t21 += v * b10;
        t22 += v * b11;
        t23 += v * b12;
        t24 += v * b13;
        t25 += v * b14;
        t26 += v * b15;
        v = a2[12];
        t12 += v * b0;
        t13 += v * b1;
        t14 += v * b2;
        t15 += v * b3;
        t16 += v * b4;
        t17 += v * b5;
        t18 += v * b6;
        t19 += v * b7;
        t20 += v * b8;
        t21 += v * b9;
        t22 += v * b10;
        t23 += v * b11;
        t24 += v * b12;
        t25 += v * b13;
        t26 += v * b14;
        t27 += v * b15;
        v = a2[13];
        t13 += v * b0;
        t14 += v * b1;
        t15 += v * b2;
        t16 += v * b3;
        t17 += v * b4;
        t18 += v * b5;
        t19 += v * b6;
        t20 += v * b7;
        t21 += v * b8;
        t22 += v * b9;
        t23 += v * b10;
        t24 += v * b11;
        t25 += v * b12;
        t26 += v * b13;
        t27 += v * b14;
        t28 += v * b15;
        v = a2[14];
        t14 += v * b0;
        t15 += v * b1;
        t16 += v * b2;
        t17 += v * b3;
        t18 += v * b4;
        t19 += v * b5;
        t20 += v * b6;
        t21 += v * b7;
        t22 += v * b8;
        t23 += v * b9;
        t24 += v * b10;
        t25 += v * b11;
        t26 += v * b12;
        t27 += v * b13;
        t28 += v * b14;
        t29 += v * b15;
        v = a2[15];
        t15 += v * b0;
        t16 += v * b1;
        t17 += v * b2;
        t18 += v * b3;
        t19 += v * b4;
        t20 += v * b5;
        t21 += v * b6;
        t22 += v * b7;
        t23 += v * b8;
        t24 += v * b9;
        t25 += v * b10;
        t26 += v * b11;
        t27 += v * b12;
        t28 += v * b13;
        t29 += v * b14;
        t30 += v * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        c2 = 1;
        v = t0 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t0 = v - c2 * 65536;
        v = t1 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t1 = v - c2 * 65536;
        v = t2 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t2 = v - c2 * 65536;
        v = t3 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t3 = v - c2 * 65536;
        v = t4 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t4 = v - c2 * 65536;
        v = t5 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t5 = v - c2 * 65536;
        v = t6 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t6 = v - c2 * 65536;
        v = t7 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t7 = v - c2 * 65536;
        v = t8 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t8 = v - c2 * 65536;
        v = t9 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t9 = v - c2 * 65536;
        v = t10 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t10 = v - c2 * 65536;
        v = t11 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t11 = v - c2 * 65536;
        v = t12 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t12 = v - c2 * 65536;
        v = t13 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t13 = v - c2 * 65536;
        v = t14 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t14 = v - c2 * 65536;
        v = t15 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t15 = v - c2 * 65536;
        t0 += c2 - 1 + 37 * (c2 - 1);
        c2 = 1;
        v = t0 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t0 = v - c2 * 65536;
        v = t1 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t1 = v - c2 * 65536;
        v = t2 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t2 = v - c2 * 65536;
        v = t3 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t3 = v - c2 * 65536;
        v = t4 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t4 = v - c2 * 65536;
        v = t5 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t5 = v - c2 * 65536;
        v = t6 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t6 = v - c2 * 65536;
        v = t7 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t7 = v - c2 * 65536;
        v = t8 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t8 = v - c2 * 65536;
        v = t9 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t9 = v - c2 * 65536;
        v = t10 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t10 = v - c2 * 65536;
        v = t11 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t11 = v - c2 * 65536;
        v = t12 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t12 = v - c2 * 65536;
        v = t13 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t13 = v - c2 * 65536;
        v = t14 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t14 = v - c2 * 65536;
        v = t15 + c2 + 65535;
        c2 = Math.floor(v / 65536);
        t15 = v - c2 * 65536;
        t0 += c2 - 1 + 37 * (c2 - 1);
        o2[0] = t0;
        o2[1] = t1;
        o2[2] = t2;
        o2[3] = t3;
        o2[4] = t4;
        o2[5] = t5;
        o2[6] = t6;
        o2[7] = t7;
        o2[8] = t8;
        o2[9] = t9;
        o2[10] = t10;
        o2[11] = t11;
        o2[12] = t12;
        o2[13] = t13;
        o2[14] = t14;
        o2[15] = t15;
      }
      function S(o2, a2) {
        M(o2, a2, a2);
      }
      function inv25519(o2, i2) {
        var c2 = gf();
        var a2;
        for (a2 = 0; a2 < 16; a2++) c2[a2] = i2[a2];
        for (a2 = 253; a2 >= 0; a2--) {
          S(c2, c2);
          if (a2 !== 2 && a2 !== 4) M(c2, c2, i2);
        }
        for (a2 = 0; a2 < 16; a2++) o2[a2] = c2[a2];
      }
      function pow2523(o2, i2) {
        var c2 = gf();
        var a2;
        for (a2 = 0; a2 < 16; a2++) c2[a2] = i2[a2];
        for (a2 = 250; a2 >= 0; a2--) {
          S(c2, c2);
          if (a2 !== 1) M(c2, c2, i2);
        }
        for (a2 = 0; a2 < 16; a2++) o2[a2] = c2[a2];
      }
      function crypto_scalarmult(q, n2, p2) {
        var z = new Uint8Array(32);
        var x = new Float64Array(80), r, i2;
        var a2 = gf(), b = gf(), c2 = gf(), d = gf(), e2 = gf(), f = gf();
        for (i2 = 0; i2 < 31; i2++) z[i2] = n2[i2];
        z[31] = n2[31] & 127 | 64;
        z[0] &= 248;
        unpack25519(x, p2);
        for (i2 = 0; i2 < 16; i2++) {
          b[i2] = x[i2];
          d[i2] = a2[i2] = c2[i2] = 0;
        }
        a2[0] = d[0] = 1;
        for (i2 = 254; i2 >= 0; --i2) {
          r = z[i2 >>> 3] >>> (i2 & 7) & 1;
          sel25519(a2, b, r);
          sel25519(c2, d, r);
          A(e2, a2, c2);
          Z(a2, a2, c2);
          A(c2, b, d);
          Z(b, b, d);
          S(d, e2);
          S(f, a2);
          M(a2, c2, a2);
          M(c2, b, e2);
          A(e2, a2, c2);
          Z(a2, a2, c2);
          S(b, a2);
          Z(c2, d, f);
          M(a2, c2, _121665);
          A(a2, a2, d);
          M(c2, c2, a2);
          M(a2, d, f);
          M(d, b, x);
          S(b, e2);
          sel25519(a2, b, r);
          sel25519(c2, d, r);
        }
        for (i2 = 0; i2 < 16; i2++) {
          x[i2 + 16] = a2[i2];
          x[i2 + 32] = c2[i2];
          x[i2 + 48] = b[i2];
          x[i2 + 64] = d[i2];
        }
        var x32 = x.subarray(32);
        var x16 = x.subarray(16);
        inv25519(x32, x32);
        M(x16, x16, x32);
        pack25519(q, x16);
        return 0;
      }
      function crypto_scalarmult_base(q, n2) {
        return crypto_scalarmult(q, n2, _9);
      }
      function crypto_box_keypair(y, x) {
        randombytes(x, 32);
        return crypto_scalarmult_base(y, x);
      }
      function crypto_box_beforenm(k, y, x) {
        var s2 = new Uint8Array(32);
        crypto_scalarmult(s2, x, y);
        return crypto_core_hsalsa20(k, _0, s2, sigma);
      }
      var crypto_box_afternm = crypto_secretbox;
      var crypto_box_open_afternm = crypto_secretbox_open;
      function crypto_box(c2, m, d, n2, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_afternm(c2, m, d, n2, k);
      }
      function crypto_box_open(m, c2, d, n2, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_open_afternm(m, c2, d, n2, k);
      }
      var K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function crypto_hashblocks_hl(hh, hl, m, n2) {
        var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i2, j, h2, l2, a2, b, c2, d;
        var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
        var pos = 0;
        while (n2 >= 128) {
          for (i2 = 0; i2 < 16; i2++) {
            j = 8 * i2 + pos;
            wh[i2] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
            wl[i2] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
          }
          for (i2 = 0; i2 < 80; i2++) {
            bh0 = ah0;
            bh1 = ah1;
            bh2 = ah2;
            bh3 = ah3;
            bh4 = ah4;
            bh5 = ah5;
            bh6 = ah6;
            bh7 = ah7;
            bl0 = al0;
            bl1 = al1;
            bl2 = al2;
            bl3 = al3;
            bl4 = al4;
            bl5 = al5;
            bl6 = al6;
            bl7 = al7;
            h2 = ah7;
            l2 = al7;
            a2 = l2 & 65535;
            b = l2 >>> 16;
            c2 = h2 & 65535;
            d = h2 >>> 16;
            h2 = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
            l2 = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
            a2 += l2 & 65535;
            b += l2 >>> 16;
            c2 += h2 & 65535;
            d += h2 >>> 16;
            h2 = ah4 & ah5 ^ ~ah4 & ah6;
            l2 = al4 & al5 ^ ~al4 & al6;
            a2 += l2 & 65535;
            b += l2 >>> 16;
            c2 += h2 & 65535;
            d += h2 >>> 16;
            h2 = K[i2 * 2];
            l2 = K[i2 * 2 + 1];
            a2 += l2 & 65535;
            b += l2 >>> 16;
            c2 += h2 & 65535;
            d += h2 >>> 16;
            h2 = wh[i2 % 16];
            l2 = wl[i2 % 16];
            a2 += l2 & 65535;
            b += l2 >>> 16;
            c2 += h2 & 65535;
            d += h2 >>> 16;
            b += a2 >>> 16;
            c2 += b >>> 16;
            d += c2 >>> 16;
            th = c2 & 65535 | d << 16;
            tl = a2 & 65535 | b << 16;
            h2 = th;
            l2 = tl;
            a2 = l2 & 65535;
            b = l2 >>> 16;
            c2 = h2 & 65535;
            d = h2 >>> 16;
            h2 = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
            l2 = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
            a2 += l2 & 65535;
            b += l2 >>> 16;
            c2 += h2 & 65535;
            d += h2 >>> 16;
            h2 = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l2 = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a2 += l2 & 65535;
            b += l2 >>> 16;
            c2 += h2 & 65535;
            d += h2 >>> 16;
            b += a2 >>> 16;
            c2 += b >>> 16;
            d += c2 >>> 16;
            bh7 = c2 & 65535 | d << 16;
            bl7 = a2 & 65535 | b << 16;
            h2 = bh3;
            l2 = bl3;
            a2 = l2 & 65535;
            b = l2 >>> 16;
            c2 = h2 & 65535;
            d = h2 >>> 16;
            h2 = th;
            l2 = tl;
            a2 += l2 & 65535;
            b += l2 >>> 16;
            c2 += h2 & 65535;
            d += h2 >>> 16;
            b += a2 >>> 16;
            c2 += b >>> 16;
            d += c2 >>> 16;
            bh3 = c2 & 65535 | d << 16;
            bl3 = a2 & 65535 | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i2 % 16 === 15) {
              for (j = 0; j < 16; j++) {
                h2 = wh[j];
                l2 = wl[j];
                a2 = l2 & 65535;
                b = l2 >>> 16;
                c2 = h2 & 65535;
                d = h2 >>> 16;
                h2 = wh[(j + 9) % 16];
                l2 = wl[(j + 9) % 16];
                a2 += l2 & 65535;
                b += l2 >>> 16;
                c2 += h2 & 65535;
                d += h2 >>> 16;
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h2 = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                l2 = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                a2 += l2 & 65535;
                b += l2 >>> 16;
                c2 += h2 & 65535;
                d += h2 >>> 16;
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h2 = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                l2 = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                a2 += l2 & 65535;
                b += l2 >>> 16;
                c2 += h2 & 65535;
                d += h2 >>> 16;
                b += a2 >>> 16;
                c2 += b >>> 16;
                d += c2 >>> 16;
                wh[j] = c2 & 65535 | d << 16;
                wl[j] = a2 & 65535 | b << 16;
              }
            }
          }
          h2 = ah0;
          l2 = al0;
          a2 = l2 & 65535;
          b = l2 >>> 16;
          c2 = h2 & 65535;
          d = h2 >>> 16;
          h2 = hh[0];
          l2 = hl[0];
          a2 += l2 & 65535;
          b += l2 >>> 16;
          c2 += h2 & 65535;
          d += h2 >>> 16;
          b += a2 >>> 16;
          c2 += b >>> 16;
          d += c2 >>> 16;
          hh[0] = ah0 = c2 & 65535 | d << 16;
          hl[0] = al0 = a2 & 65535 | b << 16;
          h2 = ah1;
          l2 = al1;
          a2 = l2 & 65535;
          b = l2 >>> 16;
          c2 = h2 & 65535;
          d = h2 >>> 16;
          h2 = hh[1];
          l2 = hl[1];
          a2 += l2 & 65535;
          b += l2 >>> 16;
          c2 += h2 & 65535;
          d += h2 >>> 16;
          b += a2 >>> 16;
          c2 += b >>> 16;
          d += c2 >>> 16;
          hh[1] = ah1 = c2 & 65535 | d << 16;
          hl[1] = al1 = a2 & 65535 | b << 16;
          h2 = ah2;
          l2 = al2;
          a2 = l2 & 65535;
          b = l2 >>> 16;
          c2 = h2 & 65535;
          d = h2 >>> 16;
          h2 = hh[2];
          l2 = hl[2];
          a2 += l2 & 65535;
          b += l2 >>> 16;
          c2 += h2 & 65535;
          d += h2 >>> 16;
          b += a2 >>> 16;
          c2 += b >>> 16;
          d += c2 >>> 16;
          hh[2] = ah2 = c2 & 65535 | d << 16;
          hl[2] = al2 = a2 & 65535 | b << 16;
          h2 = ah3;
          l2 = al3;
          a2 = l2 & 65535;
          b = l2 >>> 16;
          c2 = h2 & 65535;
          d = h2 >>> 16;
          h2 = hh[3];
          l2 = hl[3];
          a2 += l2 & 65535;
          b += l2 >>> 16;
          c2 += h2 & 65535;
          d += h2 >>> 16;
          b += a2 >>> 16;
          c2 += b >>> 16;
          d += c2 >>> 16;
          hh[3] = ah3 = c2 & 65535 | d << 16;
          hl[3] = al3 = a2 & 65535 | b << 16;
          h2 = ah4;
          l2 = al4;
          a2 = l2 & 65535;
          b = l2 >>> 16;
          c2 = h2 & 65535;
          d = h2 >>> 16;
          h2 = hh[4];
          l2 = hl[4];
          a2 += l2 & 65535;
          b += l2 >>> 16;
          c2 += h2 & 65535;
          d += h2 >>> 16;
          b += a2 >>> 16;
          c2 += b >>> 16;
          d += c2 >>> 16;
          hh[4] = ah4 = c2 & 65535 | d << 16;
          hl[4] = al4 = a2 & 65535 | b << 16;
          h2 = ah5;
          l2 = al5;
          a2 = l2 & 65535;
          b = l2 >>> 16;
          c2 = h2 & 65535;
          d = h2 >>> 16;
          h2 = hh[5];
          l2 = hl[5];
          a2 += l2 & 65535;
          b += l2 >>> 16;
          c2 += h2 & 65535;
          d += h2 >>> 16;
          b += a2 >>> 16;
          c2 += b >>> 16;
          d += c2 >>> 16;
          hh[5] = ah5 = c2 & 65535 | d << 16;
          hl[5] = al5 = a2 & 65535 | b << 16;
          h2 = ah6;
          l2 = al6;
          a2 = l2 & 65535;
          b = l2 >>> 16;
          c2 = h2 & 65535;
          d = h2 >>> 16;
          h2 = hh[6];
          l2 = hl[6];
          a2 += l2 & 65535;
          b += l2 >>> 16;
          c2 += h2 & 65535;
          d += h2 >>> 16;
          b += a2 >>> 16;
          c2 += b >>> 16;
          d += c2 >>> 16;
          hh[6] = ah6 = c2 & 65535 | d << 16;
          hl[6] = al6 = a2 & 65535 | b << 16;
          h2 = ah7;
          l2 = al7;
          a2 = l2 & 65535;
          b = l2 >>> 16;
          c2 = h2 & 65535;
          d = h2 >>> 16;
          h2 = hh[7];
          l2 = hl[7];
          a2 += l2 & 65535;
          b += l2 >>> 16;
          c2 += h2 & 65535;
          d += h2 >>> 16;
          b += a2 >>> 16;
          c2 += b >>> 16;
          d += c2 >>> 16;
          hh[7] = ah7 = c2 & 65535 | d << 16;
          hl[7] = al7 = a2 & 65535 | b << 16;
          pos += 128;
          n2 -= 128;
        }
        return n2;
      }
      function crypto_hash(out, m, n2) {
        var hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), i2, b = n2;
        hh[0] = 1779033703;
        hh[1] = 3144134277;
        hh[2] = 1013904242;
        hh[3] = 2773480762;
        hh[4] = 1359893119;
        hh[5] = 2600822924;
        hh[6] = 528734635;
        hh[7] = 1541459225;
        hl[0] = 4089235720;
        hl[1] = 2227873595;
        hl[2] = 4271175723;
        hl[3] = 1595750129;
        hl[4] = 2917565137;
        hl[5] = 725511199;
        hl[6] = 4215389547;
        hl[7] = 327033209;
        crypto_hashblocks_hl(hh, hl, m, n2);
        n2 %= 128;
        for (i2 = 0; i2 < n2; i2++) x[i2] = m[b - n2 + i2];
        x[n2] = 128;
        n2 = 256 - 128 * (n2 < 112 ? 1 : 0);
        x[n2 - 9] = 0;
        ts64(x, n2 - 8, b / 536870912 | 0, b << 3);
        crypto_hashblocks_hl(hh, hl, x, n2);
        for (i2 = 0; i2 < 8; i2++) ts64(out, 8 * i2, hh[i2], hl[i2]);
        return 0;
      }
      function add(p2, q) {
        var a2 = gf(), b = gf(), c2 = gf(), d = gf(), e2 = gf(), f = gf(), g = gf(), h2 = gf(), t2 = gf();
        Z(a2, p2[1], p2[0]);
        Z(t2, q[1], q[0]);
        M(a2, a2, t2);
        A(b, p2[0], p2[1]);
        A(t2, q[0], q[1]);
        M(b, b, t2);
        M(c2, p2[3], q[3]);
        M(c2, c2, D2);
        M(d, p2[2], q[2]);
        A(d, d, d);
        Z(e2, b, a2);
        Z(f, d, c2);
        A(g, d, c2);
        A(h2, b, a2);
        M(p2[0], e2, f);
        M(p2[1], h2, g);
        M(p2[2], g, f);
        M(p2[3], e2, h2);
      }
      function cswap(p2, q, b) {
        var i2;
        for (i2 = 0; i2 < 4; i2++) {
          sel25519(p2[i2], q[i2], b);
        }
      }
      function pack(r, p2) {
        var tx = gf(), ty = gf(), zi = gf();
        inv25519(zi, p2[2]);
        M(tx, p2[0], zi);
        M(ty, p2[1], zi);
        pack25519(r, ty);
        r[31] ^= par25519(tx) << 7;
      }
      function scalarmult(p2, q, s2) {
        var b, i2;
        set25519(p2[0], gf0);
        set25519(p2[1], gf1);
        set25519(p2[2], gf1);
        set25519(p2[3], gf0);
        for (i2 = 255; i2 >= 0; --i2) {
          b = s2[i2 / 8 | 0] >> (i2 & 7) & 1;
          cswap(p2, q, b);
          add(q, p2);
          add(p2, p2);
          cswap(p2, q, b);
        }
      }
      function scalarbase(p2, s2) {
        var q = [gf(), gf(), gf(), gf()];
        set25519(q[0], X);
        set25519(q[1], Y);
        set25519(q[2], gf1);
        M(q[3], X, Y);
        scalarmult(p2, q, s2);
      }
      function crypto_sign_keypair(pk, sk, seeded) {
        var d = new Uint8Array(64);
        var p2 = [gf(), gf(), gf(), gf()];
        var i2;
        if (!seeded) randombytes(sk, 32);
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        scalarbase(p2, d);
        pack(pk, p2);
        for (i2 = 0; i2 < 32; i2++) sk[i2 + 32] = pk[i2];
        return 0;
      }
      var L = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
      function modL(r, x) {
        var carry, i2, j, k;
        for (i2 = 63; i2 >= 32; --i2) {
          carry = 0;
          for (j = i2 - 32, k = i2 - 12; j < k; ++j) {
            x[j] += carry - 16 * x[i2] * L[j - (i2 - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
          }
          x[j] += carry;
          x[i2] = 0;
        }
        carry = 0;
        for (j = 0; j < 32; j++) {
          x[j] += carry - (x[31] >> 4) * L[j];
          carry = x[j] >> 8;
          x[j] &= 255;
        }
        for (j = 0; j < 32; j++) x[j] -= carry * L[j];
        for (i2 = 0; i2 < 32; i2++) {
          x[i2 + 1] += x[i2] >> 8;
          r[i2] = x[i2] & 255;
        }
      }
      function reduce(r) {
        var x = new Float64Array(64), i2;
        for (i2 = 0; i2 < 64; i2++) x[i2] = r[i2];
        for (i2 = 0; i2 < 64; i2++) r[i2] = 0;
        modL(r, x);
      }
      function crypto_sign(sm, m, n2, sk) {
        var d = new Uint8Array(64), h2 = new Uint8Array(64), r = new Uint8Array(64);
        var i2, j, x = new Float64Array(64);
        var p2 = [gf(), gf(), gf(), gf()];
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        var smlen = n2 + 64;
        for (i2 = 0; i2 < n2; i2++) sm[64 + i2] = m[i2];
        for (i2 = 0; i2 < 32; i2++) sm[32 + i2] = d[32 + i2];
        crypto_hash(r, sm.subarray(32), n2 + 32);
        reduce(r);
        scalarbase(p2, r);
        pack(sm, p2);
        for (i2 = 32; i2 < 64; i2++) sm[i2] = sk[i2];
        crypto_hash(h2, sm, n2 + 64);
        reduce(h2);
        for (i2 = 0; i2 < 64; i2++) x[i2] = 0;
        for (i2 = 0; i2 < 32; i2++) x[i2] = r[i2];
        for (i2 = 0; i2 < 32; i2++) {
          for (j = 0; j < 32; j++) {
            x[i2 + j] += h2[i2] * d[j];
          }
        }
        modL(sm.subarray(32), x);
        return smlen;
      }
      function unpackneg(r, p2) {
        var t2 = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
        set25519(r[2], gf1);
        unpack25519(r[1], p2);
        S(num, r[1]);
        M(den, num, D);
        Z(num, num, r[2]);
        A(den, r[2], den);
        S(den2, den);
        S(den4, den2);
        M(den6, den4, den2);
        M(t2, den6, num);
        M(t2, t2, den);
        pow2523(t2, t2);
        M(t2, t2, num);
        M(t2, t2, den);
        M(t2, t2, den);
        M(r[0], t2, den);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num)) M(r[0], r[0], I);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num)) return -1;
        if (par25519(r[0]) === p2[31] >> 7) Z(r[0], gf0, r[0]);
        M(r[3], r[0], r[1]);
        return 0;
      }
      function crypto_sign_open(m, sm, n2, pk) {
        var i2;
        var t2 = new Uint8Array(32), h2 = new Uint8Array(64);
        var p2 = [gf(), gf(), gf(), gf()], q = [gf(), gf(), gf(), gf()];
        if (n2 < 64) return -1;
        if (unpackneg(q, pk)) return -1;
        for (i2 = 0; i2 < n2; i2++) m[i2] = sm[i2];
        for (i2 = 0; i2 < 32; i2++) m[i2 + 32] = pk[i2];
        crypto_hash(h2, m, n2);
        reduce(h2);
        scalarmult(p2, q, h2);
        scalarbase(q, sm.subarray(32));
        add(p2, q);
        pack(t2, p2);
        n2 -= 64;
        if (crypto_verify_32(sm, 0, t2, 0)) {
          for (i2 = 0; i2 < n2; i2++) m[i2] = 0;
          return -1;
        }
        for (i2 = 0; i2 < n2; i2++) m[i2] = sm[i2 + 64];
        return n2;
      }
      var crypto_secretbox_KEYBYTES = 32, crypto_secretbox_NONCEBYTES = 24, crypto_secretbox_ZEROBYTES = 32, crypto_secretbox_BOXZEROBYTES = 16, crypto_scalarmult_BYTES = 32, crypto_scalarmult_SCALARBYTES = 32, crypto_box_PUBLICKEYBYTES = 32, crypto_box_SECRETKEYBYTES = 32, crypto_box_BEFORENMBYTES = 32, crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES, crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES, crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES, crypto_sign_BYTES = 64, crypto_sign_PUBLICKEYBYTES = 32, crypto_sign_SECRETKEYBYTES = 64, crypto_sign_SEEDBYTES = 32, crypto_hash_BYTES = 64;
      nacl2.lowlevel = {
        crypto_core_hsalsa20,
        crypto_stream_xor,
        crypto_stream,
        crypto_stream_salsa20_xor,
        crypto_stream_salsa20,
        crypto_onetimeauth,
        crypto_onetimeauth_verify,
        crypto_verify_16,
        crypto_verify_32,
        crypto_secretbox,
        crypto_secretbox_open,
        crypto_scalarmult,
        crypto_scalarmult_base,
        crypto_box_beforenm,
        crypto_box_afternm,
        crypto_box,
        crypto_box_open,
        crypto_box_keypair,
        crypto_hash,
        crypto_sign,
        crypto_sign_keypair,
        crypto_sign_open,
        crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES,
        crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES,
        crypto_box_BEFORENMBYTES,
        crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES,
        crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES,
        crypto_hash_BYTES,
        gf,
        D,
        L,
        pack25519,
        unpack25519,
        M,
        A,
        S,
        Z,
        pow2523,
        add,
        set25519,
        modL,
        scalarmult,
        scalarbase
      };
      function checkLengths(k, n2) {
        if (k.length !== crypto_secretbox_KEYBYTES) throw new Error("bad key size");
        if (n2.length !== crypto_secretbox_NONCEBYTES) throw new Error("bad nonce size");
      }
      function checkBoxLengths(pk, sk) {
        if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error("bad public key size");
        if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error("bad secret key size");
      }
      function checkArrayTypes() {
        for (var i2 = 0; i2 < arguments.length; i2++) {
          if (!(arguments[i2] instanceof Uint8Array))
            throw new TypeError("unexpected type, use Uint8Array");
        }
      }
      function cleanup(arr) {
        for (var i2 = 0; i2 < arr.length; i2++) arr[i2] = 0;
      }
      nacl2.randomBytes = function(n2) {
        var b = new Uint8Array(n2);
        randombytes(b, n2);
        return b;
      };
      nacl2.secretbox = function(msg, nonce, key) {
        checkArrayTypes(msg, nonce, key);
        checkLengths(key, nonce);
        var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
        var c2 = new Uint8Array(m.length);
        for (var i2 = 0; i2 < msg.length; i2++) m[i2 + crypto_secretbox_ZEROBYTES] = msg[i2];
        crypto_secretbox(c2, m, m.length, nonce, key);
        return c2.subarray(crypto_secretbox_BOXZEROBYTES);
      };
      nacl2.secretbox.open = function(box, nonce, key) {
        checkArrayTypes(box, nonce, key);
        checkLengths(key, nonce);
        var c2 = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
        var m = new Uint8Array(c2.length);
        for (var i2 = 0; i2 < box.length; i2++) c2[i2 + crypto_secretbox_BOXZEROBYTES] = box[i2];
        if (c2.length < 32) return null;
        if (crypto_secretbox_open(m, c2, c2.length, nonce, key) !== 0) return null;
        return m.subarray(crypto_secretbox_ZEROBYTES);
      };
      nacl2.secretbox.keyLength = crypto_secretbox_KEYBYTES;
      nacl2.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
      nacl2.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
      nacl2.scalarMult = function(n2, p2) {
        checkArrayTypes(n2, p2);
        if (n2.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size");
        if (p2.length !== crypto_scalarmult_BYTES) throw new Error("bad p size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult(q, n2, p2);
        return q;
      };
      nacl2.scalarMult.base = function(n2) {
        checkArrayTypes(n2);
        if (n2.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult_base(q, n2);
        return q;
      };
      nacl2.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
      nacl2.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
      nacl2.box = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox(msg, nonce, k);
      };
      nacl2.box.before = function(publicKey, secretKey) {
        checkArrayTypes(publicKey, secretKey);
        checkBoxLengths(publicKey, secretKey);
        var k = new Uint8Array(crypto_box_BEFORENMBYTES);
        crypto_box_beforenm(k, publicKey, secretKey);
        return k;
      };
      nacl2.box.after = nacl2.secretbox;
      nacl2.box.open = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox.open(msg, nonce, k);
      };
      nacl2.box.open.after = nacl2.secretbox.open;
      nacl2.box.keyPair = function() {
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
        crypto_box_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.box.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_box_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult_base(pk, secretKey);
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl2.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
      nacl2.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
      nacl2.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
      nacl2.box.nonceLength = crypto_box_NONCEBYTES;
      nacl2.box.overheadLength = nacl2.secretbox.overheadLength;
      nacl2.sign = function(msg, secretKey) {
        checkArrayTypes(msg, secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
        crypto_sign(signedMsg, msg, msg.length, secretKey);
        return signedMsg;
      };
      nacl2.sign.open = function(signedMsg, publicKey) {
        checkArrayTypes(signedMsg, publicKey);
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var tmp = new Uint8Array(signedMsg.length);
        var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
        if (mlen < 0) return null;
        var m = new Uint8Array(mlen);
        for (var i2 = 0; i2 < m.length; i2++) m[i2] = tmp[i2];
        return m;
      };
      nacl2.sign.detached = function(msg, secretKey) {
        var signedMsg = nacl2.sign(msg, secretKey);
        var sig = new Uint8Array(crypto_sign_BYTES);
        for (var i2 = 0; i2 < sig.length; i2++) sig[i2] = signedMsg[i2];
        return sig;
      };
      nacl2.sign.detached.verify = function(msg, sig, publicKey) {
        checkArrayTypes(msg, sig, publicKey);
        if (sig.length !== crypto_sign_BYTES)
          throw new Error("bad signature size");
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
        var m = new Uint8Array(crypto_sign_BYTES + msg.length);
        var i2;
        for (i2 = 0; i2 < crypto_sign_BYTES; i2++) sm[i2] = sig[i2];
        for (i2 = 0; i2 < msg.length; i2++) sm[i2 + crypto_sign_BYTES] = msg[i2];
        return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
      };
      nacl2.sign.keyPair = function() {
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        crypto_sign_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.sign.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        for (var i2 = 0; i2 < pk.length; i2++) pk[i2] = secretKey[32 + i2];
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl2.sign.keyPair.fromSeed = function(seed) {
        checkArrayTypes(seed);
        if (seed.length !== crypto_sign_SEEDBYTES)
          throw new Error("bad seed size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        for (var i2 = 0; i2 < 32; i2++) sk[i2] = seed[i2];
        crypto_sign_keypair(pk, sk, true);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
      nacl2.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
      nacl2.sign.seedLength = crypto_sign_SEEDBYTES;
      nacl2.sign.signatureLength = crypto_sign_BYTES;
      nacl2.hash = function(msg) {
        checkArrayTypes(msg);
        var h2 = new Uint8Array(crypto_hash_BYTES);
        crypto_hash(h2, msg, msg.length);
        return h2;
      };
      nacl2.hash.hashLength = crypto_hash_BYTES;
      nacl2.verify = function(x, y) {
        checkArrayTypes(x, y);
        if (x.length === 0 || y.length === 0) return false;
        if (x.length !== y.length) return false;
        return vn(x, 0, y, 0, x.length) === 0 ? true : false;
      };
      nacl2.setPRNG = function(fn) {
        randombytes = fn;
      };
      (function() {
        var crypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (crypto && crypto.getRandomValues) {
          var QUOTA = 65536;
          nacl2.setPRNG(function(x, n2) {
            var i2, v = new Uint8Array(n2);
            for (i2 = 0; i2 < n2; i2 += QUOTA) {
              crypto.getRandomValues(v.subarray(i2, i2 + Math.min(n2 - i2, QUOTA)));
            }
            for (i2 = 0; i2 < n2; i2++) x[i2] = v[i2];
            cleanup(v);
          });
        } else if (typeof __require !== "undefined") {
          crypto = require_crypto();
          if (crypto && crypto.randomBytes) {
            nacl2.setPRNG(function(x, n2) {
              var i2, v = crypto.randomBytes(n2);
              for (i2 = 0; i2 < n2; i2++) x[i2] = v[i2];
              cleanup(v);
            });
          }
        }
      })();
    })(typeof module !== "undefined" && module.exports ? module.exports : self.nacl = self.nacl || {});
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge2(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge2;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge2;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge2(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge2.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge2(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge2;
    module.exports = deepmerge_1;
  }
});

// node_modules/ua-parser-js/src/ua-parser.js
var require_ua_parser = __commonJS({
  "node_modules/ua-parser-js/src/ua-parser.js"(exports, module) {
    (function(window2, undefined2) {
      "use strict";
      var LIBVERSION = "1.0.40", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 500;
      var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS", SUFFIX_BROWSER = " Browser";
      var extend = function(regexes2, extensions) {
        var mergedRegexes = {};
        for (var i2 in regexes2) {
          if (extensions[i2] && extensions[i2].length % 2 === 0) {
            mergedRegexes[i2] = extensions[i2].concat(regexes2[i2]);
          } else {
            mergedRegexes[i2] = regexes2[i2];
          }
        }
        return mergedRegexes;
      }, enumerize = function(arr) {
        var enums = {};
        for (var i2 = 0; i2 < arr.length; i2++) {
          enums[arr[i2].toUpperCase()] = arr[i2];
        }
        return enums;
      }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
      }, lowerize = function(str) {
        return str.toLowerCase();
      }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined2;
      }, trim = function(str, len) {
        if (typeof str === STR_TYPE) {
          str = str.replace(/^\s\s*/, EMPTY);
          return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
      };
      var rgxMapper = function(ua, arrays) {
        var i2 = 0, j, k, p2, q, matches, match;
        while (i2 < arrays.length && !matches) {
          var regex = arrays[i2], props = arrays[i2 + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            if (!regex[j]) {
              break;
            }
            matches = regex[j++].exec(ua);
            if (!!matches) {
              for (p2 = 0; p2 < props.length; p2++) {
                match = matches[++k];
                q = props[p2];
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length === 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      this[q[0]] = q[1];
                    }
                  } else if (q.length === 3) {
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                    } else {
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                    }
                  } else if (q.length === 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                  }
                } else {
                  this[q] = match ? match : undefined2;
                }
              }
            }
          }
          i2 += 2;
        }
      }, strMapper = function(str, map) {
        for (var i2 in map) {
          if (typeof map[i2] === OBJ_TYPE && map[i2].length > 0) {
            for (var j = 0; j < map[i2].length; j++) {
              if (has(map[i2][j], str)) {
                return i2 === UNKNOWN ? undefined2 : i2;
              }
            }
          } else if (has(map[i2], str)) {
            return i2 === UNKNOWN ? undefined2 : i2;
          }
        }
        return map.hasOwnProperty("*") ? map["*"] : str;
      };
      var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
      }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": ["NT 5.1", "NT 5.2"],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": ["NT 6.4", "NT 10.0"],
        "RT": "ARM"
      };
      var regexes = {
        browser: [
          [
            /\b(?:crmo|crios)\/([\w\.]+)/i
            // Chrome for Android/iOS
          ],
          [VERSION, [NAME, "Chrome"]],
          [
            /edg(?:e|ios|a)?\/([\w\.]+)/i
            // Microsoft Edge
          ],
          [VERSION, [NAME, "Edge"]],
          [
            // Presto based
            /(opera mini)\/([-\w\.]+)/i,
            // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
            // Opera
          ],
          [NAME, VERSION],
          [
            /opios[\/ ]+([\w\.]+)/i
            // Opera mini on iphone >= 8.0
          ],
          [VERSION, [NAME, OPERA + " Mini"]],
          [
            /\bop(?:rg)?x\/([\w\.]+)/i
            // Opera GX
          ],
          [VERSION, [NAME, OPERA + " GX"]],
          [
            /\bopr\/([\w\.]+)/i
            // Opera Webkit
          ],
          [VERSION, [NAME, OPERA]],
          [
            // Mixed
            /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
            // Baidu
          ],
          [VERSION, [NAME, "Baidu"]],
          [
            /\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i
            // Maxthon
          ],
          [VERSION, [NAME, "Maxthon"]],
          [
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
            // Lunascape/Maxthon/Netfront/Jasmine/Blazer/Sleipnir
            // Trident based
            /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
            // Avant/IEMobile/SlimBrowser/SlimBoat/Slimjet
            /(?:ms|\()(ie) ([\w\.]+)/i,
            // Internet Explorer
            // Blink/Webkit/KHTML based                                         // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
            // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ//Vivaldi/DuckDuckGo/Klar/Helio/Dragon
            /(heytap|ovi|115)browser\/([\d\.]+)/i,
            // HeyTap/Ovi/115
            /(weibo)__([\d\.]+)/i
            // Weibo
          ],
          [NAME, VERSION],
          [
            /quark(?:pc)?\/([-\w\.]+)/i
            // Quark
          ],
          [VERSION, [NAME, "Quark"]],
          [
            /\bddg\/([\w\.]+)/i
            // DuckDuckGo
          ],
          [VERSION, [NAME, "DuckDuckGo"]],
          [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
            // UCBrowser
          ],
          [VERSION, [NAME, "UC" + BROWSER]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            // WeChat Desktop for Windows Built-in Browser
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i
            // WeChat
          ],
          [VERSION, [NAME, "WeChat"]],
          [
            /konqueror\/([\w\.]+)/i
            // Konqueror
          ],
          [VERSION, [NAME, "Konqueror"]],
          [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
            // IE11
          ],
          [VERSION, [NAME, "IE"]],
          [
            /ya(?:search)?browser\/([\w\.]+)/i
            // Yandex
          ],
          [VERSION, [NAME, "Yandex"]],
          [
            /slbrowser\/([\w\.]+)/i
            // Smart Lenovo Browser
          ],
          [VERSION, [NAME, "Smart Lenovo " + BROWSER]],
          [
            /(avast|avg)\/([\w\.]+)/i
            // Avast/AVG Secure Browser
          ],
          [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
          [
            /\bfocus\/([\w\.]+)/i
            // Firefox Focus
          ],
          [VERSION, [NAME, FIREFOX + " Focus"]],
          [
            /\bopt\/([\w\.]+)/i
            // Opera Touch
          ],
          [VERSION, [NAME, OPERA + " Touch"]],
          [
            /coc_coc\w+\/([\w\.]+)/i
            // Coc Coc Browser
          ],
          [VERSION, [NAME, "Coc Coc"]],
          [
            /dolfin\/([\w\.]+)/i
            // Dolphin
          ],
          [VERSION, [NAME, "Dolphin"]],
          [
            /coast\/([\w\.]+)/i
            // Opera Coast
          ],
          [VERSION, [NAME, OPERA + " Coast"]],
          [
            /miuibrowser\/([\w\.]+)/i
            // MIUI Browser
          ],
          [VERSION, [NAME, "MIUI" + SUFFIX_BROWSER]],
          [
            /fxios\/([\w\.-]+)/i
            // Firefox for iOS
          ],
          [VERSION, [NAME, FIREFOX]],
          [
            /\bqihoobrowser\/?([\w\.]*)/i
            // 360
          ],
          [VERSION, [NAME, "360"]],
          [
            /\b(qq)\/([\w\.]+)/i
            // QQ
          ],
          [[NAME, /(.+)/, "$1Browser"], VERSION],
          [
            /(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1" + SUFFIX_BROWSER], VERSION],
          [
            // Oculus/Sailfish/HuaweiBrowser/VivoBrowser/PicoBrowser
            /samsungbrowser\/([\w\.]+)/i
            // Samsung Internet
          ],
          [VERSION, [NAME, SAMSUNG + " Internet"]],
          [
            /metasr[\/ ]?([\d\.]+)/i
            // Sogou Explorer
          ],
          [VERSION, [NAME, "Sogou Explorer"]],
          [
            /(sogou)mo\w+\/([\d\.]+)/i
            // Sogou Mobile
          ],
          [[NAME, "Sogou Mobile"], VERSION],
          [
            /(electron)\/([\w\.]+) safari/i,
            // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            // Tesla
            /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i
            // QQ/2345
          ],
          [NAME, VERSION],
          [
            /(lbbrowser|rekonq)/i,
            // LieBao Browser/Rekonq
            /\[(linkedin)app\]/i
            // LinkedIn App for iOS & Android
          ],
          [NAME],
          [
            /ome\/([\w\.]+) \w* ?(iron) saf/i,
            // Iron
            /ome\/([\w\.]+).+qihu (360)[es]e/i
            // 360
          ],
          [VERSION, NAME],
          [
            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
            // Facebook App for iOS & Android
          ],
          [[NAME, FACEBOOK], VERSION],
          [
            /(Klarna)\/([\w\.]+)/i,
            // Klarna Shopping Browser for iOS & Android
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
            // Kakao App
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
            // Naver InApp
            /safari (line)\/([\w\.]+)/i,
            // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,
            // Line App for Android
            /(alipay)client\/([\w\.]+)/i,
            // Alipay
            /(twitter)(?:and| f.+e\/([\w\.]+))/i,
            // Twitter
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
            // Chromium/Instagram/Snapchat
          ],
          [NAME, VERSION],
          [
            /\bgsa\/([\w\.]+) .*safari\//i
            // Google Search Appliance on iOS
          ],
          [VERSION, [NAME, "GSA"]],
          [
            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
            // TikTok
          ],
          [VERSION, [NAME, "TikTok"]],
          [
            /headlesschrome(?:\/([\w\.]+)| )/i
            // Chrome Headless
          ],
          [VERSION, [NAME, CHROME + " Headless"]],
          [
            / wv\).+(chrome)\/([\w\.]+)/i
            // Chrome WebView
          ],
          [[NAME, CHROME + " WebView"], VERSION],
          [
            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
            // Android Browser
          ],
          [VERSION, [NAME, "Android " + BROWSER]],
          [
            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
            // Chrome/OmniWeb/Arora/Tizen/Nokia
          ],
          [NAME, VERSION],
          [
            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
            // Mobile Safari
          ],
          [VERSION, [NAME, "Mobile Safari"]],
          [
            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
            // Safari & Safari Mobile
          ],
          [VERSION, NAME],
          [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
            // Safari < 3.0
          ],
          [NAME, [VERSION, strMapper, oldSafariMap]],
          [
            /(webkit|khtml)\/([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i
            // Netscape
          ],
          [[NAME, "Netscape"], VERSION],
          [
            /(wolvic|librewolf)\/([\w\.]+)/i
            // Wolvic/LibreWolf
          ],
          [NAME, VERSION],
          [
            /mobile vr; rv:([\w\.]+)\).+firefox/i
            // Firefox Reality
          ],
          [VERSION, [NAME, FIREFOX + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            // Flow
            /(swiftfox)/i,
            // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
            // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,
            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            // Mozilla
            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i
            // Links
          ],
          [NAME, [VERSION, /_/g, "."]],
          [
            /(cobalt)\/([\w\.]+)/i
            // Cobalt
          ],
          [NAME, [VERSION, /master.|lts./, ""]]
        ],
        cpu: [
          [
            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
            // AMD64 (x64)
          ],
          [[ARCHITECTURE, "amd64"]],
          [
            /(ia32(?=;))/i
            // IA32 (quicktime)
          ],
          [[ARCHITECTURE, lowerize]],
          [
            /((?:i[346]|x)86)[;\)]/i
            // IA32 (x86)
          ],
          [[ARCHITECTURE, "ia32"]],
          [
            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
            // ARM64
          ],
          [[ARCHITECTURE, "arm64"]],
          [
            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
            // ARMHF
          ],
          [[ARCHITECTURE, "armhf"]],
          [
            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
          ],
          [[ARCHITECTURE, "arm"]],
          [
            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
            // PowerPC
          ],
          [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
          [
            /(sun4\w)[;\)]/i
            // SPARC
          ],
          [[ARCHITECTURE, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
            // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
          ],
          [[ARCHITECTURE, lowerize]]
        ],
        device: [
          [
            //////////////////////////
            // MOBILES & TABLETS
            /////////////////////////
            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
          [
            /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]((?!sm-[lr])[-\w]+)/i,
            /sec-(sgh\w+)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
          [
            // Apple
            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
            // iPod/iPhone
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
          [
            /(macintosh);/i
          ],
          [MODEL, [VENDOR, APPLE]],
          [
            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
          [
            // Honor
            /(?:honor)([-\w ]+)[;\)]/i
          ],
          [MODEL, [VENDOR, "Honor"], [TYPE, MOBILE]],
          [
            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
          [
            /(?:huawei)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
          [
            // Xiaomi
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
            // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,
            // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            // Xiaomi Redmi
            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
            // Xiaomi Redmi 'numeric' models
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i
            // Xiaomi Mi
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
          [
            /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
            // Redmi Pad
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
            // Mi Pad tablets
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
          [
            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
          ],
          [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
          [
            /\b(opd2\d{3}a?) bui/i
          ],
          [MODEL, [VENDOR, "OPPO"], [TYPE, TABLET]],
          [
            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
          ],
          [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
          [
            // Realme
            /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
          ],
          [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
          [
            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
          [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
          [
            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, TABLET]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
          [
            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
          ],
          [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
          [
            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
          [
            // Google
            /(pixel c)\b/i
            // Google Pixel C
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
          [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
            // Google Pixel
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
          [
            // Sony
            /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
          [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
          ],
          [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
          [
            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
          [
            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
            // Kindle Fire without Silk / Echo Show
            /(kf[a-z]+)( bui|\)).+silk\//i
            // Kindle Fire HD
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
          [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
            // Fire Phone
          ],
          [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
          [
            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i
            // BlackBerry PlayBook
          ],
          [MODEL, VENDOR, [TYPE, TABLET]],
          [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i
            // BlackBerry 10
          ],
          [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
          [
            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
          [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
          [
            // HTC
            /(nexus 9)/i
            // HTC Nexus 9
          ],
          [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            // HTC
            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
            // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
          ],
          [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
          [
            // TCL
            /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i
          ],
          [MODEL, [VENDOR, "TCL"], [TYPE, TABLET]],
          [
            // itel
            /(itel) ((\w+))/i
          ],
          [[VENDOR, lowerize], MODEL, [TYPE, strMapper, { "tablet": ["p10001l", "w7001"], "*": "mobile" }]],
          [
            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
          ],
          [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
          [
            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
          ],
          [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
          [
            // Ulefone
            /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Ulefone"], [TYPE, MOBILE]],
          [
            // Energizer
            /; (energy ?\w+)(?: bui|\))/i,
            /; energizer ([\w ]+)(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Energizer"], [TYPE, MOBILE]],
          [
            // Cat
            /; cat (b35);/i,
            /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Cat"], [TYPE, MOBILE]],
          [
            // Smartfren
            /((?:new )?andromax[\w- ]+)(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Smartfren"], [TYPE, MOBILE]],
          [
            // Nothing
            /droid.+; (a(?:015|06[35]|142p?))/i
          ],
          [MODEL, [VENDOR, "Nothing"], [TYPE, MOBILE]],
          [
            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
            // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron/Infinix/Tecno/Micromax/Advan
            /; (imo) ((?!tab)[\w ]+?)(?: bui|\))/i,
            // IMO
            /(hp) ([\w ]+\w)/i,
            // HP iPAQ
            /(asus)-?(\w+)/i,
            // Asus
            /(microsoft); (lumia[\w ]+)/i,
            // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,
            // Lenovo
            /(jolla)/i,
            // Jolla
            /(oppo) ?([\w ]+) bui/i
            // OPPO
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(imo) (tab \w+)/i,
            // IMO
            /(kobo)\s(ereader|touch)/i,
            // Kobo
            /(archos) (gamepad2?)/i,
            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            // HP TouchPad
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(nook)[\w ]+build\/(\w+)/i,
            // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,
            // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,
            // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i
            // Vodafone
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(surface duo)/i
            // Surface Duo
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
          [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i
            // Fairphone
          ],
          [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
          [
            /(u304aa)/i
            // AT&T
          ],
          [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
          [
            /\bsie-(\w*)/i
            // Siemens
          ],
          [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
          [
            /\b(rct\w+) b/i
            // RCA Tablets
          ],
          [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
          [
            /\b(venue[\d ]{2,7}) b/i
            // Dell Venue Tablets
          ],
          [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
          [
            /\b(q(?:mv|ta)\w+) b/i
            // Verizon Tablet
          ],
          [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
          [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
            // Barnes & Noble Tablet
          ],
          [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
          [
            /\b(tm\d{3}\w+) b/i
          ],
          [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
          [
            /\b(k88) b/i
            // ZTE K Series Tablet
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
          [
            /\b(nx\d{3}j) b/i
            // ZTE Nubia
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
          [
            /\b(gen\d{3}) b.+49h/i
            // Swiss GEN Mobile
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
          [
            /\b(zur\d{3}) b/i
            // Swiss ZUR Tablet
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
          [
            /\b((zeki)?tb.*\b) b/i
            // Zeki Tablets
          ],
          [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
          [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
            // Dragon Touch Tablet
          ],
          [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
          [
            /\b(ns-?\w{0,9}) b/i
            // Insignia Tablets
          ],
          [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
          [
            /\b((nxa|next)-?\w{0,9}) b/i
            // NextBook Tablets
          ],
          [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
          [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
            // Voice Xtreme Phones
          ],
          [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
          [
            /\b(lvtel\-)?(v1[12]) b/i
            // LvTel Phones
          ],
          [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
          [
            /\b(ph-1) /i
            // Essential PH-1
          ],
          [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
          [
            /\b(v(100md|700na|7011|917g).*\b) b/i
            // Envizen Tablets
          ],
          [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
          [
            /\b(trio[-\w\. ]+) b/i
            // MachSpeed Tablets
          ],
          [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
          [
            /\btu_(1491) b/i
            // Rotor Tablets
          ],
          [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
          [
            /(shield[\w ]+) b/i
            // Nvidia Shield Tablets
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
          [
            /(sprint) (\w+)/i
            // Sprint Phones
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kin\.[onetw]{3})/i
            // Microsoft Kin
          ],
          [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
          [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
            // Zebra
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
          [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
          [
            ///////////////////
            // SMARTTVS
            ///////////////////
            /smart-tv.+(samsung)/i
            // Samsung
          ],
          [VENDOR, [TYPE, SMARTTV]],
          [
            /hbbtv.+maple;(\d+)/i
          ],
          [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
          [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
            // LG SmartTV
          ],
          [[VENDOR, LG], [TYPE, SMARTTV]],
          [
            /(apple) ?tv/i
            // Apple TV
          ],
          [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
          [
            /crkey/i
            // Google Chromecast
          ],
          [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
          [
            /droid.+aft(\w+)( bui|\))/i
            // Fire TV
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
          [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i
            // Sharp
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
          [
            /(bravia[\w ]+)( bui|\))/i
            // Sony
          ],
          [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
          [
            /(mitv-\w{5}) bui/i
            // Xiaomi
          ],
          [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
          [
            /Hbbtv.*(technisat) (.*);/i
            // TechniSAT
          ],
          [VENDOR, MODEL, [TYPE, SMARTTV]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
            // HbbTV devices
          ],
          [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
          [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
            // SmartTV from Unidentified Vendors
          ],
          [[TYPE, SMARTTV]],
          [
            ///////////////////
            // CONSOLES
            ///////////////////
            /(ouya)/i,
            // Ouya
            /(nintendo) ([wids3utch]+)/i
            // Nintendo
          ],
          [VENDOR, MODEL, [TYPE, CONSOLE]],
          [
            /droid.+; (shield) bui/i
            // Nvidia
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
          [
            /(playstation [345portablevi]+)/i
            // Playstation
          ],
          [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
          [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
            // Microsoft Xbox
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
          [
            ///////////////////
            // WEARABLES
            ///////////////////
            /\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i
            // Samsung Galaxy Watch
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, WEARABLE]],
          [
            /((pebble))app/i
            // Pebble
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
            // Apple Watch
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]],
          [
            /droid.+; (glass) \d/i
            // Google Glass
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
          [
            /droid.+; (wt63?0{2,3})\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
          [
            ///////////////////
            // XR
            ///////////////////
            /droid.+; (glass) \d/i
            // Google Glass
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
          [
            /(pico) (4|neo3(?: link|pro)?)/i
            // Pico
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /; (quest( \d| pro)?)/i
            // Oculus Quest
          ],
          [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
          [
            ///////////////////
            // EMBEDDED
            ///////////////////
            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
            // Tesla
          ],
          [VENDOR, [TYPE, EMBEDDED]],
          [
            /(aeobc)\b/i
            // Echo Dot
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]],
          [
            ////////////////////
            // MIXED (GENERIC)
            ///////////////////
            /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i
            // Android Phones from Unidentified Vendors
          ],
          [MODEL, [TYPE, MOBILE]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
            // Android Tablets from Unidentified Vendors
          ],
          [MODEL, [TYPE, TABLET]],
          [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
            // Unidentifiable Tablet
          ],
          [[TYPE, TABLET]],
          [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
            // Unidentifiable Mobile
          ],
          [[TYPE, MOBILE]],
          [
            /(android[-\w\. ]{0,9});.+buil/i
            // Generic Android Device
          ],
          [MODEL, [VENDOR, "Generic"]]
        ],
        engine: [
          [
            /windows.+ edge\/([\w\.]+)/i
            // EdgeHTML
          ],
          [VERSION, [NAME, EDGE + "HTML"]],
          [
            /(arkweb)\/([\w\.]+)/i
            // ArkWeb
          ],
          [NAME, VERSION],
          [
            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
            // Blink
          ],
          [VERSION, [NAME, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
            // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna/Servo
            /ekioh(flow)\/([\w\.]+)/i,
            // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            // iCab
            /\b(libweb)/i
          ],
          [NAME, VERSION],
          [
            /rv\:([\w\.]{1,9})\b.+(gecko)/i
            // Gecko
          ],
          [VERSION, NAME]
        ],
        os: [
          [
            // Windows
            /microsoft (windows) (vista|xp)/i
            // Windows (iTunes)
          ],
          [NAME, VERSION],
          [
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i
            // Windows Phone
          ],
          [NAME, [VERSION, strMapper, windowsVersionMap]],
          [
            /windows nt 6\.2; (arm)/i,
            // Windows RT
            /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
          ],
          [[VERSION, strMapper, windowsVersionMap], [NAME, "Windows"]],
          [
            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
            // iOS
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i
          ],
          [[VERSION, /_/g, "."], [NAME, "iOS"]],
          [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
            // Mac OS
          ],
          [[NAME, MAC_OS], [VERSION, /_/g, "."]],
          [
            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
            // Android-x86/HarmonyOS
          ],
          [VERSION, NAME],
          [
            // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS/OpenHarmony
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish|openharmony)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,
            // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,
            // Tizen/KaiOS
            /\((series40);/i
            // Series 40
          ],
          [NAME, VERSION],
          [
            /\(bb(10);/i
            // BlackBerry 10
          ],
          [VERSION, [NAME, BLACKBERRY]],
          [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
            // Symbian
          ],
          [VERSION, [NAME, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
            // Firefox OS
          ],
          [VERSION, [NAME, FIREFOX + " OS"]],
          [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
            // WebOS
          ],
          [VERSION, [NAME, "webOS"]],
          [
            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
            // watchOS
          ],
          [VERSION, [NAME, "watchOS"]],
          [
            // Google Chromecast
            /crkey\/([\d\.]+)/i
            // Google Chromecast
          ],
          [VERSION, [NAME, CHROME + "cast"]],
          [
            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
            // Chromium OS
          ],
          [[NAME, CHROMIUM_OS], VERSION],
          [
            // Smart TVs
            /panasonic;(viera)/i,
            // Panasonic Viera
            /(netrange)mmh/i,
            // Netrange
            /(nettv)\/(\d+\.[\w\.]+)/i,
            // NetTV
            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,
            // Microsoft Xbox (360, One, X, S, Series X, Series S)
            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,
            // Mint
            /(mageia|vectorlinux)[; ]/i,
            // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,
            // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,
            // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i
            // Haiku
          ],
          [NAME, VERSION],
          [
            /(sunos) ?([\w\.\d]*)/i
            // Solaris
          ],
          [[NAME, "Solaris"], VERSION],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
            /(unix) ?([\w\.]*)/i
            // UNIX
          ],
          [NAME, VERSION]
        ]
      };
      var UAParser2 = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
          extensions = ua;
          ua = undefined2;
        }
        if (!(this instanceof UAParser2)) {
          return new UAParser2(ua, extensions).getResult();
        }
        var _navigator = typeof window2 !== UNDEF_TYPE && window2.navigator ? window2.navigator : undefined2;
        var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
        var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined2;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;
        this.getBrowser = function() {
          var _browser = {};
          _browser[NAME] = undefined2;
          _browser[VERSION] = undefined2;
          rgxMapper.call(_browser, _ua, _rgxmap.browser);
          _browser[MAJOR] = majorize(_browser[VERSION]);
          if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
            _browser[NAME] = "Brave";
          }
          return _browser;
        };
        this.getCPU = function() {
          var _cpu = {};
          _cpu[ARCHITECTURE] = undefined2;
          rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
          return _cpu;
        };
        this.getDevice = function() {
          var _device = {};
          _device[VENDOR] = undefined2;
          _device[MODEL] = undefined2;
          _device[TYPE] = undefined2;
          rgxMapper.call(_device, _ua, _rgxmap.device);
          if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
            _device[TYPE] = MOBILE;
          }
          if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
            _device[MODEL] = "iPad";
            _device[TYPE] = TABLET;
          }
          return _device;
        };
        this.getEngine = function() {
          var _engine = {};
          _engine[NAME] = undefined2;
          _engine[VERSION] = undefined2;
          rgxMapper.call(_engine, _ua, _rgxmap.engine);
          return _engine;
        };
        this.getOS = function() {
          var _os = {};
          _os[NAME] = undefined2;
          _os[VERSION] = undefined2;
          rgxMapper.call(_os, _ua, _rgxmap.os);
          if (_isSelfNav && !_os[NAME] && _uach && _uach.platform && _uach.platform != "Unknown") {
            _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS);
          }
          return _os;
        };
        this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function() {
          return _ua;
        };
        this.setUA = function(ua2) {
          _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
          return this;
        };
        this.setUA(_ua);
        return this;
      };
      UAParser2.VERSION = LIBVERSION;
      UAParser2.BROWSER = enumerize([NAME, VERSION, MAJOR]);
      UAParser2.CPU = enumerize([ARCHITECTURE]);
      UAParser2.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
      UAParser2.ENGINE = UAParser2.OS = enumerize([NAME, VERSION]);
      if (typeof exports !== UNDEF_TYPE) {
        if (typeof module !== UNDEF_TYPE && module.exports) {
          exports = module.exports = UAParser2;
        }
        exports.UAParser = UAParser2;
      } else {
        if (typeof define === FUNC_TYPE && define.amd) {
          define(function() {
            return UAParser2;
          });
        } else if (typeof window2 !== UNDEF_TYPE) {
          window2.UAParser = UAParser2;
        }
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser2();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua) {
          parser.setUA(ua);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : exports);
  }
});

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = "";
        for (var i2 = 0; i2 < arguments.length; i2++) {
          var arg = arguments[i2];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// node_modules/@tonconnect/ui-react/lib/index.js
var import_react = __toESM(require_react());

// node_modules/@tonconnect/protocol/lib/esm/index.mjs
var import_tweetnacl_util = __toESM(require_nacl_util(), 1);
var import_tweetnacl = __toESM(require_nacl_fast(), 1);
var CONNECT_EVENT_ERROR_CODES;
(function(CONNECT_EVENT_ERROR_CODES2) {
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["MANIFEST_NOT_FOUND_ERROR"] = 2] = "MANIFEST_NOT_FOUND_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["MANIFEST_CONTENT_ERROR"] = 3] = "MANIFEST_CONTENT_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(CONNECT_EVENT_ERROR_CODES || (CONNECT_EVENT_ERROR_CODES = {}));
var CONNECT_ITEM_ERROR_CODES;
(function(CONNECT_ITEM_ERROR_CODES2) {
  CONNECT_ITEM_ERROR_CODES2[CONNECT_ITEM_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  CONNECT_ITEM_ERROR_CODES2[CONNECT_ITEM_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(CONNECT_ITEM_ERROR_CODES || (CONNECT_ITEM_ERROR_CODES = {}));
var SEND_TRANSACTION_ERROR_CODES;
(function(SEND_TRANSACTION_ERROR_CODES2) {
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(SEND_TRANSACTION_ERROR_CODES || (SEND_TRANSACTION_ERROR_CODES = {}));
var SIGN_DATA_ERROR_CODES;
(function(SIGN_DATA_ERROR_CODES2) {
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(SIGN_DATA_ERROR_CODES || (SIGN_DATA_ERROR_CODES = {}));
var DISCONNECT_ERROR_CODES;
(function(DISCONNECT_ERROR_CODES2) {
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(DISCONNECT_ERROR_CODES || (DISCONNECT_ERROR_CODES = {}));
var CHAIN;
(function(CHAIN2) {
  CHAIN2["MAINNET"] = "-239";
  CHAIN2["TESTNET"] = "-3";
})(CHAIN || (CHAIN = {}));
function encodeUint8Array(value, urlSafe) {
  const encoded = import_tweetnacl_util.default.encodeBase64(value);
  if (!urlSafe) {
    return encoded;
  }
  return encodeURIComponent(encoded);
}
function decodeToUint8Array(value, urlSafe) {
  if (urlSafe) {
    value = decodeURIComponent(value);
  }
  return import_tweetnacl_util.default.decodeBase64(value);
}
function encode(value, urlSafe = false) {
  let uint8Array;
  if (value instanceof Uint8Array) {
    uint8Array = value;
  } else {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    uint8Array = import_tweetnacl_util.default.decodeUTF8(value);
  }
  return encodeUint8Array(uint8Array, urlSafe);
}
function decode(value, urlSafe = false) {
  const decodedUint8Array = decodeToUint8Array(value, urlSafe);
  return {
    toString() {
      return import_tweetnacl_util.default.encodeUTF8(decodedUint8Array);
    },
    toObject() {
      try {
        return JSON.parse(import_tweetnacl_util.default.encodeUTF8(decodedUint8Array));
      } catch (e2) {
        return null;
      }
    },
    toUint8Array() {
      return decodedUint8Array;
    }
  };
}
var Base64 = {
  encode,
  decode
};
function concatUint8Arrays(buffer1, buffer2) {
  const mergedArray = new Uint8Array(buffer1.length + buffer2.length);
  mergedArray.set(buffer1);
  mergedArray.set(buffer2, buffer1.length);
  return mergedArray;
}
function splitToUint8Arrays(array, index) {
  if (index >= array.length) {
    throw new Error("Index is out of buffer");
  }
  const subArray1 = array.slice(0, index);
  const subArray2 = array.slice(index);
  return [subArray1, subArray2];
}
function toHexString(byteArray) {
  let hexString = "";
  byteArray.forEach((byte) => {
    hexString += ("0" + (byte & 255).toString(16)).slice(-2);
  });
  return hexString;
}
function hexToByteArray(hexString) {
  if (hexString.length % 2 !== 0) {
    throw new Error(`Cannot convert ${hexString} to bytesArray`);
  }
  const result = new Uint8Array(hexString.length / 2);
  for (let i2 = 0; i2 < hexString.length; i2 += 2) {
    result[i2 / 2] = parseInt(hexString.slice(i2, i2 + 2), 16);
  }
  return result;
}
var SessionCrypto = class {
  constructor(keyPair) {
    this.nonceLength = 24;
    this.keyPair = keyPair ? this.createKeypairFromString(keyPair) : this.createKeypair();
    this.sessionId = toHexString(this.keyPair.publicKey);
  }
  createKeypair() {
    return import_tweetnacl.default.box.keyPair();
  }
  createKeypairFromString(keyPair) {
    return {
      publicKey: hexToByteArray(keyPair.publicKey),
      secretKey: hexToByteArray(keyPair.secretKey)
    };
  }
  createNonce() {
    return import_tweetnacl.default.randomBytes(this.nonceLength);
  }
  encrypt(message, receiverPublicKey) {
    const encodedMessage = new TextEncoder().encode(message);
    const nonce = this.createNonce();
    const encrypted = import_tweetnacl.default.box(encodedMessage, nonce, receiverPublicKey, this.keyPair.secretKey);
    return concatUint8Arrays(nonce, encrypted);
  }
  decrypt(message, senderPublicKey) {
    const [nonce, internalMessage] = splitToUint8Arrays(message, this.nonceLength);
    const decrypted = import_tweetnacl.default.box.open(internalMessage, nonce, senderPublicKey, this.keyPair.secretKey);
    if (!decrypted) {
      throw new Error(`Decryption error: 
 message: ${message.toString()} 
 sender pubkey: ${senderPublicKey.toString()} 
 keypair pubkey: ${this.keyPair.publicKey.toString()} 
 keypair secretkey: ${this.keyPair.secretKey.toString()}`);
    }
    return new TextDecoder().decode(decrypted);
  }
  stringifyKeypair() {
    return {
      publicKey: toHexString(this.keyPair.publicKey),
      secretKey: toHexString(this.keyPair.secretKey)
    };
  }
};

// node_modules/@tonconnect/isomorphic-eventsource/browser.js
{
}

// node_modules/@tonconnect/isomorphic-fetch/browser.js
{
}

// node_modules/@tonconnect/ui/node_modules/@tonconnect/sdk/lib/esm/index.mjs
function __rest(s2, e2) {
  var t2 = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
    t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
        t2[p2[i2]] = s2[p2[i2]];
    }
  return t2;
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
var TonConnectError = class _TonConnectError extends Error {
  constructor(message, options) {
    super(message, options);
    this.message = `${_TonConnectError.prefix} ${this.constructor.name}${this.info ? ": " + this.info : ""}${message ? "\n" + message : ""}`;
    Object.setPrototypeOf(this, _TonConnectError.prototype);
  }
  get info() {
    return "";
  }
};
TonConnectError.prefix = "[TON_CONNECT_SDK_ERROR]";
var DappMetadataError = class _DappMetadataError extends TonConnectError {
  get info() {
    return "Passed DappMetadata is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _DappMetadataError.prototype);
  }
};
var ManifestContentErrorError = class _ManifestContentErrorError extends TonConnectError {
  get info() {
    return "Passed `tonconnect-manifest.json` contains errors. Check format of your manifest. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _ManifestContentErrorError.prototype);
  }
};
var ManifestNotFoundError = class _ManifestNotFoundError extends TonConnectError {
  get info() {
    return "Manifest not found. Make sure you added `tonconnect-manifest.json` to the root of your app or passed correct manifestUrl. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _ManifestNotFoundError.prototype);
  }
};
var WalletAlreadyConnectedError = class _WalletAlreadyConnectedError extends TonConnectError {
  get info() {
    return "Wallet connection called but wallet already connected. To avoid the error, disconnect the wallet before doing a new connection.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WalletAlreadyConnectedError.prototype);
  }
};
var WalletNotConnectedError = class _WalletNotConnectedError extends TonConnectError {
  get info() {
    return "Send transaction or other protocol methods called while wallet is not connected.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WalletNotConnectedError.prototype);
  }
};
function isWalletConnectionSourceJS(value) {
  return "jsBridgeKey" in value;
}
var UserRejectsError = class _UserRejectsError extends TonConnectError {
  get info() {
    return "User rejects the action in the wallet.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _UserRejectsError.prototype);
  }
};
var BadRequestError = class _BadRequestError extends TonConnectError {
  get info() {
    return "Request to the wallet contains errors.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _BadRequestError.prototype);
  }
};
var UnknownAppError = class _UnknownAppError extends TonConnectError {
  get info() {
    return "App tries to send rpc request to the injected wallet while not connected.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _UnknownAppError.prototype);
  }
};
var WalletNotInjectedError = class _WalletNotInjectedError extends TonConnectError {
  get info() {
    return "There is an attempt to connect to the injected wallet while it is not exists in the webpage.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WalletNotInjectedError.prototype);
  }
};
var LocalstorageNotFoundError = class _LocalstorageNotFoundError extends TonConnectError {
  get info() {
    return "Storage was not specified in the `DappMetadata` and default `localStorage` was not detected in the environment.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _LocalstorageNotFoundError.prototype);
  }
};
var FetchWalletsError = class _FetchWalletsError extends TonConnectError {
  get info() {
    return "An error occurred while fetching the wallets list.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _FetchWalletsError.prototype);
  }
};
var WrongAddressError = class _WrongAddressError extends TonConnectError {
  get info() {
    return "Passed address is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WrongAddressError.prototype);
  }
};
var ParseHexError = class _ParseHexError extends TonConnectError {
  get info() {
    return "Passed hex is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _ParseHexError.prototype);
  }
};
var UnknownError = class _UnknownError extends TonConnectError {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _UnknownError.prototype);
  }
};
var connectEventErrorsCodes = {
  [CONNECT_EVENT_ERROR_CODES.UNKNOWN_ERROR]: UnknownError,
  [CONNECT_EVENT_ERROR_CODES.USER_REJECTS_ERROR]: UserRejectsError,
  [CONNECT_EVENT_ERROR_CODES.BAD_REQUEST_ERROR]: BadRequestError,
  [CONNECT_EVENT_ERROR_CODES.UNKNOWN_APP_ERROR]: UnknownAppError,
  [CONNECT_EVENT_ERROR_CODES.MANIFEST_NOT_FOUND_ERROR]: ManifestNotFoundError,
  [CONNECT_EVENT_ERROR_CODES.MANIFEST_CONTENT_ERROR]: ManifestContentErrorError
};
var ConnectErrorsParser = class {
  parseError(error) {
    let ErrorConstructor = UnknownError;
    if (error.code in connectEventErrorsCodes) {
      ErrorConstructor = connectEventErrorsCodes[error.code] || UnknownError;
    }
    return new ErrorConstructor(error.message);
  }
};
var connectErrorsParser = new ConnectErrorsParser();
var RpcParser = class {
  isError(response) {
    return "error" in response;
  }
};
var sendTransactionErrors = {
  [SEND_TRANSACTION_ERROR_CODES.UNKNOWN_ERROR]: UnknownError,
  [SEND_TRANSACTION_ERROR_CODES.USER_REJECTS_ERROR]: UserRejectsError,
  [SEND_TRANSACTION_ERROR_CODES.BAD_REQUEST_ERROR]: BadRequestError,
  [SEND_TRANSACTION_ERROR_CODES.UNKNOWN_APP_ERROR]: UnknownAppError
};
var SendTransactionParser = class extends RpcParser {
  convertToRpcRequest(request) {
    return {
      method: "sendTransaction",
      params: [JSON.stringify(request)]
    };
  }
  parseAndThrowError(response) {
    let ErrorConstructor = UnknownError;
    if (response.error.code in sendTransactionErrors) {
      ErrorConstructor = sendTransactionErrors[response.error.code] || UnknownError;
    }
    throw new ErrorConstructor(response.error.message);
  }
  convertFromRpcResponse(rpcResponse) {
    return {
      boc: rpcResponse.result
    };
  }
};
var sendTransactionParser = new SendTransactionParser();
var HttpBridgeGatewayStorage = class {
  constructor(storage, bridgeUrl) {
    this.storage = storage;
    this.storeKey = "ton-connect-storage_http-bridge-gateway::" + bridgeUrl;
  }
  storeLastEventId(lastEventId) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.setItem(this.storeKey, lastEventId);
    });
  }
  removeLastEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.removeItem(this.storeKey);
    });
  }
  getLastEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      return stored;
    });
  }
};
function removeUrlLastSlash(url) {
  if (url.slice(-1) === "/") {
    return url.slice(0, -1);
  }
  return url;
}
function addPathToUrl(url, path) {
  return removeUrlLastSlash(url) + "/" + path;
}
function isTelegramUrl(link) {
  const url = new URL(link);
  return url.protocol === "tg:" || url.hostname === "t.me";
}
var BridgeGateway = class {
  constructor(storage, bridgeUrl, sessionId, listener, errorsListener) {
    this.bridgeUrl = bridgeUrl;
    this.sessionId = sessionId;
    this.listener = listener;
    this.errorsListener = errorsListener;
    this.ssePath = "events";
    this.postPath = "message";
    this.heartbeatMessage = "heartbeat";
    this.defaultTtl = 300;
    this.isClosed = false;
    this.bridgeGatewayStorage = new HttpBridgeGatewayStorage(storage, bridgeUrl);
  }
  registerSession() {
    return __awaiter(this, void 0, void 0, function* () {
      const url = new URL(addPathToUrl(this.bridgeUrl, this.ssePath));
      url.searchParams.append("client_id", this.sessionId);
      const lastEventId = yield this.bridgeGatewayStorage.getLastEventId();
      if (this.isClosed) {
        return;
      }
      if (lastEventId) {
        url.searchParams.append("last_event_id", lastEventId);
      }
      this.eventSource = new EventSource(url.toString());
      return new Promise((resolve, reject) => {
        this.eventSource.onerror = reject;
        this.eventSource.onopen = () => {
          this.eventSource.onerror = this.errorsHandler.bind(this);
          this.eventSource.onmessage = this.messagesHandler.bind(this);
          resolve();
        };
      });
    });
  }
  send(message, receiver, topic, ttl) {
    return __awaiter(this, void 0, void 0, function* () {
      const url = new URL(addPathToUrl(this.bridgeUrl, this.postPath));
      url.searchParams.append("client_id", this.sessionId);
      url.searchParams.append("to", receiver);
      url.searchParams.append("ttl", (ttl || this.defaultTtl).toString());
      url.searchParams.append("topic", topic);
      yield fetch(url, {
        method: "post",
        body: Base64.encode(message)
      });
    });
  }
  pause() {
    var _a;
    (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.close();
  }
  unPause() {
    return this.registerSession();
  }
  close() {
    var _a;
    this.isClosed = true;
    (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.close();
  }
  setListener(listener) {
    this.listener = listener;
  }
  setErrorsListener(errorsListener) {
    this.errorsListener = errorsListener;
  }
  errorsHandler(e2) {
    var _a, _b;
    if (!this.isClosed) {
      if (((_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.readyState) === EventSource.CLOSED) {
        this.eventSource.close();
        this.registerSession();
        return;
      }
      if (((_b = this.eventSource) === null || _b === void 0 ? void 0 : _b.readyState) === EventSource.CONNECTING) {
        console.debug("[TON_CONNET_SDK_ERROR]: Bridge error", JSON.stringify(e2));
        return;
      }
      this.errorsListener(e2);
    }
  }
  messagesHandler(e2) {
    return __awaiter(this, void 0, void 0, function* () {
      if (e2.data === this.heartbeatMessage) {
        return;
      }
      yield this.bridgeGatewayStorage.storeLastEventId(e2.lastEventId);
      if (!this.isClosed) {
        let bridgeIncomingMessage;
        try {
          bridgeIncomingMessage = JSON.parse(e2.data);
        } catch (e3) {
          throw new TonConnectError(`Bridge message parse failed, message ${e3.data}`);
        }
        this.listener(bridgeIncomingMessage);
      }
    });
  }
};
var BridgeConnectionStorage = class {
  constructor(storage) {
    this.storage = storage;
    this.storeKey = "ton-connect-storage_bridge-connection";
  }
  storeConnection(connection) {
    return __awaiter(this, void 0, void 0, function* () {
      if (connection.type === "injected") {
        return this.storage.setItem(this.storeKey, JSON.stringify(connection));
      }
      const rawSession = {
        sessionKeyPair: connection.session.sessionCrypto.stringifyKeypair(),
        walletPublicKey: connection.session.walletPublicKey,
        bridgeUrl: connection.session.bridgeUrl
      };
      const rawConnection = {
        type: "http",
        connectEvent: connection.connectEvent,
        session: rawSession,
        lastWalletEventId: connection.lastWalletEventId,
        nextRpcRequestId: connection.nextRpcRequestId
      };
      return this.storage.setItem(this.storeKey, JSON.stringify(rawConnection));
    });
  }
  removeConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.removeItem(this.storeKey);
    });
  }
  getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      const connection = JSON.parse(stored);
      if (connection.type === "injected") {
        return connection;
      }
      const sessionCrypto = new SessionCrypto(connection.session.sessionKeyPair);
      return {
        type: "http",
        connectEvent: connection.connectEvent,
        lastWalletEventId: connection.lastWalletEventId,
        nextRpcRequestId: connection.nextRpcRequestId,
        session: {
          sessionCrypto,
          bridgeUrl: connection.session.bridgeUrl,
          walletPublicKey: connection.session.walletPublicKey
        }
      };
    });
  }
  getHttpConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (!connection) {
        throw new TonConnectError("Trying to read HTTP connection source while nothing is stored");
      }
      if (connection.type === "injected") {
        throw new TonConnectError("Trying to read HTTP connection source while injected connection is stored");
      }
      return connection;
    });
  }
  getInjectedConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (!connection) {
        throw new TonConnectError("Trying to read Injected bridge connection source while nothing is stored");
      }
      if ((connection === null || connection === void 0 ? void 0 : connection.type) === "http") {
        throw new TonConnectError("Trying to read Injected bridge connection source while HTTP connection is stored");
      }
      return connection;
    });
  }
  storedConnectionType() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      const connection = JSON.parse(stored);
      return connection.type;
    });
  }
  storeLastWalletEventId(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && connection.type === "http") {
        connection.lastWalletEventId = id;
        return this.storeConnection(connection);
      }
    });
  }
  getLastWalletEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && "lastWalletEventId" in connection) {
        return connection.lastWalletEventId;
      }
      return void 0;
    });
  }
  increaseNextRpcRequestId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection) {
        const lastId = connection.nextRpcRequestId || 0;
        connection.nextRpcRequestId = lastId + 1;
        return this.storeConnection(connection);
      }
    });
  }
  getNextRpcRequestId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection) {
        return connection.nextRpcRequestId || 0;
      }
      return 0;
    });
  }
};
var PROTOCOL_VERSION = 2;
function logDebug(...args) {
  {
    try {
      console.debug("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
function logError(...args) {
  {
    try {
      console.error("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
function logWarning(...args) {
  {
    try {
      console.warn("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
var BridgeProvider = class _BridgeProvider {
  constructor(storage, walletConnectionSource) {
    this.storage = storage;
    this.walletConnectionSource = walletConnectionSource;
    this.type = "http";
    this.standardUniversalLink = "tc://";
    this.pendingRequests = /* @__PURE__ */ new Map();
    this.session = null;
    this.gateway = null;
    this.pendingGateways = [];
    this.listeners = [];
    this.connectionStorage = new BridgeConnectionStorage(storage);
  }
  static fromStorage(storage) {
    return __awaiter(this, void 0, void 0, function* () {
      const bridgeConnectionStorage = new BridgeConnectionStorage(storage);
      const connection = yield bridgeConnectionStorage.getHttpConnection();
      return new _BridgeProvider(storage, { bridgeUrl: connection.session.bridgeUrl });
    });
  }
  connect(message) {
    this.closeGateways();
    const sessionCrypto = new SessionCrypto();
    let bridgeUrl = "";
    let universalLink = this.standardUniversalLink;
    if (Array.isArray(this.walletConnectionSource)) {
      this.pendingGateways = this.walletConnectionSource.map((source) => {
        const gateway = new BridgeGateway(this.storage, source.bridgeUrl, sessionCrypto.sessionId, () => {
        }, (e2) => {
          console.error(e2);
        });
        gateway.setListener((message2) => this.pendingGatewaysListener(gateway, source.bridgeUrl, message2));
        return gateway;
      });
      this.pendingGateways.forEach((bridge) => bridge.registerSession());
    } else {
      bridgeUrl = this.walletConnectionSource.bridgeUrl;
      if (this.walletConnectionSource.universalLink) {
        universalLink = this.walletConnectionSource.universalLink;
      }
      this.gateway = new BridgeGateway(this.storage, this.walletConnectionSource.bridgeUrl, sessionCrypto.sessionId, this.gatewayListener.bind(this), this.gatewayErrorsListener.bind(this));
      this.gateway.registerSession();
    }
    this.session = {
      sessionCrypto,
      bridgeUrl
    };
    return this.generateUniversalLink(universalLink, message);
  }
  restoreConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      if (Array.isArray(this.walletConnectionSource)) {
        throw new TonConnectError("Internal error. Connection source is array while WalletConnectionSourceHTTP was expected.");
      }
      this.closeGateways();
      const storedConnection = yield this.connectionStorage.getHttpConnection();
      if (!storedConnection) {
        return;
      }
      this.session = storedConnection.session;
      this.gateway = new BridgeGateway(this.storage, this.walletConnectionSource.bridgeUrl, storedConnection.session.sessionCrypto.sessionId, this.gatewayListener.bind(this), this.gatewayErrorsListener.bind(this));
      yield this.gateway.registerSession();
      this.listeners.forEach((listener) => listener(storedConnection.connectEvent));
    });
  }
  sendRequest(request, onRequestSent) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      if (!this.gateway || !this.session || !("walletPublicKey" in this.session)) {
        throw new TonConnectError("Trying to send bridge request without session");
      }
      const id = (yield this.connectionStorage.getNextRpcRequestId()).toString();
      yield this.connectionStorage.increaseNextRpcRequestId();
      logDebug("Send http-bridge request:", Object.assign(Object.assign({}, request), { id }));
      const encodedRequest = this.session.sessionCrypto.encrypt(JSON.stringify(Object.assign(Object.assign({}, request), { id })), hexToByteArray(this.session.walletPublicKey));
      this.gateway.send(encodedRequest, this.session.walletPublicKey, request.method).catch(reject);
      this.pendingRequests.set(id.toString(), resolve);
      onRequestSent === null || onRequestSent === void 0 ? void 0 : onRequestSent();
    }));
  }
  closeConnection() {
    this.closeGateways();
    this.listeners = [];
    this.session = null;
    this.gateway = null;
  }
  disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let called = false;
        const onRequestSent = () => {
          called = true;
          this.removeBridgeAndSession().then(resolve);
        };
        try {
          yield this.sendRequest({ method: "disconnect", params: [] }, onRequestSent);
        } catch (e2) {
          console.debug(e2);
          if (!called) {
            this.removeBridgeAndSession().then(resolve);
          }
        }
      }));
    });
  }
  listen(callback) {
    this.listeners.push(callback);
    return () => this.listeners = this.listeners.filter((listener) => listener !== callback);
  }
  pause() {
    var _a;
    (_a = this.gateway) === null || _a === void 0 ? void 0 : _a.pause();
    this.pendingGateways.forEach((bridge) => bridge.pause());
  }
  unPause() {
    return __awaiter(this, void 0, void 0, function* () {
      const promises = this.pendingGateways.map((bridge) => bridge.unPause());
      if (this.gateway) {
        promises.push(this.gateway.unPause());
      }
      yield Promise.all(promises);
    });
  }
  pendingGatewaysListener(gateway, bridgeUrl, bridgeIncomingMessage) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.pendingGateways.includes(gateway)) {
        gateway.close();
        return;
      }
      this.closeGateways({ except: gateway });
      this.session.bridgeUrl = bridgeUrl;
      this.gateway = gateway;
      this.gateway.setErrorsListener(this.gatewayErrorsListener.bind(this));
      this.gateway.setListener(this.gatewayListener.bind(this));
      return this.gatewayListener(bridgeIncomingMessage);
    });
  }
  gatewayListener(bridgeIncomingMessage) {
    return __awaiter(this, void 0, void 0, function* () {
      const walletMessage = JSON.parse(this.session.sessionCrypto.decrypt(Base64.decode(bridgeIncomingMessage.message).toUint8Array(), hexToByteArray(bridgeIncomingMessage.from)));
      logDebug("Wallet message received:", walletMessage);
      if (!("event" in walletMessage)) {
        const id = walletMessage.id.toString();
        const resolve = this.pendingRequests.get(id);
        if (!resolve) {
          logDebug(`Response id ${id} doesn't match any request's id`);
          return;
        }
        resolve(walletMessage);
        this.pendingRequests.delete(id);
        return;
      }
      if (walletMessage.id !== void 0) {
        const lastId = yield this.connectionStorage.getLastWalletEventId();
        if (lastId !== void 0 && walletMessage.id <= lastId) {
          logError(`Received event id (=${walletMessage.id}) must be greater than stored last wallet event id (=${lastId}) `);
          return;
        }
        if (walletMessage.event !== "connect") {
          yield this.connectionStorage.storeLastWalletEventId(walletMessage.id);
        }
      }
      const listeners = this.listeners;
      if (walletMessage.event === "connect") {
        yield this.updateSession(walletMessage, bridgeIncomingMessage.from);
      }
      if (walletMessage.event === "disconnect") {
        yield this.removeBridgeAndSession();
      }
      listeners.forEach((listener) => listener(walletMessage));
    });
  }
  gatewayErrorsListener(e2) {
    return __awaiter(this, void 0, void 0, function* () {
      throw new TonConnectError(`Bridge error ${JSON.stringify(e2)}`);
    });
  }
  updateSession(connectEvent, walletPublicKey) {
    return __awaiter(this, void 0, void 0, function* () {
      this.session = Object.assign(Object.assign({}, this.session), { walletPublicKey });
      const tonAddrItem = connectEvent.payload.items.find((item) => item.name === "ton_addr");
      const connectEventToSave = Object.assign(Object.assign({}, connectEvent), { payload: Object.assign(Object.assign({}, connectEvent.payload), { items: [tonAddrItem] }) });
      yield this.connectionStorage.storeConnection({
        type: "http",
        session: this.session,
        lastWalletEventId: connectEvent.id,
        connectEvent: connectEventToSave,
        nextRpcRequestId: 0
      });
    });
  }
  removeBridgeAndSession() {
    return __awaiter(this, void 0, void 0, function* () {
      this.closeConnection();
      yield this.connectionStorage.removeConnection();
    });
  }
  generateUniversalLink(universalLink, message) {
    if (isTelegramUrl(universalLink)) {
      return this.generateTGUniversalLink(universalLink, message);
    }
    return this.generateRegularUniversalLink(universalLink, message);
  }
  generateRegularUniversalLink(universalLink, message) {
    const url = new URL(universalLink);
    url.searchParams.append("v", PROTOCOL_VERSION.toString());
    url.searchParams.append("id", this.session.sessionCrypto.sessionId);
    url.searchParams.append("r", JSON.stringify(message));
    return url.toString();
  }
  generateTGUniversalLink(universalLink, message) {
    const urlToWrap = this.generateRegularUniversalLink("about:blank", message);
    const linkParams = urlToWrap.split("?")[1];
    const startattach = "tonconnect-" + linkParams.replaceAll(".", "%2E").replaceAll("-", "%2D").replaceAll("_", "%5F").replaceAll("&", "-").replaceAll("=", "__").replaceAll("%", "--");
    const url = new URL(universalLink);
    url.searchParams.append("startattach", startattach);
    return url.toString();
  }
  closeGateways(options) {
    var _a;
    (_a = this.gateway) === null || _a === void 0 ? void 0 : _a.close();
    this.pendingGateways.filter((item) => item !== (options === null || options === void 0 ? void 0 : options.except)).forEach((bridge) => bridge.close());
    this.pendingGateways = [];
  }
};
function hasProperty(value, propertyKey) {
  return hasProperties(value, [propertyKey]);
}
function hasProperties(value, propertyKeys) {
  if (!value || typeof value !== "object") {
    return false;
  }
  return propertyKeys.every((propertyKey) => propertyKey in value);
}
function isJSBridgeWithMetadata(value) {
  try {
    if (!hasProperty(value, "tonconnect") || !hasProperty(value.tonconnect, "walletInfo")) {
      return false;
    }
    return hasProperties(value.tonconnect.walletInfo, [
      "name",
      "app_name",
      "image",
      "about_url",
      "platforms"
    ]);
  } catch (_a) {
    return false;
  }
}
function getWindow() {
  if (typeof window === "undefined") {
    return void 0;
  }
  return window;
}
function getDocument() {
  if (typeof document === "undefined") {
    return void 0;
  }
  return document;
}
function getWebPageManifest() {
  var _a;
  const origin = (_a = getWindow()) === null || _a === void 0 ? void 0 : _a.location.origin;
  if (origin) {
    return origin + "/tonconnect-manifest.json";
  }
  return "";
}
var InjectedProvider = class _InjectedProvider {
  constructor(storage, injectedWalletKey) {
    this.injectedWalletKey = injectedWalletKey;
    this.type = "injected";
    this.unsubscribeCallback = null;
    this.listenSubscriptions = false;
    this.listeners = [];
    const window2 = _InjectedProvider.window;
    if (!_InjectedProvider.isWindowContainsWallet(window2, injectedWalletKey)) {
      throw new WalletNotInjectedError();
    }
    this.connectionStorage = new BridgeConnectionStorage(storage);
    this.injectedWallet = window2[injectedWalletKey].tonconnect;
  }
  static fromStorage(storage) {
    return __awaiter(this, void 0, void 0, function* () {
      const bridgeConnectionStorage = new BridgeConnectionStorage(storage);
      const connection = yield bridgeConnectionStorage.getInjectedConnection();
      return new _InjectedProvider(storage, connection.jsBridgeKey);
    });
  }
  static isWalletInjected(injectedWalletKey) {
    return _InjectedProvider.isWindowContainsWallet(this.window, injectedWalletKey);
  }
  static isInsideWalletBrowser(injectedWalletKey) {
    if (_InjectedProvider.isWindowContainsWallet(this.window, injectedWalletKey)) {
      return this.window[injectedWalletKey].tonconnect.isWalletBrowser;
    }
    return false;
  }
  static getCurrentlyInjectedWallets() {
    if (!this.window) {
      return [];
    }
    const wallets = Object.entries(this.window).filter(([_, value]) => isJSBridgeWithMetadata(value));
    return wallets.map(([jsBridgeKey, wallet]) => ({
      name: wallet.tonconnect.walletInfo.name,
      appName: wallet.tonconnect.walletInfo.app_name,
      aboutUrl: wallet.tonconnect.walletInfo.about_url,
      imageUrl: wallet.tonconnect.walletInfo.image,
      tondns: wallet.tonconnect.walletInfo.tondns,
      jsBridgeKey,
      injected: true,
      embedded: wallet.tonconnect.isWalletBrowser,
      platforms: wallet.tonconnect.walletInfo.platforms
    }));
  }
  static isWindowContainsWallet(window2, injectedWalletKey) {
    return !!window2 && injectedWalletKey in window2 && typeof window2[injectedWalletKey] === "object" && "tonconnect" in window2[injectedWalletKey];
  }
  connect(message) {
    this._connect(PROTOCOL_VERSION, message);
  }
  restoreConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        logDebug(`Injected Provider restoring connection...`);
        const connectEvent = yield this.injectedWallet.restoreConnection();
        logDebug("Injected Provider restoring connection response", connectEvent);
        if (connectEvent.event === "connect") {
          this.makeSubscriptions();
          this.listeners.forEach((listener) => listener(connectEvent));
        } else {
          yield this.connectionStorage.removeConnection();
        }
      } catch (e2) {
        yield this.connectionStorage.removeConnection();
        console.error(e2);
      }
    });
  }
  closeConnection() {
    if (this.listenSubscriptions) {
      this.injectedWallet.disconnect();
    }
    this.closeAllListeners();
  }
  disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => {
        const onRequestSent = () => {
          this.closeAllListeners();
          this.connectionStorage.removeConnection().then(resolve);
        };
        try {
          this.injectedWallet.disconnect();
          onRequestSent();
        } catch (e2) {
          logDebug(e2);
          this.sendRequest({
            method: "disconnect",
            params: []
          }, onRequestSent);
        }
      });
    });
  }
  closeAllListeners() {
    var _a;
    this.listenSubscriptions = false;
    this.listeners = [];
    (_a = this.unsubscribeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
  }
  listen(eventsCallback) {
    this.listeners.push(eventsCallback);
    return () => this.listeners = this.listeners.filter((listener) => listener !== eventsCallback);
  }
  sendRequest(request, onRequestSent) {
    return __awaiter(this, void 0, void 0, function* () {
      const id = (yield this.connectionStorage.getNextRpcRequestId()).toString();
      yield this.connectionStorage.increaseNextRpcRequestId();
      logDebug("Send injected-bridge request:", Object.assign(Object.assign({}, request), { id }));
      const result = this.injectedWallet.send(Object.assign(Object.assign({}, request), { id }));
      result.then((response) => logDebug("Wallet message received:", response));
      onRequestSent === null || onRequestSent === void 0 ? void 0 : onRequestSent();
      return result;
    });
  }
  _connect(protocolVersion, message) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        logDebug(`Injected Provider connect request: protocolVersion: ${protocolVersion}, message:`, message);
        const connectEvent = yield this.injectedWallet.connect(protocolVersion, message);
        logDebug("Injected Provider connect response:", connectEvent);
        if (connectEvent.event === "connect") {
          yield this.updateSession();
          this.makeSubscriptions();
        }
        this.listeners.forEach((listener) => listener(connectEvent));
      } catch (e2) {
        logDebug(e2);
        const connectEventError = {
          event: "connect_error",
          payload: {
            code: 0,
            message: e2 === null || e2 === void 0 ? void 0 : e2.toString()
          }
        };
        this.listeners.forEach((listener) => listener(connectEventError));
      }
    });
  }
  makeSubscriptions() {
    this.listenSubscriptions = true;
    this.unsubscribeCallback = this.injectedWallet.listen((e2) => {
      logDebug("Wallet message received:", e2);
      if (this.listenSubscriptions) {
        this.listeners.forEach((listener) => listener(e2));
      }
      if (e2.event === "disconnect") {
        this.disconnect();
      }
    });
  }
  updateSession() {
    return this.connectionStorage.storeConnection({
      type: "injected",
      jsBridgeKey: this.injectedWalletKey,
      nextRpcRequestId: 0
    });
  }
};
InjectedProvider.window = getWindow();
var DefaultStorage = class {
  constructor() {
    const window2 = getWindow();
    if (!(window2 === null || window2 === void 0 ? void 0 : window2.localStorage)) {
      throw new LocalstorageNotFoundError();
    }
    this.window = window2;
  }
  getItem(key) {
    return __awaiter(this, void 0, void 0, function* () {
      return Promise.resolve(this.window.localStorage.getItem(key));
    });
  }
  removeItem(key) {
    return __awaiter(this, void 0, void 0, function* () {
      this.window.localStorage.removeItem(key);
      return Promise.resolve();
    });
  }
  setItem(key, value) {
    this.window.localStorage.setItem(key, value);
    return Promise.resolve();
  }
};
function isWalletInfoCurrentlyInjected(value) {
  return isWalletInfoInjectable(value) && value.injected;
}
function isWalletInfoCurrentlyEmbedded(value) {
  return isWalletInfoCurrentlyInjected(value) && value.embedded;
}
function isWalletInfoInjectable(value) {
  return "jsBridgeKey" in value;
}
function isWalletInfoRemote(value) {
  return "bridgeUrl" in value;
}
function isWalletInfoInjected(value) {
  return "jsBridgeKey" in value;
}
var FALLBACK_WALLETS_LIST = [
  {
    app_name: "tonkeeper",
    name: "Tonkeeper",
    image: "https://tonkeeper.com/assets/tonconnect-icon.png",
    tondns: "tonkeeper.ton",
    about_url: "https://tonkeeper.com",
    universal_url: "https://app.tonkeeper.com/ton-connect",
    bridge: [
      {
        type: "sse",
        url: "https://bridge.tonapi.io/bridge"
      },
      {
        type: "js",
        key: "tonkeeper"
      }
    ],
    platforms: ["ios", "android", "chrome", "firefox"]
  },
  {
    app_name: "openmask",
    name: "OpenMask",
    image: "https://raw.githubusercontent.com/OpenProduct/openmask-extension/main/public/openmask-logo-288.png",
    about_url: "https://www.openmask.app/",
    bridge: [
      {
        type: "js",
        key: "openmask"
      }
    ],
    platforms: ["chrome"]
  },
  {
    app_name: "mytonwallet",
    name: "MyTonWallet",
    image: "https://mytonwallet.io/icon-256.png",
    about_url: "https://mytonwallet.io",
    universal_url: "https://connect.mytonwallet.org",
    bridge: [
      {
        type: "js",
        key: "mytonwallet"
      },
      {
        type: "sse",
        url: "https://tonconnectbridge.mytonwallet.org/bridge/"
      }
    ],
    platforms: ["chrome", "windows", "macos", "linux"]
  },
  {
    app_name: "tonhub",
    name: "Tonhub",
    image: "https://tonhub.com/tonconnect_logo.png",
    about_url: "https://tonhub.com",
    universal_url: "https://tonhub.com/ton-connect",
    bridge: [
      {
        type: "js",
        key: "tonhub"
      },
      {
        type: "sse",
        url: "https://connect.tonhubapi.com/tonconnect"
      }
    ],
    platforms: ["ios", "android"]
  },
  {
    app_name: "tonflow",
    name: "TonFlow",
    image: "https://tonflow.net/assets/images/tonflow_ico_192.png",
    about_url: "https://tonflow.net",
    bridge: [
      {
        type: "js",
        key: "tonflow"
      }
    ],
    platforms: ["chrome"]
  },
  {
    app_name: "dewallet",
    name: "DeWallet",
    image: "https://app.delabwallet.com/logo_black.png",
    about_url: "https://delabwallet.com",
    bridge: [
      {
        type: "js",
        key: "dewallet"
      }
    ],
    platforms: ["chrome"]
  },
  {
    app_name: "xtonwallet",
    name: "XTONWallet",
    image: "https://xtonwallet.com/assets/img/icon-256-back.png",
    about_url: "https://xtonwallet.com",
    bridge: [
      {
        type: "js",
        key: "xtonwallet"
      }
    ],
    platforms: ["chrome", "firefox"]
  },
  {
    app_name: "tonwallet",
    name: "TON Wallet",
    image: "https://wallet.ton.org/assets/ui/qr-logo.png",
    about_url: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
    bridge: [
      {
        type: "js",
        key: "tonwallet"
      }
    ],
    platforms: ["chrome"]
  }
];
var WalletsListManager = class {
  constructor(options) {
    this.walletsListCache = null;
    this.walletsListCacheCreationTimestamp = null;
    this.walletsListSource = "https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets.json";
    if (options === null || options === void 0 ? void 0 : options.walletsListSource) {
      this.walletsListSource = options.walletsListSource;
    }
    if (options === null || options === void 0 ? void 0 : options.cacheTTLMs) {
      this.cacheTTLMs = options.cacheTTLMs;
    }
  }
  getWallets() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.cacheTTLMs && this.walletsListCacheCreationTimestamp && Date.now() > this.walletsListCacheCreationTimestamp + this.cacheTTLMs) {
        this.walletsListCache = null;
      }
      if (!this.walletsListCache) {
        this.walletsListCache = this.fetchWalletsList();
        this.walletsListCache.then(() => {
          this.walletsListCacheCreationTimestamp = Date.now();
        }).catch(() => {
          this.walletsListCache = null;
          this.walletsListCacheCreationTimestamp = null;
        });
      }
      return this.walletsListCache;
    });
  }
  getEmbeddedWallet() {
    return __awaiter(this, void 0, void 0, function* () {
      const walletsList = yield this.getWallets();
      const embeddedWallets = walletsList.filter(isWalletInfoCurrentlyEmbedded);
      if (embeddedWallets.length !== 1) {
        return null;
      }
      return embeddedWallets[0];
    });
  }
  fetchWalletsList() {
    return __awaiter(this, void 0, void 0, function* () {
      let walletsList = [];
      try {
        const walletsResponse = yield fetch(this.walletsListSource);
        walletsList = yield walletsResponse.json();
        if (!Array.isArray(walletsList)) {
          throw new FetchWalletsError("Wrong wallets list format, wallets list must be an array.");
        }
        const wrongFormatWallets = walletsList.filter((wallet) => !this.isCorrectWalletConfigDTO(wallet));
        if (wrongFormatWallets.length) {
          logError(`Wallet(s) ${wrongFormatWallets.map((wallet) => wallet.name).join(", ")} config format is wrong. They were removed from the wallets list.`);
          walletsList = walletsList.filter((wallet) => this.isCorrectWalletConfigDTO(wallet));
        }
      } catch (e2) {
        logError(e2);
        walletsList = FALLBACK_WALLETS_LIST;
      }
      let currentlyInjectedWallets = [];
      try {
        currentlyInjectedWallets = InjectedProvider.getCurrentlyInjectedWallets();
      } catch (e2) {
        logError(e2);
      }
      return this.mergeWalletsLists(this.walletConfigDTOListToWalletConfigList(walletsList), currentlyInjectedWallets);
    });
  }
  walletConfigDTOListToWalletConfigList(walletConfigDTO) {
    return walletConfigDTO.map((walletConfigDTO2) => {
      const walletConfigBase = {
        name: walletConfigDTO2.name,
        appName: walletConfigDTO2.app_name,
        imageUrl: walletConfigDTO2.image,
        aboutUrl: walletConfigDTO2.about_url,
        tondns: walletConfigDTO2.tondns,
        platforms: walletConfigDTO2.platforms
      };
      const walletConfig = walletConfigBase;
      walletConfigDTO2.bridge.forEach((bridge) => {
        if (bridge.type === "sse") {
          walletConfig.bridgeUrl = bridge.url;
          walletConfig.universalLink = walletConfigDTO2.universal_url;
          walletConfig.deepLink = walletConfigDTO2.deepLink;
        }
        if (bridge.type === "js") {
          const jsBridgeKey = bridge.key;
          walletConfig.jsBridgeKey = jsBridgeKey;
          walletConfig.injected = InjectedProvider.isWalletInjected(jsBridgeKey);
          walletConfig.embedded = InjectedProvider.isInsideWalletBrowser(jsBridgeKey);
        }
      });
      return walletConfig;
    });
  }
  mergeWalletsLists(list1, list2) {
    const names = new Set(list1.concat(list2).map((item) => item.name));
    return [...names.values()].map((name) => {
      const list1Item = list1.find((item) => item.name === name);
      const list2Item = list2.find((item) => item.name === name);
      return Object.assign(Object.assign({}, list1Item && Object.assign({}, list1Item)), list2Item && Object.assign({}, list2Item));
    });
  }
  // eslint-disable-next-line complexity
  isCorrectWalletConfigDTO(value) {
    if (!value || !(typeof value === "object")) {
      return false;
    }
    const containsName = "name" in value;
    const containsAppName = "app_name" in value;
    const containsImage = "image" in value;
    const containsAbout = "about_url" in value;
    const containsPlatforms = "platforms" in value;
    if (!containsName || !containsImage || !containsAbout || !containsPlatforms || !containsAppName) {
      return false;
    }
    if (!value.platforms || !Array.isArray(value.platforms) || !value.platforms.length) {
      return false;
    }
    if (!("bridge" in value) || !Array.isArray(value.bridge) || !value.bridge.length) {
      return false;
    }
    const bridge = value.bridge;
    if (bridge.some((item) => !item || typeof item !== "object" || !("type" in item))) {
      return false;
    }
    const sseBridge = bridge.find((item) => item.type === "sse");
    if (sseBridge) {
      if (!("url" in sseBridge) || !sseBridge.url || !value.universal_url) {
        return false;
      }
    }
    const jsBridge = bridge.find((item) => item.type === "js");
    if (jsBridge) {
      if (!("key" in jsBridge) || !jsBridge.key) {
        return false;
      }
    }
    return true;
  }
};
var WalletNotSupportFeatureError = class _WalletNotSupportFeatureError extends TonConnectError {
  get info() {
    return "Wallet doesn't support requested feature method.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WalletNotSupportFeatureError.prototype);
  }
};
function checkSendTransactionSupport(features, options) {
  const supportsDeprecatedSendTransactionFeature = features.includes("SendTransaction");
  const sendTransactionFeature = features.find((feature) => feature && typeof feature === "object" && feature.name === "SendTransaction");
  if (!supportsDeprecatedSendTransactionFeature && !sendTransactionFeature) {
    throw new WalletNotSupportFeatureError("Wallet doesn't support SendTransaction feature.");
  }
  if (sendTransactionFeature && sendTransactionFeature.maxMessages !== void 0) {
    if (sendTransactionFeature.maxMessages < options.requiredMessagesNumber) {
      throw new WalletNotSupportFeatureError(`Wallet is not able to handle such SendTransaction request. Max support messages number is ${sendTransactionFeature.maxMessages}, but ${options.requiredMessagesNumber} is required.`);
    }
    return;
  }
  logWarning("Connected wallet didn't provide information about max allowed messages in the SendTransaction request. Request may be rejected by the wallet.");
}
var TonConnect = class {
  constructor(options) {
    this.walletsList = new WalletsListManager();
    this._wallet = null;
    this.provider = null;
    this.statusChangeSubscriptions = [];
    this.statusChangeErrorSubscriptions = [];
    this.dappSettings = {
      manifestUrl: (options === null || options === void 0 ? void 0 : options.manifestUrl) || getWebPageManifest(),
      storage: (options === null || options === void 0 ? void 0 : options.storage) || new DefaultStorage()
    };
    this.walletsList = new WalletsListManager({
      walletsListSource: options === null || options === void 0 ? void 0 : options.walletsListSource,
      cacheTTLMs: options === null || options === void 0 ? void 0 : options.walletsListCacheTTLMs
    });
    if (!this.dappSettings.manifestUrl) {
      throw new DappMetadataError("Dapp tonconnect-manifest.json must be specified if window.location.origin is undefined. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest");
    }
    this.bridgeConnectionStorage = new BridgeConnectionStorage(this.dappSettings.storage);
    if (!(options === null || options === void 0 ? void 0 : options.disableAutoPauseConnection)) {
      this.addWindowFocusAndBlurSubscriptions();
    }
  }
  /**
   * Returns available wallets list.
   */
  static getWallets() {
    return this.walletsList.getWallets();
  }
  /**
   * Shows if the wallet is connected right now.
   */
  get connected() {
    return this._wallet !== null;
  }
  /**
   * Current connected account or null if no account is connected.
   */
  get account() {
    var _a;
    return ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.account) || null;
  }
  /**
   * Current connected wallet or null if no account is connected.
   */
  get wallet() {
    return this._wallet;
  }
  set wallet(value) {
    this._wallet = value;
    this.statusChangeSubscriptions.forEach((callback) => callback(this._wallet));
  }
  /**
   * Returns available wallets list.
   */
  getWallets() {
    return this.walletsList.getWallets();
  }
  /**
   * Allows to subscribe to connection status changes and handle connection errors.
   * @param callback will be called after connections status changes with actual wallet or null.
   * @param errorsHandler (optional) will be called with some instance of TonConnectError when connect error is received.
   * @returns unsubscribe callback.
   */
  onStatusChange(callback, errorsHandler) {
    this.statusChangeSubscriptions.push(callback);
    if (errorsHandler) {
      this.statusChangeErrorSubscriptions.push(errorsHandler);
    }
    return () => {
      this.statusChangeSubscriptions = this.statusChangeSubscriptions.filter((item) => item !== callback);
      if (errorsHandler) {
        this.statusChangeErrorSubscriptions = this.statusChangeErrorSubscriptions.filter((item) => item !== errorsHandler);
      }
    };
  }
  connect(wallet, request) {
    var _a;
    if (this.connected) {
      throw new WalletAlreadyConnectedError();
    }
    (_a = this.provider) === null || _a === void 0 ? void 0 : _a.closeConnection();
    this.provider = this.createProvider(wallet);
    return this.provider.connect(this.createConnectRequest(request));
  }
  /**
   * Try to restore existing session and reconnect to the corresponding wallet. Call it immediately when your app is loaded.
   */
  restoreConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const [bridgeConnectionType, embeddedWallet] = yield Promise.all([
        this.bridgeConnectionStorage.storedConnectionType(),
        this.walletsList.getEmbeddedWallet()
      ]);
      try {
        switch (bridgeConnectionType) {
          case "http":
            this.provider = yield BridgeProvider.fromStorage(this.dappSettings.storage);
            break;
          case "injected":
            this.provider = yield InjectedProvider.fromStorage(this.dappSettings.storage);
            break;
          default:
            if (embeddedWallet) {
              this.provider = yield this.createProvider(embeddedWallet);
            } else {
              return;
            }
        }
      } catch (_a) {
        yield this.bridgeConnectionStorage.removeConnection();
        this.provider = null;
        return;
      }
      this.provider.listen(this.walletEventsListener.bind(this));
      return this.provider.restoreConnection();
    });
  }
  /**
   * Asks connected wallet to sign and send the transaction.
   * @param transaction transaction to send.
   * @returns signed transaction boc that allows you to find the transaction in the blockchain.
   * If user rejects transaction, method will throw the corresponding error.
   */
  sendTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
      this.checkConnection();
      checkSendTransactionSupport(this.wallet.device.features, {
        requiredMessagesNumber: transaction.messages.length
      });
      const { validUntil } = transaction, tx = __rest(transaction, ["validUntil"]);
      const from = transaction.from || this.account.address;
      const network = transaction.network || this.account.chain;
      const response = yield this.provider.sendRequest(sendTransactionParser.convertToRpcRequest(Object.assign(Object.assign({}, tx), {
        valid_until: validUntil,
        from,
        network
      })));
      if (sendTransactionParser.isError(response)) {
        return sendTransactionParser.parseAndThrowError(response);
      }
      return sendTransactionParser.convertFromRpcResponse(response);
    });
  }
  /**
   * Disconnect form thw connected wallet and drop current session.
   */
  disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.connected) {
        throw new WalletNotConnectedError();
      }
      yield this.provider.disconnect();
      this.onWalletDisconnected();
    });
  }
  /**
   * Pause bridge HTTP connection. Might be helpful, if you want to pause connections while browser tab is unfocused,
   * or if you use SDK with NodeJS and want to save server resources.
   */
  pauseConnection() {
    var _a;
    if (((_a = this.provider) === null || _a === void 0 ? void 0 : _a.type) !== "http") {
      return;
    }
    this.provider.pause();
  }
  /**
   * Unpause bridge HTTP connection if it is paused.
   */
  unPauseConnection() {
    var _a;
    if (((_a = this.provider) === null || _a === void 0 ? void 0 : _a.type) !== "http") {
      return Promise.resolve();
    }
    return this.provider.unPause();
  }
  addWindowFocusAndBlurSubscriptions() {
    const document2 = getDocument();
    if (!document2) {
      return;
    }
    try {
      document2.addEventListener("visibilitychange", () => {
        if (document2.hidden) {
          this.pauseConnection();
        } else {
          this.unPauseConnection();
        }
      });
    } catch (e2) {
      console.error("Cannot subscribe to the document.visibilitychange: ", e2);
    }
  }
  createProvider(wallet) {
    let provider;
    if (!Array.isArray(wallet) && isWalletConnectionSourceJS(wallet)) {
      provider = new InjectedProvider(this.dappSettings.storage, wallet.jsBridgeKey);
    } else {
      provider = new BridgeProvider(this.dappSettings.storage, wallet);
    }
    provider.listen(this.walletEventsListener.bind(this));
    return provider;
  }
  walletEventsListener(e2) {
    switch (e2.event) {
      case "connect":
        this.onWalletConnected(e2.payload);
        break;
      case "connect_error":
        this.onWalletConnectError(e2.payload);
        break;
      case "disconnect":
        this.onWalletDisconnected();
    }
  }
  onWalletConnected(connectEvent) {
    const tonAccountItem = connectEvent.items.find((item) => item.name === "ton_addr");
    const tonProofItem = connectEvent.items.find((item) => item.name === "ton_proof");
    if (!tonAccountItem) {
      throw new TonConnectError("ton_addr connection item was not found");
    }
    const wallet = {
      device: connectEvent.device,
      provider: this.provider.type,
      account: {
        address: tonAccountItem.address,
        chain: tonAccountItem.network,
        walletStateInit: tonAccountItem.walletStateInit,
        publicKey: tonAccountItem.publicKey
      }
    };
    if (tonProofItem) {
      wallet.connectItems = {
        tonProof: tonProofItem
      };
    }
    this.wallet = wallet;
  }
  onWalletConnectError(connectEventError) {
    const error = connectErrorsParser.parseError(connectEventError);
    this.statusChangeErrorSubscriptions.forEach((errorsHandler) => errorsHandler(error));
    console.debug(error);
    if (error instanceof ManifestNotFoundError || error instanceof ManifestContentErrorError) {
      console.error(error);
      throw error;
    }
  }
  onWalletDisconnected() {
    this.wallet = null;
  }
  checkConnection() {
    if (!this.connected) {
      throw new WalletNotConnectedError();
    }
  }
  createConnectRequest(request) {
    const items = [
      {
        name: "ton_addr"
      }
    ];
    if (request === null || request === void 0 ? void 0 : request.tonProof) {
      items.push({
        name: "ton_proof",
        payload: request.tonProof
      });
    }
    return {
      manifestUrl: this.dappSettings.manifestUrl,
      items
    };
  }
};
TonConnect.walletsList = new WalletsListManager();
TonConnect.isWalletInjected = (walletJSKey) => InjectedProvider.isWalletInjected(walletJSKey);
TonConnect.isInsideWalletBrowser = (walletJSKey) => InjectedProvider.isInsideWalletBrowser(walletJSKey);
var bounceableTag = 17;
var testOnlyTag = 128;
function toUserFriendlyAddress(hexAddress, testOnly = false) {
  const { wc, hex } = parseHexAddress(hexAddress);
  let tag = bounceableTag;
  if (testOnly) {
    tag |= testOnlyTag;
  }
  const addr = new Int8Array(34);
  addr[0] = tag;
  addr[1] = wc;
  addr.set(hex, 2);
  const addressWithChecksum = new Uint8Array(36);
  addressWithChecksum.set(addr);
  addressWithChecksum.set(crc16(addr), 34);
  let addressBase64 = Base64.encode(addressWithChecksum);
  return addressBase64.replace(/\+/g, "-").replace(/\//g, "_");
}
function parseHexAddress(hexAddress) {
  if (!hexAddress.includes(":")) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Address must include ":".`);
  }
  const parts = hexAddress.split(":");
  if (parts.length !== 2) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Address must include ":" only once.`);
  }
  const wc = parseInt(parts[0]);
  if (wc !== 0 && wc !== -1) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. WC must be eq 0 or -1, but ${wc} received.`);
  }
  const hex = parts[1];
  if ((hex === null || hex === void 0 ? void 0 : hex.length) !== 64) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Hex part must be 64bytes length, but ${hex === null || hex === void 0 ? void 0 : hex.length} received.`);
  }
  return {
    wc,
    hex: hexToBytes(hex)
  };
}
function crc16(data) {
  const poly = 4129;
  let reg = 0;
  const message = new Uint8Array(data.length + 2);
  message.set(data);
  for (let byte of message) {
    let mask = 128;
    while (mask > 0) {
      reg <<= 1;
      if (byte & mask) {
        reg += 1;
      }
      mask >>= 1;
      if (reg > 65535) {
        reg &= 65535;
        reg ^= poly;
      }
    }
  }
  return new Uint8Array([Math.floor(reg / 256), reg % 256]);
}
var toByteMap = {};
for (let ord = 0; ord <= 255; ord++) {
  let s2 = ord.toString(16);
  if (s2.length < 2) {
    s2 = "0" + s2;
  }
  toByteMap[s2] = ord;
}
function hexToBytes(hex) {
  hex = hex.toLowerCase();
  const length2 = hex.length;
  if (length2 % 2 !== 0) {
    throw new ParseHexError("Hex string must have length a multiple of 2: " + hex);
  }
  const length = length2 / 2;
  const result = new Uint8Array(length);
  for (let i2 = 0; i2 < length; i2++) {
    const doubled = i2 * 2;
    const hexSubstring = hex.substring(doubled, doubled + 2);
    if (!toByteMap.hasOwnProperty(hexSubstring)) {
      throw new ParseHexError("Invalid hex character: " + hexSubstring);
    }
    result[i2] = toByteMap[hexSubstring];
  }
  return result;
}

// node_modules/@tonconnect/ui/lib/index.js
var import_deepmerge = __toESM(require_cjs());
var import_ua_parser_js = __toESM(require_ua_parser());
var import_classnames = __toESM(require_classnames());
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a2, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
var equalFn = (a2, b) => a2 === b;
var $PROXY = Symbol("solid-proxy");
var $TRACK = Symbol("solid-track");
var signalOptions = {
  equals: equalFn
};
var runEffects = runQueue;
var STALE = 1;
var PENDING = 2;
var UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var NO_INIT = {};
var Owner = null;
var Transition$1 = null;
var Listener = null;
var Updates = null;
var Effects = null;
var ExecCount = 0;
function createRoot(fn, detachedOwner) {
  const listener = Listener, owner = Owner, unowned = fn.length === 0, root = unowned ? UNOWNED : {
    owned: null,
    cleanups: null,
    context: null,
    owner: detachedOwner === void 0 ? owner : detachedOwner
  }, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
  Owner = root;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createSignal(value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const s2 = {
    value,
    observers: null,
    observerSlots: null,
    comparator: options.equals || void 0
  };
  const setter = (value2) => {
    if (typeof value2 === "function") {
      value2 = value2(s2.value);
    }
    return writeSignal(s2, value2);
  };
  return [readSignal.bind(s2), setter];
}
function createComputed(fn, value, options) {
  const c2 = createComputation(fn, value, true, STALE);
  updateComputation(c2);
}
function createRenderEffect(fn, value, options) {
  const c2 = createComputation(fn, value, false, STALE);
  updateComputation(c2);
}
function createEffect(fn, value, options) {
  runEffects = runUserEffects;
  const c2 = createComputation(fn, value, false, STALE);
  c2.user = true;
  Effects ? Effects.push(c2) : updateComputation(c2);
}
function createMemo(fn, value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const c2 = createComputation(fn, value, true, 0);
  c2.observers = null;
  c2.observerSlots = null;
  c2.comparator = options.equals || void 0;
  updateComputation(c2);
  return readSignal.bind(c2);
}
function createResource(pSource, pFetcher, pOptions) {
  let source;
  let fetcher;
  let options;
  if (arguments.length === 2 && typeof pFetcher === "object" || arguments.length === 1) {
    source = true;
    fetcher = pSource;
    options = pFetcher || {};
  } else {
    source = pSource;
    fetcher = pFetcher;
    options = pOptions || {};
  }
  let pr = null, initP = NO_INIT, id = null, scheduled = false, resolved = "initialValue" in options, dynamic = typeof source === "function" && createMemo(source);
  const contexts = /* @__PURE__ */ new Set(), [value, setValue] = (options.storage || createSignal)(options.initialValue), [error, setError] = createSignal(void 0), [track, trigger] = createSignal(void 0, {
    equals: false
  }), [state, setState] = createSignal(resolved ? "ready" : "unresolved");
  if (sharedConfig.context) {
    id = `${sharedConfig.context.id}${sharedConfig.context.count++}`;
    let v;
    if (options.ssrLoadFrom === "initial")
      initP = options.initialValue;
    else if (sharedConfig.load && (v = sharedConfig.load(id)))
      initP = v[0];
  }
  function loadEnd(p2, v, error2, key) {
    if (pr === p2) {
      pr = null;
      resolved = true;
      if ((p2 === initP || v === initP) && options.onHydrated)
        queueMicrotask(() => options.onHydrated(key, {
          value: v
        }));
      initP = NO_INIT;
      completeLoad(v, error2);
    }
    return v;
  }
  function completeLoad(v, err) {
    runUpdates(() => {
      if (err === void 0)
        setValue(() => v);
      setState(err !== void 0 ? "errored" : "ready");
      setError(err);
      for (const c2 of contexts.keys())
        c2.decrement();
      contexts.clear();
    }, false);
  }
  function read() {
    const c2 = SuspenseContext, v = value(), err = error();
    if (err !== void 0 && !pr)
      throw err;
    if (Listener && !Listener.user && c2) {
      createComputed(() => {
        track();
        if (pr) {
          if (c2.resolved)
            ;
          else if (!contexts.has(c2)) {
            c2.increment();
            contexts.add(c2);
          }
        }
      });
    }
    return v;
  }
  function load(refetching = true) {
    if (refetching !== false && scheduled)
      return;
    scheduled = false;
    const lookup2 = dynamic ? dynamic() : source;
    if (lookup2 == null || lookup2 === false) {
      loadEnd(pr, untrack(value));
      return;
    }
    const p2 = initP !== NO_INIT ? initP : untrack(() => fetcher(lookup2, {
      value: value(),
      refetching
    }));
    if (typeof p2 !== "object" || !(p2 && "then" in p2)) {
      loadEnd(pr, p2, void 0, lookup2);
      return p2;
    }
    pr = p2;
    scheduled = true;
    queueMicrotask(() => scheduled = false);
    runUpdates(() => {
      setState(resolved ? "refreshing" : "pending");
      trigger();
    }, false);
    return p2.then((v) => loadEnd(p2, v, void 0, lookup2), (e2) => loadEnd(p2, void 0, castError(e2), lookup2));
  }
  Object.defineProperties(read, {
    state: {
      get: () => state()
    },
    error: {
      get: () => error()
    },
    loading: {
      get() {
        const s2 = state();
        return s2 === "pending" || s2 === "refreshing";
      }
    },
    latest: {
      get() {
        if (!resolved)
          return read();
        const err = error();
        if (err && !pr)
          throw err;
        return value();
      }
    }
  });
  if (dynamic)
    createComputed(() => load(false));
  else
    load(false);
  return [read, {
    refetch: load,
    mutate: setValue
  }];
}
function batch(fn) {
  return runUpdates(fn, false);
}
function untrack(fn) {
  if (Listener === null)
    return fn();
  const listener = Listener;
  Listener = null;
  try {
    return fn();
  } finally {
    Listener = listener;
  }
}
function on(deps, fn, options) {
  const isArray = Array.isArray(deps);
  let prevInput;
  let defer = options && options.defer;
  return (prevValue) => {
    let input;
    if (isArray) {
      input = Array(deps.length);
      for (let i2 = 0; i2 < deps.length; i2++)
        input[i2] = deps[i2]();
    } else
      input = deps();
    if (defer) {
      defer = false;
      return void 0;
    }
    const result = untrack(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  };
}
function onMount(fn) {
  createEffect(() => untrack(fn));
}
function onCleanup(fn) {
  if (Owner === null)
    ;
  else if (Owner.cleanups === null)
    Owner.cleanups = [fn];
  else
    Owner.cleanups.push(fn);
  return fn;
}
function getListener() {
  return Listener;
}
function getOwner() {
  return Owner;
}
function createContext(defaultValue, options) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let ctx;
  return (ctx = lookup(Owner, context.id)) !== void 0 ? ctx : context.defaultValue;
}
function children(fn) {
  const children2 = createMemo(fn);
  const memo2 = createMemo(() => resolveChildren(children2()));
  memo2.toArray = () => {
    const c2 = memo2();
    return Array.isArray(c2) ? c2 : c2 != null ? [c2] : [];
  };
  return memo2;
}
var SuspenseContext;
function readSignal() {
  const runningTransition = Transition$1;
  if (this.sources && (this.state || runningTransition)) {
    if (this.state === STALE || runningTransition)
      updateComputation(this);
    else {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(this), false);
      Updates = updates;
    }
  }
  if (Listener) {
    const sSlot = this.observers ? this.observers.length : 0;
    if (!Listener.sources) {
      Listener.sources = [this];
      Listener.sourceSlots = [sSlot];
    } else {
      Listener.sources.push(this);
      Listener.sourceSlots.push(sSlot);
    }
    if (!this.observers) {
      this.observers = [Listener];
      this.observerSlots = [Listener.sources.length - 1];
    } else {
      this.observers.push(Listener);
      this.observerSlots.push(Listener.sources.length - 1);
    }
  }
  return this.value;
}
function writeSignal(node, value, isComp) {
  let current = node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i2 = 0; i2 < node.observers.length; i2 += 1) {
          const o2 = node.observers[i2];
          const TransitionRunning = Transition$1 && Transition$1.running;
          if (TransitionRunning && Transition$1.disposed.has(o2))
            ;
          if (TransitionRunning && !o2.tState || !TransitionRunning && !o2.state) {
            if (o2.pure)
              Updates.push(o2);
            else
              Effects.push(o2);
            if (o2.observers)
              markDownstream(o2);
          }
          if (TransitionRunning)
            ;
          else
            o2.state = STALE;
        }
        if (Updates.length > 1e6) {
          Updates = [];
          if (false)
            ;
          throw new Error();
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn)
    return;
  cleanNode(node);
  const owner = Owner, listener = Listener, time = ExecCount;
  Listener = Owner = node;
  runComputation(node, node.value, time);
  Listener = listener;
  Owner = owner;
}
function runComputation(node, value, time) {
  let nextValue;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    handleError(err);
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue);
    } else
      node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init, pure, state = STALE, options) {
  const c2 = {
    fn,
    state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: null,
    pure
  };
  if (Owner === null)
    ;
  else if (Owner !== UNOWNED) {
    {
      if (!Owner.owned)
        Owner.owned = [c2];
      else
        Owner.owned.push(c2);
    }
  }
  return c2;
}
function runTop(node) {
  const runningTransition = Transition$1;
  if (node.state === 0 || runningTransition)
    return;
  if (node.state === PENDING || runningTransition)
    return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback))
    return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (node.state || runningTransition)
      ancestors.push(node);
  }
  for (let i2 = ancestors.length - 1; i2 >= 0; i2--) {
    node = ancestors[i2];
    if (node.state === STALE || runningTransition) {
      updateComputation(node);
    } else if (node.state === PENDING || runningTransition) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates)
    return fn();
  let wait = false;
  if (!init)
    Updates = [];
  if (Effects)
    wait = true;
  else
    Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait)
      Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    runQueue(Updates);
    Updates = null;
  }
  if (wait)
    return;
  const e2 = Effects;
  Effects = null;
  if (e2.length)
    runUpdates(() => runEffects(e2), false);
}
function runQueue(queue) {
  for (let i2 = 0; i2 < queue.length; i2++)
    runTop(queue[i2]);
}
function runUserEffects(queue) {
  let i2, userLength = 0;
  for (i2 = 0; i2 < queue.length; i2++) {
    const e2 = queue[i2];
    if (!e2.user)
      runTop(e2);
    else
      queue[userLength++] = e2;
  }
  if (sharedConfig.context)
    setHydrateContext();
  for (i2 = 0; i2 < userLength; i2++)
    runTop(queue[i2]);
}
function lookUpstream(node, ignore) {
  const runningTransition = Transition$1;
  node.state = 0;
  for (let i2 = 0; i2 < node.sources.length; i2 += 1) {
    const source = node.sources[i2];
    if (source.sources) {
      if (source.state === STALE || runningTransition) {
        if (source !== ignore)
          runTop(source);
      } else if (source.state === PENDING || runningTransition)
        lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  const runningTransition = Transition$1;
  for (let i2 = 0; i2 < node.observers.length; i2 += 1) {
    const o2 = node.observers[i2];
    if (!o2.state || runningTransition) {
      o2.state = PENDING;
      if (o2.pure)
        Updates.push(o2);
      else
        Effects.push(o2);
      o2.observers && markDownstream(o2);
    }
  }
}
function cleanNode(node) {
  let i2;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
      if (obs && obs.length) {
        const n2 = obs.pop(), s2 = source.observerSlots.pop();
        if (index < obs.length) {
          n2.sourceSlots[s2] = index;
          obs[index] = n2;
          source.observerSlots[index] = s2;
        }
      }
    }
  }
  if (node.owned) {
    for (i2 = 0; i2 < node.owned.length; i2++)
      cleanNode(node.owned[i2]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i2 = 0; i2 < node.cleanups.length; i2++)
      node.cleanups[i2]();
    node.cleanups = null;
  }
  node.state = 0;
  node.context = null;
}
function castError(err) {
  if (err instanceof Error || typeof err === "string")
    return err;
  return new Error("Unknown error");
}
function handleError(err) {
  err = castError(err);
  throw err;
}
function lookup(owner, key) {
  return owner ? owner.context && owner.context[key] !== void 0 ? owner.context[key] : lookup(owner.owner, key) : void 0;
}
function resolveChildren(children2) {
  if (typeof children2 === "function" && !children2.length)
    return resolveChildren(children2());
  if (Array.isArray(children2)) {
    const results = [];
    for (let i2 = 0; i2 < children2.length; i2++) {
      const result = resolveChildren(children2[i2]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children2;
}
function createProvider(id, options) {
  return function provider(props) {
    let res;
    createRenderEffect(() => res = untrack(() => {
      Owner.context = {
        [id]: props.value
      };
      return children(() => props.children);
    }), void 0);
    return res;
  };
}
var FALLBACK = Symbol("fallback");
function dispose(d) {
  for (let i2 = 0; i2 < d.length; i2++)
    d[i2]();
}
function mapArray(list, mapFn, options = {}) {
  let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
  onCleanup(() => dispose(disposers));
  return () => {
    let newItems = list() || [], i2, j;
    newItems[$TRACK];
    return untrack(() => {
      let newLen = newItems.length, newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          indexes && (indexes = []);
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
      } else if (len === 0) {
        mapped = new Array(newLen);
        for (j = 0; j < newLen; j++) {
          items[j] = newItems[j];
          mapped[j] = createRoot(mapper);
        }
        len = newLen;
      } else {
        temp = new Array(newLen);
        tempdisposers = new Array(newLen);
        indexes && (tempIndexes = new Array(newLen));
        for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++)
          ;
        for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
          temp[newEnd] = mapped[end];
          tempdisposers[newEnd] = disposers[end];
          indexes && (tempIndexes[newEnd] = indexes[end]);
        }
        newIndices = /* @__PURE__ */ new Map();
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd; j >= start; j--) {
          item = newItems[j];
          i2 = newIndices.get(item);
          newIndicesNext[j] = i2 === void 0 ? -1 : i2;
          newIndices.set(item, j);
        }
        for (i2 = start; i2 <= end; i2++) {
          item = items[i2];
          j = newIndices.get(item);
          if (j !== void 0 && j !== -1) {
            temp[j] = mapped[i2];
            tempdisposers[j] = disposers[i2];
            indexes && (tempIndexes[j] = indexes[i2]);
            j = newIndicesNext[j];
            newIndices.set(item, j);
          } else
            disposers[i2]();
        }
        for (j = start; j < newLen; j++) {
          if (j in temp) {
            mapped[j] = temp[j];
            disposers[j] = tempdisposers[j];
            if (indexes) {
              indexes[j] = tempIndexes[j];
              indexes[j](j);
            }
          } else
            mapped[j] = createRoot(mapper);
        }
        mapped = mapped.slice(0, len = newLen);
        items = newItems.slice(0);
      }
      return mapped;
    });
    function mapper(disposer) {
      disposers[j] = disposer;
      if (indexes) {
        const [s2, set] = createSignal(j);
        indexes[j] = set;
        return mapFn(newItems[j], s2);
      }
      return mapFn(newItems[j]);
    }
  };
}
function createComponent(Comp, props) {
  return untrack(() => Comp(props || {}));
}
function trueFn() {
  return true;
}
var propTraps = {
  get(_, property, receiver) {
    if (property === $PROXY)
      return receiver;
    return _.get(property);
  },
  has(_, property) {
    if (property === $PROXY)
      return true;
    return _.has(property);
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property);
      },
      set: trueFn,
      deleteProperty: trueFn
    };
  },
  ownKeys(_) {
    return _.keys();
  }
};
function resolveSource(s2) {
  return !(s2 = typeof s2 === "function" ? s2() : s2) ? {} : s2;
}
function mergeProps(...sources) {
  let proxy = false;
  for (let i2 = 0; i2 < sources.length; i2++) {
    const s2 = sources[i2];
    proxy = proxy || !!s2 && $PROXY in s2;
    sources[i2] = typeof s2 === "function" ? (proxy = true, createMemo(s2)) : s2;
  }
  if (proxy) {
    return new Proxy({
      get(property) {
        for (let i2 = sources.length - 1; i2 >= 0; i2--) {
          const v = resolveSource(sources[i2])[property];
          if (v !== void 0)
            return v;
        }
      },
      has(property) {
        for (let i2 = sources.length - 1; i2 >= 0; i2--) {
          if (property in resolveSource(sources[i2]))
            return true;
        }
        return false;
      },
      keys() {
        const keys = [];
        for (let i2 = 0; i2 < sources.length; i2++)
          keys.push(...Object.keys(resolveSource(sources[i2])));
        return [...new Set(keys)];
      }
    }, propTraps);
  }
  const target = {};
  for (let i2 = sources.length - 1; i2 >= 0; i2--) {
    if (sources[i2]) {
      const descriptors = Object.getOwnPropertyDescriptors(sources[i2]);
      for (const key in descriptors) {
        if (key in target)
          continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i3 = sources.length - 1; i3 >= 0; i3--) {
              const v = (sources[i3] || {})[key];
              if (v !== void 0)
                return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function splitProps(props, ...keys) {
  const blocked = new Set(keys.flat());
  if ($PROXY in props) {
    const res = keys.map((k) => {
      return new Proxy({
        get(property) {
          return k.includes(property) ? props[property] : void 0;
        },
        has(property) {
          return k.includes(property) && property in props;
        },
        keys() {
          return k.filter((property) => property in props);
        }
      }, propTraps);
    });
    res.push(new Proxy({
      get(property) {
        return blocked.has(property) ? void 0 : props[property];
      },
      has(property) {
        return blocked.has(property) ? false : property in props;
      },
      keys() {
        return Object.keys(props).filter((k) => !blocked.has(k));
      }
    }, propTraps));
    return res;
  }
  const descriptors = Object.getOwnPropertyDescriptors(props);
  keys.push(Object.keys(descriptors).filter((k) => !blocked.has(k)));
  return keys.map((k) => {
    const clone = {};
    for (let i2 = 0; i2 < k.length; i2++) {
      const key = k[i2];
      if (!(key in props))
        continue;
      Object.defineProperty(clone, key, descriptors[key] ? descriptors[key] : {
        get() {
          return props[key];
        },
        set() {
          return true;
        },
        enumerable: true
      });
    }
    return clone;
  });
}
function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || void 0));
}
function Show(props) {
  let strictEqual = false;
  const keyed = props.keyed;
  const condition = createMemo(() => props.when, void 0, {
    equals: (a2, b) => strictEqual ? a2 === b : !a2 === !b
  });
  return createMemo(() => {
    const c2 = condition();
    if (c2) {
      const child = props.children;
      const fn = typeof child === "function" && child.length > 0;
      strictEqual = keyed || fn;
      return fn ? untrack(() => child(c2)) : child;
    }
    return props.fallback;
  }, void 0, void 0);
}
function Switch(props) {
  let strictEqual = false;
  let keyed = false;
  const equals = (a2, b) => a2[0] === b[0] && (strictEqual ? a2[1] === b[1] : !a2[1] === !b[1]) && a2[2] === b[2];
  const conditions = children(() => props.children), evalConditions = createMemo(() => {
    let conds = conditions();
    if (!Array.isArray(conds))
      conds = [conds];
    for (let i2 = 0; i2 < conds.length; i2++) {
      const c2 = conds[i2].when;
      if (c2) {
        keyed = !!conds[i2].keyed;
        return [i2, c2, conds[i2]];
      }
    }
    return [-1];
  }, void 0, {
    equals
  });
  return createMemo(() => {
    const [index, when, cond] = evalConditions();
    if (index < 0)
      return props.fallback;
    const c2 = cond.children;
    const fn = typeof c2 === "function" && c2.length > 0;
    strictEqual = keyed || fn;
    return fn ? untrack(() => c2(when)) : c2;
  }, void 0, void 0);
}
function Match(props) {
  return props;
}
var booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
var Properties = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
var ChildProperties = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]);
var Aliases = Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
});
var PropAliases = Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly"
});
var DelegatedEvents = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]);
var SVGElements = /* @__PURE__ */ new Set([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animate",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "color-profile",
  "cursor",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "font",
  "font-face",
  "font-face-format",
  "font-face-name",
  "font-face-src",
  "font-face-uri",
  "foreignObject",
  "g",
  "glyph",
  "glyphRef",
  "hkern",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "missing-glyph",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tref",
  "tspan",
  "use",
  "view",
  "vkern"
]);
var SVGNamespace = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function reconcileArrays(parentNode, a2, b) {
  let bLength = b.length, aEnd = a2.length, bEnd = bLength, aStart = 0, bStart = 0, after = a2[aEnd - 1].nextSibling, map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (a2[aStart] === b[bStart]) {
      aStart++;
      bStart++;
      continue;
    }
    while (a2[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
      while (bStart < bEnd)
        parentNode.insertBefore(b[bStart++], node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a2[aStart]))
          a2[aStart].remove();
        aStart++;
      }
    } else if (a2[aStart] === b[bEnd - 1] && b[bStart] === a2[aEnd - 1]) {
      const node = a2[--aEnd].nextSibling;
      parentNode.insertBefore(b[bStart++], a2[aStart++].nextSibling);
      parentNode.insertBefore(b[--bEnd], node);
      a2[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = /* @__PURE__ */ new Map();
        let i2 = bStart;
        while (i2 < bEnd)
          map.set(b[i2], i2++);
      }
      const index = map.get(a2[aStart]);
      if (index != null) {
        if (bStart < index && index < bEnd) {
          let i2 = aStart, sequence = 1, t2;
          while (++i2 < aEnd && i2 < bEnd) {
            if ((t2 = map.get(a2[i2])) == null || t2 !== index + sequence)
              break;
            sequence++;
          }
          if (sequence > index - bStart) {
            const node = a2[aStart];
            while (bStart < index)
              parentNode.insertBefore(b[bStart++], node);
          } else
            parentNode.replaceChild(b[bStart++], a2[aStart++]);
        } else
          aStart++;
      } else
        a2[aStart++].remove();
    }
  }
}
var $$EVENTS = "_$DX_DELEGATE";
function render(code, element, init, options = {}) {
  let disposer;
  createRoot((dispose2) => {
    disposer = dispose2;
    element === document ? code() : insert(element, code(), element.firstChild ? null : void 0, init);
  }, options.owner);
  return () => {
    disposer();
    element.textContent = "";
  };
}
function template$1(html, check, isSVG) {
  if (typeof window === "undefined") {
    return null;
  }
  const t2 = document.createElement("template");
  t2.innerHTML = html;
  let node = t2.content.firstChild;
  if (isSVG)
    node = node.firstChild;
  return node;
}
function delegateEvents(eventNames, document2 = window.document) {
  const e2 = document2[$$EVENTS] || (document2[$$EVENTS] = /* @__PURE__ */ new Set());
  for (let i2 = 0, l2 = eventNames.length; i2 < l2; i2++) {
    const name = eventNames[i2];
    if (!e2.has(name)) {
      e2.add(name);
      document2.addEventListener(name, eventHandler);
    }
  }
}
function setAttribute(node, name, value) {
  if (value == null)
    node.removeAttribute(name);
  else
    node.setAttribute(name, value);
}
function setAttributeNS(node, namespace, name, value) {
  if (value == null)
    node.removeAttributeNS(namespace, name);
  else
    node.setAttributeNS(namespace, name, value);
}
function className(node, value) {
  if (value == null)
    node.removeAttribute("class");
  else
    node.className = value;
}
function addEventListener(node, name, handler, delegate) {
  if (delegate) {
    if (Array.isArray(handler)) {
      node[`$$${name}`] = handler[0];
      node[`$$${name}Data`] = handler[1];
    } else
      node[`$$${name}`] = handler;
  } else if (Array.isArray(handler)) {
    const handlerFn = handler[0];
    node.addEventListener(name, handler[0] = (e2) => handlerFn.call(node, handler[1], e2));
  } else
    node.addEventListener(name, handler);
}
function classList(node, value, prev = {}) {
  const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
  let i2, len;
  for (i2 = 0, len = prevKeys.length; i2 < len; i2++) {
    const key = prevKeys[i2];
    if (!key || key === "undefined" || value[key])
      continue;
    toggleClassKey(node, key, false);
    delete prev[key];
  }
  for (i2 = 0, len = classKeys.length; i2 < len; i2++) {
    const key = classKeys[i2], classValue = !!value[key];
    if (!key || key === "undefined" || prev[key] === classValue || !classValue)
      continue;
    toggleClassKey(node, key, true);
    prev[key] = classValue;
  }
  return prev;
}
function style(node, value, prev) {
  if (!value)
    return prev ? setAttribute(node, "style") : value;
  const nodeStyle = node.style;
  if (typeof value === "string")
    return nodeStyle.cssText = value;
  typeof prev === "string" && (nodeStyle.cssText = prev = void 0);
  prev || (prev = {});
  value || (value = {});
  let v, s2;
  for (s2 in prev) {
    value[s2] == null && nodeStyle.removeProperty(s2);
    delete prev[s2];
  }
  for (s2 in value) {
    v = value[s2];
    if (v !== prev[s2]) {
      nodeStyle.setProperty(s2, v);
      prev[s2] = v;
    }
  }
  return prev;
}
function spread(node, props = {}, isSVG, skipChildren) {
  const prevProps = {};
  if (!skipChildren) {
    createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
  }
  createRenderEffect(() => props.ref && props.ref(node));
  createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
  return prevProps;
}
function use(fn, element, arg) {
  return untrack(() => fn(element, arg));
}
function insert(parent, accessor, marker, initial) {
  if (marker !== void 0 && !initial)
    initial = [];
  if (typeof accessor !== "function")
    return insertExpression(parent, accessor, initial, marker);
  createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
}
function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
  props || (props = {});
  for (const prop in prevProps) {
    if (!(prop in props)) {
      if (prop === "children")
        continue;
      prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef);
    }
  }
  for (const prop in props) {
    if (prop === "children") {
      if (!skipChildren)
        insertExpression(node, props.children);
      continue;
    }
    const value = props[prop];
    prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef);
  }
}
function getNextElement(template2) {
  let node, key;
  if (!sharedConfig.context || !(node = sharedConfig.registry.get(key = getHydrationKey()))) {
    return template2.cloneNode(true);
  }
  if (sharedConfig.completed)
    sharedConfig.completed.add(node);
  sharedConfig.registry.delete(key);
  return node;
}
function toPropertyName(name) {
  return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
}
function toggleClassKey(node, key, value) {
  const classNames = key.trim().split(/\s+/);
  for (let i2 = 0, nameLen = classNames.length; i2 < nameLen; i2++)
    node.classList.toggle(classNames[i2], value);
}
function assignProp(node, prop, value, prev, isSVG, skipRef) {
  let isCE, isProp, isChildProp;
  if (prop === "style")
    return style(node, value, prev);
  if (prop === "classList")
    return classList(node, value, prev);
  if (value === prev)
    return prev;
  if (prop === "ref") {
    if (!skipRef)
      value(node);
  } else if (prop.slice(0, 3) === "on:") {
    const e2 = prop.slice(3);
    prev && node.removeEventListener(e2, prev);
    value && node.addEventListener(e2, value);
  } else if (prop.slice(0, 10) === "oncapture:") {
    const e2 = prop.slice(10);
    prev && node.removeEventListener(e2, prev, true);
    value && node.addEventListener(e2, value, true);
  } else if (prop.slice(0, 2) === "on") {
    const name = prop.slice(2).toLowerCase();
    const delegate = DelegatedEvents.has(name);
    if (!delegate && prev) {
      const h2 = Array.isArray(prev) ? prev[0] : prev;
      node.removeEventListener(name, h2);
    }
    if (delegate || value) {
      addEventListener(node, name, value, delegate);
      delegate && delegateEvents([name]);
    }
  } else if ((isChildProp = ChildProperties.has(prop)) || !isSVG && (PropAliases[prop] || (isProp = Properties.has(prop))) || (isCE = node.nodeName.includes("-"))) {
    if (prop === "class" || prop === "className")
      className(node, value);
    else if (isCE && !isProp && !isChildProp)
      node[toPropertyName(prop)] = value;
    else
      node[PropAliases[prop] || prop] = value;
  } else {
    const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
    if (ns)
      setAttributeNS(node, ns, prop, value);
    else
      setAttribute(node, Aliases[prop] || prop, value);
  }
  return value;
}
function eventHandler(e2) {
  const key = `$$${e2.type}`;
  let node = e2.composedPath && e2.composedPath()[0] || e2.target;
  if (e2.target !== node) {
    Object.defineProperty(e2, "target", {
      configurable: true,
      value: node
    });
  }
  Object.defineProperty(e2, "currentTarget", {
    configurable: true,
    get() {
      return node || document;
    }
  });
  if (sharedConfig.registry && !sharedConfig.done) {
    sharedConfig.done = true;
    document.querySelectorAll("[id^=pl-]").forEach((elem) => {
      while (elem && elem.nodeType !== 8 && elem.nodeValue !== "pl-" + e2) {
        let x = elem.nextSibling;
        elem.remove();
        elem = x;
      }
      elem && elem.remove();
    });
  }
  while (node) {
    const handler = node[key];
    if (handler && !node.disabled) {
      const data = node[`${key}Data`];
      data !== void 0 ? handler.call(node, data, e2) : handler.call(node, e2);
      if (e2.cancelBubble)
        return;
    }
    node = node._$host || node.parentNode || node.host;
  }
}
function insertExpression(parent, value, current, marker, unwrapArray) {
  if (sharedConfig.context && !current)
    current = [...parent.childNodes];
  while (typeof current === "function")
    current = current();
  if (value === current)
    return current;
  const t2 = typeof value, multi = marker !== void 0;
  parent = multi && current[0] && current[0].parentNode || parent;
  if (t2 === "string" || t2 === "number") {
    if (sharedConfig.context)
      return current;
    if (t2 === "number")
      value = value.toString();
    if (multi) {
      let node = current[0];
      if (node && node.nodeType === 3) {
        node.data = value;
      } else
        node = document.createTextNode(value);
      current = cleanChildren(parent, current, marker, node);
    } else {
      if (current !== "" && typeof current === "string") {
        current = parent.firstChild.data = value;
      } else
        current = parent.textContent = value;
    }
  } else if (value == null || t2 === "boolean") {
    if (sharedConfig.context)
      return current;
    current = cleanChildren(parent, current, marker);
  } else if (t2 === "function") {
    createRenderEffect(() => {
      let v = value();
      while (typeof v === "function")
        v = v();
      current = insertExpression(parent, v, current, marker);
    });
    return () => current;
  } else if (Array.isArray(value)) {
    const array = [];
    const currentArray = current && Array.isArray(current);
    if (normalizeIncomingArray(array, value, current, unwrapArray)) {
      createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
      return () => current;
    }
    if (sharedConfig.context) {
      if (!array.length)
        return current;
      for (let i2 = 0; i2 < array.length; i2++) {
        if (array[i2].parentNode)
          return current = array;
      }
    }
    if (array.length === 0) {
      current = cleanChildren(parent, current, marker);
      if (multi)
        return current;
    } else if (currentArray) {
      if (current.length === 0) {
        appendNodes(parent, array, marker);
      } else
        reconcileArrays(parent, current, array);
    } else {
      current && cleanChildren(parent);
      appendNodes(parent, array);
    }
    current = array;
  } else if (value instanceof Node) {
    if (sharedConfig.context && value.parentNode)
      return current = multi ? [value] : value;
    if (Array.isArray(current)) {
      if (multi)
        return current = cleanChildren(parent, current, marker, value);
      cleanChildren(parent, current, null, value);
    } else if (current == null || current === "" || !parent.firstChild) {
      parent.appendChild(value);
    } else
      parent.replaceChild(value, parent.firstChild);
    current = value;
  } else
    ;
  return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap2) {
  let dynamic = false;
  for (let i2 = 0, len = array.length; i2 < len; i2++) {
    let item = array[i2], prev = current && current[i2];
    if (item instanceof Node) {
      normalized.push(item);
    } else if (item == null || item === true || item === false)
      ;
    else if (Array.isArray(item)) {
      dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
    } else if (typeof item === "function") {
      if (unwrap2) {
        while (typeof item === "function")
          item = item();
        dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
      } else {
        normalized.push(item);
        dynamic = true;
      }
    } else {
      const value = String(item);
      if (prev && prev.nodeType === 3 && prev.data === value) {
        normalized.push(prev);
      } else
        normalized.push(document.createTextNode(value));
    }
  }
  return dynamic;
}
function appendNodes(parent, array, marker = null) {
  for (let i2 = 0, len = array.length; i2 < len; i2++)
    parent.insertBefore(array[i2], marker);
}
function cleanChildren(parent, current, marker, replacement) {
  if (marker === void 0)
    return parent.textContent = "";
  const node = replacement || document.createTextNode("");
  if (current.length) {
    let inserted = false;
    for (let i2 = current.length - 1; i2 >= 0; i2--) {
      const el = current[i2];
      if (node !== el) {
        const isParent = el.parentNode === parent;
        if (!inserted && !i2)
          isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
        else
          isParent && el.remove();
      } else
        inserted = true;
    }
  } else
    parent.insertBefore(node, marker);
  return [node];
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return `${hydrate.id}${hydrate.count++}`;
}
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
function createElement(tagName, isSVG = false) {
  return isSVG ? document.createElementNS(SVG_NAMESPACE, tagName) : document.createElement(tagName);
}
function Portal(props) {
  const {
    useShadow
  } = props, marker = document.createTextNode(""), mount = props.mount || document.body;
  function renderPortal() {
    if (sharedConfig.context) {
      const [s2, set] = createSignal(false);
      queueMicrotask(() => set(true));
      return () => s2() && props.children;
    } else
      return () => props.children;
  }
  if (mount instanceof HTMLHeadElement) {
    const [clean, setClean] = createSignal(false);
    const cleanup = () => setClean(true);
    createRoot((dispose2) => insert(mount, () => !clean() ? renderPortal()() : dispose2(), null));
    onCleanup(() => {
      if (sharedConfig.context)
        queueMicrotask(cleanup);
      else
        cleanup();
    });
  } else {
    const container = createElement(props.isSVG ? "g" : "div", props.isSVG), renderRoot = useShadow && container.attachShadow ? container.attachShadow({
      mode: "open"
    }) : container;
    Object.defineProperty(container, "_$host", {
      get() {
        return marker.parentNode;
      },
      configurable: true
    });
    insert(renderRoot, renderPortal());
    mount.appendChild(container);
    props.ref && props.ref(container);
    onCleanup(() => mount.removeChild(container));
  }
  return marker;
}
function Dynamic(props) {
  const [p2, others] = splitProps(props, ["component"]);
  const cached = createMemo(() => p2.component);
  return createMemo(() => {
    const component = cached();
    switch (typeof component) {
      case "function":
        return untrack(() => component(others));
      case "string":
        const isSvg = SVGElements.has(component);
        const el = sharedConfig.context ? getNextElement() : createElement(component, isSvg);
        spread(el, others, isSvg);
        return el;
    }
  });
}
var [walletsModalOpen, setWalletsModalOpen] = createSignal(false);
var [lastSelectedWalletInfo, setLastSelectedWalletInfo] = createSignal(null);
var [action, setAction] = createSignal(null);
var e = { data: "" };
var t = (t2) => "object" == typeof window ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e;
var l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
var a = /\/\*[^]*?\*\/|  +/g;
var n = /\n+/g;
var o = (e2, t2) => {
  let r = "", l2 = "", a2 = "";
  for (let n2 in e2) {
    let c2 = e2[n2];
    "@" == n2[0] ? "i" == n2[1] ? r = n2 + " " + c2 + ";" : l2 += "f" == n2[1] ? o(c2, n2) : n2 + "{" + o(c2, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c2 ? l2 += o(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/(^:.*)|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c2 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c2) : n2 + ":" + c2 + ";");
  }
  return r + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
};
var c = {};
var s = (e2) => {
  if ("object" == typeof e2) {
    let t2 = "";
    for (let r in e2)
      t2 += r + s(e2[r]);
    return t2;
  }
  return e2;
};
var i = (e2, t2, r, i2, p2) => {
  let u2 = s(e2), d = c[u2] || (c[u2] = ((e3) => {
    let t3 = 0, r2 = 11;
    for (; t3 < e3.length; )
      r2 = 101 * r2 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r2;
  })(u2));
  if (!c[d]) {
    let t3 = u2 !== e2 ? e2 : ((e3) => {
      let t4, r2, o2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); )
        t4[4] ? o2.shift() : t4[3] ? (r2 = t4[3].replace(n, " ").trim(), o2.unshift(o2[0][r2] = o2[0][r2] || {})) : o2[0][t4[1]] = t4[2].replace(n, " ").trim();
      return o2[0];
    })(e2);
    c[d] = o(p2 ? { ["@keyframes " + d]: t3 } : t3, r ? "" : "." + d);
  }
  let f = r && c.g ? c.g : null;
  return r && (c.g = c[d]), ((e3, t3, r2, l2) => {
    l2 ? t3.data = t3.data.replace(l2, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r2 ? e3 + t3.data : t3.data + e3);
  })(c[d], t2, i2, f), d;
};
var p = (e2, t2, r) => e2.reduce((e3, l2, a2) => {
  let n2 = t2[a2];
  if (n2 && n2.call) {
    let e4 = n2(r), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o(e4, "") : false === e4 ? "" : e4;
  }
  return e3 + l2 + (null == n2 ? "" : n2);
}, "");
function u(e2) {
  let r = this || {}, l2 = e2.call ? e2(r.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r.p) : t2), {}) : l2, t(r.target), r.g, r.o, r.k);
}
u.bind({ g: 1 });
var h = u.bind({ k: 1 });
var ThemeContext = createContext();
function ThemeProvider(props) {
  return createComponent(ThemeContext.Provider, {
    value: props.theme,
    get children() {
      return props.children;
    }
  });
}
function useTheme() {
  return useContext(ThemeContext);
}
function makeStyled(tag) {
  let _ctx = this || {};
  return (...args) => {
    const Styled = (props) => {
      const theme = useContext(ThemeContext);
      const withTheme = mergeProps(props, { theme });
      const clone = mergeProps(withTheme, {
        get class() {
          const pClass = withTheme.class, append = "class" in withTheme && /^go[0-9]+/.test(pClass);
          let className2 = u.apply(
            { target: _ctx.target, o: append, p: withTheme, g: _ctx.g },
            args
          );
          return [pClass, className2].filter(Boolean).join(" ");
        }
      });
      const [local, newProps] = splitProps(clone, ["as", "theme"]);
      const htmlProps = newProps;
      const createTag = local.as || tag;
      let el;
      if (typeof createTag === "function") {
        el = createTag(htmlProps);
      } else {
        {
          if (_ctx.g == 1) {
            el = document.createElement(createTag);
            spread(el, htmlProps);
          } else {
            el = Dynamic(mergeProps({ component: createTag }, htmlProps));
          }
        }
      }
      return el;
    };
    Styled.class = (props) => {
      return untrack(() => {
        return u.apply({ target: _ctx.target, p: props, g: _ctx.g }, args);
      });
    };
    return Styled;
  };
}
var styled = new Proxy(makeStyled, {
  get(target, tag) {
    return target(tag);
  }
});
function createGlobalStyles() {
  const fn = makeStyled.call({ g: 1 }, "div").apply(null, arguments);
  return function GlobalStyles2(props) {
    fn(props);
    return null;
  };
}
var common$1 = {
  close: "Close",
  openWallet: "Open wallet",
  get: "GET",
  learnMore: "Learn more",
  openExtension: "Open Extension",
  copyLink: "Copy Link",
  copied: "Copied!",
  yourWallet: "your wallet"
};
var button$1 = {
  connectWallet: "Connect Wallet",
  dropdown: {
    copy: "Copy address",
    copied: "Address copied!",
    disconnect: "Disconnect"
  }
};
var notifications$1 = {
  confirm: {
    header: "Open {{ name }} to confirm the transaction."
  },
  transactionSent: {
    header: "Transaction sent",
    text: "Your transaction will be processed in a few seconds."
  },
  transactionCanceled: {
    header: "Transaction canceled",
    text: "There will be no changes to your account."
  }
};
var walletModal$1 = {
  loading: "Loading wallets",
  qrCode: "QR Code",
  wallets: "Wallets",
  universalQRModal: {
    scanQR: "Scan the code below with a camera in your TON wallet.",
    openWallet: "Open Wallet",
    openInstalledWallet: "Open Wallet",
    dontHave: "Explore TON wallets"
  },
  desktopSelectWalletModal: {
    selectWallet: "Select a wallet to connect."
  },
  mobileSelectWalletModal: {
    connectWallet: "Connect a Wallet",
    selectWallet: "$walletModal.desktopSelectWalletModal.selectWallet",
    installedWallet: "Installed Wallet"
  },
  qrCodeModal: {
    connectWith: "Connect with {{ name }}",
    scan: "Scan the code below.",
    openWallet: "Open {{ name }}",
    openExtension: "Open Extension",
    dontHave: "Don't have {{ name }}?"
  }
};
var actionModal$1 = {
  confirmTransaction: {
    header: "Confirm the transaction in {{ name }}",
    text: "It will only take a moment."
  },
  transactionSent: "$notifications.transactionSent",
  transactionCanceled: "$notifications.transactionCanceled"
};
var en = {
  common: common$1,
  button: button$1,
  notifications: notifications$1,
  walletModal: walletModal$1,
  actionModal: actionModal$1
};
var common = {
  close: "Закрыть",
  openWallet: "Открыть кошелек",
  get: "Скачать",
  learnMore: "Подробнее",
  openExtension: "Расширение",
  copyLink: "Копировать ссылку",
  copied: "Скопировано!",
  yourWallet: "вашем кошельке"
};
var button = {
  connectWallet: "Подключить кошелёк",
  dropdown: {
    copy: "Скопировать адрес",
    copied: "Адрес скопирован!",
    disconnect: "Отключить кошелёк"
  }
};
var notifications = {
  confirm: {
    header: "Откройте {{ name }}, чтобы подтвердить транзакцию."
  },
  transactionSent: {
    header: "Транзакция отправлена",
    text: "Ваша транзакция будет обработана через несколько секунд."
  },
  transactionCanceled: {
    header: "Транзакция отменена",
    text: "Состояние вашего счёта не изменится."
  }
};
var walletModal = {
  loading: "Список кошельков загружается",
  qrCode: "QR-код",
  wallets: "Кошельки",
  universalQRModal: {
    scanQR: "Отсканируйте код ниже с помощью камеры в вашем TON-кошельке.",
    openWallet: "Открыть кошелёк",
    openInstalledWallet: "Открыть кошелёк",
    dontHave: "Подробнее о TON кошельках"
  },
  desktopSelectWalletModal: {
    selectWallet: "Выберите кошелёк для подключения."
  },
  mobileSelectWalletModal: {
    connectWallet: "Подключите кошелёк",
    selectWallet: "$walletModal.desktopSelectWalletModal.selectWallet",
    installedWallet: "Открыть кошелёк"
  },
  qrCodeModal: {
    connectWith: "Подключиться через {{ name }}",
    scan: "Отсканируйте код ниже.",
    openWallet: "Открыть {{ name }}",
    openExtension: "Расширение",
    dontHave: "У вас нет {{ name }}?"
  }
};
var actionModal = {
  confirmTransaction: {
    header: "Подтвердите действие в {{ name }}",
    text: "Это займет пару секунд."
  },
  transactionSent: "$notifications.transactionSent",
  transactionCanceled: "$notifications.transactionCanceled"
};
var ru = {
  common,
  button,
  notifications,
  walletModal,
  actionModal
};
var i18nDictionary = {
  en: parseDictionary(en),
  ru: parseDictionary(ru)
};
function parseDictionary(dictionary) {
  const refSymbol = "$";
  const iterate = (subDictionary) => {
    Object.entries(subDictionary).forEach(([key, value]) => {
      if (typeof value === "object" && value) {
        return iterate(value);
      }
      if (typeof value === "string") {
        if (value[0] === refSymbol) {
          const path = value.slice(1).split(".");
          let obj = dictionary;
          path.forEach((item) => {
            if (item in obj) {
              obj = obj[item];
            } else {
              throw new Error(
                `Cannot parse translations: there is no property ${item} in translation`
              );
            }
          });
          subDictionary[key] = obj;
        }
        if (value.slice(0, 2) === `\\${refSymbol}`) {
          subDictionary[key] = value.slice(1);
        }
      }
    });
  };
  iterate(dictionary);
  return dictionary;
}
var ConnectorContext = createContext();
var $RAW = Symbol("store-raw");
var $NODE = Symbol("store-node");
var $NAME = Symbol("store-name");
function wrap$1(value, name) {
  let p2 = value[$PROXY];
  if (!p2) {
    Object.defineProperty(value, $PROXY, {
      value: p2 = new Proxy(value, proxyTraps$1)
    });
    if (!Array.isArray(value)) {
      const keys = Object.keys(value), desc = Object.getOwnPropertyDescriptors(value);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const prop = keys[i2];
        if (desc[prop].get) {
          Object.defineProperty(value, prop, {
            enumerable: desc[prop].enumerable,
            get: desc[prop].get.bind(p2)
          });
        }
      }
    }
  }
  return p2;
}
function isWrappable(obj) {
  let proto;
  return obj != null && typeof obj === "object" && (obj[$PROXY] || !(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype || Array.isArray(obj));
}
function unwrap(item, set = /* @__PURE__ */ new Set()) {
  let result, unwrapped, v, prop;
  if (result = item != null && item[$RAW])
    return result;
  if (!isWrappable(item) || set.has(item))
    return item;
  if (Array.isArray(item)) {
    if (Object.isFrozen(item))
      item = item.slice(0);
    else
      set.add(item);
    for (let i2 = 0, l2 = item.length; i2 < l2; i2++) {
      v = item[i2];
      if ((unwrapped = unwrap(v, set)) !== v)
        item[i2] = unwrapped;
    }
  } else {
    if (Object.isFrozen(item))
      item = Object.assign({}, item);
    else
      set.add(item);
    const keys = Object.keys(item), desc = Object.getOwnPropertyDescriptors(item);
    for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
      prop = keys[i2];
      if (desc[prop].get)
        continue;
      v = item[prop];
      if ((unwrapped = unwrap(v, set)) !== v)
        item[prop] = unwrapped;
    }
  }
  return item;
}
function getDataNodes(target) {
  let nodes = target[$NODE];
  if (!nodes)
    Object.defineProperty(target, $NODE, {
      value: nodes = {}
    });
  return nodes;
}
function getDataNode(nodes, property, value) {
  return nodes[property] || (nodes[property] = createDataNode(value));
}
function proxyDescriptor$1(target, property) {
  const desc = Reflect.getOwnPropertyDescriptor(target, property);
  if (!desc || desc.get || !desc.configurable || property === $PROXY || property === $NODE || property === $NAME)
    return desc;
  delete desc.value;
  delete desc.writable;
  desc.get = () => target[$PROXY][property];
  return desc;
}
function trackSelf(target) {
  if (getListener()) {
    const nodes = getDataNodes(target);
    (nodes._ || (nodes._ = createDataNode()))();
  }
}
function ownKeys(target) {
  trackSelf(target);
  return Reflect.ownKeys(target);
}
function createDataNode(value) {
  const [s2, set] = createSignal(value, {
    equals: false,
    internal: true
  });
  s2.$ = set;
  return s2;
}
var proxyTraps$1 = {
  get(target, property, receiver) {
    if (property === $RAW)
      return target;
    if (property === $PROXY)
      return receiver;
    if (property === $TRACK) {
      trackSelf(target);
      return receiver;
    }
    const nodes = getDataNodes(target);
    const tracked = nodes.hasOwnProperty(property);
    let value = tracked ? nodes[property]() : target[property];
    if (property === $NODE || property === "__proto__")
      return value;
    if (!tracked) {
      const desc = Object.getOwnPropertyDescriptor(target, property);
      if (getListener() && (typeof value !== "function" || target.hasOwnProperty(property)) && !(desc && desc.get))
        value = getDataNode(nodes, property, value)();
    }
    return isWrappable(value) ? wrap$1(value) : value;
  },
  has(target, property) {
    if (property === $RAW || property === $PROXY || property === $TRACK || property === $NODE || property === "__proto__")
      return true;
    this.get(target, property, target);
    return property in target;
  },
  set() {
    return true;
  },
  deleteProperty() {
    return true;
  },
  ownKeys,
  getOwnPropertyDescriptor: proxyDescriptor$1
};
function setProperty(state, property, value, deleting = false) {
  if (!deleting && state[property] === value)
    return;
  const prev = state[property], len = state.length;
  if (value === void 0)
    delete state[property];
  else
    state[property] = value;
  let nodes = getDataNodes(state), node;
  if (node = getDataNode(nodes, property, prev))
    node.$(() => value);
  if (Array.isArray(state) && state.length !== len)
    (node = getDataNode(nodes, "length", len)) && node.$(state.length);
  (node = nodes._) && node.$();
}
function mergeStoreNode(state, value) {
  const keys = Object.keys(value);
  for (let i2 = 0; i2 < keys.length; i2 += 1) {
    const key = keys[i2];
    setProperty(state, key, value[key]);
  }
}
function updateArray(current, next) {
  if (typeof next === "function")
    next = next(current);
  next = unwrap(next);
  if (Array.isArray(next)) {
    if (current === next)
      return;
    let i2 = 0, len = next.length;
    for (; i2 < len; i2++) {
      const value = next[i2];
      if (current[i2] !== value)
        setProperty(current, i2, value);
    }
    setProperty(current, "length", len);
  } else
    mergeStoreNode(current, next);
}
function updatePath(current, path, traversed = []) {
  let part, prev = current;
  if (path.length > 1) {
    part = path.shift();
    const partType = typeof part, isArray = Array.isArray(current);
    if (Array.isArray(part)) {
      for (let i2 = 0; i2 < part.length; i2++) {
        updatePath(current, [part[i2]].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "function") {
      for (let i2 = 0; i2 < current.length; i2++) {
        if (part(current[i2], i2))
          updatePath(current, [i2].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "object") {
      const {
        from = 0,
        to = current.length - 1,
        by = 1
      } = part;
      for (let i2 = from; i2 <= to; i2 += by) {
        updatePath(current, [i2].concat(path), traversed);
      }
      return;
    } else if (path.length > 1) {
      updatePath(current[part], path, [part].concat(traversed));
      return;
    }
    prev = current[part];
    traversed = [part].concat(traversed);
  }
  let value = path[0];
  if (typeof value === "function") {
    value = value(prev, traversed);
    if (value === prev)
      return;
  }
  if (part === void 0 && value == void 0)
    return;
  value = unwrap(value);
  if (part === void 0 || isWrappable(prev) && isWrappable(value) && !Array.isArray(value)) {
    mergeStoreNode(prev, value);
  } else
    setProperty(current, part, value);
}
function createStore(...[store, options]) {
  const unwrappedStore = unwrap(store || {});
  const isArray = Array.isArray(unwrappedStore);
  const wrappedStore = wrap$1(unwrappedStore);
  function setStore(...args) {
    batch(() => {
      isArray && args.length === 1 ? updateArray(unwrappedStore, args[0]) : updatePath(unwrappedStore, args);
    });
  }
  return [wrappedStore, setStore];
}
var THEME = ((THEME2) => {
  THEME2["DARK"] = "DARK";
  THEME2["LIGHT"] = "LIGHT";
  return THEME2;
})(THEME || {});
var defaultLightColorsSet = {
  constant: {
    black: "#000000",
    white: "#FFFFFF"
  },
  connectButton: {
    background: "#31A6F5",
    foreground: "#FFFFFF"
  },
  accent: "#31A6F5",
  icon: {
    primary: "#0F0F0F",
    secondary: "#7A8999",
    tertiary: "#C1CAD2",
    success: "#29CC6A",
    error: "#F5A73B"
  },
  background: {
    primary: "#FFFFFF",
    secondary: "#F1F3F5",
    segment: "#FFFFFF"
  },
  text: {
    primary: "#0F0F0F",
    secondary: "#6A7785"
  }
};
var defaultDarkColorsSet = {
  constant: {
    black: "#000000",
    white: "#FFFFFF"
  },
  connectButton: {
    background: "#31A6F5",
    foreground: "#FFFFFF"
  },
  accent: "#E5E5EA",
  icon: {
    primary: "#E5E5EA",
    secondary: "#909099",
    tertiary: "#434347",
    success: "#29CC6A",
    error: "#F5A73B"
  },
  background: {
    primary: "#121214",
    secondary: "#18181A",
    segment: "#262629"
  },
  text: {
    primary: "#E5E5EA",
    secondary: "#7D7D85"
  }
};
function isObject(o2) {
  return Object.prototype.toString.call(o2) === "[object Object]";
}
function isPlainObject(o2) {
  var ctor, prot;
  if (isObject(o2) === false)
    return false;
  ctor = o2.constructor;
  if (ctor === void 0)
    return true;
  prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function mergeOptions(options, defaultOptions) {
  if (!options) {
    return defaultOptions;
  }
  const overwriteMerge = (_, sourceArray, __) => sourceArray;
  return (0, import_deepmerge.default)(defaultOptions, options, {
    arrayMerge: overwriteMerge,
    isMergeableObject: isPlainObject
  });
}
var [themeState, setThemeState] = createStore({
  theme: THEME.LIGHT,
  colors: defaultLightColorsSet,
  borderRadius: "m"
});
var themeColorsMappingDefault = {
  [THEME.LIGHT]: defaultLightColorsSet,
  [THEME.DARK]: defaultDarkColorsSet
};
var themeCustomColors = {
  [THEME.LIGHT]: void 0,
  [THEME.DARK]: void 0
};
function setTheme(theme, colorsSet) {
  if (colorsSet) {
    themeCustomColors[THEME.DARK] = mergeOptions(
      colorsSet[THEME.DARK],
      themeCustomColors[THEME.DARK]
    );
    themeCustomColors[THEME.LIGHT] = mergeOptions(
      colorsSet[THEME.LIGHT],
      themeCustomColors[THEME.LIGHT]
    );
  }
  setThemeState({
    theme,
    colors: mergeOptions(themeCustomColors[theme], themeColorsMappingDefault[theme])
  });
}
function setBorderRadius(borderRadius) {
  setThemeState({ borderRadius });
}
function setColors(colorsSet) {
  themeCustomColors[THEME.DARK] = mergeOptions(
    colorsSet[THEME.DARK],
    themeCustomColors[THEME.DARK]
  );
  themeCustomColors[THEME.LIGHT] = mergeOptions(
    colorsSet[THEME.LIGHT],
    themeCustomColors[THEME.LIGHT]
  );
  setThemeState((state) => ({
    colors: mergeOptions(
      themeCustomColors[state.theme],
      themeColorsMappingDefault[state.theme]
    )
  }));
}
var globalStylesTag = "tc-root";
var disableScrollClass = "tc-disable-scroll";
var usingMouseClass = "tc-using-mouse";
var GlobalStyles = () => {
  document.body.addEventListener("mousedown", () => document.body.classList.add(usingMouseClass));
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      document.body.classList.remove(usingMouseClass);
    }
  });
  const Styles = createGlobalStyles`
    ${globalStylesTag} * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
        font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, Tahoma, Verdana, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;        
        -webkit-tap-highlight-color: transparent;
    }
    
    ${globalStylesTag} img {
      -webkit-user-select: none;
      -webkit-touch-callout: none;
    }   
 
    ${globalStylesTag} *:focus {
        outline: #08f auto 2px;
    }
    
    ${globalStylesTag} li {
        list-style: none;
    }
    
    ${globalStylesTag} button {
        outline: none;
    }
    
    body.${disableScrollClass} {
        position: fixed; 
        overflow-y: scroll;
        right: 0;
        left: 0;
    }
    
    body.${usingMouseClass} ${globalStylesTag} *:focus {
        outline: none;
    }
`;
  return createComponent(Styles, {});
};
var ImagePlaceholder = styled.div`
    background-color: ${(props) => props.theme.colors.background.secondary};
`;
var Image = (props) => {
  let imgRef;
  const [image, setImage] = createSignal(null);
  createEffect(() => {
    const img = new window.Image();
    img.src = props.src;
    img.alt = props.alt || "";
    img.setAttribute("draggable", "false");
    if (props.class) {
      img.classList.add(props.class);
    }
    if (img.complete) {
      return setImage(img);
    }
    img.addEventListener("load", () => setImage(img));
    return () => img.removeEventListener("load", () => setImage(img));
  });
  return [createComponent(Show, {
    get when() {
      return image();
    },
    get children() {
      return image();
    }
  }), createComponent(Show, {
    get when() {
      return !image();
    },
    get children() {
      return createComponent(ImagePlaceholder, {
        get ["class"]() {
          return props.class;
        },
        ref(r$) {
          const _ref$ = imgRef;
          typeof _ref$ === "function" ? _ref$(r$) : imgRef = r$;
        }
      });
    }
  })];
};
function hexToRgb(hex) {
  if (hex[0] === "#") {
    hex = hex.slice(1);
  }
  const bigint = parseInt(hex, 16);
  const r = bigint >> 16 & 255;
  const g = bigint >> 8 & 255;
  const b = bigint & 255;
  return [r, g, b].join(",");
}
function rgba(color, opacity) {
  if (color[0] === "#") {
    color = hexToRgb(color);
  }
  return `rgba(${color}, ${opacity})`;
}
function toPx(value) {
  return value.toString() + "px";
}
var TonConnectUIError = class _TonConnectUIError extends TonConnectError {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _TonConnectUIError.prototype);
  }
};
function openLink(href, target = "_self") {
  return window.open(href, target, "noreferrer noopener");
}
function openLinkBlank(href) {
  openLink(href, "_blank");
}
function getSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return THEME.LIGHT;
  }
  return THEME.DARK;
}
function subscribeToThemeChange(callback) {
  const handler = (event) => callback(event.matches ? THEME.DARK : THEME.LIGHT);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handler);
  return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handler);
}
function addQueryParameter(url, key, value) {
  const parsed = new URL(url);
  parsed.searchParams.append(key, value);
  return parsed.toString();
}
function addReturnStrategy(url, returnStrategy) {
  return addQueryParameter(url, "ret", returnStrategy);
}
function disableScroll() {
  if (document.documentElement.scrollHeight === document.documentElement.clientHeight) {
    return;
  }
  document.body.style.top = toPx(-document.documentElement.scrollTop);
  document.body.classList.add(disableScrollClass);
}
function enableScroll() {
  document.body.classList.remove(disableScrollClass);
  document.documentElement.scrollTo({ top: -parseFloat(getComputedStyle(document.body).top) });
  document.body.style.top = "auto";
}
function fixMobileSafariActiveTransition() {
  if (!document.body.hasAttribute("ontouchstart")) {
    document.body.setAttribute("ontouchstart", "");
  }
}
function defineStylesRoot() {
  customElements.define(globalStylesTag, class TcRootElement extends HTMLDivElement {
  }, {
    extends: "div"
  });
}
function preloadImages(images) {
  images.forEach((img) => {
    const node = new window.Image();
    node.src = img;
  });
}
function checkLocalStorageExists() {
  if (typeof localStorage === "undefined") {
    throw new TonConnectUIError(
      "window.localStorage is undefined. localStorage is required for TonConnectUI"
    );
  }
}
function getWindow$1() {
  if (typeof window !== "undefined") {
    return window;
  }
  return void 0;
}
function isMobileUserAgent() {
  let check = false;
  (function(a2) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a2
    ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a2.slice(0, 4)
    ))
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
function getUserAgent() {
  var _a, _b;
  const results = new import_ua_parser_js.default().getResult();
  const osName = (_a = results.os.name) == null ? void 0 : _a.toLowerCase();
  let os;
  switch (true) {
    case osName === "ios":
      os = "ios";
      break;
    case osName === "android":
      os = "android";
      break;
    case osName === "mac os":
      os = "macos";
      break;
    case osName === "linux":
      os = "linux";
      break;
    case (osName == null ? void 0 : osName.includes("windows")):
      os = "windows";
      break;
  }
  const browserName = (_b = results.browser.name) == null ? void 0 : _b.toLowerCase();
  let browser;
  switch (true) {
    case browserName === "chrome":
      browser = "chrome";
      break;
    case browserName === "firefox":
      browser = "firefox";
      break;
    case (browserName == null ? void 0 : browserName.includes("safari")):
      browser = "safari";
      break;
  }
  return {
    os,
    browser
  };
}
var maxWidth = {
  mobile: 440,
  tablet: 1020
};
function isDevice(device) {
  const window2 = getWindow$1();
  if (!window2) {
    return device === "desktop";
  }
  const width = window2.innerWidth;
  switch (device) {
    case "desktop":
      return width > maxWidth.tablet;
    case "tablet":
      return width > maxWidth.mobile;
    default:
    case "mobile":
      return width <= maxWidth.mobile;
  }
}
function media(device) {
  switch (device) {
    case "mobile":
      return `@media (max-width: ${maxWidth.mobile}px)`;
    case "tablet":
      return `@media (max-width: ${maxWidth.tablet}px) (min-width: ${maxWidth.mobile}px)`;
    default:
    case "desktop":
      return `@media (min-width: ${maxWidth.tablet}px)`;
  }
}
var mediaTouch = "@media (hover: none)";
var mediaNotTouch = "@media not all and (hover: none)";
var borders$5 = {
  m: "100vh",
  s: "8px",
  none: "0"
};
var scaleValues = {
  s: 0.02,
  m: 0.04
};
var ButtonStyled$3 = styled.button`
    background-color: ${(props) => props.appearance === "flat" ? "transparent" : rgba(props.theme.colors.accent, 0.12)};
    color: ${(props) => props.theme.colors.accent};

    padding: ${(props) => props.appearance === "flat" ? "0" : "9px 16px"};
    border: none;
    border-radius: ${(props) => borders$5[props.theme.borderRadius]};
    cursor: ${(props) => props.disabled ? "not-allowed" : "pointer"};

    font-size: 14px;
    font-weight: 590;
    line-height: 18px;

    transition: transform 0.125s ease-in-out;

    ${mediaNotTouch} {
        &:hover {
            transform: ${(props) => props.disabled ? "unset" : `scale(${1 + scaleValues[props.scale]})`};
        }
    }

    &:active {
        transform: ${(props) => props.disabled ? "unset" : `scale(${1 - scaleValues[props.scale]})`};
    }

    ${mediaTouch} {
        &:active {
            transform: ${(props) => props.disabled ? "unset" : `scale(${1 - scaleValues[props.scale] * 2})`};
        }
    }
`;
function useDataAttributes(props) {
  const keys = untrack(() => Object.keys(props).filter((key) => key.startsWith("data-")));
  const [dataAttrs] = splitProps(props, keys);
  return dataAttrs;
}
var Button = (props) => {
  const dataAttrs = useDataAttributes(props);
  return createComponent(ButtonStyled$3, mergeProps({
    get appearance() {
      return props.appearance || "primary";
    },
    get ["class"]() {
      return props.class;
    },
    onClick: (e2) => {
      var _a;
      return (_a = props.onClick) == null ? void 0 : _a.call(props, e2);
    },
    onMouseEnter: (e2) => {
      var _a;
      return (_a = props.onMouseEnter) == null ? void 0 : _a.call(props, e2);
    },
    onMouseLeave: (e2) => {
      var _a;
      return (_a = props.onMouseLeave) == null ? void 0 : _a.call(props, e2);
    },
    ref(r$) {
      const _ref$ = props.ref;
      typeof _ref$ === "function" ? _ref$(r$) : props.ref = r$;
    },
    get disabled() {
      return props.disabled;
    },
    get scale() {
      return props.scale || "m";
    },
    "data-tc-button": "true"
  }, dataAttrs, {
    get children() {
      return props.children;
    }
  }));
};
function nextFrame(fn) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}
var Transition = (props) => {
  let el;
  let first = true;
  const [s1, set1] = createSignal();
  const [s2, set2] = createSignal();
  const resolved = children(() => props.children);
  const {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeExit,
    onExit,
    onAfterExit
  } = props;
  const classnames = createMemo(() => {
    const name = props.name || "s";
    return {
      enterActiveClass: props.enterActiveClass || name + "-enter-active",
      enterClass: props.enterClass || name + "-enter",
      enterToClass: props.enterToClass || name + "-enter-to",
      exitActiveClass: props.exitActiveClass || name + "-exit-active",
      exitClass: props.exitClass || name + "-exit",
      exitToClass: props.exitToClass || name + "-exit-to"
    };
  });
  function enterTransition(el2, prev) {
    if (!first || props.appear) {
      let endTransition = function(e2) {
        if (el2 && (!e2 || e2.target === el2)) {
          el2.removeEventListener("transitionend", endTransition);
          el2.removeEventListener("animationend", endTransition);
          el2.classList.remove(...enterActiveClasses);
          el2.classList.remove(...enterToClasses);
          batch(() => {
            s1() !== el2 && set1(el2);
            s2() === el2 && set2(void 0);
          });
          onAfterEnter && onAfterEnter(el2);
          if (props.mode === "inout")
            exitTransition(el2, prev);
        }
      };
      const enterClasses = classnames().enterClass.split(" ");
      const enterActiveClasses = classnames().enterActiveClass.split(" ");
      const enterToClasses = classnames().enterToClass.split(" ");
      onBeforeEnter && onBeforeEnter(el2);
      el2.classList.add(...enterClasses);
      el2.classList.add(...enterActiveClasses);
      nextFrame(() => {
        el2.classList.remove(...enterClasses);
        el2.classList.add(...enterToClasses);
        onEnter && onEnter(el2, () => endTransition());
        if (!onEnter || onEnter.length < 2) {
          el2.addEventListener("transitionend", endTransition);
          el2.addEventListener("animationend", endTransition);
        }
      });
    }
    prev && !props.mode ? set2(el2) : set1(el2);
  }
  function exitTransition(el2, prev) {
    const exitClasses = classnames().exitClass.split(" ");
    const exitActiveClasses = classnames().exitActiveClass.split(" ");
    const exitToClasses = classnames().exitToClass.split(" ");
    if (!prev.parentNode)
      return endTransition();
    onBeforeExit && onBeforeExit(prev);
    prev.classList.add(...exitClasses);
    prev.classList.add(...exitActiveClasses);
    nextFrame(() => {
      prev.classList.remove(...exitClasses);
      prev.classList.add(...exitToClasses);
    });
    onExit && onExit(prev, () => endTransition());
    if (!onExit || onExit.length < 2) {
      prev.addEventListener("transitionend", endTransition);
      prev.addEventListener("animationend", endTransition);
    }
    function endTransition(e2) {
      if (!e2 || e2.target === prev) {
        prev.removeEventListener("transitionend", endTransition);
        prev.removeEventListener("animationend", endTransition);
        prev.classList.remove(...exitActiveClasses);
        prev.classList.remove(...exitToClasses);
        s1() === prev && set1(void 0);
        onAfterExit && onAfterExit(prev);
        if (props.mode === "outin")
          enterTransition(el2, prev);
      }
    }
  }
  createComputed((prev) => {
    el = resolved();
    while (typeof el === "function")
      el = el();
    return untrack(() => {
      if (el && el !== prev) {
        if (props.mode !== "outin")
          enterTransition(el, prev);
        else if (first)
          set1(el);
      }
      if (prev && prev !== el && props.mode !== "inout")
        exitTransition(el, prev);
      first = false;
      return el;
    });
  });
  return [s1, s2];
};
function getRect(element) {
  const {
    top,
    bottom,
    left,
    right,
    width,
    height
  } = element.getBoundingClientRect();
  const parentRect = element.parentNode.getBoundingClientRect();
  return {
    top: top - parentRect.top,
    bottom,
    left: left - parentRect.left,
    right,
    width,
    height
  };
}
var TransitionGroup = (props) => {
  const resolved = children(() => props.children);
  const classnames = createMemo(() => {
    const name = props.name || "s";
    return {
      enterActiveClass: props.enterActiveClass || name + "-enter-active",
      enterClass: props.enterClass || name + "-enter",
      enterToClass: props.enterToClass || name + "-enter-to",
      exitActiveClass: props.exitActiveClass || name + "-exit-active",
      exitClass: props.exitClass || name + "-exit",
      exitToClass: props.exitToClass || name + "-exit-to",
      moveClass: props.moveClass || name + "-move"
    };
  });
  const {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeExit,
    onExit,
    onAfterExit
  } = props;
  const [combined, setCombined] = createSignal();
  let p2 = [];
  let first = true;
  createComputed(() => {
    const c2 = resolved();
    const comb = [...c2];
    const next = new Set(c2);
    const prev = new Set(p2);
    const enterClasses = classnames().enterClass.split(" ");
    const enterActiveClasses = classnames().enterActiveClass.split(" ");
    const enterToClasses = classnames().enterToClass.split(" ");
    const exitClasses = classnames().exitClass.split(" ");
    const exitActiveClasses = classnames().exitActiveClass.split(" ");
    const exitToClasses = classnames().exitToClass.split(" ");
    for (let i2 = 0; i2 < c2.length; i2++) {
      const el = c2[i2];
      if (!first && !prev.has(el)) {
        let endTransition = function(e2) {
          if (el && (!e2 || e2.target === el)) {
            el.removeEventListener("transitionend", endTransition);
            el.removeEventListener("animationend", endTransition);
            el.classList.remove(...enterActiveClasses);
            el.classList.remove(...enterToClasses);
            onAfterEnter && onAfterEnter(el);
          }
        };
        onBeforeEnter && onBeforeEnter(el);
        el.classList.add(...enterClasses);
        el.classList.add(...enterActiveClasses);
        nextFrame(() => {
          el.classList.remove(...enterClasses);
          el.classList.add(...enterToClasses);
          onEnter && onEnter(el, () => endTransition());
          if (!onEnter || onEnter.length < 2) {
            el.addEventListener("transitionend", endTransition);
            el.addEventListener("animationend", endTransition);
          }
        });
      }
    }
    for (let i2 = 0; i2 < p2.length; i2++) {
      const old = p2[i2];
      if (!next.has(old) && old.parentNode) {
        let endTransition = function(e2) {
          if (!e2 || e2.target === old) {
            old.removeEventListener("transitionend", endTransition);
            old.removeEventListener("animationend", endTransition);
            old.classList.remove(...exitActiveClasses);
            old.classList.remove(...exitToClasses);
            onAfterExit && onAfterExit(old);
            p2 = p2.filter((i3) => i3 !== old);
            setCombined(p2);
          }
        };
        comb.splice(i2, 0, old);
        onBeforeExit && onBeforeExit(old);
        old.classList.add(...exitClasses);
        old.classList.add(...exitActiveClasses);
        nextFrame(() => {
          old.classList.remove(...exitClasses);
          old.classList.add(...exitToClasses);
        });
        onExit && onExit(old, () => endTransition());
        if (!onExit || onExit.length < 2) {
          old.addEventListener("transitionend", endTransition);
          old.addEventListener("animationend", endTransition);
        }
      }
    }
    p2 = comb;
    setCombined(comb);
  });
  createEffect((nodes) => {
    const c2 = combined();
    c2.forEach((child) => {
      let n2;
      if (!(n2 = nodes.get(child))) {
        nodes.set(child, n2 = {
          pos: getRect(child),
          new: !first
        });
      } else if (n2.new) {
        n2.new = false;
        n2.newPos = getRect(child);
      }
      if (n2.new) {
        child.addEventListener("transitionend", () => {
          n2.new = false;
          child.parentNode && (n2.newPos = getRect(child));
        }, {
          once: true
        });
      }
      n2.newPos && (n2.pos = n2.newPos);
      n2.newPos = getRect(child);
    });
    if (first) {
      first = false;
      return nodes;
    }
    c2.forEach((child) => {
      const c3 = nodes.get(child);
      const oldPos = c3.pos;
      const newPos = c3.newPos;
      const dx = oldPos.left - newPos.left;
      const dy = oldPos.top - newPos.top;
      if (dx || dy) {
        c3.moved = true;
        const s2 = child.style;
        s2.transform = `translate(${dx}px,${dy}px)`;
        s2.transitionDuration = "0s";
      }
    });
    document.body.offsetHeight;
    c2.forEach((child) => {
      const c3 = nodes.get(child);
      if (c3.moved) {
        let endTransition = function(e2) {
          if (e2 && e2.target !== child || !child.parentNode)
            return;
          if (!e2 || /transform$/.test(e2.propertyName)) {
            child.removeEventListener("transitionend", endTransition);
            child.classList.remove(...moveClasses);
          }
        };
        c3.moved = false;
        const s2 = child.style;
        const moveClasses = classnames().moveClass.split(" ");
        child.classList.add(...moveClasses);
        s2.transform = s2.transitionDuration = "";
        child.addEventListener("transitionend", endTransition);
      }
    });
    return nodes;
  }, /* @__PURE__ */ new Map());
  return combined;
};
function clickOutside$1(el, accessor) {
  const onClick = (e2) => {
    var _a;
    return !el.contains(e2.target) && ((_a = accessor()) == null ? void 0 : _a());
  };
  document.body.addEventListener("click", onClick);
  onCleanup(() => document.body.removeEventListener("click", onClick));
}
function escPressed(_, accessor) {
  const onKeyPress = (e2) => {
    var _a, _b;
    if (e2.key === "Escape") {
      (_a = document.activeElement) == null ? void 0 : _a.blur();
      (_b = accessor()) == null ? void 0 : _b();
    }
  };
  document.body.addEventListener("keydown", onKeyPress);
  onCleanup(() => document.body.removeEventListener("keydown", onKeyPress));
}
var _tmpl$$g = template$1(`<svg><path d="M9.1 3.40012L5.5 8.0001L9.1 12.6001" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>`, 4, true);
var rotationDegrees = {
  left: 0,
  top: 90,
  right: 180,
  bottom: 270
};
var ArrowIcon = (props) => {
  const theme = useTheme();
  const fill = () => props.fill || theme.colors.icon.secondary;
  const direction = () => props.direction || "left";
  const Svg = styled("svg")`
        transform: rotate(${(props2) => rotationDegrees[props2.svgDirection]}deg);
        transition: transform 0.1s ease-in-out;
    `;
  return createComponent(Svg, {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    get svgDirection() {
      return direction();
    },
    get children() {
      const _el$ = _tmpl$$g.cloneNode(true);
      createRenderEffect(() => setAttribute(_el$, "stroke", fill()));
      return _el$;
    }
  });
};
var _tmpl$$f = template$1(`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.90003 3.89991L8.00002 7.9999M8.00002 7.9999L12.1 12.0999M8.00002 7.9999L12.1 3.8999M8.00002 7.9999L3.90002 12.0999" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
var CloseIcon = (props) => {
  const theme = useTheme();
  const fill = () => props.fill || theme.colors.icon.secondary;
  return (() => {
    const _el$ = _tmpl$$f.cloneNode(true), _el$2 = _el$.firstChild;
    createRenderEffect(() => setAttribute(_el$2, "stroke", fill()));
    return _el$;
  })();
};
var IconButtonStyled = styled.button`
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.background.secondary};
    border: none;
    cursor: pointer;

    transition: transform 0.125s ease-in-out;

    ${mediaNotTouch} {
        &:hover {
            transform: scale(1.04);
        }
    }

    &:active {
        transform: scale(0.96);
    }

    ${mediaTouch} {
        &:active {
            transform: scale(0.92);
        }
    }
`;
var IconButton = (props) => {
  const dataAttrs = useDataAttributes(props);
  const icon = () => props.icon || "close";
  return createComponent(IconButtonStyled, mergeProps({
    get ["class"]() {
      return props.class;
    },
    onClick: () => props.onClick(),
    "data-tc-icon-button": "true"
  }, dataAttrs, {
    get children() {
      return [createComponent(Show, {
        get when() {
          return !!props.children;
        },
        get children() {
          return props.children;
        }
      }), createComponent(Show, {
        get when() {
          return !props.children;
        },
        get children() {
          return createComponent(Switch, {
            get children() {
              return [createComponent(Match, {
                get when() {
                  return icon() === "close";
                },
                get children() {
                  return createComponent(CloseIcon, {
                    get fill() {
                      return props.fill;
                    }
                  });
                }
              }), createComponent(Match, {
                get when() {
                  return icon() === "arrow";
                },
                get children() {
                  return createComponent(ArrowIcon, {
                    get fill() {
                      return props.fill;
                    }
                  });
                }
              })];
            }
          });
        }
      })];
    }
  }));
};
var ModalBackgroundStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);

    ${media("mobile")} {
        align-items: flex-end;
    }

    @media (min-width: ${maxWidth.mobile.toString()}px) and (max-height: 600px) {
        padding: 48px 0;
        align-items: flex-start;
        overflow: scroll;
    }
`;
var ModalWrapperClass = u`
    position: relative;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 16px 64px rgba(0, 0, 0, 0.16);
    min-height: 100px;
    width: 440px;
    padding: 44px 56px 24px;

    ${media("mobile")} {
        width: 100%;
    }
`;
var CloseButtonStyled = styled(IconButton)`
    position: absolute;
    right: 16px;
    top: 16px;
`;
var _tmpl$$e = template$1(`<div></div>`);
var clickOutside = clickOutside$1;
var keyPressed = escPressed;
var borders$4 = {
  m: "24px",
  s: "16px",
  none: "0"
};
var Modal = (props) => {
  const theme = useTheme();
  const dataAttrs = useDataAttributes(props);
  createEffect(() => {
    if (props.opened) {
      disableScroll();
    } else {
      enableScroll();
    }
  });
  return createComponent(Transition, {
    onBeforeEnter: (el) => {
      const duration = isDevice("mobile") ? 200 : 100;
      el.animate([{
        opacity: 0
      }, {
        opacity: 1
      }], {
        duration
      });
      if (isDevice("mobile")) {
        el.firstElementChild.animate([{
          transform: "translateY(390px)"
        }, {
          transform: "translateY(0)"
        }], {
          duration
        });
      }
    },
    onExit: (el, done) => {
      const duration = isDevice("mobile") ? 200 : 100;
      const backgroundAnimation = el.animate([{
        opacity: 1
      }, {
        opacity: 0
      }], {
        duration
      });
      if (isDevice("mobile")) {
        const contentAnimation = el.firstElementChild.animate([{
          transform: "translateY(0)"
        }, {
          transform: "translateY(390px)"
        }], {
          duration
        });
        Promise.all([backgroundAnimation.finished, contentAnimation.finished]).then(done);
      } else {
        backgroundAnimation.finished.then(done);
      }
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return props.opened;
        },
        get children() {
          return createComponent(ModalBackgroundStyled, mergeProps({
            "data-tc-modal": "true"
          }, dataAttrs, {
            get children() {
              const _el$ = _tmpl$$e.cloneNode(true);
              use(keyPressed, _el$, () => () => props.onClose());
              use(clickOutside, _el$, () => () => props.onClose());
              insert(_el$, createComponent(CloseButtonStyled, {
                icon: "close",
                onClick: () => props.onClose()
              }), null);
              insert(_el$, () => props.children, null);
              createRenderEffect(() => className(_el$, (0, import_classnames.default)(ModalWrapperClass, props.class, u`
                                background-color: ${theme.colors.background.primary};
                                border-radius: ${borders$4[theme.borderRadius]};

                                ${media("mobile")} {
                                    border-radius: ${borders$4[theme.borderRadius]}
                                        ${borders$4[theme.borderRadius]} 0 0;
                                }
                            `)));
              return _el$;
            }
          }));
        }
      });
    }
  });
};
var wrapperBorderRadius = {
  m: "22px",
  s: "12px",
  none: "0"
};
var sliderBorderRadius = {
  m: "18px",
  s: "8px",
  none: "0"
};
var TabBarStyled$1 = styled.div`
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    width: fit-content;
    justify-items: center;
    gap: 4px;

    position: relative;
    padding: 4px;
    border-radius: ${(props) => wrapperBorderRadius[props.theme.borderRadius]};

    background-color: ${(props) => props.theme.colors.background.secondary};
`;
var SliderStyled = styled.div`
    position: absolute;
    top: 4px;
    left: 4px;

    height: calc(100% - 8px);
    width: calc(50% - 4px);

    border-radius: ${(props) => sliderBorderRadius[props.theme.borderRadius]};
    background-color: ${(props) => props.theme.colors.background.segment};

    transform: ${(props) => props.right ? "translateX(100%)" : "translateX(0)"};

    transition: transform 0.13s ease-in-out;
`;
var InputStyled = styled.input`
    display: none;
`;
var LabelStyled = styled.label`
    padding: 9px 12px;
    z-index: 1;

    cursor: ${(props) => props.isActive ? "default" : "pointer"};

    transition: transform 0.13s ease-in-out;

    &:hover {
        transform: ${(props) => props.isActive ? "none" : "scale(1.025)"};
    }

    > * {
        ${(props) => !props.isActive ? `color: ${props.theme.colors.text.secondary};` : ""}
    }
`;
var TabBar = (props) => {
  const groupName = "tabBar" + Math.floor(Math.random() * 1e4);
  return createComponent(TabBarStyled$1, {
    get ["class"]() {
      return props.class;
    },
    "data-tc-tab-bar": "true",
    get children() {
      return [createComponent(SliderStyled, {
        get right() {
          return props.selectedTabIndex === 1;
        }
      }), createComponent(LabelStyled, {
        get isActive() {
          return props.selectedTabIndex === 0;
        },
        get children() {
          return [createComponent(InputStyled, {
            type: "radio",
            name: groupName,
            get checked() {
              return props.selectedTabIndex === 0;
            },
            onInput: () => {
              var _a;
              return (_a = props.onSelectedTabIndexChange) == null ? void 0 : _a.call(props, 0);
            }
          }), createMemo(() => props.tab1)];
        }
      }), createComponent(LabelStyled, {
        get isActive() {
          return props.selectedTabIndex === 1;
        },
        get children() {
          return [createComponent(InputStyled, {
            type: "radio",
            get checked() {
              return props.selectedTabIndex === 1;
            },
            name: groupName,
            onInput: () => {
              var _a;
              return (_a = props.onSelectedTabIndexChange) == null ? void 0 : _a.call(props, 1);
            }
          }), createMemo(() => props.tab2)];
        }
      })];
    }
  });
};
var borders$3 = {
  m: "16px",
  s: "8px",
  none: "0"
};
var qrNormalSize = 256;
var imgSizeDefault = 60;
var picSizeDefault = 48;
var qrPaddingTop = 24;
var QrCodeBackground = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background-color: ${(props) => props.theme.colors.background.secondary};
    border-radius: ${(props) => borders$3[props.theme.borderRadius]};
    padding: ${toPx(qrPaddingTop)} 0;
    height: ${toPx(qrNormalSize + qrPaddingTop * 2)};
    width: 100%;

    overflow: hidden;
`;
var QrCodeWrapper = styled.div`
    position: relative;

    width: fit-content;
    margin: 0 auto;

    > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    rect {
        fill: transparent;
    }

    path {
        fill: ${(props) => props.theme.colors.text.primary};
    }
`;
var ImageBackground = styled.div`
    position: absolute;
    width: ${toPx(imgSizeDefault)};
    height: ${toPx(imgSizeDefault)};
    background: ${(props) => props.theme.colors.background.secondary};

    display: flex;
    align-items: center;
    justify-content: center;
`;
var ImageStyled$2 = styled(Image)`
    width: ${(props) => toPx(props.size)};
    height: ${(props) => toPx(props.size)};
    border-radius: 12px;
`;
var CopyButtonStyled = styled(Button)`
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.08));
    position: absolute;
    bottom: 14px;
    left: 50%;

    transform: translate(-50%, 0);

    background-color: ${(props) => props.theme.colors.background.segment};
    color: ${(props) => props.theme.colors.text.primary};

    &:hover {
        transform: translate(-50%, 0) scale(1.04);
    }

    &:active {
        transform: translate(-50%, 0) scale(0.96);
    }
`;
var qrcode$1 = { exports: {} };
(function(module, exports) {
  var qrcode2 = function() {
    var qrcode3 = function(typeNumber, errorCorrectionLevel) {
      var PAD0 = 236;
      var PAD1 = 17;
      var _typeNumber = typeNumber;
      var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
      var _modules = null;
      var _moduleCount = 0;
      var _dataCache = null;
      var _dataList = [];
      var _this = {};
      var makeImpl = function(test, maskPattern) {
        _moduleCount = _typeNumber * 4 + 17;
        _modules = function(moduleCount) {
          var modules = new Array(moduleCount);
          for (var row = 0; row < moduleCount; row += 1) {
            modules[row] = new Array(moduleCount);
            for (var col = 0; col < moduleCount; col += 1) {
              modules[row][col] = null;
            }
          }
          return modules;
        }(_moduleCount);
        setupPositionProbePattern(0, 0);
        setupPositionProbePattern(_moduleCount - 7, 0);
        setupPositionProbePattern(0, _moduleCount - 7);
        setupPositionAdjustPattern();
        setupTimingPattern();
        setupTypeInfo(test, maskPattern);
        if (_typeNumber >= 7) {
          setupTypeNumber(test);
        }
        if (_dataCache == null) {
          _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
        }
        mapData(_dataCache, maskPattern);
      };
      var setupPositionProbePattern = function(row, col) {
        for (var r = -1; r <= 7; r += 1) {
          if (row + r <= -1 || _moduleCount <= row + r)
            continue;
          for (var c2 = -1; c2 <= 7; c2 += 1) {
            if (col + c2 <= -1 || _moduleCount <= col + c2)
              continue;
            if (0 <= r && r <= 6 && (c2 == 0 || c2 == 6) || 0 <= c2 && c2 <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c2 && c2 <= 4) {
              _modules[row + r][col + c2] = true;
            } else {
              _modules[row + r][col + c2] = false;
            }
          }
        }
      };
      var getBestMaskPattern = function() {
        var minLostPoint = 0;
        var pattern = 0;
        for (var i2 = 0; i2 < 8; i2 += 1) {
          makeImpl(true, i2);
          var lostPoint = QRUtil.getLostPoint(_this);
          if (i2 == 0 || minLostPoint > lostPoint) {
            minLostPoint = lostPoint;
            pattern = i2;
          }
        }
        return pattern;
      };
      var setupTimingPattern = function() {
        for (var r = 8; r < _moduleCount - 8; r += 1) {
          if (_modules[r][6] != null) {
            continue;
          }
          _modules[r][6] = r % 2 == 0;
        }
        for (var c2 = 8; c2 < _moduleCount - 8; c2 += 1) {
          if (_modules[6][c2] != null) {
            continue;
          }
          _modules[6][c2] = c2 % 2 == 0;
        }
      };
      var setupPositionAdjustPattern = function() {
        var pos = QRUtil.getPatternPosition(_typeNumber);
        for (var i2 = 0; i2 < pos.length; i2 += 1) {
          for (var j = 0; j < pos.length; j += 1) {
            var row = pos[i2];
            var col = pos[j];
            if (_modules[row][col] != null) {
              continue;
            }
            for (var r = -2; r <= 2; r += 1) {
              for (var c2 = -2; c2 <= 2; c2 += 1) {
                if (r == -2 || r == 2 || c2 == -2 || c2 == 2 || r == 0 && c2 == 0) {
                  _modules[row + r][col + c2] = true;
                } else {
                  _modules[row + r][col + c2] = false;
                }
              }
            }
          }
        }
      };
      var setupTypeNumber = function(test) {
        var bits = QRUtil.getBCHTypeNumber(_typeNumber);
        for (var i2 = 0; i2 < 18; i2 += 1) {
          var mod = !test && (bits >> i2 & 1) == 1;
          _modules[Math.floor(i2 / 3)][i2 % 3 + _moduleCount - 8 - 3] = mod;
        }
        for (var i2 = 0; i2 < 18; i2 += 1) {
          var mod = !test && (bits >> i2 & 1) == 1;
          _modules[i2 % 3 + _moduleCount - 8 - 3][Math.floor(i2 / 3)] = mod;
        }
      };
      var setupTypeInfo = function(test, maskPattern) {
        var data = _errorCorrectionLevel << 3 | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);
        for (var i2 = 0; i2 < 15; i2 += 1) {
          var mod = !test && (bits >> i2 & 1) == 1;
          if (i2 < 6) {
            _modules[i2][8] = mod;
          } else if (i2 < 8) {
            _modules[i2 + 1][8] = mod;
          } else {
            _modules[_moduleCount - 15 + i2][8] = mod;
          }
        }
        for (var i2 = 0; i2 < 15; i2 += 1) {
          var mod = !test && (bits >> i2 & 1) == 1;
          if (i2 < 8) {
            _modules[8][_moduleCount - i2 - 1] = mod;
          } else if (i2 < 9) {
            _modules[8][15 - i2 - 1 + 1] = mod;
          } else {
            _modules[8][15 - i2 - 1] = mod;
          }
        }
        _modules[_moduleCount - 8][8] = !test;
      };
      var mapData = function(data, maskPattern) {
        var inc = -1;
        var row = _moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        var maskFunc = QRUtil.getMaskFunction(maskPattern);
        for (var col = _moduleCount - 1; col > 0; col -= 2) {
          if (col == 6)
            col -= 1;
          while (true) {
            for (var c2 = 0; c2 < 2; c2 += 1) {
              if (_modules[row][col - c2] == null) {
                var dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                }
                var mask = maskFunc(row, col - c2);
                if (mask) {
                  dark = !dark;
                }
                _modules[row][col - c2] = dark;
                bitIndex -= 1;
                if (bitIndex == -1) {
                  byteIndex += 1;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || _moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      };
      var createBytes = function(buffer, rsBlocks) {
        var offset = 0;
        var maxDcCount = 0;
        var maxEcCount = 0;
        var dcdata = new Array(rsBlocks.length);
        var ecdata = new Array(rsBlocks.length);
        for (var r = 0; r < rsBlocks.length; r += 1) {
          var dcCount = rsBlocks[r].dataCount;
          var ecCount = rsBlocks[r].totalCount - dcCount;
          maxDcCount = Math.max(maxDcCount, dcCount);
          maxEcCount = Math.max(maxEcCount, ecCount);
          dcdata[r] = new Array(dcCount);
          for (var i2 = 0; i2 < dcdata[r].length; i2 += 1) {
            dcdata[r][i2] = 255 & buffer.getBuffer()[i2 + offset];
          }
          offset += dcCount;
          var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
          var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
          var modPoly = rawPoly.mod(rsPoly);
          ecdata[r] = new Array(rsPoly.getLength() - 1);
          for (var i2 = 0; i2 < ecdata[r].length; i2 += 1) {
            var modIndex = i2 + modPoly.getLength() - ecdata[r].length;
            ecdata[r][i2] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
          }
        }
        var totalCodeCount = 0;
        for (var i2 = 0; i2 < rsBlocks.length; i2 += 1) {
          totalCodeCount += rsBlocks[i2].totalCount;
        }
        var data = new Array(totalCodeCount);
        var index = 0;
        for (var i2 = 0; i2 < maxDcCount; i2 += 1) {
          for (var r = 0; r < rsBlocks.length; r += 1) {
            if (i2 < dcdata[r].length) {
              data[index] = dcdata[r][i2];
              index += 1;
            }
          }
        }
        for (var i2 = 0; i2 < maxEcCount; i2 += 1) {
          for (var r = 0; r < rsBlocks.length; r += 1) {
            if (i2 < ecdata[r].length) {
              data[index] = ecdata[r][i2];
              index += 1;
            }
          }
        }
        return data;
      };
      var createData = function(typeNumber2, errorCorrectionLevel2, dataList) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
        var buffer = qrBitBuffer();
        for (var i2 = 0; i2 < dataList.length; i2 += 1) {
          var data = dataList[i2];
          buffer.put(data.getMode(), 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
          data.write(buffer);
        }
        var totalDataCount = 0;
        for (var i2 = 0; i2 < rsBlocks.length; i2 += 1) {
          totalDataCount += rsBlocks[i2].dataCount;
        }
        if (buffer.getLengthInBits() > totalDataCount * 8) {
          throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
        }
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
          buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 != 0) {
          buffer.putBit(false);
        }
        while (true) {
          if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
          }
          buffer.put(PAD0, 8);
          if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
          }
          buffer.put(PAD1, 8);
        }
        return createBytes(buffer, rsBlocks);
      };
      _this.addData = function(data, mode) {
        mode = mode || "Byte";
        var newData = null;
        switch (mode) {
          case "Numeric":
            newData = qrNumber(data);
            break;
          case "Alphanumeric":
            newData = qrAlphaNum(data);
            break;
          case "Byte":
            newData = qr8BitByte(data);
            break;
          case "Kanji":
            newData = qrKanji(data);
            break;
          default:
            throw "mode:" + mode;
        }
        _dataList.push(newData);
        _dataCache = null;
      };
      _this.isDark = function(row, col) {
        if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
          throw row + "," + col;
        }
        return _modules[row][col];
      };
      _this.getModuleCount = function() {
        return _moduleCount;
      };
      _this.make = function() {
        if (_typeNumber < 1) {
          var typeNumber2 = 1;
          for (; typeNumber2 < 40; typeNumber2++) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
            var buffer = qrBitBuffer();
            for (var i2 = 0; i2 < _dataList.length; i2++) {
              var data = _dataList[i2];
              buffer.put(data.getMode(), 4);
              buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
              data.write(buffer);
            }
            var totalDataCount = 0;
            for (var i2 = 0; i2 < rsBlocks.length; i2++) {
              totalDataCount += rsBlocks[i2].dataCount;
            }
            if (buffer.getLengthInBits() <= totalDataCount * 8) {
              break;
            }
          }
          _typeNumber = typeNumber2;
        }
        makeImpl(false, getBestMaskPattern());
      };
      _this.createTableTag = function(cellSize, margin) {
        cellSize = cellSize || 2;
        margin = typeof margin == "undefined" ? cellSize * 4 : margin;
        var qrHtml = "";
        qrHtml += '<table style="';
        qrHtml += " border-width: 0px; border-style: none;";
        qrHtml += " border-collapse: collapse;";
        qrHtml += " padding: 0px; margin: " + margin + "px;";
        qrHtml += '">';
        qrHtml += "<tbody>";
        for (var r = 0; r < _this.getModuleCount(); r += 1) {
          qrHtml += "<tr>";
          for (var c2 = 0; c2 < _this.getModuleCount(); c2 += 1) {
            qrHtml += '<td style="';
            qrHtml += " border-width: 0px; border-style: none;";
            qrHtml += " border-collapse: collapse;";
            qrHtml += " padding: 0px; margin: 0px;";
            qrHtml += " width: " + cellSize + "px;";
            qrHtml += " height: " + cellSize + "px;";
            qrHtml += " background-color: ";
            qrHtml += _this.isDark(r, c2) ? "#000000" : "#ffffff";
            qrHtml += ";";
            qrHtml += '"/>';
          }
          qrHtml += "</tr>";
        }
        qrHtml += "</tbody>";
        qrHtml += "</table>";
        return qrHtml;
      };
      _this.createSvgTag = function(cellSize, margin, alt, title) {
        var opts = {};
        if (typeof arguments[0] == "object") {
          opts = arguments[0];
          cellSize = opts.cellSize;
          margin = opts.margin;
          alt = opts.alt;
          title = opts.title;
        }
        cellSize = cellSize || 2;
        margin = typeof margin == "undefined" ? cellSize * 4 : margin;
        alt = typeof alt === "string" ? { text: alt } : alt || {};
        alt.text = alt.text || null;
        alt.id = alt.text ? alt.id || "qrcode-description" : null;
        title = typeof title === "string" ? { text: title } : title || {};
        title.text = title.text || null;
        title.id = title.text ? title.id || "qrcode-title" : null;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var c2, mc, r, mr, qrSvg = "", rect;
        rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
        qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
        qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
        qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
        qrSvg += ' preserveAspectRatio="xMinYMin meet"';
        qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
        qrSvg += ">";
        qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
        qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
        qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
        qrSvg += '<path d="';
        for (r = 0; r < _this.getModuleCount(); r += 1) {
          mr = r * cellSize + margin;
          for (c2 = 0; c2 < _this.getModuleCount(); c2 += 1) {
            if (_this.isDark(r, c2)) {
              mc = c2 * cellSize + margin;
              qrSvg += "M" + mc + "," + mr + rect;
            }
          }
        }
        qrSvg += '" stroke="transparent" fill="black"/>';
        qrSvg += "</svg>";
        return qrSvg;
      };
      _this.createDataURL = function(cellSize, margin) {
        cellSize = cellSize || 2;
        margin = typeof margin == "undefined" ? cellSize * 4 : margin;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var min2 = margin;
        var max2 = size - margin;
        return createDataURL(size, size, function(x, y) {
          if (min2 <= x && x < max2 && min2 <= y && y < max2) {
            var c2 = Math.floor((x - min2) / cellSize);
            var r = Math.floor((y - min2) / cellSize);
            return _this.isDark(r, c2) ? 0 : 1;
          } else {
            return 1;
          }
        });
      };
      _this.createImgTag = function(cellSize, margin, alt) {
        cellSize = cellSize || 2;
        margin = typeof margin == "undefined" ? cellSize * 4 : margin;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var img = "";
        img += "<img";
        img += ' src="';
        img += _this.createDataURL(cellSize, margin);
        img += '"';
        img += ' width="';
        img += size;
        img += '"';
        img += ' height="';
        img += size;
        img += '"';
        if (alt) {
          img += ' alt="';
          img += escapeXml(alt);
          img += '"';
        }
        img += "/>";
        return img;
      };
      var escapeXml = function(s2) {
        var escaped = "";
        for (var i2 = 0; i2 < s2.length; i2 += 1) {
          var c2 = s2.charAt(i2);
          switch (c2) {
            case "<":
              escaped += "&lt;";
              break;
            case ">":
              escaped += "&gt;";
              break;
            case "&":
              escaped += "&amp;";
              break;
            case '"':
              escaped += "&quot;";
              break;
            default:
              escaped += c2;
              break;
          }
        }
        return escaped;
      };
      var _createHalfASCII = function(margin) {
        var cellSize = 1;
        margin = typeof margin == "undefined" ? cellSize * 2 : margin;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var min2 = margin;
        var max2 = size - margin;
        var y, x, r1, r2, p2;
        var blocks = {
          "██": "█",
          "█ ": "▀",
          " █": "▄",
          "  ": " "
        };
        var blocksLastLineNoMargin = {
          "██": "▀",
          "█ ": "▀",
          " █": " ",
          "  ": " "
        };
        var ascii = "";
        for (y = 0; y < size; y += 2) {
          r1 = Math.floor((y - min2) / cellSize);
          r2 = Math.floor((y + 1 - min2) / cellSize);
          for (x = 0; x < size; x += 1) {
            p2 = "█";
            if (min2 <= x && x < max2 && min2 <= y && y < max2 && _this.isDark(r1, Math.floor((x - min2) / cellSize))) {
              p2 = " ";
            }
            if (min2 <= x && x < max2 && min2 <= y + 1 && y + 1 < max2 && _this.isDark(r2, Math.floor((x - min2) / cellSize))) {
              p2 += " ";
            } else {
              p2 += "█";
            }
            ascii += margin < 1 && y + 1 >= max2 ? blocksLastLineNoMargin[p2] : blocks[p2];
          }
          ascii += "\n";
        }
        if (size % 2 && margin > 0) {
          return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("▀");
        }
        return ascii.substring(0, ascii.length - 1);
      };
      _this.createASCII = function(cellSize, margin) {
        cellSize = cellSize || 1;
        if (cellSize < 2) {
          return _createHalfASCII(margin);
        }
        cellSize -= 1;
        margin = typeof margin == "undefined" ? cellSize * 2 : margin;
        var size = _this.getModuleCount() * cellSize + margin * 2;
        var min2 = margin;
        var max2 = size - margin;
        var y, x, r, p2;
        var white = Array(cellSize + 1).join("██");
        var black = Array(cellSize + 1).join("  ");
        var ascii = "";
        var line = "";
        for (y = 0; y < size; y += 1) {
          r = Math.floor((y - min2) / cellSize);
          line = "";
          for (x = 0; x < size; x += 1) {
            p2 = 1;
            if (min2 <= x && x < max2 && min2 <= y && y < max2 && _this.isDark(r, Math.floor((x - min2) / cellSize))) {
              p2 = 0;
            }
            line += p2 ? white : black;
          }
          for (r = 0; r < cellSize; r += 1) {
            ascii += line + "\n";
          }
        }
        return ascii.substring(0, ascii.length - 1);
      };
      _this.renderTo2dContext = function(context, cellSize) {
        cellSize = cellSize || 2;
        var length = _this.getModuleCount();
        for (var row = 0; row < length; row++) {
          for (var col = 0; col < length; col++) {
            context.fillStyle = _this.isDark(row, col) ? "black" : "white";
            context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
          }
        }
      };
      return _this;
    };
    qrcode3.stringToBytesFuncs = {
      "default": function(s2) {
        var bytes = [];
        for (var i2 = 0; i2 < s2.length; i2 += 1) {
          var c2 = s2.charCodeAt(i2);
          bytes.push(c2 & 255);
        }
        return bytes;
      }
    };
    qrcode3.stringToBytes = qrcode3.stringToBytesFuncs["default"];
    qrcode3.createStringToBytes = function(unicodeData, numChars) {
      var unicodeMap = function() {
        var bin = base64DecodeInputStream(unicodeData);
        var read = function() {
          var b = bin.read();
          if (b == -1)
            throw "eof";
          return b;
        };
        var count = 0;
        var unicodeMap2 = {};
        while (true) {
          var b0 = bin.read();
          if (b0 == -1)
            break;
          var b1 = read();
          var b2 = read();
          var b3 = read();
          var k = String.fromCharCode(b0 << 8 | b1);
          var v = b2 << 8 | b3;
          unicodeMap2[k] = v;
          count += 1;
        }
        if (count != numChars) {
          throw count + " != " + numChars;
        }
        return unicodeMap2;
      }();
      var unknownChar = "?".charCodeAt(0);
      return function(s2) {
        var bytes = [];
        for (var i2 = 0; i2 < s2.length; i2 += 1) {
          var c2 = s2.charCodeAt(i2);
          if (c2 < 128) {
            bytes.push(c2);
          } else {
            var b = unicodeMap[s2.charAt(i2)];
            if (typeof b == "number") {
              if ((b & 255) == b) {
                bytes.push(b);
              } else {
                bytes.push(b >>> 8);
                bytes.push(b & 255);
              }
            } else {
              bytes.push(unknownChar);
            }
          }
        }
        return bytes;
      };
    };
    var QRMode = {
      MODE_NUMBER: 1 << 0,
      MODE_ALPHA_NUM: 1 << 1,
      MODE_8BIT_BYTE: 1 << 2,
      MODE_KANJI: 1 << 3
    };
    var QRErrorCorrectionLevel = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    };
    var QRMaskPattern = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var QRUtil = function() {
      var PATTERN_POSITION_TABLE = [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ];
      var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
      var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
      var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
      var _this = {};
      var getBCHDigit = function(data) {
        var digit = 0;
        while (data != 0) {
          digit += 1;
          data >>>= 1;
        }
        return digit;
      };
      _this.getBCHTypeInfo = function(data) {
        var d = data << 10;
        while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
          d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
        }
        return (data << 10 | d) ^ G15_MASK;
      };
      _this.getBCHTypeNumber = function(data) {
        var d = data << 12;
        while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
          d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
        }
        return data << 12 | d;
      };
      _this.getPatternPosition = function(typeNumber) {
        return PATTERN_POSITION_TABLE[typeNumber - 1];
      };
      _this.getMaskFunction = function(maskPattern) {
        switch (maskPattern) {
          case QRMaskPattern.PATTERN000:
            return function(i2, j) {
              return (i2 + j) % 2 == 0;
            };
          case QRMaskPattern.PATTERN001:
            return function(i2, j) {
              return i2 % 2 == 0;
            };
          case QRMaskPattern.PATTERN010:
            return function(i2, j) {
              return j % 3 == 0;
            };
          case QRMaskPattern.PATTERN011:
            return function(i2, j) {
              return (i2 + j) % 3 == 0;
            };
          case QRMaskPattern.PATTERN100:
            return function(i2, j) {
              return (Math.floor(i2 / 2) + Math.floor(j / 3)) % 2 == 0;
            };
          case QRMaskPattern.PATTERN101:
            return function(i2, j) {
              return i2 * j % 2 + i2 * j % 3 == 0;
            };
          case QRMaskPattern.PATTERN110:
            return function(i2, j) {
              return (i2 * j % 2 + i2 * j % 3) % 2 == 0;
            };
          case QRMaskPattern.PATTERN111:
            return function(i2, j) {
              return (i2 * j % 3 + (i2 + j) % 2) % 2 == 0;
            };
          default:
            throw "bad maskPattern:" + maskPattern;
        }
      };
      _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
        var a2 = qrPolynomial([1], 0);
        for (var i2 = 0; i2 < errorCorrectLength; i2 += 1) {
          a2 = a2.multiply(qrPolynomial([1, QRMath.gexp(i2)], 0));
        }
        return a2;
      };
      _this.getLengthInBits = function(mode, type) {
        if (1 <= type && type < 10) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 10;
            case QRMode.MODE_ALPHA_NUM:
              return 9;
            case QRMode.MODE_8BIT_BYTE:
              return 8;
            case QRMode.MODE_KANJI:
              return 8;
            default:
              throw "mode:" + mode;
          }
        } else if (type < 27) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 12;
            case QRMode.MODE_ALPHA_NUM:
              return 11;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 10;
            default:
              throw "mode:" + mode;
          }
        } else if (type < 41) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 14;
            case QRMode.MODE_ALPHA_NUM:
              return 13;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 12;
            default:
              throw "mode:" + mode;
          }
        } else {
          throw "type:" + type;
        }
      };
      _this.getLostPoint = function(qrcode4) {
        var moduleCount = qrcode4.getModuleCount();
        var lostPoint = 0;
        for (var row = 0; row < moduleCount; row += 1) {
          for (var col = 0; col < moduleCount; col += 1) {
            var sameCount = 0;
            var dark = qrcode4.isDark(row, col);
            for (var r = -1; r <= 1; r += 1) {
              if (row + r < 0 || moduleCount <= row + r) {
                continue;
              }
              for (var c2 = -1; c2 <= 1; c2 += 1) {
                if (col + c2 < 0 || moduleCount <= col + c2) {
                  continue;
                }
                if (r == 0 && c2 == 0) {
                  continue;
                }
                if (dark == qrcode4.isDark(row + r, col + c2)) {
                  sameCount += 1;
                }
              }
            }
            if (sameCount > 5) {
              lostPoint += 3 + sameCount - 5;
            }
          }
        }
        for (var row = 0; row < moduleCount - 1; row += 1) {
          for (var col = 0; col < moduleCount - 1; col += 1) {
            var count = 0;
            if (qrcode4.isDark(row, col))
              count += 1;
            if (qrcode4.isDark(row + 1, col))
              count += 1;
            if (qrcode4.isDark(row, col + 1))
              count += 1;
            if (qrcode4.isDark(row + 1, col + 1))
              count += 1;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
        }
        for (var row = 0; row < moduleCount; row += 1) {
          for (var col = 0; col < moduleCount - 6; col += 1) {
            if (qrcode4.isDark(row, col) && !qrcode4.isDark(row, col + 1) && qrcode4.isDark(row, col + 2) && qrcode4.isDark(row, col + 3) && qrcode4.isDark(row, col + 4) && !qrcode4.isDark(row, col + 5) && qrcode4.isDark(row, col + 6)) {
              lostPoint += 40;
            }
          }
        }
        for (var col = 0; col < moduleCount; col += 1) {
          for (var row = 0; row < moduleCount - 6; row += 1) {
            if (qrcode4.isDark(row, col) && !qrcode4.isDark(row + 1, col) && qrcode4.isDark(row + 2, col) && qrcode4.isDark(row + 3, col) && qrcode4.isDark(row + 4, col) && !qrcode4.isDark(row + 5, col) && qrcode4.isDark(row + 6, col)) {
              lostPoint += 40;
            }
          }
        }
        var darkCount = 0;
        for (var col = 0; col < moduleCount; col += 1) {
          for (var row = 0; row < moduleCount; row += 1) {
            if (qrcode4.isDark(row, col)) {
              darkCount += 1;
            }
          }
        }
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
      };
      return _this;
    }();
    var QRMath = function() {
      var EXP_TABLE = new Array(256);
      var LOG_TABLE = new Array(256);
      for (var i2 = 0; i2 < 8; i2 += 1) {
        EXP_TABLE[i2] = 1 << i2;
      }
      for (var i2 = 8; i2 < 256; i2 += 1) {
        EXP_TABLE[i2] = EXP_TABLE[i2 - 4] ^ EXP_TABLE[i2 - 5] ^ EXP_TABLE[i2 - 6] ^ EXP_TABLE[i2 - 8];
      }
      for (var i2 = 0; i2 < 255; i2 += 1) {
        LOG_TABLE[EXP_TABLE[i2]] = i2;
      }
      var _this = {};
      _this.glog = function(n2) {
        if (n2 < 1) {
          throw "glog(" + n2 + ")";
        }
        return LOG_TABLE[n2];
      };
      _this.gexp = function(n2) {
        while (n2 < 0) {
          n2 += 255;
        }
        while (n2 >= 256) {
          n2 -= 255;
        }
        return EXP_TABLE[n2];
      };
      return _this;
    }();
    function qrPolynomial(num, shift) {
      if (typeof num.length == "undefined") {
        throw num.length + "/" + shift;
      }
      var _num = function() {
        var offset = 0;
        while (offset < num.length && num[offset] == 0) {
          offset += 1;
        }
        var _num2 = new Array(num.length - offset + shift);
        for (var i2 = 0; i2 < num.length - offset; i2 += 1) {
          _num2[i2] = num[i2 + offset];
        }
        return _num2;
      }();
      var _this = {};
      _this.getAt = function(index) {
        return _num[index];
      };
      _this.getLength = function() {
        return _num.length;
      };
      _this.multiply = function(e2) {
        var num2 = new Array(_this.getLength() + e2.getLength() - 1);
        for (var i2 = 0; i2 < _this.getLength(); i2 += 1) {
          for (var j = 0; j < e2.getLength(); j += 1) {
            num2[i2 + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i2)) + QRMath.glog(e2.getAt(j)));
          }
        }
        return qrPolynomial(num2, 0);
      };
      _this.mod = function(e2) {
        if (_this.getLength() - e2.getLength() < 0) {
          return _this;
        }
        var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e2.getAt(0));
        var num2 = new Array(_this.getLength());
        for (var i2 = 0; i2 < _this.getLength(); i2 += 1) {
          num2[i2] = _this.getAt(i2);
        }
        for (var i2 = 0; i2 < e2.getLength(); i2 += 1) {
          num2[i2] ^= QRMath.gexp(QRMath.glog(e2.getAt(i2)) + ratio);
        }
        return qrPolynomial(num2, 0).mod(e2);
      };
      return _this;
    }
    var QRRSBlock = function() {
      var RS_BLOCK_TABLE = [
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12, 7, 37, 13],
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16]
      ];
      var qrRSBlock = function(totalCount, dataCount) {
        var _this2 = {};
        _this2.totalCount = totalCount;
        _this2.dataCount = dataCount;
        return _this2;
      };
      var _this = {};
      var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case QRErrorCorrectionLevel.L:
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
          case QRErrorCorrectionLevel.M:
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
          case QRErrorCorrectionLevel.Q:
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
          case QRErrorCorrectionLevel.H:
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
      _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
        var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
        if (typeof rsBlock == "undefined") {
          throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
        }
        var length = rsBlock.length / 3;
        var list = [];
        for (var i2 = 0; i2 < length; i2 += 1) {
          var count = rsBlock[i2 * 3 + 0];
          var totalCount = rsBlock[i2 * 3 + 1];
          var dataCount = rsBlock[i2 * 3 + 2];
          for (var j = 0; j < count; j += 1) {
            list.push(qrRSBlock(totalCount, dataCount));
          }
        }
        return list;
      };
      return _this;
    }();
    var qrBitBuffer = function() {
      var _buffer = [];
      var _length = 0;
      var _this = {};
      _this.getBuffer = function() {
        return _buffer;
      };
      _this.getAt = function(index) {
        var bufIndex = Math.floor(index / 8);
        return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
      };
      _this.put = function(num, length) {
        for (var i2 = 0; i2 < length; i2 += 1) {
          _this.putBit((num >>> length - i2 - 1 & 1) == 1);
        }
      };
      _this.getLengthInBits = function() {
        return _length;
      };
      _this.putBit = function(bit) {
        var bufIndex = Math.floor(_length / 8);
        if (_buffer.length <= bufIndex) {
          _buffer.push(0);
        }
        if (bit) {
          _buffer[bufIndex] |= 128 >>> _length % 8;
        }
        _length += 1;
      };
      return _this;
    };
    var qrNumber = function(data) {
      var _mode = QRMode.MODE_NUMBER;
      var _data = data;
      var _this = {};
      _this.getMode = function() {
        return _mode;
      };
      _this.getLength = function(buffer) {
        return _data.length;
      };
      _this.write = function(buffer) {
        var data2 = _data;
        var i2 = 0;
        while (i2 + 2 < data2.length) {
          buffer.put(strToNum(data2.substring(i2, i2 + 3)), 10);
          i2 += 3;
        }
        if (i2 < data2.length) {
          if (data2.length - i2 == 1) {
            buffer.put(strToNum(data2.substring(i2, i2 + 1)), 4);
          } else if (data2.length - i2 == 2) {
            buffer.put(strToNum(data2.substring(i2, i2 + 2)), 7);
          }
        }
      };
      var strToNum = function(s2) {
        var num = 0;
        for (var i2 = 0; i2 < s2.length; i2 += 1) {
          num = num * 10 + chatToNum(s2.charAt(i2));
        }
        return num;
      };
      var chatToNum = function(c2) {
        if ("0" <= c2 && c2 <= "9") {
          return c2.charCodeAt(0) - "0".charCodeAt(0);
        }
        throw "illegal char :" + c2;
      };
      return _this;
    };
    var qrAlphaNum = function(data) {
      var _mode = QRMode.MODE_ALPHA_NUM;
      var _data = data;
      var _this = {};
      _this.getMode = function() {
        return _mode;
      };
      _this.getLength = function(buffer) {
        return _data.length;
      };
      _this.write = function(buffer) {
        var s2 = _data;
        var i2 = 0;
        while (i2 + 1 < s2.length) {
          buffer.put(
            getCode(s2.charAt(i2)) * 45 + getCode(s2.charAt(i2 + 1)),
            11
          );
          i2 += 2;
        }
        if (i2 < s2.length) {
          buffer.put(getCode(s2.charAt(i2)), 6);
        }
      };
      var getCode = function(c2) {
        if ("0" <= c2 && c2 <= "9") {
          return c2.charCodeAt(0) - "0".charCodeAt(0);
        } else if ("A" <= c2 && c2 <= "Z") {
          return c2.charCodeAt(0) - "A".charCodeAt(0) + 10;
        } else {
          switch (c2) {
            case " ":
              return 36;
            case "$":
              return 37;
            case "%":
              return 38;
            case "*":
              return 39;
            case "+":
              return 40;
            case "-":
              return 41;
            case ".":
              return 42;
            case "/":
              return 43;
            case ":":
              return 44;
            default:
              throw "illegal char :" + c2;
          }
        }
      };
      return _this;
    };
    var qr8BitByte = function(data) {
      var _mode = QRMode.MODE_8BIT_BYTE;
      var _bytes = qrcode3.stringToBytes(data);
      var _this = {};
      _this.getMode = function() {
        return _mode;
      };
      _this.getLength = function(buffer) {
        return _bytes.length;
      };
      _this.write = function(buffer) {
        for (var i2 = 0; i2 < _bytes.length; i2 += 1) {
          buffer.put(_bytes[i2], 8);
        }
      };
      return _this;
    };
    var qrKanji = function(data) {
      var _mode = QRMode.MODE_KANJI;
      var stringToBytes = qrcode3.stringToBytesFuncs["SJIS"];
      if (!stringToBytes) {
        throw "sjis not supported.";
      }
      !function(c2, code) {
        var test = stringToBytes(c2);
        if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
          throw "sjis not supported.";
        }
      }("友", 38726);
      var _bytes = stringToBytes(data);
      var _this = {};
      _this.getMode = function() {
        return _mode;
      };
      _this.getLength = function(buffer) {
        return ~~(_bytes.length / 2);
      };
      _this.write = function(buffer) {
        var data2 = _bytes;
        var i2 = 0;
        while (i2 + 1 < data2.length) {
          var c2 = (255 & data2[i2]) << 8 | 255 & data2[i2 + 1];
          if (33088 <= c2 && c2 <= 40956) {
            c2 -= 33088;
          } else if (57408 <= c2 && c2 <= 60351) {
            c2 -= 49472;
          } else {
            throw "illegal char at " + (i2 + 1) + "/" + c2;
          }
          c2 = (c2 >>> 8 & 255) * 192 + (c2 & 255);
          buffer.put(c2, 13);
          i2 += 2;
        }
        if (i2 < data2.length) {
          throw "illegal char at " + (i2 + 1);
        }
      };
      return _this;
    };
    var byteArrayOutputStream = function() {
      var _bytes = [];
      var _this = {};
      _this.writeByte = function(b) {
        _bytes.push(b & 255);
      };
      _this.writeShort = function(i2) {
        _this.writeByte(i2);
        _this.writeByte(i2 >>> 8);
      };
      _this.writeBytes = function(b, off, len) {
        off = off || 0;
        len = len || b.length;
        for (var i2 = 0; i2 < len; i2 += 1) {
          _this.writeByte(b[i2 + off]);
        }
      };
      _this.writeString = function(s2) {
        for (var i2 = 0; i2 < s2.length; i2 += 1) {
          _this.writeByte(s2.charCodeAt(i2));
        }
      };
      _this.toByteArray = function() {
        return _bytes;
      };
      _this.toString = function() {
        var s2 = "";
        s2 += "[";
        for (var i2 = 0; i2 < _bytes.length; i2 += 1) {
          if (i2 > 0) {
            s2 += ",";
          }
          s2 += _bytes[i2];
        }
        s2 += "]";
        return s2;
      };
      return _this;
    };
    var base64EncodeOutputStream = function() {
      var _buffer = 0;
      var _buflen = 0;
      var _length = 0;
      var _base64 = "";
      var _this = {};
      var writeEncoded = function(b) {
        _base64 += String.fromCharCode(encode2(b & 63));
      };
      var encode2 = function(n2) {
        if (n2 < 0)
          ;
        else if (n2 < 26) {
          return 65 + n2;
        } else if (n2 < 52) {
          return 97 + (n2 - 26);
        } else if (n2 < 62) {
          return 48 + (n2 - 52);
        } else if (n2 == 62) {
          return 43;
        } else if (n2 == 63) {
          return 47;
        }
        throw "n:" + n2;
      };
      _this.writeByte = function(n2) {
        _buffer = _buffer << 8 | n2 & 255;
        _buflen += 8;
        _length += 1;
        while (_buflen >= 6) {
          writeEncoded(_buffer >>> _buflen - 6);
          _buflen -= 6;
        }
      };
      _this.flush = function() {
        if (_buflen > 0) {
          writeEncoded(_buffer << 6 - _buflen);
          _buffer = 0;
          _buflen = 0;
        }
        if (_length % 3 != 0) {
          var padlen = 3 - _length % 3;
          for (var i2 = 0; i2 < padlen; i2 += 1) {
            _base64 += "=";
          }
        }
      };
      _this.toString = function() {
        return _base64;
      };
      return _this;
    };
    var base64DecodeInputStream = function(str) {
      var _str = str;
      var _pos = 0;
      var _buffer = 0;
      var _buflen = 0;
      var _this = {};
      _this.read = function() {
        while (_buflen < 8) {
          if (_pos >= _str.length) {
            if (_buflen == 0) {
              return -1;
            }
            throw "unexpected end of file./" + _buflen;
          }
          var c2 = _str.charAt(_pos);
          _pos += 1;
          if (c2 == "=") {
            _buflen = 0;
            return -1;
          } else if (c2.match(/^\s$/)) {
            continue;
          }
          _buffer = _buffer << 6 | decode2(c2.charCodeAt(0));
          _buflen += 6;
        }
        var n2 = _buffer >>> _buflen - 8 & 255;
        _buflen -= 8;
        return n2;
      };
      var decode2 = function(c2) {
        if (65 <= c2 && c2 <= 90) {
          return c2 - 65;
        } else if (97 <= c2 && c2 <= 122) {
          return c2 - 97 + 26;
        } else if (48 <= c2 && c2 <= 57) {
          return c2 - 48 + 52;
        } else if (c2 == 43) {
          return 62;
        } else if (c2 == 47) {
          return 63;
        } else {
          throw "c:" + c2;
        }
      };
      return _this;
    };
    var gifImage = function(width, height) {
      var _width = width;
      var _height = height;
      var _data = new Array(width * height);
      var _this = {};
      _this.setPixel = function(x, y, pixel) {
        _data[y * _width + x] = pixel;
      };
      _this.write = function(out) {
        out.writeString("GIF87a");
        out.writeShort(_width);
        out.writeShort(_height);
        out.writeByte(128);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(0);
        out.writeByte(255);
        out.writeByte(255);
        out.writeByte(255);
        out.writeString(",");
        out.writeShort(0);
        out.writeShort(0);
        out.writeShort(_width);
        out.writeShort(_height);
        out.writeByte(0);
        var lzwMinCodeSize = 2;
        var raster = getLZWRaster(lzwMinCodeSize);
        out.writeByte(lzwMinCodeSize);
        var offset = 0;
        while (raster.length - offset > 255) {
          out.writeByte(255);
          out.writeBytes(raster, offset, 255);
          offset += 255;
        }
        out.writeByte(raster.length - offset);
        out.writeBytes(raster, offset, raster.length - offset);
        out.writeByte(0);
        out.writeString(";");
      };
      var bitOutputStream = function(out) {
        var _out = out;
        var _bitLength = 0;
        var _bitBuffer = 0;
        var _this2 = {};
        _this2.write = function(data, length) {
          if (data >>> length != 0) {
            throw "length over";
          }
          while (_bitLength + length >= 8) {
            _out.writeByte(255 & (data << _bitLength | _bitBuffer));
            length -= 8 - _bitLength;
            data >>>= 8 - _bitLength;
            _bitBuffer = 0;
            _bitLength = 0;
          }
          _bitBuffer = data << _bitLength | _bitBuffer;
          _bitLength = _bitLength + length;
        };
        _this2.flush = function() {
          if (_bitLength > 0) {
            _out.writeByte(_bitBuffer);
          }
        };
        return _this2;
      };
      var getLZWRaster = function(lzwMinCodeSize) {
        var clearCode = 1 << lzwMinCodeSize;
        var endCode = (1 << lzwMinCodeSize) + 1;
        var bitLength = lzwMinCodeSize + 1;
        var table = lzwTable();
        for (var i2 = 0; i2 < clearCode; i2 += 1) {
          table.add(String.fromCharCode(i2));
        }
        table.add(String.fromCharCode(clearCode));
        table.add(String.fromCharCode(endCode));
        var byteOut = byteArrayOutputStream();
        var bitOut = bitOutputStream(byteOut);
        bitOut.write(clearCode, bitLength);
        var dataIndex = 0;
        var s2 = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;
        while (dataIndex < _data.length) {
          var c2 = String.fromCharCode(_data[dataIndex]);
          dataIndex += 1;
          if (table.contains(s2 + c2)) {
            s2 = s2 + c2;
          } else {
            bitOut.write(table.indexOf(s2), bitLength);
            if (table.size() < 4095) {
              if (table.size() == 1 << bitLength) {
                bitLength += 1;
              }
              table.add(s2 + c2);
            }
            s2 = c2;
          }
        }
        bitOut.write(table.indexOf(s2), bitLength);
        bitOut.write(endCode, bitLength);
        bitOut.flush();
        return byteOut.toByteArray();
      };
      var lzwTable = function() {
        var _map = {};
        var _size = 0;
        var _this2 = {};
        _this2.add = function(key) {
          if (_this2.contains(key)) {
            throw "dup key:" + key;
          }
          _map[key] = _size;
          _size += 1;
        };
        _this2.size = function() {
          return _size;
        };
        _this2.indexOf = function(key) {
          return _map[key];
        };
        _this2.contains = function(key) {
          return typeof _map[key] != "undefined";
        };
        return _this2;
      };
      return _this;
    };
    var createDataURL = function(width, height, getPixel) {
      var gif = gifImage(width, height);
      for (var y = 0; y < height; y += 1) {
        for (var x = 0; x < width; x += 1) {
          gif.setPixel(x, y, getPixel(x, y));
        }
      }
      var b = byteArrayOutputStream();
      gif.write(b);
      var base64 = base64EncodeOutputStream();
      var bytes = b.toByteArray();
      for (var i2 = 0; i2 < bytes.length; i2 += 1) {
        base64.writeByte(bytes[i2]);
      }
      base64.flush();
      return "data:image/gif;base64," + base64;
    };
    return qrcode3;
  }();
  !function() {
    qrcode2.stringToBytesFuncs["UTF-8"] = function(s2) {
      function toUTF8Array(str) {
        var utf8 = [];
        for (var i2 = 0; i2 < str.length; i2++) {
          var charcode = str.charCodeAt(i2);
          if (charcode < 128)
            utf8.push(charcode);
          else if (charcode < 2048) {
            utf8.push(
              192 | charcode >> 6,
              128 | charcode & 63
            );
          } else if (charcode < 55296 || charcode >= 57344) {
            utf8.push(
              224 | charcode >> 12,
              128 | charcode >> 6 & 63,
              128 | charcode & 63
            );
          } else {
            i2++;
            charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i2) & 1023);
            utf8.push(
              240 | charcode >> 18,
              128 | charcode >> 12 & 63,
              128 | charcode >> 6 & 63,
              128 | charcode & 63
            );
          }
        }
        return utf8;
      }
      return toUTF8Array(s2);
    };
  }();
  (function(factory) {
    {
      module.exports = factory();
    }
  })(function() {
    return qrcode2;
  });
})(qrcode$1);
var qrcode = qrcode$1.exports;
function copyToClipboard(text) {
  if (navigator == null ? void 0 : navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  fallbackCopyTextToClipboard(text);
  return Promise.resolve();
}
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textArea);
  }
}
var deepReadObject = (obj, path, defaultValue) => {
  const value = path.trim().split(".").reduce((a2, b) => a2 ? a2[b] : void 0, obj);
  return value !== void 0 ? value : defaultValue;
};
var template = (str, params, reg = /{{(.*?)}}/g) => str.replace(reg, (_, key) => deepReadObject(params, key, ""));
var createI18nContext = (init = {}, lang = navigator.language in init ? navigator.language : Object.keys(init)[0]) => {
  const [locale, setLocale] = createSignal(lang);
  const [dict, setDict] = createStore(init);
  const translate = (key, params, defaultValue) => {
    const val = deepReadObject(dict[locale()], key, defaultValue || "");
    if (typeof val === "function")
      return val(params);
    if (typeof val === "string")
      return template(val, params || {});
    return val;
  };
  const actions = {
    add(lang2, table) {
      setDict(lang2, (t2) => Object.assign(t2 || {}, table));
    },
    locale: (lang2) => lang2 ? setLocale(lang2) : locale(),
    dict: (lang2) => deepReadObject(dict, lang2)
  };
  return [translate, actions];
};
var I18nContext = createContext({});
var useI18n = () => useContext(I18nContext);
var Translation = (props) => {
  const [t2] = useI18n();
  return createMemo(() => {
    var _a;
    return t2(props.translationKey, props.translationValues, (_a = props.children) == null ? void 0 : _a.toString());
  });
};
var _tmpl$$d = template$1(`<div></div>`);
var copyText = {
  translationKey: "common.copyLink",
  text: "Copy Link"
};
var copiedText = {
  translationKey: "common.copied",
  text: "Copied!"
};
var QRCode = (props) => {
  let qrCodeCanvasRef;
  let qrCodeWrapperRef;
  let imageRef;
  const [copyButtonOpened, setCopyButtonOpened] = createSignal(false);
  const [copyButtonHovered, setCopyButtonHovered] = createSignal(false);
  const [qrHovered, setQrHovered] = createSignal(false);
  const [copyButtonText, setCopyButtonText] = createSignal(copyText);
  const [picSize, setPicSize] = createSignal(picSizeDefault);
  createEffect(() => setCopyButtonOpened(copyButtonHovered() || qrHovered()));
  createEffect(() => !copyButtonOpened() && setCopyButtonText(copyText));
  createEffect(() => {
    const errorCorrectionLevel = "L";
    const cellSize = 4;
    const qr = qrcode(0, errorCorrectionLevel);
    qr.addData(props.sourceUrl);
    qr.make();
    qrCodeCanvasRef.innerHTML = qr.createSvgTag(cellSize, 0);
    const qrSize = qrCodeCanvasRef.firstElementChild.clientWidth;
    const scale = Math.round(qrNormalSize / qrSize * 1e5) / 1e5;
    if (imageRef) {
      const imgSize = Math.ceil(imgSizeDefault / (scale * cellSize)) * cellSize;
      const imgOffset = toPx(Math.ceil((qrSize - imgSize) / (2 * cellSize)) * cellSize);
      imageRef.style.top = imgOffset;
      imageRef.style.left = imgOffset;
      imageRef.style.height = toPx(imgSize);
      imageRef.style.width = toPx(imgSize);
      setPicSize(Math.round(picSizeDefault / scale));
    }
    qrCodeWrapperRef.style.transform = `scale(${scale})`;
  });
  let timeoutId = null;
  const onCopyClick = () => {
    copyToClipboard(props.sourceUrl);
    setCopyButtonText(copiedText);
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => setCopyButtonText(copyText), 3e3);
  };
  return createComponent(QrCodeBackground, {
    get ["class"]() {
      return props.class;
    },
    get children() {
      return [createComponent(QrCodeWrapper, {
        ref(r$) {
          const _ref$ = qrCodeWrapperRef;
          typeof _ref$ === "function" ? _ref$(r$) : qrCodeWrapperRef = r$;
        },
        onMouseEnter: () => setQrHovered(true),
        onMouseLeave: () => setTimeout(() => setQrHovered(false)),
        get children() {
          return [(() => {
            const _el$ = _tmpl$$d.cloneNode(true);
            const _ref$2 = qrCodeCanvasRef;
            typeof _ref$2 === "function" ? use(_ref$2, _el$) : qrCodeCanvasRef = _el$;
            return _el$;
          })(), createComponent(Show, {
            get when() {
              return props.imageUrl;
            },
            get children() {
              return createComponent(ImageBackground, {
                ref(r$) {
                  const _ref$3 = imageRef;
                  typeof _ref$3 === "function" ? _ref$3(r$) : imageRef = r$;
                },
                get children() {
                  return createComponent(ImageStyled$2, {
                    get src() {
                      return props.imageUrl;
                    },
                    alt: "",
                    get size() {
                      return picSize();
                    }
                  });
                }
              });
            }
          })];
        }
      }), createComponent(Transition, {
        onBeforeEnter: (el) => {
          el.animate([{
            opacity: 0,
            transform: "translate(-50%, 44px)"
          }, {
            opacity: 1,
            transform: "translate(-50%, 0)"
          }], {
            duration: 200
          });
        },
        onExit: (el, done) => {
          el.animate([{
            opacity: 1,
            transform: "translate(-50%, 0)"
          }, {
            opacity: 0,
            transform: "translate(-50%, 44px)"
          }], {
            duration: 200
          }).finished.then(() => {
            done();
          });
        },
        get children() {
          return createComponent(Show, {
            get when() {
              return copyButtonOpened() && !props.disableCopy;
            },
            get children() {
              return createComponent(CopyButtonStyled, {
                onClick: onCopyClick,
                onMouseEnter: () => copyButtonOpened() && setCopyButtonHovered(true),
                onMouseLeave: () => setTimeout(() => setCopyButtonHovered(false)),
                get children() {
                  return createComponent(Translation, {
                    get translationKey() {
                      return copyButtonText().translationKey;
                    },
                    get children() {
                      return copyButtonText().text;
                    }
                  });
                }
              });
            }
          });
        }
      })];
    }
  });
};
var TextStyled$3 = styled.div`
    font-style: normal;
    font-weight: ${(props) => props.fontWeight};
    font-size: ${(props) => props.fontSize};
    line-height: ${(props) => props.lineHeight};

    color: ${(props) => props.color};
`;
var Text = (inputs) => {
  const theme = useTheme();
  const [t2] = useI18n();
  let textRef;
  const color = () => inputs.color || theme.colors.text.primary;
  const props = mergeProps({
    fontSize: "14px",
    fontWeight: "510",
    lineHeight: "130%"
  }, inputs);
  createEffect(() => {
    if (!textRef) {
      return;
    }
    if (props.cursor === "unset") {
      return;
    }
    if (getComputedStyle(textRef).cursor !== "pointer") {
      textRef.style.cursor = "default";
    }
  });
  return createComponent(TextStyled$3, {
    get fontSize() {
      return props.fontSize;
    },
    get fontWeight() {
      return props.fontWeight;
    },
    get lineHeight() {
      return props.lineHeight;
    },
    get color() {
      return color();
    },
    get ["class"]() {
      return props.class;
    },
    ref(r$) {
      const _ref$ = textRef;
      typeof _ref$ === "function" ? _ref$(r$) : textRef = r$;
    },
    "data-tc-text": "true",
    get children() {
      var _a;
      return createMemo(() => !!props.translationKey)() ? t2(props.translationKey, props.translationValues, (_a = props.children) == null ? void 0 : _a.toString()) : props.children;
    }
  });
};
var WalletItemStyled = styled.button`
    cursor: pointer;
    border: none;
    background-color: unset;
    padding: 12px 8px 8px;
    height: 94px;
    width: 92px;
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: transform 0.125s ease-in-out;

    ${mediaNotTouch} {
        &:hover {
            transform: scale(1.04);
        }
    }

    &:active {
        transform: scale(0.96);
    }

    ${media("mobile")} {
        padding: 8px 4px;
        height: 124px;
        width: 82px;
    }

    ${mediaTouch} {
        &:active {
            transform: scale(0.92);
        }
    }
`;
var ImageStyled$1 = styled(Image)`
    width: 48px;
    height: 48px;
    border-radius: 12px;

    margin-bottom: 8px;

    ${media("mobile")} {
        width: 64px;
        height: 64px;
        border-radius: 16px;
    }
`;
var StyledText = styled(Text)`
    font-weight: 590;
    max-width: 76px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;
var WalletItem = (props) => {
  return createComponent(WalletItemStyled, {
    get ["class"]() {
      return props.class;
    },
    onClick: () => props.onClick(),
    "data-tc-wallet-item": "true",
    get children() {
      return [createComponent(ImageStyled$1, {
        get src() {
          return props.iconUrl;
        },
        alt: ""
      }), createComponent(StyledText, {
        get children() {
          return props.name;
        }
      })];
    }
  });
};
var H1Styled$3 = styled.h1`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;

    text-align: center;

    color: ${(props) => props.theme.colors.text.primary};

    margin-top: 0;
    margin-bottom: 6px;

    cursor: default;
`;
var H1 = (props) => {
  const [t2] = useI18n();
  return createComponent(H1Styled$3, {
    get ["class"]() {
      return props.class;
    },
    "data-tc-h1": "true",
    get children() {
      var _a;
      return createMemo(() => !!props.translationKey)() ? t2(props.translationKey, props.translationValues, (_a = props.children) == null ? void 0 : _a.toString()) : props.children;
    }
  });
};
var H2Styled$3 = styled.h2`
    font-style: normal;
    font-weight: 510;
    font-size: 16px;
    line-height: 20px;

    text-align: center;

    color: ${(props) => props.theme.colors.text.secondary};

    margin-top: 0;
    margin-bottom: 32px;

    cursor: default;
`;
var H2 = (props) => {
  const [t2] = useI18n();
  return createComponent(H2Styled$3, {
    get ["class"]() {
      return props.class;
    },
    "data-tc-h2": "true",
    get children() {
      var _a;
      return createMemo(() => !!props.translationKey)() ? t2(props.translationKey, props.translationValues, (_a = props.children) == null ? void 0 : _a.toString()) : props.children;
    }
  });
};
var H3Styled = styled.h3`
    font-style: normal;
    font-weight: 590;
    font-size: 15px;
    line-height: 20px;

    color: ${(props) => props.theme.colors.text.primary};

    margin-top: 0;
    margin-bottom: 0;

    cursor: default;
`;
var H3 = (props) => {
  const [t2] = useI18n();
  return createComponent(H3Styled, {
    "data-tc-h3": "true",
    get children() {
      var _a;
      return createMemo(() => !!props.translationKey)() ? t2(props.translationKey, props.translationValues, (_a = props.children) == null ? void 0 : _a.toString()) : props.children;
    }
  });
};
var _tmpl$$c = template$1(`<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 15.999L16.5 0.999023M16.5 0.999023V12.999M16.5 0.999023H4.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
var LongArrowIcon = (props) => {
  const theme = useTheme();
  const fill = () => props.fill || theme.colors.icon.secondary;
  return (() => {
    const _el$ = _tmpl$$c.cloneNode(true), _el$2 = _el$.firstChild;
    createRenderEffect(() => setAttribute(_el$2, "stroke", fill()));
    return _el$;
  })();
};
var _tmpl$$b = template$1(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z"></path></svg>`);
var TonIcon = (props) => {
  const theme = useTheme();
  const fill = () => props.fill || theme.colors.icon.primary;
  return (() => {
    const _el$ = _tmpl$$b.cloneNode(true), _el$2 = _el$.firstChild;
    createRenderEffect(() => setAttribute(_el$2, "fill", fill()));
    return _el$;
  })();
};
var _tmpl$$a = template$1(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11"></circle><path d="M17.1364 9.6364C17.4879 9.28493 17.4879 8.71508 17.1364 8.36361C16.7849 8.01214 16.2151 8.01214 15.8636 8.36361L10 14.2272L8.1364 12.3636C7.78493 12.0121 7.21508 12.0121 6.86361 12.3636C6.51214 12.7151 6.51214 13.2849 6.86361 13.6364L9.36361 16.1364C9.71508 16.4879 10.2849 16.4879 10.6364 16.1364L17.1364 9.6364Z"></path></svg>`);
var _tmpl$2$3 = template$1(`<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="36" cy="36" r="33"></circle><path d="M50.9142 28.4142C51.6953 27.6332 51.6953 26.3668 50.9142 25.5858C50.1332 24.8047 48.8668 24.8047 48.0858 25.5858L30 43.6716L23.9142 37.5858C23.1332 36.8047 21.8668 36.8047 21.0858 37.5858C20.3047 38.3668 20.3047 39.6332 21.0858 40.4142L28.5858 47.9142C29.3668 48.6953 30.6332 48.6953 31.4142 47.9142L50.9142 28.4142Z"></path></svg>`);
var SuccessIcon = (props) => {
  const theme = useTheme();
  const size = () => props.size || "s";
  const fill = () => props.fill || theme.colors.icon.success;
  return createMemo((() => {
    const _c$ = createMemo(() => size() === "s");
    return () => _c$() ? (() => {
      const _el$ = _tmpl$$a.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
      createRenderEffect((_p$) => {
        const _v$ = props.class, _v$2 = fill(), _v$3 = theme.colors.constant.white;
        _v$ !== _p$._v$ && setAttribute(_el$, "class", _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && setAttribute(_el$2, "fill", _p$._v$2 = _v$2);
        _v$3 !== _p$._v$3 && setAttribute(_el$3, "fill", _p$._v$3 = _v$3);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0
      });
      return _el$;
    })() : (() => {
      const _el$4 = _tmpl$2$3.cloneNode(true), _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling;
      createRenderEffect((_p$) => {
        const _v$4 = props.class, _v$5 = fill(), _v$6 = theme.colors.constant.white;
        _v$4 !== _p$._v$4 && setAttribute(_el$4, "class", _p$._v$4 = _v$4);
        _v$5 !== _p$._v$5 && setAttribute(_el$5, "fill", _p$._v$5 = _v$5);
        _v$6 !== _p$._v$6 && setAttribute(_el$6, "fill", _p$._v$6 = _v$6);
        return _p$;
      }, {
        _v$4: void 0,
        _v$5: void 0,
        _v$6: void 0
      });
      return _el$4;
    })();
  })());
};
var _tmpl$$9 = template$1(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11"></circle><path d="M7.86361 9.1364C7.51214 8.78493 7.51214 8.21508 7.86361 7.86361C8.21508 7.51214 8.78493 7.51214 9.1364 7.86361L12 10.7272L14.8636 7.86361C15.2151 7.51214 15.7849 7.51214 16.1364 7.86361C16.4879 8.21508 16.4879 8.78493 16.1364 9.1364L13.2728 12L16.1364 14.8636C16.4879 15.2151 16.4879 15.7849 16.1364 16.1364C15.7849 16.4879 15.2151 16.4879 14.8636 16.1364L12 13.2728L9.1364 16.1364C8.78493 16.4879 8.21508 16.4879 7.86361 16.1364C7.51214 15.7849 7.51214 15.2151 7.86361 14.8636L10.7272 12L7.86361 9.1364Z"></path></svg>`);
var _tmpl$2$2 = template$1(`<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="36" cy="36" r="33"></circle><path d="M24.0858 26.9142C23.3047 26.1332 23.3047 24.8668 24.0858 24.0858C24.8668 23.3047 26.1332 23.3047 26.9142 24.0858L36 33.1716L45.0858 24.0858C45.8668 23.3047 47.1332 23.3047 47.9142 24.0858C48.6953 24.8668 48.6953 26.1332 47.9142 26.9142L38.8284 36L47.9142 45.0858C48.6953 45.8668 48.6953 47.1332 47.9142 47.9142C47.1332 48.6953 45.8668 48.6953 45.0858 47.9142L36 38.8284L26.9142 47.9142C26.1332 48.6953 24.8668 48.6953 24.0858 47.9142C23.3047 47.1332 23.3047 45.8668 24.0858 45.0858L33.1716 36L24.0858 26.9142Z"></path></svg>`);
var ErrorIcon = (props) => {
  const theme = useTheme();
  const size = () => props.size || "s";
  const fill = () => props.fill || theme.colors.icon.error;
  return createMemo((() => {
    const _c$ = createMemo(() => size() === "s");
    return () => _c$() ? (() => {
      const _el$ = _tmpl$$9.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
      createRenderEffect((_p$) => {
        const _v$ = props.class, _v$2 = fill(), _v$3 = theme.colors.constant.white;
        _v$ !== _p$._v$ && setAttribute(_el$, "class", _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && setAttribute(_el$2, "fill", _p$._v$2 = _v$2);
        _v$3 !== _p$._v$3 && setAttribute(_el$3, "fill", _p$._v$3 = _v$3);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0
      });
      return _el$;
    })() : (() => {
      const _el$4 = _tmpl$2$2.cloneNode(true), _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling;
      createRenderEffect((_p$) => {
        const _v$4 = props.class, _v$5 = fill(), _v$6 = theme.colors.constant.white;
        _v$4 !== _p$._v$4 && setAttribute(_el$4, "class", _p$._v$4 = _v$4);
        _v$5 !== _p$._v$5 && setAttribute(_el$5, "fill", _p$._v$5 = _v$5);
        _v$6 !== _p$._v$6 && setAttribute(_el$6, "fill", _p$._v$6 = _v$6);
        return _p$;
      }, {
        _v$4: void 0,
        _v$5: void 0,
        _v$6: void 0
      });
      return _el$4;
    })();
  })());
};
var _tmpl$$8 = template$1(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.55 5.85123C18.9459 7.81184 20.1094 12.1541 18.1488 15.55C16.1882 18.9459 11.8459 20.1094 8.44998 18.1488C8.01952 17.9003 7.46909 18.0478 7.22056 18.4782C6.97203 18.9087 7.11952 19.4591 7.54998 19.7076C11.8068 22.1653 17.2499 20.7068 19.7076 16.45C22.1653 12.1932 20.7068 6.75005 16.45 4.29239C12.1932 1.83472 6.75003 3.29321 4.29236 7.55001C4.04383 7.98047 4.19132 8.53091 4.62178 8.77943C5.05224 9.02796 5.60268 8.88048 5.8512 8.45001C7.81181 5.05413 12.1541 3.89062 15.55 5.85123Z"></path></svg>`);
var _tmpl$2$1 = template$1(`<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 56.7846C35.479 63.412 50.1572 59.479 56.7846 47.9999C63.412 36.5209 59.479 21.8427 48 15.2153C36.521 8.58791 21.8428 12.5209 15.2154 23.9999" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
var LoaderIcon = (props) => {
  const theme = useTheme();
  const size = () => props.size || "s";
  const fill = () => props.fill || theme.colors.icon.tertiary;
  const rotateAnimation = h`
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
    `;
  const svgClass = u`
        animation: ${rotateAnimation} 1s linear infinite;
    `;
  return createMemo((() => {
    const _c$ = createMemo(() => size() === "s");
    return () => _c$() ? (() => {
      const _el$ = _tmpl$$8.cloneNode(true), _el$2 = _el$.firstChild;
      createRenderEffect((_p$) => {
        const _v$ = (0, import_classnames.default)(svgClass, props.class), _v$2 = fill();
        _v$ !== _p$._v$ && setAttribute(_el$, "class", _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && setAttribute(_el$2, "fill", _p$._v$2 = _v$2);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0
      });
      return _el$;
    })() : (() => {
      const _el$3 = _tmpl$2$1.cloneNode(true), _el$4 = _el$3.firstChild;
      createRenderEffect((_p$) => {
        const _v$3 = (0, import_classnames.default)(svgClass, props.class), _v$4 = fill();
        _v$3 !== _p$._v$3 && setAttribute(_el$3, "class", _p$._v$3 = _v$3);
        _v$4 !== _p$._v$4 && setAttribute(_el$4, "stroke", _p$._v$4 = _v$4);
        return _p$;
      }, {
        _v$3: void 0,
        _v$4: void 0
      });
      return _el$3;
    })();
  })());
};
var TonConnectUiContext = createContext();
var _tmpl$$7 = template$1(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.76228 2.09998H10.2378C11.0458 2.09997 11.7067 2.09996 12.2438 2.14384C12.7997 2.18926 13.3017 2.28614 13.7706 2.52505C14.5045 2.89896 15.1011 3.49558 15.475 4.22941C15.7139 4.6983 15.8108 5.20038 15.8562 5.75629C15.9001 6.29337 15.9001 6.95422 15.9001 7.76227V8.1H16.2377C17.0457 8.09999 17.7066 8.09998 18.2437 8.14386C18.7996 8.18928 19.3017 8.28616 19.7705 8.52507C20.5044 8.89898 21.101 9.4956 21.4749 10.2294C21.7138 10.6983 21.8107 11.2004 21.8561 11.7563C21.9 12.2934 21.9 12.9542 21.9 13.7623V16.2377C21.9 17.0458 21.9 17.7066 21.8561 18.2437C21.8107 18.7996 21.7138 19.3017 21.4749 19.7706C21.101 20.5044 20.5044 21.101 19.7705 21.4749C19.3017 21.7138 18.7996 21.8107 18.2437 21.8561C17.7066 21.9 17.0458 21.9 16.2378 21.9H13.7623C12.9543 21.9 12.2934 21.9 11.7563 21.8561C11.2004 21.8107 10.6983 21.7138 10.2294 21.4749C9.49561 21.101 8.89898 20.5044 8.52508 19.7706C8.28616 19.3017 8.18928 18.7996 8.14386 18.2437C8.09998 17.7066 8.09999 17.0458 8.1 16.2377V15.9H7.76227C6.95426 15.9 6.29335 15.9 5.75629 15.8561C5.20038 15.8107 4.6983 15.7138 4.22941 15.4749C3.49558 15.101 2.89896 14.5044 2.52505 13.7705C2.28614 13.3017 2.18926 12.7996 2.14384 12.2437C2.09996 11.7066 2.09997 11.0458 2.09998 10.2377V7.76228C2.09997 6.95424 2.09996 6.29336 2.14384 5.75629C2.18926 5.20038 2.28614 4.6983 2.52505 4.22941C2.89896 3.49558 3.49558 2.89896 4.22941 2.52505C4.6983 2.28614 5.20038 2.18926 5.75629 2.14384C6.29336 2.09996 6.95425 2.09997 7.76228 2.09998ZM8.1 14.1V13.7623C8.09999 12.9542 8.09998 12.2934 8.14386 11.7563C8.18928 11.2004 8.28616 10.6983 8.52508 10.2294C8.89898 9.4956 9.49561 8.89898 10.2294 8.52507C10.6983 8.28616 11.2004 8.18928 11.7563 8.14386C12.2934 8.09998 12.9542 8.09999 13.7623 8.1H14.1001V7.79998C14.1001 6.94505 14.0994 6.35798 14.0622 5.90287C14.0259 5.45827 13.9593 5.21944 13.8712 5.0466C13.6699 4.65146 13.3486 4.3302 12.9535 4.12886C12.7806 4.04079 12.5418 3.97419 12.0972 3.93786C11.6421 3.90068 11.055 3.89998 10.2001 3.89998H7.79998C6.94505 3.89998 6.35798 3.90068 5.90287 3.93786C5.45827 3.97419 5.21944 4.04079 5.0466 4.12886C4.65146 4.3302 4.3302 4.65146 4.12886 5.0466C4.04079 5.21944 3.97419 5.45827 3.93786 5.90287C3.90068 6.35798 3.89998 6.94505 3.89998 7.79998V10.2C3.89998 11.0549 3.90068 11.642 3.93786 12.0971C3.97419 12.5417 4.04079 12.7805 4.12886 12.9534C4.3302 13.3485 4.65146 13.6698 5.0466 13.8711C5.21944 13.9592 5.45827 14.0258 5.90287 14.0621C6.35798 14.0993 6.94505 14.1 7.79998 14.1H8.1ZM11.0466 10.1289C11.2195 10.0408 11.4583 9.97421 11.9029 9.93788C12.358 9.9007 12.9451 9.9 13.8 9.9H16.2C17.0549 9.9 17.642 9.9007 18.0971 9.93788C18.5417 9.97421 18.7805 10.0408 18.9534 10.1289C19.3485 10.3302 19.6698 10.6515 19.8711 11.0466C19.9592 11.2195 20.0258 11.4583 20.0621 11.9029C20.0993 12.358 20.1 12.9451 20.1 13.8V16.2C20.1 17.0549 20.0993 17.642 20.0621 18.0971C20.0258 18.5417 19.9592 18.7805 19.8711 18.9534C19.6698 19.3485 19.3485 19.6698 18.9534 19.8711C18.7805 19.9592 18.5417 20.0258 18.0971 20.0621C17.642 20.0993 17.0549 20.1 16.2 20.1H13.8C12.9451 20.1 12.358 20.0993 11.9029 20.0621C11.4583 20.0258 11.2195 19.9592 11.0466 19.8711C10.6515 19.6698 10.3302 19.3485 10.1289 18.9534C10.0408 18.7805 9.97421 18.5417 9.93788 18.0971C9.9007 17.642 9.9 17.0549 9.9 16.2V13.8C9.9 12.9451 9.9007 12.358 9.93788 11.9029C9.97421 11.4583 10.0408 11.2195 10.1289 11.0466C10.3302 10.6515 10.6515 10.3302 11.0466 10.1289Z"></path></svg>`);
var CopyIcon = (props) => {
  const theme = useTheme();
  const fill = () => props.fill || theme.colors.icon.primary;
  return (() => {
    const _el$ = _tmpl$$7.cloneNode(true), _el$2 = _el$.firstChild;
    createRenderEffect(() => setAttribute(_el$2, "fill", fill()));
    return _el$;
  })();
};
var _tmpl$$6 = template$1(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.7624 3.10001C7.95435 3.1 7.29349 3.09999 6.75642 3.14387C6.2005 3.18929 5.69842 3.28617 5.22954 3.52508C4.4957 3.89899 3.89908 4.49561 3.52517 5.22944C3.28626 5.69833 3.18938 6.20041 3.14396 6.75632C3.10008 7.2934 3.10009 7.95424 3.1001 8.76229V15.2377C3.10009 16.0458 3.10008 16.7066 3.14396 17.2437C3.18938 17.7996 3.28626 18.3017 3.52517 18.7706C3.89908 19.5044 4.4957 20.101 5.22954 20.4749C5.69842 20.7138 6.2005 20.8107 6.75642 20.8561C7.29349 20.9 7.95434 20.9 8.76239 20.9H12.0001C12.4972 20.9 12.9001 20.4971 12.9001 20C12.9001 19.503 12.4972 19.1 12.0001 19.1H8.8001C7.94517 19.1 7.3581 19.0993 6.90299 19.0621C6.45839 19.0258 6.21956 18.9592 6.04672 18.8711C5.65158 18.6698 5.33032 18.3485 5.12898 17.9534C5.04092 17.7805 4.97431 17.5417 4.93798 17.0971C4.9008 16.642 4.9001 16.0549 4.9001 15.2V8.80001C4.9001 7.94508 4.9008 7.35801 4.93798 6.9029C4.97431 6.4583 5.04092 6.21947 5.12898 6.04663C5.33032 5.65149 5.65158 5.33023 6.04672 5.12889C6.21956 5.04082 6.45839 4.97422 6.90299 4.93789C7.3581 4.90071 7.94517 4.90001 8.8001 4.90001H12.0001C12.4972 4.90001 12.9001 4.49706 12.9001 4.00001C12.9001 3.50295 12.4972 3.10001 12.0001 3.10001H8.7624Z"></path><path d="M17.6364 7.3636C17.2849 7.01212 16.7151 7.01212 16.3636 7.3636C16.0121 7.71507 16.0121 8.28492 16.3636 8.63639L18.8272 11.1H9.00001C8.50295 11.1 8.10001 11.5029 8.10001 12C8.10001 12.497 8.50295 12.9 9.00001 12.9H18.8272L16.3636 15.3636C16.0121 15.7151 16.0121 16.2849 16.3636 16.6364C16.7151 16.9879 17.2849 16.9879 17.6364 16.6364L21.6364 12.6364C21.9879 12.2849 21.9879 11.7151 21.6364 11.3636L17.6364 7.3636Z"></path></svg>`);
var DisconnectIcon = (props) => {
  const theme = useTheme();
  const fill = () => props.fill || theme.colors.icon.primary;
  return (() => {
    const _el$ = _tmpl$$6.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
    createRenderEffect((_p$) => {
      const _v$ = fill(), _v$2 = fill();
      _v$ !== _p$._v$ && setAttribute(_el$2, "fill", _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && setAttribute(_el$3, "fill", _p$._v$2 = _v$2);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0
    });
    return _el$;
  })();
};
var hoverBorders$1 = {
  m: "8px",
  s: "4px",
  none: "0"
};
var dropdownBorders = {
  m: "16px",
  s: "8px",
  none: "0"
};
var AccountButtonDropdownStyled = styled.div`
    width: 256px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.16);
    border-radius: ${(props) => dropdownBorders[props.theme.borderRadius]};

    background-color: ${(props) => props.theme.colors.background.primary}
           
    color: ${(props) => props.theme.colors.text.primary}
`;
var UlStyled$1 = styled.ul`
    background-color: ${(props) => props.theme.colors.background.primary};
    padding: 8px;
`;
var MenuButtonStyled = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding-left: 8px;
    width: 100%;

    background-color: ${(props) => props.theme.colors.background.primary};
    border: none;
    border-radius: ${(props) => hoverBorders$1[props.theme.borderRadius]};
    cursor: pointer;

    transition: background-color, transform 0.1s ease-in-out;

    &:hover {
        background-color: ${(props) => props.theme.colors.background.secondary};
    }

    &:active {
        transform: scale(0.96);
    }
`;
var _tmpl$$5 = template$1(`<li></li>`);
var MenuItemText = (props) => createComponent(Text, {
  get translationKey() {
    return props.translationKey;
  },
  fontSize: "15px",
  fontWeight: "590",
  get children() {
    return props.children;
  }
});
var AccountButtonDropdown = (props) => {
  const tonConnectUi = useContext(TonConnectUiContext);
  const [isCopiedShown, setIsCopiedShown] = createSignal(false);
  const onCopy = () => __async(void 0, null, function* () {
    const userFriendlyAddress = toUserFriendlyAddress(tonConnectUi.account.address, tonConnectUi.account.chain === CHAIN.TESTNET);
    yield copyToClipboard(userFriendlyAddress);
    setIsCopiedShown(true);
    setTimeout(() => setIsCopiedShown(false), 1e3);
  });
  const onDisconnect = () => {
    tonConnectUi.disconnect();
    props.onClose();
  };
  return createComponent(AccountButtonDropdownStyled, {
    ref(r$) {
      const _ref$ = props.ref;
      typeof _ref$ === "function" ? _ref$(r$) : props.ref = r$;
    },
    get ["class"]() {
      return props.class;
    },
    "data-tc-dropdown": "true",
    get children() {
      return createComponent(UlStyled$1, {
        get children() {
          return [(() => {
            const _el$ = _tmpl$$5.cloneNode(true);
            insert(_el$, createComponent(MenuButtonStyled, {
              onClick: () => onCopy(),
              get children() {
                return [createComponent(CopyIcon, {}), createComponent(Show, {
                  get when() {
                    return !isCopiedShown();
                  },
                  get children() {
                    return createComponent(MenuItemText, {
                      translationKey: "button.dropdown.copy",
                      children: "Copy address"
                    });
                  }
                }), createComponent(Show, {
                  get when() {
                    return isCopiedShown();
                  },
                  get children() {
                    return createComponent(MenuItemText, {
                      translationKey: "button.dropdown.copied",
                      children: "Address copied!"
                    });
                  }
                })];
              }
            }));
            return _el$;
          })(), (() => {
            const _el$2 = _tmpl$$5.cloneNode(true);
            insert(_el$2, createComponent(MenuButtonStyled, {
              onClick: () => onDisconnect(),
              get children() {
                return [createComponent(DisconnectIcon, {}), createComponent(MenuItemText, {
                  translationKey: "button.dropdown.disconnect",
                  children: "Disconnect"
                })];
              }
            }));
            return _el$2;
          })()];
        }
      });
    }
  });
};
var borders$2 = {
  m: "16px",
  s: "8px",
  none: "0"
};
var NotificationStyled = styled.div`
    width: 256px;
    padding: 12px 16px;
    display: flex;
    gap: 9px;

    background-color: ${(props) => props.theme.colors.background.primary};
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.16);
    border-radius: ${(props) => borders$2[props.theme.borderRadius]};
`;
var NotificationContentStyled = styled.div`
    width: 192px;
`;
var TextStyled$2 = styled(Text)`
    margin-top: 4px;
    color: ${(props) => props.theme.colors.text.secondary};
`;
var Notification = (props) => {
  const dataAttrs = useDataAttributes(props);
  return createComponent(NotificationStyled, mergeProps({
    get ["class"]() {
      return props.class;
    },
    "data-tc-notification": "true"
  }, dataAttrs, {
    get children() {
      return [createComponent(NotificationContentStyled, {
        get children() {
          return [createComponent(H3, {
            get translationKey() {
              return props.header.translationKey;
            },
            get translationValues() {
              return props.header.translationValues;
            },
            get children() {
              return props.children;
            }
          }), createComponent(Show, {
            get when() {
              return props.text;
            },
            get children() {
              return createComponent(TextStyled$2, {
                get translationKey() {
                  return props.text.translationKey;
                },
                get translationValues() {
                  return props.text.translationValues;
                }
              });
            }
          })];
        }
      }), createMemo(() => props.icon)];
    }
  }));
};
var LoaderIconStyled$1 = styled(LoaderIcon)`
    align-self: center;
`;
var ConfirmOperationNotification = (props) => {
  var _a;
  const tonConnectUI2 = useContext(TonConnectUiContext);
  const [t2] = useI18n();
  const name = ((_a = tonConnectUI2.wallet) == null ? void 0 : _a.name) || t2("common.yourWallet", {}, "your wallet");
  return createComponent(Notification, {
    header: {
      translationKey: "notifications.confirm.header",
      translationValues: {
        name
      }
    },
    get ["class"]() {
      return props.class;
    },
    get icon() {
      return createComponent(LoaderIconStyled$1, {});
    },
    "data-tc-notification-confirm": "true",
    children: "Confirm operation in your wallet"
  });
};
var ErrorIconStyled = styled(ErrorIcon)`
    margin-top: 2px;
`;
var ErrorTransactionNotification = (props) => {
  return createComponent(Notification, {
    header: {
      translationKey: "notifications.transactionCanceled.header"
    },
    text: {
      translationKey: "notifications.transactionCanceled.text"
    },
    get icon() {
      return createComponent(ErrorIconStyled, {});
    },
    get ["class"]() {
      return props.class;
    },
    "data-tc-notification-tx-cancelled": "true",
    children: "Transaction cancelled"
  });
};
var SuccessIconStyled = styled(SuccessIcon)`
    margin-top: 2px;
`;
var SuccessTransactionNotification = (props) => {
  return createComponent(Notification, {
    header: {
      translationKey: "notifications.transactionSent.header"
    },
    text: {
      translationKey: "notifications.transactionSent.text"
    },
    get icon() {
      return createComponent(SuccessIconStyled, {});
    },
    get ["class"]() {
      return props.class;
    },
    "data-tc-notification-tx-sent": "true",
    children: "Transaction sent"
  });
};
var NotificationClass = u`
    transform: translateY(-8px);
    margin-bottom: 12px;
`;
var _tmpl$$4 = template$1(`<div data-tc-list-notifications="true"></div>`);
var Notifications = (props) => {
  const timeouts = [];
  const [openedNotifications, setOpenedNotifications] = createSignal([]);
  let lastId = -1;
  const liveTimeoutMs = 4500;
  createEffect(on(action, (action2) => {
    if (action2 && action2.showNotification) {
      lastId++;
      const id = lastId;
      setOpenedNotifications((notifications2) => notifications2.filter((notification) => notification.action !== "confirm-transaction").concat({
        id,
        action: action2.name
      }));
      timeouts.push(setTimeout(() => setOpenedNotifications((notifications2) => notifications2.filter((notification) => notification.id !== id)), liveTimeoutMs));
    }
  }));
  onCleanup(() => {
    timeouts.forEach(clearTimeout);
  });
  return (() => {
    const _el$ = _tmpl$$4.cloneNode(true);
    insert(_el$, createComponent(TransitionGroup, {
      onBeforeEnter: (el) => {
        el.animate([{
          opacity: 0,
          transform: "translateY(0)"
        }, {
          opacity: 1,
          transform: "translateY(-8px)"
        }], {
          duration: 200
        });
      },
      onExit: (el, done) => {
        const a2 = el.animate([{
          opacity: 1,
          transform: "translateY(-8px)"
        }, {
          opacity: 0,
          transform: "translateY(-30px)"
        }], {
          duration: 200
        });
        a2.finished.then(done);
      },
      get children() {
        return createComponent(For, {
          get each() {
            return openedNotifications();
          },
          children: (openedNotification) => createComponent(Switch, {
            get children() {
              return [createComponent(Match, {
                get when() {
                  return openedNotification.action === "transaction-sent";
                },
                get children() {
                  return createComponent(SuccessTransactionNotification, {
                    "class": NotificationClass
                  });
                }
              }), createComponent(Match, {
                get when() {
                  return openedNotification.action === "transaction-canceled";
                },
                get children() {
                  return createComponent(ErrorTransactionNotification, {
                    "class": NotificationClass
                  });
                }
              }), createComponent(Match, {
                get when() {
                  return openedNotification.action === "confirm-transaction";
                },
                get children() {
                  return createComponent(ConfirmOperationNotification, {
                    "class": NotificationClass
                  });
                }
              })];
            }
          })
        });
      }
    }));
    createRenderEffect(() => className(_el$, props.class));
    return _el$;
  })();
};
var AccountButtonStyled = styled(Button)`
    background-color: ${(props) => props.theme.colors.connectButton.background};
    color: ${(props) => props.theme.colors.connectButton.foreground};
    box-shadow: ${(props) => `0 4px 24px ${rgba(props.theme.colors.constant.black, 0.16)}`};
    padding: 8px 16px 8px 12px;

    display: flex;
    align-items: center;
    gap: 4px;
    height: 40px;
`;
var DropdownButtonStyled = styled(AccountButtonStyled)`
    padding: 12px 16px;
    min-width: 148px;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.background.primary};
`;
var LoaderButtonStyled = styled(Button)`
    min-width: 148px;
    height: 40px;

    background-color: ${(props) => props.theme.colors.background.primary};
    color: ${(props) => props.theme.colors.connectButton.foreground};
    box-shadow: ${(props) => `0 4px 24px ${rgba(props.theme.colors.constant.black, 0.16)}`};

    display: flex;
    align-items: center;
    justify-content: center;
`;
var LoaderIconStyled = styled(LoaderIcon)`
    height: 18px;
    width: 18px;
`;
var DropdownContainerStyled = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;
var DropdownStyled = styled(AccountButtonDropdown)`
    box-sizing: border-box;
    overflow: hidden;
    margin-top: 12px;
`;
var NotificationsStyled = styled(Notifications)`
    > div:first-child {
        margin-top: 20px;
    }
`;
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === "x";
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition$1 = (reference, floating, config) => __async(void 0, null, function* () {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(floating);
  if ({}.NODE_ENV !== "production") {
    if (platform2 == null) {
      console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" "));
    }
    if (validMiddleware.filter((_ref) => {
      let {
        name
      } = _ref;
      return name === "autoPlacement" || name === "flip";
    }).length > 1) {
      throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement` middleware", "detected. This will lead to an infinite loop. Ensure only one of", "either has been passed to the `middleware` array."].join(" "));
    }
    if (!reference || !floating) {
      console.error(["Floating UI: The reference and/or floating element was not defined", "when `computePosition()` was called. Ensure that both elements have", "been created and can be measured."].join(" "));
    }
  }
  let rects = yield platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0; i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = yield fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = __spreadProps(__spreadValues({}, middlewareData), {
      [name]: __spreadValues(__spreadValues({}, middlewareData[name]), data)
    });
    if ({}.NODE_ENV !== "production") {
      if (resetCount > 50) {
        console.warn(["Floating UI: The middleware lifecycle appears to be running in an", "infinite loop. This is usually caused by a `reset` continually", "being returned without a break condition."].join(" "));
      }
    }
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? yield platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
});
function rectToClientRect(rect) {
  return __spreadProps(__spreadValues({}, rect), {
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getWindow2(node) {
  var _node$ownerDocument;
  return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getComputedStyle$1(element) {
  return getWindow2(element).getComputedStyle(element);
}
function getNodeName(node) {
  return isNode(node) ? (node.nodeName || "").toLowerCase() : "";
}
var uaString;
function getUAString() {
  if (uaString) {
    return uaString;
  }
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    uaString = uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
    return uaString;
  }
  return navigator.userAgent;
}
function isHTMLElement(value) {
  return value instanceof getWindow2(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow2(value).Element;
}
function isNode(value) {
  return value instanceof getWindow2(value).Node;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow2(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element);
  const backdropFilter = css.backdropFilter || css.WebkitBackdropFilter;
  return css.transform !== "none" || css.perspective !== "none" || (backdropFilter ? backdropFilter !== "none" : false) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective"].some((value) => css.willChange.includes(value)) || ["paint", "layout", "strict", "content"].some(
    (value) => {
      const contain = css.contain;
      return contain != null ? contain.includes(value) : false;
    }
  );
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
var min = Math.min;
var max = Math.max;
var round = Math.round;
var FALLBACK_SCALE = {
  x: 1,
  y: 1
};
function getScale(element) {
  const domElement = !isElement(element) && element.contextElement ? element.contextElement : isElement(element) ? element : null;
  if (!domElement) {
    return FALLBACK_SCALE;
  }
  const rect = domElement.getBoundingClientRect();
  const css = getComputedStyle$1(domElement);
  if (css.boxSizing !== "border-box") {
    if (!isHTMLElement(domElement)) {
      return FALLBACK_SCALE;
    }
    return {
      x: domElement.offsetWidth > 0 ? round(rect.width) / domElement.offsetWidth || 1 : 1,
      y: domElement.offsetHeight > 0 ? round(rect.height) / domElement.offsetHeight || 1 : 1
    };
  }
  let x = rect.width / parseFloat(css.width);
  let y = rect.height / parseFloat(css.height);
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  let scale = FALLBACK_SCALE;
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const win = isElement(element) ? getWindow2(element) : window;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scale.x;
  const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scale.y;
  const width = clientRect.width / scale.x;
  const height = clientRect.height / scale.y;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(element, true, strategy === "fixed", offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = node.assignedSlot || node.parentNode || (isShadowRoot(node) ? node.host : null) || getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function getOffsetParent(element) {
  const window2 = getWindow2(element);
  let offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getDimensions(element) {
  if (isHTMLElement(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = {
    x: 1,
    y: 1
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow2(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow2(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : {
    x: 1,
    y: 1
  };
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y,
    width,
    height
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  if (clippingAncestor === "viewport") {
    return rectToClientRect(getViewportRect(element, strategy));
  }
  if (isElement(clippingAncestor)) {
    return getInnerBoundingClientRect(clippingAncestor, strategy);
  }
  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const containingBlock = isContainingBlock(currentNode);
    const shouldDropCurrentNode = elementIsFixed ? !containingBlock && !currentContainingBlockComputedStyle : !containingBlock && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
var platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getScale,
  getElementRects(_ref) {
    return __async(this, null, function* () {
      let {
        reference,
        floating,
        strategy
      } = _ref;
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      return {
        reference: getRectRelativeToOffsetParent(reference, yield getOffsetParentFn(floating), strategy),
        floating: __spreadValues({
          x: 0,
          y: 0
        }, yield getDimensionsFn(floating))
      };
    });
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll: _ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...isElement(reference) ? getOverflowAncestors(reference) : reference.contextElement ? getOverflowAncestors(reference.contextElement) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  let observer = null;
  if (elementResize) {
    let initialUpdate = true;
    observer = new ResizeObserver(() => {
      if (!initialUpdate) {
        update();
      }
      initialUpdate = false;
    });
    isElement(reference) && !animationFrame && observer.observe(reference);
    if (!isElement(reference) && reference.contextElement && !animationFrame) {
      observer.observe(reference.contextElement);
    }
    observer.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _observer;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = __spreadValues({
    platform
  }, options);
  const platformWithCache = __spreadProps(__spreadValues({}, mergedOptions.platform), {
    _c: cache
  });
  return computePosition$1(reference, floating, __spreadProps(__spreadValues({}, mergedOptions), {
    platform: platformWithCache
  }));
};
function P(l2, u2, e2) {
  let c2 = () => {
    var t2;
    return (t2 = e2 == null ? void 0 : e2.placement) != null ? t2 : "bottom";
  }, d = () => {
    var t2;
    return (t2 = e2 == null ? void 0 : e2.strategy) != null ? t2 : "absolute";
  }, [n2, o2] = createSignal({ x: null, y: null, placement: c2(), strategy: d(), middlewareData: {} }), [x, F] = createSignal();
  createEffect(() => {
    let t2 = x();
    if (t2)
      throw t2.value;
  });
  let s2 = createMemo(() => (l2(), u2(), {}));
  function i2() {
    let t2 = l2(), r = u2();
    if (t2 && r) {
      let a2 = s2();
      computePosition(t2, r, { middleware: e2 == null ? void 0 : e2.middleware, placement: c2(), strategy: d() }).then((m) => {
        a2 === s2() && o2(m);
      }, (m) => {
        F(m);
      });
    }
  }
  return createEffect(() => {
    let t2 = l2(), r = u2();
    if (e2 == null || e2.middleware, c2(), d(), t2 && r)
      if (e2 != null && e2.whileElementsMounted) {
        let a2 = e2.whileElementsMounted(t2, r, i2);
        a2 && onCleanup(a2);
      } else
        i2();
  }), { get x() {
    return n2().x;
  }, get y() {
    return n2().y;
  }, get placement() {
    return n2().placement;
  }, get strategy() {
    return n2().strategy;
  }, get middlewareData() {
    return n2().middlewareData;
  }, update: i2 };
}
var _tmpl$$3 = template$1(`<tc-root data-tc-dropdown-container="true"></tc-root>`);
var AccountButton = () => {
  const theme = useTheme();
  const connector = useContext(ConnectorContext);
  const tonConnectUI2 = useContext(TonConnectUiContext);
  const [isOpened, setIsOpened] = createSignal(false);
  const [account, setAccount] = createSignal(connector.account);
  const [restoringProcess, setRestoringProcess] = createSignal(true);
  let dropDownRef;
  const [floating, setFloating] = createSignal();
  const [anchor, setAnchor] = createSignal();
  const position = P(anchor, floating, {
    whileElementsMounted: autoUpdate,
    placement: "bottom-end"
  });
  const normalizedAddress = () => {
    const acc = account();
    if (acc) {
      const userFriendlyAddress = toUserFriendlyAddress(acc.address, acc.chain === CHAIN.TESTNET);
      return userFriendlyAddress.slice(0, 4) + "…" + userFriendlyAddress.slice(-4);
    }
    return "";
  };
  tonConnectUI2.connectionRestored.then(() => setRestoringProcess(false));
  const unsubscribe = connector.onStatusChange((wallet) => {
    if (!wallet) {
      setIsOpened(false);
      setAccount(null);
      return;
    }
    setAccount(wallet.account);
  });
  const onClick = (e2) => {
    if (!account() || !isOpened()) {
      return;
    }
    const clickToButton = anchor().contains(e2.target);
    const clickToDropdown = dropDownRef.contains(e2.target);
    if (!clickToButton && !clickToDropdown) {
      setIsOpened(false);
    }
  };
  onMount(() => {
    document.body.addEventListener("click", onClick);
  });
  onCleanup(() => {
    document.body.removeEventListener("click", onClick);
    unsubscribe();
  });
  return createComponent(Dynamic, {
    component: globalStylesTag,
    get children() {
      return [createComponent(Show, {
        get when() {
          return restoringProcess();
        },
        get children() {
          return createComponent(LoaderButtonStyled, {
            disabled: true,
            "data-tc-connect-button-loading": "true",
            get children() {
              return createComponent(LoaderIconStyled, {});
            }
          });
        }
      }), createComponent(Show, {
        get when() {
          return !restoringProcess();
        },
        get children() {
          return [createComponent(Show, {
            get when() {
              return !account();
            },
            get children() {
              return createComponent(AccountButtonStyled, {
                onClick: () => tonConnectUI2.connectWallet(),
                "data-tc-connect-button": "true",
                get children() {
                  return [createComponent(TonIcon, {
                    get fill() {
                      return theme.colors.connectButton.foreground;
                    }
                  }), createComponent(Text, {
                    translationKey: "button.connectWallet",
                    fontSize: "15px",
                    lineHeight: "18px",
                    fontWeight: "590",
                    get color() {
                      return theme.colors.connectButton.foreground;
                    },
                    children: "Connect wallet"
                  })];
                }
              });
            }
          }), createComponent(Show, {
            get when() {
              return account();
            },
            get children() {
              return createComponent(DropdownContainerStyled, {
                get children() {
                  return [createComponent(DropdownButtonStyled, {
                    onClick: () => setIsOpened((v) => !v),
                    ref: setAnchor,
                    "data-tc-dropdown-button": "true",
                    get children() {
                      return [createComponent(Text, {
                        fontSize: "15px",
                        fontWeight: "590",
                        lineHeight: "18px",
                        get children() {
                          return normalizedAddress();
                        }
                      }), createComponent(ArrowIcon, {
                        direction: "bottom"
                      })];
                    }
                  }), createComponent(Portal, {
                    get children() {
                      const _el$ = untrack(() => document.importNode(_tmpl$$3, true));
                      use(setFloating, _el$);
                      _el$.style.setProperty("z-index", "999");
                      _el$._$owner = getOwner();
                      insert(_el$, createComponent(Transition, {
                        onBeforeEnter: (el) => {
                          el.animate([{
                            opacity: 0,
                            transform: "translateY(-8px)"
                          }, {
                            opacity: 1,
                            transform: "translateY(0)"
                          }], {
                            duration: 150
                          });
                        },
                        onExit: (el, done) => {
                          const a2 = el.animate([{
                            opacity: 1,
                            transform: "translateY(0)"
                          }, {
                            opacity: 0,
                            transform: "translateY(-8px)"
                          }], {
                            duration: 150
                          });
                          a2.finished.then(done);
                        },
                        get children() {
                          return createComponent(Show, {
                            get when() {
                              return isOpened();
                            },
                            get children() {
                              return createComponent(DropdownStyled, {
                                get hidden() {
                                  return !isOpened();
                                },
                                onClose: () => setIsOpened(false),
                                ref(r$) {
                                  const _ref$ = dropDownRef;
                                  typeof _ref$ === "function" ? _ref$(r$) : dropDownRef = r$;
                                }
                              });
                            }
                          });
                        }
                      }), null);
                      insert(_el$, createComponent(NotificationsStyled, {}), null);
                      createRenderEffect((_p$) => {
                        var _a, _b;
                        const _v$ = position.strategy, _v$2 = `${(_a = position.y) != null ? _a : 0}px`, _v$3 = `${(_b = position.x) != null ? _b : 0}px`;
                        _v$ !== _p$._v$ && _el$.style.setProperty("position", _p$._v$ = _v$);
                        _v$2 !== _p$._v$2 && _el$.style.setProperty("top", _p$._v$2 = _v$2);
                        _v$3 !== _p$._v$3 && _el$.style.setProperty("left", _p$._v$3 = _v$3);
                        return _p$;
                      }, {
                        _v$: void 0,
                        _v$2: void 0,
                        _v$3: void 0
                      });
                      return _el$;
                    }
                  })];
                }
              });
            }
          })];
        }
      })];
    }
  });
};
var borders$1 = {
  m: "16px",
  s: "8px",
  none: "0"
};
var QrCodeModalStyled = styled.div`
    ${media("mobile")} {
        padding: 10px 16px 0 16px;
    }
`;
var H1Styled$2 = styled(H1)`
    max-width: 320px;
    margin: 0 auto 6px;
`;
var StyledIconButton = styled(IconButton)`
    position: absolute;
    top: 16px;
    left: 16px;
`;
var QRStyled = styled(QRCode)`
    margin-bottom: 16px;
`;
var ButtonsContainerStyled$1 = styled.div`
    display: flex;
    gap: 16px;
    height: 56px;
    margin-bottom: 24px;
`;
var ActionButtonStyled$1 = styled(Button)`
    padding: 0 16px;
    height: 56px;
    font-size: 16px;
    line-height: 20px;
    width: 100%;
    border-radius: ${(props) => borders$1[props.theme.borderRadius]};
`;
var GetWalletStyled$1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
var TextStyled$1 = styled(Text)`
    padding-left: 8px;
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 16px;
`;
var [appState, setAppState] = createStore({
  buttonRootId: null,
  language: "en",
  returnStrategy: "back",
  walletsListConfiguration: {}
});
var AStyled = styled.a`
    display: block;
    text-decoration: unset;
`;
var Link = (props) => {
  const attributes = () => props.blank ? {
    rel: "noreferrer noopener"
  } : {};
  return createComponent(AStyled, mergeProps({
    get href() {
      return props.href;
    },
    get target() {
      return props.blank ? "_blank" : "_self";
    }
  }, attributes, {
    get children() {
      return props.children;
    }
  }));
};
var QrCodeModal = (props) => {
  const connector = useContext(ConnectorContext);
  const universalLink = createMemo(() => connector.connect({
    universalLink: props.wallet.universalLink,
    bridgeUrl: props.wallet.bridgeUrl
  }, props.additionalRequest));
  return createComponent(QrCodeModalStyled, {
    "data-tc-wallet-qr-modal-desktop": "true",
    get children() {
      return [createComponent(StyledIconButton, {
        icon: "arrow",
        onClick: () => props.onBackClick()
      }), createComponent(H1Styled$2, {
        translationKey: "walletModal.qrCodeModal.connectWith",
        get translationValues() {
          return {
            name: props.wallet.name
          };
        },
        get children() {
          return ["Connect with ", createMemo(() => props.wallet.name)];
        }
      }), createComponent(H2, {
        translationKey: "walletModal.qrCodeModal.scan",
        get translationValues() {
          return {
            name: props.wallet.name
          };
        },
        get children() {
          return ["Scan QR code with your phone’s or ", createMemo(() => props.wallet.name), "’s camera."];
        }
      }), createComponent(QRStyled, {
        disableCopy: false,
        get sourceUrl() {
          return universalLink();
        },
        get imageUrl() {
          return props.wallet.imageUrl;
        }
      }), createComponent(ButtonsContainerStyled$1, {
        get children() {
          return [createComponent(ActionButtonStyled$1, {
            scale: "s",
            onClick: () => {
              setLastSelectedWalletInfo(__spreadProps(__spreadValues({}, props.wallet), {
                openMethod: "universal-link"
              }));
              openLinkBlank(addReturnStrategy(universalLink(), appState.returnStrategy));
            },
            get children() {
              return createComponent(Translation, {
                translationKey: "walletModal.qrCodeModal.openWallet",
                get translationValues() {
                  return {
                    name: props.wallet.name
                  };
                },
                get children() {
                  return ["Open ", createMemo(() => props.wallet.name)];
                }
              });
            }
          }), createComponent(Show, {
            get when() {
              return isWalletInfoCurrentlyInjected(props.wallet);
            },
            get children() {
              return createComponent(ActionButtonStyled$1, {
                scale: "s",
                onClick: () => {
                  setLastSelectedWalletInfo(props.wallet);
                  connector.connect({
                    jsBridgeKey: props.wallet.jsBridgeKey
                  }, props.additionalRequest);
                },
                get children() {
                  return createComponent(Translation, {
                    translationKey: "common.openExtension",
                    children: "Open Extension"
                  });
                }
              });
            }
          })];
        }
      }), createComponent(GetWalletStyled$1, {
        get children() {
          return [createComponent(TextStyled$1, {
            translationKey: "walletModal.qrCodeModal.dontHave",
            get translationValues() {
              return {
                name: props.wallet.name
              };
            },
            get children() {
              return ["Don't have ", createMemo(() => props.wallet.name), "?"];
            }
          }), createComponent(Link, {
            get href() {
              return props.wallet.aboutUrl;
            },
            blank: true,
            get children() {
              return createComponent(Button, {
                get children() {
                  return createComponent(Translation, {
                    translationKey: "common.get",
                    children: "GET"
                  });
                }
              });
            }
          })];
        }
      })];
    }
  });
};
var StyledModal = styled(Modal)`
    padding-left: 24px;
    padding-right: 24px;

    ${media("mobile")} {
        padding-left: 0;
        padding-right: 0;

        min-height: 364px;
    }
`;
var H1Styled$1 = styled(H1)`
    margin-top: 12px;

    ${media("mobile")} {
        padding: 0 10px;
    }
`;
var LoaderContainerStyled = styled.div`
    margin: 30px 0;
    width: 100%;
    display: flex;
    justify-content: center;

    ${media("mobile")} {
        height: 160px;
        align-items: center;
    }
`;
var TabTextStyled = styled(Text)`
    min-width: 84px;
    text-align: center;
    font-weight: 590;
`;
var TabBarStyled = styled(TabBar)`
    margin: 0 auto 22px;
`;
function uniq(array) {
  return [...new Set(array)];
}
function mergeConcat(idKey, array1, array2) {
  return array1.map((item1) => {
    const item2 = array2.find((elem) => elem[idKey] === item1[idKey]);
    array2 = array2.filter((elem) => elem[idKey] !== item1[idKey]);
    return item2 === void 0 ? item1 : item2;
  }).concat(array2);
}
function uiWalletToWalletInfo(uiWallet) {
  if ("jsBridgeKey" in uiWallet) {
    return __spreadProps(__spreadValues({}, uiWallet), {
      injected: TonConnect.isWalletInjected(uiWallet.jsBridgeKey),
      embedded: TonConnect.isInsideWalletBrowser(uiWallet.jsBridgeKey)
    });
  }
  return uiWallet;
}
function applyWalletsListConfiguration(walletsList, configuration) {
  var _a;
  if (!configuration) {
    return walletsList;
  }
  if ((_a = configuration.includeWallets) == null ? void 0 : _a.length) {
    walletsList = mergeConcat(
      "name",
      walletsList,
      configuration.includeWallets.map(uiWalletToWalletInfo)
    );
  }
  return walletsList;
}
function eqWalletName(wallet1, name) {
  if (!name) {
    return false;
  }
  return wallet1.name.toLowerCase() === name.toLowerCase() || wallet1.appName.toLowerCase() === name.toLowerCase();
}
var [isMobile, setIsMobile] = createSignal(isDevice("mobile"));
if (getWindow$1()) {
  window.addEventListener("resize", () => setIsMobile(isDevice("mobile")));
}
var UlStyled = styled.ul`
    display: flex;
    margin: 0 auto 24px;
    width: fit-content;
    min-height: 124px;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 24px;

    &&::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;
var DefaultWallet = styled.li`
    width: 82px;
    min-width: 82px;
    height: 124px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 4px;

    text-align: center;
    cursor: pointer;

    transition: transform 0.1s ease-in-out;

    ${mediaNotTouch} {
        &:hover {
            transform: scale(1.04);
        }
    }

    &:active {
        transform: scale(0.96);
    }

    ${mediaTouch} {
        &:active {
            transform: scale(0.92);
        }
    }
`;
var Divider = styled.div`
    width: 1px;
    margin: 0 10px;
    height: 24px;
    position: relative;
    top: 30px;

    background-color: ${(props) => props.theme.colors.icon.tertiary};
`;
var LongArrowIconContainer = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${(props) => rgba(props.theme.colors.accent, 0.12)};
    color: ${(props) => props.theme.colors.accent};

    margin-bottom: 8px;
`;
var H2Styled$2 = styled(H2)`
    margin-bottom: 24px;
    padding: 0 24px;
    min-height: 44px;
`;
var ButtonStyled$2 = styled(Button)`
    display: block;
    margin: 0 auto;
`;
var LINKS = {
  LEARN_MORE: "https://ton.org/wallets"
};
var _tmpl$$2 = template$1(`<div data-tc-wallets-modal-mobile="true"></div>`);
var _tmpl$2 = template$1(`<li></li>`);
var MobileSelectWalletModal = (props) => {
  const connector = appState.connector;
  const theme = useTheme();
  const onSelect = (walletInfo) => {
    if (!isMobileUserAgent()) {
      return props.onSelect(walletInfo);
    }
    if ("universalLink" in walletInfo) {
      setLastSelectedWalletInfo(__spreadProps(__spreadValues({}, walletInfo), {
        openMethod: "universal-link"
      }));
      const universalLink = connector.connect({
        universalLink: walletInfo.universalLink,
        bridgeUrl: walletInfo.bridgeUrl
      }, props.additionalRequest);
      openLink(addReturnStrategy(universalLink, appState.returnStrategy));
      return;
    }
    openLinkBlank(walletInfo.aboutUrl);
  };
  const onSelectUniversal = () => {
    const universalLink = connector.connect(props.walletsList.filter(isWalletInfoRemote).map((item) => ({
      bridgeUrl: item.bridgeUrl,
      universalLink: item.universalLink
    })), props.additionalRequest);
    setLastSelectedWalletInfo({
      openMethod: "universal-link"
    });
    openLink(addReturnStrategy(universalLink, appState.returnStrategy));
  };
  return (() => {
    const _el$ = _tmpl$$2.cloneNode(true);
    insert(_el$, createComponent(H1, {
      translationKey: "walletModal.mobileSelectWalletModal.connectWallet",
      children: "Connect a wallet"
    }), null);
    insert(_el$, createComponent(H2Styled$2, {
      translationKey: "walletModal.mobileSelectWalletModal.selectWallet",
      children: "Select your wallet from the options to get started."
    }), null);
    insert(_el$, createComponent(UlStyled, {
      get children() {
        return [createComponent(DefaultWallet, {
          onClick: onSelectUniversal,
          get children() {
            return [createComponent(LongArrowIconContainer, {
              get children() {
                return createComponent(LongArrowIcon, {
                  get fill() {
                    return theme.colors.accent;
                  }
                });
              }
            }), createComponent(Text, {
              fontWeight: 590,
              translationKey: "walletModal.mobileSelectWalletModal.installedWallet",
              children: "Installed wallet"
            })];
          }
        }), createComponent(Divider, {
          children: " "
        }), createComponent(For, {
          get each() {
            return props.walletsList.filter((wallet) => "bridgeUrl" in wallet);
          },
          children: (wallet) => (() => {
            const _el$2 = _tmpl$2.cloneNode(true);
            insert(_el$2, createComponent(WalletItem, {
              get iconUrl() {
                return wallet.imageUrl;
              },
              get name() {
                return wallet.name;
              },
              onClick: () => onSelect(wallet)
            }));
            return _el$2;
          })()
        })];
      }
    }), null);
    insert(_el$, createComponent(Link, {
      get href() {
        return LINKS.LEARN_MORE;
      },
      blank: true,
      get children() {
        return createComponent(ButtonStyled$2, {
          get children() {
            return createComponent(Translation, {
              translationKey: "common.learnMore",
              children: "Learn more"
            });
          }
        });
      }
    }), null);
    return _el$;
  })();
};
var borders = {
  m: "16px",
  s: "8px",
  none: "0"
};
var hoverBorders = {
  m: "8px",
  s: "4px",
  none: "0"
};
var UniversalQrModalStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
var H2Styled$1 = styled(H2)`
    max-width: 320px;
    margin-bottom: 24px;
`;
var QRCodeStyled = styled(QRCode)`
    margin-bottom: 16px;
`;
var ButtonsContainerStyled = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
`;
var ActionButtonStyled = styled(Button)`
    position: relative;
    font-size: 16px;
    line-height: 20px;
    width: 100%;
    padding: 0 16px;
    height: 56px;
    border-radius: ${(props) => borders[props.theme.borderRadius]};

    &:hover {
        ${(props) => props.disableEventsAnimation ? "transform: unset;" : ""}
    }

    &:active {
        ${(props) => props.disableEventsAnimation ? "transform: unset;" : ""}
    }
`;
var PopupWrapperStyled = styled.ul`
    position: absolute;
    bottom: 100%;
    left: 0;
    margin: 0;
    padding: 8px;
    width: 188px;
    transform: translateY(-16px);

    background-color: ${(props) => props.theme.colors.background.primary};
    border-radius: ${(props) => borders[props.theme.borderRadius]};
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.16);
`;
var ExtensionLiStyled = styled.li`
    padding: 8px;

    display: flex;
    align-items: center;
    gap: 8px;

    cursor: pointer;
    border-radius: ${(props) => hoverBorders[props.theme.borderRadius]};

    transition: background-color, transform 0.1s ease-in-out;

    &:hover {
        background-color: ${(props) => props.theme.colors.background.secondary};
    }

    &:active {
        transform: scale(0.96);
    }
`;
var ImageStyled = styled(Image)`
    width: 24px;
    height: 24px;

    border-radius: 6px;
`;
var GetWalletStyled = styled.div`
    margin-top: 23px;
    margin-bottom: 1px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
styled(Text)`
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 16px;
`;
var UniversalQrModal = (props) => {
  const [popupOpened, setPopupOpened] = createSignal(false);
  const connector = appState.connector;
  const walletsBridges = props.walletsList.filter(isWalletInfoRemote).map((item) => ({
    bridgeUrl: item.bridgeUrl,
    universalLink: item.universalLink
  }));
  const availableInjectableWallets = props.walletsList.filter(isWalletInfoCurrentlyInjected);
  setLastSelectedWalletInfo({
    openMethod: "qrcode"
  });
  const request = createMemo(() => connector.connect(walletsBridges, props.additionalRequest));
  const onOpenWalletClick = () => {
    let blurred = false;
    function blurHandler() {
      blurred = true;
      setLastSelectedWalletInfo({
        openMethod: "universal-link"
      });
      window.removeEventListener("blur", blurHandler);
    }
    window.addEventListener("blur", blurHandler);
    openLink(addReturnStrategy(request(), appState.returnStrategy));
    setTimeout(() => {
      if (!blurred) {
        props.openWalletFallback();
      }
      window.removeEventListener("blur", blurHandler);
    }, 200);
  };
  const onOpenExtensionClick = (e2) => {
    e2.stopPropagation();
    if (availableInjectableWallets.length === 1) {
      const walletInfo = availableInjectableWallets[0];
      setLastSelectedWalletInfo(walletInfo);
      connector.connect({
        jsBridgeKey: walletInfo.jsBridgeKey
      }, props.additionalRequest);
      return;
    }
    setPopupOpened((opened) => !opened);
  };
  const onExtensionClick = (walletInfo) => {
    setLastSelectedWalletInfo(walletInfo);
    connector.connect({
      jsBridgeKey: walletInfo.jsBridgeKey
    }, props.additionalRequest);
  };
  return createComponent(UniversalQrModalStyled, {
    onClick: () => setPopupOpened(false),
    "data-tc-universal-qr-desktop": "true",
    get children() {
      return [createComponent(H2Styled$1, {
        translationKey: "walletModal.universalQRModal.scanQR",
        children: "Scan QR code with a TON Connect compatible wallet."
      }), createComponent(QRCodeStyled, {
        get sourceUrl() {
          return request();
        },
        get disableCopy() {
          return popupOpened();
        }
      }), createComponent(ButtonsContainerStyled, {
        get children() {
          return [createComponent(ActionButtonStyled, {
            onClick: onOpenWalletClick,
            scale: "s",
            get children() {
              return [createComponent(Show, {
                get when() {
                  return availableInjectableWallets.length;
                },
                get children() {
                  return createComponent(Translation, {
                    translationKey: "walletModal.universalQRModal.openWallet",
                    children: "Open Wallet"
                  });
                }
              }), createComponent(Show, {
                get when() {
                  return !availableInjectableWallets.length;
                },
                get children() {
                  return createComponent(Translation, {
                    translationKey: "walletModal.universalQRModal.openInstalledWallet",
                    children: "Open Installed Wallet"
                  });
                }
              })];
            }
          }), createComponent(Show, {
            get when() {
              return availableInjectableWallets.length;
            },
            get children() {
              return createComponent(ActionButtonStyled, {
                onClick: onOpenExtensionClick,
                get disableEventsAnimation() {
                  return popupOpened();
                },
                scale: "s",
                get children() {
                  return [createComponent(Transition, {
                    onBeforeEnter: (el) => {
                      el.animate([{
                        opacity: 0,
                        transform: "translateY(0)"
                      }, {
                        opacity: 1,
                        transform: "translateY(-16px)"
                      }], {
                        duration: 150
                      });
                    },
                    onExit: (el, done) => {
                      el.animate([{
                        opacity: 1,
                        transform: "translateY(-16px)"
                      }, {
                        opacity: 0,
                        transform: "translateY(0)"
                      }], {
                        duration: 150
                      }).finished.then(done);
                    },
                    get children() {
                      return createComponent(Show, {
                        get when() {
                          return popupOpened();
                        },
                        get children() {
                          return createComponent(PopupWrapperStyled, {
                            get children() {
                              return createComponent(For, {
                                each: availableInjectableWallets,
                                children: (wallet) => createComponent(ExtensionLiStyled, {
                                  onClick: () => onExtensionClick(wallet),
                                  get children() {
                                    return [createComponent(ImageStyled, {
                                      get src() {
                                        return wallet.imageUrl;
                                      },
                                      alt: ""
                                    }), createComponent(Text, {
                                      fontWeight: 590,
                                      get children() {
                                        return wallet.name;
                                      }
                                    })];
                                  }
                                })
                              });
                            }
                          });
                        }
                      });
                    }
                  }), createComponent(Translation, {
                    translationKey: "common.openExtension",
                    children: "Open Extension"
                  })];
                }
              });
            }
          })];
        }
      }), createComponent(Show, {
        get when() {
          return !availableInjectableWallets.length;
        },
        get children() {
          return createComponent(GetWalletStyled, {
            get children() {
              return createComponent(Link, {
                get href() {
                  return LINKS.LEARN_MORE;
                },
                blank: true,
                get children() {
                  return createComponent(Button, {
                    appearance: "flat",
                    "class": u`
                                font-size: 15px;
                            `,
                    get children() {
                      return createComponent(Translation, {
                        translationKey: "common.learnMore",
                        children: "Learn more"
                      });
                    }
                  });
                }
              });
            }
          });
        }
      })];
    }
  });
};
var DesktopSelectWalletModalStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
var H2Styled = styled(H2)`
    margin-bottom: 26px;
`;
var WalletsUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, 92px);
    justify-content: center;
    row-gap: 8px;
    overflow-y: auto;
    max-height: 410px;
    width: calc(100% + 12px);
    margin-bottom: 30px;
    padding: 10px 0;
    align-self: flex-start;

    &&::-webkit-scrollbar {
        width: 8px;
    }

    &&::-webkit-scrollbar-track {
        background: transparent;
    }

    &&::-webkit-scrollbar-thumb {
        background: #cacaca;
        border-radius: 12px;
    }
`;
var ButtonStyled$1 = styled(Button)`
    display: block;
    margin: 0 auto 1px;
    font-size: 15px;
`;
var _tmpl$$1 = template$1(`<li></li>`);
var DesktopSelectWalletModal = (props) => {
  return createComponent(DesktopSelectWalletModalStyled, {
    "data-tc-select-wallet-desktop": "true",
    get children() {
      return [createComponent(H2Styled, {
        translationKey: "walletModal.desktopSelectWalletModal.selectWallet",
        children: "Choose your preferred wallet from the options to get started."
      }), createComponent(WalletsUl, {
        get children() {
          return createComponent(For, {
            get each() {
              return props.walletsList;
            },
            children: (wallet) => (() => {
              const _el$ = _tmpl$$1.cloneNode(true);
              insert(_el$, createComponent(WalletItem, {
                get iconUrl() {
                  return wallet.imageUrl;
                },
                get name() {
                  return wallet.name;
                },
                onClick: () => props.onSelect(wallet)
              }));
              return _el$;
            })()
          });
        }
      }), createComponent(Link, {
        get href() {
          return LINKS.LEARN_MORE;
        },
        blank: true,
        get children() {
          return createComponent(ButtonStyled$1, {
            appearance: "flat",
            get children() {
              return createComponent(Translation, {
                translationKey: "common.learnMore",
                children: "Learn more"
              });
            }
          });
        }
      })];
    }
  });
};
var _tmpl$ = template$1(`<div data-tc-wallets-modal-desktop="true"></div>`);
var WalletsModal = () => {
  const {
    locale
  } = useI18n()[1];
  createEffect(() => locale(appState.language));
  const connector = useContext(ConnectorContext);
  const tonConnectUI2 = useContext(TonConnectUiContext);
  const [fetchedWalletsList] = createResource(() => tonConnectUI2.getWallets());
  const [selectedWalletInfo, setSelectedWalletInfo] = createSignal(null);
  const [selectedTabIndex, setSelectedTabIndex] = createSignal(0);
  const walletsList = createMemo(() => {
    if (fetchedWalletsList.state !== "ready") {
      return null;
    }
    let walletsList2 = applyWalletsListConfiguration(fetchedWalletsList(), appState.walletsListConfiguration);
    const preferredWalletName = appState.preferredWalletName;
    const preferredWallet = walletsList2.find((item) => eqWalletName(item, preferredWalletName));
    const someWalletsWithSameName = walletsList2.filter((item) => eqWalletName(item, preferredWalletName)).length >= 2;
    if (preferredWalletName && preferredWallet && !someWalletsWithSameName) {
      walletsList2 = [preferredWallet].concat(walletsList2.filter((item) => !eqWalletName(item, preferredWalletName)));
    }
    return walletsList2;
  });
  const additionalRequestLoading = () => {
    var _a;
    return ((_a = appState.connectRequestParameters) == null ? void 0 : _a.state) === "loading";
  };
  const additionalRequest = createMemo(() => {
    var _a;
    if (additionalRequestLoading()) {
      return void 0;
    }
    return (_a = appState.connectRequestParameters) == null ? void 0 : _a.value;
  });
  const onClose = () => {
    setWalletsModalOpen(false);
    setSelectedWalletInfo(null);
  };
  const onSelectInDesktopList = (walletInfo) => {
    if (isWalletInfoCurrentlyInjected(walletInfo)) {
      setLastSelectedWalletInfo(walletInfo);
      connector.connect({
        jsBridgeKey: walletInfo.jsBridgeKey
      }, additionalRequest());
      return;
    }
    if (isWalletInfoRemote(walletInfo)) {
      setLastSelectedWalletInfo(__spreadProps(__spreadValues({}, walletInfo), {
        openMethod: "qrcode"
      }));
      setSelectedWalletInfo(walletInfo);
      return;
    }
    openLinkBlank(walletInfo.aboutUrl);
  };
  const unsubscribe = connector.onStatusChange((wallet) => {
    if (wallet) {
      onClose();
    }
  });
  onCleanup(unsubscribe);
  return createComponent(StyledModal, {
    get opened() {
      return walletsModalOpen();
    },
    onClose,
    "data-tc-wallets-modal-container": "true",
    get children() {
      return [createComponent(Show, {
        get when() {
          return additionalRequestLoading() || !walletsList();
        },
        get children() {
          return [createComponent(H1Styled$1, {
            translationKey: "walletModal.loading",
            children: "Wallets list is loading"
          }), createComponent(LoaderContainerStyled, {
            get children() {
              return createComponent(LoaderIcon, {
                size: "m"
              });
            }
          })];
        }
      }), createComponent(Show, {
        get when() {
          return createMemo(() => !!!additionalRequestLoading())() && walletsList();
        },
        get children() {
          return [createComponent(Show, {
            get when() {
              return createMemo(() => !!isMobile())() && !selectedWalletInfo();
            },
            get children() {
              return createComponent(MobileSelectWalletModal, {
                onSelect: onSelectInDesktopList,
                get walletsList() {
                  return walletsList();
                },
                get additionalRequest() {
                  return additionalRequest();
                }
              });
            }
          }), createComponent(Show, {
            get when() {
              return !isMobile();
            },
            get children() {
              return createComponent(Show, {
                get when() {
                  return !selectedWalletInfo();
                },
                get children() {
                  const _el$ = _tmpl$.cloneNode(true);
                  insert(_el$, createComponent(TabBarStyled, {
                    get tab1() {
                      return createComponent(TabTextStyled, {
                        translationKey: "walletModal.qrCode",
                        cursor: "unset",
                        children: "QR Code"
                      });
                    },
                    get tab2() {
                      return createComponent(TabTextStyled, {
                        translationKey: "walletModal.wallets",
                        cursor: "unset",
                        children: "Wallets"
                      });
                    },
                    get selectedTabIndex() {
                      return selectedTabIndex();
                    },
                    onSelectedTabIndexChange: setSelectedTabIndex
                  }), null);
                  insert(_el$, createComponent(Switch, {
                    get children() {
                      return [createComponent(Match, {
                        get when() {
                          return selectedTabIndex() === 0;
                        },
                        get children() {
                          return createComponent(UniversalQrModal, {
                            get walletsList() {
                              return walletsList();
                            },
                            get additionalRequest() {
                              return additionalRequest();
                            },
                            openWalletFallback: () => setSelectedTabIndex(1)
                          });
                        }
                      }), createComponent(Match, {
                        get when() {
                          return selectedTabIndex() === 1;
                        },
                        get children() {
                          return createComponent(DesktopSelectWalletModal, {
                            get walletsList() {
                              return walletsList();
                            },
                            onSelect: onSelectInDesktopList
                          });
                        }
                      })];
                    }
                  }), null);
                  return _el$;
                }
              });
            }
          }), createComponent(Show, {
            get when() {
              return selectedWalletInfo();
            },
            get children() {
              return createComponent(QrCodeModal, {
                get additionalRequest() {
                  return additionalRequest();
                },
                get wallet() {
                  return selectedWalletInfo();
                },
                onBackClick: () => setSelectedWalletInfo(null)
              });
            }
          })];
        }
      })];
    }
  });
};
var ActionModalStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 8px;
`;
var H1Styled = styled(H1)`
    margin-top: 16px;
`;
var TextStyled = styled(Text)`
    font-weight: 510;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    max-width: 250px;

    color: ${(props) => props.theme.colors.text.secondary};
`;
var ButtonStyled = styled(Button)`
    margin-top: 32px;
`;
var ActionModal = (props) => {
  const dataAttrs = useDataAttributes(props);
  const tonConnectUI2 = useContext(TonConnectUiContext);
  let universalLink;
  if ((tonConnectUI2 == null ? void 0 : tonConnectUI2.wallet) && "universalLink" in tonConnectUI2.wallet && tonConnectUI2.wallet.openMethod === "universal-link") {
    universalLink = tonConnectUI2.wallet.universalLink;
  }
  const onOpenWallet = () => {
    openLink(addReturnStrategy(universalLink, "back"));
  };
  return createComponent(ActionModalStyled, mergeProps(dataAttrs, {
    get children() {
      return [createMemo(() => props.icon), createComponent(H1Styled, {
        get translationKey() {
          return props.headerTranslationKey;
        },
        get translationValues() {
          return props.headerTranslationValues;
        }
      }), createComponent(TextStyled, {
        get translationKey() {
          return props.textTranslationKey;
        },
        get translationValues() {
          return props.textTranslationValues;
        }
      }), createComponent(Show, {
        get when() {
          return props.showButton !== "open-wallet";
        },
        get children() {
          return createComponent(ButtonStyled, {
            onClick: () => props.onClose(),
            get children() {
              return createComponent(Translation, {
                translationKey: "common.close",
                children: "Close"
              });
            }
          });
        }
      }), createComponent(Show, {
        get when() {
          return props.showButton === "open-wallet" && universalLink;
        },
        get children() {
          return createComponent(ButtonStyled, {
            onClick: onOpenWallet,
            get children() {
              return createComponent(Translation, {
                translationKey: "common.openWallet",
                children: "Open wallet"
              });
            }
          });
        }
      })];
    }
  }));
};
var ConfirmTransactionModal = (props) => {
  var _a;
  const tonConnectUI2 = useContext(TonConnectUiContext);
  const [t2] = useI18n();
  const name = ((_a = tonConnectUI2.wallet) == null ? void 0 : _a.name) || t2("common.yourWallet", {}, "your wallet");
  return createComponent(ActionModal, {
    headerTranslationKey: "actionModal.confirmTransaction.header",
    headerTranslationValues: {
      name
    },
    textTranslationKey: "actionModal.confirmTransaction.text",
    get icon() {
      return createComponent(LoaderIcon, {
        size: "m"
      });
    },
    onClose: () => props.onClose(),
    showButton: "open-wallet",
    "data-tc-confirm-modal": "true"
  });
};
var TransactionCanceledModal = (props) => {
  return createComponent(ActionModal, {
    headerTranslationKey: "actionModal.transactionCanceled.header",
    textTranslationKey: "actionModal.transactionCanceled.text",
    get icon() {
      return createComponent(ErrorIcon, {
        size: "m"
      });
    },
    onClose: () => props.onClose(),
    "data-tc-transaction-canceled-modal": "true"
  });
};
var TransactionSentModal = (props) => {
  return createComponent(ActionModal, {
    headerTranslationKey: "actionModal.transactionSent.header",
    textTranslationKey: "actionModal.transactionSent.text",
    get icon() {
      return createComponent(SuccessIcon, {
        size: "m"
      });
    },
    onClose: () => props.onClose(),
    "data-tc-transaction-sent-modal": "true"
  });
};
var ActionsModal = () => {
  return createComponent(Modal, {
    get opened() {
      var _a;
      return createMemo(() => action() !== null)() && ((_a = action()) == null ? void 0 : _a.openModal) === true;
    },
    onClose: () => setAction(null),
    "data-tc-actions-modal-container": "true",
    get children() {
      return createComponent(Switch, {
        get children() {
          return [createComponent(Match, {
            get when() {
              return action().name === "transaction-sent";
            },
            get children() {
              return createComponent(TransactionSentModal, {
                onClose: () => setAction(null)
              });
            }
          }), createComponent(Match, {
            get when() {
              return action().name === "transaction-canceled";
            },
            get children() {
              return createComponent(TransactionCanceledModal, {
                onClose: () => setAction(null)
              });
            }
          }), createComponent(Match, {
            get when() {
              return action().name === "confirm-transaction";
            },
            get children() {
              return createComponent(ConfirmTransactionModal, {
                onClose: () => setAction(null)
              });
            }
          })];
        }
      });
    }
  });
};
var App = (props) => {
  const translations = createI18nContext(i18nDictionary, appState.language);
  defineStylesRoot();
  fixMobileSafariActiveTransition();
  return createComponent(I18nContext.Provider, {
    value: translations,
    get children() {
      return createComponent(TonConnectUiContext.Provider, {
        get value() {
          return props.tonConnectUI;
        },
        get children() {
          return createComponent(ConnectorContext.Provider, {
            get value() {
              return appState.connector;
            },
            get children() {
              return [createComponent(GlobalStyles, {}), createComponent(ThemeProvider, {
                theme: themeState,
                get children() {
                  return [createComponent(Show, {
                    get when() {
                      return appState.buttonRootId;
                    },
                    get children() {
                      return createComponent(Portal, {
                        get mount() {
                          return document.getElementById(appState.buttonRootId);
                        },
                        get children() {
                          return createComponent(AccountButton, {});
                        }
                      });
                    }
                  }), createComponent(Dynamic, {
                    component: globalStylesTag,
                    get children() {
                      return [createComponent(WalletsModal, {}), createComponent(ActionsModal, {})];
                    }
                  })];
                }
              })];
            }
          });
        }
      });
    }
  });
};
var widgetController = {
  openWalletsModal: () => void setTimeout(() => setWalletsModalOpen(true)),
  closeWalletsModal: () => void setTimeout(() => setWalletsModalOpen(false)),
  setAction: (action2) => void setTimeout(() => setAction(action2)),
  clearAction: () => void setTimeout(() => setAction(null)),
  getSelectedWalletInfo: () => lastSelectedWalletInfo(),
  renderApp: (root, tonConnectUI2) => render(() => createComponent(App, {
    tonConnectUI: tonConnectUI2
  }), document.getElementById(root))
};
var WalletInfoStorage = class {
  constructor() {
    __publicField(this, "localStorage");
    __publicField(this, "storageKey", "ton-connect-ui_wallet-info");
    checkLocalStorageExists();
    this.localStorage = localStorage;
  }
  setWalletInfo(walletInfo) {
    this.localStorage.setItem(this.storageKey, JSON.stringify(walletInfo));
  }
  getWalletInfo() {
    const walletInfoString = this.localStorage.getItem(this.storageKey);
    if (!walletInfoString) {
      return null;
    }
    return JSON.parse(walletInfoString);
  }
  removeWalletInfo() {
    this.localStorage.removeItem(this.storageKey);
  }
};
var PreferredWalletStorage = class {
  constructor() {
    __publicField(this, "localStorage");
    __publicField(this, "storageKey", "ton-connect-ui_preferred-wallet");
    checkLocalStorageExists();
    this.localStorage = localStorage;
  }
  setPreferredWalletName(name) {
    this.localStorage.setItem(this.storageKey, name);
  }
  getPreferredWalletName() {
    return this.localStorage.getItem(this.storageKey) || void 0;
  }
};
var TonConnectUI = class {
  constructor(options) {
    __publicField(this, "walletInfoStorage", new WalletInfoStorage());
    __publicField(this, "preferredWalletStorage", new PreferredWalletStorage());
    __publicField(this, "connector");
    __publicField(this, "walletInfo", null);
    __publicField(this, "systemThemeChangeUnsubscribe", null);
    __publicField(this, "actionsConfiguration");
    __publicField(this, "walletsList");
    __publicField(this, "connectRequestParametersCallback");
    __publicField(this, "connectionRestored", Promise.resolve(false));
    if (options && "connector" in options && options.connector) {
      this.connector = options.connector;
    } else if (options && "manifestUrl" in options && options.manifestUrl) {
      this.connector = new TonConnect({ manifestUrl: options.manifestUrl });
    } else {
      throw new TonConnectUIError(
        "You have to specify a `manifestUrl` or a `connector` in the options."
      );
    }
    this.walletsList = this.getWallets();
    this.walletsList.then((list) => preloadImages(uniq(list.map((item) => item.imageUrl))));
    const rootId = this.normalizeWidgetRoot(options == null ? void 0 : options.widgetRootId);
    this.subscribeToWalletChange();
    if ((options == null ? void 0 : options.restoreConnection) !== false) {
      this.connectionRestored = new Promise((resolve) => __async(this, null, function* () {
        yield this.connector.restoreConnection();
        if (!this.connector.connected) {
          this.walletInfoStorage.removeWalletInfo();
        }
        resolve(this.connector.connected);
      }));
    }
    this.uiOptions = mergeOptions(options, { uiPreferences: { theme: "SYSTEM" } });
    const preferredWalletName = this.preferredWalletStorage.getPreferredWalletName();
    setAppState({
      connector: this.connector,
      preferredWalletName
    });
    widgetController.renderApp(rootId, this);
  }
  static getWallets() {
    return TonConnect.getWallets();
  }
  get connected() {
    return this.connector.connected;
  }
  get account() {
    return this.connector.account;
  }
  get wallet() {
    if (!this.connector.wallet || !this.walletInfo) {
      return null;
    }
    return __spreadValues(__spreadValues({}, this.connector.wallet), this.walletInfo);
  }
  set uiOptions(options) {
    var _a, _b, _c, _d, _e;
    this.checkButtonRootExist(options.buttonRootId);
    this.actionsConfiguration = options.actionsConfiguration;
    if ((_a = options.uiPreferences) == null ? void 0 : _a.theme) {
      if (((_b = options.uiPreferences) == null ? void 0 : _b.theme) !== "SYSTEM") {
        (_c = this.systemThemeChangeUnsubscribe) == null ? void 0 : _c.call(this);
        setTheme(options.uiPreferences.theme, options.uiPreferences.colorsSet);
      } else {
        setTheme(getSystemTheme(), options.uiPreferences.colorsSet);
        if (!this.systemThemeChangeUnsubscribe) {
          this.systemThemeChangeUnsubscribe = subscribeToThemeChange(setTheme);
        }
      }
    } else {
      if ((_d = options.uiPreferences) == null ? void 0 : _d.colorsSet) {
        setColors(options.uiPreferences.colorsSet);
      }
    }
    if ((_e = options.uiPreferences) == null ? void 0 : _e.borderRadius) {
      setBorderRadius(options.uiPreferences.borderRadius);
    }
    setAppState((state) => {
      var _a2;
      const merged = mergeOptions(
        __spreadValues(__spreadValues(__spreadValues({}, options.language && { language: options.language }), !!((_a2 = options.actionsConfiguration) == null ? void 0 : _a2.returnStrategy) && {
          returnStrategy: options.actionsConfiguration.returnStrategy
        }), !!options.walletsListConfiguration && {
          walletsListConfiguration: options.walletsListConfiguration
        }),
        unwrap(state)
      );
      if (options.buttonRootId !== void 0) {
        merged.buttonRootId = options.buttonRootId;
      }
      return merged;
    });
  }
  setConnectRequestParameters(connectRequestParameters) {
    var _a;
    setAppState({ connectRequestParameters });
    if ((connectRequestParameters == null ? void 0 : connectRequestParameters.state) === "ready" || !connectRequestParameters) {
      (_a = this.connectRequestParametersCallback) == null ? void 0 : _a.call(this, connectRequestParameters == null ? void 0 : connectRequestParameters.value);
    }
  }
  getWallets() {
    return __async(this, null, function* () {
      return this.connector.getWallets();
    });
  }
  onStatusChange(callback, errorsHandler) {
    return this.connector.onStatusChange((wallet) => __async(this, null, function* () {
      if (wallet) {
        const lastSelectedWalletInfo2 = yield this.getSelectedWalletInfo(wallet);
        callback(__spreadValues(__spreadValues({}, wallet), lastSelectedWalletInfo2 || this.walletInfoStorage.getWalletInfo()));
      } else {
        callback(wallet);
      }
    }), errorsHandler);
  }
  connectWallet() {
    return __async(this, null, function* () {
      const walletsList = yield this.getWallets();
      const embeddedWallet = walletsList.find(isWalletInfoCurrentlyEmbedded);
      if (embeddedWallet) {
        const connect = (parameters) => {
          setLastSelectedWalletInfo(embeddedWallet);
          this.connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey }, parameters);
        };
        const additionalRequest = appState.connectRequestParameters;
        if ((additionalRequest == null ? void 0 : additionalRequest.state) === "loading") {
          this.connectRequestParametersCallback = connect;
        } else {
          connect(additionalRequest == null ? void 0 : additionalRequest.value);
        }
      } else {
        widgetController.openWalletsModal();
      }
      return new Promise((resolve, reject) => {
        const unsubscribe = this.connector.onStatusChange((wallet) => __async(this, null, function* () {
          unsubscribe();
          if (wallet) {
            const lastSelectedWalletInfo2 = yield this.getSelectedWalletInfo(wallet);
            resolve(__spreadValues(__spreadValues({}, wallet), lastSelectedWalletInfo2 || this.walletInfoStorage.getWalletInfo()));
          } else {
            reject(new TonConnectUIError("Wallet was not connected"));
          }
        }), reject);
      });
    });
  }
  disconnect() {
    widgetController.clearAction();
    this.walletInfoStorage.removeWalletInfo();
    return this.connector.disconnect();
  }
  sendTransaction(tx, options) {
    return __async(this, null, function* () {
      if (!this.connected || !this.walletInfo) {
        throw new TonConnectUIError("Connect wallet to send a transaction.");
      }
      const { notifications: notifications2, modals, returnStrategy, skipRedirectToWallet } = this.getModalsAndNotificationsConfiguration(options);
      const userOSIsIos = getUserAgent().os === "ios";
      const shouldSkipRedirectToWallet = skipRedirectToWallet === "ios" && userOSIsIos || skipRedirectToWallet === "always";
      if ("universalLink" in this.walletInfo && this.walletInfo.openMethod === "universal-link" && !shouldSkipRedirectToWallet) {
        openLink(addReturnStrategy(this.walletInfo.universalLink, returnStrategy));
      }
      widgetController.setAction({
        name: "confirm-transaction",
        showNotification: notifications2.includes("before"),
        openModal: modals.includes("before")
      });
      try {
        const result = yield this.connector.sendTransaction(tx);
        widgetController.setAction({
          name: "transaction-sent",
          showNotification: notifications2.includes("success"),
          openModal: modals.includes("success")
        });
        return result;
      } catch (e2) {
        widgetController.setAction({
          name: "transaction-canceled",
          showNotification: notifications2.includes("error"),
          openModal: modals.includes("error")
        });
        if (e2 instanceof TonConnectError) {
          throw e2;
        } else {
          console.error(e2);
          throw new TonConnectUIError("Unhandled error:" + e2);
        }
      }
    });
  }
  subscribeToWalletChange() {
    this.connector.onStatusChange((wallet) => __async(this, null, function* () {
      var _a;
      if (wallet) {
        yield this.updateWalletInfo(wallet);
        this.setPreferredWalletName(((_a = this.walletInfo) == null ? void 0 : _a.appName) || wallet.device.appName);
      } else {
        this.walletInfoStorage.removeWalletInfo();
      }
    }));
  }
  setPreferredWalletName(value) {
    this.preferredWalletStorage.setPreferredWalletName(value);
    setAppState({ preferredWalletName: value });
  }
  getSelectedWalletInfo(wallet) {
    return __async(this, null, function* () {
      let lastSelectedWalletInfo2 = widgetController.getSelectedWalletInfo();
      if (!lastSelectedWalletInfo2) {
        return null;
      }
      let fullLastSelectedWalletInfo;
      if (!("name" in lastSelectedWalletInfo2)) {
        const walletsList = applyWalletsListConfiguration(
          yield this.walletsList,
          appState.walletsListConfiguration
        );
        const walletInfo = walletsList.find((item) => eqWalletName(item, wallet.device.appName));
        if (!walletInfo) {
          throw new TonConnectUIError(
            `Cannot find WalletInfo for the '${wallet.device.appName}' wallet`
          );
        }
        fullLastSelectedWalletInfo = __spreadValues(__spreadValues({}, walletInfo), lastSelectedWalletInfo2);
      } else {
        fullLastSelectedWalletInfo = lastSelectedWalletInfo2;
      }
      return fullLastSelectedWalletInfo;
    });
  }
  updateWalletInfo(wallet) {
    return __async(this, null, function* () {
      const selectedWalletInfo = yield this.getSelectedWalletInfo(wallet);
      if (selectedWalletInfo) {
        this.walletInfo = selectedWalletInfo;
        this.walletInfoStorage.setWalletInfo(selectedWalletInfo);
      } else {
        this.walletInfo = this.walletInfoStorage.getWalletInfo();
      }
    });
  }
  normalizeWidgetRoot(rootId) {
    if (!rootId || !document.getElementById(rootId)) {
      rootId = "tc-widget-root";
      const rootElement = document.createElement("div");
      rootElement.id = rootId;
      document.body.appendChild(rootElement);
    }
    return rootId;
  }
  checkButtonRootExist(buttonRootId2) {
    if (buttonRootId2 == null) {
      return;
    }
    if (!document.getElementById(buttonRootId2)) {
      throw new TonConnectUIError(`${buttonRootId2} element not found in the document.`);
    }
  }
  getModalsAndNotificationsConfiguration(options) {
    var _a, _b, _c, _d, _e;
    const allActions = [
      "before",
      "success",
      "error"
    ];
    let notifications2 = allActions;
    if (((_a = this.actionsConfiguration) == null ? void 0 : _a.notifications) && ((_b = this.actionsConfiguration) == null ? void 0 : _b.notifications) !== "all") {
      notifications2 = this.actionsConfiguration.notifications;
    }
    if (options == null ? void 0 : options.notifications) {
      if (options.notifications === "all") {
        notifications2 = allActions;
      } else {
        notifications2 = options.notifications;
      }
    }
    let modals = ["before"];
    if ((_c = this.actionsConfiguration) == null ? void 0 : _c.modals) {
      if (this.actionsConfiguration.modals === "all") {
        modals = allActions;
      } else {
        modals = this.actionsConfiguration.modals;
      }
    }
    if (options == null ? void 0 : options.modals) {
      if (options.modals === "all") {
        modals = allActions;
      } else {
        modals = options.modals;
      }
    }
    const returnStrategy = (options == null ? void 0 : options.returnStrategy) || ((_d = this.actionsConfiguration) == null ? void 0 : _d.returnStrategy) || "back";
    const skipRedirectToWallet = (options == null ? void 0 : options.skipRedirectToWallet) || ((_e = this.actionsConfiguration) == null ? void 0 : _e.skipRedirectToWallet) || "ios";
    return {
      notifications: notifications2,
      modals,
      returnStrategy,
      skipRedirectToWallet
    };
  }
};

// node_modules/@tonconnect/ui-react/lib/index.js
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a2, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a2, prop, b[prop]);
    }
  return a2;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var jsxRuntime = { exports: {} };
var reactJsxRuntime_development = {};
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development)
    return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (true) {
    (function() {
      var React = import_react.default;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign2 = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign2({}, props, {
                value: prevLog
              }),
              info: assign2({}, props, {
                value: prevInfo
              }),
              warn: assign2({}, props, {
                value: prevWarn
              }),
              error: assign2({}, props, {
                value: prevError
              }),
              group: assign2({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign2({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign2({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s2 = sampleLines.length - 1;
            var c2 = controlLines.length - 1;
            while (s2 >= 1 && c2 >= 0 && sampleLines[s2] !== controlLines[c2]) {
              c2--;
            }
            for (; s2 >= 1 && c2 >= 0; s2--, c2--) {
              if (sampleLines[s2] !== controlLines[c2]) {
                if (s2 !== 1 || c2 !== 1) {
                  do {
                    s2--;
                    c2--;
                    if (c2 < 0 || sampleLines[s2] !== controlLines[c2]) {
                      var _frame = "\n" + sampleLines[s2].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s2 >= 1 && c2 >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a2) {
        return isArrayImpl(a2);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e2) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self2) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self2
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self2) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self2);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i2 = 0; i2 < node.length; i2++) {
              var child = node[i2];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === void 0 || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i2 = 0; i2 < keys.length; i2++) {
            var key = keys[i2];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self2);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children2 = props.children;
            if (children2 !== void 0) {
              if (isStaticChildren) {
                if (isArray(children2)) {
                  for (var i2 = 0; i2 < children2.length; i2++) {
                    validateChildKeys(children2[i2], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children2);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children2, type);
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx2 = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx2;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
(function(module) {
  if (false) {
    module.exports = requireReactJsxRuntime_production_min();
  } else {
    module.exports = requireReactJsxRuntime_development();
  }
})(jsxRuntime);
var jsx = jsxRuntime.exports.jsx;
function isClientSide() {
  return typeof window !== "undefined";
}
function isServerSide() {
  return !isClientSide();
}
var TonConnectUIContext = (0, import_react.createContext)(null);
var tonConnectUI = null;
var TonConnectUIProvider = (_a) => {
  var _b = _a, {
    children: children2
  } = _b, options = __objRest(_b, [
    "children"
  ]);
  if (isClientSide() && !tonConnectUI) {
    tonConnectUI = new TonConnectUI(options);
  }
  return jsx(TonConnectUIContext.Provider, { value: tonConnectUI, children: children2 });
};
var TonConnectUIProvider$1 = (0, import_react.memo)(TonConnectUIProvider);
var TonConnectUIReactError = class _TonConnectUIReactError extends TonConnectUIError {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _TonConnectUIReactError.prototype);
  }
};
var TonConnectProviderNotSetError = class _TonConnectProviderNotSetError extends TonConnectUIReactError {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _TonConnectProviderNotSetError.prototype);
  }
};
function checkProvider(provider) {
  if (!provider) {
    throw new TonConnectProviderNotSetError(
      "You should add <TonConnectUIProvider> on the top of the app to use TonConnect"
    );
  }
  return true;
}
function useTonConnectUI() {
  const tonConnectUI2 = (0, import_react.useContext)(TonConnectUIContext);
  const setOptions = (0, import_react.useCallback)(
    (options) => {
      if (tonConnectUI2) {
        tonConnectUI2.uiOptions = options;
      }
    },
    [tonConnectUI2]
  );
  if (isServerSide()) {
    return [null, () => {
    }];
  }
  checkProvider(tonConnectUI2);
  return [tonConnectUI2, setOptions];
}
var buttonRootId = "ton-connect-button";
var TonConnectButton = ({ className: className2, style: style2 }) => {
  const [_, setOptions] = useTonConnectUI();
  (0, import_react.useEffect)(() => {
    setOptions({ buttonRootId });
    return () => setOptions({ buttonRootId: null });
  }, [setOptions]);
  return jsx(
    "div",
    {
      id: buttonRootId,
      className: className2,
      style: __spreadValues2({ width: "fit-content" }, style2)
    }
  );
};
var TonConnectButton$1 = (0, import_react.memo)(TonConnectButton);
function useTonWallet() {
  const [tonConnectUI2] = useTonConnectUI();
  const [wallet, setWallet] = (0, import_react.useState)(
    (tonConnectUI2 == null ? void 0 : tonConnectUI2.wallet) || null
  );
  (0, import_react.useEffect)(() => {
    if (tonConnectUI2) {
      return tonConnectUI2.onStatusChange((value) => {
        setWallet(value);
      });
    }
  }, [tonConnectUI2]);
  return wallet;
}
function useTonAddress(userFriendly = true) {
  const wallet = useTonWallet();
  if (wallet) {
    return userFriendly ? toUserFriendlyAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET) : wallet.account.address;
  } else {
    return "";
  }
}
function useIsConnectionRestored() {
  const [restored, setRestored] = (0, import_react.useState)(false);
  const [tonConnectUI2] = useTonConnectUI();
  (0, import_react.useEffect)(() => {
    if (tonConnectUI2) {
      tonConnectUI2.connectionRestored.then(() => setRestored(true));
    }
  }, [tonConnectUI2]);
  return restored;
}
export {
  BadRequestError,
  CHAIN,
  CONNECT_ITEM_ERROR_CODES,
  FetchWalletsError,
  LocalstorageNotFoundError,
  ParseHexError,
  THEME,
  TonConnect,
  TonConnectButton$1 as TonConnectButton,
  TonConnectError,
  TonConnectProviderNotSetError,
  TonConnectUI,
  TonConnectUIContext,
  TonConnectUIError,
  TonConnectUIProvider$1 as TonConnectUIProvider,
  TonConnectUIReactError,
  UnknownAppError,
  UnknownError,
  UserRejectsError,
  WalletAlreadyConnectedError,
  WalletNotConnectedError,
  WalletNotInjectedError,
  WalletsListManager,
  WrongAddressError,
  isTelegramUrl,
  isWalletInfoCurrentlyEmbedded,
  isWalletInfoCurrentlyInjected,
  isWalletInfoInjectable,
  isWalletInfoInjected,
  isWalletInfoRemote,
  toUserFriendlyAddress,
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
  useTonWallet
};
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

@tonconnect/sdk/lib/esm/index.mjs:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@tonconnect/ui/lib/index.js:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

@tonconnect/ui-react/lib/index.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@tonconnect/ui-react/lib/index.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@tonconnect_ui-react.js.map
