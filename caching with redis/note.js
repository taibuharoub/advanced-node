const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";

const client = redis.createClient(redisUrl);

//stringify any js objects you want to store in redis
//storing more complex values in redis
client.set("colors", JSON.stringify({ red: "rojo" }));

client.get("colors", console.log)

client.get("colors", (err, value) => {
    console.log(JSON.parse(value));
})
