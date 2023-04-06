const fs = require("fs");
const path = require("path");
const { query } = require("express");
const { generatePrime } = require("crypto");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "movieList.json"
);
const genreLits = path.join(
  path.dirname(require.main.filename),
  "data",
  "genreList.json"
);
const video = path.join(
  path.dirname(require.main.filename),
  "data",
  "VideoList.json"
);

const getgenreFromFile = (cb) => {
  fs.readFile(genreLits, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
const getmovesFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
const getvideoFromFile = (cb) => {
  fs.readFile(video, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
module.exports = class move {
  save() {
    this.id = Math.random().toString();
    getmovesFromFile((moves) => {
      moves.push(this);
      fs.writeFile(p, JSON.stringify(moves), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getmovesFromFile(cb);
  }

  static findById(id, cb) {
    getmovesFromFile((moves) => {
      const move = moves.find((p) => p.id === id);
      cb(move);
    });
  }
  static trending(cb) {
    getmovesFromFile((moves) => {
      const movieList = moves.sort((m1, m2) => m2.popularity - m1.popularity);
      cb(movieList);
    });
  }
  static rating(cb) {
    getmovesFromFile((moves) => {
      const movieList1 = moves.sort(
        (m1, m2) => m2.vote_average - m1.vote_average
      );

      cb(movieList1);
    });
  }
  static dis(gene, cb) {
    const n = [];
    const genre = [];

    getgenreFromFile((genreid) => {
      genreid.forEach((e) => {
        if (e.id == gene) return genre.push(e.name);
      });
    });
    getmovesFromFile((moves) => {
      const move = moves.forEach((e) => {
        e.genre_ids.forEach((element, i) => {
          if (element == gene) return n.push(e);
        });
      });
      cb(n, genre);
    });

    // console.log(genre);
  }
  static trailer(id, cb) {
    console.log(id);
    getvideoFromFile((moves) => {
      const n = [];
      const m = [];
      const trailervideo = moves.find((video) => video.id == id);
      if (!trailervideo) return cb([]);
      const videoList = trailervideo.videos;
      const a = videoList.filter((video) => {
        return (
          video.official == true &&
          video.site == "YouTube" &&
          (video.type == "Trailer" || video.type == "Teaser")
        );
      });
      a.sort(
        (video1, video2) =>
          new Date(video2.published_at).getTime() -
          new Date(video1.published_at).getTime()
      );

      cb(a[0]);
    });
  }
  static sreach(keywork, genre, mediaType, year, language, cb) {
    console.log(keywork, genre, mediaType, year, language);
    let idgen = 1;
    genre &&
      getgenreFromFile((gens) => {
        gens.forEach((gen) => {
          if (gen.name.toLowerCase().includes(genre.toLowerCase()) == true)
            idgen = gen.id;
        });
        console.log(idgen);
      });
    getmovesFromFile((moves) => {
      const movies = moves.filter(
        (video) =>
          ((video.title &&
            video.title.toLowerCase().includes(keywork.toLowerCase())) ||
            (video.overview &&
              video.overview.toLowerCase().includes(keywork.toLowerCase()))) &&
          (video.media_type === mediaType ||
            mediaType === "All" ||
            !mediaType) &&
          (!year ||
            (video.release_date && video.release_date.includes(year)) ||
            (video.first_air_date && video.first_air_date.includes(year))) &&
          (!language || video.original_language.includes(language)) &&
          (!genre || video.genre_ids.includes(idgen))
      );
      // console.log(n);
      cb(movies);
    });
  }
};

// moves.sort((m1, m2) => m2.popularity - m1.popularity);
