import { storeHeartState } from "./localStorageManager.js";

const cardsContainer = document.getElementById("cards");

export const createCountryCard = (country, favoriteCountries) => {
  const card = document.createElement("div");
  card.className = "card shadow-lg m-2 col-md-3 col-sm-12";

  const cardImage = document.createElement("img");
  cardImage.className = "card-img-top mt-2 border-rounded";
  cardImage.src = country.flags.png;
  cardImage.alt = `Flag of ${country.name.common}`;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = country.name.common;

  const populationInfo = document.createElement("p");
  populationInfo.className = "card-text";
  populationInfo.textContent = `Population: ${country.population.toLocaleString()}`;

  const capitalsInfo = document.createElement("p");
  capitalsInfo.className = "card-text";
  const capitals = country.capital || [];
  capitalsInfo.textContent = `Capital${capitals.length > 1 ? 's' : ''}: ${capitals.join(', ')}`;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  const heartIcon = document.createElement("i");
  heartIcon.className = `bi ${favoriteCountries[country.name.common] ? 'bi-heart-fill' : 'bi-heart'}`;
  heartIcon.setAttribute("aria-label", `Toggle favorite status for ${country.name.common}`);

  heartIcon.addEventListener("click", () => {
    const isFilled = heartIcon.classList.contains("bi-heart-fill");
    heartIcon.classList.toggle("bi-heart-fill", !isFilled);
    heartIcon.classList.toggle("bi-heart", isFilled);
    storeHeartState(country.name.common, !isFilled);
  });

  card.appendChild(cardImage);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(populationInfo);
  cardBody.appendChild(capitalsInfo);
  cardFooter.appendChild(heartIcon);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  cardsContainer.appendChild(card);
};



export const displayCountryCards = (countries, favoriteCountries) => {
  cardsContainer.innerHTML = "";
  countries.forEach(country => createCountryCard(country, favoriteCountries));
};
