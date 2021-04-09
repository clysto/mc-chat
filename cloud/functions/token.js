const AV = require('leanengine');
const { genRoomToken } = require('../utils');

AV.Cloud.define('token', function (request) {
  if (!request.currentUser) {
    throw new AV.Cloud.Error('未登录');
  }
  const user = request.currentUser;
  const expireAt = new Date(Date.now() + 1 * 3600 * 24 * 1000);
  const token = genRoomToken(user.id, expireAt);
  return { token, expireAt };
});
