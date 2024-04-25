const express = require("express")
const path = require("path");
const handlebars = require('express-handlebars')
const members = require("./Members")

const logger = require("./middleware/logger");

const app = express();

const PORT = process.env.PORT || 5000;

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine());
// Homepage route
app.get("/", (req, res) => res.render("index", {
    title: "Member App",
    members
}))



// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, "public")))

// Members API routes
app.use("/api/members", require("./routes/api/members"))

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
