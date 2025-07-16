console.log("OSM GeoJSON Grid Generator service worker loaded.");

chrome.runtime.onInstalled.addListener(() => {
  console.log("OSM GeoJSON Grid Generator installed.");
});