class AddTaskRequest {
    title: string;
    description: string;
    completed: boolean;
    categoryId: number | null;
    priority: string;
    dueDate: string;

    constructor(title: string, description: string, completed: boolean, categoryId: number | null, priority: string, dueDate: string) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.categoryId = categoryId;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}

export default AddTaskRequest;