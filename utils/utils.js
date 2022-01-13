const fs = require("fs");

const parserClients = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};
const addClient = (usersData, path) => {
  fs.writeFileSync(path, JSON.stringify(usersData));
}


//console.log(parserClients());

module.exports = { addClient, parserClients};


