const redis = require("redis");

//url at which the redis instance is running on
const redisUrl = "redis://127.0.0.1:6379";

const client = redis.createClient(redisUrl);

//store a value (key pair)
client.set("hi", "there");

// get the value
client.get("hi", (err, value) => {
  console.log(value);
});

//other way to print out the value
//instead of writing out a full callback function
// we can pass a reference to consloge.log 
//below console.log will be called automatically
//with the value and error (use console.log with parnthese)
client.get("hi", console.log);