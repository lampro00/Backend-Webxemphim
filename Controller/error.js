const { json } = require("body-parser");

module.exports.get404 = (req, res, next) => {
  res.status(404).send(JSON.stringify("Page Not Found"));
};
