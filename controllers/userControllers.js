const express = require("express");
const { parserClients, updateDataBase  } = require("../utils/utils");
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
  const data = { "id":req.body.id, "cash":0, "credit":0 };
  if (ifExistUser(req.body.id)) {
    res.send('The user id: ' + req.body.id + 'exist in database.')
  } else {
    usersData.users.push(data);
    updateDataBase(usersData, path);
    res.send(usersData);
  }
};

const deleteUser = (req, res) => {
  if (!ifExistUser(req.body.id)) {
    res.send("User " + req.body.id + " is not exist");
  } else {
    //console.log(el.id);
    const result = usersData.users.filter((el) => { 
      return el.id !== req.body.id
    });
    const resObj = {"users": result};
    updateDataBase(resObj, path);
    res.send(result);
  }
};

const editing = (req, res) => {
  const { id, cash, credit } = req.body;
  if (ifExistUser(id)) {
    // const data = updateDataUser(id, cash, credit);
    // updateClient(data, path);
    const result = usersData.users.filter((el) => { 
      if(el.id === id) {
        el.cash = cash;
        el.credit = credit;
        return el;
      }
      return el;
    });
    updateDataBase({"users": result}, path)
    res.send(result);
  } else {
    res.send("Something wrong!");
  }
};

const depositing = (req, res) => {
  const {id, sum} = req.body;
  if(ifExistUser(id)) {
    const userUpdated = usersData.users.filter((el) => { 
      if(el.id === id) {
        el.cash = el.cash + sum;
        return el;
      }
      return el;
    });
    updateDataBase({"users": userUpdated}, path)
    res.send(userUpdated);
  } else {
    res.send("Can not find user id: " + id);
  }
}

const updateCredit = (req, res) => {
  const {id, cred} = req.body;
  if(ifExistUser(id)) {
    const userUpd = usersData.users.filter((el) => { 
      if ((el.cash <= 0) && (el.id === id)) {
        res.send("Can not update negative balanse.")
      }
      if(el.id === id) {
        el.credit=cred;
      }
      return el;
    });
    updateDataBase({"users": userUpd}, path)
    res.send(userUpd);
  } else {
    res.send("Can not find user id: " + id);
  }
}

const withdraw = (req, res) => {
  const {id, summ} = req.body;
  if(ifExistUser(id)) {
    const userUpdated = usersData.users.filter((el) => { 
      if ((el.cash + el.credit <= summ) && (el.id === id)) {
        res.send("Not enouth cash+credit")
      }
      if(el.id === id) {
        el.cash = el.cash - summ;
        return el;
      }
      return el;
    });
    updateDataBase({"users": userUpdated}, path)
    res.send(userUpdated);
  } else {
    res.send("Can not find user id: " + id);
  }
  

}

const ifExistUser = (id) => {
  const currentUser = usersData.users.find((client) => { return client.id === id});
  return currentUser // return object 
}

module.exports = { getAllUsers, getUser, addUser, deleteUser, editing, depositing, updateCredit, withdraw};
