import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if(!response.ok) {
                const errorData = await response.json();

                if(typeof errorData === 'object' && errorData !== null) {
                    let errorMessage = '';
                    
                    Object.entries(errorData).forEach(([field, message]) => {
                        errorMessage = errorMessage + `Field ${field}: ${message}\n`;
                    });
                    
                    throw new Error(errorMessage);
                }

                throw new Error(errorData);
            }

            setSuccess('Account created successfully. You can now sign in.');
            setUsername('');
            setPassword('');
        } catch (error: any) {
            setError(error.message);
        }
    }
    
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">
                                Register
                            </h3>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Create Account
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <small className="text-muted">
                                    Already have an account?{" "}
                                    <Link to="/login">Sign In</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}