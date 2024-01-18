const express = require('express');
const router = express.Router();
const Bike = require("../models/Bike");

// Route to handle form submission
router.post('/save', async (req, res) => {
    try {
        const { name, color, price, type, wheelSize, id, description } = req.body;

        const bikeData = {
            name,
            color,
            price,
            type,
            id,
        }

        if (description) {
            bikeData.description = description;
        }

        if (wheelSize) {
            bikeData.wheelSize = wheelSize;
        }

        const bikeExists = await Bike.findOne({ id: id });

        if (bikeExists) {
            return res.status(400).json({ message: 'Bike already exists'});
        }

        const newBike = new Bike(bikeData);
        await newBike.save();

        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to retrieve all bikes
router.get('/bikes', async (req, res) => {
    try {
        const allBikeData = await Bike.find({});
        res.status(200).json(allBikeData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update the status of a bike by its ID
router.patch('/bikes/:id', async (req, res) => {
    const bikeId = req.params.id;
    const newStatus = req.body.status;

    try {
        await Bike.updateOne({ id: bikeId }, { $set: { status: newStatus } });
        res.send('Bike status updated successfully');
    } catch (error) {
        res.status(404).send('Bike not found');
    }
});

module.exports = router;