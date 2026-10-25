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

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        const count = await Route.countDocuments();

        if (count === 0) {
            const routesToInsert = sampleRoutes.map((route) => ({
                from: route.from,
                to: route.to,
                distance: route.distance,
                mode: route.mode
            }));

            await Route.insertMany(routesToInsert);

            console.log("Sample routes inserted successfully");
        } else {
            console.log(`Existing routes found: ${count}`);
        }

        app.listen(PORT, () => {
            console.log(
                `EcoRoute server running at http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
}

startServer();