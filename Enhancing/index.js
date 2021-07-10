const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    res.send("Hi there");
})

app.listen(3000);