const Movie = require("../models/moveTrending");
const retunPerPage = (moveList, req, genName, message) => {
  const listLeng = moveList.length;
  let page = req.params.page || 1;
  total_pages = Math.ceil(listLeng / 20);
  const results = moveList.filter(
    (m, i) => (page - 1) * 20 <= i && i < 20 * page
  );
  // console.log(genName.length);
  if (moveList.length != 0)
    return { results, page, total_pages, genre_name: genName };
  return message.message; // lay 20 phan tu dau tien
};
module.exports.All = (req, res) => {
  Movie.fetchAll((movieList) =>
    res.status(200).send(retunPerPage(movieList, req))
  );
};

module.exports.trending = (req, res) => {
  Movie.trending((movieList) => {
    res.status(200).send(retunPerPage(movieList, req));
  });
};
module.exports.ratetop = (req, res) => {
  Movie.rating((movieList) => {
    res.status(200).send(retunPerPage(movieList, req));
  });
};
module.exports.discover = (req, res) => {
  const genre = parseInt(req.params.genre);

  if (!genre) return res.status(404).send("Not found gerne parram");
  Movie.dis(genre, (movieList, genre_name) => {
    // console.log(genre_name);
    const message = "";
    if (genre_name.length == 0) {
      //   console.log("ok");
      return res.status(400).send(
        retunPerPage(movieList, req, genre_name, {
          message: "Not found that gerne id",
        })
      );
    } else
      return res.status(200).send(
        retunPerPage(movieList, req, genre_name, {
          message: "ok",
        })
      );
  });
};
module.exports.trailer = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(404).send("Not found gerne parram");

  Movie.trailer(id, (movieList) => {
    if (movieList.length == 0)
      res.status(400).send({ message: "Not found video" });
    else res.status(200).send(movieList);
  });
};
module.exports.sreach = (req, res) => {
  const keywork = req.query.keywork;
  const genre = req.query.genre;
  const mediaType = req.query.mediaType;
  const year = req.query.year;
  const language = req.query.language;
  console.log(keywork);
  if (!keywork) return res.status(404).send("Not found keywork");
  Movie.sreach(keywork, genre, mediaType, year, language, (movieList) => {
    if (movieList && movieList.length == 0)
      res.status(200).send(JSON.stringify("Not found moves"));
    else res.status(200).send(movieList);
  });
};
