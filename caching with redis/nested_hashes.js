const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";

const client = redis.createClient(redisUrl);

client.hset("german", "red", "rot");

// client.hget("german", "red", (err, value) => {
//     console.log(value);
// })

client.hget("german", "red", console.log)

client.hset("german", "blue", "blau");

client.hget("german", "blue", console.log)

