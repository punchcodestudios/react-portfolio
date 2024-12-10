const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");
const { WebToken } = require("../models/webtoken");
const errorHandler = require("../middleware/handleError.js");
const ms = require("ms");

const {
  clearTokens,
  generateJWT,
  getAccessTokenTTL,
} = require("../utils/auth");

const { getTimeZoneDate } = require("../utils/date-utils");

const signUp = errorHandler(async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return next(createError(401, "Invalid Data"));

  const userAlreadyExists = await User.findOne({ email: req.body.email });
  if (userAlreadyExists) {
    return next(createError(422, "an account with that email already exists"));
  }

  let user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
    confirmCode: 1234,
    confirmed: false,
  });

  user = await user.save();

  req.userId = user.id;
  return next();
});

const login = errorHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(createError(422, "Missing information."));
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    return next(createError(401, "Invalid username or password"));
  }

  const passwordsMatch = user.password === password;
  if (!passwordsMatch) {
    return next(createError(401, "Invalid username or password"));
  }

  req.userId = user.id;
  return next();
});

const logout = errorHandler(async (req, res, next) => {
  await clearTokens(req, res, next);
  return res.sendStatus(204);
});

const refreshAccessToken = errorHandler(async (req, res, next) => {
  // console.log("auth refresh", req.signedCookies);
  const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE } =
    process.env;
  const { signedCookies } = req;
  const { refreshToken } = signedCookies ?? null;

  if (!refreshToken) {
    return next(createError(401, "No refresh token found."));
  }

  const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  const { userId } = decodedToken;

  // if (!refreshTokenInDB) {
  //   await clearTokens(req, res, next);
  //   const error = createError.Unauthorized();
  //   throw error;
  // }

  const user = await User.findById(userId);
  // if (!user) {
  //   await clearTokens(req, res);
  //   return res.status(422).json({
  //     error: "Invalid Credentials",
  //   });
  // }

  const accessToken = generateJWT(
    user.id,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE
  );

  // return res.status(200).json({
  //   user,
  //   accessToken,
  //   expiresAt: getAccessTokenTTL(),
  //   isAuthenticated: true,
  // });

  const userAuth = {
    token: accessToken,
    expiresAt: getTimeZoneDate(new Date(Date.now() + ms(ACCESS_TOKEN_LIFE))),
    timetolive: getAccessTokenTTL(),
  };

  return res.status(200).json({
    user,
    isAuthenticated: true,
    userAuth,
  });
});

module.exports = {
  signUp,
  login,
  logout,
  refreshAccessToken,
};
