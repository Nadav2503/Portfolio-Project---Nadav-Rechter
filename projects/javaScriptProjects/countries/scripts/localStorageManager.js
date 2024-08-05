const fetchSavedHeartStates = () => {
    const saved = localStorage.getItem("heartStates");
    return saved ? JSON.parse(saved) : {};
};

const storeHeartState = (countryName, isFilled) => {
    const heartStates = fetchSavedHeartStates();
    heartStates[countryName] = isFilled;
    localStorage.setItem("heartStates", JSON.stringify(heartStates));
};

const removeHeartStates = () => {
    localStorage.removeItem("heartStates");
};

export { fetchSavedHeartStates, storeHeartState, removeHeartStates };
