import { initializeCountryData, searchCountriesByName, retrieveAllCountries } from "./countryDataManager.js";
import { displayCountryCards } from "./countryCardRenderer.js";
import { fetchSavedHeartStates } from "./localStorageManager.js";

const searchInputField = document.querySelector("#search");
const favoritesButton = document.querySelector("#showFavorites");

let debounceTimeout;
let countryList = [];
let favoriteCountryList = {};

const handleSearchInput = async () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const query = searchInputField.value.trim();
        favoriteCountryList = fetchSavedHeartStates();
        const results = query ? searchCountriesByName(query) : retrieveAllCountries();
        displayCountryCards(results, favoriteCountryList);
    }, 300);
};

const showFavoriteCountries = () => {
    favoriteCountryList = fetchSavedHeartStates();
    const favorites = retrieveAllCountries().filter(country => favoriteCountryList[country.name.common]);
    displayCountryCards(favorites, favoriteCountryList);
};

const initializeApp = async () => {
    await initializeCountryData();
    countryList = retrieveAllCountries();
    favoriteCountryList = fetchSavedHeartStates();
    displayCountryCards(countryList, favoriteCountryList);

    searchInputField.addEventListener("input", handleSearchInput);
    favoritesButton.addEventListener("click", showFavoriteCountries);
};

initializeApp();
