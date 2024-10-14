const express = require('express');
const { checkDBConnection } = require('../controllers/dbController');
const {
    createAPI,
    getAllAPIs,
    updateAPI,
    deleteAPI
} = require('../controllers/apiController'); // Ensure the path is correct

const router = express.Router();

router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    next(); // Proceed to the next middleware or route handler
});

// Define your API route for checking DB connection
router.get('/check_db_connection', checkDBConnection);

// CRUD Routes for api_register collection
router.post('/api_register', createAPI); // Create API
router.get('/api_register', getAllAPIs); // Get all APIs
router.put('/api_register/:id', updateAPI); // Update API by ID
router.delete('/api_register/:id', deleteAPI); // Delete API by ID

module.exports = { router };
