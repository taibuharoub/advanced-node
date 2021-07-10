const express = require("express");
const app = express();

//blocking the event loop
function doWork(duration) {
    const start = Date.now();
    while(Date.now() - start < duration){}
}

app.get("/", (req, res, next) => {
    doWork(5000);
    res.send("Hi there");
})

app.listen(3000);