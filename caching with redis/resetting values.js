const redis = require("redis");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

//automatically expiring a value
client.set("color", "red", "EX", 5);
client.get("color", console.log)
// client.get("color", console.log)
// client.get("color", console.log)
// client.get("color", console.log)
// client.get("color", console.log)
// client.get("color", console.log)
// client.get("color", console.log)