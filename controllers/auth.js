const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../models/user");

const {
  clearTokens,
  generateJWT,
  getAccessTokenTTL,
} = require("../utils/auth");

const { getTimeZoneDate } = require("../utils/date-utils");
const { isAuthenticated } = require("../middleware/auth");

const signUp = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const userAlreadyExists = await User.findOne({ email: req.body.email });

    if (userAlreadyExists) {
      return res.status(422).json({
        error: `Username: ${req.body.username} or email: ${req.body.email} already exists`,
      });
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
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(422).json({
        error: "Please fill all the required fields",
      });
    }

    // const user = users.find((user) => {
    //   if (user.username === username || user.email === username) {
    //     return true;
    //   }
    //   return false;
    // });

    const user = await User.findOne({ username: username });
    console.log(user);
    // console.log("user: ", user);
    if (!user) {
      const error = createError.Unauthorized("Invalid username or password");
      throw error;
    }
    const passwordsMatch = user.password === password;
    if (!passwordsMatch) {
      const error = createError.Unauthorized("Invalid username or password");
      throw error;
    }

    req.userId = user.id;
    return next();
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  await clearTokens(req, res, next);
  return res.sendStatus(204);
};

const refreshAccessToken = async (req, res, next) => {
  const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE } =
    process.env;
  const { signedCookies } = req;
  const { refreshToken } = signedCookies;

  if (!refreshToken) {
    return res.sendStatus(401).json({ error: "No refresh token found." });
  }

  try {
    // TODO look into putting these into database
    // const refreshTokenInDB = tokens.find(
    //   (token) => token.refreshToken === refreshToken
    // );

    // if (!refreshTokenInDB) {
    //   await clearTokens(req, res, next);
    //   const error = createError.Unauthorized();
    //   throw error;
    // }

    try {
      const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const { userId } = decodedToken;
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

      return res.status(200).json({
        user,
        accessToken,
        expiresAt: getAccessTokenTTL(),
      });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signUp,
  login,
  logout,
  refreshAccessToken,
};
