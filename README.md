# OSM GeoJSON Grid Generator

---

## About
The **OSM GeoJSON Grid Generator** is a Chrome Extension designed to simplify creating GeoJSON grid files for OpenStreetMap (OSM) mapping. It lets users generate a precise grid of squares directly from their **current OpenStreetMap map view**. Once generated, the extension automatically navigates to the **iD editor**, streamlining your mapping workflow.

This tool is perfect for mapping projects that need systematic area coverage using a defined grid, helping mappers organize their work more efficiently.

---

## Features
* **Dynamic Grid Generation**: Creates a GeoJSON grid (a FeatureCollection of Polygons) based on the **center coordinates of your current map view** on `www.openstreetmap.org`.
* **Customizable Grid Size**: You can define the number of squares per side (from 1x1 to **10x10**).
* **Customizable Square Size**: Each square's side length can be set in meters (from **100m to 1000m**).
* **Direct GeoJSON Download**: The generated grid is immediately downloaded as a standard `.json` file, ready for use.

---

## How to Install
1.  **Download the Extension**: Get the extension files from this GitHub repository (e.g., by cloning or downloading the `.zip` file and extracting it).
2.  **Open Chrome Extensions**: In your Chrome browser, type `chrome://extensions` in the address bar and press Enter.
<img width="476" height="84" alt="Image" src="https://github.com/user-attachments/assets/6f403442-c08e-49ec-8b5c-c63f03579759" />
 
 
3.  **Enable Developer Mode**: Turn on "Developer mode" (usually in the top-right corner).
<img width="707" height="138" alt="Image" src="https://github.com/user-attachments/assets/3b2cac32-e2c7-45a7-817c-2ef684a7e8b5" />

 
 
4.  **Load the Extension**: Click "Load unpacked", then select the folder containing the extension's files (`manifest.json`, `popup.html`, `popup.js`, `background.js`, `icon.png`).
<img width="402" height="206" alt="Image" src="https://github.com/user-attachments/assets/3296b518-906a-4321-84d1-3f5ccce742b4" />

 
 
5.  **Pin the Extension (Optional)**: Click the puzzle piece icon (Extensions icon) in your toolbar, find "OSM GeoJSON Grid Generator", and click the pin icon next to it for easy access.

---

## How to Use
1.  **Go to OpenStreetMap**: Open `https://www.openstreetmap.org/` in Chrome.
2.  **Center Your Map**: Pan and zoom the map to the area where you want the grid. The extension will use the coordinates from your browser's URL to center the grid.

<img width="1911" height="989" alt="Image" src="https://github.com/user-attachments/assets/783f7ec7-b827-40db-a76f-292d7978e0d5" />

 
 
3.  **Open the Extension**: Click the "OSM GeoJSON Grid Generator" icon in your Chrome toolbar.
4.  **Set Grid Parameters**:
    * **Number of squares for each side**: Enter a value (e.g., `3` for a 3x3 grid).
    * **Length of each square side (meters)**: Enter a value (e.g., `500` meters).
5.  **Generate Grid**: Click the "**Generate GeoJSON grid**" button.
6.  **Automatic Actions**:
    * The GeoJSON file will be **downloaded** to your computer.
    * Your tab will automatically **switch to the OpenStreetMap iD editor**, centered on the grid's location.
7.  **Import into iD Editor**: Once the iD editor loads, enter EDIT mode and **manually drag&drop** the downloaded `.json` file from your computer over the map window. Your grid will now appear on the screen.

![Image](https://github.com/user-attachments/assets/230055b8-15be-46dc-a58b-a081233c4d4c)



---

## Limitations
* **Manual File Import**: Due to browser security, you must **manually drag and drop** the downloaded GeoJSON file into the iD editor when **in EDIT mode**.

---

## Credits
Developed by **DP7** @ [OpenStreetMap](https://www.openstreetmap.org/user/dp7)
