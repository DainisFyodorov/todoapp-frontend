class TaskModel {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    categoryId: number | null;

    constructor(id: number, title: string, description: string, completed: boolean, categoryId: number | null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.categoryId = categoryId;
    }
}

export default TaskModel;