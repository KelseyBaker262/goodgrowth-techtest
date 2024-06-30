// Fetch the weather data
async function fetchWeatherData(lat, lon) {
  const appid = "a2ef86c41a";
  const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=${appid}&lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json(); // Parse the data to JSON format
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

// Convert the timestamp to an understandable date
function convertTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long", // Choose the format of the date
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options); // Convert the date object to a string using the default or specified (options)
}

// Update the page with weather information, hardcoded version
async function updateWeatherInformation() {
  const lat = 27.98785;
  const lon = 86.925026;

  const weatherData = await fetchWeatherData(lat, lon);
  if (weatherData) {
    const weatherInfoElement = document.createElement("div"); // Create a new element for the weather info
    weatherInfoElement.classList.add("weather-info"); // Give the div a class

    // Convert the timestamp to a human-readable date
    const forecastDate = convertTimestampToDate(weatherData.list[0].dt);

    // Create weather information HTML format ensuring the data is rounded down to 1 decimal place
    const weatherHtml = `
    <h3>Weather Information</h3>
    <p><strong>Date:</strong> ${forecastDate}</p>
    <p><strong>Temperature:</strong> ${weatherData.list[0].main.temp.toFixed(
      1
    )}°C</p>
    <p><strong>Weather:</strong> ${
      weatherData.list[0].weather[0].description
    }</p>
    <p><strong>Wind Speed:</strong> ${weatherData.list[0].wind.speed.toFixed(
      1
    )} m/s</p>
  `;

    // Set the HTML content of weatherInfoElement as the weatherHtml
    weatherInfoElement.innerHTML = weatherHtml;

    // Insert the weather information into the header
    const insertLocation = document.querySelector(
      'header[data-testid="place-summary"]'
    );
    if (insertLocation) {
      insertLocation.appendChild(weatherInfoElement); // Append the weatherInfoElement to the insertLocation
    } else {
      console.error("Failed to find insertion point in the DOM");
    }
  }
}

updateWeatherInformation();
