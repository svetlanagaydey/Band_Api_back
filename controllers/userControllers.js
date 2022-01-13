const express = require("express");
const { parserClients, addClient } = require("../utils/utils");


const app = express();
const path = "./json/data.json";

const getAllUsers = (req, res) => {
  res.send(parserClients(path));
};

const getUser = (req, res) => {
  res.send('not yet');
};

const addUser = (req, res) => {
  const usersData = parserClients(path);
  const { id, cash, credit } = req.body;
  const data = { id, cash, credit };
  usersData.users.push(data);
  addClient(usersData, path);
  res.send(`User has been added`);
};

const editUser = (req, res) => {
  res.send("ok");
};

const deleteUser = (req, res) => {
  res.send("ok");
};

module.exports = { getUser, addUser, editUser, deleteUser, getAllUsers };
