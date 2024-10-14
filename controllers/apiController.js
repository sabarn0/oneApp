const { getDB } = require('../config/db'); // Adjust the path as necessary
const { MongoClient } = require('mongodb'); // Ensure MongoDB client is imported

// Create a new API record
const createAPI = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required." });
    }

    const db = getDB();
    try {
        const result = await db.collection('api_register').insertOne({ name, description });
        return res.status(201).json({ id: result.insertedId, name, description });
    } catch (error) {
        console.error('Error creating API:', error);
        return res.status(500).json({ message: "Failed to create API." });
    }
};

// Get all API records
const getAllAPIs = async (req, res) => {
    const db = getDB();
    try {
        const apis = await db.collection('api_register').find({}).toArray();
        return res.status(200).json(apis);
    } catch (error) {
        console.error('Error fetching APIs:', error);
        return res.status(500).json({ message: "Failed to fetch APIs." });
    }
};

// Update an API record by ID
const updateAPI = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name && !description) {
        return res.status(400).json({ message: "At least one field (name or description) is required." });
    }

    const db = getDB();
    try {
        const updateFields = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;

        const result = await db.collection('api_register').updateOne(
            { _id: new MongoClient.ObjectID(id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "API not found." });
        }

        return res.status(200).json({ message: "API updated successfully." });
    } catch (error) {
        console.error('Error updating API:', error);
        return res.status(500).json({ message: "Failed to update API." });
    }
};

// Delete an API record by ID
const deleteAPI = async (req, res) => {
    const { id } = req.params;
    const db = getDB();
    try {
        const result = await db.collection('api_register').deleteOne({ _id: new MongoClient.ObjectID(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "API not found." });
        }

        return res.status(200).json({ message: "API deleted successfully." });
    } catch (error) {
        console.error('Error deleting API:', error);
        return res.status(500).json({ message: "Failed to delete API." });
    }
};

module.exports = {
    createAPI,
    getAllAPIs,
    updateAPI,
    deleteAPI
};
