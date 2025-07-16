// popup.js

// Function to generate a GeoJSON grid
function generateGeoJSONGrid(centerLon, centerLat, gridSize, squareSizeMeters) {
    const metersPerDegreeLat = 111320; 
    const metersPerDegreeLon = (40075000 * Math.cos(centerLat * Math.PI / 180)) / 360; 

    const stepSizeLat = squareSizeMeters / metersPerDegreeLat;
    const stepSizeLon = squareSizeMeters / metersPerDegreeLon;

    const features = [];

    // Calculate the starting point (top left corner of the grid)
    const startLat = centerLat + (gridSize / 2) * stepSizeLat;
    const startLon = centerLon - (gridSize / 2) * stepSizeLon;

    for (let i = 0; i < gridSize; i++) { // rows (latitude)
        for (let j = 0; j < gridSize; j++) { // columns (longitude)
            const latMax = startLat - (i * stepSizeLat);
            const lonMin = startLon + (j * stepSizeLon);
            const latMin = startLat - ((i + 1) * stepSizeLat);
            const lonMax = startLon + ((j + 1) * stepSizeLon);

            const square = {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [lonMin, latMax], // Top-Left
                            [lonMax, latMax], // Top-Right
                            [lonMax, latMin], // Bottom-Right
                            [lonMin, latMin], // Bottom-Left
                            [lonMin, latMax]  // Close Polygon
                        ]
                    ]
                },
                "properties": {
                    "id": `square-${i}-${j}`,
                    "grid_index": `${i},${j}`
                }
            };
            features.push(square);
        }
    }

    return {
        "type": "FeatureCollection",
        "features": features
    };
}

// Function to generate file name
function generateFilename(lat, lon, gridSize, squareSize) {
    const latStr = String(lat.toFixed(6)).replace('.', '_').replace('-', 'minus'); 
    const lonStr = String(lon.toFixed(6)).replace('.', '_').replace('-', 'minus');
    return `osm_grid_${latStr}_${lonStr}_${gridSize}x${squareSize}m.json`;
}

// Function to download GeoJSON as a file
function downloadGeoJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", function () {
    const generateGridButton = document.getElementById("generateGrid");
    generateGridButton.addEventListener("click", function () {
        const gridSize = document.getElementById("gridSize").value;
        const squareSize = document.getElementById("squareSize").value;

        const gridSizeInt = parseInt(gridSize);
        const squareSizeFloat = parseFloat(squareSize);

        // Input validation
        if (gridSizeInt < 1 || gridSizeInt > 10) {
            alert("Number of squares for each side must be between 1 and 10!");
            return;
        }

        if (squareSizeFloat < 100 || squareSizeFloat > 1000) {
            alert("Length of each square must be between 100 and 1000 meters!");
            return;
        }

        // Get the current Chrome tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];
            const url = new URL(currentTab.url);

            // Check if it is an OpenStreetMap URL (including edit mode)
            if (!url.hostname.includes("openstreetmap.org")) {
                alert("Please visit OpenStreetMap to use this extension!");
                return;
            }

			// Extract longitude and latitude from the hashed URL
			// Typical format: #map=zoom/lat/lon
            const hash = url.hash;
            const parts = hash.split("/");
            
            let centerLat, centerLon;

			// We look for the format #map=zoom/lat/lon
			// The last element is the longitude, the second to last is the latitude
            if (parts.length >= 3) {
                 centerLon = parseFloat(parts[parts.length - 1]);
                 centerLat = parseFloat(parts[parts.length - 2]); 
            } else {
                alert("Could not find map coordinates in the OpenStreetMap URL hash (expected format #map=zoom/lat/lon). Please ensure you are on a map view.");
                return;
            }

            // Make sure the coordinates are valid
            if (isNaN(centerLat) || isNaN(centerLon)) {
                alert("Invalid coordinates found in the URL hash. Please ensure the URL contains valid map coordinates.");
                return;
            }

            // Generate GeoJSON grid
            const gridGeoJSON = generateGeoJSONGrid(centerLon, centerLat, gridSizeInt, squareSizeFloat);

            // Generate file name
            const filename = generateFilename(centerLat, centerLon, gridSizeInt, squareSizeFloat);

            // Download the JSON file
            downloadGeoJSON(gridGeoJSON, filename);
        });
    });
});