require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
require("./controllers/auth/oauth.controller");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const path = require("path");

// const authRoutes = require("./routes/authRoute");
// const passwordRoutes = require("./routes/password.route");
// const userRoutes = require("./routes/user.route");
// const oauthRoutes = require("./routes/oauth.route");

require("./services/cronjob");

const PORT = 3000;
const router = require("./routes/route");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine ke EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Path ke folder views

// serve swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Session setup
app.set("trust proxy", 1);

app.use(
  session({
    cookie: {
      maxAge: 86400000,
    },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(router);

app.use(function (req, res, next) {
  return res.status(404).json({
    status: "error",
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
