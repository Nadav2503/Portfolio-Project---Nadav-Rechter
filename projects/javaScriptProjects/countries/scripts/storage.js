// Retrieves saved heart states from localStorage
const getSavedHearts = () => {
    try {
        const saved = localStorage.getItem("heartStates");
        return saved ? JSON.parse(saved) : {}; // Parse JSON or return empty object if not found
    } catch (error) {
        console.error('Failed to get saved hearts:', error); // Log error
        return {}; // Return an empty object in case of error
    }
};

// Saves the heart state for a specific country to localStorage
const saveHeartState = (countryName, isFilled) => {
    try {
        const savedHearts = getSavedHearts(); // Retrieve current heart states
        savedHearts[countryName] = isFilled; // Update state for the specified country
        localStorage.setItem("heartStates", JSON.stringify(savedHearts)); // Save updated state
    } catch (error) {
        console.error('Failed to save heart state:', error); // Log error
    }
};

// Clears all saved heart states from localStorage
const clearHeartStates = () => {
    try {
        localStorage.removeItem("heartStates"); // Remove heartStates entry
    } catch (error) {
        console.error('Failed to clear heart states:', error); // Log error if remove fails
    }
};

export { getSavedHearts, saveHeartState, clearHeartStates };