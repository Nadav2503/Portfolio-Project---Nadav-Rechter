export function compareDescriptions(desc1, desc2) {
    const charOrder = (char) => {
        if (/\d/.test(char)) return 3;
        if (/[A-Z]/.test(char)) return 4;
        if (/[a-z]/.test(char)) return 5;
        if (/[\u0590-\u05FF]/.test(char)) return 6;
        return 1;
    };

    const normalize = (str) => {
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
                    normalized += hebrewPart.split('').reverse().join('');
                    hebrewPart = '';
                    isHebrew = false;
                }
                part += char;
            }
        }
        if (part) normalized += part;
        if (hebrewPart) normalized += hebrewPart.split('').reverse().join('');

        return normalized;
    };

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

    const normalizedDesc1 = normalize(desc1);
    const normalizedDesc2 = normalize(desc2);
    return compareString(normalizedDesc1, normalizedDesc2);
}

export function disableUserInteractions() {
    const interactiveElements = Array.from(document.querySelectorAll('button, input[type="text"], input[type="checkbox"]'));

    interactiveElements.forEach(element => {
        element.dataset.disabled = true;
        element.setAttribute('disabled', 'true');
        element.classList.add('disabled');
    });
}

export function enableUserInteractions() {
    const interactiveElements = Array.from(document.querySelectorAll('.disabled'));

    interactiveElements.forEach(element => {
        element.removeAttribute('disabled');
        element.classList.remove('disabled');
        delete element.dataset.disabled;
    });
}
