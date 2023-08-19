// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");
// authentication middleware 
const { isAuthenticated } = require("./middleware/jwt.middleware"); 
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

app.use("/api", require("./routes/index.routes"));

app.use("/auth", require("./routes/auth.routes"));

app.use("/api/profiles", isAuthenticated, require("./routes/profile.routes"))

app.use("/api/pics", isAuthenticated, require("./routes/pic.routes"))

app.use("/api/search", isAuthenticated, require("./routes/search.routes"))

app.use("/api/follow", isAuthenticated, require("./routes/follower.routes"))

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

