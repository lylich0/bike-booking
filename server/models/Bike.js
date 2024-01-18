const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    name: String,
    color: String,
    price: Number,
    type: String,
    wheelSize: String,
    id: String,
    description: String,
    status: { type: String, default: 'available' }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;