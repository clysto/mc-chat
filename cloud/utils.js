const crypto = require('crypto');

const AK = process.env['QINIU_AK'];
const SK = process.env['QINIU_SK'];
const ROOM_NAME = process.env['ROOM_NAME'];

function base64ToUrlSafe(v) {
  return v.replace(/\//g, '_').replace(/\+/g, '-');
}

function urlsafeBase64Encode(jsonFlags) {
  const encoded = Buffer.from(jsonFlags).toString('base64');
  return base64ToUrlSafe(encoded);
}

function hmacSha1(encodedFlags, secretKey) {
  const hmac = crypto.createHmac('sha1', secretKey);
  hmac.update(encodedFlags);
  return hmac.digest('base64');
}

/**
 * 生成七牛云RTC roomToken
 * @param {String} userId 用户ID
 * @param {Date} expireAt 过期时间
 */
function genRoomToken(userId, expireAt) {
  const roomAccess = {
    appId: process.env['QINIU_RTC_APPID'],
    roomName: ROOM_NAME,
    userId: userId,
    expireAt: Math.floor(expireAt / 1000),
    permission: 'user',
  };
  const str = JSON.stringify(roomAccess);
  const encodedStr = urlsafeBase64Encode(str);
  const sign = hmacSha1(encodedStr, SK);
  const encodedSign = base64ToUrlSafe(sign);

  const token = AK + ':' + encodedSign + ':' + encodedStr;
  return token;
}

module.exports = {
  base64ToUrlSafe,
  urlsafeBase64Encode,
  hmacSha1,
  genRoomToken,
};
