const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const binaryToBase64 = binary => {
  let ret = [];
  let i = 0;
  let j = 0;
  const charArray3 = new Array(3);
  const charArray4 = new Array(4);
  let inLen = binary.length;
  let pos = 0;

  while (inLen--) {
    charArray3[i++] = binary[pos++];
    if (i === 3) {
      charArray4[0] = (charArray3[0] & 0xfc) >> 2;
      charArray4[1] = ((charArray3[0] & 0x03) << 4) + ((charArray3[1] & 0xf0) >> 4);
      charArray4[2] = ((charArray3[1] & 0x0f) << 2) + ((charArray3[2] & 0xc0) >> 6);
      charArray4[3] = charArray3[2] & 0x3f;

      for (i = 0; i < 4; i++) {
        ret += base64Chars.charAt(charArray4[i]);
      }
      i = 0;
    }
  }

  if (i) {
    for (j = i; j < 3; j++) {
      charArray3[j] = 0;
    }

    charArray4[0] = (charArray3[0] & 0xfc) >> 2;
    charArray4[1] = ((charArray3[0] & 0x03) << 4) + ((charArray3[1] & 0xf0) >> 4);
    charArray4[2] = ((charArray3[1] & 0x0f) << 2) + ((charArray3[2] & 0xc0) >> 6);
    charArray4[3] = charArray3[2] & 0x3f;

    for (j = 0; j < i + 1; j++) {
      ret += base64Chars.charAt(charArray4[j]);
    }

    while (i++ < 3) {
      ret += '=';
    }
  }

  return ret;
};

module.exports = hex => {
  const binary = [];
  for (let i = 0; i < hex.length / 2; i++) {
    const h = hex.substr(i * 2, 2);
    binary[i] = parseInt(h, 16);
  }
  return binaryToBase64(binary);
};