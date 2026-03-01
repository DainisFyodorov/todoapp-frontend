import { useEffect, useState } from "react";
import CategoryModel from "../../models/CategoryModel";
import extractErrorMessage from "../../utils/ExtractErrorMessage";
import { SpinnerLoading } from "../Util/SpinnerLoading";
import { useAuth } from "../../utils/AuthProvider";

export const CategoriesPage = () => {
    
    const { isLoggedIn } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [name, setName] = useState("");
    
    const loadCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/category`, {
                method: 'GET',
                credentials: 'include'
            });

            if(!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }

            setCategories(await response.json());
        } catch(error: any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        
        if(!isLoggedIn) {
            setError('You are not authenticated');
            setIsLoading(false);
            return;
        }
        
        loadCategories();

        setIsLoading(false);
    }, [isLoggedIn]);

    if(isLoading) {
        return <SpinnerLoading />
    }

    const createCategory = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ name })
            });

            if(!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }

            setName("");
            loadCategories();
        } catch(error: any) {
            setError(error.message);
        }
    };

    const updateCategory = async (category: CategoryModel) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/category/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(category)
            });

            if(!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }

            loadCategories();
        } catch(error: any) {
            setError(error.message);
        }
    }

    const deleteCategory = async (id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/category/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if(!response.ok) {
                throw new Error(await extractErrorMessage(response));
            }

            loadCategories();
        } catch(error: any) {
            setError(error.message);
        }
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Categories</h2>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                    <pre className="mb-0">{error}</pre>
                    <button className="btn-close" onClick={() => setError(null)} />
                </div>
            )}

            <form onSubmit={createCategory} className="mb-4">
                <div className="input-group">
                    <input 
                        className="form-control"
                        placeholder="Category name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <button className="btn btn-success">Add</button>
                </div>
            </form>

            <ul className="list-group">
                {categories.map(cat => (
                    <li key={cat.id} className="list-group-item d-flex justify-content-between">
                        <input 
                            className="form-control me-2"
                            value={cat.name}
                            onChange={e => updateCategory({ ...cat, name: e.target.value })}
                        />
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => deleteCategory(cat.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}