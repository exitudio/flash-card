var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
app.use(bodyParser.json());
app.get("/api/getwords", function(req, res) {
  const wordData = fs.readFileSync("server/words.txt", "utf8");
  const rawWords = wordData.split("\n");

  const starData = fs.readFileSync("server/stars.json", "utf8");
  const starObject = JSON.parse(starData);

  const words = [];
  for (let i = 0; i < Math.ceil(rawWords.length / 2); i++) {
    const word = rawWords[i * 2];
    const meaning = rawWords[i * 2 + 1];
    words.push({
      word,
      meaning,
      star: !!starObject[word] ? starObject[word]: -1
    });
  }
  return res.status(200).json({ data: words });
});

app.post("/api/poststar", function(req, res) {
  const data = fs.readFileSync("server/stars.json", "utf8");
  const starData = JSON.parse(data);
  starData[req.body.word] = req.body.star;
  fs.writeFileSync("server/stars.json", JSON.stringify(starData));
  return res.status(200).json({ status: "success" });
});

var listener = app.listen(4001, function() {
  console.log("Listening on port " + listener.address().port); //Listening on port 8888
});

module.exports = app;
