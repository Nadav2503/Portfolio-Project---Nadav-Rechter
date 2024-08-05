export function sortTasks(tasks, property, direction) {
    return tasks.sort((a, b) => {
        let aValue, bValue;
        if (property === 'creationDate') {
            aValue = a.creationDate.getTime();
            bValue = b.creationDate.getTime();
        } else if (property === 'description') {
            aValue = a.description;
            bValue = b.description;
            return direction === 'asc'
                ? compareDescriptions(aValue, bValue)
                : compareDescriptions(bValue, aValue);
        } else if (property === 'id') {
            aValue = a.id;
            bValue = b.id;
        } else {
            throw new Error('Invalid sort property');
        }

        return direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
}

function compareDescriptions(a, b) {
    return a.localeCompare(b);
}
