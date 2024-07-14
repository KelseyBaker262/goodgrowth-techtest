// This function fetches the weather data from the API fpr a given longitude and latitude
async function fetchWeatherData(lat, lon) {
  //The latitude and longitude of the location for which to fetch weather data
  const appid = "a2ef86c41a"; // API key for accessing the weather data
  const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=${appid}&lat=${lat}&lon=${lon}`; // Construct of the API URL

  try {
    const response = await fetch(url); // Fetch the weather data from the API
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json(); // Parse the data to JSON format
    return data; //The weather data object if the fetch is successful, otherwise null
  } catch (error) {
    console.error("Error fetching weather data:", error); // Log the error to the console
    return null; // Return null if an error occurs
  }
}

// This function converts a Unix timestamp to an understandable date
function convertTimestampToDate(timestamp) {
  // The Unix timestamp to convert
  const date = new Date(timestamp * 1000); // Create a new date object using the timestamp (convert from seconds to milliseconds)
  const options = {
    // Options for formatting the date string
    weekday: "long", // Display the full name of the day
    year: "numeric", // Display the full year
    month: "long", // Display the full name of the month
    day: "numeric", // Display the day of the month
  };
  return date.toLocaleDateString(undefined, options); // Convert the date object to a locale-specific string using the specified options
}

// Update the site with weather information, now with A/B test implementation
async function updateWeatherInformationABTest() {
  const lat = 27.98785; // Coordinates for the location
  const lon = 86.925026;

  const weatherData = await fetchWeatherData(lat, lon); // Fetch the weather data for the given coordinates
  if (weatherData) {
    // Check if the weather data was fetched successfully
    // Generate a random number between 0 and 1 for A/B testing
    const randomNumber = Math.random();

    // Determine the group A or B based on the random number
    const group = randomNumber < 0.5 ? "A" : "B";

    // Check which group to display on the site
    if (group === "A") {
      // Group A = display no weather information
      return;
    } else {
      // Group B: Display all weather information

      // Create a new div element to hold the weather information
      const weatherInfoElement = document.createElement("div");
      weatherInfoElement.classList.add("weather-info");

      // Convert the timestamp to an understandable date
      const forecastDate = convertTimestampToDate(weatherData.list[0].dt);

      // Create HTML content for group B (displaying weather information)
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

      // Find the location in the header where the weather information should be inserted
      const insertLocation = document.querySelector(
        'header[data-testid="place-summary"]'
      );
      if (insertLocation) {
        // Append the weather information to the header
        insertLocation.appendChild(weatherInfoElement);
      } else {
        console.error("Failed to find insertion point in the page"); // Log an error if the insertion point is not found
      }
    }
  }
}

updateWeatherInformationABTest();
