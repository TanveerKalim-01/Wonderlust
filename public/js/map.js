maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
  container: "map", // ID of the container for the map
  style: maptilersdk.MapStyle.STREETS.DARK,
  center: listing.geometry.coordinates, // Starting position [lng, lat]
  zoom: 12, // Starting zoom level
});

const customMarker = createCustomIcon();

// Add event listeners for hover effect
customMarker.addEventListener("mouseover", () => {
  customMarker.innerHTML = '<i class="fa-brands fa-airbnb" style="color: white; font-size: 30px"></i>'; // Change icon on hover
});

customMarker.addEventListener("mouseout", () => {
  customMarker.innerHTML = '<i class="fa-solid fa-house" style="color: white; font-size: 20px;"></i>'; // Revert to original icon
});

const marker = new maptilersdk.Marker({
  element: customMarker
})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(
      `<h5 class="text-center">${listing.title}</h5><p>Exact location provided after booking</p>`
    ) // Add popup content
  )
  .addTo(map);

// Function to create the custom Font Awesome icon element
function createCustomIcon() {
  const icon = document.createElement("div");
  icon.className = "round";
  icon.innerHTML = '<i class="fa-solid fa-house" style="color: white; font-size: 20px;"></i>'; // Font Awesome icon
  return icon;
}
