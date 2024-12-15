document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

  // Navbar
  const navbar = document.createElement("div");
  navbar.classList.add("navbar");

  const navbarText = document.createElement("div");
  navbarText.classList.add("navbar-text");

  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  const aboutLink = document.createElement("li");
  const aboutAnchor = document.createElement("a");
  aboutAnchor.href = "#";
  aboutAnchor.textContent = "About Northern Lights";
  aboutLink.appendChild(aboutAnchor);
  ul.appendChild(aboutLink);

  const destinationsLink = document.createElement("li");
  const destinationsAnchor = document.createElement("a");
  destinationsAnchor.href = "#";
  destinationsAnchor.textContent = "Destinations";
  destinationsLink.appendChild(destinationsAnchor);
  ul.appendChild(destinationsLink);

  nav.appendChild(ul);
  navbarText.appendChild(nav);
  navbar.appendChild(navbarText);
  body.appendChild(navbar);

  // City search
  const citySearch = document.createElement("div");
  citySearch.classList.add("city-search");

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");

  const cityInput = document.createElement("input");
  cityInput.type = "text";
  cityInput.id = "city-input";
  cityInput.placeholder = "Enter a location";

  const searchButton = document.createElement("button");
  searchButton.id = "grad";
  searchButton.textContent = "Search";

  searchContainer.appendChild(cityInput);
  searchContainer.appendChild(searchButton);
  citySearch.appendChild(searchContainer);
  body.appendChild(citySearch);

  const br = document.createElement("br");
  body.appendChild(br);

  // Destination container
  const destinationContainer = document.createElement("div");
  destinationContainer.classList.add("destination-container");
  body.appendChild(destinationContainer);

  // Fetch aurora probability
  async function fetchAuroraProbability(lat, lon) {
    const response = await fetch(
      `https://api.auroras.live/v1/?type=ace&data=probability&lat=${lat}&long=${lon}`
    );
    return await response.json();
  }

  // Fetch 3-day aurora forecast
  async function fetchAuroraForecast(lat, lon) {
    const response = await fetch(
      `https://api.auroras.live/v1/?type=ace&data=threeday&lat=${lat}&long=${lon}`
    );
    const data = await response.json();
    console.log("3-Day Aurora Forecast API Response:", data); // Debugging log
    return data;
  }

  // Calculate average values for each day
  function calculateDailyAverages(values) {
    return values.map((dayArray) => {
      const total = dayArray.reduce(
        (sum, entry) => sum + parseFloat(entry.value),
        0
      );
      const average = total / dayArray.length;
      return average.toFixed(2); // Round to 2 decimal places
    });
  }

  // Fetch city data and aurora details
  async function fetchAuroraData(cityName, callback) {
    try {
      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          cityName
        )}&format=json&limit=1`
      );
      const locationData = await locationResponse.json();

      if (!locationData.length) {
        throw new Error("Location not found");
      }

      const { lat, lon, display_name } = locationData[0];

      const [probability, forecast] = await Promise.all([
        fetchAuroraProbability(lat, lon),
        fetchAuroraForecast(lat, lon),
      ]);

      callback({ lat, lon, displayName: display_name, probability, forecast });
    } catch (error) {
      console.error("Error fetching aurora data:", error.message);
      callback({ error: error.message });
    }
  }

  // Create destination UI
  function createDestination(data) {
    const { displayName, probability, forecast } = data;

    const destination = document.createElement("div");
    destination.classList.add("destination");

    const txtColor = document.createElement("span");
    txtColor.classList.add("txt-color");
    txtColor.textContent = displayName;

    const progressContainer = document.createElement("div");
    progressContainer.classList.add("progress-container");

    // Current probability circle
    const currentCircle = document.createElement("div");
    currentCircle.classList.add("progress");
    currentCircle.style.backgroundColor = probability.colour || "green";
    currentCircle.textContent = probability.value || "N/A";
    progressContainer.appendChild(currentCircle);

    // Display averaged 3-day forecast in dropdown
    const forecastDiv = document.createElement("div");
    forecastDiv.classList.add("forecast");
    const forecastText = document.createElement("div");
    forecastText.classList.add("forecast-text");

    if (forecast.values) {
      const dailyAverages = calculateDailyAverages(forecast.values);
      forecastText.innerHTML = `
        <strong>3-Day Aurora Forecast Averages:</strong><br>
        Day 1: ${dailyAverages[0]}kp<br>
        Day 2: ${dailyAverages[1]}kp<br>
        Day 3: ${dailyAverages[2]}kp
      `;
    } else {
      forecastText.textContent = "No 3-day forecast available.";
    }

    const dropdownButton = document.createElement("button");
    dropdownButton.classList.add("dropdown");
    dropdownButton.innerHTML = "&#9660;";

    const cityInfo = document.createElement("div");
    cityInfo.classList.add("city-info");
    cityInfo.style.display = "none";

    cityInfo.appendChild(forecastDiv);
    cityInfo.appendChild(forecastText);

    dropdownButton.addEventListener("click", function () {
      cityInfo.style.display =
        cityInfo.style.display === "none" ? "block" : "none";
    });

    destination.appendChild(txtColor);
    destination.appendChild(progressContainer);
    destination.appendChild(dropdownButton);
    destination.appendChild(cityInfo);
    destinationContainer.appendChild(destination);
  }

  searchButton.addEventListener("click", function () {
    const cityName = cityInput.value.trim();
    if (!cityName) {
      alert("Please enter a location");
      return;
    }

    destinationContainer.innerHTML = "";

    fetchAuroraData(cityName, (data) => {
      if (data.error) {
        const errorDiv = document.createElement("div");
        errorDiv.textContent = `Error: ${data.error}`;
        destinationContainer.appendChild(errorDiv);
      } else {
        createDestination(data);
      }
    });
  });
});
