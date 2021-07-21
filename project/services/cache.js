const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = async function () {
    /* console.log("I'm about to run a Query");

    // this will be refernce to the current querry we 
    // trying to execute
    // console.log(this.getQuery()); //access to filters
    // console.log(this.mongooseCollection.name); //access to collection name
    
    //Object.assign() is used to copy properties from one
    //object to another */

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }))

    //see if we have a value for "key" in redis
    const cacheValue = await client.get(key)

    //if we do, return that
    if (cacheValue) {
        console.log(cacheValue);
    }

    //otherwise, issue the query and store the result in redis
    //line below will call the original exec function with
    //whatever arguments we passed to this function
    const result =  await exec.apply(this, arguments);
    console.log(result);
}