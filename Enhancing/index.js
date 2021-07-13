const cluster = require("cluster");
// console.log(cluster.isMaster);
//will tell all your sever related code in the else block

//Is the file being executed in master mode?

if (cluster.isMaster) {
  //if this returns true
  //Cause index.js to be executed *again* but
  //in child mode
  cluster.fork(); //everytime we call fork(), isMaster will be set to false hence we enter the else block
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  //Im a child, Im going to act like a server
  // and do nothing else
  const express = require("express");
  const app = express();

  //blocking the event loop
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res, next) => {
    doWork(5000);
    res.send("Hi there");
  });

  app.get("/fast", (req, res, next) => {
      res.send("This was fast");
  })

  app.listen(3000);
}
