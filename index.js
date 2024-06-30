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

// Update the site with weather information, now with A/B test implementation
async function updateWeatherInformationABTest() {
  const lat = 27.98785;
  const lon = 86.925026;

  const weatherData = await fetchWeatherData(lat, lon);
  if (weatherData) {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Determine the group A or B based on the random number
    const group = randomNumber < 0.5 ? "A" : "B";

    // Check which group to display on the site
    if (group === "A") {
      // Group A = display no weather information
      return;
    } else {
      // Group B: Display all weather information

      const weatherInfoElement = document.createElement("div");
      weatherInfoElement.classList.add("weather-info");

      // Convert the timestamp to an understandable date
      const forecastDate = convertTimestampToDate(weatherData.list[0].dt);

      // HTML for group B (all weather information)
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

      // Set the HTML content of weatherInfoElement
      weatherInfoElement.innerHTML = weatherHtml;

      // Insert the weather information into the header
      const insertLocation = document.querySelector(
        'header[data-testid="place-summary"]'
      );
      if (insertLocation) {
        insertLocation.appendChild(weatherInfoElement);
      } else {
        console.error("Failed to find insertion point in the page");
      }
    }
  }
}

updateWeatherInformationABTest();
