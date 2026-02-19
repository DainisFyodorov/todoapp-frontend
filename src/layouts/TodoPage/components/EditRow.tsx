import { useState } from "react";
import TaskModel from "../../../models/TaskModel";

export const EditRow = ({ todo, onSave, onCancel}: {
    todo: TaskModel;
    onSave: (task: TaskModel, title: string, description: string) => void;
    onCancel: () => void;
}) => {

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    return (
        <>
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
                    onClick={() => onSave(todo, title, description)}
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