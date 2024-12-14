require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
require("./controllers/auth/oauth.controller");
const session = require("express-session");
require("./services/removeJwt");

const PORT = 3000;
const router = require("./routes/route");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Session setup
app.use(
  session({
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
