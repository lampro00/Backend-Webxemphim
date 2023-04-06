const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const errorController = require("./Controller/error");
const moveTrend = require("./Routers/movesTrending");
const users = require("./midewere/author");
const cors = require("cors");
const { move } = require("./Routers/movesTrending");
const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
const port = 5000;
app.use(cors({ corsOptions }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(users.authors);
app.use(moveTrend);
app.use(errorController.get404);

app.listen(port, () => console.log(`đang chạy ${port}`));
