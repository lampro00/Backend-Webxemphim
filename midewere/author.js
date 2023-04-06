const auth = require("../models/author");
module.exports.authors = (req, res, next) => {
  const user = req.query.userId;
  const token = req.query.token;
  let a = true;
  auth.checkuser(user, token, (usre) => {
    console.log(usre.length);
    if (usre.length == 0) {
      a = false;
      res.status(401).send(JSON.stringify({ message: "Unauthorized" }));
    }
  });
  if (a) return next();
};
