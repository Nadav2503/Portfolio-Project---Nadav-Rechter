// Custom comparator for sorting descriptions
export function compareDescriptions(desc1, desc2) {
    // Helper function to determine the category of a character
    const charOrder = (char) => {
        if (/\d/.test(char)) return 3; // Numbers
        if (/[A-Z]/.test(char)) return 4; // Uppercase letters
        if (/[a-z]/.test(char)) return 5; // Lowercase letters
        if (/[\u0590-\u05FF]/.test(char)) return 6; // Hebrew letters
        return 1; // Special characters
    };

    // Helper function to normalize descriptions
    const normalize = (str) => {
        // Split the string into parts where Hebrew characters and non-Hebrew characters are separated
        let normalized = '';
        let part = '';
        let hebrewPart = '';
        let isHebrew = false;

        for (let char of str) {
            if (/[\u0590-\u05FF]/.test(char)) {
                if (!isHebrew) {
                    if (part) {
                        normalized += part;
                        part = '';
                    }
                    isHebrew = true;
                }
                hebrewPart += char;
            } else {
                if (isHebrew) {
                    normalized += hebrewPart.split('').reverse().join(''); // Reverse Hebrew part
                    hebrewPart = '';
                    isHebrew = false;
                }
                part += char;
            }
        }
        if (part) normalized += part;
        if (hebrewPart) normalized += hebrewPart.split('').reverse().join(''); // Reverse remaining Hebrew part

        return normalized;
    };

    // Compare two strings based on character order
    const compareString = (str1, str2) => {
        let i = 0;
        while (i < str1.length && i < str2.length) {
            const char1 = str1[i];
            const char2 = str2[i];
            const order1 = charOrder(char1);
            const order2 = charOrder(char2);

            if (order1 !== order2) return order1 - order2;
            if (char1 !== char2) return char1.localeCompare(char2);
            i++;
        }
        return str1.length - str2.length;
    };

    // Normalize and compare descriptions
    const normalizedDesc1 = normalize(desc1);
    const normalizedDesc2 = normalize(desc2);
    const comparison = compareString(normalizedDesc1, normalizedDesc2);
    return comparison;
}

// Function to disable interactive elements
export function disableInteractions() {
    // Select all clickable elements
    const interactiveElements = Array.from(document.querySelectorAll('button, input[type="text"], input[type="checkbox"]'));

    interactiveElements.forEach(element => {
        // Save the element's current state and disable it
        element.dataset.disabled = true;
        element.setAttribute('disabled', 'true');
        element.classList.add('disabled');
    });
}

// Function to enable interactive elements
export function enableInteractions() {
    const interactiveElements = Array.from(document.querySelectorAll('.disabled'));

    interactiveElements.forEach(element => {
        // Restore the element's previous state and enable it
        element.removeAttribute('disabled');
        element.classList.remove('disabled');
        delete element.dataset.disabled;
    });
}
