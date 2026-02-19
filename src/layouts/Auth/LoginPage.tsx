import { useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {

    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);

        try {

            if(!username.trim() || username.length < 3) {
                throw new Error('Username field must be at least 3 characters long');
            }

            if(!password.trim() || password.length < 3) {
                throw new Error('Password field must be at least 3 characters long');
            }

            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                credentials: 'include',
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            });

            if(!response.ok) {
                throw new Error('Invalid username or password');
            }

            setIsLoggedIn(true);
            navigate('/', { replace: true })
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
                                Sign In
                            </h3>

                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <pre className="mb-0">{error}</pre>
                                    <button type="button" className="btn-close" onClick={() => setError(null)} />
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
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <small className="text-muted">
                                    Don't have an account?{" "}
                                    <Link to='/register'>Register</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}