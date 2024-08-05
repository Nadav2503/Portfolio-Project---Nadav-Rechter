let allCountries = [];

const fetchAllCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

const initializeCountryData = async () => {
  allCountries = await fetchAllCountries();
};

const searchCountriesByName = (text) => {
  return allCountries.filter((country) => {
    const name = country.name.common.toLowerCase();
    return name.includes(text.toLowerCase());
  });
};

const retrieveAllCountries = () => {
  return [...allCountries];
};

export { initializeCountryData, searchCountriesByName, retrieveAllCountries };
