import { saveHeartState } from "./storage.js";

const cardsDiv = document.getElementById("cards");

// Creates a card element for a country
export const buildCountryCard = (country, favoriteCountries) => {
  // Create card container
  const card = document.createElement("div");
  card.className = "card shadow-lg m-2 col-md-3 col-sm-12";

  // Create card image
  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top mt-2 border-rounded";
  cardImg.src = country.flags.png;
  cardImg.alt = `Flag of ${country.name.common}`;

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Create card title
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = country.name.common;

  // Create population text
  const population = document.createElement("p");
  population.className = "card-text";
  population.textContent = `Population: ${country.population.toLocaleString()}`;

  // Create card footer
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  // Create heart icon
  const heart = document.createElement("i");
  heart.className = "bi bi-heart"; // Default heart class
  heart.setAttribute("aria-label", "Toggle favorite status for " + country.name.common);

  // Set heart icon state based on saved hearts
  if (favoriteCountries[country.name.common]) {
    heart.classList.remove("bi-heart"); // Remove outline class
    heart.classList.add("bi-heart-fill"); // Add fill class
  } else {
    heart.classList.remove("bi-heart-fill"); // Remove fill class
    heart.classList.add("bi-heart"); // Add outline class
  }

  // Add click event listener to heart icon
  heart.addEventListener("click", () => {
    const isFilled = heart.classList.contains("bi-heart-fill");
    heart.classList.toggle("bi-heart-fill", !isFilled); // Toggle fill class
    heart.classList.toggle("bi-heart", isFilled); // Toggle outline class
    saveHeartState(country.name.common, !isFilled); // Update saved state
  });

  // Append elements to card
  card.appendChild(cardImg);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(population);
  cardFooter.appendChild(heart);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  cardsDiv.appendChild(card);
}

export const renderCountriesCards = (countries, favoriteCountries) => {
  cardsDiv.innerHTML = ""; // Clear existing cards
  countries.forEach(country => buildCountryCard(country, favoriteCountries)); // Create new cards
};
