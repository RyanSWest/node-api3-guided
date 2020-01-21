const express = require("express"); // importing a CommonJS module

const hubsRouter = require("./hubs/hubs-router.js");
const helmet = require("helmet");
const server = express();
router.use((req, res, next) => {
  console.log("hubs router");
  next();
});

 
 
const morgan = require("morgan");

// server.use(express.json());
// server.use(helmet());
// server.use(morgan('dev'))
// server.use(methodLogger)
// server.use('/api/hubs', hubsRouter);

server.use(express.json(), helmet(), morgan());
server.use(addName);
// server.use('/api/hubs',lockout);
server.use(conditionalLockout);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

function addName(req, res, next) {
  req.name = req.name || "EFFER";
  next();
}

function conditionalLockout(req, res, next) {
  const date = new Date();
  const seconds = date.getSeconds;

  seconds % 3 === 0 ? res.status(410).json({ message: "rejected" }) : next();
}

function lockout(req, res) {
  res.status(403).json("api lockout");
}

 
module.exports = server;
