const express = require("express");
const { parserClients, updateDataBase  } = require("../utils/utils");
const app = express();
// you dont use app OR express please remove it
const path = "./json/data.json";
// there is a better way to this I will when we finish

const usersData = parserClients(path);
// this is a bad practis do it each time that you need it 
// this is a bad name of the function parserClients => parserUsers
// data is a general name everything is a data even string please change it
// in this case usersData => just users

const getAllUsers = (req, res) => {

  res.send(parserClients(path));
  // dont invoke a function inside res.send()
  // that cos a weird errors
};

const getUser = (req, res) => {
  // const {id} = req.body
  if (ifExistUser(req.body.id)) {
    // realy good function name
    // req.body.id please do it on top of the function 
    res.send(ifExistUser(req.body.id));
      // dont invoke a function inside res.send()
     // that cos a weird errors
  } else {
    res.send('It is no user with id: ' + req.body.id);
  }
};

const addUser = (req, res) => {
  const data = { "id":req.body.id, "cash":0, "credit":0 };
  // please dont try to create json inside a js file 
  // someone that have extantion prettier will fix to javascript 

  if (ifExistUser(req.body.id)) {
    res.send("The user id: " + req.body.id + " don't exist in database.")
  } else {
    usersData.users.push(JSON.stringify(data));
    updateDataBase(usersData, path);
    res.send(usersData);
  }
};

const deleteUser = (req, res) => {
  if (!ifExistUser(req.body.id)) {
    res.send("User " + req.body.id + " is not exist");
  } else {
    //console.log(el.id);
    const result = usersData.users.filter((el) => el.id !== req.body.id)
    // result is outcome but what is the outcome i dont understand
      // do it in one line
  
    const resObj = {"users": result};
    // again bad name please changeit
    // dont try to json manualy please to is with JSON.stringify
    // your are in js file not in json file
    updateDataBase(resObj, path);
    res.send(result);
  }
};

const editing = (req, res) => {
  const { id, cash, credit } = req.body;
  // greate greate
  if (ifExistUser(id)) {
    // wow greate
    // const data = updateDataUser(id, cash, credit); // remobe commnets
    // updateClient(data, path); // remove comments
    const result = usersData.users.filter((el) => { 
      // bad name change it 
      if(el.id === id) {
        el.cash = cash;
        el.credit = credit;
        return el;
        // white is el => user
      }
      return el;
    });
    updateDataBase({"users": result}, path)
    // this is JSON ? ? ? ? ? ? 
    res.send(result);
  } else {
    res.send("The user don't exist!");
  }
};

const depositing = (req, res) => {
  const {id, sum} = req.body;
  // wow great
  if(ifExistUser(id)) {
    // wow

    // util deposUser
    const userUpdated = usersData.users.filter((el) => { 
      // bad name updated is a operation please be more clear with the naming
      if(el.id === id) {
        el.cash = el.cash + sum;
        return el;
      }
      return el;
      // see above el ??
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
      // dont short the name pwd isnt a passowrd upd isnt a updated
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
      }
      return el;
    });
    updateDataBase({"users": userUpdated}, path)
    res.send(userUpdated);
  } else {
    res.send("Can not find user id: " + id);
  }
}

// see above

const transferring = (req, res) => {
  const {idFrom, idTo, sum} = req.body;
  // change the name to something better
  if(ifExistUser(idFrom) && (ifExistUser(idTo))) {
    const afterTransfer = usersData.users.filter((el) => { 
      if ((el.cash + el.credit <= sum) && (el.id === idFrom)) {
        res.send("Not enouth money to send");
      }
      if ((el.cash + el.credit > sum) && (el.id === idFrom)) {
        el.cash = el.cash - sum;
      }
      if (el.id === idTo) {
        el.cash = el.cash + sum;
      }
      return el;
      })
    updateDataBase({"users": afterTransfer}, path)
    // updateDataBase this is so general bad naming please change it you can do it better
    // updateManyUsersById
    res.send(afterTransfer);
  } else {
    res.send("Can not find one of users.");
  }
}

const sortByCash = (req, res) => {
  const resultArray = Array.from(usersData.users);
  // Array is no longer in use we use it in a really rar cases
  
  resultArray.sort((a, b) => (a.cash > b.cash) ? -1 : 1);
  res.send(resultArray);
  // res.status.send
}
const sortDebtors = (req, res) => {
  const resArray = Array.from(usersData.users)
    .filter((el) => el.cash < 0 && el)
    .sort((a, b) => (a.cash > b.cash) ? 1 : -1);
    // nice chaining love it 
  res.send(resArray);
}
//list.sort((a, b) => (a.color > b.color) ? 1 : -1)

const isExistUser = (id) => {
  const currentUser = usersData.users.find((client) => { return client.id === id});
  return currentUser // return object // remove comment 

  // move to utils
}

module.exports = { getAllUsers, getUser, addUser, deleteUser, editing, depositing, updateCredit, withdraw, transferring, sortByCash, sortDebtors};
