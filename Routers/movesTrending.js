const path = require("path");

const express = require("express");

const mvTrendController = require("../Controller/movesTrending");
const error = require("../Controller/error");
const router = express.Router();

// /admin/add-product => GET
router.get("/api/movies/trending", mvTrendController.trending);
router.get("/api/movies/top_rated", mvTrendController.ratetop);
router.get("/api/movies/discover/:genre", mvTrendController.discover);
router.get("/api/movies/discover", mvTrendController.discover);
router.get("/api/movies/video/:id", mvTrendController.trailer);
router.get("/api/movies/search", mvTrendController.sreach);
router.get("/api/movies/All", mvTrendController.All);
router.get(error.get404);
module.exports = router;
