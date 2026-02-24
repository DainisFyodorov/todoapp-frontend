import { useEffect, useState } from "react";
import TaskModel from "../../models/TaskModel";
import { useAuth } from "../../utils/AuthProvider";
import AddTaskRequest from "../../models/AddTaskRequest";
import { EditRow } from "./components/EditRow";
import { Todo } from "./components/Todo";
import extractErrorMessage from "../../utils/ExtractErrorMessage";
import { SpinnerLoading } from "../Util/SpinnerLoading";
import CategoryModel from "../../models/CategoryModel";

export const TodosPage = () => {

    const { isLoggedIn } = useAuth();

    const [todos, setTodos] = useState<TaskModel[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [newCategoryId, setNewCategoryId] = useState<number | null>(null);

    useEffect(() => {

        if(!isLoggedIn) {
            setError('You must be logged in');
            return;
        }

        const fetchCategoriesAndTodos = async () => {
            const categoriesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/category`, {
                credentials: 'include'
            });

            if(!categoriesResponse.ok) {
                throw new Error(await extractErrorMessage(categoriesResponse));
            }

            const categoriesResponseJson = await categoriesResponse.json();
            setCategories(categoriesResponseJson);

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/task/get`, {
                credentials: 'include'
            });

            if(!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }

            const data = await response.json();
            setTodos(data);
            setLoading(false);
        };

        fetchCategoriesAndTodos().catch((error: any) => {
            setError(error.message);
        });
    }, [isLoggedIn]);

    const addTodo = async () => {
        setError(null);

        const newTitleTrimmed = newTitle.trim();

        if (!newTitleTrimmed) {
            setError('Title is required');
            return;
        }

        const taskToAdd = new AddTaskRequest(newTitleTrimmed, newDescription, false, newCategoryId);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/task/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskToAdd)
        })

        if(!response.ok) {
            setError(await extractErrorMessage(response));
            return;
        }

        const responseJson = await response.json();
        setTodos(prev => [...prev, responseJson]);

        setNewTitle("");
        setNewDescription("");
        setNewCategoryId(null);
    };

    const updateTask = async (task: TaskModel) => {

        task.title = task.title.trim();

        if(!task.title.trim()) {
            setError('Title is required');
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/task/update/${task.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            setError(await extractErrorMessage(response));
            throw new Error();
        }

        const updatedTask: TaskModel = await response.json();

        setTodos(prev => 
            prev.map(t => t.id === updatedTask.id ? updatedTask : t)
        );
    }

    const toggleCompleted = (task: TaskModel) => {
        updateTask({
            ...task,
            completed: !task.completed
        }).catch(() => {});
    };

    const deleteTodo = async (id: number) => {

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/task/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            setError(await extractErrorMessage(response));
            throw new Error();
        }

        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const startEdit = (id: number) => {
        setEditingId(id);
    };

    const saveEdit = (task: TaskModel, title: string, description: string) => {

        if(task.title === title && task.description === description) return;

        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        updateTask({
            ...task,
            title,
            description
        })
        .then(() => setEditingId(null))
        .catch(() => {});
    };

    if(loading) {
        return <SpinnerLoading />
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">

                    <h2 className="mb-4 text-center fw-bold">
                        My Tasks
                    </h2>

                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <pre className="mb-0">{error}</pre>
                            <button type="button" className="btn-close" onClick={() => setError(null)} />
                        </div>
                    )}

                    {/* ADD FORM */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <select
                                className="form-select mb-2"
                                value={newCategoryId ?? ""}
                                onChange={e => setNewCategoryId(e.target.value ? Number(e.target.value) : null)}>

                                <option value="">No category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}

                            </select>
                            <input
                                className="form-control mb-2"
                                placeholder="Task title"
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                            />
                            <textarea
                                className="form-control mb-3"
                                placeholder="Task description"
                                rows={2}
                                value={newDescription}
                                onChange={e => setNewDescription(e.target.value)}
                            />
                            <button className="btn btn-primary w-100" onClick={addTodo}>
                                Add Task
                            </button>
                        </div>
                    </div>

                    {/* TASK LIST */}
                    <div className="list-group shadow-sm">
                        {todos.length === 0 && (
                            <div className="list-group-item text-center text-muted">
                                No tasks yet 🎉
                            </div>
                        )}

                        {todos.map(todo => (
                            <div key={todo.id} className="list-group-item">

                                {editingId === todo.id ? (
                                    <EditRow
                                        todo={todo}
                                        categories={categories}
                                        onSave={saveEdit}
                                        onCancel={() => setEditingId(null)}
                                    />
                                ) : (
                                    <Todo todo={todo} categories={categories} startEdit={startEdit} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
                                )}

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

