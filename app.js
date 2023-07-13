const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { log } = require("console");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/contactDance")
  .then(() => {
    log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Define Mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});
const Contact = mongoose.model("Contact", contactSchema);

// Express SPECIFIC STUFF
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ENDPOINTS
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  const myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("<h1>Saved in Database!</h1>");
    })
    .catch(() => {
      res.status(400).send("<h1>Not saved in Database<h1>");
    });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
