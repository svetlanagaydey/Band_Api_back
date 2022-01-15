const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  editing,
  depositing,
  updateCredit,
  withdraw
} = require("../controllers/userControllers");

const apiRouter = express.Router();
apiRouter.get("/", (req, res) => res.send("ok"));
apiRouter.get("/users", getAllUsers);

apiRouter.get("/user", getUser);
// todo: adding users
apiRouter.post("/users", addUser);

// todo: delete user
apiRouter.delete("/users", deleteUser);

// todo: editing user data
apiRouter.put("/users/editing", editing);
apiRouter.put("/users/depositing", depositing);
apiRouter.put("/users/updateCredit", updateCredit);
apiRouter.put("/users/withdraw", withdraw);



// export default apiRouter;
module.exports = apiRouter;