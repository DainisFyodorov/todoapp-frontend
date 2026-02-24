class AddTaskRequest {
    title: string;
    description: string;
    completed: boolean;
    categoryId: number | null;

    constructor(title: string, description: string, completed: boolean, categoryId: number | null) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.categoryId = categoryId;
    }
}

export default AddTaskRequest;