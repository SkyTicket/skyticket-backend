const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
require("./controllers/auth/oauth.controller");
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

app.use(cors());
app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const router = require("./routes/router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// serve swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

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
