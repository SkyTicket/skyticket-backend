require("dotenv").config(); 
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("./controllers/auth/oauth.controller");
const session = require("express-session");
const authRoutes = require("./routes/authRoute");
const passwordRoutes = require("./routes/password.route");
const userRoutes = require("./routes/user.route");
const oauthRoutes = require("./routes/oauth.route");
require("./services/removeJwt");
const favDestinationRoutes = require("./routes/fav.destination.routes");

const PORT = 3003;
const router = require("./routes/route");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Routes (Tambahkan routes lainnya jika diperlukan)
app.use("/auth", authRoutes);
app.use("/password", passwordRoutes);
app.use("/user", userRoutes);
app.use("/oauth", oauthRoutes);
app.use("/api/v1", favDestinationRoutes);
app.use(router);

app.use(function(req, res, next) {
    return res.status(404).json({
        status: 'error',
        message: 'Not found'
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)

    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
