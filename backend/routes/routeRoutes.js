
const express = require("express");
const mongoose = require("mongoose");
const Route = require("../models/Route");

const router = express.Router();

// Test API
router.get("/test", (req, res) => {
    res.send("EcoRoute API is working!");
});

// GET all routes
router.get("/", async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET one route by MongoDB ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid route ID" });
        }

        const route = await Route.findById(req.params.id);

        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Add a new route
router.post("/", async (req, res) => {
    try {
        const { from, to, distance, mode } = req.body;

        const route = await Route.create({
            from,
            to,
            distance,
            mode
        });

        res.status(201).json({
            message: "Route added successfully",
            route
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT: Update a route
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid route ID" });
        }

        const { from, to, distance, mode } = req.body;

        const route = await Route.findByIdAndUpdate(
            req.params.id,
            { from, to, distance, mode },
            { new: true, runValidators: true }
        );

        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        res.status(200).json({
            message: "Route updated successfully",
            route
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Remove a route
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid route ID" });
        }

        const route = await Route.findByIdAndDelete(req.params.id);

        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        res.status(200).json({
            message: "Route deleted successfully",
            route
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;