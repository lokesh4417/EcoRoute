const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    distance: { type: Number, required: true },
    mode: { type: String, required: true }
});

module.exports = mongoose.model("Route", routeSchema);