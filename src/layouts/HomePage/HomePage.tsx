import { useAuth } from "../../utils/AuthProvider";

export const HomePage = () => {

    const { isLoggedIn } = useAuth();

    return (
        <main className="flex-grow-1">
            {/* Hero section */}
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1 className="display-5 fw-bold">
                            Manage your tasks easily
                        </h1>
                        <p className="lead text-muted mt-3">
                            Simple and effective ToDo application
                        </p>

                        {!isLoggedIn && (
                            <div className="mt-4">
                                <a href="/" className="btn btn-primary btn-lg me-2">
                                    Get Started
                                </a>
                                <a href="/" className="btn btn-outline-secondary btn-lg">
                                    Sign In
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="col-md-6 text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
                            alt="Todo illustration"
                            className="img-fluid"
                            style={{ maxHeight: "300px" }}
                        />
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-light py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <h5 className="fw-bold">📝 Create tasks</h5>
                            <p className="text-muted">
                                Quickly add and manage your daily tasks.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h5 className="fw-bold">✅ Track progress</h5>
                            <p className="text-muted">
                                Mark tasks as completed and stay productive.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h5 className="fw-bold">🔐 Secure access</h5>
                            <p className="text-muted">
                                Authentication with secure backend API.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}