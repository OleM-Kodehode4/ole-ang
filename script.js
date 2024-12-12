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
  cityInput.placeholder = "Search for a city";

  const searchButton = document.createElement("button");
  searchButton.id = "grad";
  searchButton.textContent = "Search";

  searchContainer.appendChild(cityInput);
  searchContainer.appendChild(searchButton);
  citySearch.appendChild(searchContainer);
  body.appendChild(citySearch);

  const br = document.createElement("br");
  body.appendChild(br);

  // Legge til destinasjonsinformasjon
  const destinationContainer = document.createElement("div");

  // Funksjon for å lage en destinasjon
  function createDestination(cityName) {
    const destination = document.createElement("div");
    destination.classList.add("destination");

    const txtColor = document.createElement("span");
    txtColor.classList.add("txt-color");
    txtColor.textContent = cityName;

    const progressContainer = document.createElement("div");
    progressContainer.classList.add("progress-container");

    // Legge til noen eksempelprogresjoner for byene
    for (let i = 0; i < 3; i++) {
      const progress = document.createElement("div");
      progress.classList.add("progress");
      const progressText = document.createElement("span");
      progressText.textContent = "try";
      progress.appendChild(progressText);
      progressContainer.appendChild(progress);
    }

    const dropdownButton = document.createElement("button");
    dropdownButton.classList.add("dropdown");
    dropdownButton.innerHTML = "&#9660;";

    destination.appendChild(txtColor);
    destination.appendChild(progressContainer);
    destination.appendChild(dropdownButton);
    destinationContainer.appendChild(destination);
  }

  // Lagde destinasjonene Tromsø, Kirkenes, Varanger, Senja
  const cities = ["Tromsø", "Kirkenes", "Varanger", "Senja"];
  cities.forEach((city) => createDestination(city));

  body.appendChild(destinationContainer);
});
