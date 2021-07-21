const { worker } = require("cluster");
const crypto = require("crypto");
  const express = require("express");
  const {Worker} = require("worker_threads")
  const app = express();

  app.get("/", (req, res, next) => {
    const worker = new Worker(function() {});

    worker.on("message", function() {})
  });

  app.get("/fast", (req, res, next) => {
    res.send("This was fast");
  });

  app.listen(3000);