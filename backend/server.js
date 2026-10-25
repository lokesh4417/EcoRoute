
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

app.use("/api/routes", routeRoutes);

app.get("/", (req, res) => {
    res.send("EcoRoute Express Server is Running");
});

let databaseReady;

async function connectDatabase() {
    if (!databaseReady) {
        databaseReady = (async () => {
            await mongoose.connect(process.env.MONGO_URI);

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
            }
        })().catch((error) => {
            databaseReady = null;
            throw error;
        });
    }

    return databaseReady;
}

app.use(async (req, res, next) => {
    try {
        await connectDatabase();
        next();
    } catch (error) {
        console.error("Database connection failed:", error.message);
        res.status(500).json({ error: "Database connection failed" });
    }
});

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
