// Define the Todo class
export class Todo {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.creationDate = new Date();
        this.isComplete = false;
    }
}