const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "userToken.json"
);
const getuser1 = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
module.exports = class user {
  constructor(user, token) {}
  save() {
    getuser((usre) => {
      usre.push(this);
      fs.writeFile(p, JSON.stringify(usre), (err) => {
        console.log(err);
      });
    });
  }

  static checkuser(u, t, cb) {
    const a = [];

    getuser1((users) => {
      users.forEach((element) => {
        if (element.userId == u && element.token == t) a.push(element);
      });

      cb(a);
    });
  }
};
