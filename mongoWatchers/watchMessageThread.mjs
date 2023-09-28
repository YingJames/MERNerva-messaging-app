import MessageThread from "../models/messageThread.mjs";

async function watchMessageThread() {
    console.log("testing message thread")

    const changeStream = MessageThread.watch();

    // Register an event listener for the 'change' event
    changeStream.on('change', (change) => {
        // Handle the change event
        console.log('Change detected:', change);
        // Perform the desired actions based on the change
    });
}

watchMessageThread().catch(console.error);

export default watchMessageThread;