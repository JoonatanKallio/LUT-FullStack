const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const users = require("./routes/users");
const todos = require("./routes/todos")
const morgan = require("morgan")
const config = require("./config/database");

// Connect to database
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
    console.log(`Connected to database ${config.database}`);
})

mongoose.connection.on("error", (err) => {
    console.log(`Database error ${err}`);
})

const app = express();

const port = 3000;
mongoose.set('useFindAndModify', false);
// CORS middleware
app.use(cors());

// Static folder
app.use(express.static(path.join(__dirname, "public")));


// BodyParser middleware
app.use(bodyParser.json());
app.use(morgan("tiny"))

// Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use("/users", users);
app.use("/todos", todos);

// Index route
app.get('/', (req, res) => {
    res.send('')
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
} )

app.listen(port, () => {
    console.log(`Listening port ${port}`)
})
