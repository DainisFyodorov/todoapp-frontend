import { useState } from "react";
import TaskModel from "../../../models/TaskModel";
import CategoryModel from "../../../models/CategoryModel";

export const EditRow = ({ todo, categories, onSave, onCancel}: {
    todo: TaskModel;
    categories: CategoryModel[];
    onSave: (task: TaskModel, title: string, description: string, categoryId: number | null) => void;
    onCancel: () => void;
}) => {

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [categoryId, setCategoryId] = useState<number | null>(todo.categoryId);

    return (
        <>
            <select
                className="form-select mb-2"
                value={categoryId ?? ""}
                onChange={e =>
                    setCategoryId(e.target.value ? Number(e.target.value) : null)
                }
            >
                <option value="">No category</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
            </select>
            <input
                className="form-control mb-2"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                className="form-control mb-2"
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <div className="d-flex gap-2">
                <button
                    className="btn btn-sm btn-success"
                    onClick={() => onSave(todo, title, description, categoryId)}
                >
                    Save
                </button>
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </>
    );
};