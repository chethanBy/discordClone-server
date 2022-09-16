// imports
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const socketServer = require("./socketServer");

const auth = require("./middleware/auth");
// routes imports
const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
const { default: helmet } = require("helmet");

// specifiy port
const PORT = process.env.PORT || process.env.API_PORT || 5000;

// create express app
const app = express();

// express middleware
// data coming to server will be converted to json
app.use(express.json());
app.use(cors());
app.use(helmet());
// using routes in express middleware
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {});

app.get("/", auth, (req, res) => {
  res.send("hello");
});

server.listen(PORT, () => console.log(`listening at ${PORT}`));
