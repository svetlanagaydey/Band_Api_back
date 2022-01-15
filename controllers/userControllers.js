const express = require("express");
const { parserClients, addClient, deleteClient  } = require("../utils/utils");
const app = express();
const path = "./json/data.json";
const usersData = parserClients(path);

const getAllUsers = (req, res) => {
  res.send(parserClients(path));
};

const getUser = (req, res) => {
  if (ifExistUser(req.body.id)) {
    res.send(ifExistUser(req.body.id));
  } else {
    res.send('It is no user with id: ' + req.body.id);
  }
};

const addUser = (req, res) => {
  const data = { "id":req.body.id, "balance":0, "credit":0 };
  if (ifExistUser(req.body.id)) {
    res.send('The user id: ' + req.body.id + 'exist in database.')
  } else {
    usersData.users.push(data);
    addClient(usersData, path);
    res.send(usersData);
  }
};

const deleteUser = (req, res) => {
  if (!ifExistUser(req.body.id)) {
    res.send('It is now user with id: ' + req.body.id)
  } else {
    const updatedUsers = usersData.users.filter((el) => { return el.id !== req.body.id});
    deleteClient(updatedUsers, path);
    res.send(updatedUsers);
  }
};

const editUser = (req, res) => {
  if (!ifExistUser(req.body.id)) {
    res.send('Can not find id: ' + req.body.id)
  } else {
    // const currentUser = usersData.users.find((client) => { return client.id == req.body.id});
    // currentUser.balance = req.body.balance;
    // res.send(currentUser);
  }
};

const ifExistUser = (id) => {
  const currentUser = usersData.users.find((client) => { return client.id == id});
  return currentUser // return object 
}

module.exports = { getAllUsers, getUser, addUser, deleteUser, editUser};
