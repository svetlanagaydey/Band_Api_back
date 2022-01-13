const express = require("express");
const {
  getUser,
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userControllers");
// import {
//   getUser,
//   addUser,
//   editUser,
//   deleteUser,
//   getAllUsers,
// } from "../controllers/userControllers";

const apiRouter = express.Router();

apiRouter.get("/users/:id", getUser);

apiRouter.get("/users", getAllUsers);

// todo: adding users
apiRouter.post("/users", addUser);

// todo: editing user data
apiRouter.put("/users", editUser);

// todo: delete user
apiRouter.delete("/users/:id", deleteUser);

// export default apiRouter;
module.exports = apiRouter;