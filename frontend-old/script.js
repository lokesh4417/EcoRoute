const form = document.getElementById("routeForm");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const from = document.getElementById("from").value.trim();

    const to = document.getElementById("to").value.trim();

    const result = document.getElementById("result");

    try {

        const response = await fetch("/api/routes");

        if (!response.ok) {
            throw new Error("Unable to fetch routes");
        }

        const routes = await response.json();

        const matchingRoutes = routes.filter(route =>

            route.from.toLowerCase() === from.toLowerCase() &&

            route.to.toLowerCase() === to.toLowerCase()

        );


        if (matchingRoutes.length === 0) {

            result.innerHTML = `
                <div class="empty-result">

                    <div>🔍</div>

                    <h3>No Route Found</h3>

                    <p>
                        We could not find a route between
                        ${from} and ${to}.
                    </p>

                </div>
            `;

            return;
        }


        result.innerHTML = `
            <h3 class="result-heading">
                Available Sustainable Routes
            </h3>
        `;


        matchingRoutes.forEach(route => {

            result.innerHTML += `

                <div class="route-card">

                    <h3>
                        ${route.mode}
                    </h3>

                    <div class="route-info">

                        <div>

                            <span>
                                Distance
                            </span>

                            <strong>
                                ${route.distance} km
                            </strong>

                        </div>

                        <div>

                            <span>
                                Transport
                            </span>

                            <strong>
                                ${route.mode}
                            </strong>

                        </div>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        result.innerHTML = `

            <div class="empty-result">

                <div>⚠️</div>

                <h3>Server Error</h3>

                <p>
                    Unable to connect to the Eco Route server.
                </p>

            </div>

        `;

        console.error(error);

    }

});

const viewAllRoutes = document.getElementById("viewAllRoutes");

viewAllRoutes.addEventListener("click", async function() {

    const tableContainer = document.getElementById("allRoutesTable");

    try {

        const response = await fetch("/api/routes");

        if (!response.ok) {
            throw new Error("Unable to fetch routes");
        }

        const routes = await response.json();

        if (routes.length === 0) {

            tableContainer.innerHTML = `
                <p>No routes available.</p>
            `;

            return;
        }

        let table = `
            <h3>All Route Records</h3>

            <table class="routes-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Distance (km)</th>
                        <th>Transport</th>
                    </tr>

                </thead>

                <tbody>
        `;


        routes.forEach(route => {

            table += `
                <tr>

                    <td>${route.id}</td>

                    <td>${route.from}</td>

                    <td>${route.to}</td>

                    <td>${route.distance}</td>

                    <td>${route.mode}</td>

                </tr>
            `;

        });


        table += `
                </tbody>

            </table>
        `;

        tableContainer.innerHTML = table;

    }

    catch (error) {

        tableContainer.innerHTML = `
            <p>
                Unable to load route data.
            </p>
        `;

        console.error(error);

    }

});