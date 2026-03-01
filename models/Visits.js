const mongoose = require('mongoose');
const visitSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    count: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);