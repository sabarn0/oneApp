const { isConnected } = require('../config/db');

// Controller to handle checking DB connection status
const checkDBConnection = (req, res) => {
    const connectionStatus = isConnected();

    // Log the connection status to the console
    console.log("Database connection status:", connectionStatus);

    if (connectionStatus) {
        const result = { status: true, message: "Database is connected" };
        console.log("Response:", result); // Log the result being returned
        res.json(result);
    } else {
        const result = { status: false, message: "Database is not connected" };
        console.log("Response:", result); // Log the result being returned
        res.json(result);
    }
};

module.exports = { checkDBConnection };
