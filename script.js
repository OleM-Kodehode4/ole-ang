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
  function createDestination(cityName, cityImage, cityDescription) {
    const destination = document.createElement("div");
    destination.classList.add("destination");
    destination.setAttribute("data-city", cityName.toLowerCase()); // Legger til en data-attributt for lettere filtrering

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
    dropdownButton.innerHTML = "&#9660;"; // Dropdown-pil

    // Skjult informasjon som vises når dropdown-knappen trykkes
    const cityInfo = document.createElement("div");
    cityInfo.classList.add("city-info");
    cityInfo.style.display = "none"; // Skjult som standard

    // Opprette en container for bildet og beskrivelsen
    const cityContent = document.createElement("div");
    cityContent.classList.add("city-content");

    const cityImageElement = document.createElement("img");
    cityImageElement.src = cityImage;
    cityImageElement.alt = `${cityName} Image`;
    cityImageElement.classList.add("city-image");

    const cityDescriptionElement = document.createElement("p");
    cityDescriptionElement.textContent = cityDescription;

    cityContent.appendChild(cityImageElement);
    cityContent.appendChild(cityDescriptionElement);

    cityInfo.appendChild(cityContent);

    // Når dropdown-knappen trykkes, vis eller skjul informasjonen
    dropdownButton.addEventListener("click", function () {
      if (cityInfo.style.display === "none") {
        cityInfo.style.display = "block";
      } else {
        cityInfo.style.display = "none";
      }
    });

    destination.appendChild(txtColor);
    destination.appendChild(progressContainer);
    destination.appendChild(dropdownButton);
    destination.appendChild(cityInfo); // Legg til info-boksen etter dropdown-knappen
    destinationContainer.appendChild(destination);
  }

  // Flere byer å velge fra, med bilde og beskrivelse
  const cities = [
    {
      name: "Tromsø",
      image: "https://example.com/tromso.jpg",
      description: "Tromsø is known for its stunning Northern Lights.",
    },
    {
      name: "Kirkenes",
      image: "https://example.com/kirkenes.jpg",
      description:
        "Kirkenes is the gateway to the Arctic and famous for the Snowhotel.",
    },
    {
      name: "Varanger",
      image: "https://example.com/varanger.jpg",
      description: "Varanger is renowned for its pristine nature and wildlife.",
    },
    {
      name: "Senja",
      image: "https://example.com/senja.jpg",
      description: "Senja is an island known for its dramatic landscapes.",
    },
    {
      name: "Oslo",
      image: "https://example.com/oslo.jpg",
      description:
        "Oslo is the capital of Norway, known for its modern architecture.",
    },
    {
      name: "Bergen",
      image: "https://example.com/bergen.jpg",
      description: "Bergen is a historic city famous for its fjords.",
    },
    {
      name: "Stavanger",
      image: "https://example.com/stavanger.jpg",
      description:
        "Stavanger is famous for the Preikestolen cliff and oil industry.",
    },
    {
      name: "Trondheim",
      image: "https://example.com/trondheim.jpg",
      description:
        "Trondheim is known for its Viking history and stunning cathedral.",
    },
  ];

  // Fisher-Yates shuffle for å randomisere byene
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Bytt plass på elementene
    }
  }

  // Randomiser listen av byer
  shuffleArray(cities);

  // Lag destinasjonene for de første 3 randomiserte byene
  cities.slice(0, 3).forEach((city) => {
    createDestination(city.name, city.image, city.description);
  });

  body.appendChild(destinationContainer);

  // Søkefunksjon
  searchButton.addEventListener("click", function () {
    const searchTerm = cityInput.value.toLowerCase().trim(); // Hent tekst fra input og gjør den til små bokstaver

    const destinations = document.querySelectorAll(".destination");
    let found = false;

    destinations.forEach(function (destination) {
      const cityName = destination.getAttribute("data-city");

      if (cityName.includes(searchTerm)) {
        destination.style.display = "block"; // Vise destinasjonen hvis den matcher søket
        found = true;
      } else {
        destination.style.display = "none"; // Skjule destinasjonen hvis den ikke matcher
      }
    });

    if (!found) {
      alert("No cities found matching your search."); // Hvis ingen byer matcher, vis en melding
    }
  });
});
