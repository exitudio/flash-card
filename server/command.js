var fs = require("fs");
var axios = require("axios");

async function overrideServer() {
  const baseUrl = "https://flash-card-exit.herokuapp.com";
  const textData = await axios.get(`${baseUrl}/stars.json`);
  fs.writeFileSync("server/data/stars1.json", JSON.stringify(textData.data));
}
overrideServer();

