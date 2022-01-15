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
    //console.log(el.id);
    const result = usersData.users.filter((el) => { 
      console.log(el.id);
      console.log(req.body.id);
      console.log(el.id === req.body.id)
      return el.id !== req.body.id
    });
    const resObj = {"users": result};
    console.log(usersData)
    deleteClient(resObj, path);
    res.send(result);
  }
};

const editing = (req, res) => {

  //res.sendStatus(req.body.balance);
  res.send(req.body.id);
    // const currentUser = usersData.users.find((client) => { return client.id == req.body.id});
    
};

const ifExistUser = (id) => {
  const currentUser = usersData.users.find((client) => { return client.id === id});
  return currentUser // return object 
}

module.exports = { getAllUsers, getUser, addUser, deleteUser, editing};
