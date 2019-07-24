var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fallback = require("express-history-api-fallback");
var fs = require("fs");
var axios = require("axios");

var app = express();
app.use(bodyParser.json());
app.get("/api/getwords", function(req, res) {
  const wordData = fs.readFileSync(`server/data/${req.query.type}.txt`, "utf8");
  const rawWords = wordData.split("\n");

  const starData = fs.readFileSync("server/data/stars.json", "utf8");
  const starObject = JSON.parse(starData);

  const words = [];
  for (let i = 0; i < Math.ceil(rawWords.length / 2); i++) {
    const word = rawWords[i * 2];
    const meaning = rawWords[i * 2 + 1];
    words.push({
      word,
      meaning,
      star: !!starObject[word] ? starObject[word] : -1
    });
  }
  return res.status(200).json({ data: words });
});

app.post("/api/poststar", function(req, res) {
  const data = fs.readFileSync("server/data/stars.json", "utf8");
  const starData = JSON.parse(data);
  starData[req.body.word] = req.body.star;
  fs.writeFileSync("server/data/stars.json", JSON.stringify(starData));
  return res.status(200).json({ status: "success" });
});

app.get("/api/get_data_list", function(req, res) {
  fs.readdir("server/data", function(err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files = files
      .filter(function(file) {
        return file.split(".").splice(-1)[0] === "txt";
      })
      .map(function(file) {
        return file;
      });
    return res.status(200).json({ status: "success", payload: files });
  });
});

app.get("/api/override_from_server", async function(req, res) {
  const baseUrl = "https://flash-card-exit.herokuapp.com";
  const textData = await axios.get(`${baseUrl}/stars.json`);
  fs.writeFileSync("server/data/stars1.json", JSON.stringify(textData.data));
  return res.status(200).json({ status: "success" });
});

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static(path.join(__dirname, "../server/data")));
app.use(fallback("../build/index.html", { root: __dirname }));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

var listener = app.listen(process.env.PORT, function() {
  console.log("Listening on port " + listener.address().port); //Listening on port 8888
});

module.exports = app;
