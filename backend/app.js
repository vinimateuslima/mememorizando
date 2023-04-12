const router = require("express").Router();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const rateLimit = require("express-rate-limit");

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
  res.setHeader('Access-Control-Allow-Origin', 'http://mememorizando.herokuapp.com');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
});


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 solicitações por IP
});

app.use(limiter);



const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use("/", router);
app.use(express.json());
app.listen(port, function () {
  console.log("Servidor Online!");
});
