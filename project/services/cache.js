const mongoose = require("mongoose");

const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = function () {
    console.log("I'm about to run a Query");

    // this will be refernce to the current querry we 
    // trying to execute
    console.log(this.getQuery()); //access to filters
    console.log(this.mongooseCollection.name); //access to collection name
    return exec.apply(this, arguments);
}