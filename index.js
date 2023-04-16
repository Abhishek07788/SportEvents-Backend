const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const UserRouter = require("./Routes/user.routes");
const eventRouter = require("./Routes/events.routes");
const requestRouter = require("./Routes/requests.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", UserRouter);
app.use("/events", eventRouter);
app.use("/requests", requestRouter);

app.use("/", (req, res) => {
  res.send("Hii, this is the SportEvents backend");
});

app.listen(process.env.PORT || 8080, async () => {
  await dbConnect();
  console.log("Stared at http://localhost:8080");
});
