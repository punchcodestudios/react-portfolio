const jwt = require("jsonwebtoken");
const { WebToken } = require("../models/webtoken");
const dev = process.env.NODE_ENV === "development";
const { REFRESH_TOKEN_SECRET } = process.env;
const config = require("config");
const bcrypt = require("bcrypt");

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

const encodePassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateConfirmCode = async (digits) => {
  let array = [];
  for (i = 0; i < digits; i++) {
    array.push(Math.floor(Math.random() * 10));
  }
  const code = +array.join("");
  return code;
};

module.exports = {
  generateJWT,
  clearTokens,
  getAccessTokenTTL,
  getRefreshTokenTTL,
  persistRefreshToken,
  encodePassword,
  validatePassword,
  generateConfirmCode,
};
