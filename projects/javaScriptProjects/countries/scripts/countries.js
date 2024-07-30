let allCountries = []; // Initialize empty array to hold country data

// Fetch all countries from the API
const fetchAllCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return []; // Return an empty array in case of error
  }
};

// Populate countriesFull with data from the API
const loadAllCountries = async () => {
  allCountries = await fetchAllCountries();
};

// Search for countries by name
const filterCountriesByName = (text) => {
  return allCountries.filter((country) => {
    const name = country.name.common.toLowerCase();
    return name.includes(text.toLowerCase());
  });
};

// Reset the list of countries to the full data
const getAllCountries = () => {
  return [...allCountries];
};

// Export the functions with their original names
export { loadAllCountries, filterCountriesByName, getAllCountries };


