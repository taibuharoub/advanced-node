//Promisfying the redis get function so that we
// can use a asnyc/await

const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

async function doCache() {
    client.set("hi", "there");

    const value = await client.get("hi");
    console.log(value);
}

doCache();