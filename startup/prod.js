const helmet = require("helmet");
const contentSecurityPolicy = require("helmet-csp");
const compression = require("compression");

module.exports = function (app) {
  app.use(helmet());
  app.use(
    contentSecurityPolicy({
      directives: {
        connectSrc: ["self", "https://api.rawg.io/api/*"],
      },
    })
  );
  app.use(compression());
};
