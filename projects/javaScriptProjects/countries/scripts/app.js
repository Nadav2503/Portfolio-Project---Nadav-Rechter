import { initializeCountryData, searchCountriesByName, retrieveAllCountries } from "./countryDataManager.js";
import { displayCountryCards } from "./countryCardRenderer.js";
import { fetchSavedHeartStates } from "./localStorageManager.js";

const searchInputField = document.querySelector("#search");
const favoritesButton = document.querySelector("#showFavorites");
const hideFavoritesButton = document.querySelector("#hideFavorites");

let debounceTimeout;
let countryList = [];
let favoriteCountryList = {};
let showingFavorites = false;

const handleSearchInput = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const query = searchInputField.value.trim();
        const results = query ? searchCountriesByName(query) : retrieveAllCountries();
        if (showingFavorites) {
            const favoriteResults = results.filter(country => favoriteCountryList[country.name.common]);
            displayCountryCards(favoriteResults, favoriteCountryList, updateFavorites);
        } else {
            displayCountryCards(results, favoriteCountryList, updateFavorites);
        }
    }, 300);
};

const showFavoriteCountries = () => {
    favoriteCountryList = fetchSavedHeartStates();
    const favorites = retrieveAllCountries().filter(country => favoriteCountryList[country.name.common]);
    displayCountryCards(favorites, favoriteCountryList, updateFavorites);
    favoritesButton.classList.add("d-none");
    hideFavoritesButton.classList.remove("d-none");
    showingFavorites = true;
};

const hideFavoriteCountries = () => {
    searchInputField.value = '';
    displayCountryCards(retrieveAllCountries(), favoriteCountryList, updateFavorites);
    favoritesButton.classList.remove("d-none");
    hideFavoritesButton.classList.add("d-none");
    showingFavorites = false;
};

const updateFavorites = () => {
    favoriteCountryList = fetchSavedHeartStates();
    if (showingFavorites) {
        displayCountryCards(retrieveAllCountries().filter(country => favoriteCountryList[country.name.common]), favoriteCountryList, updateFavorites);
    }
};

const initializeApp = async () => {
    await initializeCountryData();
    countryList = retrieveAllCountries();
    favoriteCountryList = fetchSavedHeartStates();
    displayCountryCards(countryList, favoriteCountryList, updateFavorites);

    searchInputField.addEventListener("input", handleSearchInput);
    favoritesButton.addEventListener("click", showFavoriteCountries);
    hideFavoritesButton.addEventListener("click", hideFavoriteCountries);
};

initializeApp();
