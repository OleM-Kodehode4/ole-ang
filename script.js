function createNavbar() {
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

  const destinationsLink = document.createElement("li");
  const destinationsAnchor = document.createElement("a");
  destinationsAnchor.href = "#";
  destinationsAnchor.textContent = "Destinations";
  destinationsLink.appendChild(destinationsAnchor);

  ul.appendChild(aboutLink);
  ul.appendChild(destinationsLink);
  nav.appendChild(ul);
  navbarText.appendChild(nav);
  navbar.appendChild(navbarText);

  document.body.appendChild(navbar);
}

function createCitySearch() {
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

  document.body.appendChild(citySearch);
}

function createCityInfo() {
  const cityInfo = document.createElement("section");
  cityInfo.classList.add("city-info");

  const cityImageContainer = document.createElement("div");
  cityImageContainer.classList.add("city-image");

  const cityImage = document.createElement("img");
  cityImage.id = "city-image";
  cityImage.src = "./pics/tromso-1.jpg";
  cityImage.alt = "Tromsø";

  cityImageContainer.appendChild(cityImage);

  const cityDescription = document.createElement("div");
  cityDescription.classList.add("city-description");

  const cityTitle = document.createElement("h3");
  cityTitle.textContent = "Tromsø";

  const cityParagraph = document.createElement("p");
  cityParagraph.textContent =
    "Tromsø, located above the Arctic Circle, is one of the best places to see the Northern Lights.";

  cityDescription.appendChild(cityTitle);
  cityDescription.appendChild(cityParagraph);

  cityInfo.appendChild(cityImageContainer);
  cityInfo.appendChild(cityDescription);

  document.body.appendChild(cityInfo);
}

createNavbar();
createCitySearch();
createCityInfo();
