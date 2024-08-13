import { storeHeartState, fetchSavedHeartStates } from "./localStorageManager.js";

const cardsContainer = document.getElementById("cards");

export const createCountryCard = (country, favoriteCountries, updateFavorites) => {
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
  populationInfo.className = "card-text bold-text";
  populationInfo.textContent = `Population: ${country.population ? country.population.toLocaleString() : 'N/A'}`;

  const regionInfo = document.createElement("p");
  regionInfo.className = "card-text bold-text";
  regionInfo.textContent = `Region: ${country.region || 'N/A'}`;

  const subregionInfo = document.createElement("p");
  subregionInfo.className = "card-text bold-text";
  subregionInfo.textContent = `Subregion: ${country.subregion || 'N/A'}`;

  const languagesInfo = document.createElement("p");
  languagesInfo.className = "card-text bold-text";
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  languagesInfo.textContent = `Languages: ${languages}`;

  const currenciesInfo = document.createElement("p");
  currenciesInfo.className = "card-text bold-text";
  const currencies = country.currencies
    ? Object.keys(country.currencies).join(', ')
    : 'N/A';
  currenciesInfo.textContent = `Currencies: ${currencies}`;

  const capitalsInfo = document.createElement("p");
  capitalsInfo.className = "card-text bold-text";
  const capitals = country.capital || [];
  capitalsInfo.textContent = `Capital${capitals.length > 1 ? 's' : ''}: ${capitals.length > 0 ? capitals.join(', ') : 'N/A'}`;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  const heartIcon = document.createElement("i");
  heartIcon.className = "bi bi-heart";
  heartIcon.setAttribute("aria-label", `Toggle favorite status for ${country.name.common}`);

  if (favoriteCountries[country.name.common]) {
    heartIcon.classList.replace("bi-heart", "bi-heart-fill");
  }

  heartIcon.addEventListener("click", () => {
    const isFilled = heartIcon.classList.contains("bi-heart-fill");
    heartIcon.classList.toggle("bi-heart-fill", !isFilled);
    heartIcon.classList.toggle("bi-heart", isFilled);

    storeHeartState(country.name.common, !isFilled);
    updateFavorites();

    if (showingFavorites && isFilled) {
      card.remove();
    }
  });

  card.appendChild(cardImage);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(populationInfo);
  cardBody.appendChild(regionInfo);
  cardBody.appendChild(subregionInfo);
  cardBody.appendChild(languagesInfo);
  cardBody.appendChild(currenciesInfo);
  cardBody.appendChild(capitalsInfo);
  cardFooter.appendChild(heartIcon);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  cardsContainer.appendChild(card);
};

export const displayCountryCards = (countries, favoriteCountries, updateFavorites) => {
  cardsContainer.innerHTML = "";
  countries.forEach(country => createCountryCard(country, favoriteCountries, updateFavorites));
};
