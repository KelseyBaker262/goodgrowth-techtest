// Function to fetch the weather data
async function fetchWeatherData(lat, lon) {
  // API ey
  const appid = "a2ef86c41a";
  // API endpoint
  const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=${appid}&lat=${lat}&lon=${lon}`;

  try {
    // Fething the data from the URL
    const response = await fetch(url);
    // Parsing the data into JSON format
    const data = await response.json();
    console.log(data);
    // Error handling which explain the error in the console
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
// Latitude and Longitude of the property
const lat = 27.98785;
const lon = 86.925026;
fetchWeatherData(lat, lon);
