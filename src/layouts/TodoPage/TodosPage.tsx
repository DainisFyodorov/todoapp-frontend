import { useEffect, useState } from "react";
import TaskModel from "../../models/TaskModel";
import CategoryModel from "../../models/CategoryModel";
import extractErrorMessage from "../../utils/ExtractErrorMessage";
import { useAuth } from "../../utils/AuthProvider";
import AddTaskRequest from "../../models/AddTaskRequest";
import { SpinnerLoading } from "../Util/SpinnerLoading";

export const TodosPage = () => {
    
    const { isLoggedIn } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [editingTask, setEditingTask] = useState<TaskModel | null>(null);
    const [draggedTask, setDraggedTask] = useState<TaskModel | null>(null);

    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState<number | "">("");

    const loadTasks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/task/get`, {
                credentials: 'include'
            });

            if(!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }

            setTasks(await response.json());

        } catch(error: any) {
            setError(error.message);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/category`, {
                credentials: 'include'
            });

            if(!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }

            setCategories(await response.json());

        } catch(error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        
        if(!isLoggedIn) {
            setError('You are not authenticated');
            setIsLoading(false);
            return;
        }
        
        loadTasks();
        loadCategories();

        setIsLoading(false);
    }, [isLoggedIn]);

    if(isLoading) {
        return <SpinnerLoading />
    }

    const createTask = async (e: any) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(new AddTaskRequest(title, description, false, categoryId === "" ? null : categoryId))
            });

            if(!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }

            setTitle("");
            setDescription("");
            setCategoryId("");
            loadTasks();
        } catch(error: any) {
            setError(error.message);
        }
    };

    const updateTask = async (task: TaskModel) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/task/update/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(task)
            });

            loadTasks();
        } catch(error: any) {
            setError(error.message);
        }
    }

    const deleteTask = async (id: number) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/task/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            loadTasks();
        } catch(error: any) {
            setError(error.message);
        }
    }

    const kanbanCategories = [
        { id: null, name: 'No category' },
        ...categories
    ];
    
    return (
        <div className="container py-4">
            <h2 className="mb-4">My Tasks</h2>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                    <pre className="mb-0">{error}</pre>
                    <button className="btn-close" onClick={() => setError(null)} />
                </div>
            )}

            {/* Create Task */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Create task</h5>
                    <form onSubmit={createTask}>
                        <div className="mb-2">
                            <input 
                                className="form-control"
                                placeholder="Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <textarea 
                                className="form-control"
                                placeholder="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <select 
                                className="form-select"
                                value={categoryId}
                                onChange={e =>
                                    setCategoryId(e.target.value === "" ? "" : Number(e.target.value))
                                }
                            >
                                <option value="">No category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <button className="btn btn-primary">Add task</button>
                    </form>
                </div>
            </div>

            {/* Tasks list */}
            <div className="row g-3">
                {kanbanCategories.map(category => (
                    <div key={String(category.id)} className="col-md-4">
                        <div className="card h-100">
                            <div className="card-header fw-bold text-center">
                                {category.name}
                            </div>

                            <div 
                                className="card-body"
                                style={{ minHeight: '200px' }}
                                onDragOver={e => {
                                    e.preventDefault();
                                    e.currentTarget.classList.add('bg-light');
                                }}
                                onDragLeave={e => {
                                    e.currentTarget.classList.remove('bg-light');
                                }}
                                onDrop={async (e) => {
                                    e.currentTarget.classList.remove('bg-light');

                                    if(!draggedTask) return;

                                    if(draggedTask.categoryId === category.id) return;

                                    await updateTask({
                                        ...draggedTask,
                                        categoryId: category.id
                                    });

                                    setDraggedTask(null);
                                }}
                            >
                                {tasks
                                    .filter(t => t.categoryId === category.id)
                                    .map(task => (
                                        <div
                                            key={task.id}
                                            className="card mb-2 shadow-sm"
                                            draggable
                                            onDragStart={() => setDraggedTask(task)}
                                        >
                                            <div className="card-body p-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <input 
                                                            type="checkbox"
                                                            className="form-check-input me-2"
                                                            checked={task.completed}
                                                            onChange={() => 
                                                                updateTask({
                                                                    ...task,
                                                                    completed: !task.completed
                                                                })
                                                            }
                                                        />
                                                        <strong className={task.completed ? "text-decoration-line-through" : ""}>
                                                            {task.title}
                                                        </strong>
                                                    </div>
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-sm btn-light"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                                ⋮
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => setEditingTask(task)}
                                                                >
                                                                    Edit
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item text-danger"
                                                                    onClick={() => deleteTask(task.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {task.description && (
                                                    <div className="text-muted small mt-1">
                                                        {task.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {editingTask && (
                <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Edit task</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setEditingTask(null)}
                                />
                            </div>

                            <div className="modal-body">
                                <div className="mb-2">
                                    <label className="form-label">Title</label>
                                    <input 
                                        className="form-control"
                                        value={editingTask.title}
                                        onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Description</label>
                                    <textarea 
                                        className="form-control"
                                        value={editingTask.description}
                                        onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        value={editingTask.categoryId ?? ""}
                                        onChange={e =>
                                            setEditingTask({
                                                ...editingTask,
                                                categoryId: e.target.value === "" ? null : Number(e.target.value)
                                            })
                                        }
                                    >
                                        <option value="">No category</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-check mt-2">
                                    <input 
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={editingTask.completed}
                                        onChange={e => setEditingTask({ ...editingTask, completed: e.target.checked })}
                                    />
                                    <label className="form-check-label">
                                        Completed
                                    </label>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={async () => {
                                        await updateTask(editingTask);
                                        setEditingTask(null);
                                    }}
                                >
                                    Save changes
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}