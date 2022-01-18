const fs = require("fs");

const parserClients = (path) => JSON.parse(fs.readFileSync(path, "utf-8"));

// const addClient = (usersData, path) => {
//   fs.writeFileSync(path, JSON.stringify(usersData));
// }
const updateDataBase = (usersData, path) => {
  fs.writeFileSync(path, JSON.stringify(usersData));
}


// this is a better to use { } in a functions that shouldnt return something because it make more sence and it clearer



module.exports = {parserClients, updateDataBase}

//module.exports = {parserClients, addClient, deleteClient};


