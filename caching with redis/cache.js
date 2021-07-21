const mongoose = require("mongoose");

//to execute extra code on the whenever the exec function
//runs (add some extra logic to the exec function)

//reference the original exec function
const exec = mongoose.Query.prototype.exec;

//use normal function not arrow function
mongoose.Query.prototype.exec = function () {
    //add some code that will run before any
    //query is executed by mongoose
    console.log("I'm about to run a Query");
    return exec.apply(this, arguments);
}