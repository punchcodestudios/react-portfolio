const jwt = require("jsonwebtoken");
const { WebToken } = require("../models/webtoken");
const dev = process.env.NODE_ENV === "development";
const { REFRESH_TOKEN_SECRET } = process.env;

const generateJWT = (userId, secret, expirationTime) => {
  return jwt.sign({ userId }, secret, { expiresIn: expirationTime });
};

const clearTokens = async (req, res) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    await WebToken.findOneAndDelete({ token: refreshToken });
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: !dev,
    signed: true,
  });
};

const getAccessTokenTTL = (req, res) => {
  return process.env.ACCESS_TOKEN_LIFE * 60 * 1000 - 10 * 1000;
};

const getRefreshTokenTTL = () => {
  return process.env.REFRESH_TOKEN_LIFE * 60 * 1000 - 10 * 1000;
};

const persistRefreshToken = async (token) => {
  const { userId, expiresAt } = jwt.verify(token, REFRESH_TOKEN_SECRET);
  const persist = new WebToken({
    name: "refresh",
    userId: userId,
    token: token,
    expiresAt: expiresAt,
  });
  console.log("persist: ", persist);
  await WebToken.findOneAndDelete({ userId: userId });
  return await persist.save();
};

module.exports = {
  generateJWT,
  clearTokens,
  getAccessTokenTTL,
  getRefreshTokenTTL,
  persistRefreshToken,
};
