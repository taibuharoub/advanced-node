//write code to walk thru the series of operations 
//that occur any time we start a node app (entire lifecycle of a node app)

//node e_loop.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

//New timers, operations tasks are recorded from e_loop file running
e_loop.runContents();

//helper function
function shouldContinue(){
    //Check one: Any pending setTimeout, setInterval, setImmediate?
    //Check two: Any pending OS tasks? (like server listening to port) 
    //Check three: Any pending long running operations? (like fs module)

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

//represent the event loop with a while loop
//Entire body executes in one "tick"
while(shouldContinue()) {
    /* whenever the helper function returns something truth
    event loop will contine to run

    but as soon as it returns something falsy
    the loop will stop and the program will exit */

    // 1) Node looks at pendingTimers and sees if any functions
    // are ready to be called. setTimeout, setInterval

    // 2) Node looks at pendingOsTasks and pendingOperations
    // and calls relevant callbacks

    // 3) Pause execution. Continue when...
    // - a new pendingOSTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete

    // 4) Look at pendingTimers. call any setImmediate

    // 5) Handle any "close events"
}


// exit back to terminal