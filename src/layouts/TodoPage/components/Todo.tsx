import TaskModel from "../../../models/TaskModel"

export const Todo:React.FC<{ todo: TaskModel, startEdit: any, deleteTodo: any, toggleCompleted: any }> = (props) => {
    return (
        <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex">
                <input
                    type="checkbox"
                    className="form-check-input mt-1"
                    checked={props.todo.completed}
                    onChange={() => props.toggleCompleted(props.todo)}
                />

                <div className="ms-3">
                    <h6 className={`mb-1 ${props.todo.completed ? "text-decoration-line-through text-muted" : ""}`}>
                        {props.todo.title}
                    </h6>
                    <p className="mb-1 text-muted small">
                        {props.todo.description}
                    </p>
                </div>
            </div>

            <div className="btn-group btn-group-sm">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => props.startEdit(props.todo.id)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-outline-danger"
                    onClick={() => props.deleteTodo(props.todo.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}