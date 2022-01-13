const express = require("express");

const app = express();

const getUser = (req, res) => {
  res.send("ok");
};

const addUser = (req, res) => {
  res.send("ok");
};

const editUser = (req, res) => {
  res.send("ok");
};

const deleteUser = (req, res) => {
  res.send("ok");
};

const getAllUsers = (req, res) => {
  res.send("ok");
};

module.exports = { getUser, addUser, editUser, deleteUser, getAllUsers };
