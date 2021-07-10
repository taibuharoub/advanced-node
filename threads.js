//determining whether node is single threaded
//Testing for single threaded

//Will libuv that whenever it creates its thread pool, it should only create 2 threads inside of them
// process.env.UV_THREADPOOL_SIZE = 2; 

const crypto = require("crypto")

const start = Date.now();

/**
 * Example 1
 * Testing for single threaded
 * Node is not entirely single threaded
 */
/* crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
    console.log("1:", Date.now() - start);
})

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
    console.log("2:", Date.now() - start);
}) */

/**
 * Detect threads created by libuv automatically to handle
 * expensive calculations outside the event loop
 * 
 * Explaination
 * the first four calls take 1 second and the 5th call take
 * one additional second
 */
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
    console.log("1:", Date.now() - start);
})

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
    console.log("2:", Date.now() - start);
})

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
    console.log("3:", Date.now() - start);
})

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
    console.log("4:", Date.now() - start);
})

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () =>{
    console.log("5:", Date.now() - start);
})
