
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
            trim: true
        },
        to: {
            type: String,
            required: true,
            trim: true
        },
        distance: {
            type: Number,
            required: true,
            min: 0
        },
        mode: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Route", routeSchema);