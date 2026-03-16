class TaskModel {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    dueDate: string;
    categoryId: number | null;

    constructor(id: number, title: string, description: string, completed: boolean, priority: string, dueDate: string, categoryId: number | null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.priority = priority;
        this.dueDate = dueDate;
        this.categoryId = categoryId;
    }
}

export default TaskModel;