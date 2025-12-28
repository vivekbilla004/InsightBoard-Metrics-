const crypto = require("crypto");

module.exports = () => {
  return crypto.randomBytes(6).toString("hex"); // e.g. a9f3c2d4e1
};
