const express = require('express');
const User = require('../../models/user');
const connectToDatabase = require('../../db');
const { route } = require('..');

const routes = express.Router({
    mergeParams: true
});

// getAll
routes.get('/', async (req, res) => {
    try {
        await connectToDatabase();
        const users = await User.find();
        res.status(200).json({ payload: users, timestamp: Date.now() });
    }
    catch (ex) {
        res.status(500).json({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the user.'
        });
    }

    // connectToDatabase()
    //   .then(() => {
    //     User.find()
    //       .then(notes => {
    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify(notes)
    //         }
    //       })
    //       .catch(err => {
    //         return {
    //             statusCode: err.statusCode || 500,
    //             headers: { 'Content-Type': 'text/plain' },
    //             body: 'Could not fetch the user.'
    //         }  
    //       });
    //   });
    //res.status(200).json({ name: 'Gini Bottle', age: 88, gender: 'Male' });
});

// getSingle
routes.get('/:id', async (req, res) => {
    try {
        await connectToDatabase();
        const { params: { id } } = req;
        const user = await User.findOne({ _id: id });
        res.status(200).json({ payload: user, timestamp: Date.now() });
    }
    catch (ex) {
        res.status(500).json({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the user.'
        });
    }
});

// Create
routes.post('/', async (req, res) => {
    try {
        await connectToDatabase();
        const { body: data } = req;
        const newRecord = new User(data);
        const result = await newRecord.save();
        res.status(200).json({ payload: result, timestamp: Date.now() });
    }
    catch (ex) {
        res.status(500).json({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not fetch the user.'
        });
    }
});

module.exports = {
    routes,
};