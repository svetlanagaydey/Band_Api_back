const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  editing
} = require("../controllers/userControllers");

const apiRouter = express.Router();
apiRouter.get("/", (req, res) => res.send("ok"));
apiRouter.get("/users", getAllUsers);

apiRouter.get("/users/:id", getUser);
// todo: adding users
apiRouter.post("/users", addUser);

// todo: delete user
apiRouter.delete("/users/:id", deleteUser);

// todo: editing user data
apiRouter.put("/users/editing", editing);

// export default apiRouter;
module.exports = apiRouter;