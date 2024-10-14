const express = require('express');
const { connectDB, isConnected } = require('./config/db'); // Include isConnected for later checks
const path = require('path');
const { router } = require('./routes/apiRoutes');

const app = express();
const port = process.env.PORT || 8080;

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    next(); // Call next() to proceed to the next middleware or route handler
};

// Connect to the database
connectDB().then(() => {
    if (isConnected()) {
        console.log('Database connection successful');
    } else {
        console.error('Failed to connect to the database');
    }
}).catch((err) => {
    console.error('Error connecting to the database', err);
});

// Middleware to parse JSON
app.use(express.json());
app.use(logger);

// Serve the API routes
app.use('/api', router);

// Serve static assets from React (client)
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route to serve React app for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Fallback for unhandled API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
