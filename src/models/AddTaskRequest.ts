class AddTaskRequest {
    title: string;
    description: string;
    completed: boolean;
    categoryId: number | null;
    priority: string;

    constructor(title: string, description: string, completed: boolean, categoryId: number | null, priority: string) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.categoryId = categoryId;
        this.priority = priority;
    }
}

export default AddTaskRequest;