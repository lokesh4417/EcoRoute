
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const logger = require("./middleware/logger");
const routeRoutes = require("./routes/routeRoutes");
const Route = require("./models/Route");
const sampleRoutes = require("./data/routes");

app.use(cors());
app.use(express.json());
app.use(logger);

// Connect to MongoDB only once per running instance.
let databaseReady;

async function connectDatabase() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!databaseReady) {
        databaseReady = (async () => {
            if (!process.env.MONGO_URI) {
                throw new Error("MONGO_URI environment variable is missing");
            }

            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 10000
            });

            console.log("MongoDB connected successfully");

            const count = await Route.countDocuments();

            if (count === 0) {
                await Route.insertMany(
                    sampleRoutes.map((route) => ({
                        from: route.from,
                        to: route.to,
                        distance: route.distance,
                        mode: route.mode
                    }))
                );

                console.log("Sample routes inserted successfully");
            }
        })().catch((error) => {
            databaseReady = null;
            throw error;
        });
    }

    return databaseReady;
}

// Ensure the database is ready before any API route runs.
app.use(async (req, res, next) => {
    try {
        await connectDatabase();
        next();
    } catch (error) {
        console.error("Database connection failed:", error.message);

        res.status(503).json({
            message: "Database connection failed. Please try again later."
        });
    }
});

app.get("/", (req, res) => {
    res.send("EcoRoute Express Server is Running");
});

app.use("/api/routes", routeRoutes);

// Start a local server only when running this file directly.
if (require.main === module) {
    connectDatabase()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`EcoRoute server running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error("Server startup failed:", error.message);
            process.exit(1);
        });
}

module.exports = app;
