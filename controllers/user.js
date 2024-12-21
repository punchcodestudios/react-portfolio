const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");
const { WebToken } = require("../models/webtoken");
const errorHandler = require("../middleware/handleError.js");
const ms = require("ms");

const {
  encodePassword,
  validatePassword,
  generateConfirmCode,
} = require("../utils/auth-utils.js");

const { UserStatus, UserRoles } = require("../utils/constants.js");

const { getTimeZoneDate } = require("../utils/date-utils");

const signUp = errorHandler(async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) {
    console.log("ERROR: ", error);
    next(createError(401, "Invalid Data"));
  }

  const userAlreadyExists = await User.findOne({ email: req.body.email });
  if (userAlreadyExists) {
    return next(createError(422, "an account with that email already exists"));
  }

  const encoded = await encodePassword(req.body.password);
  const confirmCode = await generateConfirmCode(6);
  let user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: encoded,
    roles: [UserRoles.USER],
    confirmCode: confirmCode,
    status: UserStatus.INITIAL,
  });

  const response = await user.save();
  req.data = [response];
  req.meta = {};
  return next();
});

const login = errorHandler(async (req, res, next) => {
  console.log("login data: ", req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return next(createError(422, "Missing information."));
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    return next(createError(401, "Invalid username or password"));
  }

  const passwordsMatch = await validatePassword(password, user.password);
  if (!passwordsMatch) {
    return next(createError(401, "Invalid username or password"));
  }

  req.data = [
    {
      _id: user._id,
      email: user.email,
      roles: user.roles,
      status: user.status,
      username: user.username,
    },
  ];
  return next();
});

const logout = errorHandler(async (req, res, next) => {
  try {
    const data = req.data;
    const meta = {
      success: true,
      token: "",
      expiresAt: "",
      timetolive: "",
      isAuthenticated: false,
    };
    req.data = [data];
    req.meta = meta;
    return next();
  } catch (error) {
    return next(createError(418, error));
  }
});

const confirm = errorHandler(async (req, res, next) => {
  console.log(
    `confirm.request: ${req.body.username} | ${req.body.confirmationCode}`
  );
  const { username, confirmationCode } = req.body;

  const user = await User.findOneAndUpdate(
    { username: username, confirmCode: confirmationCode },
    { status: UserStatus.CONFIRMED, confirmCode: "" }
  ).select(["-password", "-name", "-confirmCode"]);

  if (!user) {
    return next(createError(401, "Invalid credentials."));
  }
  req.data = [user];
  return next();
});

const resetPassword = errorHandler(async (req, res, next) => {});

module.exports = {
  signUp,
  login,
  logout,
  confirm,
  resetPassword,
};
