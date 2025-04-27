const helmet = require("helmet");
const contentSecurityPolicy = require("helmet-csp");
const compression = require("compression");

module.exports = function (app) {
  app.use(helmet());
  app.use(
    contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "api.rawg.io"],
        imgSrc: ["'self'", "media.rawg.io"],
        scriptSrc: [
          "'self'",
          "http://localhost:3000",
          "localhost:3000",
          "localhost",
          "https://www.punchcodestudios.com",
          "www.punchcodestudios.com",
          "punchcodestudios.com",
        ],
      },
    })
  );
  app.use(compression());
};
