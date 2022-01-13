const fs = require("fs");

const parserClients = () => {
  return JSON.parse(fs.readFileSync("../json/data.json", "utf-8"));
};

console.log(parserClients());
module.exports = parserClients;
