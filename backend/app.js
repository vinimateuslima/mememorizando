const router = require("express").Router();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());

app.use(express.json());

// DB Connection

const conn = require("./db/conn");

conn();

console.log(__dirname)

// Routes
const routes = require("./routes/router");

app.use("/api", routes);

// Página Principal
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use("/", router);
app.use(express.json());
app.listen(3000, function () {
  console.log("Servidor Online!");
});
