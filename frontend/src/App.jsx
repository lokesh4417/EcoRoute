import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState([]);
  const [displayRoutes, setDisplayRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  // Load route data from Express backend
  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      setServerError(false);

      const response = await fetch("http://localhost:3000/api/routes");

      if (!response.ok) {
        throw new Error("Failed to load routes");
      }

      const data = await response.json();

      const routeData = Array.isArray(data)
        ? data
        : data.routes || [];

      setRoutes(routeData);
      setDisplayRoutes(routeData);
    } catch (error) {
      console.error("Backend error:", error);
      setServerError(true);
      setRoutes([]);
      setDisplayRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  // Find routes
  const findRoutes = () => {
    if (!start.trim() || !destination.trim()) {
      alert("Please enter starting point and destination.");
      return;
    }

    const filtered = routes.filter((route) => {
      const from = String(
        route.start || route.from || route.source || route.startPoint || ""
      ).toLowerCase();

      const to = String(
        route.destination ||
        route.to ||
        route.end ||
        route.destinationPoint ||
        ""
      ).toLowerCase();

      return (
        from.includes(start.toLowerCase()) &&
        to.includes(destination.toLowerCase())
      );
    });

    setDisplayRoutes(filtered);
  };

  // Show all routes
  const viewAllRoutes = () => {
    setDisplayRoutes(routes);
  };

  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          <span className="leaf">🌱</span>
          <div>
            <h1>EcoRoute</h1>
            <p>Sustainable Route Planner</p>
          </div>
        </div>
      </header>

      <main className="main-container">

        <div className="route-box">

          <label>Starting Point</label>

          <input
            type="text"
            placeholder="Enter starting point"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <label>Destination</label>

          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <button
            className="find-button"
            onClick={findRoutes}
          >
            Find Sustainable Routes
          </button>

          <button
            className="all-button"
            onClick={viewAllRoutes}
          >
            View All Routes
          </button>

          {loading && (
            <p className="message">
              Loading route data...
            </p>
          )}

          {!loading && !serverError && displayRoutes.length === 0 && (
            <p className="message">
              No routes found.
            </p>
          )}

          {!loading && serverError && (
            <>
              <p className="message">
                Unable to load route data.
              </p>

              <div className="server-error">
                <div className="warning">⚠️</div>

                <h2>Server Error</h2>

                <p>
                  Unable to connect to the Eco Route server.
                </p>

                <button
                  className="retry-button"
                  onClick={loadRoutes}
                >
                  Retry
                </button>
              </div>
            </>
          )}

          {!loading && !serverError && displayRoutes.length > 0 && (
            <div className="routes-container">

              {displayRoutes.map((route, index) => (
                <div className="route-card" key={route.id || index}>

                  <h3>
                    {route.name ||
                      route.routeName ||
                      `Route ${index + 1}`}
                  </h3>

                  <p>
                    <strong>From:</strong>{" "}
                    {route.start ||
                      route.from ||
                      route.source ||
                      route.startPoint ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>To:</strong>{" "}
                    {route.destination ||
                      route.to ||
                      route.end ||
                      route.destinationPoint ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>Transport:</strong>{" "}
                    {route.transport ||
                      route.transportMode ||
                      route.mode ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>Distance:</strong>{" "}
                    {route.distance || "N/A"}
                  </p>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {route.duration || "N/A"}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default App; 