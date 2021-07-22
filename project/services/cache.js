const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

//will below function to the prototype object
//so that its available to any query we create
//inside of our application
//use normal function
mongoose.Query.prototype.cache = function() {
  this.useCache = true;
  //to make sure its chainable function call return this
  return this;
}
mongoose.Query.prototype.exec = async function () {
  //since they exist on the same query instance 
  //we can reference useCache insode this function
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  /* console.log("I'm about to run a Query");

    // this will be refernce to the current querry we 
    // trying to execute
    // console.log(this.getQuery()); //access to filters
    // console.log(this.mongooseCollection.name); //access to collection name
    
    //Object.assign() is used to copy properties from one
    //object to another */
  // this inside of this function is a refernce to the Query
  // we are tring to execute

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  //see if we have a value for "key" in redis
  const cacheValue = await client.get(key);

  //if we do, return that
  /* if (cacheValue) {
        console.log(cacheValue);
        //anything from redis will be in json format
        //so we need to parse it before we return it 

        return JSON.parse(cacheValue);
        // return cacheValue;
    } */
  if (cacheValue) {
    // this.model is a reference to the modal that
    // reperents this query
    //this.model is the same as referencing Blog
    //below we were just dealing with a single object
    //const doc = new this.model(JSON.parse(cacheValue));

    //to handle both cases wher we are dealing with an 
    // array of objects and just a single object 

    // same as saying
    /* new Blog({
            title: "hi",
            content: "there"
        }) */

    // return doc;
    // return cacheValue;
    
    console.log("From redis cache");
    const doc = JSON.parse(cacheValue);
    // Array.isArray(doc) ? its an array : its an object 
    return Array.isArray(doc)
    ? doc.map(d => new this.model(d))
    : new this.model(doc)
  }

  //otherwise, issue the query and store the result in redis
  //line below will call the original exec function with
  //whatever arguments we passed to this function
  const result = await exec.apply(this, arguments);

  //make sure to turn result to json before storing it
  // inside redis
  // client.set(key, JSON.stringify(result));
  //automatic expiration
  client.set(key, JSON.stringify(result), "EX", 10);
  return result;
};
