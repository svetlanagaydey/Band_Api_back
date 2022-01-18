require("dotenv").config(); // move to the top of the file
const express = require("express")
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const apiRouter = require("./routes/apiRoutes")
app.use("/api", apiRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is up on port");
});

// good code keep going