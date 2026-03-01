import { useState } from "react";
import CategoryModel from "../../../models/CategoryModel";

type Props = {
    categories: CategoryModel[];
    onCreate: (name: string) => void;
    onUpdate: (id: number, name: string) => void;
    onDelete: (id: number) => void;
}

export const CategoryManager:React.FC<Props> = ({
    categories,
    onCreate,
    onUpdate,
    onDelete
}) => {

    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5 className="fw-bold mb-3">Categories</h5>

                {/* CREATE */}
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        placeholder="New category name"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                            if(!newName.trim()) return;

                            onCreate(newName);
                            setNewName("");
                        }}
                    >
                        Add
                    </button>
                </div>

                {/* LIST */}
                {categories.length === 0 && (
                    <div className="text-muted small">
                        No categories yet
                    </div>
                )}

                {categories.map(c => (
                    <div
                        key={c.id}
                        className="d-flex justify-content-between align-items-center mb-2"
                    >
                        {editingId === c.id ? (
                            <>
                                <input 
                                    className="form-control form-control-sm me-2"
                                    value={editingName}
                                    onChange={e => setEditingName(e.target.value)}
                                />
                                <button
                                    className="btn btn-sm btn-success me-1"
                                    onClick={() => {
                                        onUpdate(c.id, editingName);
                                        setEditingId(null);
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => setEditingId(null)}
                                >
                                    Cancel
                                </button>
                            </>
                        )
                        :
                        (
                            <>
                                <span>{c.name}</span>
                                <div className="btn-group btn-group-sm">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            setEditingId(c.id);
                                            setEditingName(c.name);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onDelete(c.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}