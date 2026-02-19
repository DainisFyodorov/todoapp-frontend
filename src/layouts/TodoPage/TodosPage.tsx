import { useEffect, useState } from "react";
import TaskModel from "../../models/TaskModel";
import { useAuth } from "../../utils/AuthProvider";
import AddTaskRequest from "../../models/AddTaskRequest";
import { EditRow } from "./components/EditRow";
import { Todo } from "./components/Todo";
import extractErrorMessage from "../../utils/ExtractErrorMessage";

export const TodosPage = () => {

    const { isLoggedIn } = useAuth();

    const [todos, setTodos] = useState<TaskModel[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            if(!isLoggedIn) {
                throw new Error('You must be logged in');
            }

            const response = await fetch('http://localhost:8080/api/task/get', {
                credentials: 'include'
            });

            const data = await response.json();
            setTodos(data);
        };

        fetchTodos().catch((error: any) => {
            console.log(error.message);
        });
    }, [isLoggedIn]);

    const addTodo = async () => {
        setError(null);

        if (!newTitle.trim()) {
            setError('Title is required');
            return;
        }

        const taskToAdd = new AddTaskRequest(newTitle, newDescription, false);

        const response = await fetch('http://localhost:8080/api/task/create', {
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
    };

    const updateTask = async (task: TaskModel) => {

        if(!task.title.trim()) {
            setError('Title is required');
            return;
        }

        const response = await fetch(`http://localhost:8080/api/task/update/${task.id}`, {
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

        const response = await fetch(`http://localhost:8080/api/task/delete/${id}`, {
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
                                        onSave={saveEdit}
                                        onCancel={() => setEditingId(null)}
                                    />
                                ) : (
                                    <Todo todo={todo} startEdit={startEdit} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
                                )}

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

