const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
require("./controllers/oauth.controller");
const session = require("express-session");
const authRoutes = require("./routes/auth.routes");
const passwordRoutes = require("./routes/password.routes");
const userRoutes = require("./routes/user.routes");
const oauthRoutes = require("./routes/oauth.routes");
require("./services/removeJwt");

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
const dotenv = require('dotenv').config();
// const PORT = process.env.PORT;
const PORT = 3000;

const favDestinationRoutes = require('./routes/favDestination.routes');

=======
app.use(cors());
>>>>>>> 11f579b (push auth)
app.use(express.json());

<<<<<<< HEAD
app.use('/api/home', favDestinationRoutes);
=======
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
>>>>>>> 11f579b (push auth)

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", authRoutes);
app.use("/api/v1", passwordRoutes);
app.use("/api/v1", userRoutes);
app.use("/", oauthRoutes);

app.get("/", (req, res) => {
  res.send("E-Flight Ticket Platform Backend");
});

app.listen(PORT, () => {
  console.log(`aku cinta ${PORT}`);
});
