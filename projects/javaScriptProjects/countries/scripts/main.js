import { loadAllCountries, filterCountriesByName, getAllCountries } from "./countries.js";
import { renderCountriesCards } from "./dombuilder.js";
import { getSavedHearts } from "./storage.js";

const searchField = document.querySelector("#search");
const showFavoritesButton = document.querySelector("#showFavorites");

let delayTimeout;
let allCountries = [];
let favoriteCountries = {};

const searchInput = () => {
    clearTimeout(delayTimeout);
    delayTimeout = setTimeout(() => {
        const query = searchField.value.trim();
        const results = query ? filterCountriesByName(query) : getAllCountries();
        renderCountriesCards(results, favoriteCountries); // Pass saved hearts to renderCountriesCards
    }, 300); // Delay period
};

const showFavorites = () => {
    const favorites = getAllCountries().filter(country => favoriteCountries[country.name.common]);
    renderCountriesCards(favorites, favoriteCountries);
};

// Initialize the application
const start = async () => {
    try {
        await loadAllCountries(); // Fetch and store country data
        allCountries = getAllCountries(); // Retrieve the full list of countries
        favoriteCountries = getSavedHearts(); // Retrieve saved heart states
        renderCountriesCards(allCountries, favoriteCountries); // Initialize card list with all countries and saved heart states
    } catch (error) {
        console.error("Failed to initialize the application:", error);
    }

    searchField.addEventListener("input", searchInput);
    showFavoritesButton.addEventListener("click", showFavorites);
};

start();
