const express = require("express")
const app = express();
app.use(express.json());
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const apiRouter = require("./routes/apiRoutes")
app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is up on port");
});