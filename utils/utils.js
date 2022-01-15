const fs = require("fs");

const parserClients = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};
// const addClient = (usersData, path) => {
//   fs.writeFileSync(path, JSON.stringify(usersData));
// }
const updateDataBase = (usersData, path) => {
  fs.writeFileSync(path, JSON.stringify(usersData));
}


module.exports = {parserClients, updateDataBase}

//module.exports = {parserClients, addClient, deleteClient};


